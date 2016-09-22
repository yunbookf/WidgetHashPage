/**
 * WidgetHashPage
 * Website: http://hanguoshuai.com
 */
class WidgetHashPage {

    public static verison: string = "0.1";

    // --- 绑定页面初次加载事件 ---
    public static load(page: any, fun: (node?: JQuery) => void): void {
        $(page).data("onLoad.whp", fun);
    }

    // --- 绑定页面每次进入响应的事件 ---
    public static open(page: any, fun: (node?: JQuery) => void): void {
        $(page).data("onOpen.whp", fun);
    }

    public static _csss: string[] = [];
    public static _scripts: string[] = [];
    public static _loadScripts(s: string[], fun: () => void, i: number = 0): void {
        if (s[i]) {
            if ($.inArray(s[i], this._scripts) === -1) {
                this._scripts.push(s[i]);
                $.ajax({dataType: "script", cache: true, url: s[i], success: function(): void {
                    WidgetHashPage._loadScripts(s, fun, ++i);
                }, error: function(): void {
                    alert("WidgetHashPage Error: Script not found.");
                }});
            } else {
                WidgetHashPage._loadScripts(s, fun, ++i);
            }
        } else
            fun();
    }

    public static _loadHtml(pageNode: JQuery) {
        if (pageNode.attr("whp-url") !== undefined) {
            $.ajax({url: pageNode.attr("whp-url"), success: function(h: string): void {
                pageNode.html(h);
                // --- 执行 onLoad 事件 ---
                if (pageNode.data("onLoad.whp") !== undefined)
                    pageNode.data("onLoad.whp").call(pageNode[0], pageNode[0]);
                if (pageNode.data("onOpen.whp") !== undefined)
                    pageNode.data("onOpen.whp").call(pageNode[0], pageNode[0]);
            }});
            pageNode.removeAttr("whp-url");
        } else {
            // --- 无需 ajax 加载 html 直接执行 onOpen 事件 ---
            if (pageNode.data("onOpen.whp") !== undefined)
                pageNode.data("onOpen.whp").call(pageNode[0], pageNode[0]);
        }
    }

}

$(document).ready(function(): void {
    $(window).on("hashchange.whp", function(): void {
        let hash: string = window.location.hash.substring(1);
        let pageNode: JQuery;
        if (hash !== "" ) {
            pageNode = $("#" + hash);
        } else {
            pageNode = $(".default-whp");
        }
        if (pageNode.length > 0) {
            if (!pageNode.hasClass("active-whp")) {
                $(".active-whp").removeClass("active-whp").addClass("none-whp");
                pageNode.addClass("active-whp").removeClass("none-whp");
                // --- CSS ---
                if (pageNode.attr("whp-css") !== undefined) {
                    let csss: string[] = pageNode.attr("whp-css").split(",");
                    for (let css of csss) {
                        if ($.inArray(css, WidgetHashPage._csss) === -1) {
                            WidgetHashPage._csss.push(css);
                            $("head").append(`<link rel="stylesheet" href="${css}">`);
                        }
                    }
                    pageNode.removeAttr("whp-css");
                }
                // --- 查看是否需要加载 JS ---
                if (pageNode.attr("whp-script") !== undefined) {
                    WidgetHashPage._loadScripts(pageNode.attr("whp-script").split(","), function(): void {
                        WidgetHashPage._loadHtml(pageNode);
                    });
                    pageNode.removeAttr("whp-script");
                } else {
                    WidgetHashPage._loadHtml(pageNode);
                }
            }
        } else {
            alert("WidgetHashPage Error: Page not found.");
        }
    });
    $(window).trigger("hashchange.whp");
});

