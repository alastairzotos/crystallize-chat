import { ChatMessageContent } from 'types';
import { create } from 'zustand';

import { HttpService } from '../services/http.service';
import { WsService } from '../services/ws.service';
import { AppState } from './types';
import { addMessageToChannel, updateMessagesForNewChannel, updateChannelList } from '../misc/utils';

export const createAppState = (httpService: HttpService, wsService: WsService) =>
  create<AppState>((set, self) => ({
    channels: [],
    users: {},
    messages: {},

    getChannels: async () => {
      try {
        set({ getChannelsStatus: 'fetching' });

        const channels = await httpService.getChannels();

        set({ getChannelsStatus: 'success', channels });
      } catch {
        set({ getChannelsStatus: 'failure' });
      }
    },

    setUsername: async (username: string) => {
      set({ username });

      await self().joinChannel('Lobby');
    },

    joinChannel: async (channelName: string) => {
      if (self().username) {
        try {
          set({ joinChannelStatus: 'fetching' });

          await wsService.joinChannel({
            channelName,
            username: self().username!,
            onMessage: message => set({ messages: addMessageToChannel(self().messages, self().currentChannel!, message) }),
            onClose: () => set({ joinChannelStatus: 'failure' })
          });

          set({
            joinChannelStatus: 'success',
            messages: updateMessagesForNewChannel(self().messages, channelName),
            channels: updateChannelList(self().channels, channelName),
            currentChannel: channelName
          });
        } catch {
          set({ joinChannelStatus: 'failure' });
        }
      }
    },

    sendMessage: (message: ChatMessageContent) => {
      if (self().currentChannel) {
        wsService.sendMessageToChannel(self().currentChannel!, message);
      }
    }
  }))

export const useAppState = createAppState(new HttpService(), new WsService());
