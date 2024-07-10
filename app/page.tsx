"use client";

import { Layout } from 'antd';
import PhotoList from './components/PhotoList';
import ImageUpload from './components/ImageUpload';
import { useState } from 'react';

const { Header, Content } = Layout;

const Home = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleImageUploaded = () => {
    setRefreshKey(prevKey => prevKey + 1);
  };
  return (
    <Layout>
      <Header style={{ color: 'white' }}>Photo Gallery</Header>
      <Content style={{ padding: '50px' }}>
        {/* <PhotoUpload /> */}
        <ImageUpload onImageUploaded={handleImageUploaded}/>
        <PhotoList key={refreshKey}/>
      </Content>
    </Layout>
  );
};

export default Home;
