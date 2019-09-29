class MyScene extends eui.UILayer {
    constructor(parameters) {
        super();
        this.initView();
        this.initEvent();
    }

    private stageWidth: number = 860;
    private stageHeight: number = 460;
    private gridWidth: number = 20;
    private gridHeight: number = 20;
    private actStage: egret.Sprite;

    private initView() {
        this.drawBg();
        this.initAllGrid();
    }

    private initEvent() {
        this.actStage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (e: egret.TouchEvent) {
            egret.Point
        }, this);
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
        let row: number = this.stageHeight / this.gridHeight
        for (let i = 0; i < col; i++) {
            for (let j = 0; j < row; j++) {
                this.drawGridByXY(i, j);
            }
        }
    }

    private drawGridByXY(x: number, y: number): void {
        let grid: Grid = new Grid();
        this.actStage.addChild(grid);
        grid.x = x * this.gridWidth;
        grid.y = y * this.gridWidth;
    }
}