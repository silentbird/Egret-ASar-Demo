class Data {
    public manager: Manager;
    //界面大小
    public static StageWidth: number = 800;
    public static StageHeight: number = 400;
    public static GridWidth: number = 80;
    public static GridHeight: number = 80;
    public role: Grid;
    public end: Grid;
    public OpenList: Array<Grid>;
    public CloseList: Array<Grid>;
    public PathList: Array<Grid>;
    public AllGrid: Array<Array<Grid>>;
    public isStartSearch: boolean;
    constructor() {
        this.OpenList = new Array<Grid>();
        this.CloseList = new Array<Grid>();
        this.PathList = new Array<Grid>();
        this.AllGrid = new Array<Array<Grid>>();
    }

    //检查是否在地图内
    public isInMap(x: number, y: number) {
        return x >= 0 && x < this.AllGrid.length
            && y >= 0 && y < this.AllGrid[x].length;
    }

    //单例
    private static _ins: Data;
    public static get ins(): Data {
        if (!this._ins) {
            this._ins = new Data;
        }
        return this._ins;
    }
}