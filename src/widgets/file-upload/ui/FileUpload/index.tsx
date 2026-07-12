import { Flex, Upload, type UploadProps } from 'antd';
import type { RcFile, UploadChangeParam, UploadFile } from 'antd/es/upload';
import {
  InboxOutlined,
  LoadingOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import type { CustomRequestOptions } from '../../model';
import { useFileStore } from '@shared/model';
import { API_URL, AUTH_HEADER } from '@shared/api';

const { Dragger } = Upload;

interface FileUploadProps {
  accept?: string;
  maxSize?: number; // in MB
}

export const FileUpload = ({
  accept = 'image/jpeg, image/png, image/webp',
  maxSize = 10,
}: FileUploadProps) => {
  const { setError, uploadError, isLoading, uploadComplete, startUpload } =
    useFileStore();

  const beforeUpload = (file: File) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      setError(
        'Недопустимый формат файла. Пожалуйста, выберите изображение (JPEG, PNG или WebP).'
      );
      return false;
    }

    const maxSizeBytes = maxSize * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      setError(`Размер файла не должен превышать ${maxSize} МБ.`);
      return false;
    }

    return true;
  };

  const handleChange = (info: UploadChangeParam<UploadFile>) => {
    const { file: uploadedFile } = info;
    switch (uploadedFile.status) {
      case 'error':
        setError('Ошибка загрузки файла. Попробуйте снова.');
        break;
      case 'done':
        console.log('file uploaded');
        break;
    }
  };

  const customRequest = async ({
    file,
    onSuccess,
    onError,
  }: CustomRequestOptions) => {
    startUpload((file as File).name);
    try {
      const response = await fetch(`${API_URL}/api/shrink`, {
        method: 'POST',
        body: file,
        headers: {
          Authorization: `Basic ${AUTH_HEADER}`,
          'Content-Type': (file as File).type,
        },
      });

      if (response.ok) {
        const location = response.headers.get('location');
        if (location) {
          uploadComplete(location);
        } else {
          setError('No location in response');
        }
        const result = await response.json();
        onSuccess?.(result);
      } else {
        throw new Error('Compression failed');
      }
    } catch (error) {
      onError?.(error as Error);
      setError(`${(file as RcFile).name} upload failed.`);
    }
  };

  const uploadProps: UploadProps = {
    multiple: false,
    showUploadList: false,
    accept,
    customRequest,
    beforeUpload,
    onChange: handleChange,
    className: 'file-upload-dragger',
  };

  return (
    <Flex vertical className="file-upload-container">
      <Dragger {...uploadProps}>
        <div className="ant-upload-drag-icon">
          <InboxOutlined style={{ fontSize: 48 }} />
        </div>
        <div className="ant-upload-text">
          Перетащите изображение сюда или нажмите для выбора
        </div>
        <div className="ant-upload-hint">
          Поддерживаемые форматы: JPEG, PNG, WebP. Максимальный размер:{' '}
          {maxSize} МБ.
        </div>
      </Dragger>
      {uploadError && (
        <div className="upload-error">
          <CloseCircleOutlined style={{ color: '#ff4d4f' }} />
          <span>{uploadError}</span>
        </div>
      )}
      {isLoading && (
        <div className="upload-loading">
          <LoadingOutlined style={{ fontSize: 16 }} />
          <span>Обработка...</span>
        </div>
      )}
    </Flex>
  );
};

FileUpload.displayName = 'FileUpload';
