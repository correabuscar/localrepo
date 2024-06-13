//note by je: this user.js file has to be placed in the ff profile dir (ie. after you create one(profile) on first firefox run)
//this is also used for vendor.js generation(ie. renamed to it and...) by replacing user_pref( with pref(
// ^ pref() user_pref() and others are defined/parsed in/by modules/libpref/parser/src/lib.rs
// location of vendor.js is /usr/lib/firefox/browser/defaults/preferences/vendor.js
// see: about:support for currently changed prefs! (by user that is!)
// XXX: in the pref(key,val) thing, only keys, and string vals should be in "", vals that are bools and integers should not be in quotes!
//oldXXX: this is the first new commit since this user.js file was cloned, https://github.com/pyllyukko/user.js/commit/d6ac49a531b58c8ff2e85a727fd154d2ecaf73bd#diff-b00df6cb4137c00991376cd319d35348
//oldXXX: now updated to latest commit which currently(05.Mar.2019) is a4d121bf89fda02fe1510dbdd14ae55890ef4d2c of Date:   Sat Feb 9 10:07:44 2019 +0200 , by manually applying changes shown via $ git diff d6ac49a531b58c8ff2e85a727fd154d2ecaf73bd user.js
//XXX: https://github.com/arkenfox/user.js is the new version of the old https://github.com/ghacksuserjs/ghacks-user.js.git
//XXX: also added prefs from a different repo: https://github.com/ghacksuserjs/ghacks-user.js.git commit 3c4b312cc7f765e05440e6f5f8a9840599d23567 (HEAD -> master, origin/master, origin/HEAD), New: now updated to commit: 2fcec590b41d21943a7dee8a57c0f575999715d9
//XXX: updated to current latest 29nov2020 commit 0c139bcacbe0ac7008172c34b6f0f2fb6fb4743a ie. https://raw.githubusercontent.com/pyllyukko/user.js/0c139bcacbe0ac7008172c34b6f0f2fb6fb4743a/user.js
/******************************************************************************
 * user.js                                                                    *
 * https://github.com/pyllyukko/user.js                                       *
 ******************************************************************************/

/******************************************************************************
 * SECTION: HTML5 / APIs / DOM                                                *
 ******************************************************************************/

// PREF: Disable Service Workers
// https://developer.mozilla.org/en-US/docs/Web/API/Worker
// https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorker_API
// https://wiki.mozilla.org/Firefox/Push_Notifications#Service_Workers
// NOTICE: Disabling ServiceWorkers breaks functionality on some sites (Google Street View...)
// Unknown security implications
// CVE-2016-5259, CVE-2016-2812, CVE-2016-1949, CVE-2016-5287 (fixed)
user_pref("dom.serviceWorkers.enabled",				false);//XXX:

// ----------
// PREF: Disable Web Workers
// https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers
// https://www.w3schools.com/html/html5_webworkers.asp
// NOTICE: Disabling Web Workers breaks "Download as ZIP" functionality on https://mega.nz/, WhatsApp Web and probably others
user_pref("dom.workers.enabled",					false);//XXX:
// XXX looks like this was removed entirely in commit 4549a50afe2ad4a93642cdc73e298b86302eda6f reason: It was removed in Firefox 60 and might break Twitch videos in Pale Moon and Waterfox (which are based on older Firefox). https://bugzilla.mozilla.org/1434934 https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/60#DOM  issue #431 of the repo user.js is in. I'm keeping this anyway!
// ----------

// PREF: Disable web notifications
// this line was removed: https://support.mozilla.org/t5/Firefox/I-can-t-find-Firefox-menu-I-m-trying-to-opt-out-of-Web-Push-and/m-p/1317495#M1006501
// https://support.mozilla.org/en-US/questions/1140439
user_pref("dom.webnotifications.enabled",			false);//XXX:

// PREF: Disable DOM timing API
// https://wiki.mozilla.org/Security/Reviews/Firefox/NavigationTimingAPI
// https://www.w3.org/TR/navigation-timing/#privacy
user_pref("dom.enable_performance",				false);

// PREF: Make sure the User Timing API does not provide a new high resolution timestamp
// https://trac.torproject.org/projects/tor/ticket/16336
// https://www.w3.org/TR/2013/REC-user-timing-20131212/#privacy-security
user_pref("dom.enable_user_timing",				false);

// PREF: Disable Web Audio API
// https://bugzilla.mozilla.org/show_bug.cgi?id=1288359
user_pref("dom.webaudio.enabled",				false);

// PREF: Disable Location-Aware Browsing (geolocation)
// https://www.mozilla.org/en-US/firefox/geolocation/
user_pref("geo.enabled",					false);

// PREF: When geolocation is enabled, use Mozilla geolocation service instead of Google
// https://bugzilla.mozilla.org/show_bug.cgi?id=689252
//user_pref("geo.wifi.uri", ""//mod
////"https://location.services.mozilla.com/v1/geolocate?key=%MOZILLA_API_KEY%"
//);
user_pref("geo.wifi.uri", "https://geo.wifi.uri.firefox_blocked_domain.tld/geolocation/uri");//default value: "https://www.googleapis.com/geolocation/v1/geolocate?key=%GOOGLE_API_KEY%"
/* 0210: use Mozilla geolocation service instead of Google when geolocation is enabled
 * Optionally enable logging to the console (defaults to false) ***/
//user_pref("geo.wifi.uri", "https://location.services.mozilla.com/v1/geolocate?key=%MOZILLA_API_KEY%");

// PREF: When geolocation is enabled, don't log geolocation requests to the console
// * enable logging to the console (defaults to false) ***/
user_pref("geo.wifi.logging.enabled", true); //mod

user_pref("geo.provider.network.url","https://www.googleapis.com.firefox_blocked_domain.tld/"); // mod from: "https://www.googleapis.com/geolocation/v1/geolocate?key=%GOOGLE_LOCATION_SERVICE_API_KEY%"
user_pref("browser.geolocation.warning.infoURL", "https://www.mozilla.org.firefox_blocked_domain.tld/%LOCALE%/firefox/geolocation/"); // mod from: "https://www.mozilla.org/%LOCALE%/firefox/geolocation/"
user_pref("browser.region.network.url","https://location.services.mozilla.com.firefox_blocked_domain.tld/v1/country?key=%MOZILLA_API_KEY%"); // mod from: "https://location.services.mozilla.com/v1/country?key=%MOZILLA_API_KEY%"

// PREF: Disable raw TCP socket support (mozTCPSocket)
// https://trac.torproject.org/projects/tor/ticket/18863
// https://www.mozilla.org/en-US/security/advisories/mfsa2015-97/
// https://developer.mozilla.org/docs/Mozilla/B2G_OS/API/TCPSocket
user_pref("dom.mozTCPSocket.enabled",				false);

// PREF: Disable DOM storage (disabled)
// http://kb.mozillazine.org/Dom.storage.enabled
// https://html.spec.whatwg.org/multipage/webstorage.html
// NOTICE-DISABLED: Disabling DOM storage is known to cause`TypeError: localStorage is null` errors
/* 2710: disable DOM (Document Object Model) Storage
 * [WARNING] This will break a LOT of sites' functionality AND extensions!
 * You are better off using an extension for more granular control ***/
//user_pref("dom.storage.enabled",		false);
user_pref("dom.storage.enabled",		true);//mod, kept on enabled!
user_pref("dom.storage.next_gen", true);//default: true //doneFIXME: false until fixed, eg. https://bugzilla.mozilla.org/show_bug.cgi?id=1534431

// PREF: Disable leaking network/browser connection information via Javascript
// Network Information API provides general information about the system's connection type (WiFi, cellular, etc.)
// https://developer.mozilla.org/en-US/docs/Web/API/Network_Information_API
// https://wicg.github.io/netinfo/#privacy-considerations
// https://bugzilla.mozilla.org/show_bug.cgi?id=960426
user_pref("dom.netinfo.enabled",				false);

// PREF: Disable network API (Firefox < 32)
// https://developer.mozilla.org/en-US/docs/Web/API/Connection/onchange
// https://www.torproject.org/projects/torbrowser/design/#fingerprinting-defenses
user_pref("dom.network.enabled",				false);

// PREF: Disable WebRTC entirely to prevent leaking internal IP addresses (Firefox < 42)
// NOTICE: Disabling WebRTC breaks peer-to-peer file sharing tools (reep.io ...)
user_pref("media.peerconnection.enabled",			false);

// PREF: Don't reveal your internal IP when WebRTC is enabled (Firefox >= 42)
// https://wiki.mozilla.org/Media/WebRTC/Privacy
// https://github.com/beefproject/beef/wiki/Module%3A-Get-Internal-IP-WebRTC
user_pref("media.peerconnection.ice.default_address_only",	true); // Firefox 42-51
user_pref("media.peerconnection.ice.no_host",			true); // Firefox >= 52


// PREF: Disable WebRTC getUserMedia, screen sharing, audio capture, video capture
// https://wiki.mozilla.org/Media/getUserMedia
// https://blog.mozilla.org/futurereleases/2013/01/12/capture-local-camera-and-microphone-streams-with-getusermedia-now-enabled-in-firefox/
// https://developer.mozilla.org/en-US/docs/Web/API/Navigator
user_pref("media.navigator.enabled",				false);
user_pref("media.navigator.video.enabled",			false);
/* 2022: disable screensharing ***/
user_pref("media.getusermedia.screensharing.enabled",		false);
user_pref("media.getusermedia.browser.enabled", false);
user_pref("media.getusermedia.audiocapture.enabled",		false);

// PREF: Disable battery API (Firefox < 52)
// https://developer.mozilla.org/en-US/docs/Web/API/BatteryManager
// https://bugzilla.mozilla.org/show_bug.cgi?id=1313580
/* 2502: disable Battery Status API
 * Initially a Linux issue (high precision readout) that was fixed.
 * However, it is still another metric for fingerprinting, used to raise entropy.
 * e.g. do you have a battery or not, current charging status, charge level, times remaining etc
 * [NOTE] From FF52+ Battery Status API is only available in chrome/privileged code. see [1]
 * [1] https://bugzilla.mozilla.org/1313580 ***/
user_pref("dom.battery.enabled",				false);

// PREF: Disable telephony API
// https://wiki.mozilla.org/WebAPI/Security/WebTelephony
user_pref("dom.telephony.enabled",				false);

// PREF: Disable "beacon" asynchronous HTTP transfers (used for analytics)
// https://developer.mozilla.org/en-US/docs/Web/API/navigator.sendBeacon
user_pref("beacon.enabled",					false);

// PREF: Disable clipboard event detection (onCut/onCopy/onPaste) via Javascript
// NOTICE: Disabling clipboard events breaks Ctrl+C/X/V copy/cut/paste functionaility in JS-based web applications (Google Docs...)
// https://developer.mozilla.org/en-US/docs/Mozilla/Preferences/Preference_reference/dom.event.clipboardevents.enabled
user_pref("dom.event.clipboardevents.enabled",			false);
//user_pref("dom.event.clipboardevents.enabled",			true); //XXX: //mod  needing this for, at least, github copy perm link from a line number in source code. //oh wait, maybe not this, but the next pref is what's for this! aka dom.allow_cut_copy

// PREF: Disable "copy to clipboard" functionality via Javascript (Firefox >= 41)
// NOTICE: Disabling clipboard operations will break legitimate JS-based "copy to clipboard" functionality
// https://hg.mozilla.org/mozilla-central/rev/2f9f8ea4b9c3
user_pref("dom.allow_cut_copy", true);//XXX: //mod 

// PREF: Disable speech recognition
// https://dvcs.w3.org/hg/speech-api/raw-file/tip/speechapi.html
// https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition
// https://wiki.mozilla.org/HTML5_Speech_API
user_pref("media.webspeech.recognition.enable",			false);

// PREF: Disable speech synthesis
// https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis
user_pref("media.webspeech.synth.enabled",			false);

// PREF: Disable sensor API
// https://wiki.mozilla.org/Sensor_API
user_pref("device.sensors.enabled",				false);

// PREF: Disable pinging URIs specified in HTML <a> ping= attributes
// http://kb.mozillazine.org/Browser.send_pings
user_pref("browser.send_pings",					false);

// PREF: When browser pings are enabled, only allow pinging the same host as the origin page
// http://kb.mozillazine.org/Browser.send_pings.require_same_host
user_pref("browser.send_pings.require_same_host",		true);

// PREF: Disable IndexedDB (disabled)
// https://developer.mozilla.org/en-US/docs/IndexedDB
// https://en.wikipedia.org/wiki/Indexed_Database_API
// https://wiki.mozilla.org/Security/Reviews/Firefox4/IndexedDB_Security_Review
// http://forums.mozillazine.org/viewtopic.php?p=13842047
// https://github.com/pyllyukko/user.js/issues/8
// NOTICE-DISABLED: IndexedDB could be used for tracking purposes, but is required for some add-ons to work (notably uBlock), so is left enabled
//user_pref("dom.indexedDB.enabled",		false);
/* 2720: enforce IndexedDB (IDB) as enabled
 * IDB is required for extensions and Firefox internals (even before FF63 in [1])
 * To control *website* IDB data, control allowing cookies and service workers, or use
 * Temporary Containers. To mitigate *website* IDB, FPI helps (4001), and/or sanitize
 * on close (Offline Website Data, see 2800) or on-demand (Ctrl-Shift-Del), or automatically
 * via an extension. Note that IDB currently cannot be sanitized by host.
 * [1] https://blog.mozilla.org/addons/2018/08/03/new-backend-for-storage-local-api/ ***/
user_pref("dom.indexedDB.enabled",		true);//mod, required for uBlock Origin

// TODO: "Access Your Location" "Maintain Offline Storage" "Show Notifications"

// PREF: Disable gamepad API to prevent USB device enumeration
// https://www.w3.org/TR/gamepad/
// https://trac.torproject.org/projects/tor/ticket/13023
user_pref("dom.gamepad.enabled",				false);

// PREF: Disable virtual reality devices APIs
// https://developer.mozilla.org/en-US/Firefox/Releases/36#Interfaces.2FAPIs.2FDOM
// https://developer.mozilla.org/en-US/docs/Web/API/WebVR_API
/* 2504: disable virtual reality devices
 * Optional protection depending on your connected devices
 * [1] https://developer.mozilla.org/docs/Web/API/WebVR_API ***/
user_pref("dom.vr.enabled",					false);

// PREF: Disable vibrator API
user_pref("dom.vibrator.enabled",           false);

// PREF: Disable resource timing API
// https://www.w3.org/TR/resource-timing/#privacy-security
user_pref("dom.enable_resource_timing",				false);

// PREF: Disable Archive API (Firefox < 54)
// https://wiki.mozilla.org/WebAPI/ArchiveAPI
// https://bugzilla.mozilla.org/show_bug.cgi?id=1342361
user_pref("dom.archivereader.enabled",				false);

// PREF: Disable webGL
// https://en.wikipedia.org/wiki/WebGL
// https://www.contextis.com/resources/blog/webgl-new-dimension-browser-exploitation/
user_pref("webgl.disabled",					true);
// PREF: When webGL is enabled, use the minimum capability mode
user_pref("webgl.min_capability_mode",				true);
// PREF: When webGL is enabled, disable webGL extensions
// https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API#WebGL_debugging_and_testing
user_pref("webgl.disable-extensions",				true);
// PREF: When webGL is enabled, force enabling it even when layer acceleration is not supported
// https://trac.torproject.org/projects/tor/ticket/18603
user_pref("webgl.disable-fail-if-major-performance-caveat",	true);
// PREF: When webGL is enabled, do not expose information about the graphics driver
// https://bugzilla.mozilla.org/show_bug.cgi?id=1171228
// https://developer.mozilla.org/en-US/docs/Web/API/WEBGL_debug_renderer_info
user_pref("webgl.enable-debug-renderer-info",			false);
// somewhat related...
user_pref("pdfjs.enableWebGL",					false);

// PREF: Spoof dual-core CPU
// https://trac.torproject.org/projects/tor/ticket/21675
// https://bugzilla.mozilla.org/show_bug.cgi?id=1360039
// 4601: [2514] spoof (or limit?) number of CPU cores [FF48+]
   // [NOTE] *may* affect core chrome/Firefox performance, will affect content.
   // [1] https://bugzilla.mozilla.org/1008453
   // [2] https://trac.torproject.org/projects/tor/ticket/21675
   // [3] https://trac.torproject.org/projects/tor/ticket/22127
   // [4] https://html.spec.whatwg.org/multipage/workers.html#navigator.hardwareconcurrency
   // user_pref("dom.maxHardwareConcurrency", 2);
user_pref("dom.maxHardwareConcurrency",				4); //mod , was 2



/******************************************************************************
 * SECTION: Misc                                                              *
 ******************************************************************************/

// PREF: Disable face detection
user_pref("camera.control.face_detection.enabled",		false);

// PREF: Set the default search engine to DuckDuckGo (disabled)
// https://support.mozilla.org/en-US/questions/948134
//user_pref("browser.search.defaultenginename",		"DuckDuckGo"); //these are set elsewhere in this file, also in browser/locales/en-US/chrome/browser-region/region.properties
//user_pref("browser.search.order.1",				"DuckDuckGo");
//user_pref("keyword.URL", 							"https://duckduckgo.com/html/?q=!+");  //XXX: this isn't set or doesn't exist yet!(or hidden?)
// -------- this was removed entirely in commit f2a830c036ab272ae935a8d3b76e97f6bfba2d7c repo: https://github.com/pyllyukko/user.js.git of course!

// PREF: Disable GeoIP lookup on your address to set default search engine region
// https://trac.torproject.org/projects/tor/ticket/16254
// https://support.mozilla.org/en-US/kb/how-stop-firefox-making-automatic-connections#w_geolocation-for-default-search-engine
//0202: disable GeoIP-based search results
// NOTE: may not be hidden if Mozilla have changed your settings due to your locale
user_pref("browser.search.countryCode",				"US");
user_pref("browser.search.region",				"US");
user_pref("browser.search.geoip.url",				"https://browser.search.geoip.url.firefox_blocked_domain.tld/browser.search.geoip.url");//default value: "https://location.services.mozilla.com/v1/country?key=%MOZILLA_API_KEY%"

// PREF: Set Accept-Language HTTP header to en-US regardless of Firefox localization
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Language
// Test: https://www.whatismybrowser.com/detect/what-http-headers-is-my-browser-sending
user_pref("intl.accept_languages",				"en-US,en");//orig (the ' ' aka space is optional) and capitalization doesn't matter because in code they're lowercased, however the Accept-Language header always becomes 'en-US,en' with that case-sensitivity, regardless of the case-sensitivity value of this pref! XXX Keeping "en-US,en" because it's used raw as header in services/common/hawkrequest.js (dno what that is tho), XXX it's set to "en-US, en" when privacy.spoof_english=2 as seen in toolkit/components/resistfingerprinting/RFPHelper.jsm
//XXX: WARNING: you have to make this pref dirty in each firefox profile for it to be seen and not error on javascript console, because I'm not longer using patch 1600_intl.accept_languages_ff127_0.patch or the last used one for 126.0 1600_intl.accept_languages_ff105_0_1.patch  OR you can just make a user.js in the profile dir (each profile dir) more details: https://github.com/pyllyukko/user.js/issues/252#issuecomment-2165975861
//user_pref("intl.accept_languages",				"en-US,en");//mod,XXX:WARNING: some source code causes Accept-Language HTTP header to never be sent unless this pref is seen as modified by user (ie. manually go into about:config and modify the value so it shows as modified!) Also encountered by https://bugzilla.mozilla.org/show_bug.cgi?id=1349302#c1  tested with https://www.whatismybrowser.com/detect/what-http-headers-is-my-browser-sending  to see that header gone! no need to restart just refresh test page! I've applied patch intl.accept_languages.patch locally!
//XXX: if you set this in user.js as opposed to only in vendor.js then it will work: that is, it sends the Accept-Language header! So, the only requirement for sending that header is this property being dirty/modified! funnily enough that patch has no effect even tho it ignores the dirtiness of the property and tries to set/send the header always! I must be missing something or this is done in a different place! Ok, it's because Preferences::GetLocalizedCString(INTL_ACCEPT_LANGUAGES, acceptLanguages); returns empty string unless the prop. is modified! I don't currently get why!
//SO, if you set this intl.accept_languages value in vendor.js it will be ignored(unless you apply patch to use GetCString instead of GetLocalizedCString). But it'll work if set in user.js or manually in about:config !

// PREF: Don't use OS values to determine locale, force using Firefox locale setting
// http://kb.mozillazine.org/Intl.locale.matchOS
user_pref("intl.locale.matchOS",				false);

// PREF: Don't use Mozilla-provided location-specific search engines
user_pref("browser.search.geoSpecificDefaults",			false);

// PREF: Do not automatically send selection to clipboard on some Linux platforms
// http://kb.mozillazine.org/Clipboard.autocopy
user_pref("clipboard.autocopy",					true);//mod

// PREF: Prevent leaking application locale/date format using JavaScript
// https://bugzilla.mozilla.org/show_bug.cgi?id=867501
// https://hg.mozilla.org/mozilla-central/rev/52d635f2b33d
user_pref("javascript.use_us_english_locale",			true);

// PREF: Do not submit invalid URIs entered in the address bar to the default search engine
// http://kb.mozillazine.org/Keyword.enabled
/* 0801: disable location bar using search
 * don't leak typos to a search engine, give an error message instead ***/
//user_pref("keyword.enabled", false);
user_pref("keyword.enabled",					true);//mod  //else can't search from url bar directly!

// PREF: Don't trim HTTP off of URLs in the address bar.
// https://bugzilla.mozilla.org/show_bug.cgi?id=665580
user_pref("browser.urlbar.trimURLs",				false);

// PREF: Don't try to guess domain names when entering an invalid domain name in URL bar
// http://www-archive.mozilla.org/docs/end-user/domain-guessing.html
user_pref("browser.fixup.alternate.enabled",			false);

// PREF: When browser.fixup.alternate.enabled is enabled, strip password from 'user:password@...' URLs
// https://github.com/pyllyukko/user.js/issues/290#issuecomment-303560851
user_pref("browser.fixup.hide_user_pass", true);

//don't look up single-word searches from url bar (assumes keyword.enabled=true for this type of searches to ever work, else it only always treats keyword as website url)
user_pref("browser.fixup.dns_first_for_single_words", false);
//waeFIXME: this is currently failing (28nov2019 firefox-hg r501544+.5f0b392beadb+-1 compiled on 14 Nov 2019), that is, it's acting as if it's always true
//guess I misunderstood the pref! it always DNS-es anyway! https://bugzilla.mozilla.org/show_bug.cgi?id=1578856#c43

user_pref("browser.fixup.typo.scheme", true); //true by default

// PREF: Send DNS request through SOCKS when SOCKS proxying is in use
// https://trac.torproject.org/projects/tor/wiki/doc/TorifyHOWTO/WebBrowsers
user_pref("network.proxy.socks_remote_dns",			true);

// PREF: Don't monitor OS online/offline connection state
// https://trac.torproject.org/projects/tor/ticket/18945
user_pref("network.manage-offline-status",			false); // see bugzilla 620472

// PREF: Enforce Mixed Active Content Blocking
// https://support.mozilla.org/t5/Protect-your-privacy/Mixed-content-blocking-in-Firefox/ta-p/10990
// https://developer.mozilla.org/en-US/docs/Site_Compatibility_for_Firefox_23#Non-SSL_contents_on_SSL_pages_are_blocked_by_default
// https://blog.mozilla.org/tanvi/2013/04/10/mixed-content-blocking-enabled-in-firefox-23/
user_pref("security.mixed_content.block_active_content",	true);//FIXME: set to false if some sites still seem broken?(because uMatrix should handle this?) ; hmm this is true by default in ff source code, so keeping it true, for now!

// PREF: Enforce Mixed Passive Content blocking (a.k.a. Mixed Display Content)
// NOTICE: Enabling Mixed Display Content blocking can prevent images/styles... from loading properly when connection to the website is only partially secured
user_pref("security.mixed_content.block_display_content",	false); //mod because uMatrix should handle this; this is false by default in ff source code!

/* 1243: block unencrypted requests from Flash on encrypted pages to mitigate MitM attacks [FF59+]
 * [1] https://bugzilla.mozilla.org/1190623 ***/
user_pref("security.mixed_content.block_object_subrequest", true);//default: false, allowing false here because https-everywhere or my uMatrix mod(or was this only on chromium with hsts-hacky? i'm unsure) should change these to https

//firefox will make http requests over https automatically
// test page: https://www.phoronix.com/forums/forum/phoronix/site-discussion/1082417-two-bugs-images-emails  -- the phoronix text will not be seen(and the https padlock in the page url has an orange '!' on it) unless this is true(resulting in a greep padlock too) OR you have https-everywhere enabled! Actual image url is: http://www.phoronix.com/phxcms7-css/phoronix.png
user_pref("security.mixed_content.upgrade_display_content", true); //default: false

// PREF: Disable JAR from opening Unsafe File Types
// http://kb.mozillazine.org/Network.jar.open-unsafe-types
// CIS Mozilla Firefox 24 ESR v1.0.0 - 3.7
user_pref("network.jar.open-unsafe-types",			false);

// CIS 2.7.4 Disable Scripting of Plugins by JavaScript
// http://forums.mozillazine.org/viewtopic.php?f=7&t=153889
user_pref("security.xpconnect.plugin.unrestricted",		false);

