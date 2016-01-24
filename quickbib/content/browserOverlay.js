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
        /*
         * Example:
         * orig: http://link.springer.com/chapter/10.1007%2F978-3-319-09195-2_1
         * cite: http://link.springer.com/export-citation/chapter/10.1007/978-3-319-09195-2_1.bib
         */
        let citationURL = currentURL.replace("/chapter", "/export-citation/chapter").replace("%2F", "/") + ".bib";
        let tBrowser = top.document.getElementById("content");
        let tab = tBrowser.addTab(citationURL);
        // use this line to focus the new tab, otherwise it will open in background
        tBrowser.selectedTab = tab;
    }
    else if (isACMLink(currentURL))
    {
        /*
         * Example:
         * orig: https://dl.acm.org/citation.cfm?id=2629695
         * cite: https://dl.acm.org/downformats.cfm?id=2629695&expformat=bibtex&parent_id=2700084
         * (parent_id is ID of 'table of contents' site)
         */
        let result = /^.*citation.cfm.id=(\d+).*$/.exec(currentURL);
        let id = result[1];
        let tBrowser = top.document.getElementById("content");
        let headSource = tBrowser.contentDocument.head.innerHTML;
        //let parentRegexp = new Regexp('^.*citation.cfm.id=(\d+).' + id + '.*$');
        //let parentResult = parentRegexp.exec(headSource);
        let parentId = id; // TODO@rkluge: Under construction
        let citationURL = "https://dl.acm.org/downformats.cfm?id=" + id + "&expformat=bibtex&parent_id=" + parentId;
        let tab = tBrowser.addTab(citationURL);
        // use this line to focus the new tab, otherwise it will open in background
        tBrowser.selectedTab = tab;       
    }
    else 
    {
        window.alert("Cannot handle URL: " + currentURL);   
    }
  }
};
