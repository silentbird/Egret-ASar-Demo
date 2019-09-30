class View extends eui.UILayer {

    /*****************数据******************/
    private _gridList = [];

    private _currentType: string = Grid.TYPE_NULL;
    private data: Data;
    /*****************界面*****************/
    private btnRole: eui.Button;
    private btnWall: eui.Button;
    private btnEnd: eui.Button;
    private btnStart: eui.Button;
    private actStage: egret.Sprite;
    /*************************************/
    constructor() {
        super();
        this.data = Data.ins;
        this.data.manager.addChild(this);
        this.initView();
        this.initEvent();
    }

    private initView() {
        this.drawBg();
        this.initAllGrid();

        let base = this;
        this.btnWall = this.createBtn("wall", function (e: egret.TouchEvent) {
            base._currentType = Grid.TYPE_WALL;
        }, this);
        this.btnWall.x = 60;
        this.btnWall.y = 520;

        this.btnRole = this.createBtn("role", function (e: egret.TouchEvent) {
            base._currentType = Grid.TYPE_ROLE;
        }, this);
        this.btnRole.x = 320;
        this.btnRole.y = 520;

        this.btnEnd = this.createBtn("end", function (e: egret.TouchEvent) {
            base._currentType = Grid.TYPE_END;
        }, this);
        this.btnEnd.x = 560;
        this.btnEnd.y = 520;

        this.btnStart = this.createBtn("start", this.data.manager.startSearch, this.data.manager);
        this.btnStart.x = 800;
        this.btnStart.y = 520;
        this.setBtnEnabled(this.btnStart, false);
    }

    private initEvent() {
        this._currentType = Grid.TYPE_NULL;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onStageClick, this);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onStageOver, this);
    }

    private onStageOver(e: egret.TouchEvent) {
        if (this._currentType == Grid.TYPE_ROLE || this._currentType == Grid.TYPE_END) {
            return;
        }
        var x: number = Math.floor((e.stageX - this.actStage.x) / Data.GridWidth);
        var y: number = Math.floor((e.stageY - this.actStage.y) / Data.GridWidth);
        if (x >= 0 && x < this.data.AllGrid.length
            && y >= 0 && y < this.data.AllGrid[x].length) {
            this.data.AllGrid[x][y].type = this._currentType;
        }
    }

    private onStageClick(e: egret.TouchEvent) {
        var x: number = Math.floor((e.stageX - this.actStage.x) / Data.GridWidth);
        var y: number = Math.floor((e.stageY - this.actStage.y) / Data.GridWidth);
        if (this.data.isInMap(x, y)) {
            if (this.data.role && this.data.end) {
                this.setBtnEnabled(this.btnStart, true);
            } else {
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
    }

    public removeEvents() {
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onStageClick, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onStageOver, this);
    }

    private drawBg(): void {
        //主舞台
        this.actStage = new egret.Sprite();
        this.addChild(this.actStage);
        this.actStage.x = (960 - Data.StageWidth) / 2;
        this.actStage.y = (560 - Data.StageHeight) / 2

        //bg
        var bg: egret.Shape = new egret.Shape();
        bg.graphics.beginFill(0x808080);
        bg.graphics.lineStyle(10, 0x220000);
        bg.graphics.drawRect(0, 0, Data.StageWidth, Data.StageHeight);
        bg.graphics.endFill();
        this.actStage.addChild(bg);
    }

    private initAllGrid(): void {
        let col: number = Data.StageWidth / Data.GridWidth;
        let row: number = Data.StageHeight / Data.GridHeight;
        for (let i = 0; i < col; i++) {
            var tmp = Array<Grid>();
            for (let j = 0; j < row; j++) {
                tmp.push(this.drawGridByXY(i, j));
            }
            this.data.AllGrid.push(tmp);
        }
    }
    /***********方法************ */

    /**
     * 创建按钮 eui.Button
     * @param name 按钮名字
     * @param fun 按钮回调
     * @return 返回这个按钮
     */
    private createBtn(name: string, fun: Function, funcCaller: any): eui.Button {
        let button = new eui.Button();
        button.label = name;
        button.width = 80;
        button.height = 40;
        this.addChild(button);
        button.addEventListener(egret.TouchEvent.TOUCH_TAP, fun, funcCaller);
        return button;
    }

    /**
     * 根据X、Y画出这个格子
     * @param x y
     * @param fun 按钮回调
     * @return 返回这个按钮
     */
    private drawGridByXY(x: number, y: number, type: string = Grid.TYPE_NULL): Grid {
        let grid: Grid = new Grid(Data.GridWidth, Data.GridHeight, type);
        this.actStage.addChild(grid);
        grid.x = x * Data.GridWidth;
        grid.y = y * Data.GridWidth;
        grid.col = x;
        grid.row = y;
        return grid;
    }

    private setBtnEnabled(btn: eui.Button, bool: boolean): void {
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
    }
}