// PREF: Set File URI Origin Policy
// http://kb.mozillazine.org/Security.fileuri.strict_origin_policy
// CIS Mozilla Firefox 24 ESR v1.0.0 - 3.8
user_pref("security.fileuri.strict_origin_policy",		true);

// PREF: Disable Displaying Javascript in History URLs
// http://kb.mozillazine.org/Browser.urlbar.filter.javascript
// CIS 2.3.6 
user_pref("browser.urlbar.filter.javascript",			true);

// PREF: Disable asm.js
// http://asmjs.org/
// https://www.mozilla.org/en-US/security/advisories/mfsa2015-29/
// https://www.mozilla.org/en-US/security/advisories/mfsa2015-50/
// https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2015-2712
user_pref("javascript.options.asmjs",				false); //XXX: does this mean protonmail won't load? it loads, can signup&login but FIXME: can't read any emails even when this is true and  javascript.options.wasm is true also! Ok it actually doesn't load the login page anymore when this is false!! Maybe I was missing something the first time I tested this to work with false and instead it must've been true somehow, or else I can't explain it!
user_pref("javascript.options.throw_on_asmjs_validation_failure", true); //default: false   (this was false during protonmail tests but had no effect even when true)

// PREF: Disable WebAssembly
// https://webassembly.org/
// https://en.wikipedia.org/wiki/WebAssembly
// https://trac.torproject.org/projects/tor/ticket/21549
user_pref("javascript.options.wasm",                           false);//was false, now mod to true, why tef did I make it true?! was able to signup and login to protonmail without this being true! but were true: devtools.debugger.features.wasm javascript.options.wasm_baselinejit javascript.options.wasm_ionjit javascript.options.wasm_verbose  and were false: javascript.options.wasm javascript.options.wasm_cranelift javascript.options.wasm_gc ; XXX: ok so can (even re)login but can't read any email(not only because javascript.options.asmjs is false and javascript.options.wasm is false, but it must be something else too): Source map error: ReferenceError: WebAssembly is not defined
//Resource URL: https://mail.protonmail.com/8.20d97cc8a9.chunk.js
//Source Map URL: 8.20d97cc8a9.chunk.js.map
user_pref("javascript.options.wasm_verbose",                           true);//is false by default
user_pref("devtools.debugger.features.wasm", false); //default: true
//^ see what this does!

//XXX: chatgpt 3.5 requires (since 18April2024) wasm: javascript.options.wasm and javascript.options.wasm_baselinejit
user_pref("javascript.options.wasm_baselinejit", false); //default: true
user_pref("javascript.options.wasm_caching", false); //default: true
user_pref("javascript.options.wasm_function_references", false); //default: true
user_pref("javascript.options.wasm_gc", false); //default: true
user_pref("javascript.options.wasm_optimizingjit", false); //default: true
user_pref("javascript.options.wasm_simd", false); //default: true
user_pref("javascript.options.wasm_simd_avx", false); //default: true
user_pref("javascript.options.wasm_tail_calls", false); //default: true
user_pref("javascript.options.wasm_trustedprincipals", false); //default: true


// PREF: Disable SVG in OpenType fonts
// https://wiki.mozilla.org/SVGOpenTypeFonts
// https://github.com/iSECPartners/publications/tree/master/reports/Tor%20Browser%20Bundle
user_pref("gfx.font_rendering.opentype_svg.enabled",		false);

// PREF: Disable in-content SVG rendering (Firefox >= 53)
// NOTICE: Disabling SVG support breaks many UI elements on many sites
// https://bugzilla.mozilla.org/show_bug.cgi?id=1216893
// https://github.com/iSECPartners/publications/raw/master/reports/Tor%20Browser%20Bundle/Tor%20Browser%20Bundle%20-%20iSEC%20Deliverable%201.3.pdf#16
user_pref("svg.disabled", false); //was true; but can't see many "icons", like on github the react emoji and report content buttons and more importantly the notification bell is also completely invisible!


// PREF: Disable video stats to reduce fingerprinting threat
// https://bugzilla.mozilla.org/show_bug.cgi?id=654550
// https://github.com/pyllyukko/user.js/issues/9#issuecomment-100468785
// https://github.com/pyllyukko/user.js/issues/9#issuecomment-148922065
user_pref("media.video_stats.enabled",				false);

// PREF: Don't reveal build ID
// Value taken from Tor Browser
// https://bugzilla.mozilla.org/show_bug.cgi?id=583181
/* 4702: navigator.buildID
 * Revealed build time down to the second. In FF64+ it now returns a fixed timestamp
 * [1] https://bugzilla.mozilla.org/583181
 * [2] https://www.fxsitecompat.com/en-CA/docs/2018/navigator-buildid-now-returns-a-fixed-timestamp/ ***/
user_pref("general.buildID.override",				"20100101");

user_pref("browser.startup.homepage_override.buildID",		"20100101");
//user_pref("browser.startup.homepage_override.buildID",		"20190326001640"); //this is manually set in about:config for some reason
user_pref("browser.startup.homepage_override.mstone", "ignore"); // master switch
//user_pref("browser.startup.homepage_override.mstone", "68.0a1"); // this got manually set(aka modified) in about:config

// PREF: Prevent font fingerprinting
// PREF: Don't use document specified fonts to prevent installed font enumeration (fingerprinting)
// https://github.com/pyllyukko/user.js/issues/395
// https://browserleaks.com/fonts
// https://github.com/pyllyukko/user.js/issues/120
user_pref("browser.display.use_document_fonts",			1); //mod set to 1 to enable because google dev pages otherwise don't show fonts for some iconds and they show up as text overwriting other text and thus they look big and taking up space and making the webpage ugly! 
user_pref("gfx.downloadable_fonts.otl_validation", true); //not sure what this is tho
user_pref("gfx.missing_fonts.notify", true); //wtw this is, added it too.

// PREF: Enable only whitelisted URL protocol handlers
// http://kb.mozillazine.org/Network.protocol-handler.external-default
// http://kb.mozillazine.org/Network.protocol-handler.warn-external-default
// http://kb.mozillazine.org/Network.protocol-handler.expose.%28protocol%29
// https://news.ycombinator.com/item?id=13047883
// https://bugzilla.mozilla.org/show_bug.cgi?id=167475
// https://github.com/pyllyukko/user.js/pull/285#issuecomment-298124005
// NOTICE: Disabling nonessential protocols breaks all interaction with custom protocols such as mailto:, irc:, magnet: ... and breaks opening third-party mail/messaging/torrent/... clients when clicking on links with these protocols
// TODO: Add externally-handled protocols from Windows 8.1 and Windows 10 (currently contains protocols only from Linux and Windows 7) that might pose a similar threat (see e.g. https://news.ycombinator.com/item?id=13044991)
// TODO: Add externally-handled protocols from Mac OS X that might pose a similar threat (see e.g. https://news.ycombinator.com/item?id=13044991)
// If you want to enable a protocol, set network.protocol-handler.expose.(protocol) to true and network.protocol-handler.external.(protocol) to:
//   * true, if the protocol should be handled by an external application
//   * false, if the protocol should be handled internally by Firefox
user_pref("network.protocol-handler.warn-external-default",	true);
user_pref("network.protocol-handler.external.http",		false);
user_pref("network.protocol-handler.external.https",		false);
user_pref("network.protocol-handler.external.javascript",	false);
user_pref("network.protocol-handler.external.moz-extension",	false);//nvm: mod to can install uMatrix & uBlock Origin  by pointing to the .xpi on command line!  well, that wasn't it!
user_pref("network.protocol-handler.external.ftp",		false);
user_pref("network.protocol-handler.external.file",		false);
user_pref("network.protocol-handler.external.about",		false);
user_pref("network.protocol-handler.external.chrome",		false);
user_pref("network.protocol-handler.external.blob",		false);
user_pref("network.protocol-handler.external.data",		false);
user_pref("network.protocol-handler.expose-all",		false);
user_pref("network.protocol-handler.expose.http",		true);
user_pref("network.protocol-handler.expose.https",		true);
user_pref("network.protocol-handler.expose.javascript",		true);
user_pref("network.protocol-handler.expose.moz-extension",	true);
user_pref("network.protocol-handler.expose.ftp",		true);
user_pref("network.protocol-handler.expose.file",		true);
user_pref("network.protocol-handler.expose.about",		true);
user_pref("network.protocol-handler.expose.chrome",		true);
user_pref("network.protocol-handler.expose.blob",		true);
user_pref("network.protocol-handler.expose.data",		true);

/******************************************************************************
 * SECTION: Extensions / plugins                                                       *
 ******************************************************************************/

// PREF: Ensure you have a security delay when installing add-ons (milliseconds)
// http://kb.mozillazine.org/Disable_extension_install_delay_-_Firefox
// http://www.squarefree.com/2004/07/01/race-conditions-in-security-dialogs/
/* 2684: enforce a security delay on some confirmation dialogs such as install, open/save
 * [1] http://kb.mozillazine.org/Disable_extension_install_delay_-_Firefox
 * [2] https://www.squarefree.com/2004/07/01/race-conditions-in-security-dialogs/ ***/
user_pref("security.dialog_enable_delay",			1000);

// PREF: Require signatures
// https://wiki.mozilla.org/Addons/Extension_Signing
user_pref("xpinstall.signatures.required",		false); //mod

// PREF: Opt-out of add-on metadata updates
// https://blog.mozilla.org/addons/how-to-opt-out-of-add-on-metadata-updates/
user_pref("extensions.getAddons.cache.enabled",			false);

// PREF: Opt-out of themes (Persona) updates
// https://support.mozilla.org/t5/Firefox/how-do-I-prevent-autoamtic-updates-in-a-50-user-environment/td-p/144287
user_pref("lightweightThemes.update.enabled",			false);

// PREF: Disable Flash Player NPAPI plugin
// http://kb.mozillazine.org/Flash_plugin
user_pref("plugin.state.flash",					0);

// PREF: Disable Java NPAPI plugin
user_pref("plugin.state.java",					0);

/* 1805: disable scanning for plugins [WINDOWS]
 * [1] http://kb.mozillazine.org/Plugin_scanning
 * plid.all = whether to scan the directories specified in the Windows registry for PLIDs.
 * Used to detect RealPlayer, Java, Antivirus etc, but since FF52 only covers Flash ***/
user_pref("plugin.scan.plid.all", false);


// PREF: Disable sending Flash Player crash reports
user_pref("dom.ipc.plugins.flash.subprocess.crashreporter.enabled",	false);

// PREF: When Flash crash reports are enabled, don't send the visited URL in the crash report
user_pref("dom.ipc.plugins.reportCrashURL",			false);

// PREF: When Flash is enabled, download and use Mozilla SWF URIs blocklist
// https://bugzilla.mozilla.org/show_bug.cgi?id=1237198
// https://github.com/mozilla-services/shavar-plugin-blocklist
//user_pref("browser.safebrowsing.blockedURIs.enabled", true);
user_pref("browser.safebrowsing.blockedURIs.enabled", false);//was true

// PREF: Disable Shumway (Mozilla Flash renderer)
// https://developer.mozilla.org/en-US/docs/Mozilla/Projects/Shumway
user_pref("shumway.disabled", true);
// this pref is gone! 29nov2020

// PREF: Disable Gnome Shell Integration NPAPI plugin
user_pref("plugin.state.libgnome-shell-browser-plugin",		0);

// PREF: Disable the bundled OpenH264 video codec (disabled)
// http://forums.mozillazine.org/viewtopic.php?p=13845077&sid=28af2622e8bd8497b9113851676846b1#p13845077
/* 1820: disable all GMP (Gecko Media Plugins) [SETUP-WEB]
 * [1] https://wiki.mozilla.org/GeckoMediaPlugins ***/
user_pref("media.gmp-provider.enabled",		false);//mod
user_pref("media.gmp.trial-create.enabled", false);
//user_pref("media.gmp-manager.url", "data:text/plain,");
//user_pref("media.gmp-manager.url.override", "data:text/plain,"); // [HIDDEN PREF]
user_pref("media.gmp-manager.url",				"https://media.gmp-manager.url.firefox_blocked_domain.tld/media.gmp-manager.url/somefile.xml");//default value: "https://aus5.mozilla.org/update/3/GMP/%VERSION%/%BUILD_ID%/%BUILD_TARGET%/%LOCALE%/%CHANNEL%/%OS_VERSION%/%DISTRIBUTION%/%DISTRIBUTION_VERSION%/update.xml"
user_pref("media.gmp-manager.url.override", "https://media.gmp-manager.url.override.firefox_blocked_domain.tld/media.gmp-manager.url.override/some.xml"); //mod + line added by je; this is: // User-settable override to media.gmp-manager.url for testing purposes.


// PREF: Enable plugins click-to-play
// https://wiki.mozilla.org/Firefox/Click_To_Play
// https://blog.mozilla.org/security/2012/10/11/click-to-play-plugins-blocklist-style/
/* 1802: enable click to play and set to 0 minutes ***/
user_pref("plugins.click_to_play",				true);
user_pref("plugin.sessionPermissionNow.intervalInMinutes", 0);


// PREF: Updates addons automatically
// https://blog.mozilla.org/addons/how-to-turn-off-add-on-updates/
/* 0301b: disable auto-CHECKING for extension and theme updates ***/
user_pref("extensions.update.enabled",				false);//
user_pref("extensions.update.url", "https://extensions.update.url.firefox_blocked_domain.tld/"); //default value: "https://versioncheck.addons.mozilla.org/update/VersionCheck.php?reqVersion=%REQ_VERSION%&id=%ITEM_ID%&version=%ITEM_VERSION%&maxAppVersion=%ITEM_MAXAPPVERSION%&status=%ITEM_STATUS%&appID=%APP_ID%&appVersion=%APP_VERSION%&appOS=%APP_OS%&appABI=%APP_ABI%&locale=%APP_LOCALE%&currentAppVersion=%CURRENT_APP_VERSION%&updateType=%UPDATE_TYPE%&compatMode=%COMPATIBILITY_MODE%"
user_pref("extensions.update.background.url", "https://extensions.update.background.url.firefox_blocked_domain.tld/"); //default value: "https://versioncheck-bg.addons.mozilla.org/update/VersionCheck.php?reqVersion=%REQ_VERSION%&id=%ITEM_ID%&version=%ITEM_VERSION%&maxAppVersion=%ITEM_MAXAPPVERSION%&status=%ITEM_STATUS%&appID=%APP_ID%&appVersion=%APP_VERSION%&appOS=%APP_OS%&appABI=%APP_ABI%&locale=%APP_LOCALE%&currentAppVersion=%CURRENT_APP_VERSION%&updateType=%UPDATE_TYPE%&compatMode=%COMPATIBILITY_MODE%"

// PREF: Enable add-on and certificate blocklists (OneCRL) from Mozilla
// https://wiki.mozilla.org/Blocklisting
// https://blocked.cdn.mozilla.net/
// http://kb.mozillazine.org/Extensions.blocklist.enabled
// http://kb.mozillazine.org/Extensions.blocklist.url
// https://blog.mozilla.org/security/2015/03/03/revoking-intermediate-certificates-introducing-onecrl/
// Updated at interval defined in extensions.blocklist.interval (default: 86400)
user_pref("extensions.blocklist.enabled",			false); //mod
user_pref("services.blocklist.update_enabled",			false);//mod

// PREF: Decrease system information leakage to Mozilla blocklist update servers
// https://trac.torproject.org/projects/tor/ticket/16931
user_pref("extensions.blocklist.url",				"https://extensions.blocklist.url.firefox_blocked_domain.tld/extensions.blocklist.url"//mod  //default value: "https://blocklists.settings.services.mozilla.com/v1/blocklist/3/%APP_ID%/%APP_VERSION%/%PRODUCT%/%BUILD_ID%/%BUILD_TARGET%/%LOCALE%/%CHANNEL%/%OS_VERSION%/%DISTRIBUTION%/%DISTRIBUTION_VERSION%/%PING_COUNT%/%TOTAL_PING_COUNT%/%DAYS_SINCE_LAST_PING%/"
//"https://blocklist.addons.mozilla.org/blocklist/3/%APP_ID%/%APP_VERSION%/"
);
/* 0403: disable individual unwanted/unneeded parts of the Kinto blocklists
 * What is Kinto?: https://wiki.mozilla.org/Firefox/Kinto#Specifications
 * As Firefox transitions to Kinto, the blocklists have been broken down into entries for certs to be
 * revoked, extensions and plugins to be disabled, and gfx environments that cause problems or crashes ***/
   // user_pref("services.blocklist.onecrl.collection", ""); // revoked certificates
   // user_pref("services.blocklist.addons.collection", "");
   // user_pref("services.blocklist.plugins.collection", "");
   // user_pref("services.blocklist.gfx.collection", "");


// PREF: Disable system add-on updates (hidden & always-enabled add-ons from Mozilla)
// https://firefox-source-docs.mozilla.org/toolkit/mozapps/extensions/addon-manager/SystemAddons.html
// https://blog.mozilla.org/data/2018/08/20/effectively-measuring-search-in-firefox/
// https://github.com/pyllyukko/user.js/issues/419
// https://dxr.mozilla.org/mozilla-central/source/toolkit/mozapps/extensions/AddonManager.jsm#1248-1257
// NOTICE: Disabling system add-on updates prevents Mozilla from "hotfixing" your browser to patch critical problems (one possible use case from the documentation)
user_pref("extensions.systemAddon.update.enabled",             false);
user_pref("extensions.systemAddon.update.url", "https://extensions.systemAddon.update.url.firefox_blocked_domain.tld/"); // default value: "https://aus5.mozilla.org/update/3/SystemAddons/%VERSION%/%BUILD_ID%/%BUILD_TARGET%/%LOCALE%/%CHANNEL%/%OS_VERSION%/%DISTRIBUTION%/%DISTRIBUTION_VERSION%/update.xml"


/******************************************************************************
 * SECTION: Firefox (anti-)features / components                              *                            *
 ******************************************************************************/

// PREF: Disable Extension recommendations (Firefox >= 65)
// https://support.mozilla.org/en-US/kb/extension-recommendations
// [SETTING] General>Browsing>Recommend extensions as you browse
      // [1] https://support.mozilla.org/en-US/kb/extension-recommendations
user_pref("browser.newtabpage.activity-stream.asrouter.userprefs.cfr", false);

// PREF: Trusted Recursive Resolver (DNS-over-HTTPS) (disabled)
// https://wiki.mozilla.org/Trusted_Recursive_Resolver
/* 0707: disable (or setup) DNS-over-HTTPS (DoH) [FF60+]
 * TRR = Trusted Recursive Resolver
 * .mode: 0=off, 1=race, 2=TRR first, 3=TRR only, 4=race for stats but always use native result
 * [WARNING] DoH bypasses hosts and gives info to yet another party (e.g. Cloudflare)
 * [1] https://www.ghacks.net/2018/04/02/configure-dns-over-https-in-firefox/
 * [2] https://hacks.mozilla.org/2018/05/a-cartoon-intro-to-dns-over-https/ ***/
//user_pref("network.trr.mode",                                        0);//upstream(yes, it's commented out)
user_pref("network.trr.mode",                                        5);//5 explicitly turn off!
//user_pref("network.trr.uri", "https://mozilla.cloudflare-dns.com/dns-query");//already set to this by firefox!
user_pref("network.trr.uri", "");//mod
user_pref("network.trr.custom_uri", "");//already set to empty by firefox!
user_pref("network.trr.bootstrapAddress", ""); //default: ""
//XXX: see all/more options by searching for network.trr in about:config !
//
//Trusted Recursive Resolver
//
//Firefox provides an optional resolver mechanism using a dedicated DNS-over-HTTPS server.
//
//DNS-over-HTTPS (DOH) allows DNS resolves with enhanced privacy, secure transfers and improved performance.
//Setting DNS-over-HTTPS in Firefox
//
//    Set `network.trr.mode` to 2 to make DNS Over HTTPS the browser's first choice but use regular DNS as a fallback (0 is "off by default", 1 lets Firefox pick whichever is faster, 3 for TRR only mode, 5 to explicitly turn it off).
//    Set `network.trr.uri`. Ones that you may use: https://mozilla.cloudflare-dns.com/dns-query (Privacy Policy), https://dns.google.com/experimental
//
//TRR is preffed OFF by default and you need to set a URI for an available DOH server to be able to use it. Since the URI for DOH is set with a name itself, it may have to use the native resolver for bootstrapping. (Optionally, the user can set the IP address of the DOH server in a pref to avoid the required initial native resolve.)
//
//All prefs for TRR are under the "network.trr" hierarchy.
//Dynamic Blacklist
//
//To keep the failure rate at a minimum, the TRR system manages a dynamic persistent blacklist for host names that can't be resolved with DOH but works with the native resolver. Blacklisted entries will not be retried over DOH for a couple of days. "localhost" and names in the ".local" TLD will never be resolved via DOH.
//
//
//When TRR starts up, it will first verify that it works by first checking a "confirmation" domain name. This confirmation domain is a pref by default set to "example.com". TRR will also by default await the captive-portal detection to raise its green flag before getting activated.
//See also
//
//    Initial ticket: https://bugzilla.mozilla.org/show_bug.cgi?id=1434852
//    The DNS-over-HTTPS spec: https://tools.ietf.org/html/rfc8484



// PREF: Disable WebIDE
// https://trac.torproject.org/projects/tor/ticket/16222
// https://developer.mozilla.org/docs/Tools/WebIDE
user_pref("devtools.webide.enabled",				false);
user_pref("devtools.webide.autoinstallADBExtension", false); // [FF64+]
user_pref("devtools.webide.autoinstallADBHelper",		false);
user_pref("devtools.webide.autoinstallFxdtAdapters",		false);

// PREF: Disable remote debugging
// https://developer.mozilla.org/en-US/docs/Tools/Remote_Debugging/Debugging_Firefox_Desktop
// https://developer.mozilla.org/en-US/docs/Tools/Tools_Toolbox#Advanced_settings
user_pref("devtools.debugger.remote-enabled",			false);
user_pref("devtools.chrome.enabled",				false);
user_pref("devtools.debugger.force-local",			true);

// PREF: Disable Mozilla telemetry/experiments
// https://wiki.mozilla.org/Platform/Features/Telemetry
// https://wiki.mozilla.org/Privacy/Reviews/Telemetry
// https://wiki.mozilla.org/Telemetry
// https://www.mozilla.org/en-US/legal/privacy/firefox.html#telemetry
// https://support.mozilla.org/t5/Firefox-crashes/Mozilla-Crash-Reporter/ta-p/1715
// https://wiki.mozilla.org/Security/Reviews/Firefox6/ReviewNotes/telemetry
// https://gecko.readthedocs.io/en/latest/browser/experiments/experiments/manifest.html
// https://wiki.mozilla.org/Telemetry/Experiments
// https://support.mozilla.org/en-US/questions/1197144
// https://firefox-source-docs.mozilla.org/toolkit/components/telemetry/telemetry/internals/preferences.html#id1
// 0330a: disable telemetry  https://www.ghacks.net/2015/08/18/a-comprehensive-list-of-firefox-privacy-and-security-settings/
// https://gecko.readthedocs.org/en/latest/toolkit/components/telemetry/telemetry/preferences.html
// the pref (.unified) affects the behaviour of the pref (.enabled)
// IF unified=false then .enabled controls the telemetry module
// IF unified=true then .enabled ONLY controls whether to record extended data
// so make sure to have both set as false
user_pref("toolkit.telemetry.enabled",				false);
user_pref("toolkit.telemetry.unified",				false);
user_pref("toolkit.telemetry.archive.enabled",                 false);
user_pref("experiments.supported",				false);
user_pref("experiments.enabled",				false);
user_pref("experiments.manifest.uri",				"https://experiments.manifest.uri.firefox_blocked_domain.tld/experiments.manifest.uri");//default value: "https://telemetry-experiment.cdn.mozilla.net/manifest/v1/firefox/%VERSION%/%CHANNEL%" //mod

// PREF: Disallow Necko to do A/B testing
// https://trac.torproject.org/projects/tor/ticket/13170
user_pref("network.allow-experiments",				false);

// PREF: Disable sending Firefox crash reports to Mozilla servers
// https://wiki.mozilla.org/Breakpad
// http://kb.mozillazine.org/Breakpad
// https://dxr.mozilla.org/mozilla-central/source/toolkit/crashreporter
// https://bugzilla.mozilla.org/show_bug.cgi?id=411490
// A list of submitted crash reports can be found at about:crashes
user_pref("breakpad.reportURL",					"https://breakpad.reportURL.firefox_blocked_domain.tld/breakpad.reportURL/");//default value: "https://crash-stats.mozilla.com/report/index/"  //mod

// PREF: Disable sending reports of tab crashes to Mozilla (about:tabcrashed), don't nag user about unsent crash reports
// https://hg.mozilla.org/mozilla-central/file/tip/browser/app/profile/firefox.js
user_pref("browser.tabs.crashReporting.sendReport",		false);
user_pref("browser.crashReports.unsubmittedCheck.enabled",	false);
/* 0351: disable backlogged Crash Reports
 * [SETTING] Privacy & Security>Firefox Data Collection & Use>Allow Firefox to send backlogged crash reports  ***/
user_pref("browser.crashReports.unsubmittedCheck.autoSubmit2", false); // [FF58+]

