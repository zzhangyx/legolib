/*!
 * @project : lego-antiHijack
 * @version : 0.1.1
 * @author  : UED.David
 * @update  : 2017-12-02 7:49:14 pm
 */!function(e){function t(r){if(n[r])return n[r].exports;var i=n[r]={exports:{},id:r,loaded:!1};return e[r].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var n={};return t.m=e,t.c=n,t.p="./js/",t(0)}([function(e,t,n){function r(e){return e&&e.__esModule?e:{"default":e}}var i=n(1),o=r(i);new o["default"]({whiteList:["yy.com"],blackList:["51.la","61.160.200.252"]})},function(e,t,n){function r(e){return e&&e.__esModule?e:{"default":e}}var i=n(2),o=r(i),u=n(3),a=r(u),c=n(22),s=n(23),l=n(24),f=n(25),p=c.getIEVersion(),h=null;e.exports=function(){function e(t){(0,o["default"])(this,e),(p===-1||p>8)&&this.init(t)}return(0,a["default"])(e,[{key:"init",value:function t(){var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];this.defaults={whiteList:l,blackList:f},this.ready(),this.lockCall(),this.lockApply(),this.setSecurityList(e),this.rawDocumentWrite(),this.rawOpener(),this.rawSetAttribute(window),this.checkIframeHijack(),this.mutation(),s.init(e)}},{key:"ready",value:function n(){this.whiteList=[],this.blackList=[],h=this}},{key:"render",value:function r(){}},{key:"beforeDestroy",value:function i(){}},{key:"destroyed",value:function u(){}},{key:"setSecurityList",value:function d(e){this.whiteList=e.whiteList&&c.isArray(e.whiteList)?c.mergeArray(this.defaults.whiteList,e.whiteList):this.defaults.whiteList,this.blackList=e.blackList&&c.isArray(e.blackList)?c.mergeArray(this.defaults.blackList,e.blackList):this.defaults.blackList}},{key:"rawDocumentWrite",value:function v(){var e=this,t=arguments,n=document.write,r=document.writeln,i=function o(n,r){var i=e.getTestType(n);switch(i){case"xss":s.pushQueue("document write","",n,"xss");break;case"blackList":s.pushQueue("document write","",n,"黑名单");break;default:r.apply(document,t)}};document.write=function(e){i(e,n)},document.writeln=function(e){i(e,r)}}},{key:"rawOpener",value:function y(){var e=this,t=arguments,n=window.open;window.open=function(r){var i=e.getTestType(r);return"whiteList"!==i?void s.pushQueue("window.open",r,""):void n.apply(window,t)}}},{key:"rawSetAttribute",value:function w(){var e=arguments.length<=0||void 0===arguments[0]?window:arguments[0],t=this,n=e.Element.prototype.setAttribute;e.Element.prototype.setAttribute=function(e,r){if("SCRIPT"===this.tagName&&/^src$/i.test(e)){var i=t.getTestType(r);if("whiteList"!==i)return void s.pushQueue(this.tagName,r,"","setAttribute")}n.apply(this,arguments)}}},{key:"xssTest",value:function g(e){var t=["xss","eHNz","&#120;&#115;&#115;","&#x78;&#x73;&#x73;","\\u0078\\u0073\\u0073","\\x78\\x73\\x73","\\170\\163\\163","data:text/html","alert\\(\\s*\\d+\\)","alert\\(test\\)","hacked","location.href","self.location","top.location","String.fromCharCode","document.cookie","(\\[\\].*){3,}"],n=new RegExp(this.getReg(t),"i");return!!n.test(e)}},{key:"getReg",value:function m(e){return"("+e.join("|")+")"}},{key:"getTestType",value:function k(e){var t=e.match(/(http:\/\/|https:\/\/)?([^\/]*)/)[2];return this.testList(this.blackList,t)?"blackList":this.testList(this.whiteList,t)?"whiteList":!!this.xssTest(e)&&"xss"}},{key:"testList",value:function b(e,t){var n=this.getReg(e);if(n){var r=new RegExp(n,"i");if(r.test(t))return!0}return!1}},{key:"removeRiskNode",value:function x(e){e.parentNode.removeChild(e)}},{key:"checkDOMHijack",value:function L(e){for(var t=null,n=e.addedNodes,r=n.length,i=0;i<r;i++){var o=n[i];switch(o.tagName){case"SCRIPT":if(o.src){var u=this.getTestType(o.src);"whiteList"!==u&&(s.pushQueue(o.tagName,o.src,""),this.removeRiskNode(o))}break;case"IFRAME":if(this.rawSetAttribute(o.contentWindow),o.srcdoc)s.pushQueue(o.tagName,o.src,o.srcdoc),this.removeRiskNode(o);else if(o.src){var a=this.getTestType(o.src);"whiteList"!==a&&(s.pushQueue(o.tagName,o.src,""),this.removeRiskNode(o))}break;case"IMG":if(o.src){var c=this.getTestType(o.src);"blackList"===c&&(s.pushQueue(o.tagName,o.src,""),this.removeRiskNode(o))}(o.onload&&this.xssTest(o.onload)||o.onerror&&this.xssTest(o.onerror))&&(s.pushQueue("IMG xss",o.src,o.onload||o.onerror),this.removeRiskNode(o));break;case"A":o.setAttribute("rel","noopener")}}}},{key:"checkIframeHijack",value:function A(){var e="iframe_hijack_redirected";if(c.getUrlParam(e))s.pushQueue("iframe重定向",location.href,"");else if(self!=top){var t=location.href.split("#");location.search?t[0]+="&"+e+"=1":t[0]+="?"+e+"=1";try{top.location=t.join("#")}catch(n){}}}},{key:"watchDOMChange",value:function j(e,t){var n=h;e.forEach(function(e){n.checkDOMHijack(e)})}},{key:"mutation",value:function R(){var e=window.MutationObserver||window.WebKitMutationObserver||window.MozMutationObserver;if(e){var t=new e(this.watchDOMChange),n={childList:!0,subtree:!0};t.observe(document,n)}}},{key:"lockCall",value:function T(){try{Object.defineProperty(Function.prototype,"call",{value:Function.prototype.call,writable:!1,configurable:!1,enumerable:!0})}catch(e){console.log(e)}}},{key:"lockApply",value:function E(){try{Object.defineProperty(Function.prototype,"apply",{value:Function.prototype.apply,writable:!1,configurable:!1,enumerable:!0})}catch(e){console.log(e)}}}]),e}()},function(e,t){"use strict";t.__esModule=!0,t["default"]=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}t.__esModule=!0;var i=n(4),o=r(i);t["default"]=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),(0,o["default"])(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}()},function(e,t,n){e.exports={"default":n(5),__esModule:!0}},function(e,t,n){n(6);var r=n(9).Object;e.exports=function i(e,t,n){return r.defineProperty(e,t,n)}},function(e,t,n){var r=n(7);r(r.S+r.F*!n(17),"Object",{defineProperty:n(13).f})},function(e,t,n){var r=n(8),i=n(9),o=n(10),u=n(12),a="prototype",c=function(e,t,n){var s=e&c.F,l=e&c.G,f=e&c.S,p=e&c.P,h=e&c.B,d=e&c.W,v=l?i:i[t]||(i[t]={}),y=v[a],w=l?r:f?r[t]:(r[t]||{})[a],g,m,k;l&&(n=t);for(g in n)m=!s&&w&&void 0!==w[g],m&&g in v||(k=m?w[g]:n[g],v[g]=l&&"function"!=typeof w[g]?n[g]:h&&m?o(k,r):d&&w[g]==k?function(e){var t=function(t,n,r){if(this instanceof e){switch(arguments.length){case 0:return new e;case 1:return new e(t);case 2:return new e(t,n)}return new e(t,n,r)}return e.apply(this,arguments)};return t[a]=e[a],t}(k):p&&"function"==typeof k?o(Function.call,k):k,p&&((v.virtual||(v.virtual={}))[g]=k,e&c.R&&y&&!y[g]&&u(y,g,k)))};c.F=1,c.G=2,c.S=4,c.P=8,c.B=16,c.W=32,c.U=64,c.R=128,e.exports=c},function(e,t){var n=e.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},function(e,t){var n=e.exports={version:"2.4.0"};"number"==typeof __e&&(__e=n)},function(e,t,n){var r=n(11);e.exports=function(e,t,n){if(r(e),void 0===t)return e;switch(n){case 1:return function(n){return e.call(t,n)};case 2:return function(n,r){return e.call(t,n,r)};case 3:return function(n,r,i){return e.call(t,n,r,i)}}return function(){return e.apply(t,arguments)}}},function(e,t){e.exports=function(e){if("function"!=typeof e)throw TypeError(e+" is not a function!");return e}},function(e,t,n){var r=n(13),i=n(21);e.exports=n(17)?function(e,t,n){return r.f(e,t,i(1,n))}:function(e,t,n){return e[t]=n,e}},function(e,t,n){var r=n(14),i=n(16),o=n(20),u=Object.defineProperty;t.f=n(17)?Object.defineProperty:function a(e,t,n){if(r(e),t=o(t,!0),r(n),i)try{return u(e,t,n)}catch(a){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(e[t]=n.value),e}},function(e,t,n){var r=n(15);e.exports=function(e){if(!r(e))throw TypeError(e+" is not an object!");return e}},function(e,t){e.exports=function(e){return"object"==typeof e?null!==e:"function"==typeof e}},function(e,t,n){e.exports=!n(17)&&!n(18)(function(){return 7!=Object.defineProperty(n(19)("div"),"a",{get:function(){return 7}}).a})},function(e,t,n){e.exports=!n(18)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(e,t){e.exports=function(e){try{return!!e()}catch(t){return!0}}},function(e,t,n){var r=n(15),i=n(8).document,o=r(i)&&r(i.createElement);e.exports=function(e){return o?i.createElement(e):{}}},function(e,t,n){var r=n(15);e.exports=function(e,t){if(!r(e))return e;var n,i;if(t&&"function"==typeof(n=e.toString)&&!r(i=n.call(e)))return i;if("function"==typeof(n=e.valueOf)&&!r(i=n.call(e)))return i;if(!t&&"function"==typeof(n=e.toString)&&!r(i=n.call(e)))return i;throw TypeError("Can't convert object to primitive value")}},function(e,t){e.exports=function(e,t){return{enumerable:!(1&e),configurable:!(2&e),writable:!(4&e),value:t}}},function(e,t){e.exports={getUrlParam:function n(e,t){var n=new RegExp("[\\?&#]"+e+"=([^&#]+)","gi"),r=encodeURIComponent(t||location.href).match(n),i=void 0;return r&&r.length>0?(i=r[r.length-1].split("="),i&&i.length>1?i[1]:""):""},mergeArray:function r(e,t){for(var n=0;n<e.length;n++)for(var r=0;r<t.length;r++)e[n]===t[r]&&e.splice(n,1);for(var n=0;n<t.length;n++)e.push(t[n]);return e},isArray:function i(e){return Array.isArray?Array.isArray(e):"[object Array]"===Object.prototype.toString.call(e)},getIEVersion:function o(){var e=-1;if("Microsoft Internet Explorer"==navigator.appName){var t=navigator.userAgent,n=new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})");null!=n.exec(t)&&(e=parseFloat(RegExp.$1))}else if("Netscape"==navigator.appName){var t=navigator.userAgent,n=new RegExp("Trident/.*rv:([0-9]{1,}[.0-9]{0,})");null!=n.exec(t)&&(e=parseFloat(RegExp.$1))}return e}}},function(e,t,n){var r=n(22);e.exports={queueArray:[],pushQueue:function i(e,t,n,r){this.queueArray?this.queueArray.push({type:e,url:t,code:n,remark:r}):this.sendHijack(e,t,n,r)},sendHijack:function o(){var e=arguments.length<=0||void 0===arguments[0]?"":arguments[0],t=arguments.length<=1||void 0===arguments[1]?"":arguments[1],n=arguments.length<=2||void 0===arguments[2]?"":arguments[2],i=arguments.length<=3||void 0===arguments[3]?"":arguments[3],o=e.toLowerCase(),u=encodeURIComponent(document.location.href),a=Math.round((new Date).getTime()/1e3),c=r.getUrlParam("uid"),s=encodeURIComponent(navigator.userAgent),l=window.screen.width+"x"+window.screen.height,f="0.1.1",p="time="+a+"&uid="+c+"&ua="+s+"&dw="+l+"&url="+u+"&version="+f+"&hijackType="+encodeURIComponent(o)+"&hijackUrl="+encodeURIComponent(t)+"&hijackCode="+encodeURIComponent(n)+"&remark="+encodeURIComponent(i),h=this.reportUrl||"//ylog.hiido.com/c.gif?act=webhttphijack";h+=h.indexOf("?")<0?"?"+p:"&"+p,(new Image).src=h},init:function u(e){var t=this;this.reportUrl=e.reportUrl,window.addEventListener("load",function(){t.queueArray.forEach(function(e,n){t.sendHijack(e.type,e.url,e.code,e.remark)}),t.queueArray=null})}}},function(e,t){e.exports=["yy.com","duowan.com","baidu.com","qq.com","weibo.com","sina.com.cn","sinaimg.cn","sinajs.cn","apple.com","google-analytics.com","cnzz.com"]},function(e,t){e.exports=["120.80.57.123","61.160.200.252"]}]);