import { useState } from 'react';
import {
    Users,
    Plus,
    Search,
    Mail,
    MessageSquare,
    Phone,
    MoreVertical,
    Shield,
    Calendar,
    Boxes
} from 'lucide-react';
import { teams } from '../data/mockData';
import './Teams.css';

function Teams() {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredTeams = teams.filter(team =>
        team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        team.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalMembers = teams.reduce((sum, team) => sum + team.members, 0);
    const totalServices = teams.reduce((sum, team) => sum + team.services, 0);

    return (
        <div className="teams-page">
            {/* Page Header */}
            <div className="page-header">
                <div className="header-content">
                    <h1 className="page-title">Teams</h1>
                    <p className="page-subtitle">
                        Manage teams and access control
                    </p>
                </div>
                <div className="header-actions">
                    <button className="btn btn-primary">
                        <Plus size={16} />
                        Create Team
                    </button>
                </div>
            </div>

            {/* Overview Stats */}
            <div className="teams-overview">
                <div className="overview-stat">
                    <div className="stat-icon">
                        <Users size={20} />
                    </div>
                    <div className="stat-info">
                        <span className="stat-value">{teams.length}</span>
                        <span className="stat-label">Teams</span>
                    </div>
                </div>
                <div className="overview-stat">
                    <div className="stat-icon members">
                        <Users size={20} />
                    </div>
                    <div className="stat-info">
                        <span className="stat-value">{totalMembers}</span>
                        <span className="stat-label">Total Members</span>
                    </div>
                </div>
                <div className="overview-stat">
                    <div className="stat-icon services">
                        <Boxes size={20} />
                    </div>
                    <div className="stat-info">
                        <span className="stat-value">{totalServices}</span>
                        <span className="stat-label">Owned Services</span>
                    </div>
                </div>
            </div>

            {/* Search */}
            <div className="teams-toolbar">
                <div className="search-box">
                    <Search className="search-icon" size={18} />
                    <input
                        type="text"
                        placeholder="Search teams..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="input"
                    />
                </div>
            </div>

            {/* Teams Grid */}
            <div className="teams-grid">
                {filteredTeams.map(team => (
                    <div key={team.id} className="team-card">
                        <div className="team-header">
                            <div className="team-avatar">
                                <span>{team.name.charAt(0)}</span>
                            </div>
                            <div className="team-info">
                                <h3 className="team-name">{team.name}</h3>
                                <p className="team-description">{team.description}</p>
                            </div>
                            <button className="team-menu">
                                <MoreVertical size={16} />
                            </button>
                        </div>

                        <div className="team-stats">
                            <div className="team-stat">
                                <Users size={16} />
                                <span>{team.members} members</span>
                            </div>
                            <div className="team-stat">
                                <Boxes size={16} />
                                <span>{team.services} services</span>
                            </div>
                        </div>

                        <div className="team-details">
                            <div className="detail-item">
                                <Shield size={14} />
                                <span className="detail-label">Lead:</span>
                                <span className="detail-value">{team.lead}</span>
                            </div>
                            <div className="detail-item">
                                <Phone size={14} />
                                <span className="detail-label">On-call:</span>
                                <span className="detail-value">{team.oncall}</span>
                            </div>
                            <div className="detail-item">
                                <MessageSquare size={14} />
                                <span className="detail-label">Slack:</span>
                                <a href="#" className="detail-link">{team.slack}</a>
                            </div>
                        </div>

                        <div className="team-members-preview">
                            <div className="members-avatars">
                                {[...Array(Math.min(5, team.members))].map((_, i) => (
                                    <div key={i} className="member-avatar">
                                        <span>{String.fromCharCode(65 + i)}</span>
                                    </div>
                                ))}
                                {team.members > 5 && (
                                    <div className="member-avatar more">
                                        <span>+{team.members - 5}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="team-footer">
                            <button className="btn btn-ghost btn-sm">View Team</button>
                            <button className="btn btn-ghost btn-sm">
                                <Mail size={14} />
                                Contact
                            </button>
                        </div>
                    </div>
                ))}

                {/* Add Team Card */}
                <div className="team-card add-team">
                    <div className="add-team-content">
                        <div className="add-icon">
                            <Plus size={24} />
                        </div>
                        <h3>Create New Team</h3>
                        <p>Set up a new team and invite members</p>
                        <button className="btn btn-primary">
                            <Plus size={16} />
                            Create Team
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Teams;
