require "rubygems"
require "json"
require "typhoeus"

BASE_URL = "YOUR_BASE_URL"
LOGIN = "YOUR_LOGIN"
PASSWORD = "YOUR_PASSWORD"

def cob_login_to_yodlee

    cobLoginResponse = Typhoeus::Request.new(
        "#{BASE_URL}/authenticate/coblogin",
        method: :post,
        body: {cobrandLogin: "#{LOGIN}", cobrandPassword: "#{PASSWORD}"},
        ssl_verifypeer: false
    ).run

    cobLoginResponseJson = JSON.parse(cobLoginResponse.response_body)
    return cobLoginResponseJson["cobrandConversationCredentials"]["sessionToken"]
end

def get_content_service_info_1(cobSessionToken, contentServiceId)

	getContentServiceInfo1Response = Typhoeus::Request.new(
		"#{BASE_URL}/ContentServiceTraversal/getContentServiceInfo1",
		method: :post,
		body: {cobSessionToken: cobSessionToken, contentServiceId: contentServiceId, reqSpecifier: "128", notrim: "true"},
        ssl_verifypeer: false
    ).run

    return getContentServiceInfo1Response.response_body
end

cobSessionToken = cob_login_to_yodlee()
contentServiceIds = File.open("content-service-ids", "r")

File.readlines('content-service-ids').each do |contentServiceId|
	chomped = contentServiceId.chomp
	file = File.open("contentInfo/" + chomped.to_s + ".json", "w")
	file.puts get_content_service_info_1(cobSessionToken, chomped)
	file.close
end

contentServiceIds.close

puts "Done."