const Chat = ({user, message}) => {
  return (
    
   <div className={`flex ${ user && 'justify-end'} p-2`}>
      <div className={`${user ? "bg-primary text-white" : "bg-tileColor text-textColor"} text-sm px-4 py-2 rounded-md max-w-[70%]`}>
        {message}
      </div>
    </div> 
  
  )
}

export default Chat;