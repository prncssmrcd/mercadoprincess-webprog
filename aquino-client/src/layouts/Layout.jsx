import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';

const Layout = () => {
  return (
    <div className="min-h-screen bg-orange-100 text-orange-950">
      <NavBar />
      <main className="pb-16 pt-20">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