// PREF: Disable FlyWeb (discovery of LAN/proximity IoT devices that expose a Web interface)
// https://wiki.mozilla.org/FlyWeb
// https://wiki.mozilla.org/FlyWeb/Security_scenarios
// https://docs.google.com/document/d/1eqLb6cGjDL9XooSYEEo7mE-zKQ-o-AuDTcEyNhfBMBM/edit
// http://www.ghacks.net/2016/07/26/firefox-flyweb
user_pref("dom.flyweb.enabled",					false);

// PREF: Disable the UITour backend
// https://trac.torproject.org/projects/tor/ticket/19047#comment:3
user_pref("browser.uitour.enabled",				false);
user_pref("browser.uitour.url", "");


// PREF: Enable Firefox Tracking Protection
// https://wiki.mozilla.org/Security/Tracking_protection
// https://support.mozilla.org/en-US/kb/tracking-protection-firefox
// https://support.mozilla.org/en-US/kb/tracking-protection-pbm
// https://kontaxis.github.io/trackingprotectionfirefox/
// https://feeding.cloud.geek.nz/posts/how-tracking-protection-works-in-firefox/
user_pref("privacy.trackingprotection.enabled",			true);
user_pref("privacy.trackingprotection.pbmode.enabled",		true);

// PREF: Enable contextual identity Containers feature (Firefox >= 52)
// NOTICE: Containers are not available in Private Browsing mode
// https://wiki.mozilla.org/Security/Contextual_Identity_Project/Containers
user_pref("privacy.userContext.enabled",			true);
//note: privacy.userContext.extension is set to email of treestyletab(tst) addon, as a modified pref (seen in about:support, if you have the patch that shows all modified prefs)

// PREF: Enable Firefox's anti-fingerprinting mode ("resist fingerprinting" or RFP) (Tor Uplift project)
// https://wiki.mozilla.org/Security/Tor_Uplift/Tracking
// https://bugzilla.mozilla.org/show_bug.cgi?id=1333933
// https://wiki.mozilla.org/Security/Fingerprinting
// NOTICE: RFP breaks some keyboard shortcuts used in certain websites (see #443)
// NOTICE: RFP changes your time zone
//user_pref("privacy.resistFingerprinting",			true);
user_pref("privacy.resistFingerprinting",			false); //remod

// PREF: disable mozAddonManager Web API [FF57+]
// https://bugzilla.mozilla.org/buglist.cgi?bug_id=1384330
// https://bugzilla.mozilla.org/buglist.cgi?bug_id=1406795
// https://bugzilla.mozilla.org/buglist.cgi?bug_id=1415644
// https://bugzilla.mozilla.org/buglist.cgi?bug_id=1453988
// https://trac.torproject.org/projects/tor/ticket/26114
user_pref("privacy.resistFingerprinting.block_mozAddonManager", true);
user_pref("extensions.webextensions.restrictedDomains", "");
/* 4503: disable mozAddonManager Web API [FF57+]
 * [NOTE] As a side-effect in FF57-59 this allowed extensions to work on AMO. In FF60+ you also need
 * to sanitize or clear extensions.webextensions.restrictedDomains (see 2662) to keep that side-effect
 * [1] https://bugzilla.mozilla.org/buglist.cgi?bug_id=1384330,1406795,1415644,1453988 ***/
//https://bugzilla.mozilla.org/show_bug.cgi?id=1310082#c24
//user_pref("privacy.resistFingerprinting.block_mozAddonManager", true); // [HIDDEN PREF]

// PREF: enable RFP letterboxing / resizing of inner window [FF67+] (disabled)
// https://bugzilla.mozilla.org/1407366
//user_pref("privacy.resistFingerprinting.letterboxing", true);
//user_pref("privacy.resistFingerprinting.letterboxing.dimensions", "800x600, 1000x1000, 1600x900");
/* 4504: enable RFP letterboxing [FF67+]
 * Dynamically resizes the inner window in 200w x100h steps by applying letterboxing, using dimensions
 * which waste the least content area, If you use the dimension pref, then it will only apply those
 * resolutions. The format is "width1xheight1, width2xheight2, ..." (e.g. "800x600, 1000x1000, 1600x900")
 * [NOTE] This does NOT require RFP (see 4501) **for now**
 * [WARNING] The dimension pref is only meant for testing, and we recommend you DO NOT USE it
 * [1] https://bugzilla.mozilla.org/1407366 ***/
user_pref("privacy.resistFingerprinting.letterboxing", false); // [HIDDEN PREF]  false(default) because this sucks!
user_pref("privacy.resistFingerprinting.letterboxing.dimensions", "400x200, 500x300, 800x500, 1000x572, 1000x600, 1200x600, 1300x600, 1360x660, 1366x645, 1366x660, 1000x1000, 1300x1000, 1466x1100"); // [HIDDEN PREF] //without this it's 1200x600 for me when maximized instead of 1366x673 when letterboxing=false! check window size with: https://www.webfx.com/tools/whats-my-browser-size/ with this set, I get 1366x660 when maximized, 1360x660 when not maximized but whole-screen sized! and lower resolutions when lower dimensions, however when resizing, intermediate 1 pixel sizes are detected!
// 1000x1000 is default window on i87k
// 1000x572 is what happens when you press Alt and the menu appears! w/o this it would be 800x500 ! (same for 1366x645 which w/o menu would be 1366x673)
//due to RFP browser size is 1000x600 on startup!
/* ^ "privacy.resistFingerprinting.letterboxing.dimensions". This pref
should be formated as 'width1xheight1, width2xheight2, ...'. We will
find the dimensions which can fit into the real content size and have
the smallest margins to be the rounded content viewport size. For example
, given the set "400x200, 500x300, 800x500" and the real content size
"600x300", we would round the content size into 500x300.
  src: https://bugzilla.mozilla.org/show_bug.cgi?id=1407366#c32 */

// PREF: disable showing about:blank/maximized window as soon as possible during startup [FF60+]
// https://bugzilla.mozilla.org/1448423
user_pref("browser.startup.blankWindow", false);
/* 4510: disable showing about:blank as soon as possible during startup [FF60+]
 * When default true (FF62+) this no longer masks the RFP chrome resizing activity
 * [1] https://bugzilla.mozilla.org/1448423 ***/
//user_pref("browser.startup.blankWindow", false);

// PREF: Disable the built-in PDF viewer
// https://web.nvd.nist.gov/view/vuln/detail?vulnId=CVE-2015-2743
// https://blog.mozilla.org/security/2015/08/06/firefox-exploit-found-in-the-wild/
// https://www.mozilla.org/en-US/security/advisories/mfsa2015-69/
/* 2620: enable Firefox's built-in PDF reader
 * This setting controls if the option "Display in Firefox" in the above setting is available
 *   and by effect controls whether PDFs are handled in-browser or externally ("Ask" or "Open With")
 * PROS: pdfjs is lightweight, open source, and as secure/vetted as any pdf reader out there (more than most)
 *   Exploits are rare (1 serious case in 4 yrs), treated seriously and patched quickly.
 *   It doesn't break "state separation" of browser content (by not sharing with OS, independent apps).
 *   It maintains disk avoidance and application data isolation. It's convenient. You can still save to disk.
 * CONS: You may prefer a different pdf reader for security reasons
 * CAVEAT: JS can still force a pdf to open in-browser by bundling its own code (rare)
 * [SETTING] General>Applications>Portable Document Format (PDF) ***/
user_pref("pdfjs.disabled",					true);

// PREF: Disable collection/sending of the health report (healthreport.sqlite*)
// https://support.mozilla.org/en-US/kb/firefox-health-report-understand-your-browser-perf
// https://gecko.readthedocs.org/en/latest/toolkit/components/telemetry/telemetry/preferences.html
user_pref("datareporting.healthreport.uploadEnabled",		false);
user_pref("datareporting.healthreport.service.enabled",		false);
user_pref("datareporting.policy.dataSubmissionEnabled",		false);
// "Allow Firefox to make personalized extension recommendations"
user_pref("browser.discovery.enabled",                         false);
user_pref("browser.discovery.containers.enabled", false); // default: true
user_pref("browser.discovery.sites", ""); //default value: "addons.mozilla.org"


// PREF: Disable Shield/Heartbeat/Normandy (Mozilla user rating telemetry)
// https://wiki.mozilla.org/Advocacy/heartbeat
// https://trac.torproject.org/projects/tor/ticket/19047
user_pref("browser.selfsupport.url",				"");//can't find where this is set anywhere, so no default value!
//^ seems gone by now 29nov2020!
// https://trac.torproject.org/projects/tor/ticket/18738
// https://wiki.mozilla.org/Firefox/Shield
// https://github.com/mozilla/normandy
// https://support.mozilla.org/en-US/kb/shield
// https://bugzilla.mozilla.org/show_bug.cgi?id=1370801
//user_pref("app.normandy.enabled", false);
//user_pref("app.normandy.api_url", "");
//user_pref("extensions.shield-recipe-client.enabled",           false);
//user_pref("app.shield.optoutstudies.enabled",                  false);
//https://wiki.mozilla.org/Firefox/Normandy/PreferenceRollout
//https://github.com/mozilla/normandy
user_pref("app.normandy.enabled", false); //default: true
user_pref("app.normandy.dev_mode", false); //default: false
user_pref("app.normandy.api_url", "https://app.normandy.api_url.firefox_blocked_domain.tld/"); // default value: "https://normandy.cdn.mozilla.net/api/v1"
user_pref("app.normandy.shieldLearnMoreUrl", "https://app.normandy.shieldLearnMoreUrl.firefox_blocked_domain.tld/"); //default value: "https://support.mozilla.org/1/firefox/%VERSION%/%OS%/%LOCALE%/shield"
user_pref("features.normandy-remote-settings.enabled", false); //default: false
// PREF: Disable SHIELD
// https://support.mozilla.org/en-US/kb/shield
// https://bugzilla.mozilla.org/show_bug.cgi?id=1370801
user_pref("extensions.shield-recipe-client.enabled",		false);
user_pref("app.shield.optoutstudies.enabled",			false);


// PREF: Disable Firefox Hello (disabled) (Firefox < 49)
// https://wiki.mozilla.org/Loop
// https://support.mozilla.org/t5/Chat-and-share/Support-for-Hello-discontinued-in-Firefox-49/ta-p/37946
// NOTICE-DISABLED: Firefox Hello requires setting `media.peerconnection.enabled` and `media.getusermedia.screensharing.enabled` to true, `security.OCSP.require` to false to work.
user_pref("loop.enabled",		false);//mod

// PREF: Disable Firefox Hello metrics collection
// https://groups.google.com/d/topic/mozilla.dev.platform/nyVkCx-_sFw/discussion
user_pref("loop.logDomains",					false);

// PREF: Enable Auto Update (disabled)
// NOTICE: Fully automatic updates are disabled and left to package management systems on Linux. Windows users may want to change this setting.
// CIS 2.1.1
user_pref("app.update.auto",					false);//mod

// PREF: Enforce checking for Firefox updates
// http://kb.mozillazine.org/App.update.enabled
// NOTICE: Update check page might incorrectly report Firefox ESR as out-of-date
user_pref("app.update.enabled",                 false);//mod

// PREF: Enable blocking reported web forgeries
// https://wiki.mozilla.org/Security/Safe_Browsing
// http://kb.mozillazine.org/Safe_browsing
// https://support.mozilla.org/en-US/kb/how-does-phishing-and-malware-protection-work
// http://forums.mozillazine.org/viewtopic.php?f=39&t=2711237&p=12896849#p12896849
// CIS 2.3.4
user_pref("browser.safebrowsing.enabled",			false); // Firefox < 50 //mod
user_pref("browser.safebrowsing.phishing.enabled",		false); // firefox >= 50 //mod

// PREF: Enable blocking reported attack sites
// http://kb.mozillazine.org/Browser.safebrowsing.malware.enabled
// CIS 2.3.5
user_pref("browser.safebrowsing.malware.enabled",		false);//mod

// PREF: Disable querying Google Application Reputation database for downloaded binary files
// https://www.mozilla.org/en-US/firefox/39.0/releasenotes/
// https://wiki.mozilla.org/Security/Application_Reputation
user_pref("browser.safebrowsing.downloads.remote.enabled",	false);

// PREF: Disable Pocket
// https://support.mozilla.org/en-US/kb/save-web-pages-later-pocket-firefox
// https://github.com/pyllyukko/user.js/issues/143
user_pref("browser.pocket.enabled",				false);
user_pref("extensions.pocket.enabled",				false);


// PREF: Disable "Recommended by Pocket" in Firefox Quantum
user_pref("browser.newtabpage.activity-stream.feeds.section.topstories",	false);

user_pref("browser.newtabpage.activity-stream.section.highlights.includePocket", false); //default unset, but the services.sync.prefs.sync.* exists for it!
user_pref("browser.newtabpage.activity-stream.showSponsored", false);
user_pref("browser.newtabpage.activity-stream.feeds.discoverystreamfeed", false); // [FF66+]

/******************************************************************************
 * SECTION: Automatic connections                                             *
 ******************************************************************************/

// PREF: Limit the connection keep-alive timeout to 15 seconds (disabled)
// https://github.com/pyllyukko/user.js/issues/387
// http://kb.mozillazine.org/Network.http.keep-alive.timeout
// https://httpd.apache.org/docs/current/mod/core.html#keepalivetimeout
//user_pref("network.http.keep-alive.timeout",                 15);
user_pref("network.http.keep-alive.timeout", 115);//mod


// PREF: Disable prefetching of <link rel="next"> URLs
// http://kb.mozillazine.org/Network.prefetch-next
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Link_prefetching_FAQ#Is_there_a_preference_to_disable_link_prefetching.3F
user_pref("network.prefetch-next",				false);

// PREF: Disable DNS prefetching
// http://kb.mozillazine.org/Network.dns.disablePrefetch
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Controlling_DNS_prefetching
user_pref("network.dns.disablePrefetch",			true);
user_pref("network.dns.disablePrefetchFromHTTPS",		true);

// PREF: Disable the predictive service (Necko)
// https://wiki.mozilla.org/Privacy/Reviews/Necko
user_pref("network.predictor.enabled",				false);
/* 0608: disable predictor / prefetching [FF48+] ***/
user_pref("network.predictor.enable-prefetch", false);


// PREF: Reject .onion hostnames before passing the to DNS
// https://bugzilla.mozilla.org/show_bug.cgi?id=1228457
// RFC 7686
user_pref("network.dns.blockDotOnion",				true);

// PREF: Disable search suggestions in the search bar
// http://kb.mozillazine.org/Browser.search.suggest.enabled
user_pref("browser.search.suggest.enabled",			false);

// PREF: Disable "Show search suggestions in location bar results"
user_pref("browser.urlbar.suggest.searches",			false);
// PREF: When using the location bar, don't suggest URLs from browsing history
user_pref("browser.urlbar.suggest.history",			true);//mod
user_pref("browser.urlbar.suggest.bookmark",			true);//addition!

// PREF: Disable SSDP
// https://bugzilla.mozilla.org/show_bug.cgi?id=1111967
user_pref("browser.casting.enabled",				false);

// PREF: Disable automatic downloading of OpenH264 codec
// https://support.mozilla.org/en-US/kb/how-stop-firefox-making-automatic-connections#w_media-capabilities
// https://andreasgal.com/2014/10/14/openh264-now-in-firefox/
user_pref("media.gmp-gmpopenh264.enabled",			false);
user_pref("media.gmp-gmpopenh264.autoupdate", false);

// PREF: Disable speculative pre-connections
// https://support.mozilla.org/en-US/kb/how-stop-firefox-making-automatic-connections#w_speculative-pre-connections
// https://bugzilla.mozilla.org/show_bug.cgi?id=814169
user_pref("network.http.speculative-parallel-limit",		0);

// PREF: Disable downloading homepage snippets/messages from Mozilla
// https://support.mozilla.org/en-US/kb/how-stop-firefox-making-automatic-connections#w_mozilla-content
// https://wiki.mozilla.org/Firefox/Projects/Firefox_Start/Snippet_Service
user_pref("browser.aboutHomeSnippets.updateUrl",		"https://browser.aboutHomeSnippets.updateUrl.firefox_blocked_domain.tld/browser.aboutHomeSnippets.updateUrl/");//default value: "https://snippets.cdn.mozilla.net/%STARTPAGE_VERSION%/%NAME%/%VERSION%/%APPBUILDID%/%BUILD_TARGET%/%LOCALE%/%CHANNEL%/%OS_VERSION%/%DISTRIBUTION%/%DISTRIBUTION_VERSION%/"  //it was already set to "", but now mod by me!

// PREF: Never check updates for search engines
// https://support.mozilla.org/en-US/kb/how-stop-firefox-making-automatic-connections#w_auto-update-checking
user_pref("browser.search.update",				false);

// PREF: Disable automatic captive portal detection (Firefox >= 52.0)
// https://support.mozilla.org/en-US/questions/1157121
//user_pref("network.captive-portal-service.enabled",		false);
/* 0390: disable Captive Portal detection
 * [1] https://en.wikipedia.org/wiki/Captive_portal
 * [2] https://wiki.mozilla.org/Necko/CaptivePortal
 * [3] https://trac.torproject.org/projects/tor/ticket/21790 ***/
user_pref("captivedetect.canonicalURL", "");
user_pref("network.captive-portal-service.enabled", false); // [FF52+]


/******************************************************************************
 * SECTION: HTTP                                                              *
 ******************************************************************************/

// PREF: Disallow NTLMv1
// https://bugzilla.mozilla.org/show_bug.cgi?id=828183
user_pref("network.negotiate-auth.allow-insecure-ntlm-v1",	false);
// it is still allowed through HTTPS. uncomment the following to disable it completely.
//user_pref("network.negotiate-auth.allow-insecure-ntlm-v1-https",		false);

// PREF: Enable CSP 1.1 script-nonce directive support
// https://bugzilla.mozilla.org/show_bug.cgi?id=855326
user_pref("security.csp.experimentalEnabled",			true);

// PREF: Enable Content Security Policy (CSP)
// https://developer.mozilla.org/en-US/docs/Web/Security/CSP/Introducing_Content_Security_Policy
// https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
user_pref("security.csp.enable",				true);

/* 2683: block top level window data: URIs [FF56+]
 * [1] https://bugzilla.mozilla.org/1331351
 * [2] https://www.wordfence.com/blog/2017/01/gmail-phishing-data-uri/
 * [3] https://www.fxsitecompat.com/en-CA/docs/2017/data-url-navigations-on-top-level-window-will-be-blocked/ ***/
user_pref("security.data_uri.block_toplevel_data_uri_navigations", true); // [DEFAULT: true]

// PREF: Enable Subresource Integrity
// https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity
// https://wiki.mozilla.org/Security/Subresource_Integrity
user_pref("security.sri.enable",				true);

// PREF: DNT HTTP header (disabled)
// https://www.mozilla.org/en-US/firefox/dnt/
// https://en.wikipedia.org/wiki/Do_not_track_header
// https://dnt-dashboard.mozilla.org
// https://github.com/pyllyukko/user.js/issues/11
// NOTICE: Do No Track must be enabled manually
/* 1610: ALL: enable the DNT (Do Not Track) HTTP header
 * [NOTE] DNT is enforced with TP (see 0420) regardless of this pref
 * [SETTING] Privacy & Security>Content Blocking>Send websites a "Do Not Track"... ***/
//user_pref("privacy.donottrackheader.enabled",		true);

// PREF: Send a referer header with the target URI as the source (disabled)
// https://bugzilla.mozilla.org/show_bug.cgi?id=822869
// https://github.com/pyllyukko/user.js/issues/227
// NOTICE: Spoofing referers breaks functionality on websites relying on authentic referer headers
// NOTICE: Spoofing referers breaks visualisation of 3rd-party sites on the Lightbeam addon
// NOTICE: Spoofing referers disables CSRF protection on some login pages not implementing origin-header/cookie+token based CSRF protection
// TODO: https://github.com/pyllyukko/user.js/issues/94, commented-out XOriginPolicy/XOriginTrimmingPolicy = 2 prefs
user_pref("network.http.referer.spoofSource",			false);//mod  (now commented out in upstream user.js)

// PREF: Don't send referer headers when following links across different domains (disabled)
// https://github.com/pyllyukko/user.js/issues/227
// user_pref("network.http.referer.XOriginPolicy",		2);
user_pref("network.http.referer.XOriginPolicy", 1); // upstream user.js has =2 here
// 0=always send, 1=send iff base domains match, 2=send iff hosts match
//XXX: WARNING this could break stuff! hopefully less so with '1' than with '2'
// https://github.com/pyllyukko/user.js/issues/328
// https://feeding.cloud.geek.nz/posts/tweaking-referrer-for-privacy-in-firefox/


//Send only the scheme, host, and port in the Referer header
//0 = Send the full URL in the Referer header
//1 = Send the URL without its query string in the Referer header
//2 = Send only the scheme, host, and port in the Referer header
user_pref("network.http.referer.trimmingPolicy", 2);//addition, src: https://www.privacytools.io/   FIXME: this will probably break google drive downloads, at least! It breaks bbs.archlinux.org posts and modifying preferences or setting new password (works with =1 or =0)

//When sending Referer across origins, only send scheme, host, and port in the Referer header of cross-origin requests. Source: https://feeding.cloud.geek.nz/posts/tweaking-referrer-for-privacy-in-firefox/
//0 = Send full url in Referer
//1 = Send url without query string in Referer
//2 = Only send scheme, host, and port in Referer
user_pref("network.http.referer.XOriginTrimmingPolicy", 2); //FIXME: this will probably break google drive downloads, at least! (but since I'm not using google, that's okay for me)

// Controls whether referrer attributes in <a>, <img>, <area>, <iframe>, and <link> are honoured
//pref("network.http.enablePerElementReferrer", true);//by default not set ie. not existing!


// PREF: Accept Only 1st Party Cookies
// http://kb.mozillazine.org/Network.cookie.cookieBehavior#1
// NOTICE: Blocking 3rd-party cookies breaks a number of payment gateways
// CIS 2.5.1
//0 All cookies are allowed. (Default)
//1 Only cookies from the originating server are allowed.
//2 No cookies are allowed.
//3 Third-party cookies are allowed only if that site has stored cookies already from a previous visit (Firefox 22.0 and SeaMonkey 2.19 and later) (obsolete) Cookies are allowed based on the cookie P3P policy
//ok I've it modified in about:config to the value '4' but what does it mean? no idea
//4 about:preferences#privacy->Content Blocking->Custom->[v] Cookies->Third-party trackers ! (if this is disabled then network.cookie.cookieBehavior is 0, else is 4)
user_pref("network.cookie.cookieBehavior",			4); //was 1, default 0

// PREF: Enable first-party isolation
// https://bugzilla.mozilla.org/show_bug.cgi?id=1299996
// https://bugzilla.mozilla.org/show_bug.cgi?id=1260931
// https://wiki.mozilla.org/Security/FirstPartyIsolation
// NOTICE: First-party isolation breaks Microsoft Teams
// NOTICE: First-party isolation causes HTTP basic auth to ask for credentials for every new tab (see #425)
user_pref("privacy.firstparty.isolate",				true);

/* 4002: enforce FPI restriction for window.opener [FF54+]
 * [NOTE] Setting this to false may reduce the breakage in 4001
 * FF65+ blocks postMessage with targetOrigin "*" if originAttributes don't match. But
 * to reduce breakage it ignores the 1st-party domain (FPD) originAttribute. (see [2],[3])
 * The 2nd pref removes that limitation and will only allow communication if FPDs also match.
 * [1] https://bugzilla.mozilla.org/1319773#c22
 * [2] https://bugzilla.mozilla.org/1492607
 * [3] https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage ***/
user_pref("privacy.firstparty.isolate.restrict_opener_access", true);
user_pref("privacy.firstparty.isolate.block_post_message", true); // [HIDDEN PREF]


// PREF: Make sure that third-party cookies (if enabled) never persist beyond the session.
// https://feeding.cloud.geek.nz/posts/tweaking-cookies-for-privacy-in-firefox/
// http://kb.mozillazine.org/Network.cookie.thirdparty.sessionOnly
// https://developer.mozilla.org/en-US/docs/Cookies_Preferences_in_Mozilla#network.cookie.thirdparty.sessionOnly
//This preference controls if the browser imposes retention limits on third-party cookies. These are cookies which are requested by websites outside of the domain of the website that you are currently visiting. In general, they are treated like cookies from the primary website once accepted based on the network.cookie.cookieBehavior preference for the duration specified in the network.cookie.lifetimePolicy setting. With this preference, third-party cookies can be forced to be accepted for the current session only, even if network.cookie.lifetimePolicy would allow a longer retention period.
//[edit]
//Possible values and their effects
//[edit]
//True
//
//Third-party cookies are allowed within the limits of the general cookie acceptance settings but only retained for the current session.
//[edit]
//False
//
//Third-party cookies are allowed within the limits of the general cookie acceptance and retention settings. (Default)
//user_pref("network.cookie.thirdparty.sessionOnly",		true);
/* 2702: set third-party cookies (i.e ALL) (if enabled, see 2701) to session-only
   and (FF58+) set third-party non-secure (i.e HTTP) cookies to session-only
   [NOTE] .sessionOnly overrides .nonsecureSessionOnly except when .sessionOnly=false and
   .nonsecureSessionOnly=true. This allows you to keep HTTPS cookies, but session-only HTTP ones
 * [1] https://feeding.cloud.geek.nz/posts/tweaking-cookies-for-privacy-in-firefox/
 * [2] http://kb.mozillazine.org/Network.cookie.thirdparty.sessionOnly ***/
