const Chat = ({user, message}) => {

  function getRelativeTime(time) {
    const currentTime = new Date();
    const timestamp = new Date(time);
  
    const timeDiffInSeconds = Math.floor((currentTime - timestamp) / 1000);
  
    if (timeDiffInSeconds < 60) {
      return 'just now';
    } else if (timeDiffInSeconds < 3600) {
      const minutes = Math.floor(timeDiffInSeconds / 60);
      return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    } else if (timeDiffInSeconds < 86400) {
      const hours = Math.floor(timeDiffInSeconds / 3600);
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else {
      const days = Math.floor(timeDiffInSeconds / 86400);
      return `${days} day${days !== 1 ? 's' : ''} ago`;
    }
  }
  
  return (
    
    <div className="px-2 mb-1">
   <div className={`flex ${ user === message?.sender?._id && 'justify-end'}`}>
      <div className={`${ user === message?.sender?._id  ? "bg-gradient-to-r from-lightPrimary to-primary text-white rounded-s-xl rounded-ee-xl" : "bg-white border text-textColor rounded-e-xl  rounded-es-xl"} text-sm px-4 py-3 max-w-[70%]`}>
        <p className="">{message?.content?.text}</p>
      </div>
    </div> 
      <span className={`flex ${ user === message?.sender?._id && 'justify-end'} p-2 text-[8px]`}>{getRelativeTime(message?.createdAt)}</span>
    </div>
  
  )
}

export default Chat;

// currentUserId