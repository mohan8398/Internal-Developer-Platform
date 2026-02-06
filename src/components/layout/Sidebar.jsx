import { NavLink, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Boxes,
    Rocket,
    Server,
    Activity,
    Users,
    Settings,
    Bell,
    HelpCircle,
    ChevronLeft,
    Zap
} from 'lucide-react';
import './Sidebar.css';

const navigation = [
    {
        section: 'Overview',
        items: [
            { name: 'Dashboard', href: '/', icon: LayoutDashboard },
            { name: 'Services', href: '/services', icon: Boxes },
            { name: 'Deployments', href: '/deployments', icon: Rocket }
        ]
    },
    {
        section: 'Infrastructure',
        items: [
            { name: 'Resources', href: '/infrastructure', icon: Server },
            { name: 'Monitoring', href: '/monitoring', icon: Activity }
        ]
    },
    {
        section: 'Organization',
        items: [
            { name: 'Teams', href: '/teams', icon: Users },
            { name: 'Settings', href: '/settings', icon: Settings }
        ]
    }
];

function Sidebar({ collapsed, onToggle, mobileOpen, setMobileOpen }) {
    const location = useLocation();

    const handleLinkClick = () => {
        if (window.innerWidth <= 1024 && setMobileOpen) {
            setMobileOpen(false);
        }
    };

    return (
        <aside className={`sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
            {/* Header */}
            <div className="sidebar-header">
                <div className="sidebar-logo">
                    <Zap size={24} />
                </div>
                {!collapsed && (
                    <div className="sidebar-brand">
                        <span className="sidebar-title">DevPlatform</span>
                        <span className="sidebar-version">v2.0</span>
                    </div>
                )}
                <button
                    className="sidebar-toggle"
                    onClick={onToggle}
                    aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                >
                    <ChevronLeft size={18} />
                </button>
            </div>

            {/* Navigation */}
            <nav className="sidebar-nav">
                {navigation.map((group) => (
                    <div key={group.section} className="sidebar-section">
                        {!collapsed && (
                            <div className="sidebar-section-title">{group.section}</div>
                        )}
                        {group.items.map((item) => {
                            const Icon = item.icon;
                            const isActive = location.pathname === item.href;

                            return (
                                <NavLink
                                    key={item.name}
                                    to={item.href}
                                    className={`sidebar-link ${isActive ? 'active' : ''}`}
                                    title={collapsed ? item.name : undefined}
                                    onClick={() => setMobileOpen(false)}
                                >
                                    <Icon className="sidebar-link-icon" size={10} />
                                    {!collapsed && <span>{item.name}</span>}
                                    {isActive && <div className="sidebar-link-indicator" />}
                                </NavLink>
                            );
                        })}
                    </div>
                ))}
            </nav>

            {/* Footer */}
            <div className="sidebar-footer">
                <NavLink to="/notifications" className="sidebar-link" title={collapsed ? 'Notifications' : undefined} onClick={handleLinkClick}>
                    <Bell size={10} />
                    {!collapsed && <span>Notifications</span>}
                    <span className="notification-badge">3</span>
                </NavLink>
                <NavLink to="/help" className="sidebar-link" title={collapsed ? 'Help & Docs' : undefined} onClick={handleLinkClick}>
                    <HelpCircle size={20} />
                    {!collapsed && <span>Help & Docs</span>}
                </NavLink>
            </div>
        </aside>
    );
}

export default Sidebar;
