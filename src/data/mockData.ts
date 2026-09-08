import { PillarDetail, ThreatAlert, ComplianceFramework, DataAssetClassification } from '../types';

export const PILLARS_DATA: Record<string, PillarDetail> = {
  govern: {
    key: 'govern',
    title: 'Govern',
    subtitle: 'Compliance & Governance Management',
    description: 'Establish organizational context, cybersecurity policies, executive oversight, and continuous multi-framework audit readiness across ISO 27001, NIST CSF 2.0, SOC 2, HIPAA, and GDPR.',
    coreObjectives: [
      'Continuous compliance audit readiness across ISO 27001, NIST CSF 2.0, GDPR & HIPAA',
      'Automated policy lifecycle management with continuous enforcement tracking',
      'Continuous third-party vendor risk scoring and supply chain governance',
      'Dynamic risk tolerance thresholds aligned with evolving global cyber threats'
    ],
    features: [
      {
        name: 'Multi-Framework Crosswalk',
        description: 'Map a single evidence artifact to 14+ frameworks simultaneously without redundant audits.',
        metricLabel: 'Audit Prep Reduced',
        metricValue: '-82%'
      },
      {
        name: 'Automated Evidence Harvester',
        description: 'Continuously pulls cryptographic configuration state from AWS, GCP, Azure, GitHub, and Okta.',
        metricLabel: 'Controls Automated',
        metricValue: '96.4%'
      },
      {
        name: 'Board & Executive Risk Dashboards',
        description: 'Quantify financial cyber risk exposure using Open FAIR methodology for stakeholder clarity.',
        metricLabel: 'Reporting Cadence',
        metricValue: 'Real-time'
      }
    ],
    frameworksOrTech: ['ISO/IEC 27001:2022', 'NIST CSF 2.0', 'SOC 2 Type II', 'GDPR Art. 32', 'HIPAA Security Rule', 'PCI-DSS v4.0'],
    status: 'OPTIMIZED'
  },
  identify: {
    key: 'identify',
    title: 'Identify',
    subtitle: 'Know What to Protect & Surface Gaps',
    description: 'Autonomous discovery of all digital assets, automated PII/confidential data classification, identity graph mapping, and continuous external attack surface management (EASM).',
    coreObjectives: [
      'Automated data classification across all buckets, databases, and microservices (Public, Internal, Confidential, Sensitive)',
      'Continuous discovery of shadow IT, unmanaged cloud assets, and orphaned IAM roles',
      'Holistic enterprise risk assessment and real-time gap analysis against threat models',
      'Threat actor profiling (hackers, insider threats, ransomware gangs, state-sponsored APTs)'
    ],
    features: [
      {
        name: 'Autonomous DSPM & Classification',
        description: 'Deep content inspection identifies sensitive customer records, API keys, and health data across petabytes of storage.',
        metricLabel: 'Data Class Speed',
        metricValue: '4.8 GB/s'
      },
      {
        name: 'Attack Surface Surface Mapper (EASM)',
        description: 'Discovers exposed ports, subdomain takeovers, and misconfigured certificates outside your perimeter.',
        metricLabel: 'Shadow Assets Found',
        metricValue: '100%'
      },
      {
        name: 'Vulnerability Prioritization Matrix',
        description: 'Combines EPSS exploitation likelihood scores with asset business criticality to eliminate patch fatigue.',
        metricLabel: 'Noise Reduction',
        metricValue: '78%'
      }
    ],
    frameworksOrTech: ['eBPF Cloud Discovery', 'Data Security Posture (DSPM)', 'MITRE ATT&CK Mapping', 'EPSS Scoring', 'OpenAPI Schema Audits'],
    status: 'CONTINUOUS'
  },
  protect: {
    key: 'protect',
    title: 'Protect',
    subtitle: 'Implement Zero Trust Security Controls',
    description: 'Enforce safeguards to prevent or contain the impact of potential cybersecurity events through micro-segmentation, strong identity governance, ubiquitous encryption, and workforce cyber defense.',
    coreObjectives: [
      'Next-generation cloud firewalls, micro-segmentation, and intrusion prevention systems (IPS)',
      'End-to-end encryption for data-at-rest (AES-256 GCM) and data-in-transit (mTLS / TLS 1.3)',
      'Adaptive Multi-Factor Authentication (MFA), passwordless FIDO2, and strict IAM boundaries',
      'Automated zero-downtime vulnerability patching and container base image hardening',
      'Simulated phishing training and continuous security awareness for all employees'
    ],
    features: [
      {
        name: 'Zero Trust Network Architecture',
        description: 'Policy-as-code dynamic firewalls enforce least-privilege access per workload token.',
        metricLabel: 'Unauthorized Access',
        metricValue: '0 incidents'
      },
      {
        name: 'Cryptographic Key Orchestration',
        description: 'Automated 90-day key rotation with hardware security module (HSM) level attestation.',
        metricLabel: 'Encryption Coverage',
        metricValue: '100% at rest/transit'
      },
      {
        name: 'Autonomous Patch Pipeline',
        description: 'Deploys tested hotfixes and virtual WAF patches within minutes of CVE publication.',
        metricLabel: 'Mean Time to Patch',
        metricValue: '< 45 mins'
      }
    ],
    frameworksOrTech: ['Zero Trust mTLS', 'FIDO2 / WebAuthn', 'AWS KMS / HashiCorp Vault', 'WAF Virtual Patching', 'Automated Patch Ops'],
    status: 'ACTIVE'
  },
  detect: {
    key: 'detect',
    title: 'Detect',
    subtitle: 'Autonomous SIEM & Threat Monitoring',
    description: 'Continuous 24/7/365 monitoring of security events, telemetry ingestion across multi-cloud and endpoints, and AI-driven behavioral anomaly detection to uncover attacks in real time.',
    coreObjectives: [
      'Autonomous Cloud SIEM aggregating billions of event logs with sub-second query latency',
      'Intrusion Detection Systems (IDS/IPS) analyzing ingress/egress network flows',
      'User & Entity Behavior Analytics (UEBA) detecting credential theft and insider anomalies',
      'Scheduled and continuous vulnerability scanning with automated penetration testing hooks'
    ],
    features: [
      {
        name: 'Real-Time Telemetry Pipeline',
        description: 'Ingests syslog, VPC flow logs, Kubernetes audit logs, and CloudTrail at 250,000+ EPS.',
        metricLabel: 'Log Ingestion Rate',
        metricValue: '250k+ eps'
      },
      {
        name: 'Behavioral Anomaly Engine',
        description: 'Flags impossible travel, token anomalies, and lateral movement with low false-positive rates.',
        metricLabel: 'Detection Latency',
        metricValue: '180ms'
      },
      {
        name: 'Continuous Dynamic Pen-Testing',
        description: 'Simulates active attacker vectors against public ingress points to validate perimeter defenses.',
        metricLabel: 'Continuous Scans',
        metricValue: 'Every 6h'
      }
    ],
    frameworksOrTech: ['Distributed eBPF', 'Autonomous Cloud SIEM', 'Snort/Suricata IDS Rules', 'Sigma Threat Rule Engine', 'Sigma & YARA'],
    status: 'CONTINUOUS'
  },
  respond: {
    key: 'respond',
    title: 'Respond',
    subtitle: 'Sub-Second Containment & Mitigation',
    description: 'Execute automated Incident Response Plans (IRP), instantly contain blast radiuses, eradicate malicious implants, manage forensic chains of custody, and coordinate stakeholder communications.',
    coreObjectives: [
      'Pre-configured and tested Incident Response Plans (IRP) executed via autonomous SOAR playbooks',
      'Sub-second breach containment: isolate infected host nodes, sever malicious sessions, and quarantine VPCs',
      'Deep root-cause eradication of malware, reverse shells, and persistence mechanisms',
      'Transparent communication templates for board, legal counsel, regulatory authorities, and customers',
      'Integration with law enforcement, CERT advisories, and digital forensics teams'
    ],
    features: [
      {
        name: 'Sub-Second Host Quarantine',
        description: 'Instantly severs compromised host interfaces while preserving memory snapshots for forensics.',
        metricLabel: 'Containment Speed',
        metricValue: '< 400ms'
      },
      {
        name: 'Dynamic Credential Revocation',
        description: 'Invalidates active OAuth tokens, rotates database secrets, and expels adversaries immediately.',
        metricLabel: 'Session Eviction',
        metricValue: 'Instantaneous'
      },
      {
        name: 'Forensics & Audit Recorder',
        description: 'Captures tamper-proof cryptographic timeline logs admissible in legal and insurance proceedings.',
        metricLabel: 'Chain of Custody',
        metricValue: 'RFC 3161 Proof'
      }
    ],
    frameworksOrTech: ['Automated SOAR Playbooks', 'eBPF Process Killer', 'Cloud VPC Quarantine', 'Tamper-Proof Audit Vault', 'Forensic Timeline Gen'],
    status: 'ACTIVE'
  },
  recover: {
    key: 'recover',
    title: 'Recover',
    subtitle: 'Resilient Restoration & Post-Incident Fortification',
    description: 'Restore mission-critical services safely from immutable air-gapped backups, conduct rigorous post-incident reviews (PIR), identify organizational lessons, and update security controls to prevent recurrence.',
    coreObjectives: [
      'Instant automated data restoration from air-gapped, immutable WORM (Write Once, Read Many) backups',
      'Safe, staged resumption of normal operations with integrity verification before public re-routing',
      'Comprehensive Post-Incident Review (PIR) generation to dissect attack vectors and lessons learned',
      'Automatic tuning of prevention policies, detection rules, and GRC controls to eliminate repeat attacks'
    ],
    features: [
      {
        name: 'Air-Gapped Immutable Backups',
        description: 'Cryptographically locked snapshots that cannot be deleted or encrypted by ransomware.',
        metricLabel: 'Recovery Point (RPO)',
        metricValue: '< 5 minutes'
      },
      {
        name: 'Automated Recovery Drill Orchestrator',
        description: 'Runs weekly non-destructive restore drills in isolated sandbox environments.',
        metricLabel: 'Recovery Time (RTO)',
        metricValue: '< 18 minutes'
      },
      {
        name: 'Adaptive Rule Synthesis',
        description: 'Converts incident forensic findings directly into custom Sigma detection rules and firewall policies.',
        metricLabel: 'Post-Incident Hardening',
        metricValue: 'Automated'
      }
    ],
    frameworksOrTech: ['Immutable S3 Object Lock', 'Automated RTO/RPO Drills', 'Post-Incident Review AI', 'Synthetic Health Probes', 'Rule Auto-Tuning'],
    status: 'OPTIMIZED'
  }
};

