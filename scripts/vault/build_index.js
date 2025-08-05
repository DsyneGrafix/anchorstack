"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildVaultIndex = buildVaultIndex;
var fs_1 = require("fs");
var path_1 = require("path");
function buildVaultIndex(dirPath) {
    var files = fs_1.default.readdirSync(dirPath);
    var index = [];
    for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
        var file = files_1[_i];
        var fullPath = path_1.default.join(dirPath, file);
        var content = fs_1.default.readFileSync(fullPath, "utf-8");
        // Temporary dummy extractors
        var extract = function (label) { return "fake-".concat(label); };
        index.push({
            filename: file,
            title: extract("title"),
            tier: extract("tier"),
            value: extract("value"),
            category: extract("category"),
            status: extract("status"),
            dropsOn: extract("drop-date"),
        });
    }
    return index;
}
