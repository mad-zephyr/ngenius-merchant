"use strict";
exports.__esModule = true;
exports.Typography = void 0;
var clsx_1 = require("clsx");
var style_module_sass_1 = require("./style.module.sass");
exports.Typography = function (_a) {
    var level = _a.level, className = _a.className, children = _a.children;
    var classes = clsx_1["default"](style_module_sass_1["default"][level], className);
    switch (level) {
        case 'h1':
            return (React.createElement("div", { className: classes },
                React.createElement("h1", null, children)));
        case 'h2':
            return (React.createElement("div", { className: classes },
                React.createElement("h2", null, children)));
        case 'h3':
            return (React.createElement("div", { className: classes },
                React.createElement("h3", null, children)));
        case 'h4':
            return (React.createElement("div", { className: classes },
                React.createElement("h4", null, children)));
        case 'title-lg':
            return (React.createElement("div", { className: classes },
                React.createElement("p", null, children)));
        case 'title-md':
            return (React.createElement("div", { className: classes },
                React.createElement("p", null, children)));
        case 'title-sm':
            return (React.createElement("div", { className: classes },
                React.createElement("p", null, children)));
        case 'body-lg':
            return (React.createElement("div", { className: classes },
                React.createElement("p", null, children)));
        case 'body-md':
            return (React.createElement("div", { className: classes },
                React.createElement("p", null, children)));
        case 'body-sm':
            return (React.createElement("div", { className: classes },
                React.createElement("p", null, children)));
        case 'body-xs':
            return (React.createElement("div", { className: classes },
                React.createElement("p", null, children)));
        default:
            return React.createElement("span", null, children);
    }
};