export const INITIAL_THREAT_ALERTS: ThreatAlert[] = [
  {
    id: 'SEC-2026-901',
    title: 'Zero-Day Remote Code Execution Probe (CVE-2026-3819)',
    severity: 'CRITICAL',
    category: 'Zero-Day Exploit',
    pillar: 'detect',
    source: '185.220.101.44 (Tor Exit Node)',
    targetAsset: 'api-gateway-prod-us-east-1',
    timestamp: '2 mins ago',
    mitreCode: 'T1190',
    mitreTechnique: 'Exploit Public-Facing Application',
    mitrePhase: 'Initial Access',
    status: 'DETECTED',
    blastRadius: 'Ingress Web Tier & Core Auth Middleware',
    details: 'Malformed HTTP/2 header payload attempting heap buffer overflow and shellcode injection into edge reverse proxy daemon.',
    playbookSteps: [
      { step: 1, action: 'Trigger edge WAF regex virtual patch & IP blacklist', automated: true, duration: '45ms' },
      { step: 2, action: 'Cycle edge ingress container instances to clean state', automated: true, duration: '420ms' },
      { step: 3, action: 'Preserve packet trace and core dump in immutable forensics bucket', automated: true, duration: '1.2s' },
      { step: 4, action: 'Notify on-call Security Operations Lead via PagerDuty', automated: true, duration: '1.8s' }
    ]
  },
  {
    id: 'SEC-2026-902',
    title: 'Anomalous Lateral Movement & SMB Admin Share Enumeration',
    severity: 'CRITICAL',
    category: 'Ransomware',
    pillar: 'respond',
    source: '10.0.4.18 (Compromised Worker Node)',
    targetAsset: 'db-cluster-financial-records',
    timestamp: '5 mins ago',
    mitreCode: 'T1021.002',
    mitreTechnique: 'SMB/Windows Admin Shares',
    mitrePhase: 'Lateral Movement',
    status: 'ANALYZING',
    blastRadius: 'VPC Subnet 10.0.4.0/24 & Database Read Replica',
    details: 'Spike in outbound SMB connections and attempted shadow copy volume manipulation. High-entropy encryption pattern suspected.',
    playbookSteps: [
      { step: 1, action: 'Drop all ingress/egress interfaces for host 10.0.4.18', automated: true, duration: '120ms' },
      { step: 2, action: 'Revoke Kerberos and cloud IAM credentials assigned to node', automated: true, duration: '280ms' },
      { step: 3, action: 'Lock database read-replica into read-only quarantine mode', automated: true, duration: '510ms' },
      { step: 4, action: 'Initiate snapshot verification from air-gapped immutable backup', automated: true, duration: '2.5s' }
    ]
  },
  {
    id: 'SEC-2026-903',
    title: 'Cloud IAM Privilege Escalation & Admin Role Attachment',
    severity: 'HIGH',
    category: 'Identity / IAM',
    pillar: 'protect',
    source: 'Console Session: dev-lead@enterprise.io',
    targetAsset: 'AWS IAM Role: OrganizationAccountAccessRole',
    timestamp: '11 mins ago',
    mitreCode: 'T1098',
    mitreTechnique: 'Account Manipulation',
    mitrePhase: 'Persistence',
    status: 'MITIGATING',
    blastRadius: 'Cloud Tenant Root Management Account',
    details: 'Authentication succeeded without physical hardware key from an unapproved IP range in Eastern Europe. Immediate inline policy modification observed.',
    playbookSteps: [
      { step: 1, action: 'Invalidate all STS tokens for user dev-lead@enterprise.io', automated: true, duration: '95ms', completed: true },
      { step: 2, action: 'Detach non-conforming IAM inline policy AdministratorAccess', automated: true, duration: '310ms', completed: true },
      { step: 3, action: 'Lock identity account in Okta and trigger out-of-band verification', automated: true, duration: '640ms' },
      { step: 4, action: 'Generate SOC 2 CC6.1 compliance variance incident report', automated: true, duration: '1.5s' }
    ]
  },
  {
    id: 'SEC-2026-904',
    title: 'S3 Bucket Public Exposure & Unrestricted Access Policy',
    severity: 'HIGH',
    category: 'Cloud Misconfiguration',
    pillar: 'govern',
    source: 'Terraform State Drift / CI Pipeline #8812',
    targetAsset: 's3://customer-invoices-archive-2026',
    timestamp: '18 mins ago',
    mitreCode: 'T1530',
    mitreTechnique: 'Data from Cloud Storage Object',
    mitrePhase: 'Collection',
    status: 'NEUTRALIZED',
    blastRadius: 'Confidential Customer Billing Records',
    containmentTimeMs: 310,
    details: 'Automated CI deployment disabled Public Access Block. CyberSurety autonomous policy enforcer intercepted change and restored bucket lock.',
    playbookSteps: [
      { step: 1, action: 'Autonomous remediation: Re-apply S3 Block Public Access', automated: true, duration: '180ms', completed: true },
      { step: 2, action: 'Revoke compromised deployment token in GitHub Actions', automated: true, duration: '350ms', completed: true },
      { step: 3, action: 'Execute DLP scan: verify no external downloads occurred during exposure window', automated: true, duration: '1.8s', completed: true }
    ]
  },
  {
    id: 'SEC-2026-905',
    title: 'DNS Tunneling Payload & Outbound PII Exfiltration Attempt',
    severity: 'CRITICAL',
    category: 'Data Exfiltration',
    pillar: 'detect',
    source: '10.0.12.90 (Analytics Container)',
    targetAsset: 'dns://ns1.suspicious-exfil-c2.cc',
    timestamp: '24 mins ago',
    mitreCode: 'T1071.004',
    mitreTechnique: 'DNS Application Layer Protocol',
    mitrePhase: 'Exfiltration',
    status: 'NEUTRALIZED',
    blastRadius: 'Customer Analytics Microservice',
    containmentTimeMs: 190,
    details: 'High-frequency base32 queries containing tokenized credit card fragments detected by eBPF DNS resolver probe. Sinkhole deployed.',
    playbookSteps: [
      { step: 1, action: 'Sinkhole domain ns1.suspicious-exfil-c2.cc across VPC resolvers', automated: true, duration: '60ms', completed: true },
      { step: 2, action: 'SIGKILL anomalous python exfil worker thread on container', automated: true, duration: '130ms', completed: true },
      { step: 3, action: 'Trigger GDPR Article 33 breach assessment protocol', automated: true, duration: '800ms', completed: true }
    ]
  }
];

