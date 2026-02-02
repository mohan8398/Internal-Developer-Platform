import {
    AlertTriangle,
    AlertCircle,
    Info,
    CheckCircle,
    Clock,
    Eye,
    EyeOff
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import './AlertItem.css';

function AlertItem({ alert, compact = false }) {
    const getIcon = (severity) => {
        switch (severity) {
            case 'critical':
                return <AlertCircle className="alert-icon critical" size={compact ? 16 : 20} />;
            case 'warning':
                return <AlertTriangle className="alert-icon warning" size={compact ? 16 : 20} />;
            case 'info':
                return <Info className="alert-icon info" size={compact ? 16 : 20} />;
            default:
                return <CheckCircle className="alert-icon success" size={compact ? 16 : 20} />;
        }
    };

    if (compact) {
        return (
            <div className={`alert-item compact ${alert.severity} ${alert.acknowledged ? 'acknowledged' : ''}`}>
                {getIcon(alert.severity)}
                <div className="alert-content">
                    <span className="alert-title">{alert.title}</span>
                    <span className="alert-service">{alert.service}</span>
                </div>
                <span className="alert-time">
                    {formatDistanceToNow(new Date(alert.timestamp), { addSuffix: true })}
                </span>
            </div>
        );
    }

    return (
        <div className={`alert-item ${alert.severity} ${alert.acknowledged ? 'acknowledged' : ''}`}>
            <div className="alert-icon-wrapper">
                {getIcon(alert.severity)}
            </div>

            <div className="alert-body">
                <div className="alert-header">
                    <span className={`severity-badge ${alert.severity}`}>
                        {alert.severity}
                    </span>
                    <span className="alert-service-tag">{alert.service}</span>
                </div>

                <h4 className="alert-title">{alert.title}</h4>
                <p className="alert-message">{alert.message}</p>

                <div className="alert-footer">
                    <div className="alert-time">
                        <Clock size={14} />
                        <span>
                            {formatDistanceToNow(new Date(alert.timestamp), { addSuffix: true })}
                        </span>
                    </div>

                    <div className="alert-actions">
                        <button className="btn btn-ghost btn-sm">
                            {alert.acknowledged ? <EyeOff size={14} /> : <Eye size={14} />}
                            {alert.acknowledged ? 'Unacknowledge' : 'Acknowledge'}
                        </button>
                        <button className="btn btn-ghost btn-sm">View Details</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AlertItem;
