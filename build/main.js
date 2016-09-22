$(document).ready(function (e) {
    ModuleTouch.tap("#mainPageGo2", function (e) {
        window.location.href = "#page2Page";
        e.preventDefault();
        return false;
    });
    ModuleTouch.tap("#mainPageGo3", function (e) {
        window.location.href = "#page3Page";
        e.preventDefault();
        return false;
    });
    ModuleTouch.tap(".backBtn", function (e) {
        window.history.go(-1);
        e.preventDefault();
        return false;
    });
    ModuleTouch.tap("#page3PageGo4", function (e) {
        window.location.href = "#page4Page";
        e.preventDefault();
        return false;
    });
    ModuleTouch.tap("#mainPageGoAjax", function (e) {
        window.location.href = "#ajaxPage";
        e.preventDefault();
        return false;
    });
});
//# sourceMappingURL=main.js.map