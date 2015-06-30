#!/usr/bin/env ruby

require "rubygems"
require "json"
require "typhoeus"

def get_path

    pathname = ARGV[0]
    if pathname.nil?
        pathname = "loginInfo"
    end
    if !File.directory?(pathname)
        abort(pathname + " is not a valid directory.")
    end

    return pathname
end

def new_file_name (pathname, contentServiceId)
    return pathname + "/" + contentServiceId.to_s + ".parsed"
end

def get_login_fields (components)

    fields = Array.new
    components.each { |x| fields.push x["valueIdentifier"] }
    return fields.join(",")
end

def to_csv_line (bankInfo)

    line = Array.new

    contentServiceInfo = bankInfo["contentServiceInfos"][0]
    loginFormComponents = bankInfo["loginForms"][0]["componentList"]

    line.push contentServiceInfo["contentServiceId"]
    line.push '"' + bankInfo["defaultOrgDisplayName"].gsub(',', "") + '"'

    if bankInfo.has_key? "mfaType"
        mfaType = bankInfo["mfaType"]
        line.push mfaType["typeName"]
    else
        line.push "NONE"
    end

    line.push loginFormComponents.count
    line.push '"' + get_login_fields(loginFormComponents) + '"'

    return line.join(",")
end

def process_file (pathname, filename, contentServiceIdsFile)

    puts "Processing file " + filename + "..."

    file = File.open(pathname + "/" + filename)
    parsed = JSON.parse(file.read)
    contentServiceId = parsed["contentServiceInfos"][0]["contentServiceId"]
    file.close

    File.delete(file)
    newFile = File.open(new_file_name(pathname, contentServiceId), "w")
    newFile.puts JSON.generate(parsed["loginForms"][0])
    newFile.close

    contentServiceIdsFile.puts contentServiceId.to_s

    return to_csv_line(parsed)
end

# execution starts here

pathname = get_path()
print "Processing files in directory: "
puts pathname

report = File.open("yodlee-banks.csv", "w")
report.puts "Content Service ID,Organization Name,MFA Type,# Login Fields,Login Fields"

contentServiceIds = File.open("content-service-ids", "w")

Dir.foreach(pathname) do |file|
    next if file == '.' or file == '..'
    report.puts process_file(pathname, file, contentServiceIds)
end

contentServiceIds.close
report.close

puts "Done."
