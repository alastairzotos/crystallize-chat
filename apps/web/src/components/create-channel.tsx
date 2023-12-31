import { Button, Input, Space } from "antd"
import { CloseOutlined } from '@ant-design/icons';
import { useState } from "react"
import styled from 'styled-components';

import { useAppState } from "../state/state";

const Wrapper = styled(Space.Compact)`margin: 12px;`;
const Container = styled.div`display: flex; justify-content: center; width: 100%;`;

export const CreateChannel: React.FC = () => {
  const [creating, setCreating] = useState(false);
  const [name, setName] = useState('');

  const { joinChannel } = useAppState();

  const handleCreate = () => {
    joinChannel(name);

    setCreating(false);
    setName('');
  }

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      handleCreate();
    }
  }

  if (!creating) {
    return (
      <Container>
        <Button onClick={() => setCreating(true)}>
          Create channel
        </Button>
      </Container>
    )
  }

  return (
    <Container>
      <Wrapper>
        <Button onClick={() => setCreating(false)}>
          <CloseOutlined />
        </Button>

        <Input
          autoFocus
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyUp={handleKeyUp}
        />

        <Button type="primary" onClick={handleCreate}>
          Create
        </Button>
      </Wrapper>
    </Container>
  )
}
