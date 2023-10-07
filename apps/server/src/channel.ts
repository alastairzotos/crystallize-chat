import * as ws from 'ws';
import { ChatMessage } from 'types';
import { ChatDatabase } from './database';

export class ChatChannel {
  private connections: Record<string, ws.WebSocket> = {};

  constructor(
    private readonly channelName: string,
    private readonly chatDatabase: ChatDatabase,
  ) {}

  addConnection(username: string, conn: ws.WebSocket) {
    if (!!this.connections[username]) {
      return;
    }

    this.chatDatabase.getMessagesForChannel(this.channelName).forEach(message => this.sendMessageToConnection(conn, message));

    this.connections[username] = conn;

    this.broadcast({
      username,
      eventType: 'join',
    })

    conn.on('message', (buffer) => { 
      this.broadcast({
        username,
        eventType: 'message',
        message: buffer.toString(),
      });
    })

    conn.on('close', () => {
      delete this.connections[username];

      this.broadcast({
        username,
        eventType: 'exit',
      });
    })
  }

  broadcast(message: ChatMessage) {
    this.chatDatabase.addMessageToChannel(this.channelName, message);
    Object.values(this.connections).forEach(conn => this.sendMessageToConnection(conn, message));
  }

  private sendMessageToConnection(conn: ws.WebSocket, message: ChatMessage) {
    conn.send(JSON.stringify(message));
  }
}
