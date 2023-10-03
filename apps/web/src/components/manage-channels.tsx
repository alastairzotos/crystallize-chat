import { RedoOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';
import styled from 'styled-components';
import { CreateChannel } from "./create-channel";
import { useAppState } from '../state/state';

const Container = styled.div`display: flex; justify-content: center; width: 100%;`;

export const ManageChannels: React.FC = () => {
  const { getChannels } = useAppState();

  return (
    <Container>
      <Space>
        <CreateChannel />
        <Button onClick={getChannels}>
          <RedoOutlined />
        </Button>
      </Space>
    </Container>
  )
}
