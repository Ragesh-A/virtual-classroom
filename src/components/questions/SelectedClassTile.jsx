import { useDispatch } from "react-redux";
import { setNotification } from "../../utils/store/uiSlice";

const SelectedClassTile = ({ classes, setClasses }) => {
  
  const dispatch = useDispatch();
  const handleRemoveClass = (classId) => {

    if (classes.length <= 1 ){
      dispatch(setNotification({ success: false, message: 'At least one class is required' }))
      return 
    }
    setClasses((prevClasses) => {
      return prevClasses.filter(
        (classItem) => classItem._id !== classId
      );
      
    });
  };
  
  return (
    <div className="flex flex-wrap py-2 gap-3">
      {classes &&
        classes?.map((single) => (
          <div
            className="bg-primary text-white p-1 px-2 text-sm rounded flex items-center justify-center"
            key={single?._id}
          >
            <p className="uppercase">{single?.name}</p>
            <i
              className="fa-solid fa-xmark p-1 cursor-pointer"
              onClick={() => handleRemoveClass(single._id)}
            ></i>
          </div>
        ))}
    </div>
  );
};

export default SelectedClassTile;
