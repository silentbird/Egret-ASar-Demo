class Grid extends egret.Sprite {
    public static TYPE_WALL: string = "wall";
    public static TYPE_ROLE: string = "role";
    public static TYPE_NULL: string = "null";
    private _type: string;
    private _grid: egret.Shape

    constructor(type: string = Grid.TYPE_NULL) {
        super();
        this._type = type;
        this.init();
    }

    private init() {
        this._grid = new egret.Shape();
        this.addChild(this._grid);
        this.type = this._type;
    }

    private get type(): string {
        return this._type;
    }

    private set type(type: string) {
        this._type = type;
        //制图
        this._grid.graphics.clear();
        var color: number;
        switch (type) {
            case Grid.TYPE_NULL:
                color = 0xFFFFFF;
                break;
            case Grid.TYPE_ROLE:
                color = 0xFF0000;
                break;
            case Grid.TYPE_WALL:
                color = 0x000000;
                break;
        }
        this._grid.graphics.beginFill(color);
        this._grid.graphics.lineStyle(2, 0x111111);
        this._grid.graphics.drawRect(0, 0, 20, 20);
        this._grid.graphics.endFill();
    }
}
