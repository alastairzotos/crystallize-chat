import { FetchStatus } from "../misc/models";
import { ChatMessage, ChatMessageContent } from 'types';

export interface AppStateValues {
  username?: string;
  currentChannel?: string;

  getChannelsStatus?: FetchStatus;
  joinChannelStatus?: FetchStatus;

  channels: string[];
  users: Record<string, string[]>;

  messages: Record<string, ChatMessage[]>;
}

export interface AppStateActions {
  getChannels: () => Promise<void>;
  setUsername: (username: string) => Promise<void>;
  joinChannel: (channelName: string) => Promise<void>;
  sendMessage: (message: ChatMessageContent) => void;
}

export type AppState = AppStateValues & AppStateActions;
