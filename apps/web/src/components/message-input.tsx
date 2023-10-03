import { useState } from "react";

import { Button, Input, Space } from "antd"
import { SendOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { checkText as emojify } from 'smile2emoji'

import { useAppState } from "../state/state";

const Wrapper = styled(Space.Compact)`width: 100%;`;

export const MessageInput: React.FC = () => {
  const { sendMessage } = useAppState();
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      sendMessage(message);
      setMessage('');
    }
  }

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      handleSendMessage();
    }
  }

  return (
    <Wrapper>
      <Input
        autoFocus
        size="large"
        placeholder="Send a message"
        value={message}
        onChange={e => setMessage(emojify(e.target.value))}
        onKeyUp={handleKeyUp}
      />

      <Button
        type="primary"
        shape="round"
        size="large"
        disabled={message.trim() === ''}
        onClick={handleSendMessage}
      >
        <SendOutlined />
      </Button>
    </Wrapper>
  )
}
