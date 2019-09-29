class MyScene extends eui.UILayer {

    /*****************数据******************/
    private _gridList = [];
    private _role: Grid;
    private _end: Grid;
    private _currentType: string = Grid.TYPE_NULL;

    /*****************界面*****************/
    private btnRole: eui.Button;
    private btnWall: eui.Button;
    private btnEnd: eui.Button;
    private actStage: egret.Sprite;
    /*************************************/
    constructor() {
        super();
        this.initView();
        this.initEvent();
    }

    private stageWidth: number = 860;
    private stageHeight: number = 460;
    private gridWidth: number = 20;
    private gridHeight: number = 20;

    private initView() {
        this.drawBg();
        this.initAllGrid();

        let base = this;
        this.btnWall = this.createBtn("wall", function (e: egret.TouchEvent) {
            base._currentType = Grid.TYPE_WALL;
        });
        this.btnWall.x = 60;
        this.btnWall.y = 520;

        this.btnRole = this.createBtn("role", function (e: egret.TouchEvent) {
            base._currentType = Grid.TYPE_ROLE;
        });
        this.btnRole.x = 360;
        this.btnRole.y = 520;

        this.btnEnd = this.createBtn("end", function (e: egret.TouchEvent) {
            base._currentType = Grid.TYPE_END;
        });
        this.btnEnd.x = 660;
        this.btnEnd.y = 520;

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
        var colorFlilter = new egret.ColorMatrixFilter(bool ? grayMatrix : sourceMatrix);
        btn.enabled = bool;
        btn.filters = [colorFlilter];
    }

    private initEvent() {
        this._currentType = Grid.TYPE_NULL;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onStageClick, this);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onStageClick, this);
    }

    private onStageClick(e: egret.TouchEvent) {
        var x: number = Math.floor((e.stageX - this.actStage.x) / this.gridWidth);
        var y: number = Math.floor((e.stageY - this.actStage.y) / this.gridWidth);
        if (x >= 0 && x < this._gridList.length
            && y >= 0 && y < this._gridList[x].length) {
            this._gridList[x][y].type = this._currentType;
            switch (this._currentType) {
                case Grid.TYPE_ROLE:
                    this._role = this._gridList[x][y];
                    this.setBtnEnabled(this.btnRole, false);
                    this._currentType = Grid.TYPE_NULL;
                    break;
                case Grid.TYPE_END:
                    this._end = this._gridList[x][y];
                    this.setBtnEnabled(this.btnEnd, false);
                    this._currentType = Grid.TYPE_NULL;
                    break;
                default:
                    break;
            }
        }
    }


    private drawBg(): void {
        //主舞台
        this.actStage = new egret.Sprite();
        this.addChild(this.actStage);
        this.actStage.x = (960 - this.stageWidth) / 2;
        this.actStage.y = (560 - this.stageHeight) / 2

        //bg
        var bg: egret.Shape = new egret.Shape();
        bg.graphics.beginFill(0x808080);
        bg.graphics.lineStyle(10, 0x220000);
        bg.graphics.drawRect(0, 0, this.stageWidth, this.stageHeight);
        bg.graphics.endFill();
        this.actStage.addChild(bg);
    }

    private initAllGrid(): void {
        let col: number = this.stageWidth / this.gridWidth;
        let row: number = this.stageHeight / this.gridHeight;
        for (let i = 0; i < col; i++) {
            var tmp = [];
            for (let j = 0; j < row; j++) {
                tmp.push(this.drawGridByXY(i, j));
            }
            this._gridList.push(tmp);
        }
    }
    /***********方法************ */

    /**
     * 创建按钮 eui.Button
     * @param name 按钮名字
     * @param fun 按钮回调
     * @return 返回这个按钮
     */
    private createBtn(name: string, fun: Function): eui.Button {
        let button = new eui.Button();
        button.label = name;
        button.width = 80;
        button.height = 40;
        this.addChild(button);
        button.addEventListener(egret.TouchEvent.TOUCH_TAP, fun, this);
        return button;
    }

    /**
     * 根据X、Y画出这个格子
     * @param x y
     * @param fun 按钮回调
     * @return 返回这个按钮
     */
    private drawGridByXY(x: number, y: number, type: string = Grid.TYPE_NULL): Grid {
        let grid: Grid = new Grid(type);
        this.actStage.addChild(grid);
        grid.x = x * this.gridWidth;
        grid.y = y * this.gridWidth;
        return grid;
    }
}