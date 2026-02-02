import {
    Boxes,
    Rocket,
    AlertTriangle,
    Clock,
    TrendingUp,
    Activity,
    Server,
    Users,
    ArrowRight,
    CheckCircle2,
    XCircle,
    Zap
} from 'lucide-react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell
} from 'recharts';
import StatCard from '../components/ui/StatCard';
import AlertItem from '../components/ui/AlertItem';
import { metrics, chartData, deployments, alerts, recentActivity, services } from '../data/mockData';
import './Dashboard.css';

function Dashboard() {
    const quickStats = [
        {
            title: 'Total Services',
            value: metrics.totalServices,
            change: 8.3,
            changeType: 'positive',
            icon: Boxes,
            iconColor: 'primary'
        },
        {
            title: 'Deployments Today',
            value: metrics.totalDeployments,
            change: 12.5,
            changeType: 'positive',
            icon: Rocket,
            iconColor: 'success'
        },
        {
            title: 'Active Alerts',
            value: metrics.activeAlerts,
            change: -25,
            changeType: 'positive',
            icon: AlertTriangle,
            iconColor: 'warning'
        },
        {
            title: 'Avg Latency',
            value: `${metrics.averageLatency}ms`,
            change: -8.2,
            changeType: 'positive',
            icon: Clock,
            iconColor: 'accent'
        }
    ];

    const getActivityIcon = (type) => {
        switch (type) {
            case 'deployment': return <Rocket size={16} />;
            case 'alert': return <AlertTriangle size={16} />;
            case 'config': return <Server size={16} />;
            case 'access': return <Users size={16} />;
            case 'infrastructure': return <Activity size={16} />;
            default: return <Zap size={16} />;
        }
    };

    return (
        <div className="dashboard">
            {/* Page Header */}
            <div className="page-header">
                <div className="header-content">
                    <h1 className="page-title">Dashboard</h1>
                    <p className="page-subtitle">
                        Monitor your platform health and recent activity
                    </p>
                </div>
                <div className="header-actions">
                    <button className="btn btn-secondary">
                        <Clock size={16} />
                        Last 24 hours
                    </button>
                    <button className="btn btn-primary">
                        <Rocket size={16} />
                        New Deployment
                    </button>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="stats-grid">
                {quickStats.map((stat, index) => (
                    <StatCard key={index} {...stat} />
                ))}
            </div>

            {/* Main Content Grid */}
            <div className="dashboard-grid">
                {/* Deployments Chart */}
                <div className="dashboard-card deployments-chart">
                    <div className="card-header">
                        <div>
                            <h3 className="card-title">Deployment Activity</h3>
                            <p className="card-subtitle">Deployments over the last 7 days</p>
                        </div>
                        <div className="chart-legend">
                            <span className="legend-item success">
                                <span className="legend-dot" />
                                Successful
                            </span>
                            <span className="legend-item failed">
                                <span className="legend-dot" />
                                Failed
                            </span>
                        </div>
                    </div>
                    <div className="chart-container">
                        <ResponsiveContainer width="100%" height={280}>
                            <AreaChart data={chartData.deployments}>
                                <defs>
                                    <linearGradient id="successGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="failedGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                                <XAxis
                                    dataKey="date"
                                    stroke="#64748b"
                                    fontSize={12}
                                    tickLine={false}
                                />
                                <YAxis
                                    stroke="#64748b"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                />
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
                                    dataKey="success"
                                    stroke="#10b981"
                                    strokeWidth={2}
                                    fillOpacity={1}
                                    fill="url(#successGradient)"
                                />
                                <Area
                                    type="monotone"
                                    dataKey="failed"
                                    stroke="#f43f5e"
                                    strokeWidth={2}
                                    fillOpacity={1}
                                    fill="url(#failedGradient)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Service Health */}
                <div className="dashboard-card service-health">
                    <div className="card-header">
                        <div>
                            <h3 className="card-title">Service Health</h3>
                            <p className="card-subtitle">Current service status overview</p>
                        </div>
                        <a href="/services" className="view-all-link">
                            View all <ArrowRight size={14} />
                        </a>
                    </div>
                    <div className="health-grid">
                        {services.slice(0, 4).map(service => (
                            <div key={service.id} className={`health-item ${service.status}`}>
                                <div className="health-status">
                                    <span className={`status-indicator ${service.status}`} />
                                    <span className="service-name">{service.name}</span>
                                </div>
                                <div className="health-metrics">
                                    <span className="metric">{service.latency}ms</span>
                                    <span className={`metric ${service.errorRate > 1 ? 'error' : ''}`}>
                                        {service.errorRate}% err
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="health-summary">
                        <div className="summary-item">
                            <CheckCircle2 size={16} className="success" />
                            <span>{services.filter(s => s.status === 'healthy').length} Healthy</span>
                        </div>
                        <div className="summary-item">
                            <AlertTriangle size={16} className="warning" />
                            <span>{services.filter(s => s.status === 'warning').length} Warning</span>
                        </div>
                        <div className="summary-item">
                            <XCircle size={16} className="danger" />
                            <span>{services.filter(s => s.status === 'critical').length} Critical</span>
                        </div>
                    </div>
                </div>

                {/* Resource Usage */}
                <div className="dashboard-card resource-usage">
                    <div className="card-header">
                        <div>
                            <h3 className="card-title">Resource Usage</h3>
                            <p className="card-subtitle">Infrastructure utilization</p>
                        </div>
                    </div>
                    <div className="resource-chart">
                        <ResponsiveContainer width="100%" height={200}>
                            <PieChart>
                                <Pie
                                    data={chartData.resourceUsage}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {chartData.resourceUsage.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        background: '#1f1f28',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        borderRadius: '8px',
                                        color: '#fff'
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="resource-legend">
                        {chartData.resourceUsage.map((item, index) => (
                            <div key={index} className="resource-item">
                                <span className="resource-dot" style={{ background: item.color }} />
                                <span className="resource-name">{item.name}</span>
                                <span className="resource-value">{item.value}%</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Active Alerts */}
                <div className="dashboard-card active-alerts">
                    <div className="card-header">
                        <div>
                            <h3 className="card-title">Active Alerts</h3>
                            <p className="card-subtitle">{alerts.filter(a => !a.acknowledged).length} unacknowledged</p>
                        </div>
                        <a href="/monitoring" className="view-all-link">
                            View all <ArrowRight size={14} />
                        </a>
                    </div>
                    <div className="alerts-list">
                        {alerts.slice(0, 3).map(alert => (
                            <AlertItem key={alert.id} alert={alert} compact />
                        ))}
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="dashboard-card recent-activity">
                    <div className="card-header">
                        <div>
                            <h3 className="card-title">Recent Activity</h3>
                            <p className="card-subtitle">Latest platform events</p>
                        </div>
                    </div>
                    <div className="activity-list">
                        {recentActivity.map(activity => (
                            <div key={activity.id} className="activity-item">
                                <div className={`activity-icon ${activity.type}`}>
                                    {getActivityIcon(activity.type)}
                                </div>
                                <div className="activity-content">
                                    <p className="activity-message">{activity.message}</p>
                                    <div className="activity-meta">
                                        <span className="activity-user">{activity.user}</span>
                                        <span className="activity-time">
                                            {new Date(activity.timestamp).toLocaleTimeString([], {
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="dashboard-card quick-actions">
                    <div className="card-header">
                        <div>
                            <h3 className="card-title">Quick Actions</h3>
                            <p className="card-subtitle">Common platform tasks</p>
                        </div>
                    </div>
                    <div className="actions-grid">
                        <button className="action-btn">
                            <div className="action-icon primary">
                                <Rocket size={20} />
                            </div>
                            <span>Deploy Service</span>
                        </button>
                        <button className="action-btn">
                            <div className="action-icon success">
                                <Boxes size={20} />
                            </div>
                            <span>Create Service</span>
                        </button>
                        <button className="action-btn">
                            <div className="action-icon warning">
                                <Server size={20} />
                            </div>
                            <span>Scale Resources</span>
                        </button>
                        <button className="action-btn">
                            <div className="action-icon accent">
                                <Users size={20} />
                            </div>
                            <span>Invite Member</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
