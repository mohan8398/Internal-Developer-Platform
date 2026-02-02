import { useState } from 'react';
import {
    Activity,
    AlertTriangle,
    Bell,
    Filter,
    RefreshCw,
    CheckCircle,
    TrendingUp,
    TrendingDown,
    Clock,
    Settings
} from 'lucide-react';
import {
    LineChart,
    Line,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import AlertItem from '../components/ui/AlertItem';
import { alerts, chartData, metrics } from '../data/mockData';
import './Monitoring.css';

function Monitoring() {
    const [timeRange, setTimeRange] = useState('24h');
    const [alertFilter, setAlertFilter] = useState('all');

    const filteredAlerts = alerts.filter(alert => {
        if (alertFilter === 'all') return true;
        if (alertFilter === 'unacknowledged') return !alert.acknowledged;
        return alert.severity === alertFilter;
    });

    const alertStats = {
        critical: alerts.filter(a => a.severity === 'critical' && !a.acknowledged).length,
        warning: alerts.filter(a => a.severity === 'warning' && !a.acknowledged).length,
        info: alerts.filter(a => a.severity === 'info' && !a.acknowledged).length
    };

    return (
        <div className="monitoring-page">
            {/* Page Header */}
            <div className="page-header">
                <div className="header-content">
                    <h1 className="page-title">Monitoring</h1>
                    <p className="page-subtitle">
                        Platform health, metrics, and alerting
                    </p>
                </div>
                <div className="header-actions">
                    <div className="time-range-selector">
                        {['1h', '6h', '24h', '7d', '30d'].map(range => (
                            <button
                                key={range}
                                className={`range-btn ${timeRange === range ? 'active' : ''}`}
                                onClick={() => setTimeRange(range)}
                            >
                                {range}
                            </button>
                        ))}
                    </div>
                    <button className="btn btn-secondary">
                        <Settings size={16} />
                        Configure
                    </button>
                </div>
            </div>

            {/* Health Overview */}
            <div className="health-overview">
                <div className="health-card uptime">
                    <div className="health-icon success">
                        <Activity size={24} />
                    </div>
                    <div className="health-info">
                        <div className="health-main">
                            <span className="health-value">{metrics.uptime}%</span>
                            <span className="health-label">Uptime</span>
                        </div>
                        <div className="health-trend positive">
                            <TrendingUp size={12} />
                            <span>Stable</span>
                        </div>
                    </div>
                </div>

                <div className="health-card latency">
                    <div className="health-icon primary">
                        <Clock size={24} />
                    </div>
                    <div className="health-info">
                        <div className="health-main">
                            <span className="health-value">{metrics.averageLatency}ms</span>
                            <span className="health-label">Avg Latency</span>
                        </div>
                        <div className="health-trend positive">
                            <TrendingDown size={12} />
                            <span>-12% from last week</span>
                        </div>
                    </div>
                </div>

                <div className="health-card requests">
                    <div className="health-icon accent">
                        <TrendingUp size={24} />
                    </div>
                    <div className="health-info">
                        <div className="health-main">
                            <span className="health-value">{metrics.totalRequests}</span>
                            <span className="health-label">Requests/Day</span>
                        </div>
                        <div className="health-trend positive">
                            <TrendingUp size={12} />
                            <span>+15% from yesterday</span>
                        </div>
                    </div>
                </div>

                <div className="health-card success-rate">
                    <div className="health-icon success">
                        <CheckCircle size={24} />
                    </div>
                    <div className="health-info">
                        <div className="health-main">
                            <span className="health-value">{metrics.successRate}%</span>
                            <span className="health-label">Success Rate</span>
                        </div>
                        <div className="health-trend positive">
                            <TrendingUp size={12} />
                            <span>Above target</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="charts-grid">
                {/* Request Traffic */}
                <div className="chart-card traffic-chart">
                    <div className="chart-header">
                        <div>
                            <h3 className="chart-title">Request Traffic</h3>
                            <p className="chart-subtitle">Requests and errors over time</p>
                        </div>
                        <div className="chart-legend">
                            <span className="legend-item">
                                <span className="legend-dot primary" />
                                Requests
                            </span>
                            <span className="legend-item">
                                <span className="legend-dot danger" />
                                Errors
                            </span>
                        </div>
                    </div>
                    <div className="chart-body">
                        <ResponsiveContainer width="100%" height={280}>
                            <AreaChart data={chartData.requests}>
                                <defs>
                                    <linearGradient id="requestsGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                                <XAxis dataKey="time" stroke="#64748b" fontSize={12} tickLine={false} />
                                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{
                                        background: '#1f1f28',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        borderRadius: '8px',
                                        color: '#fff'
                                    }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="requests"
                                    stroke="#3b82f6"
                                    strokeWidth={2}
                                    fillOpacity={1}
                                    fill="url(#requestsGradient)"
                                />
                                <Line
                                    type="monotone"
                                    dataKey="errors"
                                    stroke="#f43f5e"
                                    strokeWidth={2}
                                    dot={false}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* System Metrics */}
                <div className="chart-card system-metrics">
                    <div className="chart-header">
                        <div>
                            <h3 className="chart-title">System Metrics</h3>
                            <p className="chart-subtitle">Resource utilization</p>
                        </div>
                    </div>
                    <div className="metrics-grid">
                        {chartData.resourceUsage.map((resource, index) => (
                            <div key={index} className="system-metric">
                                <div className="metric-header">
                                    <span className="metric-name">{resource.name}</span>
                                    <span className="metric-value">{resource.value}%</span>
                                </div>
                                <div className="metric-progress">
                                    <div
                                        className="metric-bar"
                                        style={{
                                            width: `${resource.value}%`,
                                            background: resource.color
                                        }}
                                    />
                                </div>
                                <div className="metric-details">
                                    <span className="metric-used">Used: {resource.value}%</span>
                                    <span className="metric-available">Available: {100 - resource.value}%</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Alerts Section */}
            <div className="alerts-section">
                <div className="section-header">
                    <div>
                        <h2 className="section-title">Active Alerts</h2>
                        <p className="section-subtitle">
                            {alertStats.critical + alertStats.warning + alertStats.info} unacknowledged alerts
                        </p>
                    </div>
                    <div className="section-actions">
                        <div className="alert-stats">
                            <span className={`alert-stat critical ${alertStats.critical > 0 ? 'active' : ''}`}>
                                <AlertTriangle size={14} />
                                {alertStats.critical} Critical
                            </span>
                            <span className={`alert-stat warning ${alertStats.warning > 0 ? 'active' : ''}`}>
                                <AlertTriangle size={14} />
                                {alertStats.warning} Warning
                            </span>
                            <span className="alert-stat info">
                                <Bell size={14} />
                                {alertStats.info} Info
                            </span>
                        </div>
                        <div className="filter-group">
                            <Filter size={16} />
                            <select
                                value={alertFilter}
                                onChange={(e) => setAlertFilter(e.target.value)}
                                className="input select"
                            >
                                <option value="all">All Alerts</option>
                                <option value="unacknowledged">Unacknowledged</option>
                                <option value="critical">Critical</option>
                                <option value="warning">Warning</option>
                                <option value="info">Info</option>
                            </select>
                        </div>
                        <button className="btn btn-ghost">
                            <RefreshCw size={16} />
                            Refresh
                        </button>
                    </div>
                </div>

                <div className="alerts-list">
                    {filteredAlerts.map(alert => (
                        <AlertItem key={alert.id} alert={alert} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Monitoring;
