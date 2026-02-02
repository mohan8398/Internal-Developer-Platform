import { useState } from 'react';
import {
    User,
    Mail,
    MapPin,
    Calendar,
    Edit2,
    Github,
    Twitter,
    Globe,
    Award,
    Clock,
    CheckCircle2,
    Rocket,
    ShieldCheck,
    Zap,
    Boxes
} from 'lucide-react';
import './Profile.css';

function Profile() {
    const [user] = useState({
        name: 'John Doe',
        role: 'Senior Platform Engineer',
        email: 'john.doe@company.com',
        location: 'San Francisco, CA',
        joined: 'January 2024',
        bio: 'Building scalable infrastructure and improving developer experience at scale. Passionate about Kubernetes, Go, and Platform Engineering.',
        stats: {
            services: 12,
            deployments: 145,
            approvals: 28,
            reliability: '99.99%'
        },
        skills: ['Kubernetes', 'Go', 'AWS', 'Terraform', 'React', 'TypeScript', 'PostgreSQL', 'Redis'],
        activeServices: [
            { id: '1', name: 'auth-service', status: 'healthy', traffic: '12k rpm' },
            { id: '2', name: 'payment-gateway', status: 'healthy', traffic: '5k rpm' },
            { id: '3', name: 'user-analytics', status: 'warning', traffic: '25k rpm' }
        ],
        recentActivity: [
            { id: 1, type: 'deployment', action: 'Deployed', target: 'auth-service v2.4.5', time: '2 hours ago', status: 'success' },
            { id: 2, type: 'approval', action: 'Approved', target: 'PR #1422 in infra-repo', time: '5 hours ago', status: 'info' },
            { id: 3, type: 'security', action: 'Resolved', target: 'CVE-2024-1234 in base-image', time: '1 day ago', status: 'success' },
            { id: 4, type: 'service', action: 'Created', target: 'new-billing-microservice', time: '3 days ago', status: 'success' }
        ]
    });

    return (
        <div className="profile-page">
            <div className="profile-grid">
                {/* Left Column - Main Info */}
                <div className="profile-sidebar">
                    <div className="profile-card hero-card">
                        <div className="profile-avatar-large">
                            <span>JD</span>
                            <button className="edit-avatar-btn">
                                <Edit2 size={16} />
                            </button>
                        </div>
                        <h1 className="user-name">{user.name}</h1>
                        <p className="user-role">{user.role}</p>

                        <div className="user-meta">
                            <div className="meta-item">
                                <Mail size={16} />
                                <span>{user.email}</span>
                            </div>
                            <div className="meta-item">
                                <MapPin size={16} />
                                <span>{user.location}</span>
                            </div>
                            <div className="meta-item">
                                <Calendar size={16} />
                                <span>Joined {user.joined}</span>
                            </div>
                        </div>

                        <div className="profile-socials">
                            <a href="#" className="social-link"><Github size={18} /></a>
                            <a href="#" className="social-link"><Twitter size={18} /></a>
                            <a href="#" className="social-link"><Globe size={18} /></a>
                        </div>

                        <button className="btn btn-primary full-width mt-6">
                            <Edit2 size={16} />
                            Edit Profile
                        </button>
                    </div>

                    <div className="profile-card">
                        <h3 className="card-title">Technical Expertise</h3>
                        <div className="skills-grid">
                            {user.skills.map(skill => (
                                <span key={skill} className="skill-tag">{skill}</span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column - Stats & Activity */}
                <div className="profile-content">
                    {/* Stats Bar */}
                    <div className="profile-stats-grid">
                        <div className="p-stat-card">
                            <div className="p-stat-icon services">
                                <Boxes size={24} />
                            </div>
                            <div className="p-stat-info">
                                <span className="p-stat-value">{user.stats.services}</span>
                                <span className="p-stat-label">Services Owned</span>
                            </div>
                        </div>
                        <div className="p-stat-card">
                            <div className="p-stat-icon deployments">
                                <Rocket size={24} />
                            </div>
                            <div className="p-stat-info">
                                <span className="p-stat-value">{user.stats.deployments}</span>
                                <span className="p-stat-label">Deployments</span>
                            </div>
                        </div>
                        <div className="p-stat-card">
                            <div className="p-stat-icon approvals">
                                <CheckCircle2 size={24} />
                            </div>
                            <div className="p-stat-info">
                                <span className="p-stat-value">{user.stats.approvals}</span>
                                <span className="p-stat-label">PRs Approved</span>
                            </div>
                        </div>
                        <div className="p-stat-card">
                            <div className="p-stat-icon reliability">
                                <ShieldCheck size={24} />
                            </div>
                            <div className="p-stat-info">
                                <span className="p-stat-value">{user.stats.reliability}</span>
                                <span className="p-stat-label">Reliability</span>
                            </div>
                        </div>
                    </div>

                    {/* About Section */}
                    <div className="profile-card">
                        <h3 className="card-title">About</h3>
                        <p className="bio-text">{user.bio}</p>
                    </div>

                    {/* Active Services */}
                    <div className="profile-card">
                        <div className="card-header-flex">
                            <h3 className="card-title">Managed Services</h3>
                            <button className="btn btn-ghost btn-sm">View All</button>
                        </div>
                        <div className="mini-service-list">
                            {user.activeServices.map(svc => (
                                <div key={svc.id} className="mini-service-item">
                                    <div className="svc-info">
                                        <span className={`status-dot ${svc.status}`} />
                                        <span className="svc-name">{svc.name}</span>
                                    </div>
                                    <div className="svc-metrics">
                                        <Zap size={14} className="text-warning" />
                                        <span>{svc.traffic}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Activity Timeline */}
                    <div className="profile-card">
                        <h3 className="card-title">Recent Activity</h3>
                        <div className="timeline">
                            {user.recentActivity.map(item => (
                                <div key={item.id} className="timeline-item">
                                    <div className={`timeline-icon-wrapper ${item.status}`}>
                                        <Clock size={16} />
                                    </div>
                                    <div className="timeline-content">
                                        <p className="timeline-text">
                                            <span className="action">{item.action}</span>
                                            <span className="target">{item.target}</span>
                                        </p>
                                        <span className="timeline-time">{item.time}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
