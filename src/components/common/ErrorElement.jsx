import background from '../../assets/images/maintenance.gif'
import { useRouteError } from 'react-router-dom';

const ErrorElement = () => {
  
  const error = useRouteError()

  return(
    <div className="flex items-center justify-center h-screen">
      <img src={background} alt="" />
      {error}
    </div>
  )
};

export default ErrorElement;