export const COMPLIANCE_FRAMEWORKS: ComplianceFramework[] = [
  {
    id: 'iso-27001',
    name: 'ISO/IEC 27001:2022',
    fullName: 'Information Security Management System (ISMS)',
    category: 'International Standard',
    totalControls: 93,
    passingControls: 91,
    status: 'Compliant',
    nextAuditDate: 'Nov 14, 2026',
    keyRequirements: [
      'Annex A.5: Organizational Controls & Risk Governance',
      'Annex A.8: Technological Controls (Access, Malware, Backup)',
      'Annex A.8.16: Monitoring activities and SIEM log retention',
      'Continuous corrective action and internal audits'
    ]
  },
  {
    id: 'nist-csf',
    name: 'NIST CSF 2.0',
    fullName: 'National Institute of Standards & Technology Cybersecurity Framework',
    category: 'US Federal & Enterprise Gold Standard',
    totalControls: 106,
    passingControls: 104,
    status: 'Audit Ready',
    nextAuditDate: 'Oct 02, 2026',
    keyRequirements: [
      'Govern (GV): Organizational Context, Risk Strategy & Oversight',
      'Identify (ID): Asset Management, Risk Assessment & Supply Chain',
      'Protect (PR): Identity, Safeguards, Data Security & Training',
      'Detect (DE): Continuous Monitoring, Anomaly & Event Analysis',
      'Respond (RS): Incident Management, Containment & Mitigation',
      'Recover (RC): Restoration Planning & Post-Incident Fortification'
    ]
  },
  {
    id: 'soc-2',
    name: 'SOC 2 Type II',
    fullName: 'AICPA Service Organization Control 2 (Security, Availability & Confidentiality)',
    category: 'SaaS Trust Services Criteria',
    totalControls: 64,
    passingControls: 64,
    status: 'Compliant',
    nextAuditDate: 'Jan 15, 2027',
    keyRequirements: [
      'CC6: Logical and Physical Access Controls',
      'CC7: System Operations, Vulnerability & Threat Monitoring',
      'CC8: Change Management & Secure SDLC',
      'A1.2: Environmental Protections & Disaster Recovery'
    ]
  },
  {
    id: 'hipaa',
    name: 'HIPAA Security Rule',
    fullName: 'Health Insurance Portability and Accountability Act',
    category: 'Healthcare & PHI Compliance',
    totalControls: 42,
    passingControls: 41,
    status: 'Audit Ready',
    nextAuditDate: 'Dec 08, 2026',
    keyRequirements: [
      '§164.308: Administrative Safeguards (Risk Analysis, Workforce Training)',
      '§164.312: Technical Safeguards (Access Control, Audit Controls, Integrity)',
      '§164.312(a)(2)(iv): Encryption & Decryption of ePHI at rest and in transit'
    ]
  },
  {
    id: 'gdpr',
    name: 'GDPR (EU 2016/679)',
    fullName: 'General Data Protection Regulation',
    category: 'Data Privacy & Human Rights',
    totalControls: 38,
    passingControls: 37,
    status: 'Compliant',
    nextAuditDate: 'Continuous',
    keyRequirements: [
      'Article 32: Security of Processing (Encryption, Resilience, Testing)',
      'Article 33: 72-Hour Notification of Personal Data Breach',
      'Article 25: Data Protection by Design and by Default'
    ]
  },
  {
    id: 'pci-dss',
    name: 'PCI-DSS v4.0',
    fullName: 'Payment Card Industry Data Security Standard',
    category: 'Financial & Cardholder Data',
    totalControls: 78,
    passingControls: 76,
    status: 'Audit Ready',
    nextAuditDate: 'Feb 20, 2027',
    keyRequirements: [
      'Req 1 & 2: Build & Maintain Secure Networks & Firewalls',
      'Req 3: Protect Stored Account Data (Strong Cryptography)',
      'Req 10: Log and Monitor All Access to Network Resources',
      'Req 11: Regularly Test Security of Systems and Networks'
    ]
  }
];

