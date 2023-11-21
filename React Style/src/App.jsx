import React from 'react';
import Navbar from './components/Navbar';
import './App.css'
import AlbumList from './Components/AlbumList';
const App = () => {
  return (
    <div>
      <Navbar />
      <AlbumList />
    </div>
  );
};

export default App;
