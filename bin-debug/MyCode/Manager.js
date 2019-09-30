var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var Manager = (function (_super) {
    __extends(Manager, _super);
    function Manager() {
        var _this = _super.call(this) || this;
        _this.data = Data.ins;
        _this.data.manager = _this;
        _this.view = new View();
        _this.base = _this;
        return _this;
    }
    Manager.prototype.startSearch = function () {
        this.base.view.removeEvents();
        var col = this.data.role.col;
        var row = this.data.role.row;
        for (var x = col - 1; x <= col + 1; x++) {
            for (var y = row - 1; y <= row + 1; y++) {
                if (this.data.AllGrid[x][y] == this.data.role) {
                    continue;
                }
                this.data.OpenList.push();
                this.data.AllGrid[x][y].setData();
            }
        }
    };
    return Manager;
}(eui.UILayer));
__reflect(Manager.prototype, "Manager");
//# sourceMappingURL=Manager.js.map