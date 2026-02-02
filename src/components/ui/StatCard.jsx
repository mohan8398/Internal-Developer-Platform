import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import './StatCard.css';

function StatCard({ title, value, change, changeType, icon: Icon, iconColor, subtitle }) {
    const getChangeIcon = () => {
        if (changeType === 'positive') return <TrendingUp size={14} />;
        if (changeType === 'negative') return <TrendingDown size={14} />;
        return <Minus size={14} />;
    };

    return (
        <div className="stat-card">
            <div className="stat-card-header">
                <div className="stat-card-title">{title}</div>
                <div className={`stat-card-icon ${iconColor || 'primary'}`}>
                    <Icon size={20} />
                </div>
            </div>

            <div className="stat-card-body">
                <div className="stat-value">{value}</div>
                {subtitle && <div className="stat-subtitle">{subtitle}</div>}
            </div>

            {change !== undefined && (
                <div className={`stat-change ${changeType}`}>
                    {getChangeIcon()}
                    <span>{Math.abs(change)}%</span>
                    <span className="change-label">vs last month</span>
                </div>
            )}

            <div className="stat-card-glow" />
        </div>
    );
}

export default StatCard;
