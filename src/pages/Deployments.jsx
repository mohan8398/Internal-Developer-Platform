import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Search,
    Filter,
    Plus,
    Calendar,
    RefreshCw,
    CheckCircle2,
    XCircle,
    Clock
} from 'lucide-react';
import DeploymentRow from '../components/ui/DeploymentRow';
import { deployments } from '../data/mockData';
import './Deployments.css';

function Deployments() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [envFilter, setEnvFilter] = useState('all');

    const filteredDeployments = deployments.filter(dep => {
        const matchesSearch = dep.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
            dep.message.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'all' || dep.status === statusFilter;
        const matchesEnv = envFilter === 'all' || dep.environment === envFilter;
        return matchesSearch && matchesStatus && matchesEnv;
    });

    const deploymentStats = {
        total: deployments.length,
        success: deployments.filter(d => d.status === 'success').length,
        failed: deployments.filter(d => d.status === 'failed').length,
        running: deployments.filter(d => d.status === 'running').length
    };

    return (
        <div className="deployments-page">
            {/* Page Header */}
            <div className="page-header">
                <div className="header-content">
                    <h1 className="page-title">Deployments</h1>
                    <p className="page-subtitle">
                        Track and manage your service deployments
                    </p>
                </div>
                <div className="header-actions">
                    <button className="btn btn-secondary">
                        <Calendar size={16} />
                        Schedule
                    </button>
                    <button className="btn btn-primary" onClick={() => navigate('/deployments/new')}>
                        <Plus size={16} />
                        New Deployment
                    </button>
                </div>
            </div>

            {/* Stats Bar */}
            <div className="deployment-stats">
                <div className="stat-card-mini">
                    <div className="stat-icon total">
                        <Clock size={20} />
                    </div>
                    <div className="stat-info">
                        <span className="stat-value">{deploymentStats.total}</span>
                        <span className="stat-label">Total Deployments</span>
                    </div>
                </div>
                <div className="stat-card-mini">
                    <div className="stat-icon success">
                        <CheckCircle2 size={20} />
                    </div>
                    <div className="stat-info">
                        <span className="stat-value">{deploymentStats.success}</span>
                        <span className="stat-label">Successful</span>
                    </div>
                </div>
                <div className="stat-card-mini">
                    <div className="stat-icon failed">
                        <XCircle size={20} />
                    </div>
                    <div className="stat-info">
                        <span className="stat-value">{deploymentStats.failed}</span>
                        <span className="stat-label">Failed</span>
                    </div>
                </div>
                <div className="stat-card-mini">
                    <div className="stat-icon running">
                        <RefreshCw size={20} />
                    </div>
                    <div className="stat-info">
                        <span className="stat-value">{deploymentStats.running}</span>
                        <span className="stat-label">In Progress</span>
                    </div>
                </div>
            </div>

            {/* Toolbar */}
            <div className="deployments-toolbar">
                <div className="toolbar-left">
                    <div className="search-box">
                        <Search className="search-icon" size={18} />
                        <input
                            type="text"
                            placeholder="Search deployments..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="input"
                        />
                    </div>

                    <div className="filter-group">
                        <Filter size={16} />
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="input select"
                        >
                            <option value="all">All Status</option>
                            <option value="success">Success</option>
                            <option value="failed">Failed</option>
                            <option value="running">Running</option>
                        </select>
                        <select
                            value={envFilter}
                            onChange={(e) => setEnvFilter(e.target.value)}
                            className="input select"
                        >
                            <option value="all">All Environments</option>
                            <option value="production">Production</option>
                            <option value="staging">Staging</option>
                            <option value="development">Development</option>
                        </select>
                    </div>


                </div>

                <button className="btn btn-ghost">
                    <RefreshCw size={16} />
                    Refresh
                </button>
            </div>

            {/* Deployments List */}
            <div className="deployments-list">
                {filteredDeployments.length > 0 ? (
                    filteredDeployments.map(deployment => (
                        <DeploymentRow key={deployment.id} deployment={deployment} />
                    ))
                ) : (
                    <div className="empty-state">
                        <div className="empty-icon">🚀</div>
                        <h3>No deployments found</h3>
                        <p>Try adjusting your search or filter criteria</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Deployments;
