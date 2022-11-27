import React, { useState, useEffect } from 'react';
import { MdDownloadForOffline } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { client, urlFor } from '../client';
import MasonryLayout from './MasonryLayout';
import { pinDetailMorePinQuery, pinDetailQuery } from '../utils/data';
import Spinner from './Spinner';

const PinDetail = ({ user }) => {
  const { pinId } = useParams();
  const [pins, setPins] = useState();
  const [pinDetail, setPinDetail] = useState();
  const [comment, setComment] = useState('');
  const [addingComment, setAddingComment] = useState(false);

  const fetchPinDetails = () => {
    let query = pinDetailQuery(pinId);

    if (query) {
      client.fetch(query)
        .then(data => {
          setPinDetail(data[0]);

          if(data[0]) {
            query = pinDetailMorePinQuery(data[0]);

            client.fetch(query)
              .then(res => {
                setPins(res);
              })
          }
        })
    } else {
      alert('Query none in fetchPinDetails');
    }
  };

  useEffect(() => {
    fetchPinDetails();
  }, [pinId]);

  if(!pinDetail) return <Spinner message='Loading Pin' />

  const addComment = () => {
    if (comment) {
      setAddingComment(true);

      client
        .patch(pinId)
        .setIfMissing({ comments: [] })
        .insert(
          'after',
          'comments[-1]',
          [{
            comment,
            _key: uuidv4(),
            postedBy: {
              _type: 'postedBy',
              _ref: user._id }
          }]
        )
        .commit()
        .then(() => {
          fetchPinDetails();
          setComment('');
          setAddingComment(false);
        });
    }
  };

  return (
    <>
      {pinDetail && (
        <div
          className='
            flex
            xl:flex-row
            justify-center
            flex-col
            m-auto
            bg-white'
        >
          <div
            className='
              flex
              w-508
              justify-center
              items-center
              md:items-start
              flex-initial'
          >
            <img
              className='rounded-2xl'
              src={pinDetail?.image && urlFor(pinDetail.image).url()}
              alt='user-post'
              />
          </div>

          <div className='w-508 px-5 flex-col xl:mt-0 md:mt-5'>
            <div className='  '>
              <div className='flex gap-2 items-center'>
                <a
                  className='
                    p-2
                    text-2xl
                    rounded-full
                    flex
                    items-center
                    justify-center
                    text-dark
                    opacity-85
                    hover:bg-slate-200
                    hover:opacity-100'
                  href={`${pinDetail.image.asset.url}?dl=`}
                  download
                >
                  <MdDownloadForOffline />
                </a>
              </div>
              <a href={pinDetail.destination} target='_blank' rel='noreferrer'>
                {pinDetail.destination?.slice(8)}
              </a>
            </div>

            <div>
              <h1 className='text-4xl font-bold break-words mt-3'>
                {pinDetail.title}
              </h1>
              <p className='mt-3 capitalize'>
                {pinDetail.about}
              </p>
            </div>
            <Link to={`/user-profile/${pinDetail.postedBy?._id}`} className='flex gap-2 mt-5 items-center'>
              <img
                className='w-8 h-8 rounded-full object-cover'
                src={pinDetail.postedBy?.image}
                alt='user-profile'
                />
              <p className='font-semibold capitalize'>{pinDetail.postedBy?.userName}</p>
            </Link>

            {pinDetail?.comments && (
              <h2 className='mt-5 text-2xl'>Comments</h2>
            )}
            <div className='max-h-370 '>
              {pinDetail?.comments?.map((item) => (
                <div
                  className='
                    flex
                    gap-2
                    mt-5
                    items-center
                    bg-white
                    rounded-lg'
                  key={item.comment}
                >
                  <img
                    className='w-10 h-10 rounded-full cursor-pointer'
                    src={item.postedBy?.image}
                    alt='user-profile'
                    />
                  <div className='flex flex-col'>
                    <p className='font-bold'>{item.postedBy?.userName}</p>
                    <p>{item.comment}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* <div className='flex flex-wrap mt-6 gap-3'>
              <Link to={`/user-profile/${user._id}`}>
                <img
                  className='w-10 h-10 rounded-full cursor-pointer'
                  src={user.image}
                  alt='user-profile' />
              </Link>
              <input
                className='
                  flex-1
                  border-gray-100
                  outline-none
                  border-2
                  p-2
                  rounded-2xl
                  focus:border-gray-300'
                type='text'
                placeholder='Add a comment'
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                />
              <button
                className='
                  bg-red-500
                  text-white
                  rounded-full
                  px-6
                  py-2
                  font-semibold
                  text-base
                  outline-none'
                type='button'
                onClick={addComment}
                >
                {addingComment ? 'Doing...' : 'Done'}
              </button>
            </div> */}

          </div>
        </div>
      )}
      {pins?.length > 0 && (
        <h2 className='text-center font-bold text-2xl mt-8 mb-4'>
          More like this
        </h2>
      )}
      {pins ? (
        <MasonryLayout pins={pins} />
      ) : (
        <Spinner message='Loading more pins' />
      )}

    </>
  )
}

export default PinDetail