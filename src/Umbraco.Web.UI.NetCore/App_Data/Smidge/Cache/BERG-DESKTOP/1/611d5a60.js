!function(v){"use strict";var p=function(t){var e=t,n=function(){return e};return{get:n,set:function(t){e=t},clone:function(){return p(n())}}},e=tinymce.util.Tools.resolve("tinymce.PluginManager"),a=function(t){return!(!/(^|[ ,])powerpaste([, ]|$)/.test(t.settings.plugins)||!e.get("powerpaste")||("undefined"!=typeof v.window.console&&v.window.console.log&&v.window.console.log("PowerPaste is incompatible with Paste plugin! Remove 'paste' from the 'plugins' option."),0))},u=function(t,e){return{clipboard:t,quirks:e}},d=function(t,e,n,r){return t.fire("PastePreProcess",{content:e,internal:n,wordContent:r})},m=function(t,e,n,r){return t.fire("PastePostProcess",{node:e,internal:n,wordContent:r})},s=function(t,e){return t.fire("PastePlainTextToggle",{state:e})},n=function(t,e){return t.fire("paste",{ieFake:e})},g={shouldPlainTextInform:function(t){return t.getParam("paste_plaintext_inform",!0)},shouldBlockDrop:function(t){return t.getParam("paste_block_drop",!1)},shouldPasteDataImages:function(t){return t.getParam("paste_data_images",!1)},shouldFilterDrop:function(t){return t.getParam("paste_filter_drop",!0)},getPreProcess:function(t){return t.getParam("paste_preprocess")},getPostProcess:function(t){return t.getParam("paste_postprocess")},getWebkitStyles:function(t){return t.getParam("paste_webkit_styles")},shouldRemoveWebKitStyles:function(t){return t.getParam("paste_remove_styles_if_webkit",!0)},shouldMergeFormats:function(t){return t.getParam("paste_merge_formats",!0)},isSmartPasteEnabled:function(t){return t.getParam("smart_paste",!0)},isPasteAsTextEnabled:function(t){return t.getParam("paste_as_text",!1)},getRetainStyleProps:function(t){return t.getParam("paste_retain_style_properties")},getWordValidElements:function(t){return t.getParam("paste_word_valid_elements","-strong/b,-em/i,-u,-span,-p,-ol,-ul,-li,-h1,-h2,-h3,-h4,-h5,-h6,-p/div,-a[href|name],sub,sup,strike,br,del,table[width],tr,td[colspan|rowspan|width],th[colspan|rowspan|width],thead,tfoot,tbody")},shouldConvertWordFakeLists:function(t){return t.getParam("paste_convert_word_fake_lists",!0)},shouldUseDefaultFilters:function(t){return t.getParam("paste_enable_default_filters",!0)}},r=function(t,e,n){var r,o,i;"text"===e.pasteFormat.get()?(e.pasteFormat.set("html"),s(t,!1)):(e.pasteFormat.set("text"),s(t,!0),i=t,!1===n.get()&&g.shouldPlainTextInform(i)&&(o="Paste is now in plain text mode. Contents will now be pasted as plain text until you toggle this option off.",(r=t).notificationManager.open({text:r.translate(o),type:"info"}),n.set(!0))),t.focus()},c=function(t,n,e){t.addCommand("mceTogglePlainTextPaste",function(){r(t,n,e)}),t.addCommand("mceInsertClipboardContent",function(t,e){e.content&&n.pasteHtml(e.content,e.internal),e.text&&n.pasteText(e.text)})},h=tinymce.util.Tools.resolve("tinymce.Env"),y=tinymce.util.Tools.resolve("tinymce.util.Delay"),b=tinymce.util.Tools.resolve("tinymce.util.Tools"),o=tinymce.util.Tools.resolve("tinymce.util.VK"),t="x-tinymce/html",i="\x3c!-- "+t+" --\x3e",l=function(t){return i+t},f=function(t){return t.replace(i,"")},w=function(t){return-1!==t.indexOf(i)},x=function(){return t},_=tinymce.util.Tools.resolve("tinymce.html.Entities"),P=function(t){return t.replace(/\r?\n/g,"<br>")},T=function(t,e,n){var r=t.split(/\n\n/),o=function(t,e){var n,r=[],o="<"+t;if("object"==typeof e){for(n in e)e.hasOwnProperty(n)&&r.push(n+'="'+_.encodeAllRaw(e[n])+'"');r.length&&(o+=" "+r.join(" "))}return o+">"}(e,n),i="</"+e+">",a=b.map(r,function(t){return t.split(/\n/).join("<br />")});return 1===a.length?a[0]:b.map(a,function(t){return o+t+i}).join("")},D=function(t){return!/<(?:\/?(?!(?:div|p|br|span)>)\w+|(?:(?!(?:span style="white-space:\s?pre;?">)|br\s?\/>))\w+\s[^>]+)>/i.test(t)},C=function(t,e,n){return e?T(t,e,n):P(t)},k=tinymce.util.Tools.resolve("tinymce.html.DomParser"),F=tinymce.util.Tools.resolve("tinymce.html.Serializer"),E=tinymce.util.Tools.resolve("tinymce.html.Node"),R=tinymce.util.Tools.resolve("tinymce.html.Schema");function I(e,t){return b.each(t,function(t){e=t.constructor===RegExp?e.replace(t,""):e.replace(t[0],t[1])}),e}var O={filter:I,innerText:function(e){var n=R(),r=k({},n),o="",i=n.getShortEndedElements(),a=b.makeMap("script noscript style textarea video audio iframe object"," "),u=n.getBlockElements();return e=I(e,[/<!\[[^\]]+\]>/g]),function t(e){var n=e.name,r=e;if("br"!==n){if("wbr"!==n)if(i[n]&&(o+=" "),a[n])o+=" ";else{if(3===e.type&&(o+=e.value),!e.shortEnded&&(e=e.firstChild))for(;t(e),e=e.next;);u[n]&&r.next&&(o+="\n","p"===n&&(o+="\n"))}}else o+="\n"}(r.parse(e)),o},trimHtml:function(t){return t=I(t,[/^[\s\S]*<body[^>]*>\s*|\s*<\/body[^>]*>[\s\S]*$/gi,/<!--StartFragment-->|<!--EndFragment-->/g,[/( ?)<span class="Apple-converted-space">\u00a0<\/span>( ?)/g,function(t,e,n){return e||n?"\xa0":" "}],/<br class="Apple-interchange-newline">/g,/<br>$/i])},createIdGenerator:function(t){var e=0;return function(){return t+e++}},isMsEdge:function(){return-1!==v.navigator.userAgent.indexOf(" Edge/")}};function S(e){var n,t;return t=[/^[IVXLMCD]{1,2}\.[ \u00a0]/,/^[ivxlmcd]{1,2}\.[ \u00a0]/,/^[a-z]{1,2}[\.\)][ \u00a0]/,/^[A-Z]{1,2}[\.\)][ \u00a0]/,/^[0-9]+\.[ \u00a0]/,/^[\u3007\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u4e03\u516b\u4e5d]+\.[ \u00a0]/,/^[\u58f1\u5f10\u53c2\u56db\u4f0d\u516d\u4e03\u516b\u4e5d\u62fe]+\.[ \u00a0]/],e=e.replace(/^[\u00a0 ]+/,""),b.each(t,function(t){if(t.test(e))return!(n=!0)}),n}function A(t){var i,a,u=1;function n(t){var e="";if(3===t.type)return t.value;if(t=t.firstChild)for(;e+=n(t),t=t.next;);return e}function s(t,e){if(3===t.type&&e.test(t.value))return t.value=t.value.replace(e,""),!1;if(t=t.firstChild)do{if(!s(t,e))return!1}while(t=t.next);return!0}function e(e,n,r){var o=e._listLevel||u;o!==u&&(o<u?i&&(i=i.parent.parent):(a=i,i=null)),i&&i.name===n?i.append(e):(a=a||i,i=new E(n,1),1<r&&i.attr("start",""+r),e.wrap(i)),e.name="li",u<o&&a&&a.lastChild.append(i),u=o,function t(e){if(e._listIgnore)e.remove();else if(e=e.firstChild)for(;t(e),e=e.next;);}(e),s(e,/^\u00a0+/),s(e,/^\s*([\u2022\u00b7\u00a7\u25CF]|\w+\.)/),s(e,/^\u00a0+/)}for(var r=[],o=t.firstChild;null!=o;)if(r.push(o),null!==(o=o.walk()))for(;void 0!==o&&o.parent!==t;)o=o.walk();for(var c=0;c<r.length;c++)if("p"===(t=r[c]).name&&t.firstChild){var l=n(t);if(/^[\s\u00a0]*[\u2022\u00b7\u00a7\u25CF]\s*/.test(l)){e(t,"ul");continue}if(S(l)){var f=/([0-9]+)\./.exec(l),d=1;f&&(d=parseInt(f[1],10)),e(t,"ol",d);continue}if(t._listLevel){e(t,"ul",1);continue}i=null}else a=i,i=null}function j(n,r,o,i){var a,u={},t=n.dom.parseStyle(i);return b.each(t,function(t,e){switch(e){case"mso-list":(a=/\w+ \w+([0-9]+)/i.exec(i))&&(o._listLevel=parseInt(a[1],10)),/Ignore/i.test(t)&&o.firstChild&&(o._listIgnore=!0,o.firstChild._listIgnore=!0);break;case"horiz-align":e="text-align";break;case"vert-align":e="vertical-align";break;case"font-color":case"mso-foreground":e="color";break;case"mso-background":case"mso-highlight":e="background";break;case"font-weight":case"font-style":return void("normal"!==t&&(u[e]=t));case"mso-element":if(/^(comment|comment-list)$/i.test(t))return void o.remove()}0!==e.indexOf("mso-comment")?0!==e.indexOf("mso-")&&("all"===g.getRetainStyleProps(n)||r&&r[e])&&(u[e]=t):o.remove()}),/(bold)/i.test(u["font-weight"])&&(delete u["font-weight"],o.wrap(new E("b",1))),/(italic)/i.test(u["font-style"])&&(delete u["font-style"],o.wrap(new E("i",1))),(u=n.dom.serializeStyle(u,o.name))||null}var M,L,N,B,H,$,W,U,z,V={preProcess:function(t,e){return g.shouldUseDefaultFilters(t)?function(r,t){var e,o;(e=g.getRetainStyleProps(r))&&(o=b.makeMap(e.split(/[, ]/))),t=O.filter(t,[/<br class="?Apple-interchange-newline"?>/gi,/<b[^>]+id="?docs-internal-[^>]*>/gi,/<!--[\s\S]+?-->/gi,/<(!|script[^>]*>.*?<\/script(?=[>\s])|\/?(\?xml(:\w+)?|img|meta|link|style|\w:\w+)(?=[\s\/>]))[^>]*>/gi,[/<(\/?)s>/gi,"<$1strike>"],[/&nbsp;/gi,"\xa0"],[/<span\s+style\s*=\s*"\s*mso-spacerun\s*:\s*yes\s*;?\s*"\s*>([\s\u00a0]*)<\/span>/gi,function(t,e){return 0<e.length?e.replace(/./," ").slice(Math.floor(e.length/2)).split("").join("\xa0"):""}]]);var n=g.getWordValidElements(r),i=R({valid_elements:n,valid_children:"-li[p]"});b.each(i.elements,function(t){t.attributes["class"]||(t.attributes["class"]={},t.attributesOrder.push("class")),t.attributes.style||(t.attributes.style={},t.attributesOrder.push("style"))});var a=k({},i);a.addAttributeFilter("style",function(t){for(var e,n=t.length;n--;)(e=t[n]).attr("style",j(r,o,e,e.attr("style"))),"span"===e.name&&e.parent&&!e.attributes.length&&e.unwrap()}),a.addAttributeFilter("class",function(t){for(var e,n,r=t.length;r--;)n=(e=t[r]).attr("class"),/^(MsoCommentReference|MsoCommentText|msoDel)$/i.test(n)&&e.remove(),e.attr("class",null)}),a.addNodeFilter("del",function(t){for(var e=t.length;e--;)t[e].remove()}),a.addNodeFilter("a",function(t){for(var e,n,r,o=t.length;o--;)if(n=(e=t[o]).attr("href"),r=e.attr("name"),n&&-1!==n.indexOf("#_msocom_"))e.remove();else if(n&&0===n.indexOf("file://")&&(n=n.split("#")[1])&&(n="#"+n),n||r){if(r&&!/^_?(?:toc|edn|ftn)/i.test(r)){e.unwrap();continue}e.attr({href:n,name:r})}else e.unwrap()});var u=a.parse(t);return g.shouldConvertWordFakeLists(r)&&A(u),t=F({validate:r.settings.validate},i).serialize(u)}(t,e):e},isWordContent:function(t){return/<font face="Times New Roman"|class="?Mso|style="[^"]*\bmso-|style='[^'']*\bmso-|w:WordDocument/i.test(t)||/class="OutlineElement/.test(t)||/id="?docs\-internal\-guid\-/.test(t)}},K=function(t,e){return{content:t,cancelled:e}},q=function(t,e,n,r){var o,i,a,u,s,c,l=d(t,e,n,r),f=function(t,e){var n=k({},t.schema);n.addNodeFilter("meta",function(t){b.each(t,function(t){return t.remove()})});var r=n.parse(e,{forced_root_block:!1,isRootContent:!0});return F({validate:t.settings.validate},t.schema).serialize(r)}(t,l.content);return t.hasEventListeners("PastePostProcess")&&!l.isDefaultPrevented()?(i=f,a=n,u=r,s=(o=t).dom.create("div",{style:"display:none"},i),c=m(o,s,a,u),K(c.node.innerHTML,c.isDefaultPrevented())):K(f,l.isDefaultPrevented())},G=function(t,e,n){var r=V.isWordContent(e),o=r?V.preProcess(t,e):e;return q(t,o,n,r)},X=function(t,e){return t.insertContent(e,{merge:g.shouldMergeFormats(t),paste:!0}),!0},Y=function(t){return/^https?:\/\/[\w\?\-\/+=.&%@~#]+$/i.test(t)},Z=function(t){return Y(t)&&/.(gif|jpe?g|png)$/.test(t)},J=function(t,e,n){return!(!1!==t.selection.isCollapsed()||!Y(e)||(o=e,i=n,(r=t).undoManager.extra(function(){i(r,o)},function(){r.execCommand("mceInsertLink",!1,o)}),0));var r,o,i},Q=function(t,e,n){return!!Z(e)&&(o=e,i=n,(r=t).undoManager.extra(function(){i(r,o)},function(){r.insertContent('<img src="'+o+'">')}),!0);var r,o,i},tt=function(t,e){var n,r;!1===g.isSmartPasteEnabled(t)?X(t,e):(n=t,r=e,b.each([J,Q,X],function(t){return!0!==t(n,r,X)}))},et=function(){},nt=function(t){return function(){return t}},rt=nt(!1),ot=nt(!0),it=function(){return at},at=(M=function(t){return t.isNone()},B={fold:function(t,e){return t()},is:rt,isSome:rt,isNone:ot,getOr:N=function(t){return t},getOrThunk:L=function(t){return t()},getOrDie:function(t){throw new Error(t||"error: getOrDie called on none.")},getOrNull:nt(null),getOrUndefined:nt(undefined),or:N,orThunk:L,map:it,each:et,bind:it,exists:rt,forall:ot,filter:it,equals:M,equals_:M,toArray:function(){return[]},toString:nt("none()")},Object.freeze&&Object.freeze(B),B),ut=function(n){var t=nt(n),e=function(){return o},r=function(t){return t(n)},o={fold:function(t,e){return e(n)},is:function(t){return n===t},isSome:ot,isNone:rt,getOr:t,getOrThunk:t,getOrDie:t,getOrNull:t,getOrUndefined:t,or:e,orThunk:e,map:function(t){return ut(t(n))},each:function(t){t(n)},bind:r,exists:r,forall:r,filter:function(t){return t(n)?o:at},toArray:function(){return[n]},toString:function(){return"some("+n+")"},equals:function(t){return t.is(n)},equals_:function(t,e){return t.fold(rt,function(t){return e(n,t)})}};return o},st={some:ut,none:it,from:function(t){return null===t||t===undefined?at:ut(t)}},ct=(H="function",function(t){return function(t){if(null===t)return"null";var e=typeof t;return"object"===e&&(Array.prototype.isPrototypeOf(t)||t.constructor&&"Array"===t.constructor.name)?"array":"object"===e&&(String.prototype.isPrototypeOf(t)||t.constructor&&"String"===t.constructor.name)?"string":e}(t)===H}),lt=Array.prototype.slice,ft=function(t,e){for(var n=t.length,r=new Array(n),o=0;o<n;o++){var i=t[o];r[o]=e(i,o)}return r},dt=function(t,e){for(var n=0,r=t.length;n<r;n++)e(t[n],n)},mt=ct(Array.from)?Array.from:function(t){return lt.call(t)},pt={},gt={exports:pt};$=undefined,W=pt,U=gt,z=undefined,function(t){"object"==typeof W&&void 0!==U?U.exports=t():"function"==typeof $&&$.amd?$([],t):("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).EphoxContactWrapper=t()}(function(){return function i(a,u,s){function c(e,t){if(!u[e]){if(!a[e]){var n="function"==typeof z&&z;if(!t&&n)return n(e,!0);if(l)return l(e,!0);var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}var o=u[e]={exports:{}};a[e][0].call(o.exports,function(t){return c(a[e][1][t]||t)},o,o.exports,i,a,u,s)}return u[e].exports}for(var l="function"==typeof z&&z,t=0;t<s.length;t++)c(s[t]);return c}({1:[function(t,e,n){var r,o,i=e.exports={};function a(){throw new Error("setTimeout has not been defined")}function u(){throw new Error("clearTimeout has not been defined")}function s(t){if(r===setTimeout)return setTimeout(t,0);if((r===a||!r)&&setTimeout)return r=setTimeout,setTimeout(t,0);try{return r(t,0)}catch(e){try{return r.call(null,t,0)}catch(e){return r.call(this,t,0)}}}!function(){try{r="function"==typeof setTimeout?setTimeout:a}catch(t){r=a}try{o="function"==typeof clearTimeout?clearTimeout:u}catch(t){o=u}}();var c,l=[],f=!1,d=-1;function m(){f&&c&&(f=!1,c.length?l=c.concat(l):d=-1,l.length&&p())}function p(){if(!f){var t=s(m);f=!0;for(var e=l.length;e;){for(c=l,l=[];++d<e;)c&&c[d].run();d=-1,e=l.length}c=null,f=!1,function(t){if(o===clearTimeout)return clearTimeout(t);if((o===u||!o)&&clearTimeout)return o=clearTimeout,clearTimeout(t);try{o(t)}catch(e){try{return o.call(null,t)}catch(e){return o.call(this,t)}}}(t)}}function g(t,e){this.fun=t,this.array=e}function v(){}i.nextTick=function(t){var e=new Array(arguments.length-1);if(1<arguments.length)for(var n=1;n<arguments.length;n++)e[n-1]=arguments[n];l.push(new g(t,e)),1!==l.length||f||s(p)},g.prototype.run=function(){this.fun.apply(null,this.array)},i.title="browser",i.browser=!0,i.env={},i.argv=[],i.version="",i.versions={},i.on=v,i.addListener=v,i.once=v,i.off=v,i.removeListener=v,i.removeAllListeners=v,i.emit=v,i.prependListener=v,i.prependOnceListener=v,i.listeners=function(t){return[]},i.binding=function(t){throw new Error("process.binding is not supported")},i.cwd=function(){return"/"},i.chdir=function(t){throw new Error("process.chdir is not supported")},i.umask=function(){return 0}},{}],2:[function(t,f,e){(function(n){!function(t){var e=setTimeout;function r(){}function a(t){if("object"!=typeof this)throw new TypeError("Promises must be constructed via new");if("function"!=typeof t)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=undefined,this._deferreds=[],l(t,this)}function o(r,o){for(;3===r._state;)r=r._value;0!==r._state?(r._handled=!0,a._immediateFn(function(){var t=1===r._state?o.onFulfilled:o.onRejected;if(null!==t){var e;try{e=t(r._value)}catch(n){return void u(o.promise,n)}i(o.promise,e)}else(1===r._state?i:u)(o.promise,r._value)})):r._deferreds.push(o)}function i(t,e){try{if(e===t)throw new TypeError("A promise cannot be resolved with itself.");if(e&&("object"==typeof e||"function"==typeof e)){var n=e.then;if(e instanceof a)return t._state=3,t._value=e,void s(t);if("function"==typeof n)return void l((r=n,o=e,function(){r.apply(o,arguments)}),t)}t._state=1,t._value=e,s(t)}catch(i){u(t,i)}var r,o}function u(t,e){t._state=2,t._value=e,s(t)}function s(t){2===t._state&&0===t._deferreds.length&&a._immediateFn(function(){t._handled||a._unhandledRejectionFn(t._value)});for(var e=0,n=t._deferreds.length;e<n;e++)o(t,t._deferreds[e]);t._deferreds=null}function c(t,e,n){this.onFulfilled="function"==typeof t?t:null,this.onRejected="function"==typeof e?e:null,this.promise=n}function l(t,e){var n=!1;try{t(function(t){n||(n=!0,i(e,t))},function(t){n||(n=!0,u(e,t))})}catch(r){if(n)return;n=!0,u(e,r)}}a.prototype["catch"]=function(t){return this.then(null,t)},a.prototype.then=function(t,e){var n=new this.constructor(r);return o(this,new c(t,e,n)),n},a.all=function(t){var s=Array.prototype.slice.call(t);return new a(function(o,i){if(0===s.length)return o([]);var a=s.length;function u(e,t){try{if(t&&("object"==typeof t||"function"==typeof t)){var n=t.then;if("function"==typeof n)return void n.call(t,function(t){u(e,t)},i)}s[e]=t,0==--a&&o(s)}catch(r){i(r)}}for(var t=0;t<s.length;t++)u(t,s[t])})},a.resolve=function(e){return e&&"object"==typeof e&&e.constructor===a?e:new a(function(t){t(e)})},a.reject=function(n){return new a(function(t,e){e(n)})},a.race=function(o){return new a(function(t,e){for(var n=0,r=o.length;n<r;n++)o[n].then(t,e)})},a._immediateFn="function"==typeof n?function(t){n(t)}:function(t){e(t,0)},a._unhandledRejectionFn=function(t){"undefined"!=typeof console&&console&&console.warn("Possible Unhandled Promise Rejection:",t)},a._setImmediateFn=function(t){a._immediateFn=t},a._setUnhandledRejectionFn=function(t){a._unhandledRejectionFn=t},void 0!==f&&f.exports?f.exports=a:t.Promise||(t.Promise=a)}(this)}).call(this,t("timers").setImmediate)},{timers:3}],3:[function(s,t,c){(function(t,e){var r=s("process/browser.js").nextTick,n=Function.prototype.apply,o=Array.prototype.slice,i={},a=0;function u(t,e){this._id=t,this._clearFn=e}c.setTimeout=function(){return new u(n.call(setTimeout,window,arguments),clearTimeout)},c.setInterval=function(){return new u(n.call(setInterval,window,arguments),clearInterval)},c.clearTimeout=c.clearInterval=function(t){t.close()},u.prototype.unref=u.prototype.ref=function(){},u.prototype.close=function(){this._clearFn.call(window,this._id)},c.enroll=function(t,e){clearTimeout(t._idleTimeoutId),t._idleTimeout=e},c.unenroll=function(t){clearTimeout(t._idleTimeoutId),t._idleTimeout=-1},c._unrefActive=c.active=function(t){clearTimeout(t._idleTimeoutId);var e=t._idleTimeout;0<=e&&(t._idleTimeoutId=setTimeout(function(){t._onTimeout&&t._onTimeout()},e))},c.setImmediate="function"==typeof t?t:function(t){var e=a++,n=!(arguments.length<2)&&o.call(arguments,1);return i[e]=!0,r(function(){i[e]&&(n?t.apply(null,n):t.call(null),c.clearImmediate(e))}),e},c.clearImmediate="function"==typeof e?e:function(t){delete i[t]}}).call(this,s("timers").setImmediate,s("timers").clearImmediate)},{"process/browser.js":1,timers:3}],4:[function(t,e,n){var r=t("promise-polyfill"),o="undefined"!=typeof window?window:Function("return this;")();e.exports={boltExport:o.Promise||r}},{"promise-polyfill":2}]},{},[4])(4)});var vt=gt.exports.boltExport,ht=function(t){var n=st.none(),e=[],r=function(t){o()?a(t):e.push(t)},o=function(){return n.isSome()},i=function(t){dt(t,a)},a=function(e){n.each(function(t){v.setTimeout(function(){e(t)},0)})};return t(function(t){n=st.some(t),i(e),e=[]}),{get:r,map:function(n){return ht(function(e){r(function(t){e(n(t))})})},isReady:o}},yt={nu:ht,pure:function(e){return ht(function(t){t(e)})}},bt=function(t){v.setTimeout(function(){throw t},0)},wt=function(n){var t=function(t){n().then(t,bt)};return{map:function(t){return wt(function(){return n().then(t)})},bind:function(e){return wt(function(){return n().then(function(t){return e(t).toPromise()})})},anonBind:function(t){return wt(function(){return n().then(function(){return t.toPromise()})})},toLazy:function(){return yt.nu(t)},toCached:function(){var t=null;return wt(function(){return null===t&&(t=n()),t})},toPromise:n,get:t}},xt=function(t){return wt(function(){return new vt(t)})},_t=function(a,t){return t(function(r){var o=[],i=0;0===a.length?r([]):dt(a,function(t,e){var n;t.get((n=e,function(t){o[n]=t,++i>=a.length&&r(o)}))})})},Pt=function(t,e){return n=ft(t,e),_t(n,xt);var n},Tt=function(t,e,n){var r=n||w(e),o=G(t,f(e),r);!1===o.cancelled&&tt(t,o.content)},Dt=function(t,e){e=t.dom.encode(e).replace(/\r\n/g,"\n"),e=C(e,t.settings.forced_root_block,t.settings.forced_root_block_attrs),Tt(t,e,!1)},Ct=function(t){var e={};if(t){if(t.getData){var n=t.getData("Text");n&&0<n.length&&-1===n.indexOf("data:text/mce-internal,")&&(e["text/plain"]=n)}if(t.types)for(var r=0;r<t.types.length;r++){var o=t.types[r];try{e[o]=t.getData(o)}catch(i){e[o]=""}}}return e},kt=function(t,e){return e in t&&0<t[e].length},Ft=function(t){return kt(t,"text/html")||kt(t,"text/plain")},Et=O.createIdGenerator("mceclip"),Rt=function(e,t,n){var r,o,i,a,u="paste"===t.type?t.clipboardData:t.dataTransfer;if(e.settings.paste_data_images&&u){var s=(i=(o=u).items?ft(mt(o.items),function(t){return t.getAsFile()}):[],a=o.files?mt(o.files):[],function(t,e){for(var n=[],r=0,o=t.length;r<o;r++){var i=t[r];e(i,r)&&n.push(i)}return n}(0<i.length?i:a,function(t){return/^image\/(jpeg|png|gif|bmp)$/.test(t.type)}));if(0<s.length)return t.preventDefault(),(r=s,Pt(r,function(r){return xt(function(t){var e=r.getAsFile?r.getAsFile():r,n=new window.FileReader;n.onload=function(){t({blob:e,uri:n.result})},n.readAsDataURL(e)})})).get(function(t){n&&e.selection.setRng(n),dt(t,function(t){!function(t,e){var n,r,o,i,a,u,s,c=(n=e.uri,-1!==(r=n.indexOf(","))?n.substr(r+1):null),l=Et(),f=t.settings.images_reuse_filename&&e.blob.name?(o=t,i=e.blob.name,(a=i.match(/([\s\S]+?)\.(?:jpeg|jpg|png|gif)$/i))?o.dom.encode(a[1]):null):l,d=new v.Image;if(d.src=e.uri,u=t.settings,s=d,!u.images_dataimg_filter||u.images_dataimg_filter(s)){var m,p=t.editorUpload.blobCache,g=void 0;(m=p.findFirst(function(t){return t.base64()===c}))?g=m:(g=p.create(l,e.blob,c,f),p.add(g)),Tt(t,'<img src="'+g.blobUri()+'">',!1)}else Tt(t,'<img src="'+e.uri+'">',!1)}(e,t)})}),!0}return!1},It=function(t){return o.metaKeyPressed(t)&&86===t.keyCode||t.shiftKey&&45===t.keyCode},Ot=function(s,c,l){var e,f,d=(e=p(st.none()),{clear:function(){e.set(st.none())},set:function(t){e.set(st.some(t))},isSet:function(){return e.get().isSome()},on:function(t){e.get().each(t)}});function m(t,e,n,r){var o,i;kt(t,"text/html")?o=t["text/html"]:(o=c.getHtml(),r=r||w(o),c.isDefaultContent(o)&&(n=!0)),o=O.trimHtml(o),c.remove(),i=!1===r&&D(o),o.length&&!i||(n=!0),n&&(o=kt(t,"text/plain")&&i?t["text/plain"]:O.innerText(o)),c.isDefaultContent(o)?e||s.windowManager.alert("Please use Ctrl+V/Cmd+V keyboard shortcuts to paste contents."):n?Dt(s,o):Tt(s,o,r)}s.on("keydown",function(t){function e(t){It(t)&&!t.isDefaultPrevented()&&c.remove()}if(It(t)&&!t.isDefaultPrevented()){if((f=t.shiftKey&&86===t.keyCode)&&h.webkit&&-1!==v.navigator.userAgent.indexOf("Version/"))return;if(t.stopImmediatePropagation(),d.set(t),window.setTimeout(function(){d.clear()},100),h.ie&&f)return t.preventDefault(),void n(s,!0);c.remove(),c.create(),s.once("keyup",e),s.once("paste",function(){s.off("keyup",e)})}}),s.on("paste",function(t){var e,n,r,o=d.isSet(),i=(e=s,n=Ct(t.clipboardData||e.getDoc().dataTransfer),O.isMsEdge()?b.extend(n,{"text/html":""}):n),a="text"===l.get()||f,u=kt(i,x());f=!1,t.isDefaultPrevented()||(r=t.clipboardData,-1!==v.navigator.userAgent.indexOf("Android")&&r&&r.items&&0===r.items.length)?c.remove():Ft(i)||!Rt(s,t,c.getLastRng()||s.selection.getRng())?(o||t.preventDefault(),!h.ie||o&&!t.ieFake||kt(i,"text/html")||(c.create(),s.dom.bind(c.getEl(),"paste",function(t){t.stopPropagation()}),s.getDoc().execCommand("Paste",!1,null),i["text/html"]=c.getHtml()),kt(i,"text/html")?(t.preventDefault(),u||(u=w(i["text/html"])),m(i,o,a,u)):y.setEditorTimeout(s,function(){m(i,o,a,u)},0)):c.remove()})},St=function(t){return h.ie&&t.inline?v.document.body:t.getBody()},At=function(e,t,n){var r;St(r=e)!==r.getBody()&&e.dom.bind(t,"paste keyup",function(t){Lt(e,n)||e.fire("paste")})},jt=function(t){return t.dom.get("mcepastebin")},Mt=function(t,e){return e===t},Lt=function(t,e){var n,r=jt(t);return(n=r)&&"mcepastebin"===n.id&&Mt(e,r.innerHTML)},Nt=function(a){var u=p(null),s="%MCEPASTEBIN%";return{create:function(){return e=u,n=s,o=(t=a).dom,i=t.getBody(),e.set(t.selection.getRng()),r=t.dom.add(St(t),"div",{id:"mcepastebin","class":"mce-pastebin",contentEditable:!0,"data-mce-bogus":"all",style:"position: fixed; top: 50%; width: 10px; height: 10px; overflow: hidden; opacity: 0"},n),(h.ie||h.gecko)&&o.setStyle(r,"left","rtl"===o.getStyle(i,"direction",!0)?65535:-65535),o.bind(r,"beforedeactivate focusin focusout",function(t){t.stopPropagation()}),At(t,r,n),r.focus(),void t.selection.select(r,!0);var t,e,n,r,o,i},remove:function(){return function(t,e){if(jt(t)){for(var n=void 0,r=e.get();n=t.dom.get("mcepastebin");)t.dom.remove(n),t.dom.unbind(n);r&&t.selection.setRng(r)}e.set(null)}(a,u)},getEl:function(){return jt(a)},getHtml:function(){return function(n){var e,t,r,o,i,a=function(t,e){t.appendChild(e),n.dom.remove(e,!0)};for(t=b.grep(St(n).childNodes,function(t){return"mcepastebin"===t.id}),e=t.shift(),b.each(t,function(t){a(e,t)}),r=(o=n.dom.select("div[id=mcepastebin]",e)).length-1;0<=r;r--)i=n.dom.create("div"),e.insertBefore(i,o[r]),a(i,o[r]);return e?e.innerHTML:""}(a)},getLastRng:function(){return u.get()},isDefault:function(){return Lt(a,s)},isDefaultContent:function(t){return Mt(s,t)}}},Bt=function(n,t){var e=Nt(n);return n.on("preInit",function(){return Ot(a=n,e,t),void a.parser.addNodeFilter("img",function(t,e,n){var r,o=function(t){t.attr("data-mce-object")||u===h.transparentSrc||t.remove()};if(!a.settings.paste_data_images&&(r=n).data&&!0===r.data.paste)for(var i=t.length;i--;)(u=t[i].attributes.map.src)&&(0===u.indexOf("webkit-fake-url")?o(t[i]):a.settings.allow_html_data_urls||0!==u.indexOf("data:")||o(t[i]))});var a,u}),{pasteFormat:t,pasteHtml:function(t,e){return Tt(n,t,e)},pasteText:function(t){return Dt(n,t)},pasteImageData:function(t,e){return Rt(n,t,e)},getDataTransferItems:Ct,hasHtmlOrText:Ft,hasContentType:kt}},Ht=function(){},$t=function(t,e,n){if(r=t,!1!==h.iOS||r===undefined||"function"!=typeof r.setData||!0===O.isMsEdge())return!1;try{return t.clearData(),t.setData("text/html",e),t.setData("text/plain",n),t.setData(x(),e),!0}catch(o){return!1}var r},Wt=function(t,e,n,r){$t(t.clipboardData,e.html,e.text)?(t.preventDefault(),r()):n(e.html,r)},Ut=function(u){return function(t,e){var n=l(t),r=u.dom.create("div",{contenteditable:"false","data-mce-bogus":"all"}),o=u.dom.create("div",{contenteditable:"true"},n);u.dom.setStyles(r,{position:"fixed",top:"0",left:"-3000px",width:"1000px",overflow:"hidden"}),r.appendChild(o),u.dom.add(u.getBody(),r);var i=u.selection.getRng();o.focus();var a=u.dom.createRng();a.selectNodeContents(o),u.selection.setRng(a),setTimeout(function(){u.selection.setRng(i),r.parentNode.removeChild(r),e()},0)}},zt=function(t){return{html:t.selection.getContent({contextual:!0}),text:t.selection.getContent({format:"text"})}},Vt=function(t){return!t.selection.isCollapsed()||!!(e=t).dom.getParent(e.selection.getStart(),"td[data-mce-selected],th[data-mce-selected]",e.getBody());var e},Kt=function(t){var e,n;t.on("cut",(e=t,function(t){Vt(e)&&Wt(t,zt(e),Ut(e),function(){setTimeout(function(){e.execCommand("Delete")},0)})})),t.on("copy",(n=t,function(t){Vt(n)&&Wt(t,zt(n),Ut(n),Ht)}))},qt=tinymce.util.Tools.resolve("tinymce.dom.RangeUtils"),Gt=function(t,e){return qt.getCaretRangeFromPoint(e.clientX,e.clientY,t.getDoc())},Xt=function(t,e){t.focus(),t.selection.setRng(e)},Yt=function(a,u,s){g.shouldBlockDrop(a)&&a.on("dragend dragover draggesture dragdrop drop drag",function(t){t.preventDefault(),t.stopPropagation()}),g.shouldPasteDataImages(a)||a.on("drop",function(t){var e=t.dataTransfer;e&&e.files&&0<e.files.length&&t.preventDefault()}),a.on("drop",function(t){var e,n;if(n=Gt(a,t),!t.isDefaultPrevented()&&!s.get()){e=u.getDataTransferItems(t.dataTransfer);var r,o=u.hasContentType(e,x());if((u.hasHtmlOrText(e)&&(!(r=e["text/plain"])||0!==r.indexOf("file://"))||!u.pasteImageData(t,n))&&n&&g.shouldFilterDrop(a)){var i=e["mce-internal"]||e["text/html"]||e["text/plain"];i&&(t.preventDefault(),y.setEditorTimeout(a,function(){a.undoManager.transact(function(){e["mce-internal"]&&a.execCommand("Delete"),Xt(a,n),i=O.trimHtml(i),e["text/html"]?u.pasteHtml(i,o):u.pasteText(i)})}))}}}),a.on("dragstart",function(t){s.set(!0)}),a.on("dragover dragend",function(t){g.shouldPasteDataImages(a)&&!1===s.get()&&(t.preventDefault(),Xt(a,Gt(a,t))),"dragend"===t.type&&s.set(!1)})},Zt=function(t){var e=t.plugins.paste,n=g.getPreProcess(t);n&&t.on("PastePreProcess",function(t){n.call(e,e,t)});var r=g.getPostProcess(t);r&&t.on("PastePostProcess",function(t){r.call(e,e,t)})};function Jt(e,n){e.on("PastePreProcess",function(t){t.content=n(e,t.content,t.internal,t.wordContent)})}function Qt(t,e){if(!V.isWordContent(e))return e;var n=[];b.each(t.schema.getBlockElements(),function(t,e){n.push(e)});var r=new RegExp("(?:<br>&nbsp;[\\s\\r\\n]+|<br>)*(<\\/?("+n.join("|")+")[^>]*>)(?:<br>&nbsp;[\\s\\r\\n]+|<br>)*","g");return e=O.filter(e,[[r,"$1"]]),e=O.filter(e,[[/<br><br>/g,"<BR><BR>"],[/<br>/g," "],[/<BR><BR>/g,"<br>"]])}function te(t,e,n,r){if(r||n)return e;var c,o=g.getWebkitStyles(t);if(!1===g.shouldRemoveWebKitStyles(t)||"all"===o)return e;if(o&&(c=o.split(/[, ]/)),c){var l=t.dom,f=t.selection.getNode();e=e.replace(/(<[^>]+) style="([^"]*)"([^>]*>)/gi,function(t,e,n,r){var o=l.parseStyle(l.decode(n)),i={};if("none"===c)return e+r;for(var a=0;a<c.length;a++){var u=o[c[a]],s=l.getStyle(f,c[a],!0);/color/.test(c[a])&&(u=l.toHex(u),s=l.toHex(s)),s!==u&&(i[c[a]]=u)}return(i=l.serializeStyle(i,"span"))?e+' style="'+i+'"'+r:e+r})}else e=e.replace(/(<[^>]+) style="([^"]*)"([^>]*>)/gi,"$1$3");return e=e.replace(/(<[^>]+) data-mce-style="([^"]+)"([^>]*>)/gi,function(t,e,n,r){return e+' style="'+n+'"'+r})}function ee(n,t){n.$("a",t).find("font,u").each(function(t,e){n.dom.remove(e,!0)})}var ne=function(t){var e,n;h.webkit&&Jt(t,te),h.ie&&(Jt(t,Qt),n=ee,(e=t).on("PastePostProcess",function(t){n(e,t.node)}))},re=function(t,e,n){var r=n.control;r.active("text"===e.pasteFormat.get()),t.on("PastePlainTextToggle",function(t){r.active(t.state)})},oe=function(t,e){var n=function(r){for(var o=[],t=1;t<arguments.length;t++)o[t-1]=arguments[t];return function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];var n=o.concat(t);return r.apply(null,n)}}(re,t,e);t.addButton("pastetext",{active:!1,icon:"pastetext",tooltip:"Paste as text",cmd:"mceTogglePlainTextPaste",onPostRender:n}),t.addMenuItem("pastetext",{text:"Paste as text",selectable:!0,active:e.pasteFormat,cmd:"mceTogglePlainTextPaste",onPostRender:n})};e.add("paste",function(t){if(!1===a(t)){var e=p(!1),n=p(!1),r=p(g.isPasteAsTextEnabled(t)?"text":"html"),o=Bt(t,r),i=ne(t);return oe(t,o),c(t,o,e),Zt(t),Kt(t),Yt(t,o,n),u(o,i)}})}(window);