export const DATA_ASSET_INVENTORY: DataAssetClassification[] = [
  {
    id: 'asset-01',
    name: 'Primary Customer DB (PII & Billing)',
    tier: 'Restricted / Sensitive',
    storeType: 'PostgreSQL Cloud DB',
    recordsCount: '4,280,000+',
    encryptionStatus: 'AES-256 (GCM)',
    complianceTag: 'GDPR / SOC 2 / HIPAA',
    riskScore: 12
  },
  {
    id: 'asset-02',
    name: 'Cardholder Tokenization Vault',
    tier: 'Restricted / Sensitive',
    storeType: 'PostgreSQL Cloud DB',
    recordsCount: '890,000+',
    encryptionStatus: 'TLS 1.3 / Enclave',
    complianceTag: 'PCI-DSS v4.0',
    riskScore: 8
  },
  {
    id: 'asset-03',
    name: 'Audit Logs & Cold Telemetry Store',
    tier: 'Confidential',
    storeType: 'S3 Bucket',
    recordsCount: '124,000,000+',
    encryptionStatus: 'AES-256 (GCM)',
    complianceTag: 'ISO 27001 / NIST CSF',
    riskScore: 14
  },
  {
    id: 'asset-04',
    name: 'Core Application Source Code',
    tier: 'Confidential',
    storeType: 'Git Repositories',
    recordsCount: '142 repos',
    encryptionStatus: 'TLS 1.3 / Enclave',
    complianceTag: 'SOC 2 CC8',
    riskScore: 19
  },
  {
    id: 'asset-05',
    name: 'Corporate Directory & Employee Vault',
    tier: 'Internal',
    storeType: 'Employee HR Vault',
    recordsCount: '2,400 staff',
    encryptionStatus: 'AES-256 (GCM)',
    complianceTag: 'SOC 2 CC6',
    riskScore: 22
  },
  {
    id: 'asset-06',
    name: 'Public CDN Assets & Marketing VIP',
    tier: 'Public',
    storeType: 'S3 Bucket',
    recordsCount: '18,500 files',
    encryptionStatus: 'AES-256 (GCM)',
    complianceTag: 'None (Public)',
    riskScore: 4
  }
];

