export type PillarKey = 'govern' | 'identify' | 'protect' | 'detect' | 'respond' | 'recover';

export interface PillarDetail {
  key: PillarKey;
  title: string;
  subtitle: string;
  description: string;
  coreObjectives: string[];
  features: {
    name: string;
    description: string;
    metricLabel: string;
    metricValue: string;
  }[];
  frameworksOrTech: string[];
  status: 'ACTIVE' | 'OPTIMIZED' | 'CONTINUOUS';
}

export type ThreatSeverity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
export type ThreatStatus = 'DETECTED' | 'ANALYZING' | 'MITIGATING' | 'NEUTRALIZED';

export interface MitigationStep {
  step: number;
  action: string;
  automated: boolean;
  duration: string;
  completed?: boolean;
}

export interface ThreatAlert {
  id: string;
  title: string;
  severity: ThreatSeverity;
  category: 'Ransomware' | 'Identity / IAM' | 'Data Exfiltration' | 'DDoS' | 'Zero-Day Exploit' | 'Cloud Misconfiguration';
  pillar: PillarKey;
  source: string;
  targetAsset: string;
  timestamp: string;
  mitreCode: string;
  mitreTechnique: string;
  mitrePhase: string;
  status: ThreatStatus;
  blastRadius: string;
  details: string;
  playbookSteps: MitigationStep[];
  containmentTimeMs?: number;
}

export interface ComplianceFramework {
  id: string;
  name: string;
  fullName: string;
  category: string;
  totalControls: number;
  passingControls: number;
  status: 'Compliant' | 'Audit Ready' | 'In Progress';
  nextAuditDate: string;
  keyRequirements: string[];
}

export interface DataAssetClassification {
  id: string;
  name: string;
  tier: 'Public' | 'Internal' | 'Confidential' | 'Restricted / Sensitive';
  storeType: 'S3 Bucket' | 'PostgreSQL Cloud DB' | 'Redis Cache' | 'Employee HR Vault' | 'Git Repositories';
  recordsCount: string;
  encryptionStatus: 'AES-256 (GCM)' | 'TLS 1.3 / Enclave' | 'Missing Key Rotation';
  complianceTag: string;
  riskScore: number; // 0-100
}

export interface RiskCalculatorInputs {
  industry: string;
  companySize: string;
  cloudProviders: string[];
  frameworks: string[];
  hasMFAEverywhere: boolean;
  hasImmutableBackups: boolean;
  hasAutomatedSIEM: boolean;
  hasContinuousAudits: boolean;
}

export interface AIAnalysisResult {
  incidentName: string;
  threatActorType: string;
  severity: ThreatSeverity;
  mitreAttack: { id: string; name: string; phase: string }[];
  technicalSummary: string;
  blastRadius: string;
  mitigationPlaybook: MitigationStep[];
  complianceImpact: {
    framework: string;
    affectedControls: string[];
    penaltyRisk: string;
    requiredNotificationWindow: string;
  };
  recoveryRecommendation: string;
}

export type ServiceKey = 'threat-monitoring' | 'risk-assessment' | 'compliance-management' | 'incident-response';

export interface ServiceFeature {
  title: string;
  description: string;
  technicalSpec: string;
  metricLabel: string;
  metricValue: string;
}

export interface ServiceBenefit {
  title: string;
  description: string;
  impactMetric: string;
  category: 'Threat Mitigation' | 'Compliance & Governance' | 'Cost & Efficiency';
}

export interface ServiceControlMapping {
  framework: string;
  controlCode: string;
  title: string;
  howServiceSatisfies: string;
  automatedEvidenceFrequency: string;
}

export interface ServiceDetail {
  id: ServiceKey;
  slug: string;
  title: string;
  tagline: string;
  badge: string;
  summary: string;
  fullDescription: string;
  sla: string;
  threatMitigation: {
    coreObjective: string;
    howItMitigatesThreats: string;
    preventedAttackVectors: {
      vector: string;
      mitreId: string;
      mitigationMechanism: string;
    }[];
    mttdMttrImpact: string;
  };
  complianceAssurance: {
    coreObjective: string;
    howItEnsuresCompliance: string;
    keyControls: ServiceControlMapping[];
    auditReadinessBenefit: string;
  };
  keyFeatures: ServiceFeature[];
  keyBenefits: ServiceBenefit[];
  deliverables: string[];
}

export type ResourceCategory = 'blog' | 'report' | 'webinar' | 'case-study' | 'advisory';

export interface ResourceCategoryMeta {
  id: ResourceCategory;
  name: string;
  description: string;
  count: number;
}

export interface ResourceOutlineSection {
  sectionTitle: string;
  keyPoints: string[];
  codeOrSnippet?: string;
  mitigationChecklist?: string[];
}

export interface ResourceItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: ResourceCategory;
  categoryLabel: string;
  readTimeOrDuration: string;
  publishedDate: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  threatFocus: string;
  mitigationFocus: string;
  tags: string[];
  featured?: boolean;
  abstract: string;
  contentOutline: ResourceOutlineSection[];
  keyTakeaways: string[];
  downloadableAssets?: string[];
  webinarMetadata?: {
    speaker: string;
    status: 'On-Demand' | 'Live Upcoming';
    duration: string;
    agenda: string[];
  };
  caseStudyMetrics?: {
    metric: string;
    label: string;
    beforeAfter: string;
  }[];
}

export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  message: string;
  inquiryType?: string;
  urgency?: 'normal' | 'urgent_threat' | 'compliance_deadline';
  phone?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'agent' | 'system';
  agentName?: string;
  text: string;
  timestamp: string;
  quickOptions?: string[];
}
