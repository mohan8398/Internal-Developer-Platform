// Mock data for Internal Developer Platform

export const services = [
  {
    id: 'svc-001',
    name: 'user-service',
    description: 'Core user authentication and management microservice',
    status: 'healthy',
    team: 'Platform',
    language: 'Node.js',
    instances: 5,
    cpu: 45,
    memory: 62,
    requests: 12500,
    latency: 23,
    errorRate: 0.02,
    lastDeployment: '2026-02-01T10:30:00Z',
    repository: 'github.com/org/user-service',
    tags: ['core', 'auth', 'production']
  },
  {
    id: 'svc-002',
    name: 'payment-gateway',
    description: 'Payment processing and transaction handling',
    status: 'healthy',
    team: 'Payments',
    language: 'Java',
    instances: 8,
    cpu: 72,
    memory: 85,
    requests: 8300,
    latency: 45,
    errorRate: 0.01,
    lastDeployment: '2026-01-30T14:20:00Z',
    repository: 'github.com/org/payment-gateway',
    tags: ['finance', 'critical', 'production']
  },
  {
    id: 'svc-003',
    name: 'notification-service',
    description: 'Email, SMS, and push notification delivery',
    status: 'warning',
    team: 'Messaging',
    language: 'Python',
    instances: 3,
    cpu: 28,
    memory: 41,
    requests: 25000,
    latency: 12,
    errorRate: 0.08,
    lastDeployment: '2026-02-02T08:15:00Z',
    repository: 'github.com/org/notification-service',
    tags: ['messaging', 'async', 'production']
  },
  {
    id: 'svc-004',
    name: 'inventory-service',
    description: 'Product inventory and stock management',
    status: 'healthy',
    team: 'Commerce',
    language: 'Go',
    instances: 4,
    cpu: 35,
    memory: 52,
    requests: 6800,
    latency: 18,
    errorRate: 0.00,
    lastDeployment: '2026-01-28T16:45:00Z',
    repository: 'github.com/org/inventory-service',
    tags: ['commerce', 'inventory', 'production']
  },
  {
    id: 'svc-005',
    name: 'analytics-engine',
    description: 'Real-time analytics and data processing',
    status: 'critical',
    team: 'Data',
    language: 'Scala',
    instances: 6,
    cpu: 92,
    memory: 88,
    requests: 45000,
    latency: 156,
    errorRate: 2.34,
    lastDeployment: '2026-01-25T09:00:00Z',
    repository: 'github.com/org/analytics-engine',
    tags: ['data', 'analytics', 'production']
  },
  {
    id: 'svc-006',
    name: 'search-service',
    description: 'Full-text search and indexing service',
    status: 'healthy',
    team: 'Search',
    language: 'Rust',
    instances: 4,
    cpu: 55,
    memory: 68,
    requests: 18500,
    latency: 8,
    errorRate: 0.01,
    lastDeployment: '2026-02-01T11:30:00Z',
    repository: 'github.com/org/search-service',
    tags: ['search', 'indexing', 'production']
  }
];

export const deployments = [
  {
    id: 'dep-001',
    service: 'user-service',
    version: 'v2.4.1',
    environment: 'production',
    status: 'success',
    deployedBy: 'John Smith',
    deployedAt: '2026-02-01T10:30:00Z',
    duration: 245,
    commit: 'a1b2c3d',
    message: 'Fix authentication timeout issue'
  },
  {
    id: 'dep-002',
    service: 'notification-service',
    version: 'v1.8.3',
    environment: 'production',
    status: 'success',
    deployedBy: 'Emily Chen',
    deployedAt: '2026-02-02T08:15:00Z',
    duration: 180,
    commit: 'e4f5g6h',
    message: 'Add new push notification templates'
  },
  {
    id: 'dep-003',
    service: 'analytics-engine',
    version: 'v3.1.0',
    environment: 'staging',
    status: 'running',
    deployedBy: 'Michael Park',
    deployedAt: '2026-02-02T12:00:00Z',
    duration: null,
    commit: 'i7j8k9l',
    message: 'Performance optimization for data pipeline'
  },
  {
    id: 'dep-004',
    service: 'payment-gateway',
    version: 'v4.2.0',
    environment: 'production',
    status: 'failed',
    deployedBy: 'Sarah Wilson',
    deployedAt: '2026-02-01T16:45:00Z',
    duration: 89,
    commit: 'm0n1o2p',
    message: 'Add support for new payment provider'
  },
  {
    id: 'dep-005',
    service: 'search-service',
    version: 'v2.0.1',
    environment: 'production',
    status: 'success',
    deployedBy: 'Alex Johnson',
    deployedAt: '2026-02-01T11:30:00Z',
    duration: 312,
    commit: 'q3r4s5t',
    message: 'Optimize search indexing performance'
  }
];

