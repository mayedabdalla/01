"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mutation_1 = __importDefault(require("./mutation"));
var query_1 = __importDefault(require("./query"));
var File_1 = __importDefault(require("./File"));
var resolvers = {
    Mutation: mutation_1.default,
    Query: query_1.default,
    File: File_1.default
};
exports.default = resolvers;
