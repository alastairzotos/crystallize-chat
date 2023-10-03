import { Tabs, Card, Space, Button } from "antd";
import { RedoOutlined } from '@ant-design/icons';
import React, { useEffect } from "react";
import { useAppState } from "../state/state";
import { CreateChannel } from "./create-channel";
import { Chatbox } from "./chatbox";

export const Chats: React.FC = () => {
  const { channels, getChannels, currentChannel, joinChannel } = useAppState();

  useEffect(() => {
    getChannels();
  }, [getChannels]);

  return (
    <Card>
      <Tabs
        activeKey={currentChannel}
        tabPosition="left"
        tabBarStyle={{ width: 300 }}

        tabBarExtraContent={(
          <Space>
            <CreateChannel />

            <Button onClick={getChannels}>
              <RedoOutlined />
            </Button>
          </Space>
        )}

        items={channels.map(channel => ({
          id: channel,
          key: channel,
          label: channel,
          children: <Chatbox channel={channel} />
        }))}

        onChange={joinChannel}
      />
    </Card>
  )
}
