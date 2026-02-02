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

function Sidebar({ collapsed, onToggle }) {
    const location = useLocation();

    return (
        <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
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
                                >
                                    <Icon className="sidebar-link-icon" size={20} />
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
                <NavLink to="/notifications" className="sidebar-link" title={collapsed ? 'Notifications' : undefined}>
                    <Bell size={20} />
                    {!collapsed && <span>Notifications</span>}
                    <span className="notification-badge">3</span>
                </NavLink>
                <NavLink to="/help" className="sidebar-link" title={collapsed ? 'Help & Docs' : undefined}>
                    <HelpCircle size={20} />
                    {!collapsed && <span>Help & Docs</span>}
                </NavLink>
            </div>
        </aside>
    );
}

export default Sidebar;
