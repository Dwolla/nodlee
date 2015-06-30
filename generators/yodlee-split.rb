#!/usr/bin/env ruby
require 'fileutils'

filename = ARGV[0]

FileUtils.rm_rf("loginInfo")
Dir.mkdir "loginInfo"

print "Processing file: #{filename}"

File.open(filename) do |file|

    stack = 0
    fileCount = 0
    newFile = nil

    file.each_char do |c|
        if c == "{"
            stack = stack + 1
            if stack == 1
                fileCount = fileCount + 1
                puts "Generating file #{fileCount}..."
                newFile = File.open("loginInfo/" + fileCount.to_s + ".json", "w")
            end
        elsif c == "}"
            stack = stack - 1
            if stack == 0
                newFile.print(c)
                newFile.close
                newFile = nil
            end
        end

        if !newFile.nil?
            newFile.print(c)
        end
    end
end

puts "Done."