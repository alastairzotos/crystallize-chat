import * as ws from 'ws';
import * as express from 'express';
import * as cors from 'cors';

import { ChatChannel } from './channel';

export class ChatServer {
  private readonly channels: Record<string, ChatChannel> = {};

  constructor(httpPort: number, wsPort: number) {
    this.setupHttpServer(httpPort);
    this.setupWsServer(wsPort);
  }

  private setupHttpServer(port: number) {
    const app = express();

    app.use(cors());

    app.get('/channels', (_, res) => {
      res.json(Object.keys(this.channels));
    })

    app.listen(port, () => console.log(`HTTP server listening on http://localhost:${port}`));
  }

  private setupWsServer(port: number) {
    const wss = new ws.WebSocketServer({ port, path: '/chat' });

    wss.on('connection', (conn, req) => {
      const params = (new URL("https://www.site.com" + req.url)).searchParams;

      const channelName = params.get('channel');
      const username = params.get('username');

      const channel = this.getOrCreateChannel(channelName);
      channel.addConnection(username, conn);
    })

    console.log(`Websockets server listening on ws://localhost:${port}`);
  }

  private getOrCreateChannel(name: string) {
    if (!!this.channels[name]) {
      return this.channels[name];
    }

    const channel = new ChatChannel();
    this.channels[name] = channel;

    return channel;
  }
}
