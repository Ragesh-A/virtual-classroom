import background from '../../assets/images/maintenance.gif'
import { useRouteError } from 'react-router-dom';

const ErrorElement = ({ error }) => {
  
  const routeError = useRouteError()
  const supportEmail = 'support@example.com';
  const subject = 'Error Report';

  return(
    <div className="flex flex-col items-center justify-center h-screen">
      <img draggable='false' src={background} alt="error" className='max-w-[250px]'/>
      <p className='font-bold  text-red-500'>{error.toString()}</p>
      <p className='max-w-md text-center'>If you encounter this error, please help us resolve the issue by sending an email
            with a screenshot to <a className='text-blue-500' href={`mailto:${supportEmail}?subject=${encodeURIComponent(subject)}`}>virtualclassroom.assist@gmail.com.</a></p>
            

    </div>
  )
};

export default ErrorElement;