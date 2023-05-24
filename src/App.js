import { createBrowserRouter } from "react-router-dom";
import authRoute from './routes/authRoutes';
import {allClassRoute, classRoute} from './routes/classRoute'

const App = createBrowserRouter([authRoute, allClassRoute, classRoute, {path: '*', element: <>404</>}]);

export default App;
