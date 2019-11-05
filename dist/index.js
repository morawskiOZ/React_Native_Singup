"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = express_1.default();
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
app.get('/', (req, res) => {
    res.send('Hi there');
});
app.listen(3000, () => {
    console.log('listening');
});
//# sourceMappingURL=index.js.map