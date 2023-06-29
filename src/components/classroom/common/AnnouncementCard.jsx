import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AnnouncementCard = (props) => {
  const {
    title = 'Title',
    description = 'The description goes here',
    buttonName,
    action,
    icon = 'ri-play-circle-line  ',
    theme
  } = props;
  const [color, setColor] = useState();
  useEffect(()=>{
    let c = 'gray'
    switch(theme) {
      case 'black': c = 'gray'; break;
      case 'danger': c = 'red'; break;
      case 'success': c = 'green'; break;
      case 'warning': c = 'orange'; break;
      case 'hope': c = 'indigo'; break;
      default: c = 'gray'
    }
    setColor(c)
  }, [theme])

  if (!color) return <div className="p-3 px-4 h-[100px] shimmer min-w-[200px] md:min-w-[250px] rounded-md max-w-[400px] shadow shadow-shadow"></div>

  return(
    <div className="p-3 px-4 justify-between  min-w-full md:min-w-[350px] rounded-md flex md:gap-3 max-w-[400px] shadow transitions shadow-shadow hover:max-w-full">
      <div className="">
        <h4 className="font-bold text-sm md:text-2xl text-ellipsis max-w-[250px] max-h-[2.5rem] overflow-hidden">{title}</h4>
        <div className="md:max-w-[450px] max-h-[50px] max-w-[220px] overflow-hidden ellipsis text-[10px] md:text-normal">
         {description}
        </div>
        {buttonName && <Link to={action}><p className={`overflow-hidden whitespace-nowrap text-white px-2 py-1 mt-3 min-w-[100px] max-w-[2rem] rounded uppercase font-bold text-center bg-${color}-500`}>{buttonName}</p></Link>}
      </div>
      <div className={`flex justify-center items-center md:p-2 text-${color}-500`}>
      <i className={`${icon} text-3xl md:text-5xl`}></i>
      </div>
    </div>
  )
}

export default AnnouncementCard;