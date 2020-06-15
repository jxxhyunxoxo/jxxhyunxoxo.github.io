
var mobileOS = null;  // 모바일 운영체제
var isMobile = false;  // 모바일인지 여부
var isTablet = false;  // 태블릿 여부

function checkMobileOS() {
    mobileOS = {
        Android: function () {
            return navigator.userAgent.match(/Android/i) ? true : false;
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i) ? true : false;
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
        },
        Windows: function () {
            return navigator.userAgent.match(/Windows Phone|IEMobile/i) ? true : false;
        },
        any: function () {
            return (mobileOS.Android() || mobileOS.BlackBerry() || mobileOS.iOS() || mobileOS.Windows());
        }
    };
    isMobile = mobileOS.any();
}

function CallAction(action, movieUrl) {
    
    var url = "";
    var popUrl = "";
    var size = {width:0, height:0};
    switch (action.toLowerCase()) {
        /* menu action */ 
        case "home": url = "/"; break;
        case "profile": url = "/Profile"; break;
        case "portfolio": url = "/Portfolio"; break;
        case "discography": url = "/Discography"; break;
        case "videos": url = "/Videos"; break;
        case "gallery": url = "/Gallery"; break;
        case "extras": url = "/Extras"; break;
        case "mobile": url = "/Mobile"; break;
        /* board action */
        case "notice": popUrl = "/PopBoard/List?kind=1"; movieUrl == 'no_layout' ? (size.width = 1009, size.height = 792) : (size.width = 996, size.height = 1040); break;
    	case "fanboard": popUrl = "/PopBoard/List?kind=2"; movieUrl == 'no_layout' ? (size.width = 1009, size.height = 792) : (size.width = 996, size.height = 1040); break;
    	case "fromstar": popUrl = "/PopBoard/List?kind=4"; movieUrl == 'no_layout' ? (size.width = 1009, size.height = 792) : (size.width = 996, size.height = 1040); break;
    	case "staffdiary": popUrl = "/PopBoard/List?kind=3"; movieUrl == 'no_layout' ? (size.width = 1009, size.height = 792) : (size.width = 996, size.height = 1040); break;
        case "schedule": popUrl = "/PopSchedule"; movieUrl == 'no_layout' ? (size.width = 996, size.height = 772) : (size.width = 996, size.height = 1040); break;
        /* bgm action */ 
        case "play":
        case "stop":
            BgmControl(action); break;
        /* language actoin */ 
        case "kor":
        case "eng":
        case "jpn":
        case "chn":
            SetLanguage(action); break;
        case "movie":
            //OpenMovie(movieUrl); break;
            $.MusicVideoPlay(movieUrl, 1);
            break;
        case "teasermovie":
            $.MediaPlayer(movieUrl, "pageReload");
            break;
        case "teaserimage":
            $("#" + movieUrl).click();
            break;
        default: url = "/";
    }

    if (url != "") {
        top.document.location.href = url;
    }

    if (popUrl != "") {
    	$.OpenWinCenter(popUrl, size.width, size.height, action, "yes");
    }
}

