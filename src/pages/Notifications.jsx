import { useState } from 'react';
import {
    Bell,
    CheckCircle2,
    AlertTriangle,
    Info,
    Search,
    Filter,
    Trash2,
    MoreVertical,
    Rocket,
    ShieldAlert,
    UserPlus
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import './Notifications.css';

// Extended mock data for the notifications page
const initialNotifications = [
    {
        id: 'notif-1',
        type: 'alert',
        severity: 'critical',
        title: 'High CPU Usage',
        message: 'user-service in production has exceeded 90% CPU utilization for 5 minutes.',
        timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5m ago
        read: false,
        category: 'Infrastructure'
    },
    {
        id: 'notif-2',
        type: 'deployment',
        status: 'success',
        title: 'Deployment Successful',
        message: 'analytics-api v1.4.2 was successfully deployed to production.',
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30m ago
        read: false,
        category: 'Deployments'
    },
    {
        id: 'notif-3',
        type: 'team',
        title: 'New Team Member',
        message: 'Sarah Connor has been added to the Payments team.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2h ago
        read: true,
        category: 'Teams'
    },
    {
        id: 'notif-4',
        type: 'security',
        severity: 'warning',
        title: 'Security Vulnerability',
        message: 'A new high-severity vulnerability was found in the base image of auth-service.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5h ago
        read: false,
        category: 'Security'
    },
    {
        id: 'notif-5',
        type: 'alert',
        severity: 'warning',
        title: 'Memory Leak Warning',
        message: 'Subtle memory leak detected in worker-service (staging). Usage rising steadily.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1d ago
        read: true,
        category: 'Infrastructure'
    },
    {
        id: 'notif-6',
        type: 'deployment',
        status: 'failed',
        title: 'Deployment Failed',
        message: 'Frontend-v2 deployment to production failed during the health check phase.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2d ago
        read: true,
        category: 'Deployments'
    }
];

function Notifications() {
    const [notifications, setNotifications] = useState(initialNotifications);
    const [filter, setFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const getIcon = (notif) => {
        switch (notif.type) {
            case 'alert':
                return notif.severity === 'critical' ? <ShieldAlert className="text-danger" /> : <AlertTriangle className="text-warning" />;
            case 'deployment':
                return notif.status === 'success' ? <Rocket className="text-success" /> : <Rocket className="text-danger" />;
            case 'team':
                return <UserPlus className="text-accent" />;
            case 'security':
                return <ShieldAlert className="text-warning" />;
            default:
                return <Bell className="text-secondary" />;
        }
    };

    const filteredNotifications = notifications.filter(n => {
        const matchesFilter = filter === 'all' ||
            (filter === 'unread' && !n.read) ||
            n.type === filter;
        const matchesSearch = n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            n.message.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

    const markAsRead = (id) => {
        setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
    };

    const deleteNotification = (id) => {
        setNotifications(notifications.filter(n => n.id !== id));
    };

    const clearAll = () => {
        setNotifications([]);
    };

    return (
        <div className="notifications-page">
            <div className="page-header">
                <div className="header-content">
                    <h1 className="page-title">Notifications</h1>
                    <p className="page-subtitle">Stay updated with system events, deployments, and alerts.</p>
                </div>
                <div className="header-actions">
                    <button className="btn btn-secondary" onClick={markAllAsRead}>
                        <CheckCircle2 size={16} />
                        Mark all read
                    </button>
                    <button className="btn btn-ghost text-danger" onClick={clearAll}>
                        <Trash2 size={16} />
                        Clear all
                    </button>
                </div>
            </div>

            <div className="notifications-container">
                {/* Toolbar */}
                <div className="notifications-toolbar">
                    <div className="search-box">
                        <Search className="search-icon" size={18} />
                        <input
                            type="text"
                            placeholder="Search notifications..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="input"
                        />
                    </div>

                    <div className="filter-tabs">
                        {['all', 'unread', 'alert', 'deployment', 'team'].map(f => (
                            <button
                                key={f}
                                className={`filter-tab ${filter === f ? 'active' : ''}`}
                                onClick={() => setFilter(f)}
                            >
                                {f.charAt(0).toUpperCase() + f.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Notifications List */}
                <div className="notifications-list">
                    {filteredNotifications.length > 0 ? (
                        filteredNotifications.map(notif => (
                            <div key={notif.id} className={`notification-card ${notif.read ? 'read' : 'unread'}`}>
                                <div className="notif-icon-wrapper">
                                    {getIcon(notif)}
                                    {!notif.read && <span className="unread-dot" />}
                                </div>

                                <div className="notif-content">
                                    <div className="notif-header">
                                        <h3 className="notif-title">{notif.title}</h3>
                                        <span className="notif-time">
                                            {formatDistanceToNow(notif.timestamp, { addSuffix: true })}
                                        </span>
                                    </div>
                                    <p className="notif-message">{notif.message}</p>
                                    <div className="notif-footer">
                                        <span className="notif-category">{notif.category}</span>
                                        <div className="notif-actions">
                                            {!notif.read && (
                                                <button className="action-btn" onClick={() => markAsRead(notif.id)}>
                                                    Mark as read
                                                </button>
                                            )}
                                            <button className="action-btn delete" onClick={() => deleteNotification(notif.id)}>
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <button className="notif-menu-btn">
                                    <MoreVertical size={16} />
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="empty-state">
                            <div className="empty-icon">
                                <Bell size={48} />
                            </div>
                            <h3>No notifications found</h3>
                            <p>You're all caught up! Check back later for updates.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Notifications;
