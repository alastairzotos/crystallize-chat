import * as ws from 'ws';
import { ChatMessage } from 'types';

export class ChatChannel {
  private connections: Record<string, ws.WebSocket> = {};

  addConnection(username: string, conn: ws.WebSocket) {
    if (!!this.connections[username]) {
      return;
    }
    
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
    Object.values(this.connections).forEach(conn => conn.send(JSON.stringify(message)))
  }
}
