class Manager extends eui.UILayer {
    private data: Data;
    private view: View;
    private base: Manager;
    constructor() {
        super();
        this.data = Data.ins;
        this.data.manager = this;
        this.view = new View();
        this.base = this;
    }


    public startSearch() {
        this.base.view.removeEvents();
        this.check(this.data.role);
    }

    public check(grid: Grid) {
        this.data.CloseList.push(grid);
        let col: number = this.data.role.col;
        let row: number = this.data.role.row;
        for (let x = col - 1; x <= col + 1; x++) {
            for (let y = row - 1; y <= row + 1; y++) {
                if (this.data.CloseList.indexOf(grid) > -1) {
                    continue;
                }
                if (this.data.OpenList.indexOf(grid) == -1) {
                    this.data.OpenList.push();
                }
                this.data.AllGrid[x][y].setData();
            }
        }
    }
}