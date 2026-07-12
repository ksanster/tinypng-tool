import { Button, Card, Form, Select, Typography } from 'antd';
import { useState } from 'react';
import { formatOptions } from '../config';
import { ResultLink } from '@shared/ui';

const { Title, Paragraph } = Typography;

export const ConvertImage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleProcess = async () => {
    if (!selectedFile) return;

    // const values = await form.validateFields();
    // const { target } = values;

    setLoading(true);
    setError(null);
    setResultUrl(null);

    try {
      // const url = await convertImage(selectedFile, target);
      // setResultUrl(url);
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
    setSelectedFile(null);
    setResultUrl(null);
    setError(null);
  };

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '24px 0' }}>
      <Title level={2}>Конвертация изображений</Title>
      <Paragraph>
        Загрузите изображение и выберите целевой формат. Сервис конвертирует
        файл в выбранный формат.
      </Paragraph>

      {selectedFile && (
        <Card style={{ marginTop: 24 }}>
          <Form form={form} layout="vertical">
            <Form.Item
              label="Целевой формат"
              name="target"
              rules={[{ required: true, message: 'Выберите формат' }]}
            >
              <Select options={formatOptions} />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                onClick={handleProcess}
                loading={loading}
                disabled={!selectedFile}
              >
                Конвертировать
              </Button>
            </Form.Item>
          </Form>
        </Card>
      )}

      <ResultLink
        resultUrl={resultUrl}
        error={error}
        loading={loading}
        onReset={handleReset}
      />
    </div>
  );
};
