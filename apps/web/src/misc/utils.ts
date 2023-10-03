import { ChatMessage } from "types";

export const addMessageToChannel = (messages: Record<string, ChatMessage[]>, channelName: string, message: ChatMessage) => ({
  ...messages,
  [channelName]: [
    ...(messages[channelName] || []),
    message,
  ],
})

export const updateMessagesForNewChannel = (messages: Record<string, ChatMessage[]>, channelName: string) => ({
  ...messages,
  [channelName]: messages[channelName] || [],
})

export const updateChannelList = (channels: string[], newChannelName: string) =>
  [...channels, newChannelName].filter((v, i, s) => i === s.indexOf(v)) // Add channel if it doesn't exist