import { Route, Routes } from 'react-router-dom';
import Layout from '../Layout/Layout';
import Home from '../views/Home';
import Auth from '../views/Auth';

const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/auth" element={<Auth />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;