user_pref("network.cookie.thirdparty.sessionOnly", true); //FIXME: is this why I'm losing mail.protonmail.com cookies? even though that's the very site the page is on, ie. it's not just protonmail.com although protonmail.com cookies get kept after restart! or is it network.cookie.lifetimePolicy being 2 ?!!!!!
user_pref("network.cookie.thirdparty.nonsecureSessionOnly", true); // [FF58+]

// PREF: Spoof User-agent (disabled)
/* 4701: navigator.userAgent ***/
//user_pref("general.useragent.override",				"Mozilla/5.0 (Windows NT 6.1; rv:45.0) Gecko/20100101 Firefox/45.0");
//XXX: this is actually "Mozilla/5.0 (X11; Linux x86_64; rv:68.0) Gecko/20100101 Firefox/68.0"(aka the real UA) when privacy.resistFingerprinting=false, but when true it's "Mozilla/5.0 (Windows NT 6.1; rv:68.0) Gecko/20100101 Firefox/68.0", surprisingly. Test with: https://www.whatismybrowser.com/detect/what-http-headers-is-my-browser-sending

/* 4703: navigator.appName ***/
//user_pref("general.appname.override",				"Netscape");

/* 4704: navigator.appVersion ***/
//user_pref("general.appversion.override",			"5.0 (Windows)");

/* 4705: navigator.platform ***/
//user_pref("general.platform.override",				"Win32");

/* 4706: navigator.oscpu ***/
//user_pref("general.oscpu.override",				"Windows NT 6.1");

/*******************************************************************************
 * SECTION: Caching                                                            *
 ******************************************************************************/

// PREF: Permanently enable private browsing mode
// https://support.mozilla.org/en-US/kb/Private-Browsing
// https://wiki.mozilla.org/PrivateBrowsing
// NOTICE: You can not view or inspect cookies when in private browsing: https://bugzilla.mozilla.org/show_bug.cgi?id=823941
// NOTICE: When Javascript is enabled, Websites can detect use of Private Browsing mode
// NOTICE: Private browsing breaks Kerberos authentication
// NOTICE: Disables "Containers" functionality (see below)
// NOTICE: "Always use private browsing mode" (browser.privatebrowsing.autostart) disables the possibility to use password manager: https://support.mozilla.org/en-US/kb/usernames-and-passwords-are-not-saved#w_private-browsing
user_pref("browser.privatebrowsing.autostart",			false);//mod

// PREF: Do not download URLs for the offline cache
// http://kb.mozillazine.org/Browser.cache.offline.enable
/* 2730: disable offline cache ***/
user_pref("browser.cache.offline.enable",			true);//mod
/* 2730b: disable offline cache on insecure sites [FF60+]
 * [1] https://blog.mozilla.org/security/2018/02/12/restricting-appcache-secure-contexts/ ***/
user_pref("browser.cache.offline.insecure.enable", false); // [DEFAULT: false in FF62+]


// PREF: Clear history when Firefox closes
// https://support.mozilla.org/en-US/kb/Clear%20Recent%20History#w_how-do-i-make-firefox-clear-my-history-automatically
// NOTICE: Installing user.js will remove your browsing history, caches and local storage.
// NOTICE: Installing user.js **will remove your saved passwords** (https://github.com/pyllyukko/user.js/issues/27)
// NOTICE: Clearing open windows on Firefox exit causes 2 windows to open when Firefox starts https://bugzilla.mozilla.org/show_bug.cgi?id=1334945
user_pref("privacy.sanitize.sanitizeOnShutdown",		false);//mod //True: Perform the Clear Private Data operation when closing the browser (Firefox 1.5 and above only) //XXX: FIXME: also note that one or more of these(including sanitize) need to be false to be able to install the .xpi from command line: (except formdata=true; and openWindows which was already false)
user_pref("privacy.clearOnShutdown.cache",			false);//mod
user_pref("privacy.clearOnShutdown.downloads",			false);//mod
user_pref("privacy.clearOnShutdown.formdata",			false);//mod // Form & Search History
user_pref("privacy.clearOnShutdown.history",			false);//mod // Browsing & Download History
user_pref("privacy.clearOnShutdown.cookies",			true);
user_pref("privacy.clearOnShutdown.sessions",			true); // Active Logins
user_pref("privacy.clearOnShutdown.offlineApps",		true); // Offline Website Data XXX: I think this deletes the rememberance of whether specific sites were given access to canvas with remember my decision!
user_pref("privacy.clearOnShutdown.siteSettings", false); // Site Preferences
/* 2805: privacy.*.openWindows (clear session restore data) [FF34+]
 * [NOTE] There is a years-old bug that these cause two windows when Firefox restarts.
 * You do not need these anyway if session restore is cleared with history (see 2803) ***/
   // user_pref("privacy.clearOnShutdown.openWindows", true);
   // user_pref("privacy.cpd.openWindows", true);
user_pref("privacy.clearOnShutdown.openWindows",		false);//false to avoid opening two windows, see: https://github.com/pyllyukko/user.js/issues/292 //mod // 
user_pref("privacy.cpd.openWindows", false);


// PREF: Set time range to "Everything" as default in "Clear Recent History"
/* 2806: reset default 'Time range to clear' for 'Clear Recent History' (see 2804)
 * Firefox remembers your last choice. This will reset the value when you start Firefox.
 * 0=everything, 1=last hour, 2=last two hours, 3=last four hours,
 * 4=today, 5=last five minutes, 6=last twenty-four hours
 * [NOTE] The values 5 + 6 are not listed in the dropdown, which will display a
 * blank value if they are used, but they do work as advertised ***/
user_pref("privacy.sanitize.timeSpan",				0);

// PREF: Clear everything but "Site Preferences" in "Clear Recent History"
/* 2804: reset default items to clear with Ctrl-Shift-Del (to match 2803)
 * This dialog can also be accessed from the menu History>Clear Recent History
 * Firefox remembers your last choices. This will reset them when you start Firefox.
 * [NOTE] Regardless of what you set privacy.cpd.downloads to, as soon as the dialog
 * for "Clear Recent History" is opened, it is synced to the same as 'history' ***/
user_pref("privacy.cpd.cache",					true);
user_pref("privacy.cpd.cookies",				true);
   // user_pref("privacy.cpd.downloads", true); // not used, see note above
user_pref("privacy.cpd.formdata",				true);
user_pref("privacy.cpd.history",				true);
user_pref("privacy.cpd.offlineApps",				true);
user_pref("privacy.cpd.passwords", false); // this is not listed
user_pref("privacy.cpd.sessions",				true);
user_pref("privacy.cpd.siteSettings", false); // Site Preferences



// PREF: Don't remember browsing history
/* 0862: disable browsing and download history
 * [NOTE] You can clear history and downloads on exiting Firefox (see 2803)
 * [SETTING] Privacy & Security>History>Custom Settings>Remember browsing and download history ***/
// user_pref("places.history.enabled", false);
user_pref("places.history.enabled",				true);//mod

// PREF: Disable disk cache
// http://kb.mozillazine.org/Browser.cache.disk.enable
/* 1001: disable disk cache ***/
//user_pref("browser.cache.disk.enable", false);
//user_pref("browser.cache.disk.capacity", 0);
//user_pref("browser.cache.disk.smart_size.enabled", false);
user_pref("browser.cache.disk.smart_size.first_run", false);
//
user_pref("browser.cache.disk.enable",				true);//mod
user_pref("browser.cache.disk.capacity", 3145728);
user_pref("browser.cache.disk.max_entry_size", 1151200);
user_pref("browser.cache.disk.parent_directory", "/tmp/firefoxcache/");
user_pref("browser.cache.disk.smart_size.enabled", false);
user_pref("browser.cache.disk.smart_size.use_old_max", false);

// PREF: Disable memory cache (disabled)
// http://kb.mozillazine.org/Browser.cache.memory.enable
/* 1003: disable memory cache
 * [NOTE] Not recommended due to performance issues ***/
   // user_pref("browser.cache.memory.enable", false);
   // user_pref("browser.cache.memory.capacity", 0); // [HIDDEN PREF]
user_pref("browser.cache.memory.enable",		true);//mod
user_pref("browser.cache.memory.capacity", 5131072);
user_pref("browser.cache.memory.max_entry_size", 125120);

// PREF: Disable Caching of SSL Pages
// CIS Version 1.2.0 October 21st, 2011 2.5.8
// http://kb.mozillazine.org/Browser.cache.disk_cache_ssl
user_pref("browser.cache.disk_cache_ssl",			false);

// PREF: Disable download history
// CIS Version 1.2.0 October 21st, 2011 2.5.5
user_pref("browser.download.manager.retention",			0);

// PREF: Disable password manager (use an external password manager!)
// CIS Version 1.2.0 October 21st, 2011 2.5.2
user_pref("signon.rememberSignons",				false);
user_pref("signon.recipes.remoteRecipes.enabled",				false); //probably gettings from remote something like this contents: resource://app/defaults/settings/main/password-recipes.json

// PREF: Disable form autofill, don't save information entered in web page forms and the Search Bar
// this is in about:preferences#privacy -> History -> [] "Remember search and form history"
user_pref("browser.formfill.enable",				false);

// PREF: Cookies expires at the end of the session (when the browser closes)
// http://kb.mozillazine.org/Network.cookie.lifetimePolicy#2
//0 The cookie's lifetime is supplied by the server. (Default)
//1 The user is prompted for the cookie's lifetime.
//2 The cookie expires at the end of the session (when the browser closes). XXX WARNING:  it doesn't matter that you ALLOW-ed the website(s) via the [Manage Permissions] button to the right of the options that setting this to 2 selects, which is: 'Delete cookies and site data when Nightly is closed' https://bugzilla.mozilla.org/show_bug.cgi?id=1515913  //XXX: losing www.phoronix.com/forums cookie after maybe 5mins? so I've to relog when this is =2; seems fixed with =0
//3 The cookie lasts for the number of days specified by network.cookie.lifetime.days.
user_pref("network.cookie.lifetimePolicy",			2);//mod  hmm TODO: set to 2 ? was 3 and network.cookie.lifetime.days was 20 ; was 2 when protonmail was losing the mail.protonmail.com cookies on restart! (but not the protonmail.com ones!) YES, value of 3 keeps all mail. and protonmail.com cookies!! However login is still not kept! so loading the mail.protonmail.com page which was logged in before quitting (and another tab was focused even after restart, to give firefox time to settle before clicking on protonmail tab to load it) loads it at the login screen! So I'm basically logged out! even when network.cookie.cookieBehavior=0 instead of 4! network.cookie.thirdparty.sessionOnly can be true or false, no effect!(even with cookieBehavior=0 instead of =4) also tried network.cookie.lifetimePolicy=0; ok, new profile with empty vendor.js and no user.js and protonmail still loses my login session after restart and still can't read emails!
user_pref("network.cookie.lifetime.days", 20);

// PREF: Require manual intervention to autofill known username/passwords sign-in forms
// http://kb.mozillazine.org/Signon.autofillForms
// https://www.torproject.org/projects/torbrowser/design/#identifier-linkability
/* 0905: disable auto-filling username & password form fields
 * can leak in cross-site forms AND be spoofed
 * [NOTE] Password will still be auto-filled after a user name is manually entered
 * [1] http://kb.mozillazine.org/Signon.autofillForms ***/
user_pref("signon.autofillForms",				false);

// PREF: Disable formless login capture
// https://bugzilla.mozilla.org/show_bug.cgi?id=1166947
user_pref("signon.formlessCapture.enabled",			false);

// PREF: When username/password autofill is enabled, still disable it on non-HTTPS sites
// https://hg.mozilla.org/integration/mozilla-inbound/rev/f0d146fe7317
user_pref("signon.autofillForms.http",				false);

// PREF: Show in-content login form warning UI for insecure login fields
// https://hg.mozilla.org/integration/mozilla-inbound/rev/f0d146fe7317
user_pref("security.insecure_field_warning.contextual.enabled", true);

// PREF: Disable the password manager for pages with autocomplete=off (disabled)
// https://bugzilla.mozilla.org/show_bug.cgi?id=956906
// OWASP ASVS V9.1
// Does not prevent any kind of auto-completion (see browser.formfill.enable, signon.autofillForms)
//user_pref("signon.storeWhenAutocompleteOff",			false);
user_pref("signon.storeWhenAutocompleteOff", false);

// PREF: Delete Search and Form History
// CIS Version 1.2.0 October 21st, 2011 2.5.6
user_pref("browser.formfill.expire_days",			0);

// PREF: Clear SSL Form Session Data
// http://kb.mozillazine.org/Browser.sessionstore.privacy_level#2
// Store extra session data for unencrypted (non-HTTPS) sites only.
// CIS Version 1.2.0 October 21st, 2011 2.5.7
// NOTE: CIS says 1, we use 2
//Firefox 2.0 introduces a built-in Session Restore feature, allowing the user to continue browsing from where they left off if browser restarts. This preference controls when to store extra information about a session: contents of forms, scrollbar positions, cookies, and POST data.
//Possible values and their effects
//0 Store extra session data for any site. (Default starting with Firefox 4.)
//
//1 Store extra session data for unencrypted (non-HTTPS) sites only. (Default before Firefox 4.)
//
//2 Never store extra session data. 
/* 1021: disable storing extra session data [SETUP-CHROME]
 * extra session data contains contents of forms, scrollbar positions, cookies and POST data
 * define on which sites to save extra session data:
 * 0=everywhere, 1=unencrypted sites, 2=nowhere ***/
user_pref("browser.sessionstore.privacy_level",			0);//mod //was 2


// PREF: Delete temporary files on exit
// https://bugzilla.mozilla.org/show_bug.cgi?id=238789
user_pref("browser.helperApps.deleteTempFileOnExit",		true);

// PREF: Do not create screenshots of visited pages (relates to the "new tab page" feature)
// https://support.mozilla.org/en-US/questions/973320
// https://developer.mozilla.org/en-US/docs/Mozilla/Preferences/Preference_reference/browser.pagethumbnails.capturing_disabled
user_pref("browser.pagethumbnails.capturing_disabled",		true);

// PREF: Don't fetch and permanently store favicons for Windows .URL shortcuts created by drag and drop
// NOTICE: .URL shortcut files will be created with a generic icon
// Favicons are stored as .ico files in $profile_dir\shortcutCache
/* 1030: disable favicons in shortcuts
 * URL shortcuts use a cached randomly named .ico file which is stored in your
 * profile/shortcutCache directory. The .ico remains after the shortcut is deleted.
 * If set to false then the shortcuts use a generic Firefox icon ***/
user_pref("browser.shell.shortcutFavicons",					false);

// PREF: Disable bookmarks backups (default: 15)
// http://kb.mozillazine.org/Browser.bookmarks.max_backups
//user_pref("browser.bookmarks.max_backups", 0);
user_pref("browser.bookmarks.max_backups", 2);

// PREF: Export bookmarks to HTML automatically when closing Firefox (disabled)
// https://support.mozilla.org/en-US/questions/1176242
//user_pref("browser.bookmarks.autoExportHTML",                                true);
//user_pref("browser.bookmarks.file",  '/path/to/bookmarks-export.html');

/*******************************************************************************
 * SECTION: UI related                                                         *
 *******************************************************************************/

// PREF: Enable insecure password warnings (login forms in non-HTTPS pages)
// https://blog.mozilla.org/tanvi/2016/01/28/no-more-passwords-over-http-please/
// https://bugzilla.mozilla.org/show_bug.cgi?id=1319119
// https://bugzilla.mozilla.org/show_bug.cgi?id=1217156
/* 0907: display warnings for logins on non-secure (non HTTPS) pages
 * [1] https://bugzilla.mozilla.org/1217156 ***/
user_pref("security.insecure_password.ui.enabled",		true);

// PREF: Disable right-click menu manipulation via JavaScript (disabled)
/* 2401: disable website control over browser right-click context menu
 * [NOTE] Shift-Right-Click will always bring up the browser right-click context menu ***/
//user_pref("dom.event.contextmenu.enabled",		false);

// PREF: Disable "Are you sure you want to leave this page?" popups on page close
// https://support.mozilla.org/en-US/questions/1043508
// NOTICE: disabling "beforeunload" events may lead to losing data entered in web forms
// Does not prevent JS leaks of the page close event.
// https://developer.mozilla.org/en-US/docs/Web/Events/beforeunload
//user_pref("dom.disable_beforeunload",    true);
/* 2404: disable "Confirm you want to leave" dialog on page close
 * Does not prevent JS leaks of the page close event.
 * [1] https://developer.mozilla.org/docs/Web/Events/beforeunload
 * [2] https://support.mozilla.org/questions/1043508 ***/
user_pref("dom.disable_beforeunload", false); //mod


// PREF: Disable Downloading on Desktop
// CIS 2.3.2
user_pref("browser.download.folderList",			2);

// PREF: Always ask the user where to download
// https://developer.mozilla.org/en/Download_Manager_preferences (obsolete)
/* 2651: enforce user interaction for security by always asking the user where to download
 * [SETTING] General>Downloads>Always ask you where to save files ***/
user_pref("browser.download.useDownloadDir",			true); // mod

/* 2652: disable adding downloads to the system's "recent documents" list ***/
user_pref("browser.download.manager.addToRecentDocs", true); // mod


// PREF: Disable the "new tab page" feature and show a blank tab instead
// https://wiki.mozilla.org/Privacy/Reviews/New_Tab
// https://support.mozilla.org/en-US/kb/new-tab-page-show-hide-and-customize-top-sites#w_how-do-i-turn-the-new-tab-page-off
user_pref("browser.newtabpage.enabled",				false);
user_pref("browser.newtab.url",					"about:blank");

// PREF: Disable Activity Stream
// https://wiki.mozilla.org/Firefox/Activity_Stream
user_pref("browser.newtabpage.activity-stream.enabled",		false);

// PREF: Disable new tab tile ads & preload
// http://www.thewindowsclub.com/disable-remove-ad-tiles-from-firefox
// http://forums.mozillazine.org/viewtopic.php?p=13876331#p13876331
// https://wiki.mozilla.org/Tiles/Technical_Documentation#Ping
// https://gecko.readthedocs.org/en/latest/browser/browser/DirectoryLinksProvider.html#browser-newtabpage-directory-source
// https://gecko.readthedocs.org/en/latest/browser/browser/DirectoryLinksProvider.html#browser-newtabpage-directory-ping
// TODO: deprecated? not in DXR, some dead links
user_pref("browser.newtabpage.enhanced",			false);
user_pref("browser.newtab.preload",				false);
user_pref("browser.newtabpage.directory.ping",			""); //note: doesn't seem to exist/be_set_to_a_value inside ff source!
user_pref("browser.newtabpage.directory.source",		"data:text/plain,{}");

// PREF: Enable Auto Notification of Outdated Plugins (Firefox < 50)
// https://wiki.mozilla.org/Firefox3.6/Plugin_Update_Awareness_Security_Review
// CIS Version 1.2.0 October 21st, 2011 2.1.2
// https://hg.mozilla.org/mozilla-central/rev/304560
user_pref("plugins.update.notifyUser",				true);


// PREF: Force Punycode for Internationalized Domain Names
// http://kb.mozillazine.org/Network.IDN_show_punycode
// https://www.xudongz.com/blog/2017/idn-phishing/
// https://wiki.mozilla.org/IDN_Display_Algorithm
// https://en.wikipedia.org/wiki/IDN_homograph_attack
// https://www.mozilla.org/en-US/security/advisories/mfsa2017-02/
// CIS Mozilla Firefox 24 ESR v1.0.0 - 3.6
user_pref("network.IDN_show_punycode",				true);

// PREF: Disable inline autocomplete in URL bar
// http://kb.mozillazine.org/Inline_autocomplete
user_pref("browser.urlbar.autoFill",				false);
user_pref("browser.urlbar.autoFill.typed",			false);

// PREF: Disable CSS :visited selectors
// https://blog.mozilla.org/security/2010/03/31/plugging-the-css-history-leak/
// https://dbaron.org/mozilla/visited-privacy
/* 0805: disable CSS querying page history - CSS history leak
 * [NOTE] This has NEVER been fully "resolved": in Mozilla/docs it is stated it's
 * only in 'certain circumstances', also see latest comments in [2]
 * [TEST] http://lcamtuf.coredump.cx/yahh/ (see github wiki APPENDIX C on how to use)
 * [1] https://dbaron.org/mozilla/visited-privacy
 * [2] https://bugzilla.mozilla.org/147777
 * [3] https://developer.mozilla.org/docs/Web/CSS/Privacy_and_the_:visited_selector ***/
//user_pref("layout.css.visited_links_enabled", false);
user_pref("layout.css.visited_links_enabled",			true); //mod
//^ I need this to see which links I've visited because they're of a different color!

// PREF: Disable URL bar autocomplete and history/bookmarks suggestions dropdown
// http://kb.mozillazine.org/Disabling_autocomplete_-_Firefox#Firefox_3.5
user_pref("browser.urlbar.autocomplete.enabled",		true); //mod

// PREF: Do not check if Firefox is the default browser
user_pref("browser.shell.checkDefaultBrowser",			false);

// PREF: When password manager is enabled, lock the password storage periodically
// CIS Version 1.2.0 October 21st, 2011 2.5.3 Disable Prompting for Credential Storage
/* 0903: set how often Firefox should ask for the master password
 * 0=the first time (default), 1=every time it's needed, 2=every n minutes (see 0904) ***/
user_pref("security.ask_for_password",				2);

// PREF: Lock the password storage every 1 minutes (default: 30)
user_pref("security.password_lifetime",				1);

// PREF: Display a notification bar when websites offer data for offline use
// http://kb.mozillazine.org/Browser.offline-apps.notify
user_pref("browser.offline-apps.notify",			true);

/******************************************************************************
 * SECTION: Cryptography                                                      *
 ******************************************************************************/

// PREF: Enable HSTS preload list (pre-set HSTS sites list provided by Mozilla)
// https://blog.mozilla.org/security/2012/11/01/preloading-hsts/
// https://wiki.mozilla.org/Privacy/Features/HSTS_Preload_List
// https://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security
user_pref("network.stricttransportsecurity.preloadlist",	true);

// PREF: Enable Online Certificate Status Protocol
// https://en.wikipedia.org/wiki/Online_Certificate_Status_Protocol
// https://www.imperialviolet.org/2014/04/19/revchecking.html
// https://www.maikel.pro/blog/current-state-certificate-revocation-crls-ocsp/
// https://wiki.mozilla.org/CA:RevocationPlan
// https://wiki.mozilla.org/CA:ImprovingRevocation
// https://wiki.mozilla.org/CA:OCSP-HardFail
// https://news.netcraft.com/archives/2014/04/24/certificate-revocation-why-browsers-remain-affected-by-heartbleed.html
// https://news.netcraft.com/archives/2013/04/16/certificate-revocation-and-the-performance-of-ocsp.html
// NOTICE: OCSP leaks your IP and domains you visit to the CA when OCSP Stapling is not available on visited host
// NOTICE: OCSP is vulnerable to replay attacks when nonce is not configured on the OCSP responder
// NOTICE: OCSP adds latency (performance)
// NOTICE: Short-lived certificates are not checked for revocation (security.pki.cert_short_lifetime_in_days, default:10)
// CIS Version 1.2.0 October 21st, 2011 2.2.4
user_pref("security.OCSP.enabled",				0);//mod from 1 (aka enabled) to 0 (aka disabled!) because it requires port 80 outgoing and most importantly some ocsp servers reside on CDN IPs which change often!(and since I have to keep them up to date in /etc/hosts AND my firewall, I say no thx!)
//0=disable, 1=validate only certificates that specify an OCSP service URL (default)
//2=enable and use values in security.OCSP.URL and security.OCSP.signing.

// PREF: Enable OCSP Stapling support
// https://en.wikipedia.org/wiki/OCSP_stapling
// https://blog.mozilla.org/security/2013/07/29/ocsp-stapling-in-firefox/
// https://www.digitalocean.com/community/tutorials/how-to-configure-ocsp-stapling-on-apache-and-nginx
user_pref("security.ssl.enable_ocsp_stapling",			true);

// PREF: Enable OCSP Must-Staple support (Firefox >= 45)
// https://blog.mozilla.org/security/2015/11/23/improving-revocation-ocsp-must-staple-and-short-lived-certificates/
// https://www.entrust.com/ocsp-must-staple/
// https://github.com/schomery/privacy-settings/issues/40
// NOTICE: Firefox falls back on plain OCSP when must-staple is not configured on the host certificate
user_pref("security.ssl.enable_ocsp_must_staple",		true);

// PREF: Require a valid OCSP response for OCSP enabled certificates
// https://groups.google.com/forum/#!topic/mozilla.dev.security/n1G-N2-HTVA
// Disabling this will make OCSP bypassable by MitM attacks suppressing OCSP responses
// NOTICE: `security.OCSP.require` will make the connection fail when the OCSP responder is unavailable
// NOTICE: `security.OCSP.require` is known to break browsing on some [captive portals](https://en.wikipedia.org/wiki/Captive_portal)
user_pref("security.OCSP.require",				true);//mod again to true so it's required!
// OCSP is accessed via port 80(http) outgoing, not 443(https)!! so I've to allow this in firewall!

