import { useState } from 'react';
import {
    User,
    Bell,
    Shield,
    Palette,
    Globe,
    Key,
    Mail,
    Smartphone,
    Save,
    Check
} from 'lucide-react';
import './Settings.css';

function Settings() {
    const [activeTab, setActiveTab] = useState('profile');
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    const tabs = [
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'security', label: 'Security', icon: Shield },
        { id: 'appearance', label: 'Appearance', icon: Palette },
        { id: 'integrations', label: 'Integrations', icon: Globe }
    ];

    return (
        <div className="settings-page">
            {/* Page Header */}
            <div className="page-header">
                <div className="header-content">
                    <h1 className="page-title">Settings</h1>
                    <p className="page-subtitle">
                        Manage your account and platform preferences
                    </p>
                </div>
                <button className="btn btn-primary" onClick={handleSave}>
                    {saved ? (
                        <>
                            <Check size={16} />
                            Saved!
                        </>
                    ) : (
                        <>
                            <Save size={16} />
                            Save Changes
                        </>
                    )}
                </button>
            </div>

            <div className="settings-layout">
                {/* Sidebar Tabs */}
                <div className="settings-nav">
                    {tabs.map(tab => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                className={`settings-tab ${activeTab === tab.id ? 'active' : ''}`}
                                onClick={() => setActiveTab(tab.id)}
                            >
                                <Icon size={18} />
                                <span>{tab.label}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Settings Content */}
                <div className="settings-content">
                    {activeTab === 'profile' && (
                        <div className="settings-section">
                            <div className="section-header">
                                <h2 className="section-title">Profile Settings</h2>
                                <p className="section-description">Update your personal information and profile details.</p>
                            </div>

                            <div className="settings-card">
                                <div className="profile-header">
                                    <div className="profile-avatar">
                                        <span>JD</span>
                                    </div>
                                    <div className="profile-info">
                                        <h3>John Doe</h3>
                                        <p>john.doe@company.com</p>
                                    </div>
                                    <button className="btn btn-secondary btn-sm">Change Photo</button>
                                </div>
                            </div>

                            <div className="settings-card">
                                <h3 className="card-title">Personal Information</h3>
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label className="form-label">First Name</label>
                                        <input type="text" className="input" defaultValue="John" />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Last Name</label>
                                        <input type="text" className="input" defaultValue="Doe" />
                                    </div>
                                    <div className="form-group full-width">
                                        <label className="form-label">Email Address</label>
                                        <div className="input-with-icon">
                                            <Mail className="icon" size={18} />
                                            <input type="email" className="input" defaultValue="john.doe@company.com" />
                                        </div>
                                    </div>
                                    <div className="form-group full-width">
                                        <label className="form-label">Phone Number</label>
                                        <div className="input-with-icon">
                                            <Smartphone className="icon" size={18} />
                                            <input type="tel" className="input" defaultValue="+1 (555) 123-4567" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="settings-card">
                                <h3 className="card-title">Role & Team</h3>
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label className="form-label">Role</label>
                                        <select className="input select">
                                            <option>Platform Admin</option>
                                            <option>Developer</option>
                                            <option>Team Lead</option>
                                            <option>Viewer</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Team</label>
                                        <select className="input select">
                                            <option>Platform</option>
                                            <option>Payments</option>
                                            <option>Data</option>
                                            <option>Commerce</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'notifications' && (
                        <div className="settings-section">
                            <div className="section-header">
                                <h2 className="section-title">Notification Preferences</h2>
                                <p className="section-description">Configure how and when you receive notifications.</p>
                            </div>

                            <div className="settings-card">
                                <h3 className="card-title">Email Notifications</h3>
                                <div className="toggle-list">
                                    <div className="toggle-item">
                                        <div className="toggle-info">
                                            <span className="toggle-label">Deployment alerts</span>
                                            <span className="toggle-description">Get notified when deployments succeed or fail</span>
                                        </div>
                                        <label className="toggle">
                                            <input type="checkbox" defaultChecked />
                                            <span className="toggle-slider" />
                                        </label>
                                    </div>
                                    <div className="toggle-item">
                                        <div className="toggle-info">
                                            <span className="toggle-label">Critical alerts</span>
                                            <span className="toggle-description">Receive alerts for critical system issues</span>
                                        </div>
                                        <label className="toggle">
                                            <input type="checkbox" defaultChecked />
                                            <span className="toggle-slider" />
                                        </label>
                                    </div>
                                    <div className="toggle-item">
                                        <div className="toggle-info">
                                            <span className="toggle-label">Weekly digest</span>
                                            <span className="toggle-description">Weekly summary of platform activity</span>
                                        </div>
                                        <label className="toggle">
                                            <input type="checkbox" />
                                            <span className="toggle-slider" />
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="settings-card">
                                <h3 className="card-title">Push Notifications</h3>
                                <div className="toggle-list">
                                    <div className="toggle-item">
                                        <div className="toggle-info">
                                            <span className="toggle-label">Browser notifications</span>
                                            <span className="toggle-description">Receive push notifications in your browser</span>
                                        </div>
                                        <label className="toggle">
                                            <input type="checkbox" defaultChecked />
                                            <span className="toggle-slider" />
                                        </label>
                                    </div>
                                    <div className="toggle-item">
                                        <div className="toggle-info">
                                            <span className="toggle-label">Mobile notifications</span>
                                            <span className="toggle-description">Get alerts on your mobile device</span>
                                        </div>
                                        <label className="toggle">
                                            <input type="checkbox" defaultChecked />
                                            <span className="toggle-slider" />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'security' && (
                        <div className="settings-section">
                            <div className="section-header">
                                <h2 className="section-title">Security Settings</h2>
                                <p className="section-description">Manage your account security and authentication methods.</p>
                            </div>

                            <div className="settings-card">
                                <h3 className="card-title">Password</h3>
                                <p className="card-description">Last changed 30 days ago</p>
                                <button className="btn btn-secondary">Change Password</button>
                            </div>

                            <div className="settings-card">
                                <h3 className="card-title">Two-Factor Authentication</h3>
                                <p className="card-description">Add an extra layer of security to your account</p>
                                <div className="security-status enabled">
                                    <Shield size={20} />
                                    <span>2FA is enabled</span>
                                </div>
                                <button className="btn btn-ghost">Manage 2FA</button>
                            </div>

                            <div className="settings-card">
                                <h3 className="card-title">API Keys</h3>
                                <p className="card-description">Manage your API keys for programmatic access</p>
                                <div className="api-key-list">
                                    <div className="api-key-item">
                                        <div className="key-info">
                                            <Key size={16} />
                                            <span className="key-name">Production API Key</span>
                                        </div>
                                        <span className="key-value">••••••••••••••••</span>
                                        <button className="btn btn-ghost btn-sm">Reveal</button>
                                    </div>
                                </div>
                                <button className="btn btn-secondary">Generate New Key</button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'appearance' && (
                        <div className="settings-section">
                            <div className="section-header">
                                <h2 className="section-title">Appearance</h2>
                                <p className="section-description">Customize the look and feel of the platform.</p>
                            </div>

                            <div className="settings-card">
                                <h3 className="card-title">Theme</h3>
                                <div className="theme-options">
                                    <div className="theme-option active">
                                        <div className="theme-preview dark" />
                                        <span>Dark</span>
                                    </div>
                                    <div className="theme-option">
                                        <div className="theme-preview light" />
                                        <span>Light</span>
                                    </div>
                                    <div className="theme-option">
                                        <div className="theme-preview system" />
                                        <span>System</span>
                                    </div>
                                </div>
                            </div>

                            <div className="settings-card">
                                <h3 className="card-title">Accent Color</h3>
                                <div className="color-options">
                                    <button className="color-option active" style={{ background: '#3b82f6' }} />
                                    <button className="color-option" style={{ background: '#a855f7' }} />
                                    <button className="color-option" style={{ background: '#10b981' }} />
                                    <button className="color-option" style={{ background: '#f59e0b' }} />
                                    <button className="color-option" style={{ background: '#f43f5e' }} />
                                    <button className="color-option" style={{ background: '#6366f1' }} />
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'integrations' && (
                        <div className="settings-section">
                            <div className="section-header">
                                <h2 className="section-title">Integrations</h2>
                                <p className="section-description">Connect third-party services and tools.</p>
                            </div>

                            <div className="integrations-grid">
                                <div className="integration-card connected">
                                    <div className="integration-logo github">GH</div>
                                    <div className="integration-info">
                                        <h4>GitHub</h4>
                                        <p>Connected</p>
                                    </div>
                                    <button className="btn btn-ghost btn-sm">Configure</button>
                                </div>
                                <div className="integration-card connected">
                                    <div className="integration-logo slack">SL</div>
                                    <div className="integration-info">
                                        <h4>Slack</h4>
                                        <p>Connected</p>
                                    </div>
                                    <button className="btn btn-ghost btn-sm">Configure</button>
                                </div>
                                <div className="integration-card">
                                    <div className="integration-logo jira">JI</div>
                                    <div className="integration-info">
                                        <h4>Jira</h4>
                                        <p>Not connected</p>
                                    </div>
                                    <button className="btn btn-secondary btn-sm">Connect</button>
                                </div>
                                <div className="integration-card">
                                    <div className="integration-logo datadog">DD</div>
                                    <div className="integration-info">
                                        <h4>Datadog</h4>
                                        <p>Not connected</p>
                                    </div>
                                    <button className="btn btn-secondary btn-sm">Connect</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Settings;
