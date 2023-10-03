
export type ChatEventType = 'message' | 'join' | 'exit';
export type ChatMessageContent = string;

export interface ChatMessage {
  username: string;
  eventType: ChatEventType;
  message?: ChatMessageContent;
}
