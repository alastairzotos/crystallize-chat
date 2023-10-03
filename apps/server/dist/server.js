"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatServer = void 0;
const ws = require("ws");
const express = require("express");
const cors = require("cors");
const channel_1 = require("./channel");
class ChatServer {
    constructor(httpPort, wsPort) {
        this.channels = {};
        this.setupHttpServer(httpPort);
        this.setupWsServer(wsPort);
    }
    setupHttpServer(port) {
        const app = express();
        app.use(cors());
        app.get('/channels', (_, res) => {
            res.json(Object.keys(this.channels));
        });
        app.listen(port, () => console.log(`HTTP server listening on http://localhost:${port}`));
    }
    setupWsServer(port) {
        const wss = new ws.WebSocketServer({ port, path: '/chat' });
        wss.on('connection', (conn, req) => {
            const params = (new URL("https://www.site.com" + req.url)).searchParams;
            const channelName = params.get('channel');
            const username = params.get('username');
            const channel = this.getOrCreateChannel(channelName);
            channel.addConnection(username, conn);
        });
        console.log(`Websockets server listening on ws://localhost:${port}`);
    }
    getOrCreateChannel(name) {
        if (!!this.channels[name]) {
            return this.channels[name];
        }
        const channel = new channel_1.ChatChannel();
        this.channels[name] = channel;
        return channel;
    }
}
exports.ChatServer = ChatServer;
