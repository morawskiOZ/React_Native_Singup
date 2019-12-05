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
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const requireAuth_1 = __importDefault(require("../middleware/requireAuth"));
const Track = mongoose_1.default.model('Track');
const router = express_1.default.Router();
router.use(requireAuth_1.default);
router.get('/tracks', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.user._id;
    const tracks = yield Track.find({ userId: id });
    res.send(tracks);
}));
router.post('/tracks', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.user._id;
    const { name, locations } = req.body;
    if (!name || !locations) {
        return res.status(422).send({ error: 'You must provide name and location' });
    }
    try {
        const track = new Track({ name, locations, userId: id });
        yield track.save();
        res.send(track);
    }
    catch (err) {
        res.status(422).send({ error: err.message });
    }
}));
exports.default = router;
//# sourceMappingURL=trackRoutes.js.map