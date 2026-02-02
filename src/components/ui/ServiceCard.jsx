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
        <div className={`service-card ${service.status}`}>
            <div className="service-card-header">
                <div className="service-info">
                    <div className="service-status-indicator">
                        <span className={`status-dot ${getStatusClass(service.status)}`} />
                    </div>
                    <div>
                        <h3 className="service-name">{service.name}</h3>
                        <span className="service-team">{service.team}</span>
                    </div>
                </div>
                <button className="service-menu-btn">
                    <MoreVertical size={16} />
                </button>
            </div>

            <p className="service-description">{service.description}</p>

            <div className="service-tags">
                <span
                    className="language-tag"
                    style={{ '--lang-color': getLanguageColor(service.language) }}
                >
                    {service.language}
                </span>
                {service.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="service-tag">{tag}</span>
                ))}
            </div>

            <div className="service-metrics">
                <div className="metric">
                    <Cpu size={14} />
                    <span>{service.cpu}%</span>
                    <div className="metric-bar">
                        <div
                            className="metric-fill cpu"
                            style={{ width: `${service.cpu}%` }}
                        />
                    </div>
                </div>
                <div className="metric">
                    <MemoryStick size={14} />
                    <span>{service.memory}%</span>
                    <div className="metric-bar">
                        <div
                            className="metric-fill memory"
                            style={{ width: `${service.memory}%` }}
                        />
                    </div>
                </div>
            </div>

            <div className="service-stats">
                <div className="stat-item">
                    <Activity size={14} />
                    <span>{(service.requests / 1000).toFixed(1)}K/min</span>
                </div>
                <div className="stat-item">
                    <Clock size={14} />
                    <span>{service.latency}ms</span>
                </div>
                <div className="stat-item">
                    <span className={`error-rate ${service.errorRate > 1 ? 'high' : ''}`}>
                        {service.errorRate}% err
                    </span>
                </div>
            </div>

            <div className="service-footer">
                <div className="last-deploy">
                    <GitBranch size={14} />
                    <span>
                        {formatDistanceToNow(new Date(service.lastDeployment), { addSuffix: true })}
                    </span>
                </div>
                <div className="instance-count">
                    {service.instances} instance{service.instances !== 1 ? 's' : ''}
                </div>
            </div>

            <a href={`https://${service.repository}`} className="service-link" target="_blank" rel="noopener noreferrer">
                <ExternalLink size={14} />
            </a>
        </div>
    );
}

export default ServiceCard;