// PREF: Disable TLS Session Tickets
// https://www.blackhat.com/us-13/briefings.html#NextGen
// https://media.blackhat.com/us-13/US-13-Daigniere-TLS-Secrets-Slides.pdf
// https://media.blackhat.com/us-13/US-13-Daigniere-TLS-Secrets-WP.pdf
// https://bugzilla.mozilla.org/show_bug.cgi?id=917049
// https://bugzilla.mozilla.org/show_bug.cgi?id=967977
user_pref("security.ssl.disable_session_identifiers",		true);

// PREF: Only allow TLS 1.[0-3]
// http://kb.mozillazine.org/Security.tls.version.*
// 1 = TLS 1.0 is the minimum required / maximum supported encryption protocol. (This is the current default for the maximum supported version.)
// 2 = TLS 1.1 is the minimum required / maximum supported encryption protocol.
// 3 = TLS 1.2 is the minimum required / maximum supported encryption protocol.
// 4 = TLS 1.3 is the minimum required / maximum supported encryption protocol.
user_pref("security.tls.version.min",				3);//was 1, now 3 //mod! most sites won't work with 4 here, but will with 3!
user_pref("security.tls.version.max",				4);

// PREF: Disable insecure TLS version fallback
// https://bugzilla.mozilla.org/show_bug.cgi?id=1084025
// https://github.com/pyllyukko/user.js/pull/206#issuecomment-280229645
user_pref("security.tls.version.fallback-limit",		3);

// PREF: Enforce Public Key Pinning
// https://en.wikipedia.org/wiki/HTTP_Public_Key_Pinning
// https://wiki.mozilla.org/SecurityEngineering/Public_Key_Pinning
// "2. Strict. Pinning is always enforced."
user_pref("security.cert_pinning.enforcement_level",		2);

// PREF: Disallow SHA-1
// https://bugzilla.mozilla.org/show_bug.cgi?id=1302140
// https://shattered.io/
user_pref("security.pki.sha1_enforcement_level",		1);

// PREF: Warn the user when server doesn't support RFC 5746 ("safe" renegotiation)
// https://wiki.mozilla.org/Security:Renegotiation#security.ssl.treat_unsafe_negotiation_as_broken
// https://web.nvd.nist.gov/view/vuln/detail?vulnId=CVE-2009-3555
user_pref("security.ssl.treat_unsafe_negotiation_as_broken",	true);

// PREF: Disallow connection to servers not supporting safe renegotiation (disabled)
// https://wiki.mozilla.org/Security:Renegotiation#security.ssl.require_safe_negotiation
// https://web.nvd.nist.gov/view/vuln/detail?vulnId=CVE-2009-3555
// TODO: `security.ssl.require_safe_negotiation` is more secure but makes browsing next to impossible (2012-2014-... - `ssl_error_unsafe_negotiation` errors), so is left disabled
//user_pref("security.ssl.require_safe_negotiation",		true);
/** SSL (Secure Sockets Layer) / TLS (Transport Layer Security) ***/
/* 1201: disable old SSL/TLS "insecure" renegotiation (vulnerable to a MiTM attack)
 * [SETUP-WEB] <2% of secure sites do NOT support the newer "secure" renegotiation, see [2]
 * [1] https://wiki.mozilla.org/Security:Renegotiation
 * [2] https://www.ssllabs.com/ssl-pulse/ ***/
user_pref("security.ssl.require_safe_negotiation", true);


// PREF: Disable automatic reporting of TLS connection errors
// https://support.mozilla.org/en-US/kb/certificate-pinning-reports
// we could also disable security.ssl.errorReporting.enabled, but I think it's
// good to leave the option to report potentially malicious sites if the user
// chooses to do so.
// you can test this at https://pinningtest.appspot.com/
//user_pref("security.ssl.errorReporting.automatic",		false);
user_pref("security.ssl.errorReporting.url", "https://security.ssl.errorReporting.url.firefox_blocked_domain.tld/security.ssl.errorReporting.url/");//default: https://incoming.telemetry.mozilla.org/submit/sslreports/  //mod ?
/* 1204: disable SSL Error Reporting
 * [1] https://firefox-source-docs.mozilla.org/browser/base/sslerrorreport/preferences.html ***/
user_pref("security.ssl.errorReporting.automatic", false);
user_pref("security.ssl.errorReporting.enabled", false);
//user_pref("security.ssl.errorReporting.url", "");


// PREF: Pre-populate the current URL but do not pre-fetch the certificate in the "Add Security Exception" dialog
// http://kb.mozillazine.org/Browser.ssl_override_behavior
// https://github.com/pyllyukko/user.js/issues/210
user_pref("browser.ssl_override_behavior",			1);

// PREF: Encrypted SNI (when TRR is enabled)
// https://www.cloudflare.com/ssl/encrypted-sni/
// https://wiki.mozilla.org/Trusted_Recursive_Resolver#ESNI
// https://en.wikipedia.org/wiki/Server_Name_Indication#Security_implications_(ESNI)
user_pref("network.security.esni.enabled",                     true);


/******************************************************************************
 * SECTION: Cipher suites                                                     *
 ******************************************************************************/

// PREF: Disable null ciphers
user_pref("security.ssl3.rsa_null_sha",				false);
user_pref("security.ssl3.rsa_null_md5",				false);
user_pref("security.ssl3.ecdhe_rsa_null_sha",			false);
user_pref("security.ssl3.ecdhe_ecdsa_null_sha",			false);
user_pref("security.ssl3.ecdh_rsa_null_sha",			false);
user_pref("security.ssl3.ecdh_ecdsa_null_sha",			false);

// PREF: Disable SEED cipher
// https://en.wikipedia.org/wiki/SEED
user_pref("security.ssl3.rsa_seed_sha",				false);

// PREF: Disable 40/56/128-bit ciphers
// 40-bit ciphers
user_pref("security.ssl3.rsa_rc4_40_md5",			false);
user_pref("security.ssl3.rsa_rc2_40_md5",			false);
// 56-bit ciphers
user_pref("security.ssl3.rsa_1024_rc4_56_sha",			false);
// 128-bit ciphers
user_pref("security.ssl3.rsa_camellia_128_sha",			false);
user_pref("security.ssl3.ecdhe_rsa_aes_128_sha",		false);
user_pref("security.ssl3.ecdhe_ecdsa_aes_128_sha",		false);
user_pref("security.ssl3.ecdh_rsa_aes_128_sha",			false);
user_pref("security.ssl3.ecdh_ecdsa_aes_128_sha",		false);
user_pref("security.ssl3.dhe_rsa_camellia_128_sha",		false);
user_pref("security.ssl3.dhe_rsa_aes_128_sha",			false);

// PREF: Disable RC4
// https://developer.mozilla.org/en-US/Firefox/Releases/38#Security
// https://bugzilla.mozilla.org/show_bug.cgi?id=1138882
// https://rc4.io/
// https://web.nvd.nist.gov/view/vuln/detail?vulnId=CVE-2013-2566
user_pref("security.ssl3.ecdh_ecdsa_rc4_128_sha",		false);
user_pref("security.ssl3.ecdh_rsa_rc4_128_sha",			false);
user_pref("security.ssl3.ecdhe_ecdsa_rc4_128_sha",		false);
user_pref("security.ssl3.ecdhe_rsa_rc4_128_sha",		false);
user_pref("security.ssl3.rsa_rc4_128_md5",			false);
user_pref("security.ssl3.rsa_rc4_128_sha",			false);
user_pref("security.tls.unrestricted_rc4_fallback",		false);

// PREF: Disable 3DES (effective key size is < 128)
// https://en.wikipedia.org/wiki/3des#Security
// http://en.citizendium.org/wiki/Meet-in-the-middle_attack
// http://www-archive.mozilla.org/projects/security/pki/nss/ssl/fips-ssl-ciphersuites.html
user_pref("security.ssl3.dhe_dss_des_ede3_sha",			false);
user_pref("security.ssl3.dhe_rsa_des_ede3_sha",			false);
user_pref("security.ssl3.ecdh_ecdsa_des_ede3_sha",		false);
user_pref("security.ssl3.ecdh_rsa_des_ede3_sha",		false);
user_pref("security.ssl3.ecdhe_ecdsa_des_ede3_sha",		false);
user_pref("security.ssl3.ecdhe_rsa_des_ede3_sha",		false);
user_pref("security.ssl3.rsa_des_ede3_sha",			false);
user_pref("security.ssl3.rsa_fips_des_ede3_sha",		false);

// PREF: Disable ciphers with ECDH (non-ephemeral)
user_pref("security.ssl3.ecdh_rsa_aes_256_sha",			false);
user_pref("security.ssl3.ecdh_ecdsa_aes_256_sha",		false);

// PREF: Disable 256 bits ciphers without PFS
user_pref("security.ssl3.rsa_camellia_256_sha",			false);


// PREF: Enable GCM ciphers (TLSv1.2 only)
// https://en.wikipedia.org/wiki/Galois/Counter_Mode
user_pref("security.ssl3.ecdhe_ecdsa_aes_128_gcm_sha256",	true); // 0xc02b
user_pref("security.ssl3.ecdhe_rsa_aes_128_gcm_sha256",		true); // 0xc02f

// PREF: Enable ChaCha20 and Poly1305 (Firefox >= 47)
// https://www.mozilla.org/en-US/firefox/47.0/releasenotes/
// https://tools.ietf.org/html/rfc7905
// https://bugzilla.mozilla.org/show_bug.cgi?id=917571
// https://bugzilla.mozilla.org/show_bug.cgi?id=1247860
// https://cr.yp.to/chacha.html
user_pref("security.ssl3.ecdhe_ecdsa_chacha20_poly1305_sha256",	true);
user_pref("security.ssl3.ecdhe_rsa_chacha20_poly1305_sha256",	true);

// PREF: Disable ciphers susceptible to the logjam attack
// https://weakdh.org/
user_pref("security.ssl3.dhe_rsa_camellia_256_sha",		false);
user_pref("security.ssl3.dhe_rsa_aes_256_sha",			false);

// PREF: Disable ciphers with DSA (max 1024 bits)
user_pref("security.ssl3.dhe_dss_aes_128_sha",			false);
user_pref("security.ssl3.dhe_dss_aes_256_sha",			false);
user_pref("security.ssl3.dhe_dss_camellia_128_sha",		false);
user_pref("security.ssl3.dhe_dss_camellia_256_sha",		false);

// PREF: Ciphers with CBC & SHA-1 (disabled)
//user_pref("security.ssl3.rsa_aes_256_sha",			true); // 0x35
//user_pref("security.ssl3.rsa_aes_128_sha",			true); // 0x2f
/* 1264: disable the remaining non-modern cipher suites as of FF52 ***/
user_pref("security.ssl3.rsa_aes_128_sha", false); // 0x35
user_pref("security.ssl3.rsa_aes_256_sha", false); // 0x2f
// PREF: Enable ciphers with ECDHE and key size > 128bits
user_pref("security.ssl3.ecdhe_rsa_aes_256_sha",		false); // 0xc014
user_pref("security.ssl3.ecdhe_ecdsa_aes_256_sha",		false); // 0xc00a



//----------- additions from prefs.patch
//stuff with "//mod" from above was modified by me from their default!
//the above was generated on 25 feb 2018 via a 'make' in the repo: https://github.com/pyllyukko/user.js.git with HEAD a2601553dff8bfca85acdc0bd589d52506c52958
user_pref("accessibility.blockautorefresh", true);
user_pref("accessibility.force_disabled", 1);
user_pref("accessibility.typeaheadfind.flashBar", 0);
user_pref("accessibility.typeaheadfind", false); // enable "Find As You Type"  //it's false by default lookslike, but ghacks-user.js/user.js has this set to true!
user_pref("app.feedback.baseURL", "https://app.feedback.baseURL.firefox_blocked_domain.tld/app.feedback.baseURL/");//one of the default values: "https://input.mozilla.org/%LOCALE%/feedback/firefoxdev/%VERSION%/"
user_pref("app.productInfo.baseURL", "https://app.productInfo.baseURL.firefox_blocked_domain.tld/app.productInfo.baseURL/");//default value: "https://www.mozilla.org/firefox/features/"
//user_pref("app.update.auto", false);//already done above
user_pref("app.update.checkInstallTime.days", 200);
user_pref("app.update.url.details", "https://app.update.url.details.firefox_blocked_domain.tld/app.update.url.details");//hmm same default value: "https://nightly.mozilla.org"
user_pref("app.update.url.manual", "https://app.update.url.manual.firefox_blocked_domain.tld/app.update.url.manual");//one of the default values: "https://nightly.mozilla.org"
user_pref("app.update.url","https://app.update.url.firefox_blocked_domain.tld/");//default value: "https://aus5.mozilla.org/update/6/%PRODUCT%/%VERSION%/%BUILD_ID%/%BUILD_TARGET%/%LOCALE%/%CHANNEL%/%OS_VERSION%/%SYSTEM_CAPABILITIES%/%DISTRIBUTION%/%DISTRIBUTION_VERSION%/update.xml"
user_pref("apz.record_checkerboarding", false);
user_pref("browser.chrome.errorReporter.enabled", false);
user_pref("browser.chrome.errorReporter.submitUrl", "https://browser.chrome.errorReporter.submitUrl.firefox_blocked_domain.tld/");//default value: "https://sentry.prod.mozaws.net/api/339/store/"

/* 2654: disable "open with" in download dialog [FF50+]
 * This is very useful to enable when the browser is sandboxed (e.g. via AppArmor)
 * in such a way that it is forbidden to run external applications.
 * [SETUP-CHROME] This may interfere with some users' workflow or methods
 * [1] https://bugzilla.mozilla.org/1281959 ***/
user_pref("browser.download.forbid_open_with", false); //mod

user_pref("browser.download.panel.shown", true);
//user_pref("browser.newtabpage.activity-stream.disableSnippets", "true");//mod (was stringed "true") //actually this doesn't exist anymore; well, nvm it does, it's just not string (also not referenced in source code, apparently) ; ok something's wrong here, this only has any effect when "true" (string!) but it errs on ctrl+shift+j(not the F12!) console because it's not bool! so, you can still see the snippets and cannot turn them off when this isn't a string! on changeset:   405218:b9d1e753f014 tag:         tip  ; ok f-it, i set the default value to false inside browser/extensions/activity-stream/lib/ActivityStream.jsm file!  ok, so I misinterpreted this: it is bool, not string; it errs/fails when it's a string; also it cannot be overriden from vendor.js !  this doesn't exist anymore 24 march 2019
// PREF: Disable Snippets
// https://wiki.mozilla.org/Firefox/Projects/Firefox_Start/Snippet_Service
// https://support.mozilla.org/en-US/kb/snippets-firefox-faq
user_pref("browser.newtabpage.activity-stream.feeds.snippets", false);//XXX: yep no effect here!
user_pref("browser.newtabpage.activity-stream.feeds.topsites", false);//XXX: probably no effect here, but does have effect when set in about:config !!
user_pref("browser.newtabpage.activity-stream.showSearch", false);//XXX: probably no effect here, but does have effect when set in about:config !!
user_pref("browser.newtabpage.activity-stream.prerender", false); //this will stop showing a skeleton of empty reclangles! XXX: only works when set in browser/extensions/activity-stream/lib/ActivityStream.jsm just like all the rest browser.newtabpage.activity-stream.* prefs
user_pref("browser.newtabpage.introShown", true);
user_pref("browser.onboarding.enabled", false);
user_pref("browser.ping-centre.log", false);
user_pref("browser.ping-centre.production.endpoint", "https://browser.ping-centre.production.endpoint.firefox_blocked_domain.tld/browser.ping-centre.production.endpoint");//default value: "https://tiles.services.mozilla.com/v3/links/ping-centre"
user_pref("browser.ping-centre.staging.endpoint", "https://browser.ping-centre.staging.endpoint.firefox_blocked_domain.tld/browser.ping-centre.staging.endpoint");//default value: "https://onyx_tiles.stage.mozaws.net/v3/links/ping-centre"
user_pref("browser.ping-centre.telemetry", false);
/* 0411: disable "Block dangerous downloads"
 * This covers malware and PUPs (potentially unwanted programs)
 * [SETTING] Privacy & Security>Security>Deceptive Content and Software Protection ***/
user_pref("browser.safebrowsing.downloads.enabled", false);

/* 0412: disable "Warn me about unwanted and uncommon software"
 * [SETTING] Privacy & Security>Security>Deceptive Content and Software Protection ***/
user_pref("browser.safebrowsing.downloads.remote.block_potentially_unwanted", false);
user_pref("browser.safebrowsing.downloads.remote.block_uncommon", false);
user_pref("browser.safebrowsing.downloads.remote.block_dangerous", false);
user_pref("browser.safebrowsing.downloads.remote.block_dangerous_host", false);

user_pref("browser.safebrowsing.downloads.remote.timeout_ms", 100); //was 1000
user_pref("browser.safebrowsing.downloads.remote.url", "https://browser.safebrowsing.downloads.remote.url.firefox_blocked_domain.tld/");
user_pref("browser.safebrowsing.provider.google4.advisoryURL", "https://browser.safebrowsing.provider.google4.advisoryURL.firefox_blocked_domain.tld/");
user_pref("browser.safebrowsing.provider.google4.lists", "");
user_pref("browser.safebrowsing.provider.google4.reportMalwareMistakeURL", "https://browser.safebrowsing.provider.google4.reportMalwareMistakeURL.firefox_blocked_domain.tld/");
user_pref("browser.safebrowsing.provider.google4.reportPhishMistakeURL", "https://browser.safebrowsing.provider.google4.reportPhishMistakeURL.firefox_blocked_domain.tld/");
user_pref("browser.safebrowsing.provider.google4.reportURL", "https://browser.safebrowsing.provider.google4.reportURL.firefox_blocked_domain.tld/");
/* 0417: disable data sharing [FF58+] ***/
user_pref("browser.safebrowsing.provider.google4.dataSharing.enabled", false);
user_pref("browser.safebrowsing.provider.google4.dataSharingURL", "https://browser.safebrowsing.provider.google4.dataSharingURL.firefox_blocked_domain.tld/");

user_pref("browser.safebrowsing.provider.google.advisoryURL", "https://browser.safebrowsing.provider.google.advisoryURL.firefox_blocked_domain.tld/");
user_pref("browser.safebrowsing.provider.google.lists", "");//default value: "goog-badbinurl-shavar,goog-downloadwhite-digest256,goog-phish-shavar,googpub-phish-shavar,goog-malware-shavar,goog-unwanted-shavar"
user_pref("browser.safebrowsing.provider.google.reportMalwareMistakeURL", "https://browser.safebrowsing.provider.google.reportMalwareMistakeURL.firefox_blocked_domain.tld/browser.safebrowsing.provider.google.reportMalwareMistakeURL");//default value: "https://%LOCALE%.malware-error.mozilla.com/?hl=%LOCALE%&url="
user_pref("browser.safebrowsing.provider.google.reportPhishMistakeURL", "https://browser.safebrowsing.provider.google.reportPhishMistakeURL.firefox_blocked_domain.tld/browser.safebrowsing.provider.google.reportPhishMistakeURL");//default value: "https://%LOCALE%.phish-error.mozilla.com/?hl=%LOCALE%&url="
user_pref("browser.safebrowsing.provider.google.reportURL", "https://browser.safebrowsing.provider.google.reportURL.firefox_blocked_domain.tld/browser.safebrowsing.provider.google.reportURL");//default value: "https://safebrowsing.google.com/safebrowsing/diagnostic?client=%NAME%&hl=%LOCALE%&site="

/* 0413: disable Google safebrowsing updates ***/
user_pref("browser.safebrowsing.provider.google.updateURL", "https://browser.safebrowsing.provider.google.updateURL.firefox_blocked_domain.tld/browser.safebrowsing.provider.google.updateURL");//default value: "https://safebrowsing.google.com/safebrowsing/downloads?client=SAFEBROWSING_ID&appver=%MAJOR_VERSION%&pver=2.2&key=%GOOGLE_API_KEY%"
user_pref("browser.safebrowsing.provider.google.gethashURL", "https://browser.safebrowsing.provider.google.gethashURL.firefox_blocked_domain.tld/");
user_pref("browser.safebrowsing.provider.google4.updateURL", "https://browser.safebrowsing.provider.google4.updateURL.firefox_blocked_domain.tld/");
user_pref("browser.safebrowsing.provider.google4.gethashURL", "https://browser.safebrowsing.provider.google4.gethashURL.firefox_blocked_domain.tld/");

user_pref("browser.safebrowsing.reportPhishURL", "https://browser.safebrowsing.reportPhishURL.firefox_blocked_domain.tld/browser.safebrowsing.reportPhishURL");//default value: "https://%LOCALE%.phish-report.mozilla.com/?hl=%LOCALE%&url="
user_pref("browser.search.defaultenginename", "Searx");//was actually set to Google(modified by me to DuckDuckGo before!) in browser/locales/en-US/chrome/browser-region/region.properties 
user_pref("browser.search.defaultenginename.US", "Searx");//was: DuckDuckGo
//user_pref("browser.search.defaultenginename", "data:text/plain,browser.search.defaultenginename=Searx");//was actually set to Google(modified by me to DuckDuckGo before!) in browser/locales/en-US/chrome/browser-region/region.properties 
//user_pref("browser.search.defaultenginename.US", "data:text/plain,browser.search.defaultenginename.US=Searx");//was: DuckDuckGo
//to add in browser/locales/searchplugins/searx.xml(and searx.xml into browser/locales/search/list.json), this: https://searx.me/?preferences=eJxtVD2P2zAM_TX1YlzRj6GTh6IdekCBK3q5rgItMQ5hWfSRchL_-0qJE8vXDnHAR5HvkSIlqJOPajiYgCcToW12MmHlmIygsj-iNAzJfM_SVR5CN0GHDYaHl-fKswWfjcqRQuvRmdFPHQVt_tDw4KlHc-DY46zvPn17GjGYr9aiqvn-9Jjyn4QiVjSkjGYUPs9XcpgiWx5GjxGbSmGPiiD20Hyo4gEHbFgtSIVhS3nJL5eCjKfQ36tqhU-KkqvLOh7DnkIiNmqFvU_Ij93u1_NNT7J3ArZPAS-_fyZ04NSEhD6j35sUzDJAJA56wbKwTGQhYscyG0WPNq4dwZDUoTY92R5S6WZPHnPsXhBr5X08gWDtSFJYTmAoJu-RIRqjbAl8PaAjSKCgc_Qv3DF3HuvRw1zDOBYcjro2ruYBWoH8WUj2Tpjc6g8zQHLlC8nmXfKRHLK-YRomJWvM5S-5rLUP8VieRewjDagLGQUovIuy_2fmI2FJ-_FcqFJEN2K6njv1itwjbp26R-1BmE2eh4tFwZ3r6-ki6gpfY8pYSeNEYAsocj9zZD1wD2FVcm3gmk9gAE-t4NKDq_92uqXYTmnS4uLlNMGCI5cXmPz51_G_stayt_d3s95ofNv6m4o3x27ReiJVmzanZLQQpNYok42TZDFqCYPFouNLh68ra9lhnT9LhR8_f_5yLm-dood2cd7H7aLsvt-3BZohOEzBHQYU8AXlimgEiWN-Twrw9QRhcyoroyPWpCWK6ZnIy7Aiwzyk7Ze5jgJBfdrwjXuGQx6pFVhmrEgZ54FDeow2ejrqUmWgG015SiBRZUS3wkB7jYjDptD1dlaQzq9T6mEJrfOzEZrnfHPMdbXDy7uYX7a7qxowHtg1v56ed9XyxKXVbBb3Xz_HW0A=&q=%s
user_pref("browser.search.geoSpecificDefaults.url", "https://browser.search.geoSpecificDefaults.url.firefox_blocked_domain.tld/browser.search.geoSpecificDefaults.url");//default value: "https://search.services.mozilla.com/1/%APP%/%VERSION%/%CHANNEL%/%LOCALE%/%REGION%/%DISTRIBUTION%/%DISTRIBUTION_VERSION%"
user_pref("browser.search.log", false);
user_pref("browser.search.order.1", "Searx");
user_pref("browser.search.order.US.1", "Searx");
user_pref("browser.search.order.2", "DuckDuckGo");
user_pref("browser.search.order.US.2", "DuckDuckGo");
user_pref("browser.search.order.3", "Google");
user_pref("browser.search.order.US.3", "Google");
//user_pref("browser.search.order.1", "data:text/plain,browser.search.order.1=Searx");
//user_pref("browser.search.order.US.1", "data:text/plain,browser.search.order.US.1=Searx");
//user_pref("browser.search.order.2", "data:text/plain,browser.search.order.2=DuckDuckGo");
//user_pref("browser.search.order.US.2", "data:text/plain,browser.search.order.US.2=DuckDuckGo");
//user_pref("browser.search.order.3", "data:text/plain,browser.search.order.3=Google");
//user_pref("browser.search.order.US.3", "data:text/plain,browser.search.order.US.3=Google");
user_pref("browser.search.searchEnginesURL", "https://browser.search.searchEnginesURL.firefox_blocked_domain.tld/browser.search.searchEnginesURL");//default value: "https://addons.mozilla.org/%LOCALE%/firefox/search-engines/"
user_pref("browser.search.useDBForOrder", true);
/* 1005: disable fastback cache
 * To improve performance when pressing back/forward Firefox stores visited pages
 * so they don't have to be re-parsed. This is not the same as memory cache.
 * 0=none, -1=auto (that's minus 1), or for other values see [1]
 * [WARNING] Not recommended unless you know what you're doing
 * [1] http://kb.mozillazine.org/Browser.sessionhistory.max_total_viewers ***/
   // user_pref("browser.sessionhistory.max_total_viewers", 0);
