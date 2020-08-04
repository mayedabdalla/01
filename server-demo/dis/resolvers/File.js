"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var File = {
    link: function (parent) {
        return "http://localhost:4000/uploads/" + parent.filename;
    }
};
exports.default = File;
