"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const express = require('express');
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
// Instantiate express app
const app = (0, express_1.default)();
dotenv_1.default.config();
//Define Server Port
const port = process.env.PORT;
//create Default Route
app.get('/', (req, res) => {
    res.send('<h1>Express + Typescript Server</h1>');
});
// Start listening Request on defined port
app.listen(port);
