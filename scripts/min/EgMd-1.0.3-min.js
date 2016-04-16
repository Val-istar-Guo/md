!function(e,t){function r(){this.dialect="Complex",this.is_debug=!1,this.debug_indent="",this.deleteSource=!0,this.deleteTree=!0,this.deleteHTML=!0,this.root="",this.rootAttr={},this.deleteH1=!1}function n(e){if(this.is_debug&&this.debug("buildOptions()	::arguments:\n",arguments),e=e||{},"object"!=typeof e||_(e))throw new TypeError("Unexpert param(options) at buildOptions("+e+")");return e.isset||(e.isset=!0,e.deleteSource=e.deleteSource||this.deleteSource,e.deleteTree=e.deleteTree||this.deleteTree,e.deleteHTML=e.deleteHTML||this.deleteHTML,e.deleteH1=e.deleteH1||this.deleteH1,e.root=e.root||"string"==typeof e.root?e.root:this.root,e.rootAttr=e.rootAttr||this.rootAttr||{},e.dialect=w(e.dialect||this.dialect),this.options=e),e}function n(e){if(this.is_debug&&this.debug("buildOptions()	::arguments:\n",arguments),e=e||{},"object"!=typeof e||_(e))throw new TypeError("Unexpert param(options) at buildOptions("+e+")");return e.isset||(e.isset=!0,e.deleteSource=e.deleteSource||this.deleteSource,e.deleteTree=e.deleteTree||this.deleteTree,e.deleteHTML=e.deleteHTML||this.deleteHTML,e.deleteH1=e.deleteH1||this.deleteH1,e.root=e.root||"string"==typeof e.root?e.root:this.root,e.rootAttr=e.rootAttr||this.rootAttr||{},e.dialect=w(e.dialect||this.dialect),this.options=e),e}function i(e){e=e||"";var t=null;if("object"==typeof e)t=e;else if("string"!=typeof e&&"undefined"!=typeof e)throw new Error("Markdown Expect Stirng param");if(r.call(this),t)for(var n in t)t.hasOwnProperty(n)&&(this[n]=t[n]);s.call(this),this.source=e,this.listener={all:[]}}function s(){this.em_state=[],this.strong_state=[],this.references={},this.tree=null,this.Header=[],this.html=""}function l(e){for(var t=0,r=-1;-1!==(r=e.indexOf("\n",r+1));)t++;return t}function o(e){e=e.replace(/(\r\n|\n|\r)/g,"\n");var t=/([\s\S]+?)($|\n#|\n(?:\s*\n|$)+)/g,r=[],n,i=1;for(null!==(n=/^(\s*\n)/.exec(e))&&(i+=l(n[0]),t.lastIndex=n[0].length);null!==(n=t.exec(e));)"\n#"===n[2]&&(n[2]="\n",t.lastIndex--),r.push(d(n[1],n[2],i)),i+=l(n[0]);return r}function a(){this.is_debug&&this.debug("SOURCE:\n\n"+this.source,"\n\ntoHtmlTree()	::arguments:\n",arguments);try{var e=this.toMDTree(this.source);if("markdown"===e[0]&&this.options.root){e[0]=this.options.root.slice(0);var t=y(this.options.rootAttr);b(e)?e[1]=t:e.splice(1,0,t)}var r=h.call(this,e);return f(r),r}finally{this.options.deleteSource&&(this.source=""),this.options.deleteTree&&(this.tree=null)}}function h(e){this.is_debug&&this.debug("convert_md_tree_to_html_tree()	::tree:\n",e);var t,r=this.options,n=e;if("string"==typeof n)return n;var i=b(n),s=r.dialect.__convert_tree__.call(this,n);if("string"==typeof s)return s;if(t=1,i){for(var l in n[1]){t=2;break}1===t&&n.splice(t,1)}if(n[0].match(/[hH][1-6]/)){var o=n[0].charAt(1);if(_(this.Header)||(this.Header=[]),_(this.Header[o])||(this.Header[o]=[]),this.Header[o].push(n),"1"===o&&this.options.deleteH1)return""}for(;t<n.length;++t)n[t]=h.call(this,n[t]);return n}function c(e){if("string"==typeof e)return u(e);for(var t=e[0],r=b(e),n=[],i=r?2:1,s=e.length;s>i;i++)n.push(c(e[i]));var l="";for(var o in r)l+=" "+o+'="'+u(r[o])+'"';return"img"===t||"br"===t||"hr"===t?"<"+t+l+"/>":"<"+t+l+">"+n.join("")+"</"+t+">"}function u(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function f(e){for(var t=b(e)?2:1;t<e.length;)"string"==typeof e[t]?t+1<e.length&&"string"==typeof e[t+1]?e[t]+=e.splice(t+1,1)[0]:""===e[t]?e.splice(t,1):++t:(f(e[t]),++t)}function p(e,t){function r(e){this.len_after=e,this.name="close_"+t}var n=e+"_state",i="strong"===e?"em_state":"strong_state";return function(s){if(this[n][0]===t)return this[n].shift(),[s.length,new r(s.length-t.length)];var l=this[i].slice(),o=this[n].slice();this[n].unshift(t);var a=this.processInline(s.substr(t.length)),h=a[a.length-1],c=this[n].shift();if(h instanceof r){a.pop();var u=s.length-h.len_after;return[u,[e].concat(a)]}return this[i]=l,this[n]=o,[t.length,t]}}var g={},d=g.mkBlock=function(e,r,n){if("string"!=typeof e)throw new Error("`mk_block` expect string param");1===arguments.length&&(r="/n/n");var i=new String(e);return i.trail=r,i.toSource=function(){return'new mk_block("'+this.toString()+'" , "'+this.trail+'" , '+this.lineNum+")"},i.lineNum=n?n:t,i},_=g.isArray=Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)},m=g.forEach=function(){return Array.prototype.forEach?function(e,t,r){return e.forEach(t,r)}:function(e,t,r){for(var n=0;n<e.length;n++)t.call(r||e,e[n],n,e)}}(),v=g.isEmpty=function(e){for(var t in e)if(hasOwnProperty.call(e,t))return!1;return!0},b=g.getAttrOfJsonML=function(e){return _(e)&&e.length>1&&"object"==typeof e[1]&&!_(e[1])?e[1]:t},y=g.clone_attr=function(e){var t={};for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r]);return t},k=g.argToArray=function(e){return Array.prototype.slice.call(e)};if(e.Markdown)throw new Error("Markdown已存在");i.version="1.0.2",i.dialects={},i.prototype.on=function(e){var t,r,n;if(arguments[2])t=arguments[2],r=arguments[1];else{if("function"!=typeof arguments[1])throw new TypeError("Markdown.on TypeError");t=arguments[1]}if("string"!=typeof e||"function"!=typeof t&&"string"!=typeof t)throw new TypeError("Markdown.on TypeError");return"all"===e?this.listener.all.push({fun:t,data:r}):(this.listener[e]||(this.listener[e]=[]),this.listener[e].push({fun:t,data:r})),this},i.prototype.trigger=function(e,t){function r(e){}var n=this.listener[e];n&&m(n,function(e){e.data&&t.push(e.data),e.fun.apply(this,t)},this),m(this.listener.all,function(e){e.data?e.fun.call(this,e.data):e.fun.call(this)},this)},i.prototype.off=function(e,t){var r;if("function"==typeof t&&"string"==typeof e){if(r=this.listener[e])for(var n in r)if(r[n].fun===t){r.splice(n,1);break}}else{if("string"!=typeof e)throw new TypeError("Markdown.unbind Unexpect param");this.listener[e]&&(this.listener[e]=[])}},i.prototype.debug=function(){var e=Array.prototype.slice.call(arguments);e.unshift(this.debug_indent),"undefined"!=typeof console&&"undefined"!=typeof console.log&&console.log.apply(console,e)};var w=i.getDialect=function(e){switch(typeof e){case"object":return e;default:if(e in i.dialects)return i.dialects[e];throw new Error("Unknown Markdown dialect '"+String(e)+"'")}};i.prototype.buildOptions=n,i.prototype.processBlock=function x(e,t){var r=this.options.dialect.block,n=r.__order__;if("__call__"in r)return r.__call__.call(this,e,t);for(var i=0;i<n.length;i++){var s=r[n[i]].call(this,e,t);if(s){if(this.is_debug&&this.debug(this.options.dialect.name+"::"+n[i]+"(block,next)	::arguments:\n",arguments,"\n result:\n",s),!_(s))throw new Error(this.options.dialect.name+"::"+n[i]+"return an illegal Result("+typeof s+")");return s}}return[]},i.prototype.processInline=function E(e){return this.is_debug&&this.debug("processInline()	::arguments\n",arguments),this.options.dialect.inline.__call__.call(this,String(e))},i.prototype.toMDTree=function M(e,t){var r=e instanceof Array?e:o(e);this.is_debug&&this.debug("toMDTree()	::arguments:\n",arguments,"\n blocks:\n",r);var n=this.tree;try{for(this.tree=t||this.tree||["markdown"];r.length;){var i=this.processBlock(r.shift(),r);i.length&&this.tree.push.apply(this.tree,i)}return this.tree}finally{t&&(this.tree=n)}},i.prototype.Reset=function(e){if("string"==typeof e)this.source=e;else{if("function"!=typeof e)throw new Error("Unexpected param");e.call(this)}s.call(this)},i.prototype.toTree=function(){var e;"string"==typeof arguments[0]?(this.Reset(arguments[0]),e=arguments[1]):e=arguments[0],e=this.buildOptions(e);var t=a.call(this,e);return this.trigger("toTree",[t]),t},i.prototype.renderJsonML=function H(e,t){this.id_debug&&this.debug("renderJsonML	::arguments:\n",arguments),t=this.buildOptions(t);var r=[];if(t.root)r.push(c(e));else for(var n=e.length,i=b(e)?2:1;n>i;i++)r.push(c(e[i]));return this.options.deleteHTML?(this.html="",r.join("")):(this.html=r.join(""),this.html)},i.prototype.toHTML=function(e){this.is_debug&&this.debug("toHTML("+k(arguments).join(" , ")+")");var t;"string"==typeof e?(this.Reset(e),this.buildOptions(arguments[1])):t=this.buildOptions(e);var r=a.call(this,t);this.Header&&m(this.Header,function(e,t,r){m(e,function(e,t,r){r[t]=c(e)})});var n=this.renderJsonML(r,t);return this.trigger("toHTML",[n]),n},i.buildBlockOrder=function(e){if("object"!=typeof e)throw new TypeError("Unexpected param at Markdown.buildBlockOrder");var t=[];for(var r in e)(!r.match(/^__.*__$/)||e.hasOwnProperty(r))&&t.push(r);e.__order__=t},i.buildInlineRegExp=function(e){if("object"!=typeof e)throw new TypeError("Unexpected param at Markdown.buildInlineRegExp");var r=[];for(var n in e)if(!n.match(/^__.*__$/)&&e.hasOwnProperty(n)){var i=n.replace(/([\\.*+?|\()\[\]{}])/g,"\\$1").replace(/\n/,"\\n");r.push(1===n.length?i:"(?:"+i+")")}if(r=r.join("|"),e.__regExp__=r,e.__call__){var s=e.__call__;e.__call__=function(e,n){return n!==t?s.call(this,e,n):s.call(this,e,r)}}},i.addDialect=function(e){if("object"!=typeof e)throw new TypeError("Unexpected param at Markdown.addDialect");if(i.dialects[e.name])throw new Error("`"+e.name+"` has already exist!");i.dialects[e.name]=e},i.removeDialect=function(e){if("object"==typeof e){var t=i.dialects;for(var r in t)t[r]===e&&delete t[r]}else{if("string"!=typeof e)throw new TypeError("Unexpected param at Markdown.removeDialect()");delete i.dialects[e]}},e.Markdown=i;var T={name:"Complex",block:{atxHeader:function A(e,r){var n=e.match(/^(#{1,6})\s*(.*?)\s*#*\s*(?:\n|$)/);if(!n)return t;var i=["header",{level:n[1].length}];return Array.prototype.push.apply(i,this.processInline(n[2])),n[0].length<e.length&&r.unshift(d(e.substr(n[0].length),e.trailing,e.lineNum+2)),[i]},setextHeader:function O(e,r){var n=e.match(/^(.*)\n([-=])\2\2+(?:\n|$)/);if(!n)return t;var i="="===n[2]?1:2,s=["header",{level:i}];return Array.prototype.push.apply(s,this.processInline(n[1])),n[0].length<e.length&&r.unshift(d(e.substr(n[0].length),e.trailing,e.lineNum+2)),[s]},code:function S(e,r){function n(e){var t=e.valueOf(),r=null;return(r=t.match(o))&&(t=t.substr(r[0].length),a={},a.codeType=r[1]?r[1]:"cpp",a.lineNumber=r[2]?r[2]:null),t}function i(e){s.push(e[1])}var s=[],l=/^(?: {0,3}\t| {4})(.*)\n?/,o=/^(?: {0,3}\t| {4})\s*\[(.*?)\](?:\s*\[(.*?)\])?[ \t]*\n?/,a=null;if(!e.match(l))return t;var h=n(e);e:for(;;){if(h=T.loop_reg_over_block(l,h,i),h.length){r.unshift(d(h,e.trailing));break e}if(!r.length)break e;if(r[0].match(o)||!r[0].match(l))break e;s.push(e.trail.replace(/[^\n]/g,"").substring(2)),h=r.shift().valueOf()}var c=["code_block"];return a&&c.push(a),c.push(s.join("\n")),[c]},horizRule:function j(e,r){var n=e.match(/^(?:([\s\S]*?)\n)?[ \t]*([-_*])(?:[ \t]*\2){2,}[ \t]*(?:\n([\s\S]*))?$/);if(!n)return t;var i="";switch(n[2]){case"-":i="dec";break;case"_":i="dash";break;case"*":i="star";break;default:i=""}var s=[["hr",{"class":i}]];if(n[1]){var l=d(n[1],"",e.lineNum);s.unshift.apply(s,this.toMDTree(l,[]))}return n[3]&&r.unshift(d(n[3],e.trailing,e.lineNum+1)),s},lists:function(){function e(e){return new RegExp("(?:^("+h+"{0,"+e+"} {0,3})("+l+")\\s+)|(^"+h+"{0,"+(e-1)+"}[ ]{0,4})")}function r(e){return e.replace(/ {0,3}\t/g,"    ")}function n(e,t,r,n){if(t)return void e.push(["para"].concat(r));var i=e[e.length-1]instanceof Array&&"para"===e[e.length-1][0]?e[e.length-1]:e;n&&e.length>1&&r.unshift(n);for(var s=0;s<r.length;s++){var l=r[s],o="string"==typeof l;o&&i.length>1&&"string"==typeof i[i.length-1]?i[i.length-1]+=l:i.push(l)}}function i(e,t){for(var r=new RegExp("^("+h+"{"+e+"}.*?\\n?)*$"),n=new RegExp("^"+h+"{"+e+"}","gm"),i=[];t.length>0&&r.exec(t[0]);){var s=t.shift(),l=s.replace(n,"");i.push(d(l,s.trailing,s.lineNum))}return i}function s(e,t,r){var n=e.list,i=n[n.length-1];if(!(i[1]instanceof Array&&"para"===i[1][0]))if(t+1===r.length)t=1,i instanceof Object&&(t=2),i.push(["para"].concat(i.splice(t,i.length-1)));else{var s=i.pop();i.push(["para"].concat(i.splice(1,i.length-1)),s)}}var l="[*+-]|\\d+(?:\\.)",o=/[*+-]/,a=new RegExp("^( {0,3})("+l+")[ 	]+"),h="(?: {0,3}\\t| {4})";return function(l,h){function c(e){var t=o.exec(e[2])?["bulletlist"]:["numberlist"];return g.push({list:t,indent:e[1]}),t}function u(e){var t=["listitem"];switch(e){case"+":e="add";break;case"-":e="dec";break;case"*":e="star";break;default:e=e.replace(/\.$/g,"")}return t.push({"class":e}),t}function f(e){return w=e,""}var p=l.match(a);if(!p)return t;for(var g=[],d=c(p),_,v=!1,b=[g[0].list],y,k="",w="",T;;){T=l.split(/(?=\n)/),k="",w="";for(var x=0;x<T.length;x++){w="";var E=T[x].replace(/^\n/,f),M=e(g.length);if(p=E.match(M),p[1]!==t){k.length&&(n(_,v,this.processInline(k),w),v=!1,k=""),p[1]=r(p[1]);var H=Math.floor(p[1].length/4)+1;if(H>g.length)d=c(p),_.push(d),_=d[1]=u(p[2]);else{var A=!1;for(y=0;y<g.length;y++)if(g[y].indent===p[1]){d=g[y].list,g.splice(y+1,g.length-(y+1)),A=!0;break}A||(H++,H<=g.length?(g.splice(H,g.length-H),d=g[H-1].list):(d=c(p),_.push(d))),_=u(p[2]),d.push(_)}w=""}E.length>p[0].length&&(k+=w+E.substr(p[0].length))}k.length&&(n(_,v,this.processInline(k),w),v=!1,k="");var O=i(g.length,h);O.length>0&&(m(g,s,this),_.push.apply(_,this.toMDTree(O,[])));var S=h[0]&&h[0].valueOf()||"";if(!S.match(a)&&!S.match(/^ /))break;l=h.shift();var j=this.options.dialect.block.horizRule(l,h);if(j){b.push.apply(b,j);break}m(g,s,this),v=!0}return b}}(),blockquote:function L(e,r){if(!e.match(/^>/m))return t;var n=[];if(">"!==e[0]){for(var i=e.split(/\n/),s=[],l=e.lineNum;i.length&&">"!==i[0][0];)s.push(i.shift()),l++;var o=d(s.join("\n"),"\n",e.lineNum);n.push.apply(n,this.processBlock(o,[])),e=d(i.join("\n"),e.trailing,l)}for(;r.length&&">"===r[0][0];){var a=r.shift();e=d(e+e.trailing+a,a.trailing,e.lineNum)}var h=e.replace(/^> ?/gm,""),c=this.tree,u=this.toMDTree(h,["blockquote"]),f=b(u);return f&&f.references&&(delete f.references,v(f)&&u.splice(1,1)),n.push(u),n},referenceDefn:function R(e,r){var n=/^\s*\[(.*?)\]:\s*(\S+)(?:\s+(?:(['"])(.*?)\3|\((.*?)\)))?\n?/;if(!e.match(n))return t;this.references||(this.references={});var i=this.references,s=T.loop_reg_over_block(n,e,function(e){e[2]&&"<"===e[2][0]&&">"===e[2][e[2].length-1]&&(e[2]=e[2].substring(1,e[2].length-1));var r=i[e[1].toLowerCase()]={href:e[2]};e[4]!==t?r.title=e[4]:e[5]!==t&&(r.title=e[5])});return s.length&&r.unshift(d(s,e.trailing)),[]},table:function I(e){var r=function(e,t){t=t||"\\s",t.match(/^[\\|\[\]{}?*.+^$]$/)&&(t="\\"+t);for(var r=[],n=new RegExp("^((?:\\\\.|[^\\\\"+t+"])*)"+t+"(.*)"),i;i=e.match(n);)r.push(i[1]),e=i[2];return r.push(e),r},n=/^ {0,3}\|(.+)\n {0,3}\|\s*([\-:]+[\-| :]*)\n((?:\s*\|.*(?:\n|$))*)(?=\n|$)/,i=/^ {0,3}(\S(?:\\.|[^\\|])*\|.*)\n {0,3}([\-:]+\s*\|[\-| :]*)\n((?:(?:\\.|[^\\|])*\|.*(?:\n|$))*)(?=\n|$)/,s,l;if(l=e.match(n))l[3]=l[3].replace(/^\s*\|/gm,"");else if(!(l=e.match(i)))return t;var o=["table",["thead",["tr"]],["tbody"]];l[2]=l[2].replace(/\|\s*$/,"").split("|");var a=[];for(m(l[2],function(e){e.match(/^\s*-+:\s*$/)?a.push({align:"right"}):e.match(/^\s*:-+\s*$/)?a.push({align:"left"}):e.match(/^\s*:-+:\s*$/)?a.push({align:"center"}):a.push({})}),l[1]=r(l[1].replace(/\|\s*$/,""),"|"),s=0;s<l[1].length;s++)o[1][1].push(["th",a[s]||{}].concat(this.processInline(l[1][s].trim())));return m(l[3].replace(/\|\s*$/gm,"").split("\n"),function(e){var t=["tr"];for(e=r(e,"|"),s=0;s<e.length;s++)t.push(["td",a[s]||{}].concat(this.processInline(e[s].trim())));o[2].push(t)},this),[o]},para:function N(e){return[["para"].concat(this.processInline(e))]}},inline:{__oneElement__:function D(e,t,r){var n,i,s,l=this.options.dialect;return t=t||l.inline.__regExp__,s=new RegExp("([\\s\\S]*?)("+(t.source||t)+")"),(n=s.exec(e))?n[1]?[n[1].length,n[1]]:(n[2]in l.inline&&(i=l.inline[n[2]].call(this,e.substr(n.index),n,r||[])),i=i||[n[2].length,n[2]]):[e.length,e]},__call__:function U(e,t){function r(e){"string"==typeof e&&"string"==typeof n[n.length-1]?n[n.length-1]+=e:n.push(e)}this.is_debug&&this.debug("inline.__call__()	::arguments\n",arguments);for(var n=[],i,s=this.options.dialect;e.length>0;)i=s.inline.__oneElement__.call(this,e,t,n),e=e.substr(i.shift()),m(i,r);return n},"]":function(){},"}":function(){},__escape__:/^\\[\\`\*_{}\[\]()#\+.!\-]/,"\\":function B(e){return this.options.dialect.inline.__escape__.exec(e)?[2,e.charAt(1)]:[1,"\\"]},"![":function C(e){var r=e.match(/^!\[(.*?)\][ \t]*\([ \t]*([^")]*?)(?:[ \t]+(["'])(.*?)\3)?[ \t]*\)/);if(r){r[2]&&"<"===r[2][0]&&">"===r[2][r[2].length-1]&&(r[2]=r[2].substring(1,r[2].length-1)),r[2]=this.options.dialect.inline.__call__.call(this,r[2],/\\/)[0];var n={alt:r[1],href:r[2]||""};return r[4]!==t&&(n.title=r[4]),[r[0].length,["img",n]]}return r=e.match(/^!\[(.*?)\][ \t]*\[(.*?)\]/),r?[r[0].length,["img_ref",{alt:r[1],ref:r[2].toLowerCase(),original:r[0]}]]:[2,"!["]},"[":function P(e){var r=String(e),n=T.inline_until_char.call(this,e.substr(1),"]");if(!n)return[1,"["];var i=1+n[0],s=n[1],l,o;e=e.substr(i);var a=e.match(/^\s*\([ \t]*([^"']*)(?:[ \t]+(["'])(.*?)\2)?[ \t]*\)/);if(a){var h=a[1];if(i+=a[0].length,h&&"<"===h[0]&&">"===h[h.length-1]&&(h=h.substring(1,h.length-1)),!a[3])for(var c=1,u=0;u<h.length;u++)switch(h[u]){case"(":c++;break;case")":0===--c&&(i-=h.length-u,h=h.substring(0,u))}return h=this.options.dialect.inline.__call__.call(this,h,/\\/)[0],o={href:h||""},a[3]!==t&&(o.title=a[3]),l=["link",o].concat(s),[i,l]}return a=e.match(/^\s*\[(.*?)\]/),a?(i+=a[0].length,o={ref:(a[1]||String(s)).toLowerCase(),original:r.substr(0,i)},l=["link_ref",o].concat(s),[i,l]):1===s.length&&"string"==typeof s[0]?(o={ref:s[0].toLowerCase(),original:r.substr(0,i)},l=["link_ref",o,s[0]],[i,l]):[1,"["]},"<":function J(e){var t;return null!==(t=e.match(/^<(?:((https?|ftp|mailto):[^>]+)|(.*?@.*?\.[a-zA-Z]+))>/))?t[3]?[t[0].length,["link",{href:"mailto:"+t[3]},t[3]]]:"mailto"===t[2]?[t[0].length,["link",{href:t[1]},t[1].substr("mailto:".length)]]:[t[0].length,["link",{href:t[1]},t[1]]]:[1,"<"]},"`":function q(e){var t=e.match(/(`+)(([\s\S]*?)\1)/);return t&&t[2]?[t[1].length+t[2].length,["inlinecode",{"class":"code"+t[1].length.toString()},t[3]]]:[1,"`"]},"  \n":function z(){return[3,["linebreak"]]}},__convert_tree__:function(e){var t=b(e),r=this.references;switch(e[0]){case"header":e[0]="h"+e[1].level,delete e[1].level;break;case"bulletlist":e[0]="ul";break;case"numberlist":e[0]="ol";break;case"listitem":e[0]="li";break;case"para":e[0]="p";break;case"markdown":e[0]="html";break;case"code_block":e[0]="pre";var n=["code"],i=1;t&&(i=2,e[1].lineNumber&&(e[1]["class"]=e[1].lineNumber),e[1].codeType&&n.push({"class":e[1].codeType}),delete e[1].lineNumber,delete e[1].codeType),n.push.apply(n,e.splice(i,e.length-i)),e[i]=n;break;case"inlinecode":e[0]="code";break;case"img":e[1].src=e[1].href,delete e[1].href;break;case"linebreak":e[0]="br";break;case"link":e[0]="a";break;case"link_ref":e[0]="a";var s=r[t.ref];if(!s)return t.original;delete t.ref,t.href=s.href,s.title&&(t.title=s.title),delete t.original;break;case"img_ref":e[0]="img";var s=r[t.ref];if(!s)return t.original;delete t.ref,t.src=s.href,s.title&&(t.title=s.title),delete t.original}}};T.inline["**"]=p("strong","**"),T.inline.__=p("strong","__"),T.inline["*"]=p("em","*"),T.inline._=p("em","_"),T.inline_until_char=function(e,t){for(var r=0,n=[];;){if(e.charAt(r)===t)return r++,[r,n];if(r>=e.length)return null;var i=this.options.dialect.inline.__oneElement__.call(this,e.substr(r));r+=i[0],n.push.apply(n,i.slice(1))}},T.loop_reg_over_block=function(e,t,r){for(var n,i=t.valueOf();i.length&&(n=e.exec(i));)i=i.substr(n[0].length),r.call(this,n);return i},i.buildBlockOrder(T.block),i.buildInlineRegExp(T.inline),i.addDialect(T)}(this);
//# sourceMappingURL=./EgMd-1.0.3-min.js.map