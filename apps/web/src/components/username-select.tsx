import React, { useState } from "react";
import { Card, Input, Col, Row, Button } from "antd";
import { UserOutlined } from '@ant-design/icons';
import styled from 'styled-components';

import { useAppState } from "../state/state";
import { Avatar } from "./avatar";

const Wrapper = styled.div`padding-top: 20px;`;

export const UsernameSelect: React.FC = () => {
  const { setUsername } = useAppState();

  const [name, setName] = useState('');

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter' && name.trim() !== '') {
      setUsername(name);
    }
  }

  return (
    <Wrapper>
      <Row>
        <Col span={8} offset={8}>
          <Card
            title="Create your username"
            headStyle={{ textAlign: 'center' }}
            bodyStyle={{ display: 'flex', gap: 12 }}
            actions={[
              <Button
                type="primary"
                size="large"
                shape="round"
                disabled={name.trim() === ''}
                onClick={() => setUsername(name)}
              >
                Join!
              </Button>
            ]}
          >
            <Avatar username={name} />

            <Input
              placeholder="Enter your username"
              prefix={<UserOutlined />}
              value={name}
              onChange={e => setName(e.target.value)}
              onKeyUp={handleKeyUp}
            />
          </Card>
        </Col>
      </Row>
    </Wrapper>
  )
}
