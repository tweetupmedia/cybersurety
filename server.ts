import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

let aiClient: GoogleGenAI | null = null;
function getAIClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({
      status: "ok",
      service: "CyberSurety Security & GRC Engine",
      timestamp: new Date().toISOString(),
      aiConfigured: Boolean(process.env.GEMINI_API_KEY),
    });
  });

// In-memory LRU cache for threat analysis to avoid duplicate API calls and handle high demand
const analysisCache = new Map<string, any>();
const MAX_CACHE_SIZE = 100;

function getCacheKey(scenario: string, framework: string, alertType?: string): string {
  return `${framework.toLowerCase()}::${(alertType || '').toLowerCase()}::${scenario.trim().toLowerCase()}`;
}

async function queryGeminiModel(
  client: GoogleGenAI,
  modelName: string,
  prompt: string,
  timeoutMs: number
): Promise<any> {
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error(`Timeout after ${timeoutMs}ms`)), timeoutMs)
  );

  const apiCall = client.models.generateContent({
    model: modelName,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      temperature: 0.2,
    },
  });

  const response: any = await Promise.race([apiCall, timeoutPromise]);
  const rawText = (response.text || "").trim();
  
  // Clean markdown json fences if present
  const cleaned = rawText.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "");
  return JSON.parse(cleaned);
}

// AI Security Analyst Endpoint
app.post("/api/threat/analyze", async (req, res) => {
  const { scenario, alertType, framework = "NIST CSF 2.0" } = req.body || {};

  if (!scenario || typeof scenario !== "string") {
    return res.status(400).json({ error: "Missing or invalid scenario prompt" });
  }

  const cacheKey = getCacheKey(scenario, framework, alertType);
  if (analysisCache.has(cacheKey)) {
    return res.json({ 
      success: true, 
      data: analysisCache.get(cacheKey), 
      source: "cybersurety-cache" 
    });
  }

  const client = getAIClient();

  if (client) {
    const prompt = `You are CyberSurety's elite Autonomous Cyber Security & GRC AI Analyst.
Analyze this cybersecurity incident / compliance scenario:
"${scenario}"

Alert Type Context: ${alertType || "Unknown Threat Vector"}
Target Compliance Framework: ${framework}

Respond in strict, valid JSON with this exact structure:
{
  "incidentName": "concise name of incident",
  "threatActorType": "APT / Ransomware Syndicate / Insider / Automated Botnet / Script Kiddie",
  "severity": "CRITICAL" | "HIGH" | "MEDIUM" | "LOW",
  "mitreAttack": [
    { "id": "T1078", "name": "Valid Accounts", "phase": "Defense Evasion" }
  ],
  "technicalSummary": "2-3 sentences explaining exact attack mechanics and vulnerabilities leveraged",
  "blastRadius": "Description of affected network segments, cloud services, and assets",
  "mitigationPlaybook": [
    { "step": 1, "action": "Immediate containment command or isolation rule", "automated": true, "duration": "< 500ms" },
    { "step": 2, "action": "Credential rotation & token revocation", "automated": true, "duration": "1.2s" },
    { "step": 3, "action": "Firewall / WAF virtual patching rule deployment", "automated": true, "duration": "2.4s" },
    { "step": 4, "action": "Forensic log snapshot & cold storage capture", "automated": false, "duration": "1m" }
  ],
  "complianceImpact": {
    "framework": "${framework}",
    "affectedControls": ["NIST CSF DE.CM-1", "ISO 27001 A.12.4", "SOC 2 CC7.2"],
    "penaltyRisk": "High / Medium / Low",
    "requiredNotificationWindow": "e.g., 72 hours under GDPR Article 33"
  },
  "recoveryRecommendation": "Clear, actionable recommendation to prevent recurrence based on NIST CSF Recover pillar"
}
Output only the JSON object, no Markdown code blocks or wrapping text.`;

    // Attempt 1: gemini-3.8-flash with 15s timeout
    try {
      const parsed = await queryGeminiModel(client, "gemini-3.8-flash", prompt, 15000);
      if (parsed && parsed.incidentName) {
        if (analysisCache.size >= MAX_CACHE_SIZE) analysisCache.clear();
        analysisCache.set(cacheKey, parsed);
        return res.json({ success: true, data: parsed, source: "gemini-3.8-flash" });
      }
    } catch {
      // If primary model is unavailable or spikes (503/timeout), attempt fast-lane model gemini-3.1-flash-lite
      try {
        const liteParsed = await queryGeminiModel(client, "gemini-3.1-flash-lite", prompt, 10000);
        if (liteParsed && liteParsed.incidentName) {
          if (analysisCache.size >= MAX_CACHE_SIZE) analysisCache.clear();
          analysisCache.set(cacheKey, liteParsed);
          return res.json({ success: true, data: liteParsed, source: "gemini-3.1-flash-lite" });
        }
      } catch {
        // Graceful switchover to heuristics engine
      }
    }
  }

  // Fallback deterministic analysis engine if Gemini key not yet attached or during transient upstream spikes
  const fallbackAnalysis = generateDeterministicTriage(scenario, alertType, framework);
  if (analysisCache.size >= MAX_CACHE_SIZE) analysisCache.clear();
  analysisCache.set(cacheKey, fallbackAnalysis);
  return res.json({ success: true, data: fallbackAnalysis, source: "cybersurety-heuristics-engine" });
});

  // Vite middleware in dev or static files in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`CyberSurety security server listening on http://0.0.0.0:${PORT}`);
  });
}

