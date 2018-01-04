$("#prodBtn").click(prodLogin);
$("#sandBtn").click(sandLogin);

var apiVersion = 'v37.0',
    clientId = '3MVG9d8..z.hDcPImu.PkZDAaTZwdnC1rDv6py.GjgTkxWFKSxB6yEVKHoqUV1Mi.Ach6ouuzilh2ni2zbh5C',
    loginUrl = 'https://login.salesforce.com/',
    redirectURI = "https://localhost:8083/oauthcallback",
    proxyURL = 'http://localhost:8083/proxy/' ;
 

function prodLogin()
{
	loginUrl = 'https://login.salesforce.com/'; 
    login();
}

function sandLogin()
{
    loginUrl = 'https://test.salesforce.com/';
    login();
}
function login() {
    var url = loginUrl + 'services/oauth2/authorize?display=popup&response_type=token' +
        '&client_id=' + encodeURIComponent(clientId) +
        '&redirect_uri=' + encodeURIComponent(redirectURI);
    popupCenter(url, 'login', 700, 600);
}


 

function popupCenter(url, title, w, h) {
    // Handles dual monitor setups
    var parentLeft = window.screenLeft ? window.screenLeft : window.screenX;
    var parentTop = window.screenTop ? window.screenTop : window.screenY;
    var left = parentLeft + (window.innerWidth / 2) - (w / 2);
    var top = parentTop + (window.innerHeight / 2) - (h / 2);
    return window.open(url, title, 'width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
}