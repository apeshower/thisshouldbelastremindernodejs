"use strict";
exports.__esModule = true;
var express_1 = require("express");
var mongoose_1 = require("mongoose");
var cors_1 = require("cors");
var body_parser_1 = require("body-parser");
var index_1 = require("./routes/index");
var app = (0, express_1["default"])();
var PORT = process.env.PORT || 4000;
app.use(body_parser_1["default"].json());
app.use((0, cors_1["default"])());
app.use(index_1["default"]);
var uri = "mongodb+srv://".concat(process.env.MONGO_USER, ":").concat(process.env.MONGO_PASSWORD, "@cluster0.nvt4o.mongodb.net/").concat(process.env.MONGO_DB, "?retryWrites=true&w=majority");
mongoose_1["default"].connect(uri).then(function () {
    return app.listen(PORT, function () {
        return console.log("Server runs on htts://localhost:".concat(PORT));
    });
})["catch"](function (error) {
    throw error;
});
