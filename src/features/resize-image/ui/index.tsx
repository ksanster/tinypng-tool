import {
  Button,
  Card,
  Form,
  InputNumber,
  Select,
  Space,
  Typography,
} from 'antd';
import { useState } from 'react';
import { ResultLink } from '@shared/ui';
import { resizeMethods } from '../config';
import { useFileStore } from '@shared/model';
import { fetchResizeImage } from '@shared/api';

const { Title, Paragraph } = Typography;

export const ResizeImage = () => {
  const { location, isLoading, clear } = useFileStore();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleProcess = async () => {
    const values = await form.validateFields();
    const { width, height, method } = values;

    setLoading(true);
    setError(null);
    setResultUrl(null);

    try {
      const url = await fetchResizeImage(location!, {width, height, method});
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
    clear()
  };

  const showForm = Boolean(location && !resultUrl)

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '24px 0' }}>
      <Title level={2}>Изменение размеров изображений</Title>
      <Paragraph>
        Загрузите изображение и укажите желаемые размеры. Выберите метод
        обработки для получения нужного результата.
      </Paragraph>

      {showForm && (
        <Card style={{ marginTop: 24 }}>
          <Form form={form} layout="vertical" initialValues={{ method: 'fit' }}>
            <Space size="large" style={{ width: '100%' }}>
              <Form.Item
                label="Ширина (px)"
                name="width"
                rules={[
                  {
                    required: true,
                    message: 'Введите ширину',
                  },
                ]}
                style={{ flex: 1 }}
              >
                <InputNumber
                  min={1}
                  max={10000}
                  style={{ width: '100%' }}
                  placeholder="Ширина"
                />
              </Form.Item>
              <Form.Item
                label="Высота (px)"
                name="height"
                rules={[
                  {
                    required: true,
                    message: 'Введите высоту',
                  },
                ]}
                style={{ flex: 1 }}
              >
                <InputNumber
                  min={1}
                  max={10000}
                  style={{ width: '100%' }}
                  placeholder="Высота"
                />
              </Form.Item>
            </Space>
            <Form.Item
              label="Метод"
              name="method"
              rules={[{ required: true, message: 'Выберите метод' }]}
            >
              <Select options={resizeMethods} />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                onClick={handleProcess}
                loading={loading}
                disabled={!location}
              >
                Изменить размеры
              </Button>
            </Form.Item>
          </Form>
        </Card>
      )}

      <ResultLink
        resultUrl={resultUrl}
        error={error}
        loading={loading || isLoading}
        onReset={handleReset}
      />
    </div>
  );
};
