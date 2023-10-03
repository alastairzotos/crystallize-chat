import {  Typography, theme } from "antd"
import styled from 'styled-components';

const { Title } = Typography;

const Wrapper = styled.div`display: flex; align-items: center;`;

export const Logo: React.FC = () => {
  const {
    token: { colorWhite }
  } = theme.useToken();

  return (
    <Wrapper>
      <img src="/crystallize_symbol.svg" alt="Crystallize logo" width={36} height={36} style={{ marginTop: 14 }} />

      <Title level={4} style={{ color: colorWhite, margin: 0, paddingTop: 20, paddingLeft: 12 }}>Crystalk</Title>
    </Wrapper>
  )
}
