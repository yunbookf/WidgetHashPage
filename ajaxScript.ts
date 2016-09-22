alert("ajaxScript.js has been loaded.");

WidgetHashPage.load("#ajaxPage", function(): void {
    alert("ajaxPage loaded.");
    let btn: JQuery = $(`<div class="button backBtn">Press back button or touch me to back.</div>`);
    $(this).append(btn);
    ModuleTouch.tap(btn, function(e): boolean {
        window.history.go(-1);
        e.preventDefault();
        return false;
    });
});