export const environments = [
  { id: 'env-001', name: 'Production', region: 'us-east-1', status: 'healthy', services: 24, cost: 12450 },
  { id: 'env-002', name: 'Staging', region: 'us-east-1', status: 'healthy', services: 22, cost: 4200 },
  { id: 'env-003', name: 'Development', region: 'us-west-2', status: 'healthy', services: 18, cost: 1800 },
  { id: 'env-004', name: 'Testing', region: 'eu-west-1', status: 'warning', services: 15, cost: 950 }
];

export const infrastructure = [
  {
    id: 'inf-001',
    name: 'prod-k8s-cluster',
    type: 'Kubernetes',
    provider: 'AWS EKS',
    region: 'us-east-1',
    status: 'running',
    nodes: 12,
    cpu: 64,
    memory: 78,
    cost: 8500
  },
  {
    id: 'inf-002',
    name: 'prod-postgres-primary',
    type: 'Database',
    provider: 'AWS RDS',
    region: 'us-east-1',
    status: 'running',
    nodes: 2,
    cpu: 45,
    memory: 82,
    cost: 2400
  },
  {
    id: 'inf-003',
    name: 'prod-redis-cluster',
    type: 'Cache',
    provider: 'AWS ElastiCache',
    region: 'us-east-1',
    status: 'running',
    nodes: 3,
    cpu: 32,
    memory: 65,
    cost: 950
  },
  {
    id: 'inf-004',
    name: 'prod-cdn',
    type: 'CDN',
    provider: 'CloudFront',
    region: 'Global',
    status: 'running',
    nodes: 1,
    cpu: null,
    memory: null,
    cost: 1200
  },
  {
    id: 'inf-005',
    name: 'staging-k8s-cluster',
    type: 'Kubernetes',
    provider: 'AWS EKS',
    region: 'us-east-1',
    status: 'running',
    nodes: 4,
    cpu: 38,
    memory: 52,
    cost: 2100
  }
];

export const alerts = [
  {
    id: 'alert-001',
    severity: 'critical',
    title: 'High Error Rate Detected',
    service: 'analytics-engine',
    message: 'Error rate exceeded 2% threshold in the last 5 minutes',
    timestamp: '2026-02-02T12:15:00Z',
    acknowledged: false
  },
  {
    id: 'alert-002',
    severity: 'warning',
    title: 'High CPU Usage',
    service: 'payment-gateway',
    message: 'CPU usage at 85% - approaching capacity limit',
    timestamp: '2026-02-02T11:45:00Z',
    acknowledged: true
  },
  {
    id: 'alert-003',
    severity: 'warning',
    title: 'Notification Delivery Delay',
    service: 'notification-service',
    message: 'Email delivery latency increased by 40%',
    timestamp: '2026-02-02T10:30:00Z',
    acknowledged: false
  },
  {
    id: 'alert-004',
    severity: 'info',
    title: 'Deployment Completed',
    service: 'user-service',
    message: 'Version v2.4.1 successfully deployed to production',
    timestamp: '2026-02-02T10:32:00Z',
    acknowledged: true
  }
];

