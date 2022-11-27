import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { MdDownloadForOffline } from 'react-icons/md';
import { BsFillArrowUpRightCircleFill, BsThreeDotsVertical } from 'react-icons/bs';
import { Popover } from './';

import { client, urlFor } from '../client';

const Pin = ({ pin }) => {
  const [postHovered, setPostHovered] = useState(false);
  const [savingPost, setSavingPost] = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  const navigate = useNavigate();

  const { postedBy, image, _id, destination } = pin;
  const user = JSON.parse(localStorage.getItem('user'));

  document.addEventListener("click", function(event) {
    if (event.target.closest(".popover")) return;
    setShowPopover(false);
  })

  let alreadySaved = pin?.save?.filter(item => item?.postedBy?._id === user?.id);
  alreadySaved = alreadySaved?.length > 0 ? alreadySaved : [];

  const savePin = (id) => {
    if (alreadySaved?.length === 0) {
      setSavingPost(true);

      client
        .patch(id)
        .setIfMissing({ save: [] })
        .insert('after', 'save[-1]', [{
          _key: uuidv4(),
          userId: user?.id,
          postedBy: {
            _type: 'postedBy',
            _ref: user?.id
          },
        }])
        .commit()
        .then(() => {
          window.location.reload();
          setSavingPost(false);
        });
    }
  };

  const deletePin = (id) => {
    client
      .delete(id)
      .then(() => {
        window.location.reload();
      });
  };

  const renderPopover = () => {
    setShowPopover(true);
  }

  return (
    <div
      className='
        pin
        m-2
        before:opacity-0
        before:transition-opacity duration-1000
        before:absolute
        before:h-full
        hover:before:opacity-100'
    >
      <div
        className='
          relative
          cursor-pointer
          w-auto
          hover:shadow-lg
          rounded-lg
          overflow-hidden
          transition-all
          duration-500
          ease-in-out
          z-10'
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`/pin-detail/${_id}`)}
      >
        {image && (
          <img
            className='rounded-lg w-full'
            alt='user-post'
            src={urlFor(image).width(450).url()}
          />
        )}

        {postHovered && (
          <div
            className='
              absolute
              top-0
              w-full
              h-full
              flex
              flex-col

              justify-between
              p-2
              z-1'
            >
              <div className='flex items-center justify-between'>
                <div >
                  <a
                    className='
                      bg-white
                      w-9
                      h-9
                      rounded-full
                      flex
                      items-center
                      justify-center
                      text-dark
                      text-xl
                      opacity-75
                      hover:opacity-100
                      hover:shadow-md
                      outline-none'
                    href={`${image?.asset?.url}?dl=`}
                    download
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MdDownloadForOffline />
                  </a>
                </div>

                {alreadySaved?.length !== 0 ? (
                  <button
                    type='button'
                    className='
                      bg-red-500
                      opacity-75
                      hover:opacity-100
                      text-white
                      font-bold
                      px-5
                      py-1
                      text-base
                      roundex-3xl
                      hover:shadow-md
                      outline-none'
                  >
                    {pin?.save?.length} Saved
                  </button>
                ) : (
                  <button
                    type='button'
                    className='
                    bg-red-500
                      opacity-75
                      hover:opacity-100
                      text-white
                      font-bold
                      px-5
                      rounded-full
                      py-1
                      text-base
                      roundex-3xl
                      hover:shadow-md
                      outline-none'
                    onClick={(e) => {
                      e.stopPropagation();
                      savePin(_id);
                    }}
                  >
                    {pin?.save?.length} {savingPost ? 'Saving' : 'Save'}
                  </button>
                )}
              </div>
              <div className='flex justify-between item-center gap-2 w-full'>
                {destination?.slice(8).length > 0 ? (
                  <a
                    className='
                    bg-white
                      h-6
                      mt-1
                      flex
                      items-center
                      gap-2
                      text-black
                      font-bold
                      p-2
                      px-2
                      text-sm
                      w-36
                      rounded-full
                      opacity-75
                      hover:opacity-100
                      hover:shadow-md'
                    href={destination}
                    target='_blank'
                    rel='noreferrer'
                  >
                    <BsFillArrowUpRightCircleFill size={18} />
                    {destination?.slice(8, 17)}...
                  </a>
                ) : undefined}

                {
                  postedBy?._id === user?.id && (
                    <button
                      className='
                        bg-white
                        rounded-full
                        w-8
                        h-8
                        absolute
                        right-2
                        bottom-2
                        flex
                        items-center
                        justify-center
                        text-dark
                        opacity-75
                        hover:opacity-100
                        hover:shadow-md'
                      type='button'
                      onClick={(e) => {
                        e.stopPropagation();
                        renderPopover();
                      }}
                    >
                      <BsThreeDotsVertical />
                    </button>
                  )
                }
              </div>
          </div>
        )}
      </div>
      <Link to={`/user-profile/${postedBy?._id}`} className='flex gap-2 mt-2 items-center w-fit'>
        <img
          className='w-8 h-8 rounded-full object-cover'
          src={postedBy?.image}
          alt='user-profile'
        />
        <p className='font-semibold capitalize'>{postedBy?.userName}</p>
      </Link>

      {showPopover && (<Popover id='popover' imageUrl={destination} />)}
    </div>
  )
}

export default Pin;
