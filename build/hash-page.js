var WidgetHashPage = (function () {
    function WidgetHashPage() {
    }
    WidgetHashPage.load = function (page, fun) {
        $(page).data("onLoad.whp", fun);
    };
    WidgetHashPage.open = function (page, fun) {
        $(page).data("onOpen.whp", fun);
    };
    WidgetHashPage._loadScripts = function (s, fun, i) {
        if (i === void 0) { i = 0; }
        if (s[i]) {
            if ($.inArray(s[i], this._scripts) === -1) {
                this._scripts.push(s[i]);
                $.ajax({ dataType: "script", cache: true, url: s[i], success: function () {
                        WidgetHashPage._loadScripts(s, fun, ++i);
                    }, error: function () {
                        alert("WidgetHashPage Error: Script not found.");
                    } });
            }
            else {
                WidgetHashPage._loadScripts(s, fun, ++i);
            }
        }
        else
            fun();
    };
    WidgetHashPage._loadHtml = function (pageNode) {
        if (pageNode.attr("whp-url") !== undefined) {
            $.ajax({ url: pageNode.attr("whp-url"), success: function (h) {
                    pageNode.html(h);
                    if (pageNode.data("onLoad.whp") !== undefined)
                        pageNode.data("onLoad.whp").call(pageNode[0], pageNode[0]);
                    if (pageNode.data("onOpen.whp") !== undefined)
                        pageNode.data("onOpen.whp").call(pageNode[0], pageNode[0]);
                } });
            pageNode.removeAttr("whp-url");
        }
        else {
            if (pageNode.data("onOpen.whp") !== undefined)
                pageNode.data("onOpen.whp").call(pageNode[0], pageNode[0]);
        }
    };
    WidgetHashPage.verison = "0.1";
    WidgetHashPage._csss = [];
    WidgetHashPage._scripts = [];
    return WidgetHashPage;
}());
$(document).ready(function () {
    $(window).on("hashchange.whp", function () {
        var hash = window.location.hash.substring(1);
        var pageNode;
        if (hash !== "") {
            pageNode = $("#" + hash);
        }
        else {
            pageNode = $(".default-whp");
        }
        if (pageNode.length > 0) {
            if (!pageNode.hasClass("active-whp")) {
                $(".active-whp").removeClass("active-whp").addClass("none-whp");
                pageNode.addClass("active-whp").removeClass("none-whp");
                if (pageNode.attr("whp-css") !== undefined) {
                    var csss = pageNode.attr("whp-css").split(",");
                    for (var _i = 0, csss_1 = csss; _i < csss_1.length; _i++) {
                        var css = csss_1[_i];
                        if ($.inArray(css, WidgetHashPage._csss) === -1) {
                            WidgetHashPage._csss.push(css);
                            $("head").append("<link rel=\"stylesheet\" href=\"" + css + "\">");
                        }
                    }
                    pageNode.removeAttr("whp-css");
                }
                if (pageNode.attr("whp-script") !== undefined) {
                    WidgetHashPage._loadScripts(pageNode.attr("whp-script").split(","), function () {
                        WidgetHashPage._loadHtml(pageNode);
                    });
                    pageNode.removeAttr("whp-script");
                }
                else {
                    WidgetHashPage._loadHtml(pageNode);
                }
            }
        }
        else {
        }
    });
    $(window).trigger("hashchange.whp");
});
//# sourceMappingURL=hash-page.js.map