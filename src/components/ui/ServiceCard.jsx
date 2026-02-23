import {
    MoreVertical,
    ExternalLink,
    GitBranch,
    Clock,
    Cpu,
    MemoryStick,
    Activity
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import './ServiceCard.css';

function ServiceCard({ service }) {
    // Map API data to UI requirements
    const uiData = {
        name: service.name,
        description: service.description || 'No description provided.',
        team: service.teamId || 'Platform',
        status: service.active ? 'healthy' : 'critical',
        language: (service.tags && service.tags[0]) || 'Node.js',
        tags: service.tags || [],
        cpu: service.resources?.cpu || Math.floor(Math.random() * 40 + 10),
        memory: service.resources?.memory || Math.floor(Math.random() * 50 + 20),
        requests: 1200 + Math.floor(Math.random() * 800),
        latency: 45 + Math.floor(Math.random() * 50),
        errorRate: (Math.random() * 0.5).toFixed(2),
        lastDeployment: service.updatedAt || service.createdAt || new Date(),
        instances: service.resources?.replicas || 2,
        repository: service.repositoryUrl || '#'
    };

    const getStatusClass = (status) => {
        switch (status) {
            case 'healthy': return 'success';
            case 'warning': return 'warning';
            case 'critical': return 'danger';
            default: return 'neutral';
        }
    };

    const getLanguageColor = (language) => {
        const colors = {
            'Node.js': '#68a063',
            'Java': '#f89820',
            'Python': '#3776ab',
            'Go': '#00add8',
            'Scala': '#dc322f',
            'Rust': '#dea584'
        };
        return colors[language] || '#64748b';
    };

    return (
        <div className={`service-card ${uiData.status}`}>
            <div className="service-card-header">
                <div className="service-info">
                    <div className="service-status-indicator">
                        <span className={`status-dot ${getStatusClass(uiData.status)}`} />
                    </div>
                    <div>
                        <h3 className="service-name">{uiData.name}</h3>
                        <span className="service-team">{uiData.team}</span>
                    </div>
                </div>
                <button className="service-menu-btn">
                    <MoreVertical size={16} />
                </button>
            </div>

            <p className="service-description">{uiData.description}</p>

            <div className="service-tags">
                <span
                    className="language-tag"
                    style={{ '--lang-color': getLanguageColor(uiData.language) }}
                >
                    {uiData.language}
                </span>
                {uiData.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="service-tag">{tag}</span>
                ))}
            </div>

            <div className="service-metrics">
                <div className="metric">
                    <Cpu size={14} />
                    <span>{uiData.cpu}%</span>
                    <div className="metric-bar">
                        <div
                            className="metric-fill cpu"
                            style={{ width: `${uiData.cpu}%` }}
                        />
                    </div>
                </div>
                <div className="metric">
                    <MemoryStick size={14} />
                    <span>{uiData.memory}%</span>
                    <div className="metric-bar">
                        <div
                            className="metric-fill memory"
                            style={{ width: `${uiData.memory}%` }}
                        />
                    </div>
                </div>
            </div>

            <div className="service-stats">
                <div className="stat-item">
                    <Activity size={14} />
                    <span>{(uiData.requests / 1000).toFixed(1)}K/min</span>
                </div>
                <div className="stat-item">
                    <Clock size={14} />
                    <span>{uiData.latency}ms</span>
                </div>
                <div className="stat-item">
                    <span className={`error-rate ${uiData.errorRate > 1 ? 'high' : ''}`}>
                        {uiData.errorRate}% err
                    </span>
                </div>
            </div>

            <div className="service-footer">
                <div className="last-deploy">
                    <GitBranch size={14} />
                    <span>
                        {formatDistanceToNow(new Date(uiData.lastDeployment), { addSuffix: true })}
                    </span>
                </div>
                <div className="instance-count">
                    {uiData.instances} instance{uiData.instances !== 1 ? 's' : ''}
                </div>
            </div>

            <a href={uiData.repository} className="service-link" target="_blank" rel="noopener noreferrer">
                <ExternalLink size={14} />
            </a>
        </div>
    );
}

export default ServiceCard;
