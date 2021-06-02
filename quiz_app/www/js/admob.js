var admobid = {};
if( /(android)/i.test(navigator.userAgent) ) { 
    admobid = { // for Android
        banner: 'ca-app-pub-6093857782627159/5731646477',
        interstitial: 'ca-app-pub-6093857782627159/4418564808',
        rewarded: 'ca-app-pub-6093857782627159/5091490402'
    };
} else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
    admobid = { // for iOS
        banner: 'ca-app-pub-6093857782627159/5731646477',
        interstitial: 'ca-app-pub-6093857782627159/4418564808',
        rewarded: 'ca-app-pub-6093857782627159/5091490402'
    };
} else {
    admobid = { // for Windows Phone
        banner: 'ca-app-pub-6093857782627159/5731646477',
        interstitial: 'ca-app-pub-6093857782627159/4418564808',
        rewarded: 'ca-app-pub-6093857782627159/5091490402'
    };
}

if(( /(ipad|iphone|ipod|android|windows phone)/i.test(navigator.userAgent) )) {
    document.addEventListener('deviceready', initApp, false);
} else {
    initApp();
}

function initApp() {
    if (! AdMob ) { alert( 'admob plugin not ready' ); return; }
    AdMob.createBanner( {
        adId: admobid.banner, 
    } );
    AdMob.showBanner(AdMob.AD_POSITION.BOTTOM_CENTER);

    AdMob.prepareInterstitial({
        adId: admobid.interstitial,
        autoShow:false,
    });
}