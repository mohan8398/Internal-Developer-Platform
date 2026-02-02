import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Search,
    Bell,
    Menu,
    Sun,
    Moon,
    Command,
    ChevronDown,
    LogOut,
    User,
    Settings
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import './Header.css';

function Header({ onMenuClick, pageTitle }) {
    const { isDarkMode, toggleTheme } = useTheme();
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);

    const notifications = [
        { id: 1, type: 'alert', title: 'Critical Alert', message: 'analytics-engine error rate exceeded threshold', time: '5m ago', unread: true },
        { id: 2, type: 'deployment', title: 'Deployment Complete', message: 'user-service v2.4.1 deployed successfully', time: '30m ago', unread: true },
        { id: 3, type: 'info', title: 'New Team Member', message: 'Alex Johnson joined the Platform team', time: '2h ago', unread: false }
    ];

    return (
        <header className="header">
            <div className="header-left">
                <button className="header-menu-btn" onClick={onMenuClick}>
                    <Menu size={20} />
                </button>

                <div className="header-breadcrumb">
                    <span className="breadcrumb-current">{pageTitle || 'Dashboard'}</span>
                </div>
            </div>

            <div className="header-center">
                <div className="header-search">
                    <Search className="search-icon" size={18} />
                    <input
                        type="text"
                        placeholder="Search services, deployments, docs..."
                        className="input"
                    />
                    <div className="search-shortcut">
                        <Command size={12} />
                        <span>K</span>
                    </div>
                </div>
            </div>

            <div className="header-right">
                {/* Theme Toggle */}
                <button
                    className="header-icon-btn"
                    onClick={toggleTheme}
                    aria-label="Toggle theme"
                >
                    {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                {/* Notifications */}
                <div className="header-dropdown">
                    <button
                        className="header-icon-btn"
                        onClick={() => setShowNotifications(!showNotifications)}
                        aria-label="Notifications"
                    >
                        <Bell size={20} />
                        <span className="notification-indicator" />
                    </button>

                    {showNotifications && (
                        <div className="dropdown-menu notifications-menu">
                            <div className="dropdown-header">
                                <h4>Notifications</h4>
                                <button className="mark-read-btn">Mark all read</button>
                            </div>
                            <div className="notifications-list">
                                {notifications.map(notification => (
                                    <div
                                        key={notification.id}
                                        className={`notification-item ${notification.unread ? 'unread' : ''}`}
                                    >
                                        <div className={`notification-icon ${notification.type}`}>
                                            <Bell size={14} />
                                        </div>
                                        <div className="notification-content">
                                            <div className="notification-title">{notification.title}</div>
                                            <div className="notification-message">{notification.message}</div>
                                            <div className="notification-time">{notification.time}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="dropdown-footer">
                                <Link to="/notifications" onClick={() => setShowNotifications(false)}>
                                    View all notifications
                                </Link>
                            </div>
                        </div>
                    )}
                </div>

                {/* Environment Selector */}
                <div className="env-selector">
                    <div className="env-indicator production" />
                    <span>Production</span>
                    <ChevronDown size={14} />
                </div>

                {/* User Menu */}
                <div className="header-dropdown">
                    <button
                        className="user-menu-trigger"
                        onClick={() => setShowUserMenu(!showUserMenu)}
                    >
                        <div className="user-avatar">
                            <span>JD</span>
                        </div>
                        <span className="user-name">John Doe</span>
                        <ChevronDown size={12} className="text-muted" />
                    </button>

                    {showUserMenu && (
                        <div className="dropdown-menu user-dropdown">
                            <div className="dropdown-user-header">
                                <div className="user-avatar lg">
                                    <span>JD</span>
                                </div>
                                <div>
                                    <div className="user-name">John Doe</div>
                                    <div className="user-email">john.doe@company.com</div>
                                </div>
                            </div>
                            <div className="dropdown-divider" />
                            <Link to="/profile" className="dropdown-item" onClick={() => setShowUserMenu(false)}>
                                <User size={16} />
                                <span>Profile</span>
                            </Link>
                            <Link to="/settings" className="dropdown-item" onClick={() => setShowUserMenu(false)}>
                                <Settings size={16} />
                                <span>Settings</span>
                            </Link>
                            <div className="dropdown-divider" />
                            <button className="dropdown-item danger">
                                <LogOut size={16} />
                                <span>Sign out</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
