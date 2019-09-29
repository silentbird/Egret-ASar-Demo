class Grid extends egret.Sprite {
    public static TYPE_WALL: string = "wall";
    public static TYPE_ROLE: string = "role";
    public static TYPE_END: string = "end";
    public static TYPE_NULL: string = "nll";
    private _type: string;
    private _grid: egret.Shape;

    constructor(type: string = Grid.TYPE_NULL) {
        super();
        this.init();
    }

    private init() {
        this._grid = new egret.Shape();
        this.addChild(this._grid);
        this.type = Grid.TYPE_NULL;
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
        this._grid.graphics.drawRect(0, 0, 20, 20);
        this._grid.graphics.endFill();
    }
}
