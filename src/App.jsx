import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Services from './pages/Services';
import Deployments from './pages/Deployments';
import Infrastructure from './pages/Infrastructure';
import Monitoring from './pages/Monitoring';
import Teams from './pages/Teams';
import Settings from './pages/Settings';
import Notifications from './pages/Notifications';
import Profile from './pages/Profile';
import NewDeployment from './pages/NewDeployment';
import NewService from './pages/NewService';
import { ThemeProvider } from './context/ThemeContext';
import './index.css';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="services" element={<Services />} />
            <Route path="deployments" element={<Deployments />} />
            <Route path="infrastructure" element={<Infrastructure />} />
            <Route path="monitoring" element={<Monitoring />} />
            <Route path="teams" element={<Teams />} />
            <Route path="settings" element={<Settings />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="profile" element={<Profile />} />
            <Route path="deployments/new" element={<NewDeployment />} />
            <Route path="services/new" element={<NewService />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
