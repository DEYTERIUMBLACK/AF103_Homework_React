import React from "react";
import { Card as AntCard, Image, Button } from "antd";
import EditModal from "./EditModal";
import DeleteButton from "./DeleteButton";

const { Meta } = AntCard;

const Card = ({ album, onEdit, onDelete }) => {
  return (
    <AntCard
      cover={<Image alt={album.name} src={album.albumCover} />}
      actions={[
        <Button type="primary" onClick={onEdit}>
          Edit
        </Button>,
        <DeleteButton onDelete={onDelete} albumId={album.id} />,
      ]}
    >
      <Meta title={album.name} description={`${album.artistName} - ${album.year}`} />
    </AntCard>
  );
};

export default Card;
