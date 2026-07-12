import { useState } from 'react';
import { Button, Card, Space, Spin, Alert } from 'antd';
import {
  DownloadOutlined,
  EyeOutlined,
  CheckCircleOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import { type ImageFormat, useFileStore } from '@shared/model';
import { downloadImage, getResultFilename } from '@shared/lib';

interface ResultLinkProps {
  resultUrl: string | null;
  error: string | null;
  loading: boolean;
  onReset: () => void;
  fileType?: ImageFormat;
}

export const ResultLink = ({
  resultUrl,
  fileType,
  error,
  loading,
  onReset,
}: ResultLinkProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const filename = useFileStore((z) => z.fileName);

  const handleDownload = () => {
    if (resultUrl && filename) {
      downloadImage(resultUrl, getResultFilename(filename, fileType)).catch(
        (error) => console.log(error)
      );
    }
  };

  if (loading) {
    return (
      <Card style={{ marginTop: 24 }}>
        <Space
          orientation="vertical"
          style={{ width: '100%', textAlign: 'center' }}
          size="large"
        >
          <Spin size="large" description="Обработка изображения..." />
        </Space>
      </Card>
    );
  }

  if (error) {
    return (
      <Card style={{ marginTop: 24 }}>
        <Alert
          title="Ошибка обработки"
          description={error}
          type="error"
          showIcon
          action={
            <Button size="small" onClick={onReset}>
              Попробовать снова
            </Button>
          }
        />
      </Card>
    );
  }

  if (!resultUrl) {
    return null;
  }

  return (
    <Card
      style={{ marginTop: 24, textAlign: 'center' }}
      title={
        <Space>
          <CheckCircleOutlined style={{ color: '#52c41a' }} />
          <span>Готово!</span>
        </Space>
      }
    >
      <Space
        orientation="vertical"
        style={{ width: '100%' }}
        size="middle"
        align="center"
      >
        {!imageLoaded && <Spin size="large" />}
        <img
          src={resultUrl}
          alt="Result"
          style={{
            maxWidth: '100%',
            maxHeight: 400,
            display: imageLoaded ? 'block' : 'none',
          }}
          onLoad={() => setImageLoaded(true)}
        />
        <Space wrap>
          <Button
            type="primary"
            icon={<DownloadOutlined />}
            onClick={handleDownload}
          >
            Скачать
          </Button>
          <Button icon={<EyeOutlined />} href={resultUrl} target="_blank">
            Открыть в новой вкладке
          </Button>
          <Button icon={<ReloadOutlined />} onClick={onReset}>
            Обработать другой файл
          </Button>
        </Space>
      </Space>
    </Card>
  );
};
