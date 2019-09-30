class Grid extends egret.Sprite {
    public static TYPE_WALL: string = "wall";
    public static TYPE_ROLE: string = "role";
    public static TYPE_END: string = "end";
    public static TYPE_NULL: string = "nll";
    private _w: number;
    private _h: number;
    private _type: string;
    private _grid: egret.Shape;
    public col: number;
    public row: number;
    private labelList: Array<egret.TextField>;
    private data: Data;
    public node: Grid;
    constructor(w: number, h: number, type: string = Grid.TYPE_NULL) {
        super();
        this.data = Data.ins;
        this._w = w;
        this._h = h;
        this.init();
    }

    private init() {
        this._grid = new egret.Shape();
        this.addChild(this._grid);
        this.type = Grid.TYPE_NULL;
    }


    public setData() {
        this.node = this.data.PathList.length > 0 ? this.data.PathList[this.data.PathList.length - 1] : this.data.role;
        this.labelList = new Array<egret.TextField>();
        for (let index = 0; index < 3; index++) {
            let label: egret.TextField = new egret.TextField();
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
    }

    public get type(): string {
        return this._type;
    }

    public set type(_type: string) {
        if (this.type == _type) {
            return;
        }
        this._type = _type;
        //制图
        this._grid.graphics.clear();
        var color: number;
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
    }

    public get F(): number {
        let g: number = this.G;
        let h: number = this.H;
        return g + h;
    }

    private _G: number;
    public get G(): number {
        if (this._G) {
            return this._G;
        }
        if (this == this.data.role) {
            return 0;
        }
        if (this.node.col != this.col && this.node.row != this.row) {
            this.G = this.node.G + 14;
        } else {
            this.G = this.node.G + 10;
        }
        return this._G;
    }
    public set G(g: number) {
        this._G = g;
    }

    public get H(): number {
        return (Math.abs(this.data.end.col - this.col) + Math.abs(this.data.end.row - this.row)) * 10;
    }
}
