import React, { useEffect, useState } from "react";
import { Row, Col, Skeleton, message, Input } from "antd";
import axios from "axios";
import Card from "./Card";
import EditModal from "./EditModal";
import DeleteButton from "./DeleteButton";

const { Search } = Input;

const AlbumList = () => {
  const [loading, setLoading] = useState(true);
  const [albums, setAlbums] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await axios.get(
          "https://655ba7aeab37729791a9705b.mockapi.io/Albums"
        );
        setAlbums(response.data);
      } catch (error) {
        message.error("Error fetching albums. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchAlbums();
  }, []);

  const filteredAlbums = albums.filter((album) =>
    album.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (editedAlbum) => {
    setAlbums((prevAlbums) =>
      prevAlbums.map((album) => (album.id === editedAlbum.id ? editedAlbum : album))
    );
    setEditModalVisible(false);
  };

  const handleDelete = (deletedAlbumId) => {
    setAlbums((prevAlbums) => prevAlbums.filter((album) => album.id !== deletedAlbumId));
  };

  return (
    <>
      <div className="container">
        <Search
          placeholder="Search by album name"
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginBottom: "16px" }}
        />
      </div>
      <div className="container">
        <Row gutter={[16, 16]}>
          {loading ? (
            Array.from({ length: 120 }).map((_, index) => (
              <Col
                key={index}
                xs={24}
                sm={12}
                md={8}
                lg={6}
                style={{ marginTop: "40px" }}
              >
                <Skeleton active />
              </Col>
            ))
          ) : (
            filteredAlbums.map((album) => (
              <Col
                key={album.id}
                xs={24}
                sm={12}
                md={8}
                lg={8}
                style={{ marginTop: "40px" }}
              >
                <Card
                  album={album}
                  small
                  onEdit={() => {
                    setSelectedAlbum(album);
                    setEditModalVisible(true);
                  }}
                  onDelete={() => handleDelete(album.id)}
                />
              </Col>
            ))
          )}
        </Row>
      </div>
      <EditModal
        visible={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        album={selectedAlbum}
        onEdit={handleEdit}
      />
    </>
  );
};

export default AlbumList;
