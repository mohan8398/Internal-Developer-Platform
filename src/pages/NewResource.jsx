import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Plus,
    ChevronRight,
    ChevronLeft,
    Database,
    Cloud,
    HardDrive,
    Server,
    Shield,
    Cpu,
    Globe,
    CheckCircle2,
    Box,
    Layers
} from 'lucide-react';
import './NewResource.css';

function NewResource() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [isProvisioning, setIsProvisioning] = useState(false);
    const [formData, setFormData] = useState({
        type: 'database',
        name: '',
        environment: 'staging',
        provider: 'aws',
        region: 'us-east-1',
        size: 'small',
        ha: false,
        backup: true
    });

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsProvisioning(true);
        // Simulate provisioning process
        setTimeout(() => {
            setIsProvisioning(false);
            navigate('/infrastructure');
        }, 4000);
    };

    const resourceTypes = [
        { id: 'database', name: 'Database', desc: 'Managed SQL / NoSQL database', icon: <Database size={24} /> },
        { id: 'kubernetes', name: 'Kubernetes', desc: 'Managed EKS / GKE cluster', icon: <Cloud size={24} /> },
        { id: 'cache', name: 'Redis Cache', desc: 'In-memory data store', icon: <HardDrive size={24} /> },
        { id: 'storage', name: 'Object Storage', desc: 'S3 compatible bucket', icon: <Layers size={24} /> }
    ];

    return (
        <div className="new-resource-page">
            <div className="page-header">
                <div className="header-content">
                    <h1 className="page-title">Add Infrastructure Resource</h1>
                    <p className="page-subtitle">Provision managed cloud resources for your applications.</p>
                </div>
            </div>

            <div className="resource-wizard">
                {/* Progress Bar */}
                <div className="wizard-progress">
                    {[1, 2, 3].map(s => (
                        <div key={s} className={`progress-segment ${step >= s ? 'active' : ''} ${step > s ? 'completed' : ''}`}>
                            <div className="segment-indicator">
                                {step > s ? <CheckCircle2 size={14} /> : s}
                            </div>
                            <span className="segment-label">
                                {s === 1 ? 'Select Type' : s === 2 ? 'Configuration' : 'Provisioning'}
                            </span>
                        </div>
                    ))}
                </div>

                <form onSubmit={handleSubmit} className="wizard-body">
                    {/* Step 1: Select Resource Type */}
                    {step === 1 && (
                        <div className="step-content animate-in">
                            <h2 className="step-title">What would you like to add?</h2>
                            <div className="type-grid">
                                {resourceTypes.map(type => (
                                    <div
                                        key={type.id}
                                        className={`type-card ${formData.type === type.id ? 'selected' : ''}`}
                                        onClick={() => setFormData({ ...formData, type: type.id })}
                                    >
                                        <div className="type-icon-wrapper">{type.icon}</div>
                                        <div className="type-info">
                                            <h4 className="type-name">{type.name}</h4>
                                            <p className="type-desc">{type.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="wizard-actions">
                                <button type="button" className="btn btn-secondary" onClick={() => navigate('/infrastructure')}>Cancel</button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={nextStep}
                                >
                                    Next: Configure Resource
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Configuration */}
                    {step === 2 && (
                        <div className="step-content animate-in">
                            <h2 className="step-title">Configure {formData.type.charAt(0).toUpperCase() + formData.type.slice(1)}</h2>

                            <div className="form-grid">
                                <div className="form-group">
                                    <label className="form-label">Resource Name</label>
                                    <div className="input-wrapper">
                                        <Box className="input-icon" size={18} />
                                        <input
                                            type="text"
                                            className="input"
                                            placeholder="e.g. main-db-production"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Target Environment</label>
                                    <select
                                        className="input select"
                                        value={formData.environment}
                                        onChange={(e) => setFormData({ ...formData, environment: e.target.value })}
                                    >
                                        <option value="production">Production</option>
                                        <option value="staging">Staging</option>
                                        <option value="development">Development</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Cloud Provider</label>
                                    <div className="provider-options">
                                        {['aws', 'gcp', 'azure'].map(provider => (
                                            <button
                                                key={provider}
                                                type="button"
                                                className={`provider-btn ${formData.provider === provider ? 'active' : ''}`}
                                                onClick={() => setFormData({ ...formData, provider: provider })}
                                            >
                                                {provider.toUpperCase()}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Region</label>
                                    <select
                                        className="input select"
                                        value={formData.region}
                                        onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                                    >
                                        <option value="us-east-1">US East (N. Virginia)</option>
                                        <option value="us-west-2">US West (Oregon)</option>
                                        <option value="eu-central-1">Europe (Frankfurt)</option>
                                        <option value="ap-southeast-1">Asia Pacific (Singapore)</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Instance Size</label>
                                    <div className="size-options">
                                        {['small', 'medium', 'large'].map(size => (
                                            <div
                                                key={size}
                                                className={`size-card ${formData.size === size ? 'active' : ''}`}
                                                onClick={() => setFormData({ ...formData, size: size })}
                                            >
                                                <Cpu size={18} />
                                                <span>{size.charAt(0).toUpperCase() + size.slice(1)}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="form-section-wizard">
                                <h3 className="section-subtitle">Additional Options</h3>
                                <div className="toggle-group">
                                    <label className="toggle-item">
                                        <input
                                            type="checkbox"
                                            checked={formData.ha}
                                            onChange={(e) => setFormData({ ...formData, ha: e.target.checked })}
                                        />
                                        <div className="toggle-content">
                                            <Shield size={16} />
                                            <div className="toggle-text">
                                                <strong>High Availability</strong>
                                                <span>Deploy across multiple zones for redundancy</span>
                                            </div>
                                        </div>
                                    </label>
                                    <label className="toggle-item">
                                        <input
                                            type="checkbox"
                                            checked={formData.backup}
                                            onChange={(e) => setFormData({ ...formData, backup: e.target.checked })}
                                        />
                                        <div className="toggle-content">
                                            <Server size={16} />
                                            <div className="toggle-text">
                                                <strong>Automated Backups</strong>
                                                <span>Daily snapshots with 7-day retention</span>
                                            </div>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            <div className="wizard-actions">
                                <button type="button" className="btn btn-secondary" onClick={prevStep}>
                                    <ChevronLeft size={16} />
                                    Back
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    disabled={!formData.name}
                                    onClick={nextStep}
                                >
                                    Next: Review
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 3: provisioning and review */}
                    {step === 3 && (
                        <div className="step-content animate-in">
                            <h2 className="step-title">Review & Provision</h2>

                            <div className="summary-card">
                                <div className="summary-header">
                                    <div className="summary-icon">
                                        <Server size={32} />
                                    </div>
                                    <div className="summary-title">
                                        <h3>{formData.name}</h3>
                                        <p>{formData.type.charAt(0).toUpperCase() + formData.type.slice(1)} on {formData.provider.toUpperCase()}</p>
                                    </div>
                                </div>

                                <div className="summary-grid">
                                    <div className="summary-item">
                                        <span className="summary-label">Environment</span>
                                        <span className="summary-value">{formData.environment.toUpperCase()}</span>
                                    </div>
                                    <div className="summary-item">
                                        <span className="summary-label">Region</span>
                                        <span className="summary-value">{formData.region}</span>
                                    </div>
                                    <div className="summary-item">
                                        <span className="summary-label">Size</span>
                                        <span className="summary-value">{formData.size.toUpperCase()}</span>
                                    </div>
                                    <div className="summary-item">
                                        <span className="summary-label">Reliability</span>
                                        <span className="summary-value">{formData.ha ? 'High Availability' : 'Single Instance'}</span>
                                    </div>
                                </div>

                                <div className="provisioning-checks">
                                    <div className="check-row">
                                        <CheckCircle2 size={16} className="text-success" />
                                        <span>Terraform plan generation</span>
                                    </div>
                                    <div className="check-row">
                                        <CheckCircle2 size={16} className="text-success" />
                                        <span>Identity and Access Management (IAM) roles</span>
                                    </div>
                                    <div className="check-row">
                                        <CheckCircle2 size={16} className="text-success" />
                                        <span>Cost estimation ($45.00 / month)</span>
                                    </div>
                                </div>
                            </div>

                            <div className="wizard-actions">
                                <button type="button" className="btn btn-secondary" onClick={prevStep} disabled={isProvisioning}>
                                    <ChevronLeft size={16} />
                                    Back
                                </button>
                                <button
                                    type="submit"
                                    className={`btn btn-primary btn-lg ${isProvisioning ? 'loading' : ''}`}
                                    disabled={isProvisioning}
                                >
                                    {isProvisioning ? (
                                        <>
                                            <div className="spinner" />
                                            Provisioning Infrastructure...
                                        </>
                                    ) : (
                                        <>
                                            <Plus className="mr-2" size={18} />
                                            Add Resource
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}

export default NewResource;
