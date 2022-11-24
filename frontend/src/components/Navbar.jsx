import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdAdd, IoMdSearch } from 'react-icons/io';

const Navbar = ({ searchTerm, setSearchTerm, searchCallback, user }) => {
  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      searchCallback();
    }
  }

  if (user) {
    return (
      <div
        className='
          flex
          gap-2
          md:gap-5
          w-full
          mt-5
          pb-7'
      >
        <div
          className='
            flex
            justify-start
            items-center
            w-full
            px-2
            rounded-md
            bg-white
            border-none
            outline-none
            focus-within:shadow-sm'
        >
          <button
            className='
              cursor-pointer
              w-10
              h-10
              bg-slate-200
              hover:bg-slate-300
              flex
              justify-center
              items-center'
            onClick={searchCallback}
          >
            <IoMdSearch fontSize={21} />
          </button>
          <input
            className='p-2 w-full bg-slate-200 outline-none'
            type='text'
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder='Search'
            value={searchTerm}
            onFocus={() => navigate('/search')}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className='flex gap-3 '>
          <Link to={`user-profile/${user?._id}`} className='hidden md:block'>
            <img src={user.image} alt='user-pic' className='w-14 h-12 rounded-lg ' />
          </Link>
          <Link
            className='
              bg-black
              text-white
              rounded-lg
              w-12
              h-12
              md:w-14
              md:h-12
              flex
              justify-center
              items-center'
            to='/create-pin'
          >
            <IoMdAdd />
          </Link>
        </div>
      </div>
    );
  }

  return null;
};

export default Navbar;