user_pref("browser.sessionhistory.max_total_viewers", 512);
user_pref("browser.shell.skipDefaultBrowserCheckOnFirstRun", true);
//user_pref("browser.startup.homepage", "chrome://branding/locale/browserconfig.properties");//yeah so this isn't what you think, but that file is eg. browser/branding/nightly/locales/browserconfig.properties which contains: browser.startup.homepage=about:home  So, don't modify this pref!
//ok, setting this due to: https://github.com/ghacksuserjs/ghacks-user.js.git
/* 0103: set HOME+NEWWINDOW page
 * about:home=Activity Stream (default, see 0105), custom URL, about:blank
 * [SETTING] Home>New Windows and Tabs>Homepage and new windows ***/
user_pref("browser.startup.homepage", "about:blank"); //default value: "about:home"

// 0102: set start page (0=blank, 1=home, 2=last visited page, 3=resume previous session)
// home = browser.startup.homepage preference
// You can set all of this from Options>General>Startup
// user_pref("browser.startup.page", 0);
user_pref("browser.startup.page", 3);

user_pref("browser.tabs.crashReporting.email", "");//default value: ""
user_pref("browser.tabs.crashReporting.emailMe", false);
user_pref("browser.tabs.crashReporting.includeURL", false);
user_pref("browser.tabs.crashReporting.requestEmail", false);
//user_pref("browser.tabs.remote.autostart", true); // https://wiki.mozilla.org/Electrolysis //this is default on ArchLinux
user_pref("browser.tabs.warnOnClose", false);
user_pref("browser.tabs.warnOnCloseOtherTabs", false);
user_pref("browser.tabs.warnOnOpen", false); //default: true
user_pref("full-screen-api.warning.delay", 0);
user_pref("full-screen-api.warning.timeout", 0);
user_pref("browser.urlbar.usepreloadedtopurls.enabled", false);
user_pref("browser.urlbar.userMadeSearchSuggestionsChoice", true);
user_pref("datareporting.healthreport.about.reportUrl", "https://datareporting.healthreport.about.reportUrl.firefox_blocked_domain.tld/datareporting.healthreport.about.reportUrl/");//default value: "https://fhr.cdn.mozilla.net/%LOCALE%/v4/"
user_pref("datareporting.healthreport.infoURL", "https://datareporting.healthreport.infoURL.firefox_blocked_domain.tld/datareporting.healthreport.infoURL");//default value: "https://www.mozilla.org/legal/privacy/firefox.html#health-report"
user_pref("datareporting.policy.firstRunURL", "https://datareporting.policy.firstRunURL.firefox_blocked_domain.tld/datareporting/policy/firstRunURL/");//default value: "https://www.mozilla.org/privacy/firefox/"
user_pref("devtools.debugger.prompt-connection", true);
user_pref("dom.apps.reset-permissions", true);
user_pref("dom.enable_performance_navigation_timing", false);
user_pref("dom.enable_performance_observer", true); //github won't work properly with this on 'false' see: https://github.github.com/browser-support/ which shoes PerformanceObserver Constructor would be '!' red.
user_pref("dom.event.contextmenu.enabled", false);

/* 2428: enforce DOMHighResTimeStamp API
 * [WARNING] Required for normalization of timestamps and any timer resolution mitigations ***/
//user_pref("dom.event.highrestimestamp.enabled", true); // [DEFAULT: true]
user_pref("dom.event.highrestimestamp.enabled", false);

user_pref("dom.gamepad.extensions.enabled", false);
user_pref("dom.gamepad.haptic_feedback.enabled", false);
user_pref("dom.gamepad.non_standard_events.enabled", false);
user_pref("dom.gamepad.test.enabled", false);

// when false it breaks tree style tab addon! though it seems to work(with false) for uMatrix, uBlock Origin and https everywhere! https://github.com/piroor/treestyletab/issues/2287
user_pref("dom.moduleScripts.enabled", true); //default: true

user_pref("dom.mozApps.used", false);
user_pref("dom.performance.enable_notify_performance_timing", false);
user_pref("dom.performance.enable_user_timing_logging", false);
user_pref("dom.push.connection.enabled", false);
user_pref("dom.push.enabled", false);
user_pref("dom.push.serverURL", "wss://dom.push.serverURL.firefox_blocked_domain.tld/dom/push/server/url/");//default value: "wss://push.services.mozilla.com/"
user_pref("dom.push.userAgentID", "");
user_pref("dom.select_events.textcontrols.enabled", false);
user_pref("dom.serviceWorkers.testUpdateOverOneDay", false);
user_pref("dom.streams.enabled", false);
user_pref("dom.vr.oculus.enabled", false);
user_pref("dom.vr.oculus.invisible.enabled", false);
user_pref("dom.vr.openvr.enabled", false);
user_pref("dom.webcomponents.customelements.enabled", false);
user_pref("dom.webnotifications.requireinteraction.enabled", true);
user_pref("dom.webnotifications.serviceworker.enabled", false);
user_pref("extensions.formautofill.addresses.enabled", false);
user_pref("extensions.formautofill.available", "off");
user_pref("extensions.formautofill.creditCards.available", false);
user_pref("extensions.formautofill.creditCards.enabled", false);
user_pref("extensions.formautofill.heuristics.enabled", false);

/* 0515: disable Screenshots
 * alternatively in FF60+, disable uploading to the Screenshots server
 * [1] https://github.com/mozilla-services/screenshots
 * [2] https://www.ghacks.net/2017/05/28/firefox-screenshots-integrated-in-firefox-nightly/ ***/
user_pref("extensions.screenshots.disabled", true);
user_pref("extensions.screenshots.upload-disabled", true);

user_pref("extensions.webcompat-reporter.enabled", false);
user_pref("general.warnOnAboutConfig", false);
user_pref("browser.download.autohideButton", false); // [FF57+]
user_pref("toolkit.cosmeticAnimations.enabled", false); // [FF55+]

user_pref("geo.provider.ms-windows-location", false); // [WINDOWS]
user_pref("geo.provider.use_corelocation", false); // [MAC]
user_pref("geo.provider.use_gpsd", false); // [LINUX]
user_pref("geo.wifi.url", "https://geo.wifi.url.firefox_blocked_domain.tld/geolocation/url");//wow this got renamed to geo.wifi.uri !!! fook me! already setting 'geo.wifi.uri' above! search for it in this file!
user_pref("identity.fxaccounts.remote.oauth.uri", "https://identity.fxaccounts.remote.oauth.uri.firefox_blocked_domain.tld/fxaccounts/oauth");//default value: "https://oauth.accounts.firefox.com/v1"
user_pref("identity.fxaccounts.remote.profile.uri", "https://identity.fxaccounts.remote.profile.uri.firefox_blocked_domain.tld/fxaccounts/v1");//default value: "https://profile.accounts.firefox.com/v1"
user_pref("identity.fxaccounts.remote.root", "https://identity.fxaccounts.remote.root.firefox_blocked_domain.tld/fxaccounts/"); //default value: "https://accounts.firefox.com/"
user_pref("identity.fxaccounts.auth.uri", "https://identity.fxaccounts.auth.uri.firefox_blocked_domain.tld/"); // default value: "https://api.accounts.firefox.com/v1"
user_pref("browser.newtabpage.activity-stream.fxaccounts.endpoint", "https://browser.newtabpage.activity-stream.fxaccounts.endpoint.firefox_blocked_domain.tld/"); // default value: "https://accounts.firefox.com/"
user_pref("identity.fxaccounts.remote.pairing.uri", "wss://channelserver.services.mozilla.com.firefox_blocked_domain.tld/"); // default value: "wss://channelserver.services.mozilla.com"
user_pref("identity.mobilepromo.android", "https://identity.mobilepromo.android.firefox_blocked_domain.tld/android");//default value: "https://www.mozilla.org/firefox/android/?utm_source=firefox-browser&utm_medium=firefox-browser&utm_campaign="
user_pref("identity.mobilepromo.ios", "https://identity.mobilepromo.ios.firefox_blocked_domain.tld/ios");//default value: "https://www.mozilla.org/firefox/ios/?utm_source=firefox-browser&utm_medium=firefox-browser&utm_campaign="
user_pref("identity.sync.tokenserver.uri", "https://identity.sync.tokenserver.uri.firefox_blocked_domain.tld/blah"); //default value: "https://token.services.mozilla.com/1.0/sync/1.5"
user_pref("javascript.options.spectre.index_masking", true);
user_pref("javascript.options.spectre.string_mitigations", true);
user_pref("javascript.options.spectre.value_masking", true);

/* 2508: disable hardware acceleration to reduce graphics fingerprinting
 * [SETUP-PERF] Affects text rendering (fonts will look different), impacts video performance,
 * and parts of Quantum that utilize the GPU will also be affected as they are rolled out
 * [SETTING] General>Performance>Custom>Use hardware acceleration when available
 * [1] https://wiki.mozilla.org/Platform/GFX/HardwareAcceleration ***/
   // user_pref("gfx.direct2d.disabled", true); // [WINDOWS]
user_pref("layers.acceleration.disabled", true);//FIXME: temp set to true aka disable hardware acceleration in Preferences->Performance->"Use hardware acceleration when available"(unticked) because getting a ton of dmesg errors about swiotlb, like: radeon 0000:00:01.0: swiotlb buffer is full (sz: 2097152 bytes) AND radeon 0000:00:01.0: swiotlb: coherent allocation failed, size=2097152
user_pref("layers.acceleration.force-enabled", false); // default: false  //when true see about:support to see if it's indeed enabled (it is) and when quitting browser eg. C-q the dialog is missing any contents inside it unless resized (firefox-hg r465849+.5dc0652cd024+-1 24-25 march 2019)
user_pref("gfx.canvas.azure.accelerated", true); //hidden pref, src: https://www.phoronix.com/forums/forum/phoronix/latest-phoronix-articles/1088525-some-additional-chrome-vs-firefox-benchmarks-with-webrender-67-beta-68-alpha/page2#post1088565
user_pref("layers.omtp.enabled", true); //default: true  src: same as above ^

//use the experimental (Rust-based?) webrederer:
//src: https://www.phoronix.com/forums/forum/phoronix/latest-phoronix-articles/1088149-a-quick-look-at-the-firefox-66-0-vs-chrome-73-0-performance-benchmarks#post1088163
user_pref("gfx.webrender.all", true);
user_pref("gfx.webrender.enabled", true);
//XXX: this ^ WEBRENDER is enabled only if compositing is enabled, ie. "unavailable by runtime: Hardware compositing is disabled" see: about:support  HW_COMPOSITING "disabled by user: Disabled by pref" (that pref. is layers.acceleration.disabled=true from above)

user_pref("media.autoplay.enabled", false);
/* 2031: disable autoplay of HTML5 media if you interacted with the site [FF66+] ***/
user_pref("media.autoplay.enabled.user-gestures-needed", false);
/* 1830: disable all DRM content (EME: Encryption Media Extension) [SETUP-WEB]
 * [SETTING] General>DRM Content>Play DRM-controlled content
 * [1] https://www.eff.org/deeplinks/2017/10/drms-dead-canary-how-we-just-lost-web-what-we-learned-it-and-what-we-need-do-next ***/
user_pref("media.eme.enabled", false);
user_pref("media.eme.vp9-in-mp4.enabled", false);
/* 1825: disable widevine CDM (Content Decryption Module) [SETUP-WEB] ***/
user_pref("media.gmp-widevinecdm.visible", false);
user_pref("media.gmp-widevinecdm.enabled", false);
user_pref("media.gmp-widevinecdm.autoupdate", false);


user_pref("media.peerconnection.default_iceservers", "[]");//default "[]"
user_pref("media.peerconnection.ice.tcp", false);
user_pref("media.peerconnection.ice.proxy_only", true);
user_pref("media.peerconnection.identity.enabled", false);
user_pref("media.peerconnection.turn.disable", true);
user_pref("media.peerconnection.use_document_iceservers", false);
user_pref("media.peerconnection.video.enabled", false);
user_pref("media.peerconnection.video.vp9_enabled", false);
user_pref("media.peerconnection.video.vp9_preferred", false);
user_pref("media.webrtc.debug.aec_log_dir", "/tmp");
user_pref("media.webrtc.debug.log_file", "/tmp/WebRTC.log");
user_pref("mousewheel.with_shift.action", 4); //must be 4 for shift+mousewheel to scroll horizontally! and I found where it's mentioned too(that is, after I had to figure it out on my own, now I wonder was it 4 by default? YES! just checked): https://bugzilla.mozilla.org/show_bug.cgi?id=143038#c122
user_pref("network.cookie.prefsMigrated", true); //FIXME: maybe I shouldn't set this? see what this does!

/* 1008: set DNS cache and expiration time (default 400 and 60, same as Tor Browser) ***/
   // user_pref("network.dnsCacheEntries", 400);
   // user_pref("network.dnsCacheExpiration", 60);
user_pref("network.dnsCacheEntries", 0);
user_pref("network.dnsCacheExpiration", 0);
user_pref("network.dns.disableIPv6", true);
//user_pref("network.http.sendSecureXSiteReferrer", false); //this pref is gone: https://bugzilla.mozilla.org/show_bug.cgi?id=1308725#c2 https://github.com/schomery/privacy-settings/issues/72
//user_pref("network.predictor.cleaned-up", true);//not needed, it will clean some old files one time per profile, if false(aka default) - then sets it to true.
user_pref("network.tcp.keepalive.enabled", true);
user_pref("places.history.expiration.transient_current_max_pages", 39883);
/* 1801: set default plugin state (i.e. new plugins on discovery) to never activate
 * 0=disabled, 1=ask to activate, 2=active - you can override individual plugins ***/
user_pref("plugin.default.state", 0);
user_pref("plugin.defaultXpi.state", 0);

user_pref("plugin.disable_full_page_plugin_for_types", "application/pdf");
user_pref("plugin.importedState", true);
user_pref("plugins.notifyMissingFlash", false);
user_pref("plugin.state.libevbrowserplugin", 0);
user_pref("plugins.update.url", "https://plugins.update.url.firefox_blocked_domain.tld/plugins-dummy/updateCheckURL");//unknown default value
user_pref("privacy.reduceTimerPrecision", true);
user_pref("privacy.reduceTimerPrecision.unconditional", true); //true by default; "privacy.reduceTimerPrecision.unconditional enabled - clamp to 5usec" src: https://bugzilla.mozilla.org/show_bug.cgi?id=1586761#c2   from the code it's actually 20us now in toolkit/components/resistfingerprinting/nsRFPService.cpp
user_pref("privacy.resistFingerprinting.reduceTimerPrecision.microseconds", 100000);//"In Firefox, you can also enabled privacy.resistFingerprinting, the precision will be 100ms or the value of privacy.resistFingerprinting.reduceTimerPrecision.microseconds, whichever is larger." src: https://developer.mozilla.org/en-US/docs/Web/API/Performance/now   | ok, this value was 2000 aka 2ms, now set manually to 100000 aka 100ms  (NOTE: ms=milliseconds, μs=microseconds μs ie. "A microsecond is an SI unit of time equal to one millionth (0.000001 or 10 −6 or 1 ⁄ 1,000,000) of a second.Its symbol is μs"

/* 0425: disable passive Tracking Protection [FF53+]
 * Passive TP annotates channels to lower the priority of network loads for resources on the tracking protection list
 * [NOTE] It has no effect if TP is enabled, but keep in mind that by default TP is only enabled in Private Windows
 * This is included for people who want to completely disable Tracking Protection.
 * [1] https://bugzilla.mozilla.org/buglist.cgi?bug_id=1170190,1141814 ***/
   // user_pref("privacy.trackingprotection.annotate_channels", false);
   // user_pref("privacy.trackingprotection.lower_network_priority", false);
user_pref("privacy.trackingprotection.annotate_channels", true);
user_pref("privacy.trackingprotection.lower_network_priority", true);

user_pref("privacy.trackingprotection.introURL", "https://www.mozilla.org/%LOCALE%/firefox/%VERSION%/tracking-protection/start/");
user_pref("privacy.trackingprotection.ui.enabled", true);

// Allows developers to programmatically respond to CSP violations.
// https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
// https://developer.mozilla.org/en-US/docs/Web/API/SecurityPolicyViolationEvent
// from: https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Experimental_features
user_pref("security.csp.enable_violation_events", false); //default: false in release version of Firefox, true in dev/beta/nightly

user_pref("security.tls.insecure_fallback_hosts", "");
user_pref("security.tls.insecure_fallback_hosts.use_static_list", false);
//user_pref("security.turn_off_all_security_so_that_viruses_can_take_over_this_computer", false);
user_pref("services.sync.declinedEngines", "");
user_pref("services.sync.prefs.sync.signon.rememberSignons", false);
user_pref("signon.autologin.proxy", false);
user_pref("toolkit.telemetry.archive.enabled", false);
user_pref("toolkit.telemetry.bhrPing.enabled", false);
user_pref("toolkit.telemetry.firstShutdownPing.enabled", false);
user_pref("toolkit.telemetry.hybridContent.enabled", false);
user_pref("toolkit.telemetry.newProfilePing.enabled", false);
user_pref("toolkit.telemetry.shutdownPingSender.enabled", false);
user_pref("toolkit.telemetry.shutdownPingSender.enabledFirstSession", false);
user_pref("toolkit.telemetry.updatePing.enabled", false);
user_pref("toolkit.telemetry.server", "https://toolkit.telemetry.server.firefox_blocked_domain.tld/");//hopefully no error if empty? should I use localhost? default value: "https://incoming.telemetry.mozilla.org"
//user_pref("toolkit.telemetry.server", "data:,");//in ghacks-user.js/user.js
user_pref("urlclassifier.downloadAllowTable", "");
user_pref("urlclassifier.downloadBlockTable", "");
user_pref("urlclassifier.malwareTable", "");
user_pref("urlclassifier.phishTable", "");//default value: "googpub-phish-proto,test-phish-simple"
user_pref("webchannel.allowObject.urlWhitelist", "");//default value: "https://content.cdn.mozilla.net https://input.mozilla.org https://support.mozilla.org https://install.mozilla.org"
/* 2012: disable two more webgl preferences [FF51+] ***/
user_pref("webgl.dxgl.enabled", false); // [WINDOWS]
user_pref("webgl.enable-webgl2", false);
user_pref("webgl.force-enabled", false);

user_pref("webgl.disable-angle", true);
user_pref("webgl.disable-DOM-blit-uploads", true);
user_pref("webgl.disable-wgl", true);
user_pref("ui.popup.disable_autohide", false); // Prevent kendo tooltip hide/close when clicking outside the tooltip //never disable this or about:config RMB menu will not go away unless you choose an option!
//
//Like you see in link that you included the kendo tooltip (with autoHide: false property) hides when you:
//
//    click outside the tooltip
//    scroll page
//    hit Esc


user_pref("browser.urlbar.suggest.openpage", true); //Open tabs - suggested in url bar ? yes, i want this!
user_pref("services.sync.engine.bookmarks", false);
user_pref("services.sync.engine.bookmarks.repair.enabled", false);
user_pref("services.sync.engine.bookmarks.validation.enabled", false);
user_pref("browser.newtabpage.activity-stream.feeds.section.highlights", false); //no effect! must edit the .jsm file instead: browser/extensions/activity-stream/lib/ActivityStream.jsm

user_pref("browser.bookmarks.restore_default_bookmarks", false); //this will NOT avoid the following errors on ctrl+shift+j console:
// Error: Error(s) encountered during statement execution: NOT NULL constraint failed: moz_bookmarks.syncStatus
//Stack trace:
//handleCompletion@resource://gre/modules/Sqlite.jsm:808:0
//  Sqlite.jsm:646
//Failed to import bookmarks from chrome://browser/locale/bookmarks.html: Error: Error(s) encountered during statement execution: NOT NULL constraint failed: moz_bookmarks.syncStatus  BookmarkHTMLUtils.jsm:145
//Bookmarks.html file could be corrupt. Error: Error(s) encountered during statement execution: NOT NULL constraint failed: moz_bookmarks.syncStatus  nsBrowserGlue.js:1656
//Bookmarks.jsm: insert: Invalid value for property 'title': "Most Visited"  PlacesUtils.jsm:634

//ok that ^ still happens, oddly enough!
user_pref("browser.places.importBookmarksHTML", false);
user_pref("signon.importedFromSqlite", false);
//still nothing! so the above happens one time after profile creation when starting firefox!


user_pref("browser.library.activity-stream.enabled", false);

//NEVERMIND //XXX: allowing these two because this is supposedly for: Mozilla Safe Browsing provider (for tracking protection and plugin blocking) src: modules/libpref/init/all.js
//user_pref("browser.safebrowsing.provider.mozilla.updateURL", "https://shavar.services.mozilla.com/downloads?client=SAFEBROWSING_ID&appver=%MAJOR_VERSION%&pver=2.2");//default value: https://shavar.services.mozilla.com/downloads?client=SAFEBROWSING_ID&appver=%MAJOR_VERSION%&pver=2.2"
//user_pref("browser.safebrowsing.provider.mozilla.gethashURL", "https://shavar.services.mozilla.com/gethash?client=SAFEBROWSING_ID&appver=%MAJOR_VERSION%&pver=2.2"); // default value: "https://shavar.services.mozilla.com/gethash?client=SAFEBROWSING_ID&appver=%MAJOR_VERSION%&pver=2.2"
//doneTODO: to be used instead:
user_pref("browser.safebrowsing.provider.mozilla.updateURL", "https://browser.safebrowsing.provider.mozilla.updateurl.firefox_blocked_domain.tld/browser.safebrowsing.provider.mozilla.updateURL");//default value: https://shavar.services.mozilla.com/downloads?client=SAFEBROWSING_ID&appver=%MAJOR_VERSION%&pver=2.2" //XXX: I've seen firefox 68.0a1 try to contact this url ! I don't think it can be turned off!
user_pref("browser.safebrowsing.provider.mozilla.gethashURL", "https://browser.safebrowsing.provider.mozilla.gethashURL.firefox_blocked_domain.tld/browser.safebrowsing.provider.mozilla.gethashURL"); // default value: "https://shavar.services.mozilla.com/gethash?client=SAFEBROWSING_ID&appver=%MAJOR_VERSION%&pver=2.2"

//coming up next, a few from: https://www.ghacks.net/2015/08/18/a-comprehensive-list-of-firefox-privacy-and-security-settings/
//0100: STARTUP
// 0101: disable "slow startup" options
// warnings, disk history, welcomes, intros, EULA, default browser check
user_pref("browser.slowStartup.notificationDisabled", true);
user_pref("browser.slowStartup.maxSamples", 0);
user_pref("browser.slowStartup.samples", 0);
user_pref("browser.rights.3.shown", true);
user_pref("startup.homepage_welcome_url", "");
user_pref("startup.homepage_welcome_url.additional", "");
user_pref("startup.homepage_override_url", ""); // What's New page after updates
user_pref("browser.laterrun.enabled", false);
user_pref("browser.usedOnWindows10.introURL", "");

// 0201: disable location-aware browsing
user_pref("geo.wifi.xhr.timeout", 1);
user_pref("browser.search.geoip.timeout", 1);

// 0204: set APP local
user_pref("general.useragent.locale", "en-US");
// ^ it's "chrome://global/locale/intl.properties" in /var/db/repos/localrepo/www-client/firefox/files/gentoo-default-prefs.js

// 0206: disable geographically specific results/search engines eg: "browser.search.*.US"
// i.e ignore all of Mozilla's multiple deals with multiple engines in multiple locales
//XXX: already set above!
//user_pref("browser.search.geoSpecificDefaults", false);
//user_pref("browser.search.geoSpecificDefaults.url", "");

// 0301: disable browser auto update
//
// Options>Advanced>Update>Use a background service to install updates
user_pref("app.update.service.enabled", false);
// ensure update information is not suppressed
user_pref("app.update.silent", false);
// disable background update staging
user_pref("app.update.staging.enabled", false);
// 0305: disable add-ons auto update
user_pref("extensions.update.autoUpdateDefault", false);
// 0320: disable extension discovery
// featured extensions for displaying in Get Add-ons panel
user_pref("extensions.webservice.discoverURL", "https://extensions.webservice.discoverURL.firefox_blocked_domain.tld/extensions.webservice.discoverURL");

// 0330b: set unifiedIsOptIn to make sure telemetry respects OptIn choice and that telemetry
// is enabled ONLY for people that opted into it, even if unified Telemetry is enabled
user_pref("toolkit.telemetry.unifiedIsOptIn", true); // (hidden pref)

// 0333a: disable health report
user_pref("datareporting.healthreport.documentServerURI", "https://datareporting.healthreport.documentServerURI.firefox_blocked_domain.tld/datareporting.healthreport.documentServerURI"); // (hidden pref)


// 0335: remove a telemetry clientID
// if you haven't got one, be proactive and set it now for future proofing
user_pref("toolkit.telemetry.cachedClientID", "");

// 0336: disable "Heartbeat" (Mozilla user rating telemetry)
// https://trac.torproject.org/projects/tor/ticket/18738
user_pref("browser.selfsupport.enabled", false); // (hidden pref)

