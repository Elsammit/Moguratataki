"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var react_1 = require("react");
var mogura2_png_1 = require("./image/mogura2.png");
var shibafu_png_1 = require("./image/shibafu.png");
var hit_mogura_png_1 = require("./image/hit_mogura.png");
var hammer2_png_1 = require("./image/hammer2.png");
var hammer_png_1 = require("./image/hammer.png");
var numa_hamaru_woman_png_1 = require("./image/numa_hamaru_woman.png");
var mark_batsu_png_1 = require("./image/mark_batsu.png");
var dialog_1 = require("./dialog");
var LevelSet_1 = require("./LevelSet");
var StartCount_1 = require("./StartCount");
require("./mogura.css");
var TIMER = 30;
var WIDTH = 5;
var HEIGHT = 5;
var LEVEL_MAX = 500;
var LEVEL_MID = 1000;
var LEVEL_MIN = 1500;
var LVARRAY = [LEVEL_MAX, LEVEL_MID, LEVEL_MIN];
var Mogratataki = /** @class */ (function (_super) {
    __extends(Mogratataki, _super);
    function Mogratataki(props) {
        var _this = _super.call(this, props) || this;
        _this.onClick = function (id) {
            if (_this.intervalId) {
                var element_1 = document.getElementById("tables");
                element_1.style.cursor = "url(" + hammer2_png_1["default"] + "),auto";
                var location = _this.state.location;
                if (location === id) {
                    var img = document.getElementById(id);
                    _this.isClicked = true;
                    if (_this.m_appearSt.type === 0) {
                        img.src = hit_mogura_png_1["default"];
                        var clickCount = _this.state.clickCount;
                        var point = clickCount * 10;
                        if (clickCount === 0) {
                            point += 1;
                        }
                        _this.setState({ result: _this.state.result + point });
                        _this.setState({ clickCount: _this.state.clickCount + 1 });
                    }
                    else {
                        img.src = mark_batsu_png_1["default"];
                        _this.setState({ result: _this.state.result - 10 });
                        _this.setState({ clickCount: 0 });
                    }
                }
                setTimeout(function () {
                    element_1.style.cursor = "url(" + hammer_png_1["default"] + "),auto";
                }, 100);
            }
        };
        _this.rand_MoguraUp = function () {
            var location = _this.state.location;
            if (_this.isClicked === false && _this.m_appearSt.type === 0) {
                _this.setState({ clickCount: 0 });
            }
            _this.isClicked = false;
            var img = document.getElementById(location);
            img.src = shibafu_png_1["default"];
            var a = Number(Math.floor(Math.random() * (WIDTH * HEIGHT))) + 1;
            var IdNum = "Mas" + a;
            _this.setState({
                location: IdNum
            });
            var Next_img = document.getElementById(IdNum);
            var b = Number(Math.floor(Math.random() * 10)); // ダミーが出る確率.
            if (b > 2) {
                _this.m_appearSt.image = mogura2_png_1["default"];
                _this.m_appearSt.type = 0;
            }
            else {
                _this.m_appearSt.image = numa_hamaru_woman_png_1["default"];
                _this.m_appearSt.type = 1;
            }
            Next_img.src = _this.m_appearSt.image;
        };
        _this.ClickStart = function () {
            _this.setState({ result: 0 });
            var Flg = _this.state.StartFlg;
            if (Flg === false) {
                _this.intervalId2 = setInterval(function () {
                    if (_this.BeforeStart === -1) {
                        _this.InitMogPropaty();
                        _this.BeforeStart--;
                    }
                    else if (_this.BeforeStart < 0) {
                        _this.setState({ timer: _this.state.timer - 1 });
                    }
                    else {
                        _this.BeforeStart--;
                    }
                }, 1000);
                _this.setState({ stState: true });
                Flg = true;
            }
            _this.setState({ StartFlg: Flg });
        };
        _this.InitMogPropaty = function () {
            console.log("call InitMog");
            _this.intervalId = setInterval(function () {
                _this.rand_MoguraUp();
            }, _this.state.freqClock);
            var buf = document.getElementById("StButton");
            buf === null || buf === void 0 ? void 0 : buf.setAttribute("disabled", "disabled");
            var timeCircle = document.getElementById("circle");
            if (timeCircle != null) {
                timeCircle.className = "circle-start";
            }
            setTimeout(function () {
                _this.finish_mogura();
            }, 30010);
        };
        _this.finish_mogura = function () {
            if (_this.intervalId) {
                clearInterval(_this.intervalId);
            }
            if (_this.intervalId2) {
                clearInterval(_this.intervalId2);
            }
            var buf = document.getElementById("StButton");
            buf === null || buf === void 0 ? void 0 : buf.removeAttribute("disabled");
            _this.intervalId = null;
            _this.setState({ StartFlg: false });
            _this.setState({ popupstate: true });
            _this.setState({ timer: TIMER });
            _this.BeforeStart = 3;
            var timeCircle = document.getElementById("circle");
            if (timeCircle != null) {
                timeCircle.className = "circle-stop ";
            }
        };
        _this.MakeMap = function () {
            var List = [];
            for (var i = 1; i <= HEIGHT; i++) {
                var buf = [];
                for (var j = 1; j <= WIDTH; j++) {
                    var num = j + (i - 1) * WIDTH;
                    var str = "Mas" + num;
                    // 列追加
                    buf.push(react_1["default"].createElement("td", null,
                        react_1["default"].createElement("img", { id: str, src: shibafu_png_1["default"], alt: "green", onClick: _this.onClick.bind(_this, str) })));
                    var element = document.getElementById(str);
                    if (element != null) {
                        element.ondragstart = function () {
                            return false;
                        };
                    }
                }
                // 行追加
                List.push(react_1["default"].createElement("tr", null, buf));
            }
            return List;
        };
        _this.updateState = function (state) {
            _this.setState({ popupstate: state });
        };
        _this.OpenDialog = function () {
            var popupstate = _this.state.popupstate;
            var result = _this.state.result;
            var Msg = "score is " + result;
            if (popupstate === true) {
                return react_1["default"].createElement(dialog_1["default"], { closeState: _this.updateState.bind(_this), showMsg: Msg });
            }
            else {
                return react_1["default"].createElement("p", null);
            }
        };
        _this.updateLevel = function (state) {
            console.log("Level:" + state);
            _this.setState({ levelState: false });
            _this.Lv = state;
            _this.setState({ freqClock: LVARRAY[state] });
        };
        _this.OpenLevelDialog = function () {
            var levelState = _this.state.levelState;
            var result = _this.state.result;
            var Msg = "score is " + result;
            if (levelState === true) {
                return react_1["default"].createElement(LevelSet_1["default"], { level: _this.updateLevel.bind(_this), initlevel: _this.Lv, showMsg: Msg });
            }
            else {
                return react_1["default"].createElement("p", null);
            }
        };
        _this.ClickLevelDialog = function () {
            _this.setState({ levelState: true });
        };
        _this.updateStWin = function (state) {
            _this.setState({ stState: state });
        };
        _this.OpenStartCountDialog = function () {
            var stState = _this.state.stState;
            if (stState === true) {
                return react_1["default"].createElement(StartCount_1["default"], { closeState: _this.updateStWin.bind(_this), initCount: _this.BeforeStart });
            }
            else {
                return react_1["default"].createElement("p", null);
            }
        };
        _this.state = {
            'location': "Mas1",
            'StartFlg': false,
            'timer': TIMER,
            'result': 0,
            'popupstate': false,
            'clickCount': 0,
            'freqClock': 1000,
            'levelState': false,
            'stState': false
        };
        _this.intervalId = null;
        _this.intervalId2 = null;
        _this.m_appearSt = { image: "", type: 0 };
        _this.isClicked = false;
        _this.Lv = 1;
        _this.BeforeStart = 3;
        return _this;
    }
    Mogratataki.prototype.render = function () {
        return (react_1["default"].createElement("div", { className: "divCenter" },
            react_1["default"].createElement("div", { className: "title" },
                react_1["default"].createElement("u", null, "\u30E2\u30B0\u30E9\u305F\u305F\u304D\u30B2\u30FC\u30E0"),
                react_1["default"].createElement("input", { type: "button", id: "StButton", className: "StButton", value: "\u30B9\u30BF\u30FC\u30C8", onClick: this.ClickStart }),
                react_1["default"].createElement("input", { type: "button", id: "LvButton", className: "LvButton", value: "\u96E3\u6613\u5EA6\u8A2D\u5B9A", onClick: this.ClickLevelDialog })),
            this.OpenStartCountDialog(),
            this.OpenDialog(),
            this.OpenLevelDialog(),
            react_1["default"].createElement("div", { className: "mapArea" },
                react_1["default"].createElement("table", { id: "tables" },
                    react_1["default"].createElement("tbody", null, this.MakeMap())),
                react_1["default"].createElement("div", { className: "subInfo" },
                    react_1["default"].createElement("div", { id: "circle", className: "circle-stop" },
                        react_1["default"].createElement("div", { className: 'circle-inner' },
                            this.state.timer,
                            "\u79D2")),
                    react_1["default"].createElement("br", null),
                    "\u30B9\u30B3\u30A2:",
                    this.state.result))));
    };
    return Mogratataki;
}(react_1.Component));
exports["default"] = Mogratataki;
