import { Layout, theme } from "antd";

import React from "react";
import { useAppState } from "../state/state";
import { Chatbox } from "./chatbox";
import { AppBar } from "./app-bar";
import { ChannelList } from "./channel-list";
import { CreateChannel } from "./create-channel";

const { Sider, Content } = Layout;

export const Chats: React.FC = () => {
  const {
    token: { colorBgContainer }
  } = theme.useToken();

  const { currentChannel } = useAppState();

  return (
    <Layout>
      <AppBar />

      <Layout>
        <Sider width={300} style={{ backgroundColor: colorBgContainer }}>
          {currentChannel && <ChannelList />}

          <CreateChannel />
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
