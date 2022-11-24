import React from 'react'
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import shareVideo from '../assets/share.mp4';
import logo from '../assets/logowhite.png';
import { client } from '../client';
import { Modal, SignUp } from '../components';

import '../styles/login.css';

const Login = () => {
  const navigate = useNavigate();

  const doc = {
    _id: 'f53c8b7d-e795-456e-8307-76fda45a7180',
    _type: 'user',
    userName: 'Masloto',
    image: 'https://pingo.bg/Content/products/1596/800-800.jpg'
  };

  const successfulLogin = () => {
    localStorage.setItem('user', JSON.stringify({ id: doc._id, name: doc.userName, imageUrl: doc.image }));

    client.createIfNotExists(doc)
      .then(() => {
        navigate('/', { replace: true })
    }).catch(error => console.error(error));
  }

  const toggleModal = () => {
    document.body.classList.toggle('open');
  }

  return (
    <div
      className='
        flex
        justify-start
        items-center
        flex-col
        h-screen'
    >
      <div className='relative w-full h-full'>
        <video
          className='w-full h-full object-cover'
          src={shareVideo}
          type='video/mp4'
          loop
          controls={false}
          muted
          autoPlay
        />

        <div
          className='
            absolute
            flex
            flex-col
            justify-center
            items-center
            top-0
            right-0
            left-0
            bottom-0
            bg-blackOverlay'
        >
          <div className='p-5'>
            <img src={logo} width="130px" alt='logo' />
          </div>

          <div className='shadow-2xl'>
            <button
              className='
                bg-mainColor
                flex
                justify-center
                items-center
                p-3
                rounded-lg
                outline-none'
              type='button'
              onClick={successfulLogin}
            >
              <FcGoogle className='mr-4' /> Sign in with Google
            </button>
          </div>

          <div className='pt-6 pb-3 justify-center flex opacity-50'>
            <div className='border-t-2 boroder-t-white w-20' />
            <div className='z-10 -mt-3 px-4'>
              <p className='text-white'>or</p>
            </div>
            <div className='border-t-2 boroder-t-white w-20' />
          </div>

          <div className='shadow-2xl'>
            <button
              className='
                bg-mainColor
                flex
                justify-center
                items-center
                px-3
                py-2
                w-40
                rounded-lg
                outline-none'
              type='button'
              onClick={toggleModal}
            >
              Sign up
            </button>
          </div>

          <div className="background" onClick={toggleModal} />

          <Modal>
            <SignUp />
          </Modal>

        </div>
      </div>
    </div>
  )
}

export default Login