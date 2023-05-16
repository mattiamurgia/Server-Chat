"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var express_1 = require("express");
var body_parser_1 = require("body-parser");
var uniqid_1 = require("uniqid");
var app = (0, express_1["default"])();
app.use(body_parser_1["default"].json());
app.use(body_parser_1["default"].urlencoded({ extended: true }));
var chats = [{
        "id": 1,
        "nameGroup": "FantaCalcio",
        "message": [{ "sender": "Mattia", "body": "Hello guys" }]
    }, {
        "id": 2,
        "nameGroup": "Steve Jobs",
        "message": [{ "sender": "Domenico", "body": "Mi piace la brioscina" }]
    },
    {
        "id": 3,
        "nameGroup": "Palestra",
        "message": [{ "sender": "Gaetano", "body": "Oggi allenamento" }]
    }, {
        "id": 4,
        "nameGroup": "CenaDiGruppo",
        "message": [{ "sender": "Filippo", "body": "Oggi cena di gruppo" }]
    },];
app.get("/", function (req, res) { res.send("Sono online"); });
// Trattino basso in req perchè non viene utilizzato
app.get("/chats", function (_, res) { res.json(chats); });
// //Cerca le chats con quell id
app.get("/chats/:id", function (req, res) {
    var chat = chats.find(function (chat) { return chat.id == req.params.id; });
    if (chat) {
        res.json(chat);
    }
    else
        res.status(404).json({ message: "Chat non trovata" });
});
//Crea una chat con id random e crea una nuova chat
// nel body se metto {"name":"Pippo"} crea un gruppo con questo nome
app.post("/chats", function (req, res) {
    var name = req.body.name;
    var chat = { nameGroup: name, id: (0, uniqid_1["default"])(), message: [] };
    chats.push(chat);
    res.json(chat);
});
//Inserisce in messaggio nella chat utilizzando sender e body
//Viene inserito in base l'id indicato
app.post("/chats/:id/messages", function (req, res) {
    var _a = req.body, sender = _a.sender, body = _a.body;
    var chat = chats.find(function (chat) { return chat.id == req.params.id; });
    if (chat) {
        chat.message.push({ sender: sender, body: body });
        res.json(chat);
    }
    else {
        res.status(404).json({ message: "Chat non trovata" });
    }
});
app.get("/chats/search", function (req, res) {
    var name = req.query.name;
    console.log(name);
    var filterChat = __spreadArray([], chats, true);
    if (name) {
        var filterChat2 = filterChat.filter(function (chat) {
            return chat.nameGroup.includes(name);
        });
        console.log(filterChat2);
        res.json(filterChat2);
    }
});
app.listen(3000, function () {
    console.log("Sono in ascolto");
});
console.log("Sono in ascolto00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000");
