import { GoogleGenAI } from '@google/genai';
import { GuidanceResponse } from '../../src/types/legal';
import { getFallbackGuidance } from './guidanceEngine';

const SYSTEM_INSTRUCTION = `You are a legal information and navigation assistant for the NyayaPath platform.

Help users understand:
- the possible legal area
- potentially relevant rights
- possible legal routes
- where they may seek appropriate help (authority / jurisdiction)
- relevant documents / evidence checklist
- possible next steps

CRITICAL SAFETY & QUALITY RULES:
1. Do not provide guaranteed legal outcomes.
2. Do not claim to be a lawyer or provide legal representation.
3. Do not invent laws, legal provisions, fake case citations, authorities or fake contact details.
4. If authority contact details are not verified public knowledge, explicitly set "isDemoData": true and label address/phone as "DEMO AUTHORITY DATA".
5. Use cautious language such as: "may apply", "potentially relevant", "possible route", "depending on the facts".
6. Return ONLY a valid JSON object matching the exact schema specified. No markdown formatting outside of JSON.`;

let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

export async function generateLegalGuidance(
  userQuery: string,
  previousContext?: GuidanceResponse
): Promise<{ data: GuidanceResponse; source: 'gemini' | 'fallback' }> {
  const ai = getAiClient();

  if (!ai) {
    console.log('[NyayaPath Engine] No active Gemini API key found, using fallback guidance engine.');
    return {
      data: getFallbackGuidance(userQuery, previousContext),
      source: 'fallback',
    };
  }

  try {
    const prompt = `Analyze this user query and provide comprehensive legal navigation:
User query: "${userQuery}"

${
  previousContext
    ? `Previous context: The user previously discussed the legal area "${previousContext.possibleArea}" with summary: "${previousContext.summary}".`
    : ''
}

Return a single JSON object with this exact structure:
{
  "possibleArea": "Specific Legal Area (e.g. Cyber Crime / Online Financial Fraud)",
  "category": "Cyber Crime | Consumer | Employment | Property | Business | Privacy | Family | General",
  "summary": "Clear, concise 2-3 sentence overview of the issue and what the user is facing in simple language.",
  "whatThisMayInvolve": "Plain-language explanation of what legal or statutory concepts this touches.",
  "rights": [
    {
      "id": "r-1",
      "title": "Title of the right",
      "category": "Cyber Crime | Consumer | Employment | Property | Business | Privacy | Family | General",
      "simpleMeaning": "What this right means in plain English",
      "whenApplies": "Circumstances under which it may apply",
      "reference": "Statute or circular name",
      "keyPoints": ["Key point 1", "Key point 2"]
    }
  ],
  "routes": [
    {
      "id": "rt-1",
      "title": "Route name",
      "type": "Informal / Direct | Regulatory / Grievance | Mediation / Conciliation | Formal Legal Action",
      "description": "What happens in this route",
      "timeframe": "Estimated timeframe",
      "costIndicator": "Low / Free | Moderate | Varies | Court Fee Applicable",
      "suitability": "When to choose this route",
      "recommendedFirst": true
    }
  ],
  "routeJourney": {
    "situation": "Brief summary of user situation",
    "legalArea": "Category and focus area",
    "recommendedRoute": "Recommended primary path",
    "authorityForum": "Primary authority or forum name",
    "primaryDocuments": ["Doc 1", "Doc 2"],
    "immediateNextStep": "One urgent priority step"
  },
  "authority": {
    "id": "auth-1",
    "name": "Official Authority or Forum Name",
    "category": "Matching category",
    "handles": "What types of disputes it handles",
    "reason": "Why it is relevant here",
    "jurisdiction": "Territorial or subject matter jurisdiction",
    "state": "National or State",
    "city": "District / City",
    "address": "Official address or 'DEMO AUTHORITY DATA'",
    "officialPhone": "Helpline number or 'DEMO AUTHORITY DATA'",
    "officialEmail": "Official email or 'DEMO AUTHORITY DATA'",
    "officialWebsite": "Official government or tribunal website URL",
    "onlineFilingUrl": "Online complaint portal URL",
    "isDemoData": false
  },
  "documents": [
    {
      "id": "doc-1",
      "name": "Name of document / evidence",
      "purpose": "Why this document is vital",
      "required": true,
      "exampleOrTip": "Practical tip"
    }
  ],
  "timeline": [
    {
      "stage": 1,
      "title": "Stage Name",
      "timeframe": "Timeframe",
      "description": "What takes place",
      "keyAction": "Key step user must take"
    }
  ],
  "nextSteps": [
    "Immediate step 1",
    "Step 2",
    "Step 3"
  ],
  "sources": [
    "Statute, circular, or regulatory code"
  ],
  "disclaimer": "NyayaPath provides legal information and navigation support. It does not replace qualified legal advice, legal representation, or professional judgment.",
  "relevantSectionExplainer": {
    "provision": "Key statutory section or legal rule",
    "simpleMeaning": "Plain English meaning",
    "whenApplies": "When it applies",
    "example": "Practical real-world scenario",
    "relatedLegalArea": "Area of law",
    "sourceReference": "Act name"
  }
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: 'application/json',
      },
    });

    const text = response.text?.trim() || '';
    const parsed = JSON.parse(text);

    // Validate essential keys
    if (parsed.possibleArea && parsed.summary && Array.isArray(parsed.routes)) {
      const guidance: GuidanceResponse = {
        id: `guidance-gemini-${Date.now()}`,
        timestamp: Date.now(),
        userQuery,
        possibleArea: parsed.possibleArea,
        category: parsed.category || 'General',
        summary: parsed.summary,
        whatThisMayInvolve: parsed.whatThisMayInvolve || parsed.summary,
        rights: Array.isArray(parsed.rights) ? parsed.rights : [],
        routes: parsed.routes,
        routeJourney: parsed.routeJourney,
        authority: parsed.authority || {
          id: 'auth-default',
          name: 'District Legal Services Authority',
          category: 'General',
          handles: 'Legal counseling and pre-litigation assistance',
          reason: 'Provides accessible legal navigation for disputed matters.',
          jurisdiction: 'Local District Court Premises',
          address: 'District Court Complex (DEMO AUTHORITY DATA)',
          officialPhone: '15100',
          officialWebsite: 'https://nalsa.gov.in',
          isDemoData: true,
        },
        documents: Array.isArray(parsed.documents) ? parsed.documents : [],
        timeline: Array.isArray(parsed.timeline) ? parsed.timeline : [],
        nextSteps: Array.isArray(parsed.nextSteps) ? parsed.nextSteps : [],
        sources: Array.isArray(parsed.sources) ? parsed.sources : ['Statutory Legal Framework'],
        disclaimer:
          parsed.disclaimer ||
          'NyayaPath provides legal information and navigation support. It does not replace qualified legal advice, legal representation, or professional judgment.',
        relevantSectionExplainer: parsed.relevantSectionExplainer,
      };

      return { data: guidance, source: 'gemini' };
    } else {
      console.warn('[Gemini] Response did not conform to schema, using fallback.');
      return {
        data: getFallbackGuidance(userQuery, previousContext),
        source: 'fallback',
      };
    }
  } catch (error) {
    console.error('[Gemini Service Error]:', error);
    return {
      data: getFallbackGuidance(userQuery, previousContext),
      source: 'fallback',
    };
  }
}

export async function generateMultimodalLegalGuidance(
  imageBase64: string,
  mimeType: string,
  userPrompt: string
): Promise<{ data: GuidanceResponse; source: 'gemini' | 'fallback' }> {
  const ai = getAiClient();

  if (!ai) {
    console.log('[Multimodal] No API key, using fallback for image upload.');
    return {
      data: getFallbackGuidance(userPrompt || 'I have a document or notice to review.'),
      source: 'fallback',
    };
  }

  try {
    const cleanBase64 = imageBase64.includes(',') ? imageBase64.split(',')[1] : imageBase64;

    const prompt = `Carefully review this uploaded legal document, notice, agreement, receipt, or communication.
User note or question: "${userPrompt || 'Explain what this document means, my rights, and my next steps.'}"

Identify:
1. What kind of legal document or dispute this appears to be.
2. The possible legal area.
3. Plain English summary of what it states.
4. Potentially relevant rights.
5. Possible routes forward.
6. Relevant authority or forum.
7. Crucial evidence/documents needed.
8. Chronological timeline.
9. Immediate next steps.

Return ONLY a structured JSON response matching the NyayaPath schema.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType || 'image/jpeg',
              data: cleanBase64,
            },
          },
          { text: prompt },
        ],
      },
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: 'application/json',
      },
    });

    const text = response.text?.trim() || '';
    const parsed = JSON.parse(text);

    if (parsed.possibleArea && parsed.summary) {
      const guidance: GuidanceResponse = {
        id: `guidance-img-${Date.now()}`,
        timestamp: Date.now(),
        userQuery: userPrompt || 'Uploaded document / image review',
        possibleArea: parsed.possibleArea,
        category: parsed.category || 'General',
        summary: parsed.summary,
        whatThisMayInvolve: parsed.whatThisMayInvolve || parsed.summary,
        rights: Array.isArray(parsed.rights) ? parsed.rights : [],
        routes: Array.isArray(parsed.routes) ? parsed.routes : [],
        routeJourney: parsed.routeJourney,
        authority: parsed.authority || {
          id: 'auth-default',
          name: 'District Legal Services Authority',
          category: 'General',
          handles: 'Document review and pre-litigation assistance',
          reason: 'First point of legal counseling.',
          jurisdiction: 'Local District Court Premises',
          address: 'District Court Complex (DEMO AUTHORITY DATA)',
          isDemoData: true,
        },
        documents: Array.isArray(parsed.documents) ? parsed.documents : [],
        timeline: Array.isArray(parsed.timeline) ? parsed.timeline : [],
        nextSteps: Array.isArray(parsed.nextSteps) ? parsed.nextSteps : [],
        sources: Array.isArray(parsed.sources) ? parsed.sources : ['Legal Reference Standards'],
        disclaimer:
          'NyayaPath provides legal information and navigation support. It does not replace qualified legal advice, legal representation, or professional judgment.',
        relevantSectionExplainer: parsed.relevantSectionExplainer,
      };

      return { data: guidance, source: 'gemini' };
    } else {
      return {
        data: getFallbackGuidance(userPrompt || 'I received a legal notice'),
        source: 'fallback',
      };
    }
  } catch (err) {
    console.error('[Gemini Multimodal Error]:', err);
    return {
      data: getFallbackGuidance(userPrompt || 'I received a legal notice'),
      source: 'fallback',
    };
  }
}
