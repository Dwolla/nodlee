#Nodlee

Comprehensive testing stub for Yodlee's Instant Account Verification (IAV) [REST API](http://developer.yodlee.com/Instant_Account_Verification(IAV)_API/IAV_Services_Guide/API_References/IAV_REST_API_Reference) by [Dwolla, Inc](https://www.dwolla.com/).

##Prerequisites

1. [Node](http://nodejs.org/)
2. From the Nodlee directory, run `npm install`

##Running

1. Configure your calls to use "http://localhost:3003/" as the base URL
2. From the Nodlee directory, run ```node app.js```
3. Browse to http://localhost:3003

##Using

Responses are returned based on scenarios. Entering certain usernames when logging into the bank in your IAV UI flow with run specific scenarios. These usernames work similarly to unix command line options (-- for a named option, etc.). If no options are specified, the default scenario contained in **lib/scenario.js** is used.

The default scenario is a happy path flow with a single set of MFA questions, one refresh before success, two valid accounts, and one account without a routing number.

Each bank is assigned a content service ID by Yodlee (e.g. 5 for Wells Fargo). Nodlee always returns the same content service information from getContentServiceInfoByRoutingNumber, regardless of the routing number entered in your IAV UI flow. You can edit some of this info in **lib/contentServiceInfo.js**. getContentServiceInfo1 and getLoginFormForContentService can be configured to return the actual bank information, login form, and bank logo. See the "Generating content service info and login forms" section below for details.

###Options

Enter these options in the first field (usually username or ID) for the bank you are trying to log in to. These are not command line options for the node program itself.

####Errors

<table>
	<tr>
		<th>Flag</th>
		<th>Description</th>
		<th>Options</th>
	</tr>
	<tr>
		<td>-e</td>
		<td>
			Sets error to be returned by Yodlee.
			Example: <code>-e VisitSite</code>
		</td>
		<td>
			<ul>
				<li>UnavailableSite</li>
				<li>VisitSite</li>
				<li>UnsupportedSite</li>
				<li>AlreadyLoggedIn</li>
				<li>AccountNotFound</li>
				<li>InvalidLogin</li>
				<li>UnsupportedSiteLanguage</li>
				<li>0 - success</li>
				<li>n - numeric error code of your choice</li>
			</ul>
		</td>
	</tr>
	<tr>
		<td>--fail</td>
		<td>
			Login to FI will fail as if credentials were incorrect.<br/>
			Overrides above flag. Equivalent to InvalidLogin option.
		</td>
		<td>N/A</td>
	</tr>
</table>

####Multi-Factor Authentication

<table>
	<tr>
		<th>Flag</th>
		<th>Description</th>
		<th>Options</th>
	</tr>
    <tr>
        <td>--nomfa</td>
        <td>No MFA will be required</td>
        <td>N/A</td>
    </tr>
    <tr>
        <td>--mfatimeout</td>
        <td>Simulates effect of user taking too long to answer MFA</td>
        <td>N/A</td>
    </tr>
    <tr>
        <td>--mfafail</td>
        <td>Any MFA answers entered will be incorrect</td>
        <td>N/A</td>
    </tr>
        <td>--mfatypes</td>
        <td>
        	Let's you specify number and type of MFA questions.<br/>
        	The questions types on the right can be combined to simulate multi-MFA.<br/>
        	Examples: <code>--mfatypes tiq</code> or <code>--mfatypes disabled</code>
        </td>
        <td>
        	<ul>
        		<li>disabled - MFA bank, but MFA not enabled for user</li>
        		<li>t - token MFA question</li>
        		<li>i - image MFA question</li>
        		<li>q - set of questions and answers</li>
        	<ul>
        </td>
    </tr>
</table>

####Refresh Cycle

It can take some time for Yodlee to log into a bank account and return data, so there is a refresh cycle that occurs until account data is returned or the login fails.

<table>
	<tr>
		<th>Flag</th>
		<th>Description</th>
		<th>Options</th>
	</tr>
	<tr>
		<td>-r</td>
		<td>
			Sets the number of refresh cycles before a success or failure.<br/>
			Examples: <code>-r 5</code> or <code>-r timeout</code>
		</td>
		<td>
			<ul>
				<li>0 - causes result to return immediately</li>
				<li>n - causes n refreshes to happen before returning result</li>
				<li>timeout - will refresh forever, should be handled in your UI</li>
			</ul>
		</td>
	</tr>
</table>

####Account Information

<table>
	<tr>
		<th>Flag</th>
		<th>Description</th>
		<th>Options</th>
	</tr>
	<tr>
		<td>-a</td>
		<td>
			Sets the number of accounts that will be returned.<br/>
			Example: <code>-a 1</code>
		</td>
		<td>0 to the number of accounts defined in scenario.js can be returned.</td>
	</tr>
	<tr>
		<td>--masked</td>
		<td>
			All account numbers returned will be partially masked with asterisks.
		</td>
		<td>N/A</td>
	</tr>
	<tr>
		<td>--norouting</td>
		<td>No routing numbers will be returned in the account information.</td>
		<td>N/A</td>
	</tr>
</table>

##Endpoints mocked

- /authenticate/login
- /authenticate/coblogin
- /jsonsdk/UserRegistration/register3
- /jsonsdk/RoutingNumberService/getContentServiceInfoByRoutingNumber
- /jsonsdk/ContentServiceTraversal/getContentServiceInfo1
- /jsonsdk/ItemManagement/getLoginFormForContentService
- /jsonsdk/ExtendedInstantVerificationDataService/addItemAndStartVerificationDataRequest
- /jsonsdk/Refresh/getMFAResponse
- /jsonsdk/Refresh/putMFARequest
- /jsonsdk/InstantVerificationDataService/getItemVerificationData

##Generating content service info and login forms

**Important** Do not commit the files these scripts generate to source control or share them. This information is proprietary.

The Ruby scripts in the "generators" directory call Yodlee's actual API and store responses for getContentServiceInfo1 and getLoginFormForContentService. This allows you to test each bank's login form and bank logo. The script also generates yodlee-banks.csv that lists all banks, whether or not they're IAV-supported, and their MFA and login field type.

###Prerequisites
1. [Ruby](https://www.ruby-lang.org/en/)
1. Run `bundle install`

###Using
1. Call Yodlee's production /authenticate/coblogin endpoint with your credentials to get a cobSessionToken
2. Use the cobSessionToken to call /SiteTraversal/getAllSites and store the result in a file
3. Run `yodlee-split.rb <your_file_name>` to split each bank into it's own file
4. Run `yodlee-parse.rb` to parse each file generated above and create the yodlee-banks.csv file
5. Edit `yodlee-content-service-info.rb` to include your produciton credentials and then run it to cache all content service info
6. Move the contentInfo and loginInfo directories to routes/