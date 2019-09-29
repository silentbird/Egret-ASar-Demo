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
var MyScene = (function (_super) {
    __extends(MyScene, _super);
    function MyScene(parameters) {
        var _this = _super.call(this) || this;
        _this._gridList = [];
        _this.stageWidth = 860;
        _this.stageHeight = 460;
        _this.gridWidth = 20;
        _this.gridHeight = 20;
        _this.initView();
        _this.initEvent();
        return _this;
    }
    MyScene.prototype.initView = function () {
        this.drawBg();
        this.initAllGrid();
    };
    MyScene.prototype.initEvent = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.changeType, this);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.changeType, this);
    };
    MyScene.prototype.changeType = function (e) {
        var x = Math.floor((e.stageX - this.actStage.x) / this.gridWidth);
        var y = Math.floor((e.stageY - this.actStage.y) / this.gridWidth);
        if (x >= 0 && x < this._gridList.length
            && y >= 0 && y < this._gridList[x].length) {
            this._gridList[x][y].type = Grid.TYPE_WALL;
        }
    };
    MyScene.prototype.drawBg = function () {
        //主舞台
        this.actStage = new egret.Sprite();
        this.addChild(this.actStage);
        this.actStage.x = (960 - this.stageWidth) / 2;
        this.actStage.y = (560 - this.stageHeight) / 2;
        //bg
        var bg = new egret.Shape();
        bg.graphics.beginFill(0x808080);
        bg.graphics.lineStyle(10, 0x220000);
        bg.graphics.drawRect(0, 0, this.stageWidth, this.stageHeight);
        bg.graphics.endFill();
        this.actStage.addChild(bg);
    };
    MyScene.prototype.initAllGrid = function () {
        var col = this.stageWidth / this.gridWidth;
        var row = this.stageHeight / this.gridHeight;
        for (var i = 0; i < col; i++) {
            var tmp = [];
            for (var j = 0; j < row; j++) {
                tmp.push(this.drawGridByXY(i, j));
            }
            this._gridList.push(tmp);
        }
    };
    MyScene.prototype.drawGridByXY = function (x, y, type) {
        if (type === void 0) { type = Grid.TYPE_NULL; }
        var grid = new Grid(type);
        this.actStage.addChild(grid);
        grid.x = x * this.gridWidth;
        grid.y = y * this.gridWidth;
        return grid;
    };
    MyScene.prototype.getXYByStagePoint = function (x, y) {
        var pos = new egret.Point();
        if (x - this.actStage.x) {
        }
        return pos;
    };
    return MyScene;
}(eui.UILayer));
__reflect(MyScene.prototype, "MyScene");
//# sourceMappingURL=MyScene.js.map