import React, { useState } from 'react'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { MdDelete } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

import { client } from '../client'
import Spinner from './Spinner'
import { categories } from '../utils/data'

const CreatePin = ({ user }) => {
  const [title, setTitle] = useState('');
  const [about, setAbout] = useState('');
  const [destination, setDestination] = useState('');
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState(false);
  const [category, setCategory] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);
  const [wrongImateType, setWrongImateType] = useState(false);

  const navigate = useNavigate();

  const uploadImage = (e) => {
    const selectedFile = e.target.files[0];
    switch (selectedFile.type) {
      case 'image/png':
      case 'image/svg':
      case 'image/jpeg':
        setWrongImateType(false);
        setLoading(true);
        client.assets
          .upload('image', selectedFile, { contentType: selectedFile.type, name: selectedFile.name })
          .then(document => {
            setImageAsset(document);
            setLoading(false)
          }).catch(error => {
            console.log('Image upload error', error);
          })
        break;
      default:
        setLoading(false);
        setWrongImateType(true);
        break;
    }
  };

  const savePin = () => {
    if (title
      && about
      && destination
      && imageAsset?._id
      && category) {
      const doc = {
        _type: 'pin',
        title,
        about,
        destination,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageAsset?._id
          }
        },
        userId: user._id,
        postedBy: {
          _type: 'postedBy',
          _ref: user._id
        },
        category
      };

      client.create(doc)
        .then(() => {
          setTimeout(() => {
            navigate('/');
          }, 1000);
        });
    } else {
      setFields(true);
      setTimeout(() => {
        setFields(false);
        <Spinner message='Redirecting back to home. Plase wait...'/>
      }, 2000);
    }
  };

  return (
    <div
      className='
        relative
        flex
        flex-col
        justify-center
        items-center
        mt-5
        lg:h4/5'
    >
      <div
        className='
          flex
          lg:flex-row
          rounded-3xl
          border-2
          border-gray-200
          justify-center
          items-center
          bg-white
          lg:p-5
          p-3
          w-800'
      >
        <div
          className='
            bg-secondaryColor
            rounded-lg
            p-3
            flex
            flex-0.7
            w-full'
        >
          {loading && <Spinner />}
          {!imageAsset ? (
            <label
              className='
                flex
                cursor-pointer
                justify-center
                items-center
                flex-col
                border-2
                border-dotted
                border-spacing-32
                border-gray-300
                p-3
                w-full
                h-420'
            >
              <div
                className='
                  p-2
                  flex
                  flex-col
                  items-center
                  justify-center
                  h-full'
              >
                <div
                  className='
                    flex
                    flex-col
                    justify-center
                    items-center'
                >
                  <p className='font-bold text-2xl'>
                    <AiOutlineCloudUpload />
                  </p>
                  <p className='text-lg'>Upload</p>
                </div>

                <p className='mt-32 text-gray-400 text-center	'>
                  Use a high quality image (JPEG, SVG, PNG)
                </p>

                <input
                  className='w-0 h-0'
                  type='file'
                  name='upload-image'
                  onChange={uploadImage} />
              </div>
            </label>
            ) : (
              <div className='relative h-full'>
                <img src={imageAsset?.url} alt='uploaded-image' className='h-full w-full' />
                <button
                  className='
                    absolute
                    bottom-3
                    right-3
                    p-3
                    rounded-full
                    bg-white
                    text-xl
                    cursor-pointer
                    outline-none
                    hover:shadow-md
                    transition-all
                    duration-500
                    ease-in-out'
                  type='button'
                  onClick={() => setImageAsset(null)}
                >
                  <MdDelete />
                </button>
              </div>
            )}
            {wrongImateType &&
              <div className='absolute flex items-center flex-col'>
                <p className='text-red-500 font-bold text-xl'>
                  Wrong image type
                </p>
                <p className='text-gray-700'>
                  Try again
                </p>
              </div>
            }
          </div>
        {fields && (
          <p
            className='
              absolute
              -bottom-10
              text-red-500
              font-semiBold
              text-xl
              slide-fwd'
          >
            Please fill in all the fields.
          </p>
        )}
        <div
          className='
            flex
            flex-1
            flex-col
            gap-6
            lg:pl-5
            mt-5
            w-full'
        >
          <input
            className='
              outline:none
              text-xl
              sm:text-2xl
              font-bold
              border-b-2
              border-gray-200
              p-2'
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Add title here'
          />

          {user && (
            <div
              className='
                flex
                gap-2
                my-2
                items-center
                bg-white
                rounded-lg'
            >
              <img
                className='w-10 h-10 rounded-full'
                src={user.image}
                alt='user-profile'
              />
              <p className='font-bold'>{user.userName}</p>
            </div>
          )}

          <input
            className='
              outline:none
              text-base
              sm:text-xl
              font-bold
              border-b-2
              border-gray-200
              p-2'
            type='text'
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder='Add pin meaning'
          />

          <input
            className='
              outline:none
              text-base
              sm:text-xl
              font-bold
              border-b-2
              border-gray-200
              p-2'
            type='text'
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder='Add link to image destination'
          />

          <div className='flex flex-col'>
            <div>
              <p
                className='
                  mb-2
                  font-semibold
                  text-lg
                  sm:text-xl'
              >
                Choose Pin category
              </p>
              <select
                className='
                  outline-none
                  w-4/5
                  capitalize
                  text-base
                  border-b-2
                  border-gray-200
                  p-2
                  rounded-md
                  cursor-pointer'
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value='others' disabled className='bg-white'>Select category</option>

                {categories.map((category, idx) => (
                  <option
                    className='
                      text-base
                      border-0
                      outline-none
                      bg-white
                      capitalize
                      text-black'
                    key={idx}
                    value={category.name}
                  >
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div
              className='
                flex
                justify-end
                items-end
                mt-5'
            >
              <button
                className='
                  bg-blue-600
                  bg-opacity-95
                  text-white
                  font-bold
                  p-2
                  rounded-full
                  w-28
                  outline-none
                  hover:bg-opacity-100'
                type='button'
                onClick={savePin}
              >
                Save Pin
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePin