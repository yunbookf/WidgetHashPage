alert("ajaxScript.js has been loaded.");
WidgetHashPage.load("#ajaxPage", function () {
    alert("ajaxPage loaded.");
    var btn = $("<div class=\"button backBtn\">Press back button or touch me to back.</div>");
    $(this).append(btn);
    ModuleTouch.tap(btn, function (e) {
        window.history.go(-1);
        e.preventDefault();
        return false;
    });
});
//# sourceMappingURL=ajaxScript.js.map