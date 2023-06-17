import { useNavigate } from "react-router-dom";

const AnnouncementCard = ({ announcement }) => {
  const { _id, title, description, icon, createdBy, theme, action, classes } =
    announcement;

    const navigate = useNavigate();

    let color;  
    switch(theme) {
      case 'gray': color = 'gray'; break;
      case 'danger': color = 'red'; break;
      case 'success': color = 'green'; break;
      case 'warning': color = 'orange'; break;
      case 'hope': color = 'blue'; break;
      default: color = 'gray'
    }

    const handleSelection = (announcementId) => {
      navigate(`/organization/announcements/${announcementId}`)
    }

  return (
    <div className="border-2 rounded hover:shadow cursor-pointer p-2 md:px-5 flex w-full gap-5" onClick={()=>handleSelection(_id)}>
      <div className="flex justify-center items-center">
        <i className={`${icon} text-${color}-500 text-3xl md:text-2xl`}></i>
      </div>
      <div className="">
        <div className="flex gap-5">
        <p className="capitalize font-bold text-md text-textColor">{title}</p>
        <p className="text-gray-500 text">{description}</p>
        </div>
        <div className="flex flex-wrap py-2">
        {classes &&
          classes?.map((single) => (
            <div className="bg-primary text-white p-1 px-2 text-sm rounded flex items-center justify-center" key={single?._id} >
              <p className="uppercase">{single?.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnnouncementCard;
