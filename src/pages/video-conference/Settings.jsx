import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

const Settings = ({ isActive, close }) => {

  const { meetupId } = useParams()
  const [isCopied, setIsCopied] = useState(false)

  const copyToClipBoard = () => {
    setIsCopied(true)
    navigator.clipboard.writeText(meetupId)
  }

  return (
    <div className={`absolute top-0 left-0 bg-white w-full h-full p-5 transition-transform ${isActive? '' : '-translate-x-full'}`}>
      <div className="text-right mb-2">
        <button className='' onClick={close}>close</button>
      </div>
      <div className="">
        <ul className='text-center py-3 rounded bg-tileColor'>
          <li>
            {meetupId}
          </li>
          <button
            onClick={copyToClipBoard}
            className=' px-9 mt-3 py-2 rounded border capitalize bg-primary text-white'>
            {isCopied ? 'copied' : 'copy'}
          </button>
        </ul>
      </div>
    </div>
  )
}

export default Settings