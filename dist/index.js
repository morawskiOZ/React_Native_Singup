"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./models/User");
require("./models/Track");
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const trackRoutes_1 = __importDefault(require("./routes/trackRoutes"));
const body_parser_1 = __importDefault(require("body-parser"));
const requireAuth_1 = __importDefault(require("./middleware/requireAuth"));
const app = express_1.default();
app.use(body_parser_1.default.json());
app.use(authRoutes_1.default);
app.use(trackRoutes_1.default);
const mongoUri = 'mongodb+srv://piotrmorawski:1234@cluster0-mr6m6.gcp.mongodb.net/test?retryWrites=true&w=majority';
mongoose_1.default.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
mongoose_1.default.connection.on('connected', () => {
    console.log('connected to Mongo');
});
mongoose_1.default.connection.on('error', (err) => {
    console.log('error connecting to Mongo', err);
});
app.get('/', requireAuth_1.default, (req, res) => {
    res.send(`Your email ${req.user.email}`);
});
app.listen(3000, () => {
    console.log('listening');
});
//# sourceMappingURL=index.js.map