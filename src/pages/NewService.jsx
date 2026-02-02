import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Plus,
    ChevronRight,
    ChevronLeft,
    Code2,
    Users,
    Globe,
    Cpu,
    Database,
    CheckCircle2,
    Box,
    Terminal,
    Shield,
    Layout,
    Server
} from 'lucide-react';
import './NewService.css';

function NewService() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [isProvisioning, setIsProvisioning] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        team: 'Platform',
        visibility: 'internal',
        language: 'nodejs',
        template: 'rest-api',
        compute: 'kubernetes',
        database: 'none'
    });

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsProvisioning(true);
        // Simulate provisioning process
        setTimeout(() => {
            setIsProvisioning(false);
            navigate('/services');
        }, 4000);
    };

    const templates = [
        { id: 'rest-api', name: 'REST API', desc: 'Standard microservice with Express/Hono', icon: <Globe size={20} /> },
        { id: 'worker', name: 'Background Worker', desc: 'Queue processing and cron jobs', icon: <Terminal size={20} /> },
        { id: 'grpc', name: 'gRPC Service', desc: 'High-performance internal communication', icon: <Shield size={20} /> },
        { id: 'frontend', name: 'Frontend App', desc: 'React/Vite single page application', icon: <Layout size={20} /> }
    ];

    return (
        <div className="new-service-page">
            <div className="page-header">
                <div className="header-content">
                    <h1 className="page-title">Create New Service</h1>
                    <p className="page-subtitle">Standardized provisioning for your microservices.</p>
                </div>
            </div>

            <div className="service-wizard">
                {/* Progress Bar */}
                <div className="wizard-progress">
                    {[1, 2, 3, 4].map(s => (
                        <div key={s} className={`progress-segment ${step >= s ? 'active' : ''} ${step > s ? 'completed' : ''}`}>
                            <div className="segment-indicator">
                                {step > s ? <CheckCircle2 size={14} /> : s}
                            </div>
                            <span className="segment-label">
                                {s === 1 ? 'Details' : s === 2 ? 'Stack' : s === 3 ? 'Infra' : 'Review'}
                            </span>
                        </div>
                    ))}
                </div>

                <form onSubmit={handleSubmit} className="wizard-body">
                    {/* Step 1: Basic Details */}
                    {step === 1 && (
                        <div className="step-content animate-in">
                            <h2 className="step-title">Basic Information</h2>
                            <div className="form-group">
                                <label className="form-label">Service Name</label>
                                <div className="input-wrapper">
                                    <Box className="input-icon" size={18} />
                                    <input
                                        type="text"
                                        className="input"
                                        placeholder="e.g. auth-gateway"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                                        required
                                    />
                                </div>
                                <p className="input-hint">Kebab-case, lowercase only. This will be your service ID.</p>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Description</label>
                                <textarea
                                    className="input textarea"
                                    placeholder="What does this service do?"
                                    rows="3"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group flex-1">
                                    <label className="form-label">Owner Team</label>
                                    <div className="input-wrapper">
                                        <Users className="input-icon" size={18} />
                                        <select
                                            className="input select"
                                            value={formData.team}
                                            onChange={(e) => setFormData({ ...formData, team: e.target.value })}
                                        >
                                            <option value="Platform">Platform</option>
                                            <option value="Payments">Payments</option>
                                            <option value="Core-API">Core API</option>
                                            <option value="Security">Security</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group flex-1">
                                    <label className="form-label">Visibility</label>
                                    <select
                                        className="input select"
                                        value={formData.visibility}
                                        onChange={(e) => setFormData({ ...formData, visibility: e.target.value })}
                                    >
                                        <option value="internal">Internal</option>
                                        <option value="public">Public (Facing Internet)</option>
                                    </select>
                                </div>
                            </div>

                            <div className="wizard-actions">
                                <button type="button" className="btn btn-secondary" onClick={() => navigate('/services')}>Cancel</button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    disabled={!formData.name || !formData.description}
                                    onClick={nextStep}
                                >
                                    Next: Technical Stack
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Stack Selection */}
                    {step === 2 && (
                        <div className="step-content animate-in">
                            <h2 className="step-title">Select Technical Template</h2>
                            <div className="template-grid">
                                {templates.map(tpl => (
                                    <div
                                        key={tpl.id}
                                        className={`template-card ${formData.template === tpl.id ? 'selected' : ''}`}
                                        onClick={() => setFormData({ ...formData, template: tpl.id })}
                                    >
                                        <div className="template-icon">{tpl.icon}</div>
                                        <div className="template-info">
                                            <h4 className="template-name">{tpl.name}</h4>
                                            <p className="template-desc">{tpl.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="form-group">
                                <label className="form-label">Primary Language / Runtime</label>
                                <div className="language-options">
                                    {['nodejs', 'golang', 'python', 'rust'].map(lang => (
                                        <button
                                            key={lang}
                                            type="button"
                                            className={`lang-btn ${formData.language === lang ? 'active' : ''}`}
                                            onClick={() => setFormData({ ...formData, language: lang })}
                                        >
                                            {lang === 'nodejs' ? 'Node.js' : lang.charAt(0).toUpperCase() + lang.slice(1)}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="wizard-actions">
                                <button type="button" className="btn btn-secondary" onClick={prevStep}>
                                    <ChevronLeft size={16} />
                                    Back
                                </button>
                                <button type="button" className="btn btn-primary" onClick={nextStep}>
                                    Next: Infrastructure
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Infrastructure */}
                    {step === 3 && (
                        <div className="step-content animate-in">
                            <h2 className="step-title">Infrastructure Requirements</h2>

                            <div className="form-section-wizard">
                                <h3 className="section-subtitle">Compute Engine</h3>
                                <div className="option-row">
                                    <div
                                        className={`option-box ${formData.compute === 'kubernetes' ? 'active' : ''}`}
                                        onClick={() => setFormData({ ...formData, compute: 'kubernetes' })}
                                    >
                                        <Server size={20} />
                                        <div className="option-text">
                                            <strong>Kubernetes Cluster</strong>
                                            <span>Docker container on EKS/GKE</span>
                                        </div>
                                    </div>
                                    <div
                                        className={`option-box ${formData.compute === 'lambda' ? 'active' : ''}`}
                                        onClick={() => setFormData({ ...formData, compute: 'lambda' })}
                                    >
                                        <Zap size={20} />
                                        <div className="option-text">
                                            <strong>Serverless</strong>
                                            <span>AWS Lambda / Cloud Functions</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="form-section-wizard">
                                <h3 className="section-subtitle">Database Provisioning</h3>
                                <div className="database-grid">
                                    {[
                                        { id: 'none', name: 'None', icon: <Plus size={18} /> },
                                        { id: 'postgresql', name: 'PostgreSQL', icon: <Database size={18} /> },
                                        { id: 'redis', name: 'Redis Cache', icon: <Cpu size={18} /> },
                                        { id: 'mongodb', name: 'MongoDB', icon: <Code2 size={18} /> }
                                    ].map(db => (
                                        <div
                                            key={db.id}
                                            className={`db-card ${formData.database === db.id ? 'active' : ''}`}
                                            onClick={() => setFormData({ ...formData, database: db.id })}
                                        >
                                            {db.icon}
                                            <span>{db.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="wizard-actions">
                                <button type="button" className="btn btn-secondary" onClick={prevStep}>
                                    <ChevronLeft size={16} />
                                    Back
                                </button>
                                <button type="button" className="btn btn-primary" onClick={nextStep}>
                                    Next: Summary
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 4: Summary */}
                    {step === 4 && (
                        <div className="step-content animate-in">
                            <h2 className="step-title">Review & Provision</h2>

                            <div className="summary-card">
                                <div className="summary-header">
                                    <div className="summary-icon">
                                        <CheckCircle2 size={32} />
                                    </div>
                                    <div className="summary-title">
                                        <h3>{formData.name}</h3>
                                        <p>{formData.description}</p>
                                    </div>
                                </div>

                                <div className="summary-grid">
                                    <div className="summary-item">
                                        <span className="summary-label">Owner Team</span>
                                        <span className="summary-value">{formData.team}</span>
                                    </div>
                                    <div className="summary-item">
                                        <span className="summary-label">Stack</span>
                                        <span className="summary-value">{formData.language} ({formData.template})</span>
                                    </div>
                                    <div className="summary-item">
                                        <span className="summary-label">Compute</span>
                                        <span className="summary-value">{formData.compute}</span>
                                    </div>
                                    <div className="summary-item">
                                        <span className="summary-label">Database</span>
                                        <span className="summary-value capitalize">{formData.database}</span>
                                    </div>
                                </div>

                                <div className="provisioning-checks">
                                    <div className="check-row">
                                        <CheckCircle2 size={16} className="text-success" />
                                        <span>Create GitHub repository & CI/CD workflow</span>
                                    </div>
                                    <div className="check-row">
                                        <CheckCircle2 size={16} className="text-success" />
                                        <span>Provision cloud resources via Terraform</span>
                                    </div>
                                    <div className="check-row">
                                        <CheckCircle2 size={16} className="text-success" />
                                        <span>Setup monitoring, logs, and dashboard</span>
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
                                            Provisioning Architecture...
                                        </>
                                    ) : (
                                        <>
                                            <Rocket className="mr-2" size={18} />
                                            Launch Service
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

// Reuse some lucide icons if not already there
const Rocket = ({ size, className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-5c1.62-2.2 5-3 5-3" /><path d="M12 15v5s3.03-.55 5-2c2.2-1.62 3-5 3-5" /></svg>
);

const Zap = ({ size, className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
);

export default NewService;
