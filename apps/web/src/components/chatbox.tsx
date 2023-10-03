import styled from 'styled-components';
import { Space } from 'antd';

import { ScrollToBottom } from "./scroll-to-bottom";
import { useAppState } from "../state/state"
import { MessageBubble } from "./message-bubble";
import { MessageInput } from './message-input';

const Container = styled.div`height: 100%;`;
const Inner = styled.div`height: calc(100vh - 160px); overflow-y: scroll;`;
const Spacer = styled(Space)`width: 100%;`;

export const Chatbox: React.FC = () => {
  const { messages, currentChannel } = useAppState();

  if (!currentChannel) {
    return null;
  }

  const channelMessages = messages[currentChannel];

  return (
    <Container>
      <Spacer direction="vertical">
        <Inner>
          <ScrollToBottom style={{ display: 'flex', flexDirection: 'column' }}>
            {channelMessages.map((message, index) => (
              <MessageBubble key={index} message={message} />
            ))}
          </ScrollToBottom>
        </Inner>

        <MessageInput />
      </Spacer>
    </Container>
  )
}
