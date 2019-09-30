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
var View = (function (_super) {
    __extends(View, _super);
    /*************************************/
    function View() {
        var _this = _super.call(this) || this;
        /*****************数据******************/
        _this._gridList = [];
        _this._currentType = Grid.TYPE_NULL;
        _this.data = Data.ins;
        _this.data.manager.addChild(_this);
        _this.initView();
        _this.initEvent();
        return _this;
    }
    View.prototype.initView = function () {
        this.drawBg();
        this.initAllGrid();
        var base = this;
        this.btnWall = this.createBtn("wall", function (e) {
            base._currentType = Grid.TYPE_WALL;
        }, this);
        this.btnWall.x = 60;
        this.btnWall.y = 520;
        this.btnRole = this.createBtn("role", function (e) {
            base._currentType = Grid.TYPE_ROLE;
        }, this);
        this.btnRole.x = 320;
        this.btnRole.y = 520;
        this.btnEnd = this.createBtn("end", function (e) {
            base._currentType = Grid.TYPE_END;
        }, this);
        this.btnEnd.x = 560;
        this.btnEnd.y = 520;
        this.btnStart = this.createBtn("start", this.data.manager.startSearch, this.data.manager);
        this.btnStart.x = 800;
        this.btnStart.y = 520;
        this.setBtnEnabled(this.btnStart, false);
    };
    View.prototype.initEvent = function () {
        this._currentType = Grid.TYPE_NULL;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onStageClick, this);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onStageOver, this);
    };
    View.prototype.onStageOver = function (e) {
        if (this._currentType == Grid.TYPE_ROLE || this._currentType == Grid.TYPE_END) {
            return;
        }
        var x = Math.floor((e.stageX - this.actStage.x) / Data.GridWidth);
        var y = Math.floor((e.stageY - this.actStage.y) / Data.GridWidth);
        if (x >= 0 && x < this.data.AllGrid.length
            && y >= 0 && y < this.data.AllGrid[x].length) {
            this.data.AllGrid[x][y].type = this._currentType;
        }
    };
    View.prototype.onStageClick = function (e) {
        var x = Math.floor((e.stageX - this.actStage.x) / Data.GridWidth);
        var y = Math.floor((e.stageY - this.actStage.y) / Data.GridWidth);
        if (this.data.isInMap(x, y)) {
            if (this.data.role && this.data.end) {
                this.setBtnEnabled(this.btnStart, true);
            }
            else {
                this.setBtnEnabled(this.btnStart, false);
            }
            switch (this._currentType) {
                case Grid.TYPE_ROLE:
                    if (this.data.role) {
                        return;
                    }
                    this.data.role = this.data.AllGrid[x][y];
                    this.setBtnEnabled(this.btnRole, false);
                    break;
                case Grid.TYPE_END:
                    if (this.data.end) {
                        return;
                    }
                    this.data.end = this.data.AllGrid[x][y];
                    this.setBtnEnabled(this.btnEnd, false);
                    break;
                default:
                    break;
            }
            this.data.AllGrid[x][y].type = this._currentType;
        }
    };
    View.prototype.removeEvents = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onStageClick, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onStageOver, this);
    };
    View.prototype.drawBg = function () {
        //主舞台
        this.actStage = new egret.Sprite();
        this.addChild(this.actStage);
        this.actStage.x = (960 - Data.StageWidth) / 2;
        this.actStage.y = (560 - Data.StageHeight) / 2;
        //bg
        var bg = new egret.Shape();
        bg.graphics.beginFill(0x808080);
        bg.graphics.lineStyle(10, 0x220000);
        bg.graphics.drawRect(0, 0, Data.StageWidth, Data.StageHeight);
        bg.graphics.endFill();
        this.actStage.addChild(bg);
    };
    View.prototype.initAllGrid = function () {
        var col = Data.StageWidth / Data.GridWidth;
        var row = Data.StageHeight / Data.GridHeight;
        for (var i = 0; i < col; i++) {
            var tmp = Array();
            for (var j = 0; j < row; j++) {
                tmp.push(this.drawGridByXY(i, j));
            }
            this.data.AllGrid.push(tmp);
        }
    };
    /***********方法************ */
    /**
     * 创建按钮 eui.Button
     * @param name 按钮名字
     * @param fun 按钮回调
     * @return 返回这个按钮
     */
    View.prototype.createBtn = function (name, fun, funcCaller) {
        var button = new eui.Button();
        button.label = name;
        button.width = 80;
        button.height = 40;
        this.addChild(button);
        button.addEventListener(egret.TouchEvent.TOUCH_TAP, fun, funcCaller);
        return button;
    };
    /**
     * 根据X、Y画出这个格子
     * @param x y
     * @param fun 按钮回调
     * @return 返回这个按钮
     */
    View.prototype.drawGridByXY = function (x, y, type) {
        if (type === void 0) { type = Grid.TYPE_NULL; }
        var grid = new Grid(Data.GridWidth, Data.GridHeight, type);
        this.actStage.addChild(grid);
        grid.x = x * Data.GridWidth;
        grid.y = y * Data.GridWidth;
        grid.col = x;
        grid.row = y;
        return grid;
    };
    View.prototype.setBtnEnabled = function (btn, bool) {
        var grayMatrix = [
            0.3, 0.6, 0, 0, 0,
            0.3, 0.6, 0, 0, 0,
            0.3, 0.6, 0, 0, 0,
            0, 0, 0, 1, 0
        ];
        var sourceMatrix = [
            1, 0, 0, 0, 0,
            0, 1, 0, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 0, 1, 0
        ];
        var colorFlilter = new egret.ColorMatrixFilter(bool ? sourceMatrix : grayMatrix);
        btn.enabled = bool;
        btn.filters = [colorFlilter];
    };
    return View;
}(eui.UILayer));
__reflect(View.prototype, "View");
//# sourceMappingURL=View.js.map