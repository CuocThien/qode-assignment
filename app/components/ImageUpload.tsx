"use client";

import { useState } from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { RcFile } from 'antd/es/upload/interface';
interface ImageUploadProps {
  onImageUploaded: () => void;
}
const ImageUpload = ({onImageUploaded}: ImageUploadProps) => {
  const [loading, setLoading] = useState(false);

  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });

  const handleUpload = async (file: RcFile) => {
    setLoading(true);
    try {
      const base64 = await getBase64(file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ base64 }),
      });

      if (response.ok) {
        message.success('Image uploaded successfully');
        onImageUploaded()
      } else {
        message.error('Failed to upload image');
      }
    } catch (error) {
      message.error('An error occurred while uploading the image');
    } finally {
      setLoading(false);
    }
  };

  const beforeUpload = (file: RcFile) => {
    handleUpload(file);
    return false; // Prevent default upload behavior
  };

  return (
    <Upload beforeUpload={beforeUpload} showUploadList={false}>
      <Button icon={<UploadOutlined />} loading={loading}>
        Upload Image
      </Button>
    </Upload>
  );
};

export default ImageUpload;