export const PRESET_AI_SCENARIOS = [
  {
    label: 'Ransomware Lateral Spread',
    scenario: 'High-entropy disk write burst detected on VPC subnet 10.0.4.0/24 with SMB shadow copy deletion commands.',
    alertType: 'Ransomware',
    framework: 'NIST CSF 2.0'
  },
  {
    label: 'Compromised Cloud Admin IAM',
    scenario: 'Privilege escalation alert: dev-lead credentials used from Tor exit node to attach AdministratorAccess policy without MFA.',
    alertType: 'Identity / IAM',
    framework: 'SOC 2 Type II'
  },
  {
    label: 'Covert DNS Data Exfiltration',
    scenario: 'Outbound DNS tunneling detected exfiltrating customer PII and tokenized bank accounts via high-frequency subdomains.',
    alertType: 'Data Exfiltration',
    framework: 'GDPR (EU 2016/679)'
  },
  {
    label: 'Zero-Day Ingress Web Exploit',
    scenario: 'CVE-2026-3819 remote code execution probe targeting public API gateway with memory corruption shellcode payload.',
    alertType: 'Zero-Day Exploit',
    framework: 'ISO/IEC 27001:2022'
  }
];

export const INTEGRATIONS_LIST = [
  { name: 'Amazon Web Services', category: 'Cloud Provider', icon: 'Cloud' },
  { name: 'Google Cloud Platform', category: 'Cloud Provider', icon: 'Cloud' },
  { name: 'Microsoft Azure', category: 'Cloud Provider', icon: 'Cloud' },
  { name: 'CrowdStrike Falcon', category: 'Endpoint EDR', icon: 'ShieldCheck' },
  { name: 'Okta Identity', category: 'Identity & MFA', icon: 'Key' },
  { name: 'Splunk Cloud', category: 'SIEM & Analytics', icon: 'Activity' },
  { name: 'Kubernetes / eBPF', category: 'Container Runtime', icon: 'Cpu' },
  { name: 'GitHub Enterprise', category: 'Code & CI/CD', icon: 'GitBranch' },
  { name: 'ServiceNow & Jira', category: 'ITSM & Ticketing', icon: 'Layers' },
  { name: 'Slack & PagerDuty', category: 'Incident Alerting', icon: 'BellRing' }
];

