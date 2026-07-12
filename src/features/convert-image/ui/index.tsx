import { Button, Card, Form, Select, Typography } from 'antd';
import { useState } from 'react';
import { formatOptions } from '../config';
import { ResultLink } from '@shared/ui';
import { type ImageFormat, useFileStore } from '@shared/model';
import { fetchConvertImage } from '@shared/api';

const { Title, Paragraph } = Typography;

export const ConvertImage = () => {
  const { location, isLoading, clear } = useFileStore();

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fileType, setFileType] = useState<ImageFormat | undefined>();
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleProcess = async () => {
    const values = await form.validateFields();
    const { type } = values;

    setFileType(type);
    setLoading(true);
    setError(null);
    setResultUrl(null);

    try {
      const url = await fetchConvertImage(location!, type);
      setResultUrl(url);
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : 'Произошла неизвестная ошибка'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    form.resetFields();
    setResultUrl(null);
    setError(null);
    clear();
  };

  const showForm = Boolean(location && !resultUrl);

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '24px 0' }}>
      <Title level={2}>Конвертация изображений</Title>
      <Paragraph>
        Загрузите изображение и выберите целевой формат. Сервис конвертирует
        файл в выбранный формат.
      </Paragraph>

      {showForm && (
        <Card style={{ marginTop: 24 }}>
          <Form form={form} layout="vertical">
            <Form.Item
              label="Целевой формат"
              name="type"
              rules={[{ required: true, message: 'Выберите формат' }]}
            >
              <Select options={formatOptions} />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                onClick={handleProcess}
                loading={loading}
                disabled={!location}
              >
                Конвертировать
              </Button>
            </Form.Item>
          </Form>
        </Card>
      )}

      <ResultLink
        resultUrl={resultUrl}
        fileType={fileType}
        error={error}
        loading={loading || isLoading}
        onReset={handleReset}
      />
    </div>
  );
};
