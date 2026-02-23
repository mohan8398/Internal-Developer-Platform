import { useState, useEffect } from 'react';
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
import { serviceApi } from '../services/serviceApi';
import './Services.css';

function Services() {
    const navigate = useNavigate();
    const [viewMode, setViewMode] = useState('grid');
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [teamFilter, setTeamFilter] = useState('all');
    const [servicesData, setServicesData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchServices();
    }, [statusFilter, teamFilter]);

    const fetchServices = async () => {
        setIsLoading(true);
        try {
            const filters = {};
            if (statusFilter !== 'all') filters.lifecycle = statusFilter;
            if (teamFilter !== 'all') filters.teamId = teamFilter;

            const response = await serviceApi.getServices(filters);
            // The API returns { data: Service[], total: number, page: number, limit: number }
            setServicesData(response.data || []);
            setError(null);
        } catch (err) {
            console.error('Failed to fetch services:', err);
            setError('Failed to load services. Please check your connection to the backend.');
        } finally {
            setIsLoading(false);
        }
    };

    const filteredServices = servicesData.filter(service => {
        const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (service.description && service.description.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesSearch;
    });

    const teams = [...new Set(servicesData.map(s => s.teamId))];

    const serviceStats = {
        total: servicesData.length,
        healthy: servicesData.filter(s => s.active).length, // Simplified for now
        warning: 0,
        critical: servicesData.filter(s => !s.active).length
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
                        <Filter size={50} />
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
                {isLoading ? (
                    <div className="loading-state">
                        <div className="spinner" />
                        <p>Loading services...</p>
                    </div>
                ) : error ? (
                    <div className="error-state">
                        <div className="error-icon">⚠️</div>
                        <h3>Error Loading Services</h3>
                        <p>{error}</p>
                        <button className="btn btn-secondary" onClick={fetchServices}>
                            <RefreshCw size={16} />
                            Retry
                        </button>
                    </div>
                ) : filteredServices.length > 0 ? (
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
