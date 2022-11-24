import React from 'react'
import twilight from '../assets/Twilight.svg';
import { Link } from 'react-router-dom';

import '../styles/signUp.css';

import { MdOutlineAccountCircle, MdOutlineEmail, MdOutlineVpnKey, MdArrowForward } from 'react-icons/md';

const SignUp = () => {
  return (
    <div className='justify-center flex items-center '>
      {/* <img
        className='
          fixed
          w-full
          h-full
          left-0
          '
        src={twilight} /> */}

      <div
        className='
          z-10
          h-full'
      >
        <h2
          className='
            text-3xl
            font-semibold
            text-white
            my-2'
        >
          Sign Up
        </h2>
        <h3
          className='
            text-md
            text-white-400
            opacity-30
            my-2'
        >
          It's quick & simple
        </h3>

        <form className='flex-col justify-end'  >
          <div className='textbox' >
            <input
              className="input peer"
              placeholder=" "
              type="text"
              required
              id="accountName"
            />
            <label
              className="label"
              htmlFor="accountName"
            >
              Name
            </label>

            <MdOutlineAccountCircle className='icon' />
          </div>

          <div className='textbox'>
            <input
              className="input peer"
              placeholder=" "
              required
              id="email"
            />
            <label
              className="label"
              htmlFor="email"
            >
              Email
            </label>
            <MdOutlineEmail className='icon' />
          </div>
          <div className='textbox'>
            <input
              className="input peer"
              placeholder=" "
              type='password'
              required
              id="password"
            />
            <label
              className="label"
              htmlFor="password"
            >
              Password
            </label>
            <MdOutlineVpnKey className='icon' />
          </div>

          <button
            className='
              flex
              items-center
              cursor-pointer
              px-4
              py-2
              mt-6
              rounded-lg
              border-0
              font-semibold
              bg-blue-600
              text-white'
            type='submit'
          >
            Register&nbsp;&nbsp;
            <MdArrowForward className='text-lg' />
          </button>

        </form>

        <p
          className='
            text-white-400
            mt-5'
        >
          Signed up already?&nbsp;
          <Link to='/login' className=' text-blue-500'>&nbsp;Login here</Link>
        </p>
      </div>
    </div>
  )
}

export default SignUp