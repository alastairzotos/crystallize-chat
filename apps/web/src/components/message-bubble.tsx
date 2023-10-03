import { ChatMessage } from "types";
import { Typography } from "antd";
import styled from 'styled-components';

import { Avatar } from "./avatar";
import { useAppState } from "../state/state";

interface Props {
  message: ChatMessage;
}

const { Text, Title } = Typography;

const Bubble = styled.div<{ ownMessage: boolean }>(({ ownMessage }) => (`
  padding: 12px;
  margin: 3px;

  display: inline-block;
  min-width: 200px;
  max-width: 60%;

  background-color: ${ownMessage ? '#82b8ff' : '#d1d1d1'};
  align-self: ${ownMessage ? 'flex-end' : 'flex-start'};
  border-radius: ${ownMessage ? '16px 0 0 16px' : '0 16px 16px 0'}
`))

const Header = styled.div`display: flex; align-items: center;`;

const Name = styled(Title)`margin-top: 8px; margin-left: 12px;`;

export const MessageBubble: React.FC<Props> = ({ message: { username, eventType, message } }) => {
  const { username: currentUser } = useAppState();

  return (
    <Bubble ownMessage={currentUser === username}>
      <Header>
        <Avatar username={username} size={32} />

        <Name level={5}>
          {username}
          {eventType === 'join' ? ' joined the channel' : eventType === 'exit' ? ' left the channel' : ''}
        </Name>
      </Header>

      {message && <Text>{message}</Text>}
    </Bubble>
  )
}
