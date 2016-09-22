# WidgetHashPage
根据 hash 跳转页面，可动态加载 CSS、HTML、JS。  
According to hash a jump page that dynamically load CSS, HTML, JS.  
  
支持电脑浏览器和手机浏览器。  
Supported desktop browsers and mobile browsers.  
  
## 简单 / So easy!
只需要引入 hash-page.min.js、hash-page.min.css 并对 html 结构做一些调整即可。  
Just need to make some adjustments to the hash-page.min.js, hash-page.min.css and the HTML structure is introduced.  
  
## HTML
```html
<div id="mainPage" class="whp default-whp none-whp">
    PAGE 1
    <div id="mainPageGo2" class="button">Go to PAGE 2</div>
    <div id="mainPageGo3" class="button">Go to PAGE 3</div>
    <div id="mainPageGoAjax" class="button">Go to AJAX PAGE</div>
</div>
<div id="page2Page" class="whp none-whp">
    PAGE 2
    <div class="button backBtn">Press back button or touch me to back.</div>
</div>
<div id="page3Page" class="whp none-whp">
    PAGE 3
    <div class="button backBtn">Press back button or touch me to back.</div>
    <div id="page3PageGo4" class="button">Go to PAGE 4</div>
</div>
<div id="page4Page" class="whp none-whp">
    PAGE 4
    <div class="button backBtn">Press back button or touch me to back.</div>
</div>
<div id="ajaxPage" class="whp none-whp" whp-url="ajax.html" whp-script="ajaxScript.js,ajaxScript2.js" whp-css="ajaxCss.css">
    Loading...
</div>
```
  
所有的页面均需要添加 `whp` 和 `none-whp` 的 class，并指定一个默认页面加 `default-whp` ，默认页面的作用是当页面没有 hash 或 hash 为空时显示的页面。  
All pages need to add both `whp` and `none-whp` class and specifies a default page `default-whp`, the default page when the page is not hash or hash is empty the display page.  
  
也可以通过添加 whp-url 属性动态载入 HTML 内容（不支持半角逗号加载多个），通过 whp-script 动态载入 JS 文件（同样地址的 JS 文件只会载入饼执行一次，有效防止重复载入重复执行的情况以及某几个子页面使用同一个类库的情况），可以通过添加半角逗号的形式来载入多个 JS 文件。  
Also can through added whp-URL property dynamic contains into HTML content (not support half angle comma loaded multiple), through whp-script dynamic contains into JS file (also address of JS file only will contains into cake implementation once, effective prevent repeat contains into repeat implementation of situation and a several child page using with a a class library of situation), can through added half angle comma of form to contains into multiple JS file.  

通过指定 whp-css 来动态加载 css 文件，同样相同的 css 只会加载一次，可以用半角逗号分隔加载多个。  
Dynamically load CSS files by specifying the whp-CSS, likewise the same CSS is loaded only once, you can use the half-width comma load multiple.  

whp-url、whp-script、whp-css 可以同时或分别出现，无要求。css 是加载完毕即应用于界面，script 会优于 html 先加载，因此要绑定 html 上面的事件的话，需要在 script 里编写 page 的 load 事件，参见下面事件一章。 
Whp-URL, whp-script, whp-CSS can be simultaneous or separate appearance without requirements. CSS is loaded that is applied to the interface, script is better than HTML to load, so to bind HTML event above, need to write script in the page's load event, see the following chapter.  

## 事件 / Event
### load
当页面被初次动态加载的时候会被执行的事件。  
When the page is first loaded dynamically when events will be executed.  
  
```typescript
WidgetHashPage.load("#ajaxPage", function(): void {
    alert("ajaxPage loaded.");
    // to do
});
```
  
### open
当页面每次被打开的时候会被执行的事件（无论是否是动态加载的页面），若是动态加载的页面会先执行 load 事件再执行 open 事件。  
When an event each time the page is opened when it will be executed (regardless of whether it is dynamically loaded pages), if the dynamic loading of the page would perform load event and then perform open event.  
  
```typescript
WidgetHashPage.open("#mainPage", function(): void {
    alert("mainPage opened.");
    // to do
});
```
  
## 兼容 / Compatibility
兼容现代浏览器，依赖 jQuery 3.1.0。  
Compatible with all modern browsers, jQuery dependent 3.1.0.  
  
## 关于 / About
本组件由韩国帅开发开源，欢迎各位PR。  
Powered by Han Guo Shuai, welcome to pull request.  
https://hanguoshuai.com  
  
Translation is provided by Microsoft.  