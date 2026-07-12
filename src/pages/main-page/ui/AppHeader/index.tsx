import { PictureOutlined } from '@ant-design/icons';
import { Layout } from 'antd';

const { Header } = Layout;
export const AppHeader = () => {
  return (
    <Header
      style={{
        display: 'flex',
        alignItems: 'center',
        background: '#001529',
        padding: '0 24px',
      }}
    >
      <h1
        style={{
          color: '#fff',
          margin: 0,
          fontSize: 20,
          fontWeight: 600,
          lineHeight: '32px',
        }}
      >
        <PictureOutlined /> TinyPNG Tool
      </h1>
    </Header>
  );
};
