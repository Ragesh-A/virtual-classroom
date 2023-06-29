import { useEffect, useRef, useState } from 'react';
import chatServices from '../../services/chatServices';
import { useDispatch } from 'react-redux';
import { setNotification } from '../../utils/store/uiSlice';

const SendBottomBar = ({ socket, chatId, sendedMessage }) => {
  const mes = useRef();
  const dispatch = useDispatch();
  const [typing, setTyping] = useState(false)
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    const handleTyping = (roomId) => {
      if (chatId === roomId) {
        setIsTyping(true);
      }
    };
  
    const handleStopTyping = () => {
      setIsTyping(false);
    };
  
    socket.current?.on('typing', handleTyping);
    socket.current?.on('stop-typing', handleStopTyping);
  
    // Emit 'stop-typing' event for the previous chat ID
    if (chatId) {
      const previousChatId = chatId;
      socket.current?.emit('stop-typing', previousChatId);
    }
  
    // Clean up the event listeners and emit 'stop-typing' event for the current chat ID
    return () => {
      socket.current?.off('typing', handleTyping);
      socket.current?.off('stop-typing', handleStopTyping);
      socket.current?.emit('stop-typing', chatId);
    };
  }, [chatId, socket]);
  

  const sendMessage = async (e) => {
    e.preventDefault();
    socket?.current?.emit('stop-typing', chatId)
    const text = mes.current.value.trim();
    if (text) {
      chatServices.sendMessage(chatId, text).then((res) => {
        if (res.success) {
          socket?.current?.emit('new-message', res.success.isSended) 
          mes.current.value = '';
          sendedMessage(res.success.isSended);
        } else {
          dispatch(
            setNotification({ success: false, message: res.error.message })
          );
        }
      });
    }
  };

  const typingHandler = (e) => {

    if(!typing) {
      setTyping(true)
      socket?.current?.emit('typing', chatId )
    }

    // function to stop typing
    const lastTypingTime = new Date().getTime()
    const timerLength = 2000
    setTimeout(() => {
      var timeNow = new Date().getTime()
      const difference = timeNow - lastTypingTime;

      if (difference >= timerLength && typing) {
        socket.current.emit('stop-typing', chatId)
        setTyping(false)
      }

    }, timerLength);
  }
  

  return (
    <>
      <div className="rounded absolute bottom-3 w-full left-0 px-3">
    <div className="">{isTyping && 'typing...'}</div>
      <form onSubmit={sendMessage} className="w-full flex gap-1 ">
        <div className="flex px-4 gap-3 items-center w-full rounded-s-[2rem] shadow border-2 text-textColor bg-white">
          {/* <i className="fa-solid fa-face-smile-wink text-primary"></i> */}
          <input
            type="text"
            placeholder=""
            className="w-full outline-none text-sm"
            ref={mes}
            onChange={typingHandler}
          />
        </div>
        <button
          type="submit"
          className="px-3 pe-5 py-2 bg-white border-2 rounded-e-[2rem] shadow text-primary"
        >
          <i className="fa-solid fa-paper-plane"></i>
        </button>
      </form>
    </div>
    </>
    
  );
};

export default SendBottomBar;
