import { Layout } from 'antd';
import { Logo } from './logo';

const { Header } = Layout;

export const AppBar: React.FC = () => {
  return (
    <Header>
      <Logo />
    </Header>
  )
}
