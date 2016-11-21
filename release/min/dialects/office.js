Md.extend("syntax/block",function(n){function t(){this.lib=[]}var e=n("node");return t.prototype.extend=function(n){this.lib.push(n)},t.prototype.parse=function(n){var t,i=[n],r=null,l=this.lib.length,s=null,a=new e;do for(n=i.pop(),t=0;t<l;t++){if(r=[],s=this.lib[t].parse(n,r),r.length&&(r.reverse(),i.push.apply(i,r)),s){a.appendChild(s);break}r.length&&(n=i.pop())}while(i.length);return a},t.expend=function(n){expendGrammars.push(n)},t}),Md.extend("syntax/inline",function(n){function t(){this.lib=[]}var e=n("node");return t.prototype.extend=function(n){this.lib.push(n)},t.prototype.parse=function(n){var t,i=[n],r=null,l=this.lib.length,s=null,a=new e;do for(n=i.pop(),t=0;t<l;t++){if(r=[],s=this.lib[t].parse(n,r),r.length&&(r.reverse(),i.push.apply(i,r)),s){a.appendChild(s);break}r.length&&(n=i.pop())}while(i.length);return a},t}),Md.extend("syntax/combin-block",function(n){function t(n){this.block=n.getSyntax("block"),this.block.extend(this)}var e=n("node");return t.prototype.parse=function(n){var t=n.split(/(?:^\s*\n)/m),i=this;return t.length>1?function(){for(var n=new e,r=0,l=t.length;r<l;r++)n.appendChild(i.block.parse(t[r]));return n}():null},t}),Md.extend("syntax/blockquote",function(n){function t(n){this.block=n.getSyntax("block"),this.block.extend(this)}var e=n("node");return t.prototype.parse=function(n,t){var i=n.match(/^(?:>\s*.*[\n$])+/m),r=null;return i?i.index?(t.push(n.substring(0,i.index)),t.push(i[0]),t.push(n.substr(i.index+i[0].length)),null):(i[0].length<n.length&&t.push(n.substr(i[0].length)),r=i[0].replace(/^>[ \f\r\t\v]*/gm,""),new e("blockquote").appendChild(this.block.parse(r))):null},t}),Md.extend("syntax/atx-header",function(n){function t(n){var t=n.getSyntax("block");t.extend(this),this.inline=n.getSyntax("inline")}var e=n("node"),i=/^(#{1,6})\s*(.*?)\s*#*\s*(?:\n|$)/;return t.prototype.parse=function(n,t){if(!i.test(n))return null;var r=n.match(i),l=new e("h"+r[1].length);return l.appendChild(this.inline.parse(r[2])),r[0].length<n.length&&t.push(n.substr(r[0].length)),l},t}),Md.extend("syntax/setext-header",function(n){function t(n){block=n.getSyntax("block"),block.extend(this),this.inline=n.getSyntax("inline")}var e=n("node");return t.prototype.parse=function(n,t){var i=/^(.*)\n([-=])\2\2+(?:\n|$)/,r=null,l="",s=null;return i.test(n)?(r=n.match(i),l="="===r[2]?"h1":"h2",s=new e(l),s.appendChild(this.inline.parse(r[1])),r[0].length<n.length&&t.push(n.substr(r[0].length)),s):null},t}),Md.extend("syntax/table",function(n){function t(n){var t=n.getSyntax("block");t.extend(this),this.inline=n.getSyntax("inline")}function e(n,t,e){var s=new l("table");return s.appendChild(i.call(this,n,t)).appendChild(r.call(this,e,t)),s}function i(n,t){var e=new l("tr"),i=null;return n.forEach(function(n,r){i=this.inline.parse(n),i=new l("th").appendChild(i),i.attr("align",t[r]),t[r]&&i.attr("align",t[r]),e.appendChild(i)},this),new l("thead").appendChild(e)}function r(n,t){var e=new l("tr"),i=null,r=new l("tbody");return n.forEach(function(n){e=new l("tr"),n.forEach(function(n,r){i=new l("td").appendChild(this.inline.parse(n)),t[r]&&i.attr("align",t[r]),e.appendChild(i)},this),r.appendChild(e)},this),r}var l=n("node");return t.prototype.parse=function(n,t){function i(n){return n.replace(/^\s*\|/,"").replace(/\s*$/,"").replace(/\|$/,"")}var r,l,s,a=/^ {0,3}((?:(?:\|\s*\S[^\|\n]*)+\|?)|(?:(?:\|\s*)?\S[^\|\n]*(?:(?:\|[^\|\n]+)+\|?|\|)))\n {0,3}((?:(?:\|\s*(?::\s*)?-[-\s]*(?::\s*)?)+\|?)|(?:(?:\|\s*)?(?::\s*)?-[-\s]*(?::\s*)?(?:(?:\|(?::\s*)?-[-\s]*(?::\s*)?)+\|?|\|)))\n((?: {0,3}(?:(?:(?:\|\s*\S[^\|\n]*)+\|?)|(?:(?:\|\s*)?\S[^\|\n]*(?:(?:\|[^\|\n]+)+\|?|\|)))(?:\n|$))+)/,u=n.match(a);return u?(r=i(u[1]).split("|"),l=i(u[2]).split("|").map(function(n){var t=n.match(/\s*(:)?[-\s]+(:)?/);return t[1]&&t[2]?"center":t[1]?"left":t[2]?"right":null}),s=i(u[3]).split("\n").map(function(n){return i(n).split("|")}),e.call(this,r,l,s)):null},t}),Md.extend("syntax/list",function(n){function t(n){var t=n.getSyntax("block");t.extend(this),this.inline=n.getSyntax("inline")}function e(n,t){return n.replace(/(?: {0,3}\\t| {4})/,"\t").length}function i(n,t,l,s){function a(n,e){c=new r("li").appendChild(n),t=e}for(var u,h=n.length,p=new r("ul"),o=/^(\s*)([*+-]|\\d+\\.)[ \t]+(.*)/,d=null,c=null;t<h;t++){if(d=n[t].match(o),u=e(d[1]),u>l)i.call(this,n,t,l+1,a);else{if(u<l)break;c=this.inline.parse(d[3]),c=new r("li").appendChild(c)}p.appendChild(c)}s(p,t)}var r=n("node");return t.prototype.parse=function(n,t){var e,r=n.match(/^(?: *(?:[*+-]|\\d+\\.)[ \t]+.*(\n|$))+/),l=null;return r?(r[0].length<n.length&&t.push(n.substr(r[0].length)),l=r[0].split("\n"),""===l[l.length-1]&&l.pop(),i.call(this,l,0,0,function(n){e=n}),e):null},t}),Md.extend("syntax/code",function(n){function t(n){var t=n.getSyntax("block");t.extend(this)}var e=n("node"),i=n("text-node");return t.prototype.parse=function(n,t){var r=/^(?: {0,3}\t| {4})(.*)\n?/gm,l=/\s*\[(.*?)\](?:\s*\[(.*?)\])?[ \t]*/,s=[],a=null,u={language:null,lineNum:0},h=null,p=0;if(!/^(?: {0,3}\t| {4})(.*)/.test(n))return null;for(a=r.exec(n);a;a=r.exec(n))s.push(a[1]),p=r.lastIndex;return p<n.length&&t.push(n.substr(p)),a=l.exec(s[0]),a&&(s.shift(),a[1]&&(u.language=a[1]),a[2]&&(u.lineNum=a[2])),h=new e("pre").appendChild(new e("code").appendChild(new i(s.join("\n"))))},t}),Md.extend("syntax/horiz-line",function(n){function t(n){var t=n.getSyntax("block");t.extend(this)}var e=n("node"),i={dash:"dash",underline:"underline",asterisk:"asterisk"};return t.prototype.parse=function(n,t){var r=/^(?:([\s\S]*?)\n)?[ \t]*(([-_*])(?:[ \t]*\3){2,})[ \t]*(?:\n([\s\S]*))?$/,l=n.match(r),s=null;if(!l)return null;if(l[1])return t.push(l[1]),t.push(l[2]),l[4]&&t.push(l[4]),null;switch(s=new e("hr"),l[3]){case"-":s.attr("class",i.dash);break;case"_":s.attr("class",i.underline);break;case"*":s.attr("class",i.asteris)}return l[4]&&t.push(l[4]),s},t}),Md.extend("syntax/paragraph",function(n){function t(n){block=n.getSyntax("block"),block.extend(this),this.inline=n.getSyntax("inline")}var e=n("node");return t.prototype.parse=function(n){var t=new e("p");return t.appendChild(this.inline.parse(n)),t},t}),Md.extend("syntax/image",function(n){function t(n){var t=n.getSyntax("inline");t.extend(this)}var e=n("node");return t.prototype.parse=function(n,t){var i=/!\[\s*(\S*)\s*\]\(\s*(\S*)\s*(?:(["'])(\S*)\3)?\)/,r=n.match(i),l=null;return r?r.index?(t.push(n.substring(0,r.index)),t.push(r[0]),t.push(n.substr(r.index+r[0].length)),null):(r[0].length<n.length&&t.push(n.substr(r[0].length)),l=new e("img"),l.attr("alt",r[1]).attr("src",r[2]),r[4]&&l.attr("title","reg[4]"),l):null},t}),Md.extend("syntax/hyperlink",function(n){function t(n){var t=n.getSyntax("inline");t.extend(this)}var e=n("node"),i=n("text-node");return t.prototype.parse=function(n,t){var r=/\[\s*(\S*)\s*\]\(\s*(\S*)\s*(?:(["'])(\S*)\3)?\)/,l=n.match(r),s=null;return l?l.index?(t.push(n.substring(0,l.index)),t.push(l[0]),t.push(n.substr(l.index+l[0].length)),null):(l[0].length<n.length&&t.push(n.substr(l[0].length)),s=new e("a"),s.appendChild(new i(l[1])),s.attr("href",l[2]),l[4]&&s.attr("title",l[4]),s):null},t}),Md.extend("syntax/escaped",function(n){function t(n){var t=n.getSyntax("inline");t.extend(this)}var e=n("text-node");return t.prototype.parse=function(n,t){var i=/\\([\\`\*_{}\[\]()#\+.!\-])/,r=i.exec(n);return i.test(n)?0===r.index?(t.push(n.substr(r[0].length)),new e(r[1])):(t.push(n.substring(0,r.index)),t.push(n.substr(r.index)),null):null},t}),Md.extend("syntax/inline-plain-text",function(n){function t(n){var t=n.getSyntax("inline");t.extend(this)}var e=n("text-node");return t.prototype.parse=function(n){return new e(n)},t}),Md.extend("dialects/office",function(n){var t=n("dialect-builder");return(new t).setSyntax(["block","inline","combin-block","blockquote","atx-header","setext-header","table","list","code","horiz-line","paragraph","image","hyperlink","escaped","inline-plain-text"]).build()});