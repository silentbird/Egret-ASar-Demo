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
    /*****************界面*****************/
    /*************************************/
    function MyScene() {
        var _this = _super.call(this) || this;
        /*****************数据******************/
        _this._gridList = [];
        _this._currentType = Grid.TYPE_NULL;
        _this.stageWidth = 860;
        _this.stageHeight = 460;
        _this.gridWidth = 20;
        _this.gridHeight = 20;
        _this.initView();
        _this.initEvent();
        return _this;
    }
    MyScene.prototype.initView = function () {
        var btnWall = this.createBtn("wall", function (e) {
        });
        var btnRole = this.createBtn("role", function (e) {
        });
        var btnEnd = this.createBtn("end", function (e) {
        });
        this.drawBg();
        this.initAllGrid();
    };
    MyScene.prototype.initEvent = function () {
        this._currentType = Grid.TYPE_NULL;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.changeType, this);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.changeType, this);
    };
    MyScene.prototype.changeType = function (e) {
        var x = Math.floor((e.stageX - this.actStage.x) / this.gridWidth);
        var y = Math.floor((e.stageY - this.actStage.y) / this.gridWidth);
        if (x >= 0 && x < this._gridList.length
            && y >= 0 && y < this._gridList[x].length) {
            this._gridList[x][y].type = this._currentType;
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
    /***********方法************ */
    /**
     * 创建按钮 eui.Button
     * @param name 按钮名字
     * @param fun 按钮回调
     * @return 返回这个按钮
     */
    MyScene.prototype.createBtn = function (name, fun) {
        var button = new eui.Button();
        button.label = name;
        button.horizontalCenter = 0;
        button.verticalCenter = 0;
        this.addChild(button);
        button.addEventListener(egret.TouchEvent.TOUCH_TAP, fun, this);
        return button;
    };
    /**
     * 根据X、Y画出这个格子
     * @param x y
     * @param fun 按钮回调
     * @return 返回这个按钮
     */
    MyScene.prototype.drawGridByXY = function (x, y, type) {
        if (type === void 0) { type = Grid.TYPE_NULL; }
        var grid = new Grid(type);
        this.actStage.addChild(grid);
        grid.x = x * this.gridWidth;
        grid.y = y * this.gridWidth;
        return grid;
    };
    return MyScene;
}(eui.UILayer));
__reflect(MyScene.prototype, "MyScene");
//# sourceMappingURL=MyScene.js.map