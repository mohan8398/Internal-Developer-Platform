import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Rocket,
    ChevronRight,
    ChevronLeft,
    Server,
    GitBranch,
    Tag,
    Activity,
    ShieldCheck,
    AlertCircle,
    CheckCircle2,
    Clock,
    Layers,
    Zap
} from 'lucide-react';
import { services } from '../data/mockData';
import './NewDeployment.css';

function NewDeployment() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [isDeploying, setIsDeploying] = useState(false);
    const [formData, setFormData] = useState({
        serviceId: '',
        environment: 'staging',
        version: '',
        strategy: 'rolling',
        autoRollback: true,
        description: ''
    });

    const activeService = services.find(s => s.id === formData.serviceId);

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsDeploying(true);
        // Simulate deployment process
        setTimeout(() => {
            setIsDeploying(false);
            navigate('/deployments');
        }, 3000);
    };

    return (
        <div className="new-deployment-page">
            <div className="page-header">
                <div className="header-content">
                    <h1 className="page-title">New Deployment</h1>
                    <p className="page-subtitle">Deploy code to your infrastructure environments.</p>
                </div>
            </div>

            <div className="deployment-wizard">
                {/* Step Progress */}
                <div className="wizard-steps">
                    <div className={`wizard-step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
                        <div className="step-number">{step > 1 ? <CheckCircle2 size={16} /> : '1'}</div>
                        <span className="step-label">Service</span>
                    </div>
                    <div className="step-line" />
                    <div className={`wizard-step ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
                        <div className="step-number">{step > 2 ? <CheckCircle2 size={16} /> : '2'}</div>
                        <span className="step-label">Configuration</span>
                    </div>
                    <div className="step-line" />
                    <div className={`wizard-step ${step >= 3 ? 'active' : ''}`}>
                        <div className="step-number">3</div>
                        <span className="step-label">Review</span>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="wizard-content">
                    {/* Step 1: Select Service */}
                    {step === 1 && (
                        <div className="step-content animate-in">
                            <h2 className="step-title">Select Service</h2>
                            <div className="service-selection-grid">
                                {services.map(service => (
                                    <div
                                        key={service.id}
                                        className={`service-option-card ${formData.serviceId === service.id ? 'selected' : ''}`}
                                        onClick={() => setFormData({ ...formData, serviceId: service.id })}
                                    >
                                        <div className="card-check">
                                            <div className="checkbox-inner" />
                                        </div>
                                        <div className="service-info">
                                            <h4 className="service-name">{service.name}</h4>
                                            <p className="service-desc">{service.description}</p>
                                        </div>
                                        <div className="service-badge">
                                            {service.language}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="wizard-actions">
                                <button type="button" className="btn btn-secondary" onClick={() => navigate('/deployments')}>Cancel</button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    disabled={!formData.serviceId}
                                    onClick={nextStep}
                                >
                                    Next: Configuration
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Configuration */}
                    {step === 2 && (
                        <div className="step-content animate-in">
                            <h2 className="step-title">Deployment Configuration</h2>
                            <div className="form-sections">
                                <div className="form-section">
                                    <h3 className="section-label">Target Environment</h3>
                                    <div className="env-grid">
                                        {['development', 'staging', 'production'].map(env => (
                                            <div
                                                key={env}
                                                className={`env-card ${formData.environment === env ? 'selected' : ''}`}
                                                onClick={() => setFormData({ ...formData, environment: env })}
                                            >
                                                <Server size={20} />
                                                <span>{env.charAt(0).toUpperCase() + env.slice(1)}</span>
                                            </div>
                                        ))}
                                    </div>
                                    {formData.environment === 'production' && (
                                        <div className="alert-banner warning">
                                            <AlertCircle size={16} />
                                            <span>Production deployments require mandatory lead approval.</span>
                                        </div>
                                    )}
                                </div>

                                <div className="form-section">
                                    <h3 className="section-label">Artifact Version</h3>
                                    <div className="version-input-wrapper">
                                        <Tag className="input-icon" size={18} />
                                        <input
                                            type="text"
                                            placeholder="e.g. v2.4.1 or main"
                                            className="input"
                                            value={formData.version}
                                            onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-section">
                                    <h3 className="section-label">Deployment Strategy</h3>
                                    <div className="strategy-options">
                                        <div
                                            className={`strategy-card ${formData.strategy === 'rolling' ? 'selected' : ''}`}
                                            onClick={() => setFormData({ ...formData, strategy: 'rolling' })}
                                        >
                                            <Layers size={18} />
                                            <div className="strategy-info">
                                                <strong>Rolling Update</strong>
                                                <p>Progressively replace instances with new version</p>
                                            </div>
                                        </div>
                                        <div
                                            className={`strategy-card ${formData.strategy === 'bluegreen' ? 'selected' : ''}`}
                                            onClick={() => setFormData({ ...formData, strategy: 'bluegreen' })}
                                        >
                                            <Zap size={18} />
                                            <div className="strategy-info">
                                                <strong>Blue-Green</strong>
                                                <p>Deploy to parallel cluster and switch traffic</p>
                                            </div>
                                        </div>
                                    </div>
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
                                    disabled={!formData.version}
                                    onClick={nextStep}
                                >
                                    Next: Review
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Review */}
                    {step === 3 && (
                        <div className="step-content animate-in">
                            <h2 className="step-title">Review & Launch</h2>

                            <div className="review-summary">
                                <div className="review-item">
                                    <div className="review-label">Service to Deploy</div>
                                    <div className="review-value-highlight">
                                        <div className="service-pill">
                                            <Activity size={16} className="text-success" />
                                            {activeService?.name}
                                        </div>
                                    </div>
                                </div>

                                <div className="review-grid">
                                    <div className="review-tile">
                                        <span className="tile-label">Environment</span>
                                        <span className={`tile-value env-${formData.environment}`}>{formData.environment}</span>
                                    </div>
                                    <div className="review-tile">
                                        <span className="tile-label">Version</span>
                                        <span className="tile-value">{formData.version}</span>
                                    </div>
                                    <div className="review-tile">
                                        <span className="tile-label">Strategy</span>
                                        <span className="tile-value">{formData.strategy}</span>
                                    </div>
                                    <div className="review-tile">
                                        <span className="tile-label">Safety</span>
                                        <span className="tile-value">Auto-rollback enabled</span>
                                    </div>
                                </div>

                                <div className="review-checks">
                                    <div className="check-item">
                                        <ShieldCheck size={18} className="text-success" />
                                        <span>Resource quotas verified</span>
                                    </div>
                                    <div className="check-item">
                                        <ShieldCheck size={18} className="text-success" />
                                        <span>Health check endpoints reachable</span>
                                    </div>
                                </div>
                            </div>

                            <div className="wizard-actions">
                                <button type="button" className="btn btn-secondary" onClick={prevStep} disabled={isDeploying}>
                                    <ChevronLeft size={16} />
                                    Back
                                </button>
                                <button
                                    type="submit"
                                    className={`btn btn-primary btn-lg ${isDeploying ? 'loading' : ''}`}
                                    disabled={isDeploying}
                                >
                                    {isDeploying ? (
                                        <>
                                            <div className="spinner" />
                                            Provisioning...
                                        </>
                                    ) : (
                                        <>
                                            <Rocket size={18} />
                                            Trigger Deployment
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

export default NewDeployment;
