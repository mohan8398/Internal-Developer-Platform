import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import './Layout.css';

const pageTitles = {
    '/': 'Dashboard',
    '/services': 'Services',
    '/deployments': 'Deployments',
    '/infrastructure': 'Infrastructure',
    '/monitoring': 'Monitoring',
    '/teams': 'Teams',
    '/settings': 'Settings'
};

function Layout() {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    const pageTitle = pageTitles[location.pathname] || 'Dashboard';

    return (
        <div className="app-layout">
            <Sidebar
                collapsed={sidebarCollapsed}
                mobileOpen={mobileMenuOpen}
                onMobileClose={() => setMobileMenuOpen(false)}
                onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
            />

            {/* Mobile Overlay */}
            {mobileMenuOpen && (
                <div
                    className="mobile-overlay"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            <main className={`main-content ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
                <Header
                    onMenuClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    pageTitle={pageTitle}
                />

                <div className="page-wrapper">
                    <div className="page-content">
                        <Outlet />
                    </div>
                </div>
            </main>

            {/* Background gradient effect */}
            <div className="bg-gradient-effect" />
        </div>
    );
}

export default Layout;
