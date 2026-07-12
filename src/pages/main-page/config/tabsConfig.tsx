import { Flex, type TabsProps } from 'antd';
import {
  ColumnWidthOutlined,
  PictureOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import { ConvertImage } from '@features/convert-image';
import { ResizeImage } from '@features/resize-image';
import { OptimizeImage } from '@features/optimize-image';

export const tabsConfig: TabsProps['items'] = [
  {
    key: 'optimize',
    label: (
      <Flex gap={5}>
        <PictureOutlined />
        Оптимизация
      </Flex>
    ),
    children: <OptimizeImage />,
  },
  {
    key: 'resize',
    label: (
      <Flex gap={5}>
        <ColumnWidthOutlined />
        Изменение размеров
      </Flex>
    ),
    children: <ResizeImage />,
  },
  {
    key: 'convert',
    label: (
      <Flex gap={5}>
        <SyncOutlined />
        Конвертация
      </Flex>
    ),
    children: <ConvertImage />,
  },
];
