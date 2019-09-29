class MyScene extends eui.UILayer {
    constructor(parameters) {
        super();
        this.initView();
    }

    private initView() {
        this.drawBg();
        this.drawGrid();
    }

    private drawBg() {
        var bg: egret.Shape = new egret.Shape();
        bg.graphics.beginFill(0x808080);
        bg.graphics.drawRect(0, 0, 960, 560);
        bg.graphics.endFill();
        this.addChild(bg);
    }

    private drawGrid() {
        
    }
}