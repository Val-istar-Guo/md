function Attr(){this.list={}}Attr.prototype.add=function(t,i){this.list[t]=i},Attr.prototype.rm=function(t){delete this.list[t]},Attr.prototype.get=function(t){return this.list[t]||null},Attr.prototype.forEach=function(t){var i;for(i in this.list)t.call(this,i,this.list[i])},Attr.prototype.clone=function(){};