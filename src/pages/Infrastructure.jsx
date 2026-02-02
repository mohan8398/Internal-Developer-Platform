import { useState } from 'react';
import {
    Server,
    Database,
    Cloud,
    HardDrive,
    Cpu,
    MemoryStick,
    DollarSign,
    Plus,
    MoreVertical,
    ExternalLink,
    RefreshCw,
    TrendingUp
} from 'lucide-react';
import { infrastructure, environments } from '../data/mockData';
import './Infrastructure.css';

function Infrastructure() {
    const [selectedEnv, setSelectedEnv] = useState('all');

    const getTypeIcon = (type) => {
        switch (type) {
            case 'Kubernetes': return <Cloud size={20} />;
            case 'Database': return <Database size={20} />;
            case 'Cache': return <HardDrive size={20} />;
            case 'CDN': return <Server size={20} />;
            default: return <Server size={20} />;
        }
    };

    const totalCost = infrastructure.reduce((sum, item) => sum + item.cost, 0);
    const totalNodes = infrastructure.reduce((sum, item) => sum + item.nodes, 0);
    const avgCpu = Math.round(infrastructure.filter(i => i.cpu).reduce((sum, item) => sum + item.cpu, 0) / infrastructure.filter(i => i.cpu).length);
    const avgMemory = Math.round(infrastructure.filter(i => i.memory).reduce((sum, item) => sum + item.memory, 0) / infrastructure.filter(i => i.memory).length);

    return (
        <div className="infrastructure-page">
            {/* Page Header */}
            <div className="page-header">
                <div className="header-content">
                    <h1 className="page-title">Infrastructure</h1>
                    <p className="page-subtitle">
                        Manage your cloud resources and infrastructure
                    </p>
                </div>
                <div className="header-actions">
                    <button className="btn btn-secondary">
                        <RefreshCw size={16} />
                        Sync Resources
                    </button>
                    <button className="btn btn-primary">
                        <Plus size={16} />
                        Add Resource
                    </button>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="infra-stats">
                <div className="infra-stat-card">
                    <div className="stat-header">
                        <span className="stat-label">Total Monthly Cost</span>
                        <DollarSign size={18} className="stat-icon" />
                    </div>
                    <div className="stat-value">${totalCost.toLocaleString()}</div>
                    <div className="stat-trend positive">
                        <TrendingUp size={14} />
                        <span>8% below budget</span>
                    </div>
                </div>

                <div className="infra-stat-card">
                    <div className="stat-header">
                        <span className="stat-label">Total Nodes</span>
                        <Server size={18} className="stat-icon" />
                    </div>
                    <div className="stat-value">{totalNodes}</div>
                    <div className="stat-trend">
                        <span>Across all clusters</span>
                    </div>
                </div>

                <div className="infra-stat-card">
                    <div className="stat-header">
                        <span className="stat-label">Avg CPU Usage</span>
                        <Cpu size={18} className="stat-icon" />
                    </div>
                    <div className="stat-value">{avgCpu}%</div>
                    <div className="progress-bar-mini">
                        <div className="progress-fill cpu" style={{ width: `${avgCpu}%` }} />
                    </div>
                </div>

                <div className="infra-stat-card">
                    <div className="stat-header">
                        <span className="stat-label">Avg Memory Usage</span>
                        <MemoryStick size={18} className="stat-icon" />
                    </div>
                    <div className="stat-value">{avgMemory}%</div>
                    <div className="progress-bar-mini">
                        <div className="progress-fill memory" style={{ width: `${avgMemory}%` }} />
                    </div>
                </div>
            </div>

            {/* Environments */}
            <div className="section">
                <div className="section-header">
                    <h2 className="section-title">Environments</h2>
                    <button className="btn btn-ghost btn-sm">
                        <Plus size={14} />
                        Add Environment
                    </button>
                </div>
                <div className="environments-grid">
                    {environments.map(env => (
                        <div key={env.id} className={`environment-card ${env.status}`}>
                            <div className="env-header">
                                <div className="env-info">
                                    <span className={`env-status ${env.status}`} />
                                    <h3 className="env-name">{env.name}</h3>
                                </div>
                                <span className="env-region">{env.region}</span>
                            </div>
                            <div className="env-stats">
                                <div className="env-stat">
                                    <span className="env-stat-value">{env.services}</span>
                                    <span className="env-stat-label">Services</span>
                                </div>
                                <div className="env-stat">
                                    <span className="env-stat-value">${env.cost.toLocaleString()}</span>
                                    <span className="env-stat-label">Monthly Cost</span>
                                </div>
                            </div>
                            <div className="env-footer">
                                <button className="btn btn-ghost btn-sm">View Details</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Resources */}
            <div className="section">
                <div className="section-header">
                    <h2 className="section-title">Resources</h2>
                    <div className="section-filters">
                        <select
                            value={selectedEnv}
                            onChange={(e) => setSelectedEnv(e.target.value)}
                            className="input select"
                        >
                            <option value="all">All Environments</option>
                            <option value="production">Production</option>
                            <option value="staging">Staging</option>
                        </select>
                    </div>
                </div>
                <div className="resources-grid">
                    {infrastructure.map(resource => (
                        <div key={resource.id} className="resource-card">
                            <div className="resource-header">
                                <div className={`resource-icon ${resource.type.toLowerCase()}`}>
                                    {getTypeIcon(resource.type)}
                                </div>
                                <div className="resource-info">
                                    <h4 className="resource-name">{resource.name}</h4>
                                    <div className="resource-meta">
                                        <span className="resource-type">{resource.type}</span>
                                        <span className="resource-provider">{resource.provider}</span>
                                    </div>
                                </div>
                                <button className="resource-menu">
                                    <MoreVertical size={16} />
                                </button>
                            </div>

                            <div className="resource-details">
                                <div className="detail-row">
                                    <span className="detail-label">Region</span>
                                    <span className="detail-value">{resource.region}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">Nodes</span>
                                    <span className="detail-value">{resource.nodes}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">Status</span>
                                    <span className={`status-badge ${resource.status}`}>
                                        {resource.status}
                                    </span>
                                </div>
                            </div>

                            {resource.cpu !== null && (
                                <div className="resource-metrics">
                                    <div className="metric-row">
                                        <span className="metric-label">CPU</span>
                                        <span className="metric-value">{resource.cpu}%</span>
                                        <div className="metric-bar">
                                            <div
                                                className="metric-fill cpu"
                                                style={{ width: `${resource.cpu}%` }}
                                            />
                                        </div>
                                    </div>
                                    <div className="metric-row">
                                        <span className="metric-label">Memory</span>
                                        <span className="metric-value">{resource.memory}%</span>
                                        <div className="metric-bar">
                                            <div
                                                className="metric-fill memory"
                                                style={{ width: `${resource.memory}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="resource-footer">
                                <span className="resource-cost">${resource.cost.toLocaleString()}/mo</span>
                                <a href="#" className="resource-link">
                                    <ExternalLink size={14} />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Infrastructure;
