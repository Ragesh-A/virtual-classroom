import { useRef } from "react";
import chatServices from "../../services/chatServices";

const SendBottomBar = ({ friend, chatId, sendedMessage }) => {
  const mes = useRef();
  const sendMessage = async(e) => {
    e.preventDefault()
    const text = mes.current.value.trim();
    if (text) {
      console.log(chatId);
      chatServices.sendMessage(chatId, text).then((res)=>{
        
        if (res.success){
          mes.current.value = '';
          sendedMessage(res.success.isSended);
        }
      })
    }
  }
  return (
    <div className="rounded absolute bottom-3 w-full left-0 px-3">
      <form onSubmit={sendMessage} className="w-full flex gap-1 ">
        <div className="flex px-4 gap-3 items-center w-full rounded-s-[2rem] shadow border-2 text-textColor bg-white">
          <i className="fa-solid fa-face-smile-wink text-primary"></i>
          <input
            type="text"
            placeholder=""
            className="w-full outline-none text-sm"
            ref={mes}
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
  );
};


export default SendBottomBar;