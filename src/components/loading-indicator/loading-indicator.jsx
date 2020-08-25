import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 42 }} spin />;

const LoadingIndicator = () => {
  return <Spin indicator={antIcon} style={{ paddingTop: 170, paddingBottom: 170 }} />;
};

export default LoadingIndicator;
