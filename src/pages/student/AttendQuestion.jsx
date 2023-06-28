import { useEffect, useState } from 'react';
import Notification from '../../components/common/Notification';
import { Link, useNavigate } from 'react-router-dom';

const AttendQuestion = ({ selected, back }) => {
  const [start, setStart] = useState(false);
  const [message, setMessage] = useState(false);
  const date = new Date();

  useEffect(() => {
    if (selected.date === date.toISOString().split('T')[0]) {
      const currentTime = date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
      const convertedCurrentTime = convertTo24HourFormat(currentTime);
      const isBetweenTimes =
        selected.startTime <= convertedCurrentTime &&
        convertedCurrentTime <= selected.endTime;

      console.log(isBetweenTimes);

      if (isBetweenTimes) {
        setStart(true);
      } else {
        setMessage('The current time is outside the startTime and endTime.');
      }
    } else {
      setMessage('Date is Expired');
    }
  }, []);

  function convertTo24HourFormat(time) {
    const [timeString, period] = time.split(' ');
    let [hours, minutes] = timeString.split(':');

    if (period === 'PM' && hours !== '12') {
      hours = String(Number(hours) + 12);
    } else if (period === 'AM' && hours === '12') {
      hours = '00';
    }

    return `${hours}:${minutes}`;
  }

  const navigate = useNavigate();

  if (!selected) navigate(-1);
  return (
    <>
      <Notification />
      <div className="px-5 py-3 md:py-3 lg:px-6 xl:px-14  min-h-[80vh] md:min-h-[90vh] flex flex-col justify-center items-center">
        <div className="text-center">
          <p className="text-center text-red-500 text-3xl md:text-5xl mb-2">
            Important
          </p>
          <p>Do to switch the tab</p>
          <p>Do to close the tab</p>
          <p>When you press the start the question submission will start.</p>
          {start && (
            <Link to={selected._id}>
              <p className="bg-primary px-5 py-2 text-white my-3">start</p>
            </Link>
          )}
          {message && <p className="text-red-500">{message}</p>}
          <p>
            The Test is scheduled at
            <span className="text-primary"> {selected.date}</span> start at
            <span className="text-primary">{selected.startTime}</span> end at
            <span className="text-primary">{selected.endTime}</span>
          </p>
        </div>
        <button onClick={back}>back</button>
      </div>
    </>
  );
};
export default AttendQuestion;
