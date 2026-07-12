import { Flex, Typography } from 'antd';
import { ResultLink } from '@shared/ui';
import { useFileStore } from '@shared/model';

const { Title, Paragraph } = Typography;
export const OptimizeImage = () => {
  const { location, uploadError, isLoading, clear } = useFileStore()

  const handleReset = () => {
    clear()
  }

  return (
    <Flex vertical>
      <Title level={2}>Оптимизация изображений</Title>
      <Paragraph>
        Загрузите изображение для его оптимизации. Сервис уменьшит размер файла,
        сохранив визуальное качество.
      </Paragraph>

      <ResultLink
        resultUrl={location}
        error={uploadError}
        loading={isLoading}
        onReset={handleReset}
      />

    </Flex>
  )
}