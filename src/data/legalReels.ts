export type LegalReel = {
  id: string;
  mediaType: 'video' | 'audio';
  title: string;
  description: string;
  category: string;
  feedType: string;
  assetPath: string;
  source: string;
  tags: string[];
};

export const LEGAL_REELS: LegalReel[] = [
  {
    id: 'reel-gst-invoice-rule-46',
    mediaType: 'video',
    title: 'GST Invoice: Rule 46 Basics',
    description: 'A quick explainer on the key particulars generally required on a GST tax invoice.',
    category: 'GST / Business',
    feedType: 'Rules & Regulations',
    assetPath: '/reels/nyayapath-gst-invoice-rule-46.mp4',
    source: 'NyayaPath Legal Reel',
    tags: ['GST', 'Invoice', 'Business', 'Rules'],
  },
  {
    id: 'reel-cyber-financial-fraud-1930',
    mediaType: 'video',
    title: 'Cyber Financial Fraud: What to Do Fast',
    description: 'A practical awareness reel covering the immediate reporting route for financial cyber fraud.',
    category: 'Cyber Crime',
    feedType: 'Know Your Rights',
    assetPath: '/reels/nyayapath-cyber-financial-fraud-1930.mp4',
    source: 'NyayaPath Legal Reel',
    tags: ['Cyber Crime', 'Financial Fraud', '1930', 'Awareness'],
  },
  {
    id: 'reel-consumer-six-rights',
    mediaType: 'video',
    title: 'Consumer Protection: Six Core Rights',
    description: 'A short visual guide to the six commonly taught consumer rights.',
    category: 'Consumer',
    feedType: 'Know Your Rights',
    assetPath: '/reels/nyayapath-consumer-six-rights.mp4',
    source: 'NyayaPath Legal Reel',
    tags: ['Consumer', 'Rights', 'Awareness'],
  },
  {
    id: 'reel-legal-notice-basics',
    mediaType: 'video',
    title: 'Legal Notice: The Basics',
    description: 'Understand what a legal notice is meant to communicate and what to check when one arrives.',
    category: 'Legal Basics',
    feedType: 'Legal Awareness',
    assetPath: '/reels/nyayapath-legal-notice-basics.mp4',
    source: 'NyayaPath Legal Reel',
    tags: ['Legal Notice', 'Legal Basics', 'Awareness'],
  },
  {
    id: 'reel-keep-legal-documents',
    mediaType: 'video',
    title: 'Keep Your Legal Documents Organised',
    description: 'Simple document-keeping habits that can make future legal or administrative steps easier.',
    category: 'Legal Basics',
    feedType: 'Legal Awareness',
    assetPath: '/reels/nyayapath-keep-legal-documents.mp4',
    source: 'NyayaPath Legal Reel',
    tags: ['Documents', 'Records', 'Legal Awareness'],
  },
  {
    id: 'reel-section-vs-rule',
    mediaType: 'video',
    title: 'Section vs Rule: What Is the Difference?',
    description: 'A quick legal-literacy explainer on how sections and rules differ in a legal framework.',
    category: 'Legal Basics',
    feedType: 'Legal Terms',
    assetPath: '/reels/nyayapath-section-vs-rule.mp4',
    source: 'NyayaPath Legal Reel',
    tags: ['Legal Terms', 'Sections', 'Rules'],
  },
  {
    id: 'audio-first-generation-lawyers',
    mediaType: 'audio',
    title: 'Mistakes First Generation Lawyers Make — All Vibes Ep.14',
    description: 'Uploaded legal-awareness audio clip. Presented as audio because the uploaded asset contains audio only.',
    category: 'Legal Awareness',
    feedType: 'Legal Awareness',
    assetPath: '/reels/mistakes-first-generation-lawyers-all-vibes-ep14.mp3',
    source: 'Uploaded Audio',
    tags: ['Lawyers', 'Legal Awareness', 'Audio'],
  },
  {
    id: 'audio-writs-easily-samjhe',
    mediaType: 'audio',
    title: 'Writs Ko Easily Samjhe!',
    description: 'Uploaded legal-awareness audio clip about writs. Presented as audio because no video file was supplied.',
    category: 'Legal Terms',
    feedType: 'Legal Terms',
    assetPath: '/reels/writs-ko-easily-samjhe.mp3',
    source: 'Uploaded Audio',
    tags: ['Writs', 'Legal Terms', 'Audio'],
  },
  {
    id: 'audio-catches-legal-awareness',
    mediaType: 'audio',
    title: 'Catches — Legal Awareness',
    description: 'Uploaded legal-awareness audio clip. Presented as audio because the uploaded asset contains audio only.',
    category: 'Legal Awareness',
    feedType: 'Legal Awareness',
    assetPath: '/reels/catches-legal-awareness.mp3',
    source: 'Uploaded Audio',
    tags: ['Legal Awareness', 'Audio'],
  },
];