export const teams = [
  {
    id: 'team-001',
    name: 'Platform',
    description: 'Core platform infrastructure and services',
    members: 8,
    services: 6,
    lead: 'John Smith',
    slack: '#platform-team',
    oncall: 'Emily Chen'
  },
  {
    id: 'team-002',
    name: 'Payments',
    description: 'Payment processing and financial services',
    members: 5,
    services: 3,
    lead: 'Sarah Wilson',
    slack: '#payments-team',
    oncall: 'Michael Park'
  },
  {
    id: 'team-003',
    name: 'Data',
    description: 'Analytics, ML, and data infrastructure',
    members: 7,
    services: 4,
    lead: 'Alex Johnson',
    slack: '#data-team',
    oncall: 'Lisa Wang'
  },
  {
    id: 'team-004',
    name: 'Commerce',
    description: 'E-commerce and marketplace features',
    members: 6,
    services: 5,
    lead: 'David Brown',
    slack: '#commerce-team',
    oncall: 'James Lee'
  }
];

export const recentActivity = [
  { id: 1, type: 'deployment', message: 'user-service v2.4.1 deployed to production', user: 'John Smith', timestamp: '2026-02-02T10:30:00Z' },
  { id: 2, type: 'alert', message: 'Critical alert triggered for analytics-engine', user: 'System', timestamp: '2026-02-02T12:15:00Z' },
  { id: 3, type: 'config', message: 'Updated environment variables for payment-gateway', user: 'Sarah Wilson', timestamp: '2026-02-02T09:45:00Z' },
  { id: 4, type: 'access', message: 'New team member added to Platform team', user: 'Emily Chen', timestamp: '2026-02-02T08:20:00Z' },
  { id: 5, type: 'infrastructure', message: 'Scaled prod-k8s-cluster to 12 nodes', user: 'DevOps Bot', timestamp: '2026-02-01T23:00:00Z' },
  { id: 6, type: 'deployment', message: 'notification-service v1.8.3 deployed to production', user: 'Emily Chen', timestamp: '2026-02-02T08:15:00Z' }
];

export const metrics = {
  totalServices: 24,
  healthyServices: 21,
  totalDeployments: 156,
  successRate: 98.7,
  activeAlerts: 3,
  averageLatency: 42,
  totalRequests: '2.4M',
  uptime: 99.95,
  monthlyChanges: {
    services: 2,
    deployments: 23,
    alerts: -5,
    latency: -12
  }
};

export const chartData = {
  deployments: [
    { date: 'Jan 26', count: 12, success: 11, failed: 1 },
    { date: 'Jan 27', count: 18, success: 17, failed: 1 },
    { date: 'Jan 28', count: 15, success: 15, failed: 0 },
    { date: 'Jan 29', count: 22, success: 20, failed: 2 },
    { date: 'Jan 30', count: 19, success: 18, failed: 1 },
    { date: 'Jan 31', count: 25, success: 24, failed: 1 },
    { date: 'Feb 01', count: 28, success: 27, failed: 1 },
    { date: 'Feb 02', count: 17, success: 16, failed: 1 }
  ],
  requests: [
    { time: '00:00', requests: 45000, errors: 120 },
    { time: '04:00', requests: 28000, errors: 85 },
    { time: '08:00', requests: 62000, errors: 145 },
    { time: '12:00', requests: 89000, errors: 210 },
    { time: '16:00', requests: 95000, errors: 180 },
    { time: '20:00', requests: 72000, errors: 165 },
    { time: '24:00', requests: 48000, errors: 110 }
  ],
  resourceUsage: [
    { name: 'CPU', value: 64, color: '#3b82f6' },
    { name: 'Memory', value: 78, color: '#a855f7' },
    { name: 'Storage', value: 45, color: '#10b981' },
    { name: 'Network', value: 52, color: '#f59e0b' }
  ],
  serviceCoverage: [
    { name: 'With Tests', value: 18, color: '#10b981' },
    { name: 'Partial', value: 4, color: '#f59e0b' },
    { name: 'No Tests', value: 2, color: '#f43f5e' }
  ]
};
