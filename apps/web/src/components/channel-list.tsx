import { BorderlessTableOutlined } from '@ant-design/icons';
import { useAppState } from '../state/state';
import { Menu } from 'antd';

export const ChannelList: React.FC = () => {
  const { channels, currentChannel, joinChannel } = useAppState();
  
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
