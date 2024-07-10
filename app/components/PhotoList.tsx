"use client";

import { useState, useEffect } from 'react';
import { List, Card, Modal, Button } from 'antd';
import Comment from './Comment';
import { Photo } from '@/type';

const PhotoList = () => {
  const [photos, setPhotos] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const fetchPhotos = async () => {
    const response = await fetch('/api/photos');
    const data = await response.json();
    setPhotos(data);
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  const showModal = (photo: Photo) => {
    setSelectedPhoto(photo);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedPhoto(null);
  };

  return (
    <>
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={photos}
        renderItem={(photo: Photo) => (
          <List.Item>
            <Card
              hoverable
              cover={<img src={photo.base64} alt="photo" onClick={() => showModal(photo)} />}
            >
              <Card.Meta title="Click to view comments" />
            </Card>
          </List.Item>
        )}
      />
      <Modal
        title="Comments"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        {selectedPhoto && (
          <div>
            <Comment photo={selectedPhoto} onCommentAdded={fetchPhotos} />
          </div>
        )}
      </Modal>
    </>
  );
};

export default PhotoList;
