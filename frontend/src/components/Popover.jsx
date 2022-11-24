import React, { useState } from 'react'

import { BsUpload } from 'react-icons/bs'
import { copyLinkIcon } from '../utils/shareIcons'

import { FacebookShareButton, FacebookMessengerShareButton } from 'react-share';

const Popover = ({imageUrl}) => {

  const [linkCopied, setLinkCopied] = useState(false);

  const renderFacebookIcon = () => {
    return (
      <div className='flex-row px-2 justify-center items-center' >
        <FacebookShareButton url={imageUrl} className='opacity-90 hover:opacity-100'>
          <svg width='36px' height='36px' style={{ marginLeft: '8px'}} >
            <image width='36px' height='36px'  xlinkHref='https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg'></image>
          </svg>
        </FacebookShareButton>

        <p className='text-xs'>Facebook</p>
      </div>
    )
  }

  const renderCopyIcon = () => {
    return (
      <div className='flex-row px-2 justify-center items-center' >
        <button
          className='
            w-10
            h-10
            mb-2
            ml-1
            justify-center
            items-center
            flex
            bg-slate-200
            rounded-full
            hover:bg-slate-300'
          type='button'
          onClick={() => {
            navigator.clipboard.writeText(imageUrl);
            setLinkCopied(true);
          }}
        >
          {copyLinkIcon()}
        </button>

        {!linkCopied && (<p className='text-xs'>Copy link</p>)}
        {linkCopied && (<p className='text-xs'>Link copied!</p>)}
      </div>
    )
  }

  const renderMessengerIcon = () => {
    return (
      <div className='flex-row px-2 justify-center items-center'>

        {/* appId="274266067164" */}
        <FacebookMessengerShareButton url={imageUrl} className='opacity-90 hover:opacity-100'>
          <svg width='36px' height='36px' style={{ marginLeft: '10px'}} >
            <image width='36px' height='36px' xlinkHref='https://upload.wikimedia.org/wikipedia/commons/b/be/Facebook_Messenger_logo_2020.svg'></image>
          </svg>
        </FacebookMessengerShareButton>

        <p className='text-xs'>Messenger</p>
      </div>
    )
  }

  return (
    <div
      className='
        absolute
        rounded-lg
        -mt-12
        p-3
        h-38
        min-w-210
        ml-1
        shadow-2xl
        block
        overflow-visible
        z-50
        overflow-y-auto
        overflow-x-hidden
        bg-white
        outline-0'
    >
      <div
        className='
        flex
        justify-center
        items-center'
      >
        <div
          className='
            flex
            flex-col
            justify-center
            items-center'
        >
          <p className='text-sm'>Share</p>

          <div
            className='
              mt-4
              flex
              justify-between
              items-center'
          >
            {renderFacebookIcon()}
            {renderMessengerIcon()}
            {renderCopyIcon()}

          </div>
        </div>
      </div>
    </div>
  )
}

export default Popover