export const PRICING_PLANS = [
  {
    id: 'starter',
    name: 'Shield Standard',
    tagline: 'Essential continuous monitoring & basic compliance for growing tech companies.',
    monthlyPrice: 1490,
    annualPrice: 1190,
    badge: 'Fast Setup',
    popular: false,
    features: [
      'Continuous Threat Monitoring (up to 500 assets)',
      'Autonomous detection for top 50 CVEs & misconfigurations',
      '1 Compliance Framework (SOC 2 or ISO 27001)',
      'Automated Evidence Collector with cloud connectors',
      'Sub-second automated IP & host quarantine',
      'Email & Slack SOC incident alerts',
      'Audit log retention: 1 Year'
    ]
  },
  {
    id: 'business',
    name: 'GRC + SecOps Pro',
    tagline: 'Comprehensive threat mitigation, autonomous SOAR, and multi-framework audit readiness.',
    monthlyPrice: 3890,
    annualPrice: 3100,
    badge: 'Most Popular',
    popular: true,
    features: [
      'Unlimited Asset & Cloud Account Telemetry',
      'Full 6-Pillar NIST CSF 2.0 & ISO 27001 coverage',
      '3 Frameworks included (SOC 2, ISO 27001, HIPAA or GDPR)',
      'Autonomous Sub-Second Mitigation & SOAR Playbooks',
      'eBPF Runtime Kernel Behavioral Anomaly Engine',
      'AI Threat Analyst & Incident Response Co-Pilot',
      'Air-gapped immutable backup integrity testing',
      'Audit log retention: 3 Years (Tamper-Proof WORM)',
      '24/7 Priority Emergency Escalation'
    ]
  },
  {
    id: 'enterprise',
    name: 'Sovereign Enterprise',
    tagline: 'Custom deployment, dedicated SIEM tenancy, continuous pen-testing, and auditor guarantee.',
    monthlyPrice: 8900,
    annualPrice: 7100,
    badge: 'Enterprise Grade',
    popular: false,
    features: [
      'All Global Compliance Frameworks (NIST, ISO, SOC 2, HIPAA, GDPR, PCI-DSS, FedRAMP)',
      'Dedicated Sovereign Tenant / On-Prem VPC deployment',
      'Autonomous Custom SOAR Playbook Builder',
      'Continuous Dynamic External Pen-Testing (EASM)',
      'Named Enterprise Security Architect & CISO Advisor',
      'Auditor in-the-room guarantee with audit pass warranty',
      'Custom zero-day YARA & Sigma threat rule development',
      'Tailored SLA 99.99% with 5-minute incident response',
      'Unlimited Cryptographic Audit Log Vault'
    ]
  }
];
