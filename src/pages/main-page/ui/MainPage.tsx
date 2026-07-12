import { useState } from 'react';
import { Card, Flex, Layout, Tabs, Tag, Typography } from 'antd';
import { FileUpload } from '@widgets/file-upload';
import { tabsConfig } from '../config';
import { useFileStore } from '@shared/model';

const { Content } = Layout;
export const MainPage = () => {
  const [activeTab, setActiveTab] = useState('optimize');
  const { fileName, isLoading, uploadError } = useFileStore();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ background: '#f0f2f5' }}>
        <Flex
          vertical
          justify="center"
          align="center"
          style={{
            maxWidth: 1000,
            margin: '0 auto',
            padding: '24px',
          }}
        >
          <Card>
            {fileName && !isLoading && !uploadError ? (
              <Flex
                vertical
                className="file-upload-container"
                style={{ width: 560 }}
              >
                <Typography.Title level={3}>Файл загружен</Typography.Title>
                <Flex justify="center">
                  <Tag>{fileName}</Tag>
                </Flex>
              </Flex>
            ) : (
              <FileUpload />
            )}
          </Card>
          <Tabs
            centered
            activeKey={activeTab}
            onChange={setActiveTab}
            items={tabsConfig}
            size="large"
          />
        </Flex>
      </Content>
    </Layout>
  );
};
