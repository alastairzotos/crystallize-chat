import { BorderlessTableOutlined } from '@ant-design/icons';
import { useAppState } from '../state/state';
import { Menu } from 'antd';
import { useEffect } from 'react';

export const ChannelList: React.FC = () => {
  const { channels, getChannels, currentChannel, joinChannel } = useAppState();

  useEffect(() => {
    getChannels();

    const interval = setInterval(getChannels, 1000);

    return () => clearInterval(interval);
  }, [getChannels]);
  
  return (
    <Menu
      mode="inline"
      style={{ height: 'calc(100% - 64px)', borderRight: 0 }}

      selectedKeys={[currentChannel!]}
      items={channels.map(channel => ({
        key: channel,
        label: channel,
        icon: <BorderlessTableOutlined />,
        onClick: () => joinChannel(channel),
      }))}
    />
  )
}
