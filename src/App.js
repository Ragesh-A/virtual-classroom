import { createBrowserRouter } from "react-router-dom";
import authRoute from './routes/authRoutes';
import {allClassRoute, classRoute} from './routes/classRoute'
import adminRoute from "./routes/adminRoute";
import organizerRoute from "./routes/organizerRoute";

const App = createBrowserRouter([authRoute, allClassRoute, classRoute, adminRoute, organizerRoute,{path: '*', element: <>404</>}]);

export default App;
