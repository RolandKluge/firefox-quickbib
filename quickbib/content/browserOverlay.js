/**
 * QuickBib namespace.
 */
if ("undefined" == typeof(QuickBib)) {
  var QuickBib = {};
};

function isSpringerURL(url)
{
    return url.search("link.springer.com/chapter") >= 0;
}

function isACMLink(url)
{
    return url.search("dl.acm.org/citation.cfm") >= 0;
}


    
QuickBib.BrowserOverlay = {
  sayHello : function(aEvent) {
    let currentURL = window.content.location.href;
    if (isSpringerURL(currentURL)) {
        let citationURL = currentURL.replace("/chapter", "/export-citation/chapter").replace("%2F", "/") + ".bib";
        var tBrowser = top.document.getElementById("content");
        var tab = tBrowser.addTab(citationURL);
        // use this line to focus the new tab, otherwise it will open in background
        tBrowser.selectedTab = tab;
    }
    else if (isACMLink(currentURL))
    {
        // https://dl.acm.org/citation.cfm?id=2629695
        // https://dl.acm.org/downformats.cfm?id=2629695&expformat=bibtex&parent_id=1
        var result = /^.*citation.cfm.id=(\d+).*$/.exec(currentURL);
        var id = result[1];
        var citationURL = "https://dl.acm.org/downformats.cfm?id=" + id + "&expformat=bibtex&parent_id=1";
        var tBrowser = top.document.getElementById("content");
        var tab = tBrowser.addTab(citationURL);
        // use this line to focus the new tab, otherwise it will open in background
        tBrowser.selectedTab = tab;       
    }
    else 
    {
        window.alert("Cannot handle URL: " + currentURL);   
    }
  }
};
