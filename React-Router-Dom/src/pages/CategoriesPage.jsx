import React, { useState, useEffect } from 'react';
import { List } from 'antd';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('https://northwind.vercel.app/api/categories')
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error('Error fetching categories:', error));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <List
        header={<h2>Categories</h2>}
        bordered
        dataSource={categories}
        renderItem={(item) => <List.Item>{item.name}</List.Item>}
      />
    </div>
  );
};

export default CategoriesPage;
