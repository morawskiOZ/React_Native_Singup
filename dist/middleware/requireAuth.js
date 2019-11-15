"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongoose_1 = __importDefault(require("mongoose"));
const User = mongoose_1.default.model('User');
exports.default = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).send({ error: 'You must be logged in.' });
    }
    const token = authorization.replace('Bearer ', '');
    jsonwebtoken_1.default.verify(token, '1234', (error, payload) => __awaiter(void 0, void 0, void 0, function* () {
        if (error) {
            return res.status(401).send({ error: 'You must be logged in.' });
        }
        const { userId } = payload;
        const user = yield User.findById(userId);
        req.user = user;
        next();
    }));
};
//# sourceMappingURL=requireAuth.js.map