import { env } from "../misc/env";
import { ChatMessage, ChatMessageContent } from "types";

interface JoinChannelOpts {
  channelName: string;
  username: string;
  onMessage: (message: ChatMessage | ChatMessage[]) => void;
  onClose: () => void;
}

export class WsService {
  private channels: Record<string, WebSocket> = {};

  joinChannel({ channelName, username, onMessage, onClose }: JoinChannelOpts) {
    return new Promise<void>((resolve, reject) => {
      if (!!this.channels[channelName]) {
        return resolve();
      }

      const ws = new WebSocket(`${env.wsUrl}?channel=${channelName}&username=${username}`);
      this.channels[channelName] = ws;

      ws.addEventListener('open', () => resolve());
      ws.addEventListener('close', onClose);
      ws.addEventListener('error', reject);
      ws.addEventListener('message', message => onMessage(JSON.parse(message.data)));
    })
  }

  sendMessageToChannel(channelName: string, message: ChatMessageContent) {
    this.channels[channelName].send(message);
  }
}
