const Chat = ({user, message}) => {
  return (
    
    <div className="">
   <div className={`flex ${ user === message?.senderId && 'justify-end'} p-2`}>
      <div className={`${ user === message?.senderId ? "bg-primary text-white" : "bg-tileColor text-textColor"} text-sm px-4 py-2 rounded-md max-w-[70%]`}>
        {message?.message}
      </div>
    </div> 
      <p className={`flex ${ user === message?.senderId && 'justify-end'} p-2`}>{message?.createdAt}</p>
    </div>
  
  )
}

export default Chat;

// currentUserId