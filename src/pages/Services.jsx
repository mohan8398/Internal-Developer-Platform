import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Search,
    Filter,
    Plus,
    Grid,
    List,
    RefreshCw
} from 'lucide-react';
import ServiceCard from '../components/ui/ServiceCard';
import { services } from '../data/mockData';
import './Services.css';

function Services() {
    const navigate = useNavigate();
    const [viewMode, setViewMode] = useState('grid');
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [teamFilter, setTeamFilter] = useState('all');

    const filteredServices = services.filter(service => {
        const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            service.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'all' || service.status === statusFilter;
        const matchesTeam = teamFilter === 'all' || service.team === teamFilter;
        return matchesSearch && matchesStatus && matchesTeam;
    });

    const teams = [...new Set(services.map(s => s.team))];

    const serviceStats = {
        total: services.length,
        healthy: services.filter(s => s.status === 'healthy').length,
        warning: services.filter(s => s.status === 'warning').length,
        critical: services.filter(s => s.status === 'critical').length
    };

    return (
        <div className="services-page">
            {/* Page Header */}
            <div className="page-header">
                <div className="header-content">
                    <h1 className="page-title">Services</h1>
                    <p className="page-subtitle">
                        Manage and monitor your microservices
                    </p>
                </div>
                <div className="header-actions">
                    <button className="btn btn-secondary">
                        <RefreshCw size={16} />
                        Sync
                    </button>
                    <button className="btn btn-primary" onClick={() => navigate('/services/new')}>
                        <Plus size={16} />
                        New Service
                    </button>
                </div>
            </div>

            {/* Stats Bar */}
            <div className="services-stats">
                <div className="stat-chip total">
                    <span className="stat-value">{serviceStats.total}</span>
                    <span className="stat-label">Total</span>
                </div>
                <div className="stat-chip healthy">
                    <span className="status-dot healthy" />
                    <span className="stat-value">{serviceStats.healthy}</span>
                    <span className="stat-label">Healthy</span>
                </div>
                <div className="stat-chip warning">
                    <span className="status-dot warning" />
                    <span className="stat-value">{serviceStats.warning}</span>
                    <span className="stat-label">Warning</span>
                </div>
                <div className="stat-chip critical">
                    <span className="status-dot critical" />
                    <span className="stat-value">{serviceStats.critical}</span>
                    <span className="stat-label">Critical</span>
                </div>
            </div>

            {/* Toolbar */}
            <div className="services-toolbar">
                <div className="toolbar-left">
                    <div className="search-box">
                        <Search className="search-icon" size={18} />
                        <input
                            type="text"
                            placeholder="Search services..."
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
                            <option value="healthy">Healthy</option>
                            <option value="warning">Warning</option>
                            <option value="critical">Critical</option>
                        </select>
                    </div>

                    <select
                        value={teamFilter}
                        onChange={(e) => setTeamFilter(e.target.value)}
                        className="input select"
                    >
                        <option value="all">All Teams</option>
                        {teams.map(team => (
                            <option key={team} value={team}>{team}</option>
                        ))}
                    </select>
                </div>

                <div className="toolbar-right">
                    <div className="view-toggle">
                        <button
                            className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                            onClick={() => setViewMode('grid')}
                        >
                            <Grid size={18} />
                        </button>
                        <button
                            className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                            onClick={() => setViewMode('list')}
                        >
                            <List size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Services Grid */}
            <div className={`services-container ${viewMode}`}>
                {filteredServices.length > 0 ? (
                    filteredServices.map(service => (
                        <ServiceCard key={service.id} service={service} />
                    ))
                ) : (
                    <div className="empty-state">
                        <div className="empty-icon">🔍</div>
                        <h3>No services found</h3>
                        <p>Try adjusting your search or filter criteria</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Services;
