import { env } from "../misc/env";
import { ChatMessage, ChatMessageContent } from "types";

interface JoinChannelOpts {
  channelName: string;
  username: string;
  onMessage: (message: ChatMessage) => void;
  onClose: () => void;
}

export class WsService {
  private channels: Record<string, WebSocket> = {};

  joinChannel({ channelName, username, onMessage, onClose }: JoinChannelOpts) {
    return new Promise<void>((resolve, reject) => {
      const ws = new WebSocket(`${env.wsUrl}?channel=${channelName}&username=${username}`);
      this.channels[channelName] = ws;

      ws.onopen = () => resolve();
      ws.onclose = onClose;
      ws.onerror = reject;
      ws.onmessage = message => onMessage(JSON.parse(message.data));
    })
  }

  sendMessageToChannel(channelName: string, message: ChatMessageContent) {
    this.channels[channelName].send(message);
  }
}
