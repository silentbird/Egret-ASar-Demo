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
    function Grid(w, h, type) {
        if (type === void 0) { type = Grid.TYPE_NULL; }
        var _this = _super.call(this) || this;
        _this.data = Data.ins;
        _this._w = w;
        _this._h = h;
        _this.init();
        return _this;
    }
    Grid.prototype.init = function () {
        this._grid = new egret.Shape();
        this.addChild(this._grid);
        this.type = Grid.TYPE_NULL;
    };
    Grid.prototype.setData = function () {
        this.node = this.data.PathList.length > 0 ? this.data.PathList[this.data.PathList.length - 1] : this.data.role;
        this.labelList = new Array();
        for (var index = 0; index < 3; index++) {
            var label = new egret.TextField();
            this.addChild(label);
            label.textColor = 0x000000;
            label.size = this.width / 4;
            label.bold = true;
            this.labelList.push(label);
        }
        this.labelList[0].x = this.labelList[0].y = this.labelList[1].x = 4;
        this.labelList[1].y = this.labelList[2].x = this.labelList[2].y = this.width / 2;
        this.labelList[0].text = this.F + "";
        this.labelList[1].text = this.G + "";
        this.labelList[2].text = this.H + "";
    };
    Object.defineProperty(Grid.prototype, "type", {
        get: function () {
            return this._type;
        },
        set: function (_type) {
            if (this.type == _type) {
                return;
            }
            this._type = _type;
            //制图
            this._grid.graphics.clear();
            var color;
            switch (_type) {
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
            this._grid.graphics.drawRect(0, 0, this._w, this._h);
            this._grid.graphics.endFill();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Grid.prototype, "F", {
        get: function () {
            var g = this.G;
            var h = this.H;
            return g + h;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Grid.prototype, "G", {
        get: function () {
            if (this._G) {
                return this._G;
            }
            if (this == this.data.role) {
                return 0;
            }
            if (this.node.col != this.col && this.node.row != this.row) {
                this.G = this.node.G + 14;
            }
            else {
                this.G = this.node.G + 10;
            }
            return this._G;
        },
        set: function (g) {
            this._G = g;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Grid.prototype, "H", {
        get: function () {
            return (Math.abs(this.data.end.col - this.col) + Math.abs(this.data.end.row - this.row)) * 10;
        },
        enumerable: true,
        configurable: true
    });
    Grid.TYPE_WALL = "wall";
    Grid.TYPE_ROLE = "role";
    Grid.TYPE_END = "end";
    Grid.TYPE_NULL = "nll";
    return Grid;
}(egret.Sprite));
__reflect(Grid.prototype, "Grid");
//# sourceMappingURL=Grid.js.map