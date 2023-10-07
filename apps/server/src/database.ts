import { ChatMessage } from "types";

export class ChatDatabase {
  private readonly messages: Record<string, ChatMessage[]> = {};

  addMessageToChannel(channel: string, message: ChatMessage) {
    if (!this.messages[channel]) {
      this.messages[channel] = [];
    }

    this.messages[channel].push(message);
  }

  getMessagesForChannel(channel: string): ChatMessage[] {
    return this.messages[channel] || [];
  }
}
