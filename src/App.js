import { createBrowserRouter } from "react-router-dom";
import authRoute from './routes/authRoutes';
import classRoute from './routes/classRoute'

const App = createBrowserRouter([authRoute, classRoute, {path: '*', element: <>404</>}]);

export default App;