function generateDeterministicTriage(scenario: string, alertType?: string, framework = "NIST CSF 2.0") {
  const lower = scenario.toLowerCase();
  const isRansomware = lower.includes("ransom") || lower.includes("encrypt") || lower.includes("lateral");
  const isCredential = lower.includes("credential") || lower.includes("mfa") || lower.includes("login") || lower.includes("iam");
  const isDataExfil = lower.includes("exfil") || lower.includes("leak") || lower.includes("dns") || lower.includes("pii") || lower.includes("s3");

  if (isRansomware) {
    return {
      incidentName: "Subnet Lateral Propagation & Shadow Volume Tampering",
      threatActorType: "Financially Motivated Ransomware Syndicate",
      severity: "CRITICAL",
      mitreAttack: [
        { id: "T1486", name: "Data Encrypted for Impact", phase: "Impact" },
        { id: "T1021.002", name: "SMB/Windows Admin Shares", phase: "Lateral Movement" },
        { id: "T1490", name: "Inhibit System Recovery", phase: "Impact" },
      ],
      technicalSummary: "Adversary initiated automated lateral movement leveraging compromised local service account tokens. eBPF sensors intercepted anomalous mass file renaming and attempted deletion of Volume Shadow Copies.",
      blastRadius: "VPC Subnet 10.0.4.0/24 (3 Application Servers, 1 Read Replica DB)",
      mitigationPlaybook: [
        { step: 1, action: "Autonomous eBPF process SIGKILL on high-entropy disk write threads", automated: true, duration: "84ms" },
        { step: 2, action: "Isolate VPC network security groups & drop all SMB/RPC ingress", automated: true, duration: "240ms" },
        { step: 3, action: "Lock compromised IAM service principal and invalidate active STS tokens", automated: true, duration: "610ms" },
        { step: 4, action: "Trigger snapshot replication to immutable, air-gapped WORM storage", automated: true, duration: "3.2s" },
      ],
      complianceImpact: {
        framework,
        affectedControls: ["NIST CSF PR.DS-1", "ISO 27001 A.12.1.2", "HIPAA §164.308(a)(7)(ii)(E)"],
        penaltyRisk: "Critical",
        requiredNotificationWindow: "Immediate containment required; 72h notification to regulators if uncontained",
      },
      recoveryRecommendation: "Verify integrity of air-gapped immutable backup snapshots. Rebuild infected nodes from gold hardened AMI with strict micro-segmentation rules.",
    };
  }

  if (isCredential) {
    return {
      incidentName: "Cloud Identity Privilege Escalation & Session Hijack",
      threatActorType: "Targeted Credential Broker / Espionage Actor",
      severity: "HIGH",
      mitreAttack: [
        { id: "T1078.004", name: "Cloud Accounts", phase: "Defense Evasion" },
        { id: "T1098", name: "Account Manipulation", phase: "Persistence" },
        { id: "T1548", name: "Abuse Elevation Control", phase: "Privilege Escalation" },
      ],
      technicalSummary: "Anomalous authentication detected from disparate geographical ASN within 4 minutes of legitimate token issuance. Attacker attempted inline policy attachment granting AdministratorAccess.",
      blastRadius: "Primary Cloud Tenant IAM role (CloudOps-Engineering-Lead)",
      mitigationPlaybook: [
        { step: 1, action: "Revoke all active IAM STS credentials and refresh Okta user session", automated: true, duration: "120ms" },
        { step: 2, action: "Detach inline AdministratorAccess IAM policy and restore baseline permissions", automated: true, duration: "310ms" },
        { step: 3, action: "Enforce hardware security key (FIDO2/WebAuthn) re-registration", automated: true, duration: "1.5s" },
        { step: 4, action: "Trigger SOC alert and initiate cloud audit trail delta comparison", automated: false, duration: "45s" },
      ],
      complianceImpact: {
        framework,
        affectedControls: ["NIST CSF PR.AC-1", "SOC 2 CC6.1", "ISO 27001 A.9.4.2"],
        penaltyRisk: "Medium-High",
        requiredNotificationWindow: "Internal audit review required within 24h",
      },
      recoveryRecommendation: "Mandate hardware security tokens for all elevated roles. Implement ephemeral zero-standing-privilege access with automated 1-hour expiration.",
    };
  }

  if (isDataExfil) {
    return {
      incidentName: "Covert DNS Tunneling & Sensitive PII Egress",
      threatActorType: "Advanced Threat Group / Supply Chain Insider",
      severity: "CRITICAL",
      mitreAttack: [
        { id: "T1071.004", name: "DNS Application Layer Protocol", phase: "Command and Control" },
        { id: "T1048.003", name: "Exfiltration Over Unencrypted Non-C2 Protocol", phase: "Exfiltration" },
        { id: "T1005", name: "Data from Local System", phase: "Collection" },
      ],
      technicalSummary: "Inspection of resolver logs revealed high-frequency Base32-encoded subdomain lookups directed to attacker-controlled authoritative name servers, packaging sensitive customer database records.",
      blastRadius: "Production Ingress Gateway & Customer Analytics microservice",
      mitigationPlaybook: [
        { step: 1, action: "Apply immediate DNS sinkhole on domain wildcards via upstream protective resolver", automated: true, duration: "92ms" },
        { step: 2, action: "Quarantine source container pod and restrict egress routing table", automated: true, duration: "180ms" },
        { step: 3, action: "Rotate production database credentials and enable TLS certificate pinning", automated: true, duration: "850ms" },
        { step: 4, action: "Initiate PII record forensics to quantify breach scope", automated: false, duration: "2m" },
      ],
      complianceImpact: {
        framework,
        affectedControls: ["GDPR Article 32/33", "HIPAA §164.312(e)(1)", "NIST CSF PR.DS-5"],
        penaltyRisk: "Critical - Potential regulatory sanctions",
        requiredNotificationWindow: "72 hours to Supervisory Authority under GDPR Art. 33",
      },
      recoveryRecommendation: "Implement strict outbound DNS filtering with Domain Reputation scoring. Enforce egress traffic inspection and tokenized database column encryption.",
    };
  }

  // Default
  return {
    incidentName: "Unauthorized Perimeter Probe & Vulnerability Scan",
    threatActorType: "Automated Reconnaissance Infrastructure",
    severity: "MEDIUM",
    mitreAttack: [
      { id: "T1595.002", name: "Vulnerability Scanning", phase: "Reconnaissance" },
      { id: "T1190", name: "Exploit Public-Facing Application", phase: "Initial Access" },
    ],
    technicalSummary: "Edge Web Application Firewall detected high-velocity fuzzing targeting legacy API endpoints with known CVE-2025/2026 signatures.",
    blastRadius: "External Load Balancer IP & Public DMZ VIP",
    mitigationPlaybook: [
      { step: 1, action: "Deploy dynamic WAF rate-limiting and ASN blocking rule", automated: true, duration: "45ms" },
      { step: 2, action: "Apply zero-day virtual patch at CDN edge", automated: true, duration: "190ms" },
      { step: 3, action: "Trigger continuous external attack surface scan (EASM)", automated: true, duration: "1.2s" },
    ],
    complianceImpact: {
      framework,
      affectedControls: ["NIST CSF DE.CM-8", "PCI-DSS 11.2", "ISO 27001 A.12.6.1"],
      penaltyRisk: "Low",
      requiredNotificationWindow: "Standard monthly audit log retention",
    },
    recoveryRecommendation: "Ensure all external endpoints have automated virtual patching enabled and conduct quarterly third-party penetration testing.",
  };
}

startServer();