// 0340: disable experiments
// https://wiki.mozilla.org/Telemetry/Experiments
user_pref("experiments.activeExperiment", false);

//XXX: updated ghacks is https://github.com/ghacksuserjs/ghacks-user.js
//TODO: add from there things that I don't already have!


//src: https://www.privacytools.io/
//Even with Firefox set to not remember history, your closed tabs are stored temporarily at Menu -> History -> Recently Closed Tabs.
user_pref("browser.sessionstore.max_tabs_undo", 100); //10 is the default!
/* 1020: exclude "Undo Closed Tabs" in Session Restore ***/
   // user_pref("browser.sessionstore.max_tabs_undo", 0);


//Disable preloading of autocomplete URLs. Firefox preloads URLs that autocomplete when a user types into the address bar, which is a concern if URLs are suggested that the user does not want to connect to. Source: https://www.ghacks.net/2017/07/24/disable-preloading-firefox-autocomplete-urls/  See also browser.urlbar.speculativeConnect.enabled (which is already 0 aka disabled)
user_pref("browser.urlbar.speculativeConnect.enabled", false);


user_pref("media.peerconnection.identity.timeout", 1); //src: https://www.privacytools.io/#webrtc

user_pref("extensions.webextensions.themes.enabled", false); //yep let's don't care about themes! because there are some urls it's trying...
user_pref("extensions.getAddons.themes.browseURL", "https://extensions.getAddons.themes.browseURL.firefox_blocked_domain.tld/extensions.getAddons.themes.browseURL"); //

user_pref("media.gmp-manager.updateEnabled", false); //see: toolkit/mozapps/extensions/internal/ProductAddonChecker.jsm and toolkit/content/jar.mn Basically, disables downloading cisco's openh264 binary and widevinecdm from google!

user_pref("browser.cache.disk.filesystem_reported", true); // set to true so it thinks it already reported the filesystem type via telemetry! which is what this does, see netwerk/cache2/CacheFileIOManager.cpp CacheObserver::SetCacheFSReported();

user_pref("privacy.spoof_english", 2); // settable from Preferences->Language->Choose, [v] Request English versions of web pages for enhanced privacy (which [v] sets this value to 2, otherwise [] sets it to 1)
//XXX WARNING: a value of '0' or '1' here will clear javascript.use_us_english_locale !!! see toolkit/components/resistfingerprinting/RFPHelper.jsm _handleSpoofEnglishChanged() 
//XXX: a value of '2' is supposed to change intl.accept_languages="en-US, en" and javascript.use_us_english_locale=true  but it doesn't because this only happens when you manually modify this value in about:config or from the Preferences menu! 
//FIXME: BIG PROBLEM! when this is '2' it's supposed to auto-set intl.accept_languages="en-US, en" but it doesn't unless I first change it to another value and then back to '2' from about:config ! (just changing it from '2' to '2' has no effect!) This leads me to believe that the other issue with intl.accept_languages having effect(aka sendign Accept-Language header) only when modified from about:config has the same root cause! see toolkit/components/resistfingerprinting/RFPHelper.jsm this._handlePrefChanged(data); and _handleSpoofEnglishChanged
//XXX: if you set this in user.js as opposed to only in vendor.js then it still doesn't work (that is, it doesn't set the intl.accept_languages as it would when you manually modify it from about:config)
//XXX: if this is already '2' in vendor.js and also '2' in user.js then clicking Reset does work and sets the intl.accept_languages as if you just modified the prop to '2'. However if you just have non-'2' in vendor.js and '2' in user.js just changing it to '2' and clicking Save has no effect! intl.accept_languages remains untouched!
//So the problem is that there are other settings too (like the resist fingerprinting one) which react in certain ways like this, only when modified manually, as opposed to via user.js or vendor.js!

// 2507: disable keyboard fingerprinting (FF38+)
// The Keyboard API allows scripts to track the "read parameter" of pressed keys, which vary
// between types of keyboards layouts such as QWERTY, AZERTY, Dvorak, and between languages.
// https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code
// https://www.privacy-handbuch.de/handbuch_21v.htm
user_pref("dom.keyboardevent.code.enabled", false); //default true
user_pref("dom.beforeAfterKeyboardEvent.enabled", false); // default false
user_pref("dom.keyboardevent.dispatch_during_composition", false); // default false
//The last two prefs are already false by default, but I included them for future-proofing
//from: https://github.com/pyllyukko/user.js/issues/159
// Test: https://w3c.github.io/uievents/tools/key-event-viewer.html
// https://bugzilla.mozilla.org/show_bug.cgi?id=1222285
// looks fixed by having privacy.resistFingerprinting=true by these commits https://bugzilla.mozilla.org/show_bug.cgi?id=1222285#c74

//remote settings preference(s) - caught this being tried!
user_pref("services.settings.server", "https://services.settings.server.firefox_blocked_domain.tld/firefox.settings.services.mozilla.com/v1"); // found set in modules/libpref/init/all.js

// Use LANG environment variable to choose locale //currently commented out:
//user_pref("intl.locale.requested", ""); // from: https://aur.archlinux.org/cgit/aur.git/tree/PKGBUILD?h=firefox-hg&id=189ea6610f6debf0e579c830d5e99ef6e5055f79#n140
/* 0205: set OS & APP locale [FF59+]
 * If set to empty, the OS locales are used. If not set at all, default locale is used ***/
//user_pref("intl.locale.requested", "en-US"); // [HIDDEN PREF]
//^ https://github.com/ghacksuserjs/ghacks-user.js.git



//new tab will fail to open links in new tab unless this about:config var exists(ie. set to true/false), and it wasn't already! //dangling comment FIXME
//adds context menu "Pincture-in-Picture" for videos which opens a bottom right tiny window with the video! tried it on youtube.
user_pref("media.videocontrols.picture-in-picture.enabled", true); // default: unset!

user_pref("identity.fxaccounts.commands.enabled", false); //default: true
user_pref("identity.fxaccounts.enabled", false); //default: true // // disable and hide Firefox Accounts and Sync [FF60+] [RESTART]
user_pref("identity.fxaccounts.toolbar.enabled", false); //default: true

// "If you want to stop update notifications that drop down from the 3-bar menu, look for app.update.doorhanger in about:config and double click to change 'Value' from True to False, then restart Firefox. You will still get a window notifying you of updates, but it won't appear anything like as frequently." src: http://forums.mozillazine.org/viewtopic.php?f=38&t=3037988
user_pref("app.update.doorhanger", false); //default: true


user_pref("app.support.baseURL", "https://app.support.baseURL.firefox_blocked_domain.tld/"); //default value: "https://support.mozilla.org/1/firefox/%VERSION%/%OS%/%LOCALE%/"
//WARNING: all urls must end with / or else you can get this hostname lookup: Jun  7 05:29:17 dnsmasq[13933]: 63 127.0.0.1/50998 query[A] app.support.baseurl.firefox_blocked_domain.tldfirefox-help from 127.0.0.1

user_pref("browser.contentblocking.reportBreakage.enabled", false); //default: true
user_pref("browser.contentblocking.reportBreakage.url", "https://browser.contentblocking.reportBreakage.url.firefox_blocked_domain.tld/"); //default value: "https://tracking-protection-issues.herokuapp.com/new"

//browser.dictionaries.download.url https://addons.mozilla.org/%LOCALE%/firefox/language-tools/

user_pref("browser.newtabpage.activity-stream.asrouter.providers.cfr", "{\"id\":\"cfr\",\"enabled\":false,\"type\":\"local\",\"localProvider\":\"CFRMessageProvider\",\"frequency\":{\"custom\":[{\"period\":\"daily\",\"cap\":1}]},\"categories\":[\"cfrAddons\",\"cfrFeatures\"]}"); //default value: "{\"id\":\"cfr\",\"enabled\":true,\"type\":\"local\",\"localProvider\":\"CFRMessageProvider\",\"frequency\":{\"custom\":[{\"period\":\"daily\",\"cap\":1}]},\"categories\":[\"cfrAddons\",\"cfrFeatures\"]}"
user_pref("browser.newtabpage.activity-stream.asrouter.providers.snippets", "{\"id\":\"snippets\",\"enabled\":false,\"type\":\"remote\",\"url\":\"https://snippets.cdn.mozilla.net.firefox_blocked_domain.tld/%STARTPAGE_VERSION%/%NAME%/%VERSION%/%APPBUILDID%/%BUILD_TARGET%/%LOCALE%/%CHANNEL%/%OS_VERSION%/%DISTRIBUTION%/%DISTRIBUTION_VERSION%/\",\"updateCycleInMs\":14400000}"); // ^ default value: "{\"id\":\"snippets\",\"enabled\":true,\"type\":\"remote\",\"url\":\"https://snippets.cdn.mozilla.net/%STARTPAGE_VERSION%/%NAME%/%VERSION%/%APPBUILDID%/%BUILD_TARGET%/%LOCALE%/%CHANNEL%/%OS_VERSION%/%DISTRIBUTION%/%DISTRIBUTION_VERSION%/\",\"updateCycleInMs\":14400000}"
// set in: $ cdff && vim browser/app/profile/firefox.js

/* 2750: disable Storage API [FF51+]
 * The API gives sites the ability to find out how much space they can use, how much
 * they are already using, and even control whether or not they need to be alerted
 * before the user agent disposes of site data in order to make room for other things.
 * [1] https://developer.mozilla.org/docs/Web/API/StorageManager
 * [2] https://developer.mozilla.org/docs/Web/API/Storage_API
 * [3] https://blog.mozilla.org/l10n/2017/03/07/firefox-l10n-report-aurora-54/ ***/
// https://github.com/ghacksuserjs/ghacks-user.js/issues/610#issue-396156914
user_pref("dom.storageManager.enabled", false); //default: true

/* 2755: disable Storage Access API [FF65+]
 * [1] https://developer.mozilla.org/en-US/docs/Web/API/Storage_Access_API ***/
user_pref("dom.storage_access.enabled", false); // default: true


user_pref("dom.storage_access.auto_grants", false); //default: true
user_pref("dom.storage_access.auto_grants.delayed", false); // default: true

/* 0209: use APP locale over OS locale in regional preferences [FF56+]
 * [1] https://bugzilla.mozilla.org/buglist.cgi?bug_id=1379420,1364789 ***/
user_pref("intl.regional_prefs.use_os_locales", false); //default false (apparently)


/* 0320: disable about:addons' Get Add-ons panel (uses Google Analytics) ***/
user_pref("extensions.getAddons.showPane", false); // [HIDDEN PREF]

/* 0331: disable Telemetry Coverage
 * [1] https://blog.mozilla.org/data/2018/08/20/effectively-measuring-search-in-firefox/ ***/
user_pref("toolkit.telemetry.coverage.opt-out", true); // [HIDDEN PREF]
user_pref("toolkit.coverage.opt-out", true); // [FF64+] [HIDDEN PREF]
user_pref("toolkit.coverage.endpoint.base", "");

/* 0391: disable Network Connectivity checks [FF65+]
 * [1] https://bugzilla.mozilla.org/1460537 ***/
user_pref("network.connectivity-service.enabled", false);

/* 0702: disable HTTP2 (which was based on SPDY which is now deprecated)
 * HTTP2 raises concerns with "multiplexing" and "server push", does nothing to enhance
 * privacy, and in fact opens up a number of server-side fingerprinting opportunities
 * [SETUP-PERF] Relax this if you have FPI enabled (see 4000) *AND* you understand the
 * consequences. FPI isolates these, but it was designed with the Tor protocol in mind,
 * and the Tor Browser has extra protection, including enhanced sanitizing per Identity.
 * [1] https://http2.github.io/faq/
 * [2] https://blog.scottlogic.com/2014/11/07/http-2-a-quick-look.html
 * [3] https://queue.acm.org/detail.cfm?id=2716278
 * [4] https://github.com/ghacksuserjs/ghacks-user.js/issues/107 ***/
user_pref("network.http.spdy.enabled", false);
user_pref("network.http.spdy.enabled.deps", false);
user_pref("network.http.spdy.enabled.http2", false); // this sends the TE trailers header but only if you shift+click_reload_button seen by https://www.whatismybrowser.com/detect/what-http-headers-is-my-browser-sending  TE is Transfer-Encoding eg. https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/TE https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Trailer
user_pref("network.http.spdy.websockets", false); // [FF65+]

/* 0703: disable HTTP Alternative Services [FF37+]
 * [SETUP-PERF] Relax this if you have FPI enabled (see 4000) *AND* you understand the
 * consequences. FPI isolates these, but it was designed with the Tor protocol in mind,
 * and the Tor Browser has extra protection, including enhanced sanitizing per Identity.
 * [1] https://tools.ietf.org/html/rfc7838#section-9
 * [2] https://www.mnot.net/blog/2016/03/09/alt-svc ***/
user_pref("network.http.altsvc.enabled", false);
user_pref("network.http.altsvc.oe", false);

/* 0706: remove paths when sending URLs to PAC scripts [FF51+]
 * CVE-2017-5384: Information disclosure via Proxy Auto-Config (PAC)
 * [1] https://bugzilla.mozilla.org/1255474 ***/
user_pref("network.proxy.autoconfig_url.include_path", false); // [DEFAULT: false]

/* 0709: disable using UNC (Uniform Naming Convention) paths [FF61+]
 * [SETUP-CHROME] Can break extensions for profiles on network shares
 * [1] https://trac.torproject.org/projects/tor/ticket/26424 ***/
user_pref("network.file.disable_unc_paths", true); // [HIDDEN PREF]

/* 0710: disable GIO as a potential proxy bypass vector
 * Gvfs/GIO has a set of supported protocols like obex, network, archive, computer, dav, cdda,
 * gphoto2, trash, etc. By default only smb and sftp protocols are accepted so far (as of FF64)
 * [1] https://bugzilla.mozilla.org/1433507
 * [2] https://trac.torproject.org/23044
 * [3] https://en.wikipedia.org/wiki/GVfs
 * [4] https://en.wikipedia.org/wiki/GIO_(software) ***/
user_pref("network.gio.supported-protocols", ""); // [HIDDEN PREF]

/* 0804: limit history leaks via enumeration (PER TAB: back/forward)
 * This is a PER TAB session history. You still have a full history stored under all history
 * default=50, minimum=1=currentpage, 2 is the recommended minimum as some pages
 * use it as a means of referral (e.g. hotlinking), 4 or 6 or 10 may be more practical ***/
user_pref("browser.sessionhistory.max_entries", 50); // default 50, set 50 because I kinda want/like to have this!

/* 0864: disable date/time picker
 * This can leak your locale if not en-US
 * [1] https://trac.torproject.org/projects/tor/ticket/21787 ***/
user_pref("dom.forms.datetime", false);

/* 0870: disable Windows jumplist [WINDOWS] ***/
user_pref("browser.taskbar.lists.enabled", false);
user_pref("browser.taskbar.lists.frequent.enabled", false);
user_pref("browser.taskbar.lists.recent.enabled", false);
user_pref("browser.taskbar.lists.tasks.enabled", false);
/* 0871: disable Windows taskbar preview [WINDOWS] ***/
user_pref("browser.taskbar.previews.enable", false);

/* 0912: limit (or disable) HTTP authentication credentials dialogs triggered by sub-resources [FF41+]
 * hardens against potential credentials phishing
 * 0=don't allow sub-resources to open HTTP authentication credentials dialogs
 * 1=don't allow cross-origin sub-resources to open HTTP authentication credentials dialogs
 * 2=allow sub-resources to open HTTP authentication credentials dialogs (default)
 * [1] https://www.fxsitecompat.com/en-CA/docs/2015/http-auth-dialog-can-no-longer-be-triggered-by-cross-origin-resources/ ***/
user_pref("network.auth.subresource-http-auth-allow", 1);

/* 1006: disable permissions manager from writing to disk [RESTART]
 * [NOTE] This means any permission changes are session only
 * [1] https://bugzilla.mozilla.org/967812 ***/
   // user_pref("permissions.memory_only", true); // [HIDDEN PREF]
user_pref("permissions.memory_only", false); // [HIDDEN PREF]

/* 1022: disable resuming session from crash ***/
   // user_pref("browser.sessionstore.resume_from_crash", false);
user_pref("browser.sessionstore.resume_from_crash", true);

/* 1023: set the minimum interval between session save operations
 * Increasing this can help on older machines and some websites, as well as reducing writes, see [1]
 * Default is 15000 (15 secs). Try 30000 (30 secs), 60000 (1 min) etc
 * [SETUP-CHROME] This can also affect entries in the "Recently Closed Tabs" feature:
 * i.e. the longer the interval the more chance a quick tab open/close won't be captured.
 * This longer interval *may* affect history but we cannot replicate any history not recorded
 * [1] https://bugzilla.mozilla.org/1304389 ***/
user_pref("browser.sessionstore.interval", 15000);
// since I'm using profile-sync-daemon-git saves are done in tmpfs, so I can afford quick saves more often!

/* 1031: disable favicons in tabs and new bookmarks
 * bookmark favicons are stored as data blobs in favicons.sqlite ***/
   // user_pref("browser.chrome.site_icons", false); //default true
user_pref("browser.chrome.site_icons", true); //default true

/* 1032: disable favicons in web notifications ***/
user_pref("alerts.showFavicons", false); // [DEFAULT: false]

/* 1205: disable TLS1.3 0-RTT (round-trip time) [FF51+]
 * [1] https://github.com/tlswg/tls13-spec/issues/1001
 * [2] https://blog.cloudflare.com/tls-1-3-overview-and-q-and-a/ ***/
user_pref("security.tls.enable_0rtt_data", false);

/* 1272: display advanced information on Insecure Connection warning pages
 * only works when it's possible to add an exception
 * i.e. it doesn't work for HSTS discrepancies (https://subdomain.preloaded-hsts.badssl.com/)
 * [TEST] https://expired.badssl.com/ ***/
user_pref("browser.xul.error_pages.expert_bad_cert", true);

/* 1273: display "insecure" icon and "Not Secure" text on HTTP sites ***/
user_pref("security.insecure_connection_icon.enabled", true); // [FF59+]
user_pref("security.insecure_connection_text.enabled", true); // [FF60+]
user_pref("security.insecure_connection_icon.pbmode.enabled", true); // [FF59+]  for private windows
user_pref("security.insecure_connection_text.pbmode.enabled", true); // [FF60+] private windows


/* 1405: disable WOFF2 (Web Open Font Format) [FF35+] ***/
user_pref("gfx.downloadable_fonts.woff2.enabled", false);

/* 1406: disable CSS Font Loading API
 * [NOTE] Disabling fonts can uglify the web a fair bit. ***/
user_pref("layout.css.font-loading-api.enabled", false);

/* 1407: disable special underline handling for a few fonts which you will probably never use [RESTART]
 * Any of these fonts on your system can be enumerated for fingerprinting.
 * [1] http://kb.mozillazine.org/Font.blacklist.underline_offset ***/
user_pref("font.blacklist.underline_offset", "");

/* 1408: disable graphite which FF49 turned back on by default
 * In the past it had security issues. Update: This continues to be the case, see [1]
 * [1] https://www.mozilla.org/security/advisories/mfsa2017-15/#CVE-2017-7778 ***/
user_pref("gfx.font_rendering.graphite.enabled", false);

/* 1601: ALL: control when images/links send a referer
 * 0=never, 1=send only when links are clicked, 2=for links and images (default) ***/
user_pref("network.http.sendRefererHeader", 2);

/* 1606: ALL: set the default Referrer Policy [FF59+]
 * 0=no-referer, 1=same-origin, 2=strict-origin-when-cross-origin, 3=no-referrer-when-downgrade
 * [NOTE] This is only a default, it can be overridden by a site-controlled Referrer Policy
 * [1] https://www.w3.org/TR/referrer-policy/
 * [2] https://developer.mozilla.org/docs/Web/HTTP/Headers/Referrer-Policy
 * [3] https://blog.mozilla.org/security/2018/01/31/preventing-data-leaks-by-stripping-path-information-in-http-referrers/ ***/
user_pref("network.http.referer.defaultPolicy", 3); // [DEFAULT: 3]
user_pref("network.http.referer.defaultPolicy.pbmode", 2); // [DEFAULT: 2]

/* 1607: TOR: hide (not spoof) referrer when leaving a .onion domain [FF54+]
 * [NOTE] Firefox cannot access .onion sites by default. We recommend you use
 * the Tor Browser which is specifically designed for hidden services
 * [1] https://bugzilla.mozilla.org/1305144 ***/
user_pref("network.http.referer.hideOnionSource", true);


/* 1701: enable Container Tabs setting in preferences (see 1702) [FF50+]
 * [1] https://bugzilla.mozilla.org/1279029 ***/
user_pref("privacy.userContext.ui.enabled", true);

/* 1703: enable a private container for thumbnail loads [FF51+] ***/
user_pref("privacy.usercontext.about_newtab_segregation.enabled", true); // [DEFAULT: true in FF61+]

/* 1704: set behaviour on "+ Tab" button to display container menu [FF53+] [SETUP-CHROME]
 * 0=no menu (default), 1=show when clicked, 2=show on long press
 * [NOTE] The menu does not contain a non-container tab option (use Ctrl+T to open non-container tab)
 * [1] https://bugzilla.mozilla.org/1328756 ***/
user_pref("privacy.userContext.longPressBehavior", 2); //default 2, set to 1 because it allows 'No Container' too! (it's in the menu); actually on long press is better, for now!

/* 2026: disable canvas capture stream [FF41+]
 * [1] https://developer.mozilla.org/docs/Web/API/HTMLCanvasElement/captureStream ***/
user_pref("canvas.capturestream.enabled", false);

/* 2027: disable camera image capture [FF35+]
 * [1] https://trac.torproject.org/projects/tor/ticket/16339 ***/
user_pref("dom.imagecapture.enabled", false); // [DEFAULT: false]

/* 2024: set a default permission for Camera/Microphone [FF58+]
 * 0=always ask (default), 1=allow, 2=block
 * [SETTING] to add site exceptions: Page Info>Permissions>Use the Camera/Microphone
 * [SETTING] to manage site exceptions: Options>Privacy & Security>Permissions>Camera/Microphone>Settings ***/
user_pref("permissions.default.camera", 2);
user_pref("permissions.default.microphone", 2);


/* 2028: disable offscreen canvas [FF44+]
 * [1] https://developer.mozilla.org/docs/Web/API/OffscreenCanvas ***/
user_pref("gfx.offscreencanvas.enabled", false); // [DEFAULT: false]

/* 2030: disable autoplay of HTML5 media [FF63+]
 * 0=Allowed, 1=Blocked, 2=Prompt
 * [NOTE] You can set exceptions under site permissions
 * [SETTING] Privacy & Security>Permissions>Block websites from automatically playing sound ***/
user_pref("media.autoplay.default", 1); // default 1

/* 2031: disable autoplay of HTML5 media if you interacted with the site [FF66+] ***/
user_pref("media.autoplay.enabled.user-gestures-needed", false);

/* 2032: disable audio autoplay in non-active tabs [FF51+]
 * [1] https://www.ghacks.net/2016/11/14/firefox-51-blocks-automatic-audio-playback-in-non-active-tabs/ ***/
user_pref("media.block-autoplay-until-in-foreground", true);

/* 2201: prevent websites from disabling new window features
 * [1] http://kb.mozillazine.org/Prevent_websites_from_disabling_new_window_features ***/
user_pref("dom.disable_window_open_feature.close", true);
user_pref("dom.disable_window_open_feature.location", true); // [DEFAULT: true]
user_pref("dom.disable_window_open_feature.menubar", true);
user_pref("dom.disable_window_open_feature.minimizable", true);
user_pref("dom.disable_window_open_feature.personalbar", true); // bookmarks toolbar
user_pref("dom.disable_window_open_feature.resizable", true); // [DEFAULT: true]
user_pref("dom.disable_window_open_feature.status", true); // [DEFAULT: true]
user_pref("dom.disable_window_open_feature.titlebar", true);
user_pref("dom.disable_window_open_feature.toolbar", true);

/* 2202: prevent scripts from moving and resizing open windows ***/
user_pref("dom.disable_window_move_resize", true);

/* 2203: open links targeting new windows in a new tab instead
 * This stops malicious window sizes and some screen resolution leaks.
 * You can still right-click a link and open in a new window.
 * [TEST] https://people.torproject.org/~gk/misc/entire_desktop.html
 * [1] https://trac.torproject.org/projects/tor/ticket/9881 ***/                
user_pref("browser.link.open_newwindow", 3);
user_pref("browser.link.open_newwindow.restriction", 0); // default: 2
//^ https://superuser.com/a/639403/1039642

/* 2204: disable Fullscreen API (requires user interaction) to prevent screen-resolution leaks
 * [NOTE] You can still manually toggle the browser's fullscreen state (F11),
 * but this pref will disable embedded video/game fullscreen controls, e.g. youtube
 * [TEST] https://developer.mozilla.org/samples/domref/fullscreen.html ***/
user_pref("full-screen-api.enabled", false);

/* 2210: block popup windows
 * [SETTING] Privacy & Security>Permissions>Block pop-up windows ***/
user_pref("dom.disable_open_during_load", true);

/* 2211: set max popups from a single non-click event - default is 20! ***/
user_pref("dom.popup_maximum", 3);

/* 2212: limit events that can cause a popup
 * default is "change click dblclick mouseup pointerup notificationclick reset submit touchend"
 * [1] http://kb.mozillazine.org/Dom.popup_allowed_events ***/
