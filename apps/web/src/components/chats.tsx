import { Layout, theme } from "antd";

import React, { useEffect } from "react";
import { useAppState } from "../state/state";
import { Chatbox } from "./chatbox";
import { AppBar } from "./app-bar";
import { ManageChannels } from "./manage-channels";
import { ChannelList } from "./channel-list";

const { Sider, Content } = Layout;

export const Chats: React.FC = () => {
  const {
    token: { colorBgContainer }
  } = theme.useToken();

  const { getChannels, currentChannel } = useAppState();

  useEffect(() => {
    getChannels();
  }, [getChannels]);

  return (
    <Layout>
      <AppBar />

      <Layout>
        <Sider width={300} style={{ backgroundColor: colorBgContainer }}>
          {currentChannel && <ChannelList />}

          <ManageChannels />
        </Sider>

        <Layout>
          <Content style={{ padding: 24 }}>
            <Chatbox />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}
