import {
    CheckCircle2,
    XCircle,
    Loader2,
    Clock,
    GitCommit,
    User
} from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import './DeploymentRow.css';

function DeploymentRow({ deployment }) {
    const getStatusIcon = (status) => {
        switch (status) {
            case 'success':
                return <CheckCircle2 className="status-icon success" size={18} />;
            case 'failed':
                return <XCircle className="status-icon failed" size={18} />;
            case 'running':
                return <Loader2 className="status-icon running" size={18} />;
            default:
                return <Clock className="status-icon pending" size={18} />;
        }
    };

    const getStatusBadge = (status) => {
        const statusConfig = {
            success: { label: 'Success', class: 'badge-success' },
            failed: { label: 'Failed', class: 'badge-danger' },
            running: { label: 'Running', class: 'badge-warning' },
            pending: { label: 'Pending', class: 'badge-neutral' }
        };
        return statusConfig[status] || statusConfig.pending;
    };

    const statusBadge = getStatusBadge(deployment.status);

    return (
        <div className={`deployment-row ${deployment.status}`}>
            <div className="deployment-status">
                {getStatusIcon(deployment.status)}
            </div>

            <div className="deployment-info">
                <div className="deployment-header">
                    <span className="deployment-service">{deployment.service}</span>
                    <span className="deployment-version">{deployment.version}</span>
                    <span className={`badge ${statusBadge.class}`}>{statusBadge.label}</span>
                </div>
                <div className="deployment-message">{deployment.message}</div>
            </div>

            <div className="deployment-meta">
                <div className="meta-item">
                    <GitCommit size={14} />
                    <code>{deployment.commit}</code>
                </div>
                <div className="meta-item environment">
                    <span className={`env-badge ${deployment.environment}`}>
                        {deployment.environment}
                    </span>
                </div>
            </div>

            <div className="deployment-details">
                <div className="detail-item">
                    <User size={14} />
                    <span>{deployment.deployedBy}</span>
                </div>
                <div className="detail-item">
                    <Clock size={14} />
                    <span title={format(new Date(deployment.deployedAt), 'PPpp')}>
                        {formatDistanceToNow(new Date(deployment.deployedAt), { addSuffix: true })}
                    </span>
                </div>
                {deployment.duration && (
                    <div className="detail-item duration">
                        {Math.floor(deployment.duration / 60)}m {deployment.duration % 60}s
                    </div>
                )}
            </div>

            <div className="deployment-actions">
                <button className="btn btn-ghost btn-sm">View Logs</button>
                <button className="btn btn-ghost btn-sm">Rollback</button>
            </div>
        </div>
    );
}

export default DeploymentRow;
