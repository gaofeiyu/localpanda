function fbAsyncInit () {
	FB.init({
		appId: '487179281653793',
		cookie: true,
		xfbml: true,
		version: 'v2.10'
	});
	FB.AppEvents.logPageView();

	// check on loading
	//FB.getLoginStatus(function(response) {
	//	statusChangeCallback(response);
	//});
};




export {fbAsyncInit}