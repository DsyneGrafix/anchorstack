import { jsx as _jsx } from "react/jsx-runtime";
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from './components/Layout';
import AppRoutes from './pages/app-routes';
const App = () => {
    return (_jsx(Router, { children: _jsx(Layout, { children: _jsx(AppRoutes, {}) }) }));
};
export default App;
