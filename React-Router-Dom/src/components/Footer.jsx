import React from 'react';
import { Layout } from 'antd';

const { Footer: AntFooter } = Layout;

const Footer = () => {
  return (
    <AntFooter style={{ textAlign: 'center' }}>
      © {new Date().getFullYear()} Your Company Name
    </AntFooter>
  );
};

export default Footer;
