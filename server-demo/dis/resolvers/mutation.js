"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var apollo_server_1 = require("apollo-server");
var fs_1 = require("fs");
var Yup = __importStar(require("yup"));
var sharp_1 = __importDefault(require("sharp"));
var validator = Yup.object({
    text: Yup.string().required('text required'),
    type: Yup.string().oneOf(['MANHWA', 'MANGA']).required(),
    name: Yup.string()
        .trim()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
});
var isValidImage = function (file) { return __awaiter(void 0, void 0, void 0, function () {
    var filename, path, types, ext;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, file];
            case 1:
                filename = (_a.sent()).filename;
                path = require('path');
                types = ['jpeg', 'jpg', 'png', 'webp'];
                ext = path.extname(filename).split('.').pop().toLowerCase();
                if (!types.includes(ext)) {
                    throw new Error('sorry, this type is not included');
                }
                return [2 /*return*/];
        }
    });
}); };
var imagePromise = function (stream) {
    return new Promise(function (resolve, reject) { return __awaiter(void 0, void 0, void 0, function () {
        var pipeline;
        return __generator(this, function (_a) {
            pipeline = sharp_1.default();
            pipeline.metadata().then(function (metadata) {
                resolve(metadata);
            }).catch(function (err) {
                if (err)
                    reject(err);
            });
            stream.pipe(pipeline);
            return [2 /*return*/];
        });
    }); });
};
var storeUpload = function (upload) { return __awaiter(void 0, void 0, void 0, function () {
    var uniqueFilename, _a, createReadStream, filename, mimetype, stream, shortid, UPLOAD_DIR, id, filename1, path, file;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                uniqueFilename = require('unique-filename');
                return [4 /*yield*/, upload];
            case 1:
                _a = _b.sent(), createReadStream = _a.createReadStream, filename = _a.filename, mimetype = _a.mimetype;
                stream = createReadStream();
                shortid = require('shortid');
                UPLOAD_DIR = './uploads';
                id = shortid.generate(UPLOAD_DIR);
                filename1 = uniqueFilename('');
                path = UPLOAD_DIR + "/" + filename1;
                file = { filename: filename1, mimetype: mimetype, path: path };
                // Store the file in the filesystem.
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        // Create a stream to which the upload will be written.
                        var writeStream = fs_1.createWriteStream(path);
                        // When the upload is fully written, resolve the promise.
                        writeStream.on('finish', resolve);
                        // If there's an error writing the file, remove the partially written file
                        // and reject the promise.
                        writeStream.on('error', function (error) {
                            fs_1.unlink(path, function () {
                                reject(error);
                            });
                        });
                        // In node <= 13, errors are not automatically propagated between piped
                        // streams. If there is an error receiving the upload, destroy the write
                        // stream with the corresponding error.
                        stream.on('error', function (error) { return writeStream.destroy(error); });
                        // Pipe the upload into the write stream.
                        stream.pipe(writeStream);
                    })];
            case 2:
                // Store the file in the filesystem.
                _b.sent();
                // Record the file metadata in the DB.
                return [2 /*return*/, file];
        }
    });
}); };
var Mutation = {
    createComic: function (_, _a, _b) {
        var name = _a.name, type = _a.type, text = _a.text, cover = _a.cover;
        var prisma = _b.prisma;
        return __awaiter(void 0, void 0, void 0, function () {
            var _c, createReadStream, filename, mimetype, stream, metadata, slug, file, _d, comic, e_1;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _e.trys.push([0, 10, , 11]);
                        if (!cover) return [3 /*break*/, 4];
                        return [4 /*yield*/, cover];
                    case 1:
                        _c = _e.sent(), createReadStream = _c.createReadStream, filename = _c.filename, mimetype = _c.mimetype;
                        return [4 /*yield*/, isValidImage(cover)];
                    case 2:
                        _e.sent();
                        stream = createReadStream();
                        return [4 /*yield*/, imagePromise(stream)];
                    case 3:
                        metadata = _e.sent();
                        _e.label = 4;
                    case 4: return [4 /*yield*/, validator.validate({ name: name, type: type, text: text })
                        // if everything are ok then transfer the image and then create the comic
                    ];
                    case 5:
                        _e.sent();
                        slug = name;
                        if (!cover) return [3 /*break*/, 7];
                        return [4 /*yield*/, storeUpload(cover)];
                    case 6:
                        _d = _e.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        _d = undefined;
                        _e.label = 8;
                    case 8:
                        file = _d;
                        return [4 /*yield*/, prisma.comic.create({
                                include: {
                                    cover: true,
                                },
                                data: {
                                    name: name,
                                    type: type,
                                    text: text,
                                    slug: slug,
                                    cover: {
                                        create: file
                                    }
                                }
                            })];
                    case 9:
                        comic = _e.sent();
                        return [2 /*return*/, comic];
                    case 10:
                        e_1 = _e.sent();
                        console.log(e_1);
                        if (e_1 instanceof Yup.ValidationError) {
                            throw new apollo_server_1.UserInputError(e_1, { invalidArgs: e_1.path });
                        }
                        if (e_1.toString().includes("Unique constraint failed on the fields: (`name`)")) {
                            throw new apollo_server_1.UserInputError("duplicated", { invalidArgs: 'name' });
                        }
                        throw new apollo_server_1.ApolloError(e_1);
                    case 11: return [2 /*return*/];
                }
            });
        });
    },
    addChapter: function (_, _a, _b) {
        var name = _a.name, pages = _a.pages, comicName = _a.comicName;
        var prisma = _b.prisma;
        return __awaiter(void 0, void 0, void 0, function () {
            var _i, pages_1, page, pagesWithDemnision, santized, chapter, e_2;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 8, , 9]);
                        _i = 0, pages_1 = pages;
                        _c.label = 1;
                    case 1:
                        if (!(_i < pages_1.length)) return [3 /*break*/, 4];
                        page = pages_1[_i];
                        return [4 /*yield*/, isValidImage(page)];
                    case 2:
                        _c.sent();
                        _c.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [4 /*yield*/, Promise.all(pages.map(function (page) { return __awaiter(void 0, void 0, void 0, function () {
                            var createReadStream, stream, metadata, _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0: return [4 /*yield*/, page];
                                    case 1:
                                        createReadStream = (_b.sent()).createReadStream;
                                        stream = createReadStream();
                                        return [4 /*yield*/, imagePromise(stream)];
                                    case 2:
                                        metadata = _b.sent();
                                        _a = [{ metadata: metadata }];
                                        return [4 /*yield*/, page];
                                    case 3: return [2 /*return*/, __assign.apply(void 0, _a.concat([_b.sent()]))];
                                }
                            });
                        }); }))];
                    case 5:
                        pagesWithDemnision = _c.sent();
                        return [4 /*yield*/, Promise.all(pagesWithDemnision.map(function (page, i) { return __awaiter(void 0, void 0, void 0, function () {
                                var image, _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            if (!page) return [3 /*break*/, 2];
                                            return [4 /*yield*/, storeUpload(page)];
                                        case 1:
                                            _a = _b.sent();
                                            return [3 /*break*/, 3];
                                        case 2:
                                            _a = undefined;
                                            _b.label = 3;
                                        case 3:
                                            image = _a;
                                            // @ts-ignore
                                            return [2 /*return*/, {
                                                    // @ts-ignore
                                                    width: page.metadata.width,
                                                    // @ts-ignore
                                                    height: page.metadata.height,
                                                    number: i,
                                                    image: {
                                                        create: image
                                                    }
                                                }];
                                    }
                                });
                            }); }))];
                    case 6:
                        santized = _c.sent();
                        return [4 /*yield*/, prisma.chapter.create({
                                data: {
                                    name: name,
                                    comic: {
                                        connect: {
                                            name: comicName,
                                        }
                                    },
                                    pages: {
                                        create: santized
                                    }
                                }
                            })];
                    case 7:
                        chapter = _c.sent();
                        return [2 /*return*/, chapter];
                    case 8:
                        e_2 = _c.sent();
                        return [2 /*return*/, new apollo_server_1.ApolloError(e_2)];
                    case 9: return [2 /*return*/];
                }
            });
        });
    }
};
exports.default = Mutation;