user_pref("dom.popup_allowed_events", "click dblclick");

/* 2426: disable Intersection Observer API [FF53+]
 * Almost a year to complete, three versions late to stable (as default false),
 * number #1 cause of crashes in nightly numerous times, and is (primarily) an
 * ad network API for "ad viewability checks" down to a pixel level
 * [1] https://developer.mozilla.org/docs/Web/API/Intersection_Observer_API
 * [2] https://w3c.github.io/IntersectionObserver/
 * [3] https://bugzilla.mozilla.org/1243846 ***/
user_pref("dom.IntersectionObserver.enabled", true);
// do not disable this anymore, was 'false' but it breaks docs.github.com and the contents of F12 and ctrl+shift+j (the latter one doesn't bring up the window anymore maybe it's something else broken, either when false or true on this setting, so must be smth else)

/* 2427: disable Shared Memory (Spectre mitigation)
 * [1] https://github.com/tc39/ecmascript_sharedmem/blob/master/TUTORIAL.md
 * [2] https://blog.mozilla.org/security/2018/01/03/mitigations-landing-new-class-timing-attack/ ***/
user_pref("javascript.options.shared_memory", false);

/* 2429: enable (limited but sufficient) window.opener protection [FF65+]
 * Makes rel=noopener implicit for target=_blank in anchor and area elements when no rel attribute is set ***/
user_pref("dom.targetBlankNoOpener.enabled", true);

/* 2605: block web content in file processes [FF55+]
 * [SETUP-WEB] You may want to disable this for corporate or developer environments
 * [1] https://bugzilla.mozilla.org/1343184 ***/
user_pref("browser.tabs.remote.allowLinkedWebInFileUriProcess", true); //mod //i guess I need this to be true for local rust book viewing from file:/// uris

/* 2609: disable MathML (Mathematical Markup Language) [FF51+]
 * [TEST] http://browserspy.dk/mathml.php
 * [1] https://bugzilla.mozilla.org/1173199 ***/
user_pref("mathml.disabled", true);

/* 2611: disable middle mouse click opening links from clipboard
 * [1] https://trac.torproject.org/projects/tor/ticket/10089
 * [2] http://kb.mozillazine.org/Middlemouse.contentLoadURL ***/
user_pref("middlemouse.contentLoadURL", false);

/* 2614: limit HTTP redirects (this does not control redirects with HTML meta tags or JS)
 * [NOTE] A low setting of 5 or under will probably break some sites (e.g. gmail logins)
 * To control HTML Meta tag and JS redirects, use an extension. Default is 20 ***/
user_pref("network.http.redirection-limit", 10);

/* 2615: disable websites overriding Firefox's keyboard shortcuts [FF58+]
 * 0 (default) or 1=allow, 2=block
 * [NOTE] In FF65 and under, causes issues with delete and backspace keys (see 1445942)
 * [SETTING] to add site exceptions: Page Info>Permissions>Override Keyboard Shortcuts ***/
   // user_pref("permissions.default.shortcuts", 2);

/* 2616: remove special permissions for certain mozilla domains [FF35+]
 * [1] resource://app/defaults/permissions ***/
user_pref("permissions.manager.defaultsUrl", "");

/* 2618: disable exposure of system colors to CSS or canvas [FF44+]
 * [NOTE] See second listed bug: may cause black on black for elements with undefined colors
 * [1] https://bugzilla.mozilla.org/buglist.cgi?bug_id=232227,1330876 ***/
user_pref("ui.use_standins_for_native_colors", true); // [HIDDEN PREF]

/* 2653: disable hiding mime types (Options>General>Applications) not associated with a plugin ***/
user_pref("browser.download.hide_plugins_without_extensions", false);

/* 2660: lock down allowed extension directories
 * [SETUP-CHROME] This will break extensions that do not use the default XPI directories
 * [1] https://mike.kaply.com/2012/02/21/understanding-add-on-scopes/
 * [1] archived: https://archive.is/DYjAM ***/
//user_pref("extensions.enabledScopes", 1); // [HIDDEN PREF]
//user_pref("extensions.autoDisableScopes", 15);

/* 2662: disable webextension restrictions on certain mozilla domains (also see 4503) [FF60+]
 * [1] https://bugzilla.mozilla.org/buglist.cgi?bug_id=1384330,1406795,1415644,1453988 ***/
// https://bugzilla.mozilla.org/show_bug.cgi?id=1445663#c3
// https://github.com/gorhill/uMatrix/wiki/Privileged-Pages
user_pref("extensions.webextensions.restrictedDomains", ""); //otherwise uMatrix/uBlock won't be able to detect or block anything(eg. their scripts will run too) on sites like support.mozilla.org full list(eg. default value for this pref): "accounts-static.cdn.mozilla.net,accounts.firefox.com,addons.cdn.mozilla.net,addons.mozilla.org,api.accounts.firefox.com,content.cdn.mozilla.net,discovery.addons.mozilla.org,install.mozilla.org,oauth.accounts.firefox.com,profile.accounts.firefox.com,support.mozilla.org,sync.services.mozilla.com"

/* 2663: enable warning when websites try to install add-ons
 * [SETTING] Privacy & Security>Permissions>Warn you when websites try to install add-ons ***/
user_pref("xpinstall.whitelist.required", true); // [DEFAULT: true]

/* 2705: disable HTTP sites setting cookies with the "secure" directive [FF52+]
 * [1] https://developer.mozilla.org/Firefox/Releases/52#HTTP ***/
user_pref("network.cookie.leave-secure-alone", true); // [DEFAULT: true]

/* 2731: enforce websites to ask to store data for offline use
 * [1] https://support.mozilla.org/questions/1098540
 * [2] https://bugzilla.mozilla.org/959985 ***/
user_pref("offline-apps.allow_by_default", false);

/* 2740: disable service workers cache and cache storage
 * [1] https://w3c.github.io/ServiceWorker/#privacy ***/
user_pref("dom.caches.enabled", false);




// 4605: [2515] disable site specific zoom
   // Zoom levels affect screen res and are highly fingerprintable. This does not stop you using
   // zoom, it will just not use/remember any site specific settings. Zoom levels on new tabs
   // and new windows are reset to default and only the current tab retains the current zoom
user_pref("browser.zoom.siteSpecific", true); //was false; true needed to remember site-specific zoom!

// 4611: [2509] disable touch events
   // fingerprinting attack vector - leaks screen res & actual screen coordinates
   // 0=disabled, 1=enabled, 2=autodetect
   // Optional protection depending on your device
   // [1] https://developer.mozilla.org/docs/Web/API/Touch_events
   // [2] https://trac.torproject.org/projects/tor/ticket/10286
user_pref("dom.w3c_touch_events.enabled", 0);

// 4612: [2511] disable MediaDevices change detection [FF51+]
   // [1] https://developer.mozilla.org/docs/Web/Events/devicechange
   // [2] https://developer.mozilla.org/docs/Web/API/MediaDevices/ondevicechange
user_pref("media.ondevicechange.enabled", false);

// 4614: [2516] disable PointerEvents
   // [1] https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent
user_pref("dom.w3c_pointer_events.enabled", false);

user_pref("layout.spellcheckDefault", 2); // 0=none, 1-multi-line, 2=multi-line & single-line

user_pref("browser.backspace_action", 2); // 0=previous page, 1=scroll up, 2=do nothing

user_pref("browser.tabs.closeWindowWithLastTab", false);

user_pref("browser.tabs.loadBookmarksInTabs", true); // open bookmarks in a new tab [FF57+]

user_pref("browser.urlbar.decodeURLsOnCopy", true); // see bugzilla 1320061 [FF53+] ; default: false

user_pref("general.autoScroll", false); // middle-click enabling auto-scrolling [WINDOWS] [MAC]
//^ was already false in gentoo via /var/db/repos/localrepo/www-client/firefox/files/gentoo-default-prefs.js

user_pref("ui.key.menuAccessKey", 18); // 0=disable alt key toggling the menu bar [RESTART] // default: 18
user_pref("ui.key.menuAccessKeyFocuses", true); //default: true, if false and you just press&release Alt key, Menu bar no longer appears! (no restart required!)

user_pref("reader.parse-on-load.enabled", false); // "Reader View"

/* 0201b: set a default permission for Location [FF58+]
 * 0=always ask (default), 1=allow, 2=block
 * [NOTE] Best left at default "always ask", fingerprintable via Permissions API
 * [SETTING] to add site exceptions: Page Info>Permissions>Access Your Location
 * [SETTING] to manage site exceptions: Options>Privacy & Security>Permissions>Location>Settings ***/
user_pref("permissions.default.geo", 2);

/* 0416: disable 'ignore this warning' on Safe Browsing warnings
 * If clicked, it bypasses the block for that session. This is a means for admins to enforce SB
 * [TEST] see github wiki APPENDIX A: Test Sites: Section 5
 * [1] https://bugzilla.mozilla.org/1226490 ***/
   // user_pref("browser.safebrowsing.allowOverride", false);

/* 0422: set which Tracking Protection block list to use
 * [WARNING] We don't recommend enforcing this from here, as available block lists can change
 * [SETTING] Privacy & Security>Content Blocking>All Detected Trackers>Change block list ***/
   // user_pref("urlclassifier.trackingTable", "test-track-simple,base-track-digest256"); // basic

/* 0708: disable FTP [FF60+]
 * [1] https://www.ghacks.net/2018/02/20/firefox-60-with-new-preference-to-disable-ftp/ ***/
user_pref("network.ftp.enabled", false); //default: true


/* 0850c: disable location bar dropdown
 * This value controls the total number of entries to appear in the location bar dropdown
 * [NOTE] Items (bookmarks/history/openpages) with a high "frecency"/"bonus" will always
 * be displayed (no we do not know how these are calculated or what the threshold is),
 * and this does not affect the search by search engine suggestion (see 0808)
 * [NOTE] This setting is only useful if you want to enable search engine keywords
 * (i.e. at least one of 0850a suggestion types must be true) but you want to *limit* suggestions shown ***/
   // user_pref("browser.urlbar.maxRichResults", 0);
user_pref("browser.urlbar.maxRichResults", 17); //10 by default, but I needed more, thanks to philipp on irc.mozilla.org #firefox  for telling me that this is the pref.
//down from 30 to 17 because font got a bit bigger in firefox 73 (compared to 72)

/* 0850e: disable location bar one-off searches [FF51+]
 * [1] https://www.ghacks.net/2016/08/09/firefox-one-off-searches-address-bar/ ***/
   // user_pref("browser.urlbar.oneOffSearches", false);

/* 1222: disable intermediate certificate caching (fingerprinting attack vector) [RESTART]
 * [NOTE] This affects login/cert/key dbs. The effect is all credentials are session-only.
 * Saved logins and passwords are not available. Reset the pref and restart to return them.
 * [TEST] https://fiprinca.0x90.eu/poc/
 * [1] https://bugzilla.mozilla.org/1334485 - related bug
 * [2] https://bugzilla.mozilla.org/1216882 - related bug (see comment 9) ***/
   // user_pref("security.nocertdb", true); // [HIDDEN PREF]
user_pref("security.nocertdb", false); // [HIDDEN PREF]

/* 1402: set more legible default fonts
 * [NOTE] Example below for Windows/Western only
 * [SETTING] General>Language and Appearance>Fonts & Colors>Advanced>Serif|Sans-serif|Monospace ***/
   // user_pref("font.name.serif.x-unicode", "Georgia");
   // user_pref("font.name.serif.x-western", "Georgia"); // default: Times New Roman
   // user_pref("font.name.sans-serif.x-unicode", "Arial");
   // user_pref("font.name.sans-serif.x-western", "Arial"); // default: Arial
   // user_pref("font.name.monospace.x-unicode", "Lucida Console");
   // user_pref("font.name.monospace.x-western", "Lucida Console"); // default: Courier New

/* 1403: disable icon fonts (glyphs) and local fallback rendering
 * [1] https://bugzilla.mozilla.org/789788
 * [2] https://trac.torproject.org/projects/tor/ticket/8455 ***/
   // user_pref("gfx.downloadable_fonts.enabled", false); // [FF41+]
   // user_pref("gfx.downloadable_fonts.fallback_delay", -1);

/* 1409: limit system font exposure to a whitelist [FF52+] [RESTART]
 * If the whitelist is empty, then whitelisting is considered disabled and all fonts are allowed.
 * [WARNING] Creating your own probably highly-unique whitelist will raise your entropy.
 * Eventually privacy.resistFingerprinting (see 4500) will cover this (and 1401 can be relaxed)
 * [1] https://bugzilla.mozilla.org/1121643 ***/
   // user_pref("font.system.whitelist", ""); // [HIDDEN PREF]

/* 2305: set a default permission for Notifications (see 2304) [FF58+]
 * 0=always ask (default), 1=allow, 2=block
 * [NOTE] Best left at default "always ask", fingerprintable via Permissions API * [SETTING] to add site exceptions: Page Info>Permissions>Receive Notifications
 * [SETTING] to manage site exceptions: Options>Privacy & Security>Permissions>Notifications>Settings ***/
   // user_pref("permissions.default.desktop-notification", 2); //default: 0
user_pref("permissions.default.desktop-notification", 0); //default: 0

/* 2421: disable Ion and baseline JIT to help harden JS against exploits
 * [SETUP-PERF] If false, causes the odd site issue and there is also a performance loss
 * [1] https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2015-0817 ***/
   // user_pref("javascript.options.ion", false);
   // user_pref("javascript.options.baselinejit", false);
user_pref("javascript.options.ion", true); //doneFIXME: set to true if too slow!
user_pref("javascript.options.baselinejit", true); //doneFIXME: same // protonmail login itself is slow with this false! the ion being false doesn't seem to affect it much though! keeping both to true for now!
//XXX: try running https://browserbench.org/ARES-6/ when these (and their wasm equivalents are false! it takes ages!)

/* 2517: disable Media Capabilities API [FF63+]
 * [SETUP-PERF] This *may* affect media performance if disabled, no one is sure
 * [1] https://github.com/WICG/media-capabilities
 * [2] https://wicg.github.io/media-capabilities/#security-privacy-considerations ***/
   // user_pref("media.media-capabilities.enabled", false);
user_pref("media.media-capabilities.enabled", false); //FIXME: set to true if too slow! (when this was true/unset I was still experiencing hiccups esp. when compiling in the background, even more so if 2 vids were playing at 2x speed even with cpuvary 0.0.24)

/* 2706: enable support for same-site cookies [FF60+]
 * [1] https://bugzilla.mozilla.org/795346
 * [2] https://blog.mozilla.org/security/2018/04/24/same-site-cookies-in-firefox-60/
 * [3] https://www.sjoerdlangkemper.nl/2016/04/14/preventing-csrf-with-samesite-cookie-attribute/ ***/
   // user_pref("network.cookie.same-site.enabled", true); // [DEFAULT: true]

/* 4502: set new window sizes to round to hundreds [FF55+] [SETUP-CHROME]
 * Width will round down to multiples of 200s and height to 100s, to fit your screen.
 * The override values are a starting point to round from if you want some control
 * [1] https://bugzilla.mozilla.org/1330882
 * [2] https://hardware.metrics.mozilla.com/ ***/
   // user_pref("privacy.window.maxInnerWidth", 1600); // [HIDDEN PREF]
   // user_pref("privacy.window.maxInnerHeight", 900); // [HIDDEN PREF]
//XXX: default window size on startup, on i87k is 1000x1000 as per privacy_window_maxInnerWidth from modules/libpref/init/StaticPrefList.h and privacy_window_maxInnerHeight  ; now setting as 1600x1000 +treestyletab addon(aka TST) I get 1000x1000 via https://www.whatismybrowser.com/detect/how-big-is-my-web-browser    PS: nsContentUtils::CalcRoundedWindowSizeForResistingFingerprinting in dom/base/nsContentUtils.cpp is using these as eg. StaticPrefs::privacy_window_maxInnerWidth()
//user_pref("privacy.window.maxInnerWidth", 1600); // [HIDDEN PREF]
user_pref("privacy.window.maxInnerWidth", 2000); // [HIDDEN PREF]  1840(has to be rounded up to a multiple of 200 so 2000) due to treestyletab(resized) so that inner window is 1300x1000 now; unfortunately due to round-up it has some 80x2 pixels l/r margins! ok, you know what? disabling all this joke because Ctrl+F aka find bar will shrink it to the prev. letterbox! and it's not supposed to, but that's the last staw for me! so letterboxing disabled since 01June2019
//user_pref("privacy.window.maxInnerHeight", 1000); // [HIDDEN PREF]
user_pref("privacy.window.maxInnerHeight", 1100); // [HIDDEN PREF] // 1039 would be enough for Ctrl+F aka findbar to not shrink to the prev. letterboxing! 26May2019 2am  It doesn't work! because when first opened the inner window is 1066x1000(with tst side bar opened) and with letterboxing true is 1000x1000 and ctrl+F makes it shrink to 1000x600 (real: 1066x961) even if this value(privacy.window.maxInnerHeight) is 1045 or 1070; also if I just add one space to user_pref("privacy.resistFingerprinting.letterboxing.dimensions", "400x200, 500x300, 800x500, 1000x572, 1000x600, 1200x600, 1300x600, 1360x660, 1366x645, 1366x660, 1000x1000, 1300x1000"); 's value just so it shows modified, then it shrinks only to 1000x900 !!! I mean, what?! FIXME: what a joke!
// ^ now, while 1045 or 1070 doesn't work, 1100 does! probably because of that %200 for width and %100 for height, limitation!

//Another option that is on by default in non-release builds is the preference javascript.options.asyncstack, which provides better debugging information to developers. Set it to false to match a release build. (This may be disabled for many situations in the future. See bug 1280819.
user_pref("javascript.options.asyncstack", false); //default: true (for me, at least)

//setable from menus
user_pref("privacy.trackingprotection.cryptomining.enabled", true);
user_pref("privacy.trackingprotection.fingerprinting.enabled", true);
user_pref("privacy.history.custom", true);

//warn me(dialog) when I accidentally press C-q for example, instead of instantly quit!
user_pref("browser.sessionstore.warnOnQuit", true); //default false

user_pref("browser.download.dir", "/home/user/Downloads"); // default value: ""
user_pref("browser.download.lastDir", "/home/user/Downloads");
user_pref("browser.open.lastDir", "/home/user/Downloads");

user_pref("view_source.wrap_long_lines", true); //default: false

//XXX: can't find about:config prefs for this: about:preferences->General->Startup->[v] Restore previous session

//XXX this should probably be false?
user_pref("browser.startup.firstrunSkipsHomepage", "true"); //default: true

// Shows a warning "A web page is slowing down your browser. What would you like to do? [Stop It] [Wait]" (XXX this causes a screen(viewport?) resize! so it's likely javascript detectable!)
// to test the warning press Start on this: https://browserbench.org/ARES-6/
// partial doc: https://support.mozilla.org/en-US/kb/warning-unresponsive-script?cache=no
/* XXX: changing the value of these(two, at least) require a restart AND a shift+reload on the ARES-6 page else it gives a wicked error:  ReferenceError: AirBenchmark is not defined line 170 > scriptElement:32:17
    <anonymous> https://browserbench.org/ARES-6/ line 170 > scriptElement:32
    _iterate https://browserbench.org/ARES-6/driver.js:170  
The error also happens if you set the "[]Don't ask me again" and then you restarted
  */
user_pref("dom.ipc.processHangMonitor", true); //default: true //needs restart to have any effect!
user_pref("dom.ipc.reportProcessHangs", true); //default: true //needs restart to have any effect!
//XXX ^ if those two are false, you get a dialog box instead! which means no viewport resize! however the script is paused while the dialog is opened!!!! dialog has [Stop script] and [Continue] buttons and a '[]Don't ask me again' toggle!(no pref is changed when toggled because the rememberance is for this session only, eg. lost on browser restart)
//XXX if dom.ipc.processHangMonitor=true and dom.ipc.reportProcessHangs=false then there is no warning or dialog! this is what you want if you just don't want to see any warning/dialog! when both false you see the dialog which while shown pauses the running script!
user_pref("dom.max_script_run_time", 10); //default: 10  (seconds?)

user_pref("browser.aboutConfig.showWarning", false); //default: true

user_pref("browser.contentblocking.category", "custom");
//user_pref("browser.contentblocking.introCount", 20);//TODO: what is this?
user_pref("browser.preferences.defaultPerformanceSettings.enabled", false);
user_pref("device.sensors.motion.enabled", false);
user_pref("devtools.aboutdebugging.collapsibilities.processes", false); //TODO: what is this?
user_pref("devtools.browserconsole.filter.css", true);
user_pref("devtools.browserconsole.filter.net", true);
user_pref("devtools.browserconsole.filter.netxhr", true);
user_pref("devtools.cache.disabled", true);
user_pref("devtools.debugger.ignore-caught-exceptions", false);
user_pref("devtools.onboarding.telemetry.logged", true);
user_pref("devtools.toolbox.selectedTool", "webconsole");
user_pref("devtools.debugger.start-panel-size", 190);
user_pref("devtools.toolbox.footer.height", 371);
user_pref("devtools.toolsidebar-height.inspector", 350);
user_pref("devtools.toolsidebar-width.inspector", 750);
user_pref("devtools.toolsidebar-width.inspector.splitsidebar", 350);
user_pref("devtools.webconsole.filter.css", true);
user_pref("devtools.webconsole.filter.net", true);
user_pref("devtools.webconsole.filter.netxhr", true);
user_pref("devtools.webconsole.timestampMessages", true);
user_pref("devtools.webextensions.https-everywhere@eff.org.enabled", false); //default: true
//user_pref("distribution.archlinux.bookmarksProcessed", true); //TODO: what is this?
//user_pref("extensions.systemAddonSet", "{\"addons\":{},\"schema\":1}");//TODO: what is this?
user_pref("extensions.ui.dictionary.hidden", true);
user_pref("extensions.ui.lastCategory", "addons://list/extension");
user_pref("extensions.ui.locale.hidden", true);

// webcompat info: https://www.ghacks.net/2016/10/24/the-purpose-of-the-web-compat-system-add-on-for-firefox/
// info on the following two prefs: https://github.com/ghacksuserjs/ghacks-user.js/issues/426#issuecomment-396051440
user_pref("extensions.webcompat.perform_injections", false); //TODO: what is this? pref was created, didn't exist, and was set to true
user_pref("extensions.webcompat.perform_ua_overrides", false);//TODO: what is this? pref was created, didn't exist, and was set to true

//XXX note: pref extensions.webextensions.uuids maps extensions to uuids !

user_pref("findbar.highlightAll", true); //default: false  TODO: what does this do?
user_pref("pref.general.disable_button.default_browser", false);

// this is likely true only one Windows, to use system root certs instead of firefox's.
user_pref("security.enterprise_roots.enabled", false); //default: false

user_pref("device.storage.enabled", false); //default: false

// disable smooth scrolling, ie. about:preferences#general Browsing -> [] 'Use smooth scrolling'
user_pref("general.smoothScroll", false); //default: true

// https://wiki.mozilla.org/WebExtensions/TabHiding
user_pref("extensions.webextensions.tabhide.enabled", false); // default: true

user_pref("media.videocontrols.picture-in-picture.video-toggle.enabled", false); //default: not set, ergo error: JavaScript error: resource://gre/actors/PictureInPictureChild.jsm, line 44: NS_ERROR_UNEXPECTED: Component returned failure code: 0x8000ffff (NS_ERROR_UNEXPECTED) [nsIPrefBranch.getBoolPref]

user_pref("devtools.aboutdebugging.showHiddenAddons", true); // https://bugzilla.mozilla.org/show_bug.cgi?id=1544372#c10

user_pref("browser.newtabpage.activity-stream.migrationExpired", true); //this pref seems gone now //true = to not show "Try Firefox with the bookmarks, history and passwords from another browser. No Thanks"

user_pref("browser.urlbar.ctrlCanonizesURLs", false); //was true, but this causes: https://bugzilla.mozilla.org/show_bug.cgi?id=1597184 aka Pasting single WORDs in new tab(s) and pressing Enter fast enough causes visit to www.WORD.com instead of search engine for WORD, if not pressed Enter fast enough

user_pref("browser.urlbar.hideGoButton",        false); //mod // from /var/db/repos/localrepo/www-client/firefox/files/gentoo-default-prefs.js

user_pref("browser.EULA.override",              true); // from /var/db/repos/localrepo/www-client/firefox/files/gentoo-default-prefs.js

user_pref("fission.autostart",              true); // https://www.grc.com/sn/sn-820.txt

user_pref("browser.translations.enable", false); // default: true, this is Bergamot Translator (for human languages)
//when true it's spamming this often due to wasm being disabled:
//console.error: (new ReferenceError("WebAssembly is not defined", "resource://gre/actors/TranslationsParent.sys.mjs", 2620))

user_pref("widget.non-native-theme.scrollbar.size.override", 50); // was 0, too tiny and useless.
user_pref("widget.gtk.overlay-scrollbars.enabled", false); //false means "Always show scrollbars", true means hide it but when mouse moves it shows it briefly as an overlay which goes over text if too big even when collapsed (at size 50 above)

//XXX: keep this last: inspired from https://github.com/ghacksuserjs/ghacks-user.js/blame/6ee25c2bf55dd86f4bdcb179496ea7203049a85a/user.js#L2111-L2112
user_pref("_user.js", "Successfully finalized! rev.1");
