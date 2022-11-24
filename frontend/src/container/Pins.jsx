import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import { Navbar, Feed, PinDetail, CreatePin, Search } from '../components';
import { client } from '../client';
import { feedQuery, searchQuery } from '../utils/data';

const Pins = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [pins, setPins] = useState();
  const [loading, setLoading] = useState(false);

  const searchCallback = () => {
    if (searchTerm !== '') {
      setLoading(true);
      const query = searchQuery(searchTerm.toLowerCase());
      client.fetch(query).then((data) => {
        setPins(data);
        setLoading(false);
      });
    } else {
      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
  }

  return (
    <div className='px-2 md:px-5'>
      <div className='bg-gray-50'>
        <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} searchCallback={searchCallback} user={user} />
      </div>
      <div className='h-full'>
        <Routes>
          <Route path='/' element={<Feed />} />
          <Route path='/category/:categoryId' element={<Feed />} />
          <Route path='/pin-detail/:pinId' element={<PinDetail user={user && user} />} />
          <Route path='/create-pin' element={<CreatePin user={user && user} />} />
          <Route path='/search' element={<Search loading={loading} pins={pins} searchTerm={searchTerm} />} />
        </Routes>
      </div>
    </div>
  );
};

export default Pins;