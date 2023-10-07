"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatDatabase = void 0;
class ChatDatabase {
    constructor() {
        this.messages = {};
    }
    addMessageToChannel(channel, message) {
        if (!this.messages[channel]) {
            this.messages[channel] = [];
        }
        this.messages[channel].push(message);
    }
    getMessagesForChannel(channel) {
        return this.messages[channel] || [];
    }
}
exports.ChatDatabase = ChatDatabase;
