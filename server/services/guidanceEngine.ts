import { GuidanceResponse } from '../../src/types/legal';
import { DEMO_SCENARIOS, DEMO_RIGHTS, DEMO_AUTHORITIES } from '../data/demoData';

export function getFallbackGuidance(userQuery: string, previousContext?: GuidanceResponse): GuidanceResponse {
  const normalized = userQuery.toLowerCase().trim();

  // If this is a follow-up query and we have previous context, build a specialized follow-up response!
  if (previousContext) {
    if (normalized.includes('right') || normalized.includes('explain my right')) {
      return {
        ...previousContext,
        id: `followup-rights-${Date.now()}`,
        timestamp: Date.now(),
        userQuery,
        summary: `Here is a deeper breakdown of your key rights regarding ${previousContext.possibleArea}. These statutory rights protect your interests and define what the opposing party can and cannot legally do.`,
        nextSteps: [
          `Review the statutory reference cited for each right (${previousContext.rights.map(r => r.title).join(', ')}).`,
          'Check whether your situation meets the prerequisites listed in "When this may apply".',
          'Ensure your communication with the other party references these rights objectively without aggression.'
        ]
      };
    }

    if (normalized.includes('where') || normalized.includes('authority') || normalized.includes('jurisdiction') || normalized.includes('go')) {
      return {
        ...previousContext,
        id: `followup-authority-${Date.now()}`,
        timestamp: Date.now(),
        userQuery,
        summary: `For your matter involving ${previousContext.possibleArea}, the primary designated authority is ${previousContext.authority.name}. Below are their jurisdictional remit, official portals, and filing instructions.`,
        nextSteps: [
          `Verify that your physical location or transaction origin falls within ${previousContext.authority.jurisdiction}.`,
          `Check whether an online filing route is available on ${previousContext.authority.officialWebsite || 'the official portal'}.`,
          'Prepare your primary documents before initiating your formal complaint ticket.'
        ]
      };
    }

    if (normalized.includes('document') || normalized.includes('evidence') || normalized.includes('proof')) {
      return {
        ...previousContext,
        id: `followup-docs-${Date.now()}`,
        timestamp: Date.now(),
        userQuery,
        summary: `Documentary evidence forms the bedrock of any formal or informal legal resolution. For ${previousContext.possibleArea}, prioritize contemporaneous and tamper-proof records.`,
        nextSteps: [
          'Create a dedicated folder (digital and printed) for all items in the Document Checklist.',
          'Never hand over original documents to the other party; provide certified or self-attested photocopies/PDFs.',
          'Note down the chronological timeline of dates corresponding to each document.'
        ]
      };
    }

    if (normalized.includes('first') || normalized.includes('next step') || normalized.includes('what should i do')) {
      return {
        ...previousContext,
        id: `followup-first-${Date.now()}`,
        timestamp: Date.now(),
        userQuery,
        summary: `Here is your prioritized, step-by-step immediate action plan for your situation:`,
        nextSteps: [
          `Step 1: Secure all digital and physical evidence immediately (${previousContext.documents[0]?.name || 'transaction proofs'}).`,
          `Step 2: Take immediate mitigating action (${previousContext.timeline[0]?.keyAction || 'notify concerned party in writing'}).`,
          `Step 3: If not resolved within the initial window, prepare formal escalation to ${previousContext.authority.name}.`
        ]
      };
    }

    if (normalized.includes('section') || normalized.includes('law explain') || normalized.includes('provision')) {
      return {
        ...previousContext,
        id: `followup-section-${Date.now()}`,
        timestamp: Date.now(),
        userQuery,
        summary: `Here is an explanation of the primary statutory provision applicable to ${previousContext.possibleArea}:`,
        relevantSectionExplainer: previousContext.relevantSectionExplainer || {
          provision: 'Statutory Protection Framework',
          simpleMeaning: 'The relevant statutory law mandates good faith dealing, timely performance, and strict penalties for unilateral default.',
          whenApplies: 'Applies upon demonstrable breach of agreed terms or statutory rights.',
          example: 'An entity refuses to honor written terms or attempts arbitrary forfeiture.',
          relatedLegalArea: previousContext.possibleArea,
          sourceReference: previousContext.sources[0] || 'Applicable Statutory Code'
        }
      };
    }
  }

  // Match based on primary scenarios
  if (
    normalized.includes('fraud') ||
    normalized.includes('scam') ||
    normalized.includes('online payment') ||
    normalized.includes('upi') ||
    normalized.includes('stolen money') ||
    normalized.includes('bank debit') ||
    normalized.includes('hacked') ||
    normalized.includes('phishing')
  ) {
    return {
      ...DEMO_SCENARIOS['fraud'],
      id: `guidance-fraud-${Date.now()}`,
      timestamp: Date.now(),
      userQuery
    };
  }

  if (
    normalized.includes('salary') ||
    normalized.includes('wages') ||
    normalized.includes('employer') ||
    normalized.includes('employee') ||
    normalized.includes('unpaid') ||
    normalized.includes('full and final') ||
    normalized.includes('resignation') ||
    normalized.includes('relieving') ||
    normalized.includes('fired')
  ) {
    return {
      ...DEMO_SCENARIOS['salary'],
      id: `guidance-salary-${Date.now()}`,
      timestamp: Date.now(),
      userQuery
    };
  }

  if (
    normalized.includes('notice') ||
    normalized.includes('legal notice') ||
    normalized.includes('summons') ||
    normalized.includes('advocate notice') ||
    normalized.includes('lawyer letter')
  ) {
    return {
      ...DEMO_SCENARIOS['notice'],
      id: `guidance-notice-${Date.now()}`,
      timestamp: Date.now(),
      userQuery
    };
  }

  if (
    normalized.includes('landlord') ||
    normalized.includes('deposit') ||
    normalized.includes('tenant') ||
    normalized.includes('rent') ||
    normalized.includes('lease') ||
    normalized.includes('eviction') ||
    normalized.includes('flat')
  ) {
    return {
      ...DEMO_SCENARIOS['deposit'],
      id: `guidance-deposit-${Date.now()}`,
      timestamp: Date.now(),
      userQuery
    };
  }

  if (
    normalized.includes('defective') ||
    normalized.includes('product') ||
    normalized.includes('refund') ||
    normalized.includes('replacement') ||
    normalized.includes('warranty') ||
    normalized.includes('e-commerce') ||
    normalized.includes('flipkart') ||
    normalized.includes('amazon') ||
    normalized.includes('damaged item')
  ) {
    return {
      ...DEMO_SCENARIOS['defective'],
      id: `guidance-defective-${Date.now()}`,
      timestamp: Date.now(),
      userQuery
    };
  }

  if (
    normalized.includes('business') ||
    normalized.includes('agreement') ||
    normalized.includes('contract') ||
    normalized.includes('vendor') ||
    normalized.includes('partner') ||
    normalized.includes('msme') ||
    normalized.includes('supplier') ||
    normalized.includes('invoice')
  ) {
    return {
      ...DEMO_SCENARIOS['business'],
      id: `guidance-business-${Date.now()}`,
      timestamp: Date.now(),
      userQuery
    };
  }

  // General fallback guidance
  return {
    id: `guidance-general-${Date.now()}`,
    timestamp: Date.now(),
    userQuery,
    possibleArea: 'General Civil & Consumer Law',
    category: 'General',
    summary: 'Based on your query, here is an initial structured navigation to help you identify your rights, the possible legal category, and the appropriate next steps.',
    whatThisMayInvolve: 'Legal matters generally involve establishing the facts, determining which statutory code or contract governs the relationship, evaluating applicable rights, and approaching the appropriate conciliation or judicial authority.',
    rights: [
      DEMO_RIGHTS[4], // Notice rights
      DEMO_RIGHTS[11], // Legal aid
      DEMO_RIGHTS[2]  // Consumer protection
    ],
    routes: [
      {
        id: 'route-g1',
        title: 'Document Assembly & Chronological Summary',
        type: 'Informal / Direct',
        description: 'Organize all written communications, invoices, agreements, and notices into a dated timeline.',
        timeframe: 'Immediate',
        costIndicator: 'Low / Free',
        suitability: 'Essential foundation for any legal evaluation.',
        recommendedFirst: true
      },
      {
        id: 'route-g2',
        title: 'Mediation / Conciliation Forum',
        type: 'Mediation / Conciliation',
        description: 'Explore pre-litigation resolution through relevant statutory grievance boards or DLSA Lok Adalat.',
        timeframe: '15 – 30 Days',
        costIndicator: 'Low / Free',
        suitability: 'Saves substantial time and court costs.'
      },
      {
        id: 'route-g3',
        title: 'Formal Advocate Representation',
        type: 'Formal Legal Action',
        description: 'Engage a licensed advocate to issue a statutory demand notice or initiate proceedings in the competent court.',
        timeframe: 'As needed',
        costIndicator: 'Moderate',
        suitability: 'Required when informal conciliation fails.'
      }
    ],
    routeJourney: {
      situation: 'Factual discord or legal grievance requiring structured legal navigation.',
      legalArea: 'General Legal Rights & Pre-Litigation Navigation',
      recommendedRoute: 'Document audit → Informal demand → Statutory grievance / Mediation.',
      authorityForum: 'District Legal Services Authority (DLSA)',
      primaryDocuments: ['Underlying agreements or receipts', 'Written communications and emails', 'Identification proofs', 'Chronological statement of facts'],
      immediateNextStep: 'Assemble all transaction and communication records into a chronological file.'
    },
    authority: DEMO_AUTHORITIES[7], // DLSA
    documents: [
      {
        id: 'doc-g1',
        name: 'All written agreements, invoices, or receipts',
        purpose: 'Proves the existence of a relationship and contractual terms.',
        required: true
      },
      {
        id: 'doc-g2',
        name: 'Communication trail (Emails, SMS, WhatsApp, Letters)',
        purpose: 'Documents notices, demands, and attempts at resolution.',
        required: true
      }
    ],
    timeline: [
      {
        stage: 1,
        title: 'Fact Collection',
        timeframe: 'Week 1',
        description: 'Assemble all documents and outline key milestones.',
        keyAction: 'Prepare chronological summary.'
      },
      {
        stage: 2,
        title: 'Written Demands / Notice',
        timeframe: 'Week 2',
        description: 'Send formal communication stating your grievance.',
        keyAction: 'Dispatch written demand with deadline.'
      },
      {
        stage: 3,
        title: 'Authority Redressal',
        timeframe: 'Week 3 – 4',
        description: 'Approach appropriate ombudsman, tribunal, or court.',
        keyAction: 'Lodge formal complaint.'
      }
    ],
    nextSteps: [
      'Write down a clear, chronological sequence of what happened with dates and names.',
      'Gather all receipts, contracts, and email or message threads.',
      'Check whether the matter can be addressed by a specialized statutory helpline (e.g. 1930 for cyber fraud, 1915 for consumer issues).',
      'Consult a licensed advocate or visit your local District Legal Services Authority desk for free legal counseling if eligible.'
    ],
    sources: [
      'Legal Services Authorities Act, 1987',
      'Code of Civil Procedure, 1908',
      'Principles of Natural Justice & Fair Dispute Resolution'
    ],
    disclaimer: 'NyayaPath provides legal information and navigation support. It does not replace qualified legal advice, legal representation, or professional judgment.'
  };
}
