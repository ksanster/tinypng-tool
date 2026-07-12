import type { UploadProps } from 'antd';

export type CustomRequestOptions = Parameters<
  NonNullable<UploadProps['customRequest']>
>[0];
