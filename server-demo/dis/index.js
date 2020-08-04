"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
// import * as express from 'express';
var express_1 = __importDefault(require("express"));
var apollo_server_express_1 = require("apollo-server-express");
var fs = __importStar(require("fs"));
var mkdirp_1 = __importDefault(require("mkdirp"));
var load_1 = require("@graphql-tools/load");
var graphql_file_loader_1 = require("@graphql-tools/graphql-file-loader");
var schema_1 = require("@graphql-tools/schema");
var path_1 = require("path");
var sharp_1 = __importDefault(require("sharp"));
var resolvers_1 = __importDefault(require("./resolvers"));
mkdirp_1.default('./uploads');
var prisma = new client_1.PrismaClient();
var schema = load_1.loadSchemaSync(path_1.join(__dirname, 'schema.graphql'), { loaders: [new graphql_file_loader_1.GraphQLFileLoader()] });
var schemaWithResolvers = schema_1.addResolversToSchema({
    schema: schema,
    resolvers: resolvers_1.default,
});
var server = new apollo_server_express_1.ApolloServer({
    schema: schemaWithResolvers,
    context: {
        prisma: prisma
    }
});
var app = express_1.default();
server.applyMiddleware({ app: app });
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.get('/cover/:imageName', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var promisify, sizeOf, imagePath, stream, dimensions, format, width, height, scale, maxWidth, maxHeight, aspectRatio, quality, transform, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                promisify = require('util').promisify;
                sizeOf = promisify(require('image-size'));
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                imagePath = "./uploads/" + req.params.imageName;
                stream = fs.createReadStream(imagePath);
                return [4 /*yield*/, sizeOf(imagePath)];
            case 2:
                dimensions = _a.sent();
                format = req.query.format ? req.query.format : 'jpeg';
                width = null;
                height = null;
                scale = req.query.scale ? parseInt(req.query.scale.substring(1)) : 1;
                maxWidth = 384 * scale;
                maxHeight = 413 * scale;
                aspectRatio = 1.075;
                quality = 85;
                // check if image width and height is heigher than the max width and height, if it less we can then resize to the max of height and width
                if (dimensions.width > maxWidth && dimensions.height > maxHeight) {
                    width = maxWidth;
                    height = maxHeight;
                }
                else {
                    // if not, it mean there maybe the height or width of image is less then the max so it mean it will be upscaled and will make the size more bigger
                    // thats not what we want
                    // so we will depend on the width  or height of the image rather than max width /height
                    // firstly we check if width of image is less than height
                    if (dimensions.width < dimensions.height) {
                        // it's less so we will adjusted to height according to width
                        width = dimensions.width;
                        height = Math.round(dimensions.width * aspectRatio);
                    }
                    else {
                        height = dimensions.height;
                        width = Math.round(dimensions.height / aspectRatio);
                    }
                }
                transform = sharp_1.default().resize(width, height, {
                    fit: 'cover'
                }).toFormat(format, {
                    quality: quality
                });
                stream.pipe(transform).pipe(res);
                return [3 /*break*/, 4];
            case 3:
                e_1 = _a.sent();
                next();
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.get('/uploads/:imageName', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var promisify, sizeOf, imagePath, stream, dimensions, width, height, crop, quality, format, transform, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                promisify = require('util').promisify;
                sizeOf = promisify(require('image-size'));
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                imagePath = "./uploads/" + req.params.imageName;
                stream = fs.createReadStream(imagePath);
                if (!req.query.format) return [3 /*break*/, 3];
                return [4 /*yield*/, sizeOf(imagePath)];
            case 2:
                dimensions = _a.sent();
                width = null;
                height = null;
                if (req.query.width && req.query.height) {
                    if (req.query.width < dimensions.width && req.query.height < dimensions.height) {
                        width = parseInt(req.query.width);
                        height = parseInt(req.query.height);
                    }
                    if (req.query.height < dimensions.height) {
                        height = parseInt(req.query.height);
                    }
                    if (req.query.width < dimensions.width) {
                        width = parseInt(req.query.width);
                    }
                }
                crop = req.query.crop ? req.query.crop : "cover";
                quality = req.query.q ? parseInt(req.query.q) : null;
                format = req.query.format;
                transform = sharp_1.default().resize(width, height, {
                    // @ts-ignore
                    fit: crop
                }).toFormat(format, {
                    quality: quality
                });
                stream.pipe(transform).pipe(res);
                return [2 /*return*/];
            case 3:
                res.set('Content-Type', "image/jpg");
                stream.pipe(res);
                return [3 /*break*/, 5];
            case 4:
                err_1 = _a.sent();
                next();
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
app.listen({ port: 4000 }, function () {
    return console.log("\uD83D\uDE80 Server ready at http://localhost:4000" + server.graphqlPath);
});
