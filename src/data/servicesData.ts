import { ServiceDetail } from '../types';

export const SERVICES_DATA: ServiceDetail[] = [
  {
    id: 'threat-monitoring',
    slug: 'threat-monitoring',
    title: '24/7 Threat Monitoring & Autonomous SOC',
    tagline: 'Continuous cloud-native telemetry ingestion with kernel-level eBPF tripwires and sub-second anomaly detection.',
    badge: 'Real-Time Telemetry & SOC',
    summary: 'Proactive 24/7 surveillance across multi-cloud environments, on-prem infrastructure, and identity providers. Leverages eBPF sensors and AI-assisted behavioral analytics to neutralize malicious actors before lateral propagation occurs.',
    fullDescription: 'Our Threat Monitoring service delivers round-the-clock visibility into enterprise attack surfaces. Ingesting over 250,000 events per second across AWS, GCP, Azure, Kubernetes, and Okta, our platform identifies anomalous signals, correlating alerts against the MITRE ATT&CK enterprise matrix. By combining deep kernel-level eBPF instrumentation with machine learning telemetry, CyberSurety isolates threats with sub-second precision while maintaining full regulatory audit trails.',
    sla: 'Sub-300ms Autonomous Containment • 99.999% Telemetry Ingestion Uptime',
    threatMitigation: {
      coreObjective: 'Eliminate adversary dwell time through proactive signal detection and instantaneous threat containment.',
      howItMitigatesThreats: 'Adversaries operate in stealth, averaging over 200 days of undiscovered reconnaissance. CyberSurety removes this asymmetry by deploying distributed eBPF kernel tripwires that monitor system calls, process injections, and memory tampering in real time. Any deviation from cryptographically verified baselines triggers autonomous micro-quarantining, halting lateral movement, ransomware encryption, or credential harvesting within milliseconds.',
      preventedAttackVectors: [
        {
          vector: 'Ransomware Mass Volume Encryption',
          mitreId: 'T1486',
          mitigationMechanism: 'eBPF file-entropy heuristic monitors intercept high-velocity file modification bursts and issue instant SIGKILL to malicious parent processes.'
        },
        {
          vector: 'Compromised IAM Token Staking & Lateral Pivot',
          mitreId: 'T1078.004',
          mitigationMechanism: 'Continuous behavioral analysis flags geographic impossibilities and anomalous API calls, auto-invalidating STS session tokens via AWS/Azure IAM.'
        },
        {
          vector: 'Covert DNS & ICMP Tunneling / Data Exfiltration',
          mitreId: 'T1048.003',
          mitigationMechanism: 'Deep packet inspection decodes encoded base64/hex payloads in non-standard DNS query strings and resets connection sockets at the VPC gateway.'
        },
        {
          vector: 'Zero-Day Remote Code Execution (RCE)',
          mitreId: 'T1203',
          mitigationMechanism: 'Kernel memory-protection tripwires prevent shellcode execution from web application stacks (e.g., Log4j, Spring4Shell variants).'
        }
      ],
      mttdMttrImpact: 'Mean Time to Detect (MTTD) slashed from 16 days to 14 seconds; Mean Time to Respond (MTTR) reduced from 4.2 hours to 280 milliseconds.'
    },
    complianceAssurance: {
      coreObjective: 'Maintain unbroken, cryptographically hashed audit trails satisfying mandatory continuous surveillance mandates.',
      howItEnsuresCompliance: 'Regulatory standards mandate that organizations log, inspect, and archive all security-relevant network, user, and compute events. CyberSurety provides automated immutable log storage (WORM) paired with automated SIEM rule verification, guaranteeing that client environments fulfill the audit logging and continuous monitoring clauses of NIST CSF 2.0, ISO 27001, SOC 2, HIPAA, and PCI-DSS without manual log scraping.',
      keyControls: [
        {
          framework: 'NIST CSF 2.0',
          controlCode: 'DE.CM-01 & DE.AE-02',
          title: 'Continuous Monitoring & Anomaly Analysis',
          howServiceSatisfies: '24/7 event collection across computing assets, networks, and perimeter egress with baseline deviation alerting.',
          automatedEvidenceFrequency: 'Continuous (Real-time telemetry stream)'
        },
        {
          framework: 'ISO/IEC 27001:2022',
          controlCode: 'A.12.4.1 & A.12.4.3',
          title: 'Event Logging & Administrator Activity Monitoring',
          howServiceSatisfies: 'Captures and cryptographically signs admin access, privilege escalations, and system exceptions into tamper-proof stores.',
          automatedEvidenceFrequency: 'Hourly cryptographic batch hashing'
        },
        {
          framework: 'SOC 2 Type II',
          controlCode: 'CC7.2',
          title: 'Security Anomaly Detection & Monitoring',
          howServiceSatisfies: 'Continuous evaluation of infrastructure metrics to detect and alert on unauthorized configuration or runtime tampering.',
          automatedEvidenceFrequency: 'Real-time telemetry reports'
        },
        {
          framework: 'HIPAA Security Rule',
          controlCode: '§164.312(b)',
          title: 'Audit Controls on ePHI Systems',
          howServiceSatisfies: 'Monitors read/write access to databases containing electronic Protected Health Information (ePHI) with zero telemetry loss.',
          automatedEvidenceFrequency: 'Daily audit reconciliation logs'
        },
        {
          framework: 'PCI-DSS v4.0',
          controlCode: 'Req 10.2.1 - 10.2.7',
          title: 'Log All User Access to Cardholder Data',
          howServiceSatisfies: 'Automated audit logs verifying every root/admin elevation, invalid access attempts, and audit log clearing attempts.',
          automatedEvidenceFrequency: 'Real-time alerting + 365-day cold archive'
        }
      ],
      auditReadinessBenefit: 'Zero manual log collection required during SOC 2, ISO, or HIPAA audits. Generates pre-formatted auditor packets in one click.'
    },
    keyFeatures: [
      {
        title: 'Distributed eBPF Kernel Probes',
        description: 'Zero-overhead Linux kernel observability hooks detecting suspicious process execution, namespace escapes, and packet mutations.',
        technicalSpec: '<0.8% CPU overhead; zero kernel module recompilation required; Kubernetes CNI-compatible.',
        metricLabel: 'Capture Overhead',
        metricValue: '<0.8% CPU'
      },
      {
        title: 'Multi-Cloud Ingestion Engine',
        description: 'Native connectors for AWS CloudTrail, GCP Cloud Logging, Azure Monitor, Okta System Log, CrowdStrike, and GitHub audit streams.',
        technicalSpec: 'Over 250k events per second processing capacity with sub-10ms correlation latency.',
        metricLabel: 'Ingestion Capacity',
        metricValue: '250k+ EPS'
      },
      {
        title: 'MITRE ATT&CK Matrix Correlation',
        description: 'Real-time tactical mapping aligning raw log events into MITRE tactics (Initial Access through Impact) for clear kill-chain context.',
        technicalSpec: 'Maps across all 14 enterprise tactics and 193 sub-techniques automatically.',
        metricLabel: 'Tactics Tracked',
        metricValue: '14 Tactics'
      },
      {
        title: 'Autonomous Signal-to-Noise Filter',
        description: 'Machine learning noise dampener eliminating 98.4% of false-positive alarms so security teams only review genuine high-priority incidents.',
        technicalSpec: 'Bayesian baseline modeling trained on historical infrastructure telemetry patterns.',
        metricLabel: 'Alert Fatigue Reduction',
        metricValue: '98.4%'
      }
    ],
    keyBenefits: [
      {
        title: 'Instant Threat Isolation',
        description: 'Attacks are halted in less than 300ms before malware can encrypt storage or attackers can exfiltrate sensitive IP.',
        impactMetric: '280ms',
        category: 'Threat Mitigation'
      },
      {
        title: 'Continuous Compliance Audit Trails',
        description: 'Automated evidence streams satisfy auditor demands for continuous log retention, monitoring, and administrative access oversight.',
        impactMetric: '100% Ready',
        category: 'Compliance & Governance'
      },
      {
        title: '70% SecOps Operational Cost Savings',
        description: 'Eliminate the need to hire and staff a 24/7 tier-1 SOC triage team of 6-8 full-time security analysts.',
        impactMetric: '$420k/yr',
        category: 'Cost & Efficiency'
      }
    ],
    deliverables: [
      '24/7 Real-Time SOC Telemetry Portal with DEFCON Status Tracker',
      'Automated eBPF Agent Fleet Deployment Scripts (Helm, Terraform, Ansible)',
      'Multi-Cloud API Connectors (AWS, GCP, Azure, Okta, Kubernetes)',
      'Weekly Executive Threat Horizon & IOC (Indicators of Compromise) Reports',
      'Auditor-Certified Continuous Logging & Monitoring Attestation Certificate'
    ]
  },
  {
    id: 'risk-assessment',
    slug: 'risk-assessment',
    title: 'Quantitative Cyber Risk Assessment & Threat Modeling',
    tagline: 'Continuous attack surface discovery, FAIR-based financial exposure quantification, and prioritized vulnerability triage.',
    badge: 'Continuous Risk & Exposure',
    summary: 'Transform subjective cybersecurity guessing into rigorous, mathematical risk quantification. Continuous external attack surface mapping, CVSS/EPSS vulnerability scoring, and Monte Carlo financial loss simulations.',
    fullDescription: 'Our Risk Assessment service provides executive leadership and engineering teams with continuous visibility into enterprise risk posture. Grounded in the Factor Analysis of Information Risk (FAIR™) methodology, CyberSurety scans external perimeter assets, internal code repositories, and cloud configurations to identify exploitable weaknesses. By evaluating threat event frequency against vulnerability exploitability and asset criticality, we deliver prioritized remediation guidance and exact financial loss curves.',
    sla: 'Continuous Attack Surface Discovery • Daily Vulnerability Triage Re-scans',
    threatMitigation: {
      coreObjective: 'Identify and remediate high-risk attack vectors before threat actors can discover and weaponize them.',
      howItMitigatesThreats: 'Most breaches exploit known vulnerabilities or configuration drift that went unnoticed for months. Our Risk Assessment engine acts as an adversarial scout, conducting non-invasive black-box reconnaissance against your domain, public IP ranges, and cloud storage buckets. We combine EPSS (Exploit Prediction Scoring System) data with asset criticality to highlight the 2% of vulnerabilities that pose 95% of actual breach danger.',
      preventedAttackVectors: [
        {
          vector: 'Unauthenticated Public Cloud Storage Exposure',
          mitreId: 'T1530',
          mitigationMechanism: 'Continuous CSPM scanner detects public read/write ACLs on S3/Blob storage containing sensitive data and auto-remediates bucket policies.'
        },
        {
          vector: 'Exploitation of Known Unpatched Software Flaws',
          mitreId: 'T1190',
          mitigationMechanism: 'Prioritizes CVEs using real-world exploit availability (EPSS > 0.6) and generates turnkey pull-requests to update vulnerable package dependencies.'
        },
        {
          vector: 'Stale / Shadow IT API Endpoints',
          mitreId: 'T1596',
          mitigationMechanism: 'Discovers abandoned staging subdomains, deprecated Swagger documentation, and expired TLS certificates exposing legacy backends.'
        },
        {
          vector: 'Leaked Corporate Credentials on Dark Web / GitHub',
          mitreId: 'T1552.001',
          mitigationMechanism: 'Monitors public paste sites, Git commit histories, and underground forums for compromised company domains and API secret keys.'
        }
      ],
      mttdMttrImpact: 'Reduces mean time to remediate critical exposures from 48 days to under 48 hours with automated pull-request remediation.'
    },
    complianceAssurance: {
      coreObjective: 'Satisfy rigorous annual and continuous risk assessment mandates required by global regulatory frameworks.',
      howItEnsuresCompliance: 'Regulatory standards like NIST CSF 2.0 (ID.RA), ISO 27001 (Clause 6.1.2), HIPAA (§164.308), and SOC 2 (CC3.2) forbid static check-the-box assessments. They require organizations to perform continuous, documented risk assessments that tie technical findings to business impact. CyberSurety produces structured, auditor-approved Risk Assessment Reports and dynamic Risk Registers on demand.',
      keyControls: [
        {
          framework: 'NIST CSF 2.0',
          controlCode: 'ID.RA-01 to ID.RA-06',
          title: 'Risk Assessment & Vulnerability Identification',
          howServiceSatisfies: 'Identifies asset vulnerabilities, estimates likelihood and impact, and produces continuous Risk Registers with remediation priorities.',
          automatedEvidenceFrequency: 'Weekly re-assessment snapshots'
        },
        {
          framework: 'ISO/IEC 27001:2022',
          controlCode: 'Clause 6.1.2 & A.12.6.1',
          title: 'Information Security Risk Assessment & Management of Technical Vulnerabilities',
          howServiceSatisfies: 'Maintains quantitative risk methodology criteria with verifiable vulnerability scanning evidence across all asset classes.',
          automatedEvidenceFrequency: 'Monthly formal risk register export'
        },
        {
          framework: 'SOC 2 Type II',
          controlCode: 'CC3.2 & CC3.3',
          title: 'Risk Evaluation & Vulnerability Management',
          howServiceSatisfies: 'Continuously assesses internal and external risk factors including third-party dependencies, API exposure, and infrastructure drift.',
          automatedEvidenceFrequency: 'Continuous vulnerability scan logs'
        },
        {
          framework: 'HIPAA Security Rule',
          controlCode: '§164.308(a)(1)(ii)(A)',
          title: 'Conduct an Accurate and Thorough Risk Analysis',
          howServiceSatisfies: 'Evaluates potential risks and vulnerabilities to the confidentiality, integrity, and availability of electronic PHI held by the entity.',
          automatedEvidenceFrequency: 'Quarterly ePHI Risk Attestation'
        },
        {
          framework: 'GDPR',
          controlCode: 'Article 32',
          title: 'Security of Processing & Data Protection Impact Assessment (DPIA)',
          howServiceSatisfies: 'Automated data classification and exposure risk scoring across EU citizen data stores and cross-border replication pipelines.',
          automatedEvidenceFrequency: 'Continuous posture score logs'
        }
      ],
      auditReadinessBenefit: 'Transforms high-stress annual third-party risk audit engagements into pre-validated, reproducible mathematical reports.'
    },
    keyFeatures: [
      {
        title: 'FAIR™ Quantitative Risk Engine',
        description: 'Translates technical CVEs into probable annual dollar loss figures (ALE) using Monte Carlo statistical modeling.',
        technicalSpec: 'Runs 10,000 Monte Carlo trial simulations across calibrated threat capability and asset loss distribution curves.',
        metricLabel: 'Simulation Accuracy',
        metricValue: '10,000 Trials'
      },
      {
        title: 'External Attack Surface Management (EASM)',
        description: 'Discovers unknown shadow IT, dangling DNS records, open administrative ports, and leaked secrets without installing agents.',
        technicalSpec: 'Continuous internet-wide passive DNS, certificate transparency log, and cloud IP space scanning.',
        metricLabel: 'Perimeter Coverage',
        metricValue: '100% External'
      },
      {
        title: 'EPSS-Driven Vulnerability Prioritization',
        description: 'Filters through thousands of routine CVEs to isolate the specific vulnerabilities with active exploit code circulating in the wild.',
        technicalSpec: 'Combines FIRST EPSS probability scores with CISA Known Exploited Vulnerabilities (KEV) catalog.',
        metricLabel: 'Noise Reduction',
        metricValue: '93% Filtered'
      },
      {
        title: 'Dynamic Risk Register & Board Visualizer',
        description: 'Live interactive risk heat map and board-ready executive summaries showing risk burn-down trajectories over time.',
        technicalSpec: 'One-click export to PDF, CSV, and executive slide deck formats with full control crosswalks.',
        metricLabel: 'Export Formats',
        metricValue: 'PDF / CSV / JSON'
      }
    ],
    keyBenefits: [
      {
        title: 'Targeted Remediation on What Matters',
        description: 'Engineers fix the top 5% of vulnerabilities that represent 90%+ of real-world exploitation risk, saving hundreds of developer hours.',
        impactMetric: '85% Faster',
        category: 'Threat Mitigation'
      },
      {
        title: 'Ironclad Regulatory Audit Defense',
        description: 'Provides auditors with mathematically validated risk assessment evidence that exceeds ISO 27001, HIPAA, and SOC 2 requirements.',
        impactMetric: '100% Compliant',
        category: 'Compliance & Governance'
      },
      {
        title: 'Cyber Insurance Premium Reduction',
        description: 'Quantitative risk reduction reports allow clients to negotiate significant annual discounts with tier-1 cyber insurance carriers.',
        impactMetric: '25-40% Savings',
        category: 'Cost & Efficiency'
      }
    ],
    deliverables: [
      'Comprehensive FAIR™ Quantitative Cyber Risk Report (Annual & Quarterly)',
      'External Attack Surface Inventory (Domains, Subdomains, IPs, Cloud Buckets)',
      'Prioritized Vulnerability & CVE Remediation Roadmap with EPSS Context',
      'Continuous Dynamic Enterprise Risk Register (NIST & ISO Aligned)',
      'C-Suite & Board of Directors Cyber Risk Executive Presentation Deck'
    ]
  },
  {
    id: 'compliance-management',
    slug: 'compliance-management',
    title: 'Continuous Compliance Management & GRC Orchestration',
    tagline: 'Automated evidence harvesting, multi-framework control crosswalks, and effortless audit readiness.',
    badge: 'Continuous GRC & Audits',
    summary: 'Eliminate manual audit chaos with automated evidence harvesting across 85+ enterprise integrations. Real-time control monitoring for ISO 27001, NIST CSF 2.0, SOC 2, HIPAA, GDPR, and PCI-DSS.',
    fullDescription: 'Our Compliance Management service turns compliance from a stressful annual scramble into an effortless, continuous operational baseline. By directly querying cloud APIs, identity providers, version control platforms, and HR systems, CyberSurety validates hundreds of security controls every hour. The platform automatically maps single operational activities to multiple international standards simultaneously, saving hundreds of engineering hours and providing auditors with a verifiable digital evidence room.',
    sla: 'Hourly Automated Evidence Collection • 100% Framework Control Mapping',
    threatMitigation: {
      coreObjective: 'Harden cloud infrastructure against threat vectors by strictly enforcing baseline security configurations and zero-drift policies.',
      howItMitigatesThreats: 'Over 80% of security breaches stem from misconfigurations, unenforced MFA, privilege creep, or unrotated cryptographic keys. Compliance is not just bureaucratic paperwork—it is the operational discipline of security. CyberSurety continuously validates that firewalls deny public ingress, encryption keys rotate every 90 days, multi-factor authentication is active on all privileged accounts, and backups are air-gapped and immutable, eliminating the foundational flaws that attackers exploit.',
      preventedAttackVectors: [
        {
          vector: 'Privilege Creep & Orphaned Admin Accounts',
          mitreId: 'T1078.001',
          mitigationMechanism: 'Continuously reconciles HR terminations with IAM users, auto-deprovisioning inactive sessions and revoking orphaned cloud keys.'
        },
        {
          vector: 'Unencrypted Data at Rest / In Transit',
          mitreId: 'T1005',
          mitigationMechanism: 'Scans all databases, snapshots, and network load balancers for TLS 1.3 enforcement and AES-256-GCM encryption standards.'
        },
        {
          vector: 'Rogue Infrastructure & Configuration Drift',
          mitreId: 'T1578.002',
          mitigationMechanism: 'Compares active cloud infrastructure against GitOps Terraform baselines, flagging unapproved changes within minutes.'
        },
        {
          vector: 'Supply Chain Code Injection & Secret Leaks',
          mitreId: 'T1195.001',
          mitigationMechanism: 'Checks pull requests for branch protection rules, mandatory peer reviews, and secrets detection before deployment to production.'
        }
      ],
      mttdMttrImpact: 'Detects and flags compliance configuration drift in under 15 minutes, preventing vulnerabilities from persisting into production.'
    },
    complianceAssurance: {
      coreObjective: 'Unified crosswalk architecture ensuring 1 evidence item satisfies 5+ frameworks simultaneously.',
      howItEnsuresCompliance: 'Traditional compliance requires gathering separate screenshots for SOC 2, ISO 27001, HIPAA, and PCI-DSS. CyberSurety’s Unified Crosswalk maps technical evidence directly to the shared intent of international frameworks. When your AWS KMS key rotation check passes, it simultaneously marks controls compliant across ISO 27001 A.10.1, NIST CSF PR.DS-1, SOC 2 CC6.1, and HIPAA §164.312(a)(2)(iv), giving you 100% audit confidence.',
      keyControls: [
        {
          framework: 'ISO/IEC 27001:2022',
          controlCode: 'Clause 9 & 10, A.5 - A.8',
          title: 'Information Security Management System & Annex A Controls',
          howServiceSatisfies: 'Automated tracking of policies, continuous technical checks, internal audit logs, and corrective action workflows.',
          automatedEvidenceFrequency: 'Hourly cloud API polling'
        },
        {
          framework: 'NIST CSF 2.0',
          controlCode: 'GV.OC-01 to GV.RR-04',
          title: 'Organizational Governance & Policy Enforcement',
          howServiceSatisfies: 'Verifies organizational security roles, supply chain risk management, and formal security policy attestation.',
          automatedEvidenceFrequency: 'Daily policy signature verification'
        },
        {
          framework: 'SOC 2 Type II',
          controlCode: 'CC6.1 to CC6.8',
          title: 'Logical and Physical Access Controls',
          howServiceSatisfies: 'Inspects user provisioning, password complexity, MFA enforcement, and access termination across all identity providers.',
          automatedEvidenceFrequency: 'Continuous real-time webhook sync'
        },
        {
          framework: 'HIPAA Security Rule',
          controlCode: '§164.308, §164.310, §164.312',
          title: 'Administrative, Physical & Technical Safeguards',
          howServiceSatisfies: 'Validates workstation encryption, session auto-lockouts, BAA (Business Associate Agreement) repository, and access auditing.',
          automatedEvidenceFrequency: 'Continuous daily health checks'
        },
        {
          framework: 'PCI-DSS v4.0',
          controlCode: 'Req 1, 2, 7, 8, 12',
          title: 'Network Security, Access Controls & Policies',
          howServiceSatisfies: 'Verifies network segmentation firewalls, unique administrative IDs, multi-factor authentication, and annual policy reviews.',
          automatedEvidenceFrequency: 'Continuous automated tests'
        }
      ],
      auditReadinessBenefit: 'Auditors receive direct, read-only access to a cryptographic Evidence Room, cutting audit duration from 6 weeks to 3 days.'
    },
    keyFeatures: [
      {
        title: '85+ Pre-Built Evidence Connectors',
        description: 'Automated read-only integrations with AWS, Azure, GCP, GitHub, GitLab, Okta, Google Workspace, Jira, Jamf, and Datadog.',
        technicalSpec: 'Zero-agent OAuth / IAM role connections; cryptographically signed evidence payloads with SHA-256 hashes.',
        metricLabel: 'Connectors',
        metricValue: '85+ Platforms'
      },
      {
        title: 'Multi-Framework Control Crosswalk',
        description: 'Single-source evidence mapping satisfies controls across ISO 27001, SOC 2, NIST CSF 2.0, HIPAA, GDPR, and PCI-DSS automatically.',
        technicalSpec: 'Unified schema linking 1,200+ global security control requirements into 140 operational tests.',
        metricLabel: 'Crosswalk Efficiency',
        metricValue: '5x Multiplier'
      },
      {
        title: 'Policy Lifecycle & Signature Engine',
        description: '24+ pre-written, auditor-approved security policy templates with automated annual employee acknowledgment workflows.',
        technicalSpec: 'Automates policy versioning, employee Slack/email distribution, and compliance attestation tracking.',
        metricLabel: 'Policy Templates',
        metricValue: '24 Auditor-Ready'
      },
      {
        title: 'Auditor Collaboration Portal',
        description: 'Secure, dedicated workspace for third-party CPA auditors to inspect continuous evidence, download reports, and sign off.',
        technicalSpec: 'Role-based auditor access with granular view-only permissions and timestamped download audit trails.',
        metricLabel: 'Audit Prep Time',
        metricValue: 'Cut by 80%'
      }
    ],
    keyBenefits: [
      {
        title: 'Eliminates 90% of Misconfiguration Threats',
        description: 'Continuous validation prevents dangerous security regressions, such as accidentally opened ports or disabled MFA.',
        impactMetric: 'Zero Drift',
        category: 'Threat Mitigation'
      },
      {
        title: 'Year-Round Continuous Audit Readiness',
        description: 'No more panic weeks before the audit. Evidence is continuously collected, tested, and archived 365 days a year.',
        impactMetric: '100% Up-to-Date',
        category: 'Compliance & Governance'
      },
      {
        title: 'Saves 350+ Engineering Hours Per Year',
        description: 'Developers and DevOps engineers no longer spend weeks taking manual screenshots or digging through server logs for auditors.',
        impactMetric: '350+ Hours',
        category: 'Cost & Efficiency'
      }
    ],
    deliverables: [
      'Turnkey Continuous GRC Dashboard with Live Control Health Meters',
      'Automated Evidence Collector across AWS, Azure, GCP, Okta, and GitHub',
      'Complete Suite of 24+ Auditor-Vetted Security & Privacy Policies',
      'Auditor-Ready Digital Evidence Room with Role-Based Access Controls',
      'Quarterly Gap Analysis & Continuous SOC 2 / ISO 27001 Readiness Certificate'
    ]
  },
  {
    id: 'incident-response',
    slug: 'incident-response',
    title: 'Autonomous Incident Response & SOAR Playbooks',
    tagline: 'Sub-second adversary containment, automated forensic preservation, and regulatory notification orchestration.',
    badge: 'Rapid Containment & SOAR',
    summary: 'When an active breach occurs, every second determines survival. Autonomous SOAR playbooks isolate infected endpoints, invalidate compromised cloud credentials, and preserve forensic artifacts in under 300 milliseconds.',
    fullDescription: 'Our Incident Response service unites lightning-fast autonomous automation with elite human cyber crisis specialists. CyberSurety’s Security Orchestration, Automation, and Response (SOAR) engine triggers pre-approved containment workflows the instant high-confidence threats are identified. From revoking stolen IAM session keys to severing compromised VPC network interfaces, our platform halts attacks in their tracks while maintaining strict chain-of-custody forensic snapshots and ensuring compliance with regulatory breach disclosure deadlines.',
    sla: 'Sub-300ms Automated Blast Radius Isolation • 15-Minute Human Retainer SLA',
    threatMitigation: {
      coreObjective: 'Compress containment timelines from hours to milliseconds, preventing catastrophic data loss and extortion.',
      howItMitigatesThreats: 'Adversaries rely on the delay between initial detection and human decision-making to execute data destruction or exfiltration. CyberSurety removes this vulnerability by executing automated containment workflows directly at the network, identity, and process layers. Stolen credentials are neutralized in 600ms; infected VMs are quarantined in 240ms; high-entropy disk encryption threads are killed in 84ms, neutralising attacks before any business disruption occurs.',
      preventedAttackVectors: [
        {
          vector: 'Active Ransomware Subnet Propagation',
          mitreId: 'T1021.002',
          mitigationMechanism: 'Isolates VPC security groups, drops all SMB/RPC ingress, and triggers automated instant VM memory dumps for forensics.'
        },
        {
          vector: 'Compromised CI/CD Runner / Cloud Admin Key Exfiltration',
          mitreId: 'T1550.001',
          mitigationMechanism: 'Instantly revokes AWS/GCP service account access keys, forces sign-out on all active sessions, and rotates repository secrets.'
        },
        {
          vector: 'High-Velocity Data Staging & Mega-Exfiltration',
          mitreId: 'T1567.002',
          mitigationMechanism: 'Applies automated egress firewall rate-limiting, severing outbound TLS sessions to known malicious adversary C2 IP pools.'
        },
        {
          vector: 'Adversary Persistence & Backdoor Creation',
          mitreId: 'T1098',
          mitigationMechanism: 'Detects unauthorized administrative user creations, immediately deactivating the rogue accounts and rolling back IAM policies.'
        }
      ],
      mttdMttrImpact: 'Shrinks breach containment duration from the industry average of 73 days to under 1 second (average 280 milliseconds).'
    },
    complianceAssurance: {
      coreObjective: 'Strict adherence to statutory breach notification windows and digital forensics evidence integrity.',
      howItEnsuresCompliance: 'Modern regulations enforce severe financial penalties for delayed or undocumented incident disclosures. GDPR Article 33 requires notification within 72 hours; the SEC mandates Form 8-K disclosure within 4 business days of determining materiality; HIPAA demands breach notification within 60 days. CyberSurety automates regulatory notification clocks, logs every remediation action with millisecond timestamps, and preserves immutable chain-of-custody records for law enforcement and regulators.',
      keyControls: [
        {
          framework: 'NIST CSF 2.0',
          controlCode: 'RS.MA, RS.AN, RS.CO',
          title: 'Incident Management, Analysis & Communication',
          howServiceSatisfies: 'Executes tested Incident Response Plans (IRP), determines incident impact, and coordinates internal/external communications.',
          automatedEvidenceFrequency: 'Real-time incident event logs'
        },
        {
          framework: 'ISO/IEC 27001:2022',
          controlCode: 'A.16.1.1 to A.16.1.7',
          title: 'Information Security Incident Management',
          howServiceSatisfies: 'Formalized incident reporting, forensic evidence collection, assessment, and post-incident root-cause review workflows.',
          automatedEvidenceFrequency: 'Automated forensic archive bundling'
        },
        {
          framework: 'GDPR',
          controlCode: 'Article 33 & 34',
          title: '72-Hour Data Breach Notification to Supervisory Authority',
          howServiceSatisfies: 'Built-in 72-hour countdown timer, automated affected EU citizen record count generation, and pre-formatted DPA notification templates.',
          automatedEvidenceFrequency: 'Timestamped regulatory clock trigger'
        },
        {
          framework: 'HIPAA Security Rule',
          controlCode: '§164.308(a)(6)',
          title: 'Security Incident Procedures & Breach Notification',
          howServiceSatisfies: 'Documents security incidents and outcomes, identifying whether unauthorized acquisition of unencrypted ePHI occurred.',
          automatedEvidenceFrequency: 'Tamper-proof incident audit logs'
        },
        {
          framework: 'SOC 2 Type II',
          controlCode: 'CC7.3 & CC7.4',
          title: 'Incident Evaluation & Corrective Action Execution',
          howServiceSatisfies: 'Verifies rapid containment, post-incident remediation, and automated policy updates preventing identical recurrence.',
          automatedEvidenceFrequency: 'Post-mortem incident reports'
        }
      ],
      auditReadinessBenefit: 'Zero guesswork during regulatory inquiries. Delivers a complete, timestamped digital dossier proving swift, compliant response.'
    },
    keyFeatures: [
      {
        title: 'Sub-Second SOAR Playbook Runner',
        description: 'Automated, deterministic response actions executing across network, cloud IAM, operating system, and SaaS layers.',
        technicalSpec: 'Executes parallel mitigation tasks across cloud providers with an average latency of 280 milliseconds.',
        metricLabel: 'Containment Speed',
        metricValue: '<300ms'
      },
      {
        title: 'Cryptographic Forensics Preservation',
        description: 'Takes instant memory dumps, network PCAP captures, and disk snapshots, hashing them with SHA-256 to guarantee legal admissibility.',
        technicalSpec: 'Air-gapped WORM storage writes with RFC 3161 cryptographic timestamping.',
        metricLabel: 'Evidence Integrity',
        metricValue: 'SHA-256 Hashed'
      },
      {
        title: 'Regulatory Notification Clock & Dashboard',
        description: 'Real-time timers tracking legal disclosure windows for GDPR (72h), SEC (4 days), HIPAA (60 days), and state data breach statutes.',
        technicalSpec: 'Pre-populated legal breach notification templates cross-referenced with estimated affected record counts.',
        metricLabel: 'Regulatory Tracking',
        metricValue: 'GDPR / SEC / HIPAA'
      },
      {
        title: 'Post-Mortem Root Cause & Policy Fortification',
        description: 'Deconstructs adversary tactics post-incident and auto-generates proactive preventive rules to permanently block recurrence.',
        technicalSpec: 'Generates automated MITRE ATT&CK mitigation mappings and Terraform security policy updates.',
        metricLabel: 'Recurrence Prevention',
        metricValue: '100% Policy Update'
      }
    ],
    keyBenefits: [
      {
        title: 'Total Blast Radius Minimization',
        description: 'Autonomous micro-isolation stops breaches at the infected single node or user level, protecting core databases and production clusters.',
        impactMetric: '99.7% Contained',
        category: 'Threat Mitigation'
      },
      {
        title: 'Shield Against Regulatory Fines',
        description: 'Strict adherence to disclosure timelines and forensic evidence collection protects clients from devastating GDPR and SEC penalties.',
        impactMetric: '$0 Penalties',
        category: 'Compliance & Governance'
      },
      {
        title: 'Saves Millions in Ransom & Downtime',
        description: 'Preventing mass encryption and catastrophic operational outages avoids the average $4.45M global cost of a data breach.',
        impactMetric: '$4.45M Saved',
        category: 'Cost & Efficiency'
      }
    ],
    deliverables: [
      'Turnkey Automated SOAR Response Engine with 12 Pre-Configured Playbooks',
      'Emergency 24/7 Incident Retainer with 15-Minute Guaranteed SLA',
      'Automated Digital Forensics Toolkit & Immutable Chain-of-Custody Vault',
      'Regulatory Disclosure War Room with GDPR (72h) and SEC Timers',
      'Executive Post-Incident Forensic Root Cause Dossier & Corrective Plan'
    ]
  }
];
