import React from 'react';
import { Modal } from 'antd';

const ImgLinkModal = ({ item, ...modalProps }) => {
  const currentItem = item.currentItem;
  return (
    <Modal {...modalProps}>
      <img width={400} src={currentItem.img1} alt="img" />
      <img src={currentItem.img2} alt="img" />
    </Modal>
  );
};

export default ImgLinkModal;
