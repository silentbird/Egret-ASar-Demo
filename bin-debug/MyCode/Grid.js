var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var Grid = (function (_super) {
    __extends(Grid, _super);
    function Grid(type) {
        if (type === void 0) { type = Grid.TYPE_NULL; }
        var _this = _super.call(this) || this;
        _this._type = type;
        _this.init();
        return _this;
    }
    Grid.prototype.init = function () {
        this._grid = new egret.Shape();
        this.addChild(this._grid);
        this.type = this._type;
    };
    Object.defineProperty(Grid.prototype, "type", {
        get: function () {
            return this._type;
        },
        set: function (type) {
            this._type = type;
            //制图
            this._grid.graphics.clear();
            var color;
            switch (type) {
                case Grid.TYPE_NULL:
                    color = 0xFFFFFF;
                    break;
                case Grid.TYPE_ROLE:
                    color = 0xFF0000;
                    break;
                case Grid.TYPE_WALL:
                    color = 0x000000;
                    break;
                case Grid.TYPE_END:
                    color = 0x000080;
                    break;
            }
            this._grid.graphics.beginFill(color);
            this._grid.graphics.lineStyle(2, 0x111111);
            this._grid.graphics.drawRect(0, 0, 20, 20);
            this._grid.graphics.endFill();
        },
        enumerable: true,
        configurable: true
    });
    Grid.TYPE_WALL = "wall";
    Grid.TYPE_ROLE = "role";
    Grid.TYPE_END = "end";
    Grid.TYPE_NULL = "null";
    return Grid;
}(egret.Sprite));
__reflect(Grid.prototype, "Grid");
//# sourceMappingURL=Grid.js.map