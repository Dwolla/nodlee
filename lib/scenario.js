// refreshesLeft
// -------------------------------
// 0 returns result immediately
// -1 will refresh forever, and should time out on the UI
// n will causes n refreshes to happen before returning result

// refreshesSet
// -------------------------------
// Used to repopulate refresh count after returning an error

// errorType (http://developer.yodlee.com/FAQs/Error_Codes)
// -------------------------------
// 0   - Success
// 409 - UnavailableSite
// 406 - VisitSite
// 505 - UnsupportedSite
// 416 - AlreadyLoggedIn
// 423 - AccountNotFound
// 402 - InvalidLogin
// 421 - UnsupportedSiteLanguage
// 520 - Failed MFA

// mfaTypes array
// -------------------------------
// null array - mfa bank flow, but not enabled for user
// non-null array - mfa questions asked in order
//
// t - token mfa
// i - image mfa
// q - question and answer mfa
//
// example array: ['t','i','q']shea

module.exports = function Scenario() {

	this.contentServiceId = 0;
	this.isMfa = true;
	this.mfaTimeout = false;
	this.mfaPass = true;
	this.mfaTypes = ['q'];
	this.refreshesSet = 1;
	this.refreshesLeft = 1;
	this.errorType = 0;
	this.accounts = [
		{
			routingNumber: '222222226',
			accountNumber: '5031123001',
			accountType: 'CHECKING',
			accountHolder: 'John Wayne',
			accountName: 'Your Account #1',
			balance: '1000'
		},
		{
			routingNumber: '222222226',
			accountNumber: '5031123020',
			accountType: 'SAVINGS',
			accountHolder: 'Harrison Barnes',
			accountName: 'Your Account #2',
			balance: '2000'
		},
		{
			routingNumber: null,
			accountNumber: '***12345',
			accountType: 'CHECKING',
			accountHolder: 'Shawn Johnson',
			accountName: 'Incomplete Account #1',
			balance: '55'
		}
	];
}