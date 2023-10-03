import { ChatMessage } from "types";
import { Typography } from "antd";
import styled from 'styled-components';

import { Avatar } from "./avatar";
import { useAppState } from "../state/state";

interface Props {
  message: ChatMessage;
}

const { Text, Title } = Typography;

const Bubble = styled.div<{ $ownMessage: boolean }>`
  padding: 12px;
  margin: 3px;

  display: inline-block;
  min-width: 200px;
  max-width: 60%;

  background-color: ${props => props.$ownMessage ? '#82b8ff' : '#d1d1d1'};
  align-self: ${props => props.$ownMessage ? 'flex-end' : 'flex-start'};
  border-radius: ${props => props.$ownMessage ? '16px 0 0 16px' : '0 16px 16px 0'}
`

const Header = styled.div`display: flex; align-items: center;`;

const Name = styled(Title)`margin-top: 8px; margin-left: 12px;`;

const composeHeadingForMessage = ({ username, eventType }: ChatMessage, channelName: string) => {
  switch (eventType) {
    case 'join':
      return `${username} joined ${channelName}`;

    case 'exit':
      return `${username} left ${channelName}`;

    case 'message':
      return username;
  }
}

export const MessageBubble: React.FC<Props> = ({ message }) => {
  const { username: currentUser, currentChannel } = useAppState();
  const { username, message: content } = message;

  return (
    <Bubble $ownMessage={currentUser === username}>
      <Header>
        <Avatar username={username} size={32} />

        <Name level={5}>
          {composeHeadingForMessage(message, currentChannel!)}
        </Name>
      </Header>

      {content && <Text>{content}</Text>}
    </Bubble>
  )
}
