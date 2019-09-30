var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Data = (function () {
    function Data() {
        this.OpenList = new Array();
        this.CloseList = new Array();
        this.PathList = new Array();
        this.AllGrid = new Array();
    }
    //检查是否在地图内
    Data.prototype.isInMap = function (x, y) {
        return x >= 0 && x < this.AllGrid.length
            && y >= 0 && y < this.AllGrid[x].length;
    };
    Object.defineProperty(Data, "ins", {
        get: function () {
            if (!this._ins) {
                this._ins = new Data;
            }
            return this._ins;
        },
        enumerable: true,
        configurable: true
    });
    //界面大小
    Data.StageWidth = 800;
    Data.StageHeight = 400;
    Data.GridWidth = 80;
    Data.GridHeight = 80;
    return Data;
}());
__reflect(Data.prototype, "Data");
//# sourceMappingURL=Data.js.map