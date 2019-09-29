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
        this.actStage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (e) {
            e.stageX;
        }, this);
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
            for (var j = 0; j < row; j++) {
                this.drawGridByXY(i, j);
            }
        }
    };
    MyScene.prototype.drawGridByXY = function (x, y) {
        var grid = new Grid();
        this.actStage.addChild(grid);
        grid.x = x * this.gridWidth;
        grid.y = y * this.gridWidth;
    };
    return MyScene;
}(eui.UILayer));
__reflect(MyScene.prototype, "MyScene");
//# sourceMappingURL=MyScene.js.map