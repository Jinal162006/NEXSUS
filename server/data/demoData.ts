import { RightItem, LegalUpdateItem, AuthorityDetail, QuizQuestion, FeedPost, GuidanceResponse } from '../../src/types/legal';

export const DEMO_RIGHTS: RightItem[] = [
  {
    id: 'right-1',
    title: 'Zero Liability for Unauthorized Electronic Banking Fraud',
    category: 'Cyber Crime',
    simpleMeaning: 'If money was stolen from your bank account without your fault and you notify your bank promptly (usually within 3 working days), you may not be liable for the monetary loss.',
    whenApplies: 'Applies to unauthorized electronic debit/credit card or net banking transactions where fraud occurred due to third-party breach or phishing without negligence on your end.',
    reference: 'RBI Charter of Customer Rights & Electronic Banking Circular / Consumer Financial Protection Norms',
    keyPoints: [
      'Zero liability if reported within 3 working days of the unauthorized transaction.',
      'Limited liability if reported within 4 to 7 working days.',
      'Bank is mandated to reverse/shadow-credit the disputed sum within 10 working days pending probe.'
    ],
    actionTips: [
      'Take screenshots of SMS/email alerts immediately.',
      'Call official bank customer care to block your card and net banking access.',
      'Request an official dispute tracking / complaint acknowledgment number.'
    ]
  },
  {
    id: 'right-2',
    title: 'Right to Timely Payment of Earned Wages',
    category: 'Employment',
    simpleMeaning: 'An employer cannot withhold your earned salary without statutory justification, even if you are serving notice or have resigned.',
    whenApplies: 'Applies to salaried employees, full-time workers, and contractual staff who performed agreed duties according to their employment contract.',
    reference: 'Payment of Wages Code / Industrial Relations Guidelines & State Shops & Establishment Acts',
    keyPoints: [
      'Wages must be disbursed by the prescribed monthly cutoff (typically 7th or 10th of following month).',
      'Full and final settlement (F&F) cannot be held hostage indefinitely over unreasonable clearances.',
      'Arbitrary salary deductions without written notice or explanation are unlawful.'
    ],
    actionTips: [
      'Keep copies of appointment letter, monthly payslips, and attendance/work logs.',
      'Send a formal written email to HR and payroll summarizing unpaid dues and days worked.',
      'Refrain from aggressive language; keep an objective audit trail.'
    ]
  },
  {
    id: 'right-3',
    title: 'Right to Replacement or Refund for Defective Goods',
    category: 'Consumer',
    simpleMeaning: 'If a purchased product has an inherent manufacturing defect or fails to perform as promised, you are legally entitled to repair, replacement, or a full refund.',
    whenApplies: 'Applies when goods bought online or in-store are damaged, adulterated, or fail during the warranty period without consumer mishandling.',
    reference: 'Consumer Protection Act (Product Liability Provisions) & E-Commerce Rules',
    keyPoints: [
      'Seller and manufacturer share liability for defective products.',
      'E-commerce platforms cannot disclaim liability for counterfeit or misdescribed items sold through their fulfillment.',
      'Exclusion clauses like "Goods once sold will not be taken back" have no legal standing against genuine defects.'
    ],
    actionTips: [
      'Preserve tax invoice, warranty card, and unboxing video/photos if purchased online.',
      'Lodge a ticket on the brand\'s official customer grievance portal.',
      'Escalate to the National Consumer Helpline if the brand ignores your ticket.'
    ]
  },
  {
    id: 'right-4',
    title: 'Right to Refund of Rental Security Deposit',
    category: 'Property',
    simpleMeaning: 'A landlord must return the tenant\'s security deposit upon peaceful vacation of the premises, minus only mutually verified damages and unpaid utility bills.',
    whenApplies: 'Applies to residential and commercial tenancies upon expiry of lease or termination notice conforming to the rental agreement.',
    reference: 'Model Tenancy Act & State Rent Control Regulations',
    keyPoints: [
      'Normal wear and tear cannot be deducted from security deposit.',
      'Landlord must provide itemized receipts or estimates for any damage deductions.',
      'Unreasonable retention of deposit attracts interest penalties under modern tenancy frameworks.'
    ],
    actionTips: [
      'Conduct a joint walk-through inspection with video recording on the day keys are handed over.',
      'Get written acknowledgment of key handover and clearance of electricity/water bills.',
      'Send a formal notice demanding deposit refund within 7-14 business days.'
    ]
  },
  {
    id: 'right-5',
    title: 'Right to Reasonable Time to Respond to Legal Notices',
    category: 'General',
    simpleMeaning: 'Receiving a legal notice is not a court summons or an arrest order. You are entitled to read the allegations, gather facts, and respond through a qualified advocate within the stipulated or reasonable timeframe.',
    whenApplies: 'Applies whenever an individual or entity sends an advocate notice asserting claims, monetary demands, or contractual breaches.',
    reference: 'Civil Procedure Code & Principles of Natural Justice',
    keyPoints: [
      'A legal notice is an assertion of claim, not an executive judgment.',
      'Standard response periods range between 15 to 30 days depending on the statutory framework.',
      'Failure to respond may allow the sender to argue unchallenged facts later in court, so silence is ill-advised.'
    ],
    actionTips: [
      'Check the date of receipt and note down the postal or email delivery record.',
      'Do not panic or contact the opposing party in anger.',
      'Consult a practicing lawyer with all prior written correspondence.'
    ]
  },
  {
    id: 'right-6',
    title: 'Right to Privacy and Protection of Personal Data',
    category: 'Privacy',
    simpleMeaning: 'Organizations collecting your personal information must obtain clear consent, use it strictly for the stated purpose, and provide ways to review or delete your data.',
    whenApplies: 'Applies to apps, banks, online services, employers, and telecom providers collecting identifiers, biometric data, or financial data.',
    reference: 'Digital Personal Data Protection Framework & Supreme Court Privacy Jurisprudence',
    keyPoints: [
      'Consent must be free, specific, informed, and capable of withdrawal.',
      'Data fiduciaries must implement robust safeguards against data leaks.',
      'You have the right to grievance redressal regarding improper data profiling or spam.'
    ]
  },
  {
    id: 'right-7',
    title: 'Protection Against Harassment by Loan Recovery Agents',
    category: 'Finance',
    simpleMeaning: 'Financial lenders and recovery agencies are strictly prohibited from using intimidation, calling at unreasonable hours, contacting your relatives, or defaming you.',
    whenApplies: 'Applies to borrowers facing aggressive collection tactics for personal loans, credit cards, or micro-finance apps.',
    reference: 'Central Bank Fair Practices Code for Lenders & Harassment Guidelines',
    keyPoints: [
      'Agents may only contact between 8:00 AM and 7:00 PM.',
      'Threats of physical harm, verbal abuse, or social humiliation are criminal offenses.',
      'Lenders are vicariously responsible for the unlawful acts of their third-party agents.'
    ]
  },
  {
    id: 'right-8',
    title: 'Right to Written Employment Terms and Notice Period',
    category: 'Employment',
    simpleMeaning: 'Employees are entitled to written terms of employment and must be given the contractual notice period or salary in lieu before termination, except in proven severe misconduct.',
    whenApplies: 'Applies to standard employment terminations and corporate restructuring.',
    reference: 'Employment Contract Law & Industrial Employment Standing Orders',
    keyPoints: [
      'Arbitrary oral firing without contractual notice or severance is actionable.',
      'Earned leave encashment and statutory bonus must be settled according to rules.'
    ]
  },
  {
    id: 'right-9',
    title: 'Right of Consumers to Fair Contract Terms (Anti-Unfair Contracts)',
    category: 'Consumer',
    simpleMeaning: 'Unilateral, one-sided terms in consumer contracts (such as excessive penalty fees or absolute waivers of seller liability) can be declared null and void by Consumer Commissions.',
    whenApplies: 'Applies to standard form contracts by builders, software vendors, telecom carriers, and airlines.',
    reference: 'Consumer Protection Act (Unfair Contract Provisions)',
    keyPoints: [
      'Clauses penalizing consumer cancellations at 100% while allowing supplier delays are unenforceable.',
      'Consumer courts hold the power to strike down abusive fine print.'
    ]
  },
  {
    id: 'right-10',
    title: 'Protection of Whistleblowers and Retaliation Shield',
    category: 'Business',
    simpleMeaning: 'Employees or partners who report financial fraud, corruption, or regulatory non-compliance in good faith are entitled to protection against wrongful dismissal.',
    whenApplies: 'Applies to corporate fraud, accounting irregularities, or safety violations reported through established vigilance mechanisms.',
    reference: 'Companies Act (Vigil Mechanism) & Whistleblower Protection Norms',
    keyPoints: [
      'Companies of certain size must maintain anonymous reporting channels.',
      'Demotion or suspension following protected disclosure triggers scrutiny.'
    ]
  },
  {
    id: 'right-11',
    title: 'Right to Clean Title and Encumbrance-Free Property Possession',
    category: 'Property',
    simpleMeaning: 'Buyers of real estate have the right to inspect original title documents, verify search reports for 30 years, and receive possession free from undisclosed bank mortgages.',
    whenApplies: 'Applies to property purchases from individual sellers and real estate developers.',
    reference: 'Transfer of Property Act & Real Estate Regulatory Authority (RERA)',
    keyPoints: [
      'Promoters must adhere to sanctioned plans and delivery timelines.',
      'Undisclosed legal disputes give the buyer right to rescission and damages.'
    ]
  },
  {
    id: 'right-12',
    title: 'Right to Free Legal Aid for Eligible Citizens',
    category: 'General',
    simpleMeaning: 'Persons belonging to weaker socioeconomic backgrounds, women, children, and custody detainees are entitled to free legal counsel paid for by State Legal Services Authorities.',
    whenApplies: 'Applies to civil, criminal, and revenue court proceedings regardless of court hierarchy.',
    reference: 'Legal Services Authorities Act & Constitutional Right to Legal Representation',
    keyPoints: [
      'Includes provision of legal counsel, court fees, and certified copy expenses.',
      'District Legal Services Authority (DLSA) operates help desks in every district court.'
    ]
  },
  {
    id: 'right-13',
    title: 'Right to Maintenance and Fair Financial Support',
    category: 'Family',
    simpleMeaning: 'Spouses, minor children, and senior citizen parents unable to sustain themselves have the statutory right to seek periodic maintenance based on the other party\'s income.',
    whenApplies: 'Applies during matrimonial separation, divorce proceedings, or parental neglect.',
    reference: 'Family Courts Act, Maintenance of Parents Act & Personal Law Codes',
    keyPoints: [
      'Interim maintenance can be granted during the pendency of main litigation.',
      'Standard of living of both parties is factored into assessment.'
    ]
  },
  {
    id: 'right-14',
    title: 'Right to Report Cyber Crime Anonymously or Without Physical Police Station Visit',
    category: 'Cyber Crime',
    simpleMeaning: 'Citizens can report online financial fraud, cyber harassment, hacking, and identity theft via the official National Cyber Crime Reporting Portal without having to visit a police station immediately.',
    whenApplies: 'Applies across all states for any cyber offense committed over the internet or telecom networks.',
    reference: 'National Cyber Crime Reporting Portal (1930 Helpline) & Information Technology Act',
    keyPoints: [
      'Financial fraud complaints are swiftly flagged to financial intermediaries to freeze suspect accounts.',
      'Zero-FIR principle ensures any cyber cell can register the initial complaint.'
    ]
  },
  {
    id: 'right-15',
    title: 'Right of Tenants Against Illegal Disconnection of Utilities',
    category: 'Property',
    simpleMeaning: 'A landlord cannot disconnect essential amenities like water, electricity, elevator access, or drainage to coerce a tenant into vacating or paying disputed rent.',
    whenApplies: 'Applies to any tenant residing under a valid or holding-over tenancy agreement.',
    reference: 'Tenancy Tribunals & Supreme Court Directives on Right to Shelter',
    keyPoints: [
      'Disconnection of essential services constitutes actionable nuisance and contempt.',
      'Tenants can approach local civil court or rent tribunal for immediate emergency restoration.'
    ]
  },
  {
    id: 'right-16',
    title: 'Right to Fair Commercial Dispute Resolution through Mediation',
    category: 'Business',
    simpleMeaning: 'Parties in commercial disputes of specified valuation must explore pre-institution mediation before filing a formal suit, saving substantial time and legal expenses.',
    whenApplies: 'Applies to commercial contracts, partnership discords, intellectual property disputes, and vendor payments.',
    reference: 'Commercial Courts Act & Mediation Act Guidelines',
    keyPoints: [
      'Settlement arrived at through registered mediation holds the legal enforceability of a court decree.',
      'Confidentiality of mediation proceedings protects business reputation.'
    ]
  },
  {
    id: 'right-17',
    title: 'Right to Return Unsolicited Commercial Goods / Cancel Cool-Off Period Services',
    category: 'Consumer',
    simpleMeaning: 'Consumers enrolled in doorstep contracts, aggressive multi-level marketing, or recurring subscription traps have a statutory cooling-off window to cancel without arbitrary penalties.',
    whenApplies: 'Direct selling, timeshares, unsolicited digital auto-renewals, and doorstep promotions.',
    reference: 'Direct Selling Rules & Consumer Protection Guidelines',
    keyPoints: [
      'Companies must disclose clear cancellation and refund pathways.',
      'Deceptive subscription dark patterns are prohibited.'
    ]
  },
  {
    id: 'right-18',
    title: 'Right to Receive Copy of FIR and Police Acknowledgment',
    category: 'General',
    simpleMeaning: 'When an informant reports a cognizable offense, the police officer is legally bound to register an FIR and provide a certified free copy immediately to the complainant.',
    whenApplies: 'Applies upon reporting offenses like theft, assault, fraud, or extortion at any police station.',
    reference: 'Code of Criminal Procedure / Bharatiya Nagarik Suraksha Sanhita',
    keyPoints: [
      'Copy of First Information Report must be given free of charge on the spot.',
      'If officer refuses registration, complaint can be sent in writing to Superintendent of Police.'
    ]
  },
  {
    id: 'right-19',
    title: 'Protection of Maternity Benefits and Job Security',
    category: 'Employment',
    simpleMeaning: 'Female employees are entitled to paid maternity leave, nursing breaks, and absolute protection against termination or adverse employment changes during pregnancy.',
    whenApplies: 'Applies to establishments with 10 or more employees.',
    reference: 'Maternity Benefit Act & Equal Opportunity Regulations',
    keyPoints: [
      '26 weeks of paid maternity leave for up to two surviving children.',
      'Unlawful to terminate employment during maternity leave period.'
    ]
  },
  {
    id: 'right-20',
    title: 'Right to Fair Notice and Curing Period in Commercial Contracts',
    category: 'Business',
    simpleMeaning: 'A business contract cannot be terminated instantaneously for minor breach without serving a written default notice giving reasonable time (e.g. 15-30 days) to cure the breach.',
    whenApplies: 'Vendor agreements, software licenses, supply contracts, and agency partnerships.',
    reference: 'Indian Contract Act & Principles of Contractual Good Faith',
    keyPoints: [
      'Material breach must be substantiated with tangible proof.',
      'Damages are intended to restore actual losses, not impose punitive windfalls.'
    ]
  }
];

export const DEMO_AUTHORITIES: AuthorityDetail[] = [
  {
    id: 'auth-1',
    name: 'National Cyber Crime Reporting Portal & 1930 Financial Fraud Helpline',
    category: 'Cyber Crime',
    handles: 'Online financial fraud, phishing, UPI scam, unauthorized bank debits, identity theft, malware extortion.',
    reason: 'First-line national response forum equipped to trigger rapid inter-bank freeze on fraudulent beneficiary accounts.',
    jurisdiction: 'Pan-National (All States & Union Territories)',
    state: 'National',
    city: 'All Cities',
    address: 'Ministry of Home Affairs, Cyber & Information Security Division, New Delhi',
    officialPhone: '1930 (Toll-Free Emergency Helpline)',
    officialEmail: 'cybercrime-support@gov.in',
    officialWebsite: 'https://cybercrime.gov.in',
    onlineFilingUrl: 'https://cybercrime.gov.in/Webform/Crime_AuthoLogin.aspx',
    isVerifiedReal: true,
    isDemoData: false
  },
  {
    id: 'auth-2',
    name: 'National Consumer Helpline (NCH) & E-Daakhil Portal',
    category: 'Consumer',
    handles: 'Defective products, refusal of warranty, e-commerce fake delivery, flight refund issues, unfair trade practices.',
    reason: 'Provides free pre-litigation grievance mediation with 1,000+ registered corporate partners, and allows online consumer case filing.',
    jurisdiction: 'National & District Consumer Commissions',
    state: 'National',
    city: 'All Districts',
    address: 'Department of Consumer Affairs, Krishi Bhawan, New Delhi',
    officialPhone: '1800-11-4000 / 1915',
    officialEmail: 'consumer-helpline@nic.in',
    officialWebsite: 'https://consumerhelpline.gov.in',
    onlineFilingUrl: 'https://edaakhil.nic.in',
    isVerifiedReal: true,
    isDemoData: false
  },
  {
    id: 'auth-3',
    name: 'Office of the Labour Commissioner & Industrial Dispute Conciliation',
    category: 'Employment',
    handles: 'Non-payment of salary, illegal termination without notice, withheld full & final settlement, gratuity disputes.',
    reason: 'Statutory conciliation officer with powers to summon employers, inspect wage registers, and facilitate binding settlements.',
    jurisdiction: 'State & Regional District Labour Jurisdictions',
    state: 'State Department',
    city: 'District Headquarter',
    address: 'Regional Labour Commissionerate Office (DEMO AUTHORITY DATA for location mapping)',
    officialPhone: 'Regional Helpline (Check District Portal)',
    officialEmail: 'labour-commissioner@state.gov.example',
    officialWebsite: 'https://labour.gov.example',
    onlineFilingUrl: 'https://shramsuvidha.gov.example',
    isVerifiedReal: false,
    isDemoData: true
  },
  {
    id: 'auth-4',
    name: 'District Consumer Disputes Redressal Commission (DCDRC)',
    category: 'Consumer',
    handles: 'Formal consumer claims where product/service value is up to statutory limit (e.g. up to 50 Lakhs / specified threshold).',
    reason: 'Judicial tribunal having civil court powers to order refunds, compensation for mental agony, and punitive damages.',
    jurisdiction: 'District Level Judicial Authority',
    state: 'District Level',
    city: 'District Court Complex',
    address: 'District Consumer Disputes Redressal Forum Complex',
    officialPhone: 'District Registry Desk',
    officialEmail: 'dcdrc-registry@nic.example',
    officialWebsite: 'https://confonet.nic.example',
    onlineFilingUrl: 'https://edaakhil.nic.example',
    isVerifiedReal: false,
    isDemoData: true
  },
  {
    id: 'auth-5',
    name: 'Banking Ombudsman / Integrated Ombudsman Scheme (RBI)',
    category: 'Finance',
    handles: 'Banking service deficiencies, unauthorized electronic transactions, ATM cash dispensing failures, credit score disputes.',
    reason: 'Independent quasi-judicial authority capable of awarding compensation up to 20 Lakhs and mental harassment relief up to 1 Lakh.',
    jurisdiction: 'All Commercial Banks, NBFCs, and Payment System Participants',
    state: 'National / Regional RBI Offices',
    city: 'Major Metropolitan Hubs',
    address: 'Centralized Receipt and Processing Centre (CRPC), Reserve Bank of India, Chandigarh',
    officialPhone: '14448 (Toll-Free Integrated Service)',
    officialEmail: 'crpc@rbi.org.in',
    officialWebsite: 'https://cms.rbi.org.in',
    onlineFilingUrl: 'https://cms.rbi.org.in',
    isVerifiedReal: true,
    isDemoData: false
  },
  {
    id: 'auth-6',
    name: 'Real Estate Regulatory Authority (RERA Tribunal)',
    category: 'Property',
    handles: 'Builder delay in flat possession, unauthorized project modifications, non-refund of booking advances, defect in building quality.',
    reason: 'Specialized real estate tribunal with mandate to order refund with interest and execution warrants against errant developers.',
    jurisdiction: 'State RERA Jurisdiction',
    state: 'State Level',
    city: 'State Capital',
    address: 'State RERA Bhawan (DEMO AUTHORITY DATA)',
    officialPhone: 'State RERA Help Desk',
    officialEmail: 'rera-complaints@state.gov.example',
    officialWebsite: 'https://rera.state.gov.example',
    onlineFilingUrl: 'https://rera.state.gov.example/filing',
    isVerifiedReal: false,
    isDemoData: true
  },
  {
    id: 'auth-7',
    name: 'Rent Authority / Rent Court (Tenancy Tribunal)',
    category: 'Property',
    handles: 'Unlawful security deposit withholding, illegal eviction threats, disconnection of water/electricity by landlord, revision of rent.',
    reason: 'Designated tenancy tribunal empowered to order emergency restoration of utilities and restitution of retained deposits.',
    jurisdiction: 'Sub-Divisional Magistrate / Rent Controller Jurisdiction',
    state: 'District / Tehsil',
    city: 'Local Subdivision',
    address: 'Office of the Sub-Divisional Magistrate / Rent Controller (DEMO AUTHORITY DATA)',
    officialPhone: 'Subdivision Registry Desk',
    officialEmail: 'rentcontroller@district.gov.example',
    officialWebsite: 'https://revenue.state.gov.example',
    onlineFilingUrl: 'https://revenue.state.gov.example/tenancy',
    isVerifiedReal: false,
    isDemoData: true
  },
  {
    id: 'auth-8',
    name: 'District Legal Services Authority (DLSA)',
    category: 'General',
    handles: 'Free legal aid, advocate appointment for marginalized citizens, Lok Adalat pre-litigation settlements, victim compensation.',
    reason: 'Constitutional legal aid institution ensuring no person is denied justice due to financial or social hardship.',
    jurisdiction: 'Every District Court Premises across the country',
    state: 'All States',
    city: 'District Courts',
    address: 'District Court Complex, Room No. 1, DLSA Office',
    officialPhone: '15100 (National Legal Aid Toll-Free)',
    officialEmail: 'nalsa-dlsa@gov.in',
    officialWebsite: 'https://nalsa.gov.in',
    onlineFilingUrl: 'https://nalsa.gov.in/legal-aid-portal',
    isVerifiedReal: true,
    isDemoData: false
  },
  {
    id: 'auth-9',
    name: 'Micro and Small Enterprise Facilitation Council (MSEFC / Samadhaan)',
    category: 'Business',
    handles: 'Delayed payments by large buyers to registered MSME suppliers beyond statutory 45 days.',
    reason: 'Statutory arbitration council that orders recovery with compound interest at 3 times the RBI bank rate.',
    jurisdiction: 'State MSME Directorate',
    state: 'State Level',
    city: 'State Directorate',
    address: 'Department of Industries & MSME, State Secretariat',
    officialPhone: 'MSME Samadhaan Desk: 011-23062219',
    officialEmail: 'samadhaan-support@gov.in',
    officialWebsite: 'https://samadhaan.msme.gov.in',
    onlineFilingUrl: 'https://samadhaan.msme.gov.in/MyMsme/MSEFC/MSEFC_Welcome.aspx',
    isVerifiedReal: true,
    isDemoData: false
  },
  {
    id: 'auth-10',
    name: 'Cyber Crime Police Station (Local Cyber Cell)',
    category: 'Cyber Crime',
    handles: 'Serious cyber offenses, unauthorized server access, ransomware, impersonation, matrimonial cyber fraud, child safety offenses.',
    reason: 'Specialized police station possessing search, seizure, and investigative powers under the Criminal Procedure Code.',
    jurisdiction: 'Police Commissionerate / District Cyber Police Station',
    state: 'State Police',
    city: 'District Headquarters',
    address: 'Cyber Crime Police Station, Police Commissionerate (DEMO AUTHORITY DATA)',
    officialPhone: 'District Control Room / 112',
    officialEmail: 'cybercell@police.state.example',
    officialWebsite: 'https://police.state.example',
    onlineFilingUrl: 'https://cybercrime.gov.in',
    isVerifiedReal: false,
    isDemoData: true
  },
  {
    id: 'auth-11',
    name: 'Data Protection Board of India / Regulatory Adjudicator',
    category: 'Privacy',
    handles: 'Personal data breaches, failure to implement security safeguards, unauthorized data processing, non-redressal by data fiduciaries.',
    reason: 'Statutory digital adjudicatory body empowered to impose significant financial penalties on non-compliant data controllers.',
    jurisdiction: 'Pan-National Digital Economy',
    state: 'National',
    city: 'New Delhi',
    address: 'Electronics Niketan, CGO Complex, Lodhi Road, New Delhi',
    officialPhone: 'Data Board Grievance Secretariat',
    officialEmail: 'dpb-inquiry@meity.gov.example',
    officialWebsite: 'https://meity.gov.in/data-protection',
    onlineFilingUrl: 'https://dataprotection.gov.example',
    isVerifiedReal: false,
    isDemoData: true
  },
  {
    id: 'auth-12',
    name: 'Family Court & Matrimonial Mediation Centre',
    category: 'Family',
    handles: 'Maintenance applications, child custody, domestic violence protection orders, dissolution of marriage, restitution of conjugal rights.',
    reason: 'Dedicated civil court with in-house professional marriage counselors focused on humane resolution and fair maintenance.',
    jurisdiction: 'District Level Family Court',
    state: 'State Judicial Service',
    city: 'District Court Complex',
    address: 'Family Court Complex, Judicial District (DEMO AUTHORITY DATA)',
    officialPhone: 'Family Court Registry Desk',
    officialEmail: 'familycourt@ecourts.gov.example',
    officialWebsite: 'https://districts.ecourts.gov.in',
    onlineFilingUrl: 'https://efiling.ecourts.gov.in',
    isVerifiedReal: false,
    isDemoData: true
  },
  {
    id: 'auth-13',
    name: 'Registrar of Companies (ROC) & MCA Investor Grievance Cell',
    category: 'Business',
    handles: 'Corporate fraud, non-transfer of shares, statutory non-compliances by private/public limited firms, unauthorized director actions.',
    reason: 'Corporate regulatory authority with powers to inspect company books and recommend SFIO investigations.',
    jurisdiction: 'Ministry of Corporate Affairs Regional Benches',
    state: 'Regional MCA',
    city: 'State Metros',
    address: 'Office of the Registrar of Companies, MCA Bhawan',
    officialPhone: '0120-4832500 (MCA Helpdesk)',
    officialEmail: 'appl.helpdesk@mca.gov.in',
    officialWebsite: 'https://mca.gov.in',
    onlineFilingUrl: 'https://mca.gov.in/content/mca/global/en/contact-us/feedback-complaints.html',
    isVerifiedReal: true,
    isDemoData: false
  },
  {
    id: 'auth-14',
    name: 'Commercial Court & Pre-Institution Mediation Desk',
    category: 'Business',
    handles: 'Commercial disputes relating to mercantile contracts, technology agreements, partnerships, franchise defaults, distribution breaches.',
    reason: 'Dedicated commercial courts designed for time-bound resolution with mandatory pre-institution mediation.',
    jurisdiction: 'Designated Commercial Court Bench',
    state: 'State Judicial Department',
    city: 'Commercial Hubs',
    address: 'Commercial Court Complex, City Civil Court (DEMO AUTHORITY DATA)',
    officialPhone: 'Commercial Registry Helpline',
    officialEmail: 'commercialcourt@judiciary.state.example',
    officialWebsite: 'https://commercialcourt.judiciary.example',
    onlineFilingUrl: 'https://efiling.ecourts.gov.in',
    isVerifiedReal: false,
    isDemoData: true
  },
  {
    id: 'auth-15',
    name: 'Insurance Ombudsman',
    category: 'Finance',
    handles: 'Wrongful repudiation of health/motor/life claims, delay in settlement, dispute over premium, mis-selling of policies.',
    reason: 'Cost-effective alternative dispute resolution forum whose awards are binding on insurance companies.',
    jurisdiction: 'Territorial Benches across all States',
    state: 'Regional Centers',
    city: 'State Metros',
    address: 'Council for Insurance Ombudsmen, Jeevan Seva Annexe, Mumbai / Regional Benches',
    officialPhone: '022-69038800',
    officialEmail: 'complaints@cioins.co.in',
    officialWebsite: 'https://cioins.co.in',
    onlineFilingUrl: 'https://cioins.co.in/Complaint/Online',
    isVerifiedReal: true,
    isDemoData: false
  }
];

export const DEMO_UPDATES: LegalUpdateItem[] = [
  {
    id: 'update-1',
    headline: 'Mandatory 24-Hour Cooling-Off for Instant Digital Credit Apps',
    date: 'Oct 02, 2026',
    category: 'Finance',
    tag: 'Regulatory',
    whatChanged: 'Lenders offering instant smartphone micro-loans must now provide borrowers a 24-hour look-up period to exit the loan without prepayment penalties.',
    whyItMatters: 'Protects vulnerable citizens from predatory algorithmic loan apps that charge hidden fees and abusive interest rates.',
    whoAffected: 'Retail borrowers, digital fintech lenders, and credit marketplace platforms.',
    source: 'Central Bank Directive on Digital Lending Framework & Consumer Transparency'
  },
  {
    id: 'update-2',
    headline: 'Standardized E-Commerce Return Windows & Prohibition of Dark Patterns',
    date: 'Sep 28, 2026',
    category: 'Consumer',
    tag: 'New Law',
    whatChanged: 'E-commerce platforms are explicitly barred from using countdown timers, false scarcity indicators, or forced opt-in bundles for additional warranties.',
    whyItMatters: 'Ensures buyers can return misdescribed products and stops platforms from manipulating user decisions through deceptive UI traps.',
    whoAffected: 'Online shoppers, e-commerce retailers, app designers, and consumer grievance bodies.',
    source: 'Central Consumer Protection Authority Guidelines on Prevention of Dark Patterns'
  },
  {
    id: 'update-3',
    headline: 'Binding Timeframe of 15 Days for Security Deposit Refund under Rental Norms',
    date: 'Sep 22, 2026',
    category: 'Property',
    tag: 'Regulatory',
    whatChanged: 'Rental authorities have clarified that security deposits must be reimbursed within 15 calendar days from key handover, failing which interest accrues at 8% per annum.',
    whyItMatters: 'Eliminates endless delays by landlords who withhold substantial deposits after tenant relocation.',
    whoAffected: 'Tenants, residential landlords, and property management agencies.',
    source: 'State Tenancy Tribunal Standard Operating Procedures'
  },
  {
    id: 'update-4',
    headline: 'Rapid Account-Freeze Protocol Mandated for Banks upon 1930 Cyber Fraud Alert',
    date: 'Sep 15, 2026',
    category: 'Cyber Crime',
    tag: 'Regulatory',
    whatChanged: 'Banks must action inter-bank freeze requests initiated by the 1930 cyber fraud helpline within 15 minutes, rather than waiting for formal physical FIR dispatch.',
    whyItMatters: 'Dramatically improves the recovery rate of stolen money before scammers can withdraw funds through mules or crypto.',
    whoAffected: 'Victims of UPI and banking fraud, retail commercial banks, payment aggregators.',
    source: 'Indian Cyber Crime Coordination Centre (I4C) Operational Protocol'
  },
  {
    id: 'update-5',
    headline: 'Gig Worker Social Security and Mandatory Written Service Contracts',
    date: 'Sep 08, 2026',
    category: 'Employment',
    tag: 'New Law',
    whatChanged: 'Platform aggregators must provide gig delivery and cab partners transparent written service terms, insurance coverage, and fair dispute escalation channels.',
    whyItMatters: 'Moves gig workers from complete vulnerability to legally recognized protections regarding arbitrary account deactivation.',
    whoAffected: 'Delivery workers, rideshare drivers, platform aggregators, and tech employers.',
    source: 'Code on Social Security & State Gig Workers Welfare Act'
  },
  {
    id: 'update-6',
    headline: 'Mandatory Consent Renewal for Long-Term Data Profiling',
    date: 'Aug 29, 2026',
    category: 'Technology',
    tag: 'New Law',
    whatChanged: 'Apps and online portals can no longer maintain perpetual tracking consent; users must be prompted with simple opt-out controls annually.',
    whyItMatters: 'Empowers citizens to sever data brokers and ad-tech monopolies from continuously harvesting behavioral profiles.',
    whoAffected: 'All internet users, software applications, SaaS providers, and marketing networks.',
    source: 'Digital Personal Data Protection Rules & Consent Architecture'
  },
  {
    id: 'update-7',
    headline: 'Court Orders Full Refund plus Interest for Real Estate Possession Delays Over 12 Months',
    date: 'Aug 21, 2026',
    category: 'Property',
    tag: 'Court Ruling',
    whatChanged: 'High Court ruled that home buyers cannot be forced to wait indefinitely for possession; a delay exceeding 12 months beyond the promised date entitles buyers to immediate exit and full refund.',
    whyItMatters: 'Builders cannot cite vague "force majeure" or bureaucratic delay excuses to retain buyer funds.',
    whoAffected: 'Flat buyers, real estate developers, and housing finance institutions.',
    source: 'Appellate Tribunal Landmark Ruling on Builder-Buyer Agreements'
  },
  {
    id: 'update-8',
    headline: 'Strengthened Rules on Notice Period Buyouts and Resignation Acceptance',
    date: 'Aug 14, 2026',
    category: 'Employment',
    tag: 'Court Ruling',
    whatChanged: 'Courts clarified that once an employee tenders notice as per agreement, the employer cannot indefinitely withhold acceptance or delay issuance of relieving documentation.',
    whyItMatters: 'Prevents employers from sabotaging an employee’s career transition to a new opportunity.',
    whoAffected: 'Corporate employees, HR leadership, and contract professionals.',
    source: 'State High Court Employment Bench Precedent'
  },
  {
    id: 'update-9',
    headline: 'Stricter Penalties for Unsolicited Telemarketing & Spoofed Callers',
    date: 'Aug 05, 2026',
    category: 'Cyber Crime',
    tag: 'Regulatory',
    whatChanged: 'Telecom regulator has authorized immediate disconnection of commercial PRI lines of companies sending promotional calls from unregistered 10-digit mobile numbers.',
    whyItMatters: 'Cracks down on high-frequency spam calls offering fraudulent credit cards, stock tips, and fake lotteries.',
    whoAffected: 'Mobile subscribers, telemarketers, enterprise telecom vendors.',
    source: 'Telecom Regulatory Authority Directives on Spam Prevention'
  },
  {
    id: 'update-10',
    headline: 'Statutory Requirement for Pre-Litigation Mediation in Commercial Claims Expanded',
    date: 'Jul 28, 2026',
    category: 'Business',
    tag: 'Amendment',
    whatChanged: 'Commercial disputes with valuation exceeding standard threshold must mandatorily participate in a 60-day mediation process before docketing in court.',
    whyItMatters: 'Reduces commercial litigation duration from years to weeks, helping small suppliers recover dues promptly.',
    whoAffected: 'B2B vendors, startups, corporate enterprises, and commercial advocates.',
    source: 'Mediation Act Regulatory Implementation Notification'
  },
  {
    id: 'update-11',
    headline: 'Right to Independent Repair Recognized for Consumer Electronics',
    date: 'Jul 19, 2026',
    category: 'Consumer',
    tag: 'Regulatory',
    whatChanged: 'Electronics manufacturers must publish authentic repair manuals and make spare parts accessible to third-party repair shops without voiding original warranties arbitrarily.',
    whyItMatters: 'Lowers gadget repair costs and curbs planned obsolescence.',
    whoAffected: 'Smartphone and laptop owners, independent repair technicians, hardware manufacturers.',
    source: 'Right to Repair Framework, Ministry of Consumer Affairs'
  },
  {
    id: 'update-12',
    headline: 'Streamlined Electronic Filing on E-Daakhil for Senior Citizens',
    date: 'Jul 10, 2026',
    category: 'Consumer',
    tag: 'Public Advisory',
    whatChanged: 'E-Daakhil consumer commission portal has launched priority listing and assisted video hearings for senior citizens and disabled litigants.',
    whyItMatters: 'Removes the physical friction of visiting consumer forums in person.',
    whoAffected: 'Senior consumers, consumer rights advocates, district registries.',
    source: 'National Consumer Disputes Redressal Commission Advisory'
  },
  {
    id: 'update-13',
    headline: 'Clarification on Force Majeure Claims in Business Service Contracts',
    date: 'Jun 30, 2026',
    category: 'Business',
    tag: 'Court Ruling',
    whatChanged: 'Courts established that mere commercial unprofitability or general price inflation does not constitute a valid force majeure event excusing contractual performance.',
    whyItMatters: 'Prevents commercial partners from escaping supply agreements simply because market rates fluctuated.',
    whoAffected: 'Suppliers, logistics vendors, wholesale distributors, enterprise buyers.',
    source: 'Commercial Appellate Division Judgment'
  },
  {
    id: 'update-14',
    headline: 'Interim Maintenance Calculation Guidelines Harmonized Across Family Courts',
    date: 'Jun 18, 2026',
    category: 'Family',
    tag: 'Regulatory',
    whatChanged: 'Family courts must mandate standardized affidavit of assets and liabilities to expedite interim maintenance awards within 60 days of filing.',
    whyItMatters: 'Prevents financially vulnerable spouses from being starved of resources during prolonged procedural disputes.',
    whoAffected: 'Matrimonial litigants, family law advocates, dependent children and spouses.',
    source: 'Supreme Court Directive on Standardization of Maintenance Affidavits'
  },
  {
    id: 'update-15',
    headline: 'Digital FIR Registration Extended for Stolen Digital Assets and Vehicles',
    date: 'Jun 05, 2026',
    category: 'General',
    tag: 'New Law',
    whatChanged: 'Citizens can now register electronic FIRs for stolen mobile phones, identity documents, and motor vehicles without territorial police station objections.',
    whyItMatters: 'Eliminates jurisdictional ping-pong between police stations and speeds up insurance claims.',
    whoAffected: 'General public, vehicle owners, insurance underwriters.',
    source: 'Ministry of Home Affairs Citizens Services Modernization Wing'
  }
];

export const DEMO_FEED_POSTS: FeedPost[] = [
  {
    id: 'feed-1',
    type: 'KNOW YOUR RIGHTS',
    category: 'Cyber Crime',
    title: 'What To Do Within the First 60 Minutes of Online Payment Fraud',
    shortHook: 'The golden hour can save your life savings: immediate steps to freeze stolen funds before scammers transfer them.',
    keyPoints: [
      'Call 1930 immediately to trigger an inter-bank account freeze on the scammer’s account.',
      'Notify your bank within 3 days in writing to qualify for Zero Financial Liability.',
      'Save transaction IDs, UPI reference numbers, and screenshot of fraudulent SMS.'
    ],
    source: 'National Cyber Crime Protocol & RBI Banking Guidance',
    date: '2 hours ago',
    readTime: '2 min read',
    visualTheme: 'cyber'
  },
  {
    id: 'feed-2',
    type: 'OLD LAW VS NEW LAW',
    category: 'Consumer',
    title: 'How Consumer Protection Changed: Old Law vs New Law',
    shortHook: 'From having to travel to the seller’s city to filing from your smartphone anywhere.',
    oldLaw: 'Under earlier rules, consumers were forced to file cases where the seller’s office was situated, and product liability was virtually non-existent for digital sellers.',
    whatChanged: 'Consumers can now file electronically from their own city via E-Daakhil, and e-commerce platforms share statutory product liability.',
    newLaw: 'E-Daakhil online portal, jurisdiction where complainant resides, strict penalties for unfair contracts and misleading celebrity endorsements.',
    whyItMatters: 'Massive reduction in legal costs and travel burden for average consumers facing defective products.',
    affectedParties: 'Every online consumer, e-commerce brands, marketplace sellers.',
    keyPoints: [
      'File complaints from your home town regardless of seller location.',
      'Product liability covers manufacturing defects and misleading claims.',
      'Mediation is built directly into consumer forums.'
    ],
    source: 'Consumer Protection Act & E-Daakhil Architecture',
    date: 'Yesterday',
    readTime: '3 min read',
    visualTheme: 'consumer'
  },
  {
    id: 'feed-3',
    type: 'KNOW YOUR RIGHTS',
    category: 'Employment',
    title: 'Your Rights as an Employee: Unpaid Salary & Notice Period',
    shortHook: 'Can an employer withhold your experience letter or last paycheck? What the law actually says.',
    keyPoints: [
      'Employers cannot withhold earned wages for days already worked.',
      'Full and Final settlement must typically be disbursed within 30-45 days.',
      'Experience letter and relieving certificate cannot be held hostage for disputed clearances.'
    ],
    source: 'Payment of Wages Framework & Labor Laws',
    date: '2 days ago',
    readTime: '3 min read',
    visualTheme: 'employment'
  },
  {
    id: 'feed-4',
    type: 'LEGAL AWARENESS',
    category: 'Property',
    title: 'Basic Tenant Awareness: Landlord Demands & Security Deposit',
    shortHook: 'Understanding what deductions are legal and what constitutes unauthorized landlord overreach.',
    keyPoints: [
      'Normal wear and tear (aging paint, minor scuffs) cannot be deducted from deposits.',
      'Landlords cannot cut off electricity or water to force early eviction.',
      'Always record a dated walk-through video on the day you vacate.'
    ],
    source: 'Model Tenancy Guidelines & State Rent Tribunals',
    date: '3 days ago',
    readTime: '2 min read',
    visualTheme: 'property'
  },
  {
    id: 'feed-5',
    type: 'LEGAL TERMS',
    category: 'General',
    title: 'Decoding "Legal Notice": What It Really Means and What It Doesn’t',
    shortHook: 'Don’t panic when you see an advocate notice in the mail. Here is how to understand its true legal status.',
    keyPoints: [
      'A legal notice is an assertion by the sender, not an order by a judge.',
      'You are not going to jail tomorrow simply because a lawyer sent a registered letter.',
      'Always respond through a qualified advocate within the stated reasonable period (typically 15-30 days).'
    ],
    source: 'Civil Procedure Code & Advocate Practice Standards',
    date: '4 days ago',
    readTime: '3 min read',
    visualTheme: 'business'
  },
  {
    id: 'feed-6',
    type: 'NEW LAWS',
    category: 'Privacy',
    title: 'Know Your Rights: Dark Patterns & Privacy Consent',
    shortHook: 'How new consumer rules make deceptive countdown clocks and hidden subscription traps illegal.',
    keyPoints: [
      'Forced continuity (charging cards after free trials without warning) is banned.',
      'Basket sneaking (automatically adding travel insurance or warranty) is illegal.',
      'Users can lodge complaints against deceptive UI patterns on the National Consumer Helpline.'
    ],
    source: 'Guidelines on Prevention and Regulation of Dark Patterns',
    date: '5 days ago',
    readTime: '3 min read',
    visualTheme: 'privacy'
  },
  {
    id: 'feed-7',
    type: 'OLD LAW VS NEW LAW',
    category: 'Business',
    title: 'Commercial Dispute Recovery: Old Law vs New Law',
    shortHook: 'How small businesses shifted from 10-year court delays to expedited mediation and MSME Samadhaan.',
    oldLaw: 'Businesses had to file standard civil suits taking 7–12 years with high court fees and no statutory interest mandate.',
    whatChanged: 'Mandatory pre-institution mediation for commercial suits and MSME Samadhaan with compound interest at 3x bank rate.',
    newLaw: 'Expedited commercial courts with strict timelines, digital case tracking, and statutory arbitration councils.',
    whyItMatters: 'Protects the working capital of startups and micro-enterprises against delayed enterprise payments.',
    affectedParties: 'Small business owners, suppliers, freelancers, enterprise buyers.',
    keyPoints: [
      'MSME buyers must pay within 45 days maximum.',
      'Statutory 3x bank interest for delayed vendor payments.',
      'Binding arbitration orders hold power of court decree.'
    ],
    source: 'MSME Development Act & Commercial Courts Act',
    date: '1 week ago',
    readTime: '4 min read',
    visualTheme: 'business'
  }
];

export const DEMO_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q-1',
    question: 'If you fall victim to an unauthorized electronic banking fraud, within how many days must you inform your bank to be eligible for zero liability?',
    category: 'Cyber Crime',
    options: ['Within 3 working days', 'Within 15 days', 'Within 30 days', 'Within 6 months'],
    correctIndex: 0,
    explanation: 'Under customer protection rules, if an unauthorized transaction occurred due to third-party breach or system fraud (and not customer negligence), reporting within 3 working days ensures zero customer liability.',
    source: 'RBI Circular on Customer Protection: Limiting Liability of Customers in Unauthorized Electronic Banking Transactions',
    difficulty: 'Basic'
  },
  {
    id: 'q-2',
    question: 'What is the official nationwide emergency helpline number for reporting cyber financial fraud to freeze funds?',
    category: 'Cyber Crime',
    options: ['1930', '100', '1091', '139'],
    correctIndex: 0,
    explanation: 'Helpline 1930 is the dedicated national cyber crime helpline operated by the Ministry of Home Affairs to quickly communicate with banks and freeze fraudulent transactions.',
    source: 'Indian Cyber Crime Coordination Centre (I4C), Ministry of Home Affairs',
    difficulty: 'Basic'
  },
  {
    id: 'q-3',
    question: 'Can a landlord legally deduct the cost of repainting and general property aging from a tenant’s security deposit?',
    category: 'Property',
    options: [
      'No, normal wear and tear cannot be deducted from security deposit',
      'Yes, landlords can deduct whatever amount they choose',
      'Only if the tenant lived there for less than 3 months',
      'Yes, up to 100% of the deposit amount'
    ],
    correctIndex: 0,
    explanation: 'Under modern tenancy frameworks and court precedents, normal wear and tear resulting from ordinary habitation cannot be deducted from a security deposit.',
    source: 'Model Tenancy Act & State Rent Control Regulations',
    difficulty: 'Basic'
  },
  {
    id: 'q-4',
    question: 'If an employer terminates an employee without contractual notice or misconduct inquiry, what is the employee entitled to?',
    category: 'Employment',
    options: [
      'Salary in lieu of the agreed notice period and earned dues',
      'Nothing, employers have unconstrained rights',
      'Immediate company equity',
      'Automatic criminal warrant'
    ],
    correctIndex: 0,
    explanation: 'Under contract law and employment statutes, termination without cause requires the employer to provide the contractual notice period or payment of salary in lieu of notice, alongside earned dues.',
    source: 'Industrial Employment Standing Orders & Indian Contract Act',
    difficulty: 'Intermediate'
  },
  {
    id: 'q-5',
    question: 'What is the legal status of an advocate notice (legal notice) delivered to your residence or email?',
    category: 'General Legal Awareness',
    options: [
      'It is an assertion of claim by the sender, not an order or judgment of a court',
      'It is an immediate court conviction',
      'It is an arrest warrant issued by the police',
      'It can be safely ignored forever with zero consequences'
    ],
    correctIndex: 0,
    explanation: 'A legal notice is a formal communication from an opposing party setting out their grievance and giving you an opportunity to resolve it before litigation. It is not an order of a court.',
    source: 'Code of Civil Procedure, 1908',
    difficulty: 'Basic'
  },
  {
    id: 'q-6',
    question: 'Which online government portal allows consumers to file consumer court complaints from home without physical court visits?',
    category: 'Consumer Rights',
    options: ['E-Daakhil', 'E-Pass', 'Parivahan', 'DigiLocker'],
    correctIndex: 0,
    explanation: 'E-Daakhil is the official national portal developed by the Consumer Commission where consumers can file complaints, pay court fees online, and track case progress.',
    source: 'Department of Consumer Affairs, Government of India',
    difficulty: 'Basic'
  },
  {
    id: 'q-7',
    question: 'When a bank loan recovery agent calls you, what is the legally permissible window for calling you according to central bank guidelines?',
    category: 'Consumer Rights',
    options: ['8:00 AM to 7:00 PM', '6:00 AM to 11:00 PM', 'Anytime 24/7', 'Only between 12:00 PM and 1:00 PM'],
    correctIndex: 0,
    explanation: 'Central bank guidelines on recovery agents strictly mandate that borrowers may only be contacted between 8:00 AM and 7:00 PM, and prohibits intimidation or contacting relatives.',
    source: 'RBI Master Direction on Fair Practices Code for Lenders',
    difficulty: 'Intermediate'
  },
  {
    id: 'q-8',
    question: 'Under the Consumer Protection Act, if a product causes injury or loss due to a manufacturing defect, who can be held liable?',
    category: 'Consumer Rights',
    options: [
      'Both the manufacturer and the product seller/service provider under product liability',
      'Only the delivery courier',
      'The consumer is always solely responsible',
      'No one can be held liable'
    ],
    correctIndex: 0,
    explanation: 'Product liability provisions hold manufacturers, service providers, and sellers accountable for harm or damage caused by defective goods or deficient services.',
    source: 'Consumer Protection Act, 2019 (Chapter VI - Product Liability)',
    difficulty: 'Intermediate'
  },
  {
    id: 'q-9',
    question: 'What is the maximum statutory period an enterprise buyer can take to pay a registered MSME supplier under an agreement?',
    category: 'Business',
    options: ['45 days from day of acceptance', '180 days', '365 days', 'No time limit'],
    correctIndex: 0,
    explanation: 'Under the MSME Development Act, payment cannot exceed 45 days from the date of acceptance under any agreement, and delayed payment attracts compound interest at three times the RBI bank rate.',
    source: 'Micro, Small and Medium Enterprises Development (MSMED) Act, 2006',
    difficulty: 'Intermediate'
  },
  {
    id: 'q-10',
    question: 'Can a landlord cut off essential electricity or water supply to force a tenant to vacate?',
    category: 'Property',
    options: [
      'No, cutting essential services is unlawful and tenants can seek emergency court orders',
      'Yes, whenever rent is overdue by even one day',
      'Yes, if the landlord owns the utility meter',
      'Only during daytime'
    ],
    correctIndex: 0,
    explanation: 'Cutting off essential utilities like water, electricity, or sanitary services is an actionable civil wrong and illegal under tenancy laws. Courts can order immediate restoration and impose penalties.',
    source: 'Model Tenancy Framework & State Rent Control Acts',
    difficulty: 'Basic'
  },
  {
    id: 'q-11',
    question: 'Who is eligible for free legal aid services through the District Legal Services Authority (DLSA)?',
    category: 'General Legal Awareness',
    options: [
      'Women, children, custody detainees, and citizens under statutory income thresholds',
      'Only corporate entities',
      'Only government officials',
      'No one, all legal representation must be paid'
    ],
    correctIndex: 0,
    explanation: 'Under Section 12 of the Legal Services Authorities Act, women, children, members of disadvantaged communities, custody detainees, and persons below defined income limits are entitled to free legal aid.',
    source: 'Legal Services Authorities Act, 1987',
    difficulty: 'Basic'
  },
  {
    id: 'q-12',
    question: 'What is a "Zero-FIR"?',
    category: 'General Legal Awareness',
    options: [
      'An FIR that can be registered at any police station regardless of jurisdiction, and later transferred',
      'An FIR that carries zero criminal penalty',
      'An anonymous social media post',
      'A receipt for traffic fine'
    ],
    correctIndex: 0,
    explanation: 'A Zero-FIR allows a police station to register a cognizable complaint immediately even if the incident occurred outside its territorial jurisdiction, ensuring timely evidence collection before transferring the file.',
    source: 'Criminal Procedure Code & Supreme Court Guidelines on Crime Registration',
    difficulty: 'Intermediate'
  },
  {
    id: 'q-13',
    question: 'What is a "dark pattern" in consumer digital applications?',
    category: 'Privacy',
    options: [
      'A deceptive user interface design intended to trick users into doing something they didn’t intend',
      'A night mode color theme on a mobile app',
      'An encryption protocol for emails',
      'A dark web website'
    ],
    correctIndex: 0,
    explanation: 'Dark patterns are manipulative design choices (such as hidden charges, fake countdown clocks, or disguised ads) that undermine consumer autonomy and are banned by consumer authorities.',
    source: 'Central Consumer Protection Authority (CCPA) Guidelines, 2023',
    difficulty: 'Basic'
  },
  {
    id: 'q-14',
    question: 'If you receive an unrequested OTP for a bank debit while browsing the internet, what should you do immediately?',
    category: 'Cyber Crime',
    options: [
      'Do not share the OTP with anyone and block your card/net banking via the official banking app',
      'Share it on WhatsApp to check if someone sent it',
      'Click whatever link arrived in the SMS',
      'Ignore it because OTPs expire automatically'
    ],
    correctIndex: 0,
    explanation: 'An unsolicited OTP means someone is attempting to authorize an unauthorized transaction with your credentials. Never share it, and immediately lock your payment channels.',
    source: 'Cyber Security Awareness Directives, CERT-In',
    difficulty: 'Basic'
  },
  {
    id: 'q-15',
    question: 'What is the role of an Insurance Ombudsman?',
    category: 'General Legal Awareness',
    options: [
      'To provide cost-effective and impartial dispute resolution between policyholders and insurance companies',
      'To sell insurance policies on commission',
      'To arrest insurance agents',
      'To manage hospital billing departments'
    ],
    correctIndex: 0,
    explanation: 'The Insurance Ombudsman is an independent quasi-judicial forum set up by the government to resolve individual complaints against insurance companies regarding repudiation or delays.',
    source: 'Insurance Ombudsman Rules, 2017',
    difficulty: 'Basic'
  },
  {
    id: 'q-16',
    question: 'Can an employer deduct salary from an employee as a punishment without contractual notice or statutory inquiry?',
    category: 'Employment',
    options: [
      'No, arbitrary wage deductions without statutory authority or contract terms are illegal',
      'Yes, employers have unconditional discretion over deductions',
      'Only if the deduction is less than 50% of the wage',
      'Yes, if communicated orally in a meeting'
    ],
    correctIndex: 0,
    explanation: 'Wage protection statutes strictly limit allowable deductions to authorized statutory items (such as PF, tax, or court orders). Arbitrary wage deductions violate labor laws.',
    source: 'Payment of Wages Act / Code on Wages',
    difficulty: 'Intermediate'
  },
  {
    id: 'q-17',
    question: 'Under real estate law (RERA), what must a developer do if they fail to deliver flat possession within the promised agreement date?',
    category: 'Property',
    options: [
      'Pay monthly interest for every month of delay, or refund the total amount with interest if buyer withdraws',
      'Simply extend the date by 5 years without paying anything',
      'Cancel the buyer’s allotment without penalty',
      'Force the buyer to accept an alternative unapproved building'
    ],
    correctIndex: 0,
    explanation: 'Under RERA, if a promoter fails to give possession on time, the home buyer has the legal right to claim a full refund with interest, or monthly interest for every month of continued delay.',
    source: 'Real Estate (Regulation and Development) Act (RERA), 2016',
    difficulty: 'Intermediate'
  },
  {
    id: 'q-18',
    question: 'What is mandatory pre-institution mediation in commercial disputes?',
    category: 'Business',
    options: [
      'A mandatory process where disputing business parties attempt mediation before filing a court suit',
      'A criminal sentencing hearing',
      'A tax audit conducted by the revenue department',
      'An auction of company assets'
    ],
    correctIndex: 0,
    explanation: 'Under the Commercial Courts Act, unless urgent interim relief is required, parties must participate in pre-institution mediation to explore amicable settlement before the court will entertain the suit.',
    source: 'Commercial Courts Act, Section 12A',
    difficulty: 'Practical'
  },
  {
    id: 'q-19',
    question: 'What is the statutory duration of paid maternity leave for eligible female employees in corporate establishments?',
    category: 'Employment',
    options: ['26 weeks for up to two surviving children', '6 weeks only', '12 months with no pay', 'Maternity leave is completely optional for employers'],
    correctIndex: 0,
    explanation: 'The Maternity Benefit Amendment Act provides 26 weeks of fully paid maternity leave for female employees in establishments employing 10 or more persons.',
    source: 'Maternity Benefit (Amendment) Act, 2017',
    difficulty: 'Basic'
  },
  {
    id: 'q-20',
    question: 'If you sign a contract with a clause stating "In case of dispute, buyer waives all rights to approach consumer courts", what is the legal validity of that clause?',
    category: 'Consumer Rights',
    options: [
      'Void and unenforceable, as parties cannot contract out of statutory consumer protection rights',
      'Completely binding on the buyer',
      'Only valid if signed in blue ink',
      'Enforceable if printed in bold capital letters'
    ],
    correctIndex: 0,
    explanation: 'Under the Indian Contract Act and Consumer Protection jurisprudence, contract clauses that completely extinguish statutory legal remedies or contradict public policy are void.',
    source: 'Indian Contract Act, Section 28 & Supreme Court Consumer Jurisprudence',
    difficulty: 'Practical'
  },
  {
    id: 'q-21',
    question: 'What is the primary function of the Banking Ombudsman?',
    category: 'General Legal Awareness',
    options: [
      'To address customer grievances against banks regarding service deficiencies and unauthorized charges',
      'To print currency notes',
      'To approve corporate mergers',
      'To provide direct personal loans to the public'
    ],
    correctIndex: 0,
    explanation: 'The Reserve Bank Integrated Ombudsman handles unresolved customer grievances against regulated banks and NBFCs without requiring expensive litigation.',
    source: 'Reserve Bank - Integrated Ombudsman Scheme',
    difficulty: 'Basic'
  },
  {
    id: 'q-22',
    question: 'What evidence is most vital when challenging an unfair deduction from your rental deposit?',
    category: 'Property',
    options: [
      'Dated move-in and move-out photos/videos and the written agreement',
      'Oral conversations over the phone with no recording',
      'Unsigned handwritten notes with no dates',
      'Rumors from neighborhood residents'
    ],
    correctIndex: 0,
    explanation: 'Contemporaneous objective evidence—including dated handover inspection reports, move-in/out photos, and the signed lease agreement—is decisive in tenancy disputes.',
    source: 'Practical Tenancy Dispute Evidence Standards',
    difficulty: 'Practical'
  },
  {
    id: 'q-23',
    question: 'Can an individual request deletion of their personal data from a company when it is no longer required for the original purpose?',
    category: 'Privacy',
    options: [
      'Yes, modern data protection laws grant the right to data correction and erasure upon purpose completion',
      'No, companies own your data permanently once received',
      'Only if you pay a statutory government fee',
      'Only after 50 years'
    ],
    correctIndex: 0,
    explanation: 'Under data protection frameworks, individuals have the right to withdraw consent and demand erasure of personal data that is no longer necessary for the legal purpose it was collected.',
    source: 'Digital Personal Data Protection Act & Global Privacy Standards',
    difficulty: 'Intermediate'
  },
  {
    id: 'q-24',
    question: 'When served with a statutory notice under Section 138 (Dishonour of Cheque), within how many days must payment be made to avoid criminal prosecution?',
    category: 'Business',
    options: ['Within 15 days of notice receipt', 'Within 90 days', 'Within 1 year', 'Same day within 2 hours'],
    correctIndex: 0,
    explanation: 'Under the Negotiable Instruments Act, the drawer of a bounced cheque is given 15 days from the receipt of the statutory demand notice to make payment before a criminal complaint can be filed.',
    source: 'Negotiable Instruments Act, 1881, Section 138',
    difficulty: 'Practical'
  },
  {
    id: 'q-25',
    question: 'What should you do first if an employer refuses to give you your formal relieving letter after you served your notice period?',
    category: 'Employment',
    options: [
      'Send a formal polite email citing your resignation date, last working day, and clearances completed, requesting confirmation',
      'Post defamatory abuse on social media immediately',
      'Physically block the office entrance',
      'Delete company files from your personal laptop'
    ],
    correctIndex: 0,
    explanation: 'Establishing a pristine, objective written audit trail through formal correspondence is the essential first step before approaching the Labor Commissioner or sending an advocate notice.',
    source: 'Employment Dispute Resolution Best Practices',
    difficulty: 'Basic'
  },
  {
    id: 'q-26',
    question: 'What does "caveat emptor" traditionally mean, and how does modern consumer law modify it?',
    category: 'Consumer Rights',
    options: [
      'It means "let the buyer beware", but modern consumer law shifts burden to sellers through mandatory disclosures and product liability',
      'It means the seller is always innocent',
      'It is an insurance term for marine vessels',
      'It means goods are always free of cost'
    ],
    correctIndex: 0,
    explanation: 'While old common law relied on "caveat emptor" (buyer beware), modern consumer protection statutes mandate that sellers provide honest descriptions, fair contracts, and defect-free goods.',
    source: 'Evolution of Consumer Protection Jurisprudence',
    difficulty: 'Intermediate'
  },
  {
    id: 'q-27',
    question: 'In digital payment fraud, what is "phishing"?',
    category: 'Cyber Crime',
    options: [
      'A fraudulent attempt to steal sensitive information like passwords or PINs by disguising as a trustworthy entity',
      'Catching actual fish using a smartphone sensor',
      'A method of speeding up internet connection',
      'An approved banking backup software'
    ],
    correctIndex: 0,
    explanation: 'Phishing involves deceptive emails, SMS, or fake websites designed to impersonate banks or utility providers to trick individuals into disclosing credentials.',
    source: 'CERT-In Cyber Hygiene Advisory',
    difficulty: 'Basic'
  },
  {
    id: 'q-28',
    question: 'If a dispute arises under a contract that contains an "Arbitration Clause", what is typically the required first formal dispute path?',
    category: 'Business',
    options: [
      'Submitting the dispute to an Arbitrator or arbitration institution as agreed in the contract',
      'Filing a criminal police complaint for simple non-payment',
      'Calling a television news channel',
      'Refusing to pay all other unrelated vendors'
    ],
    correctIndex: 0,
    explanation: 'When a valid arbitration clause exists in a commercial agreement, civil courts will generally refer the parties to arbitration under the Arbitration and Conciliation Act.',
    source: 'Arbitration and Conciliation Act, 1996, Section 8',
    difficulty: 'Intermediate'
  },
  {
    id: 'q-29',
    question: 'What is an "Encumbrance Certificate" (EC) in property transactions?',
    category: 'Property',
    options: [
      'An official document verifying whether a property has any registered financial mortgages, legal charges, or court attachments',
      'An architectural sketch of the building layout',
      'An electricity bill receipt',
      'A home insurance policy document'
    ],
    correctIndex: 0,
    explanation: 'An Encumbrance Certificate issued by the sub-registrar office evidences whether a property is encumbered by registered mortgages, sales, or liabilities over a specified span of years.',
    source: 'Registration Act & Real Estate Conveyancing Standards',
    difficulty: 'Intermediate'
  },
  {
    id: 'q-30',
    question: 'Why does NyayaPath emphasize that it provides legal information and navigation support rather than legal representation?',
    category: 'General Legal Awareness',
    options: [
      'Because legal rights depend on nuanced facts, jurisdiction, and official filings that require qualified advocate consultation',
      'Because legal information is illegal to read',
      'Because laws never apply to normal people',
      'Because AI replaces judges completely'
    ],
    correctIndex: 0,
    explanation: 'Legal navigation services help citizens understand principles, organize documents, and locate proper authorities, but formal legal advice and representation requires qualified human advocates.',
    source: 'Bar Council Regulatory Standards & Legal Tech Ethics Framework',
    difficulty: 'Basic'
  }
];

// The 6 comprehensive guidance scenarios
export const DEMO_SCENARIOS: Record<string, GuidanceResponse> = {
  'fraud': {
    id: 'guidance-scenario-fraud',
    timestamp: Date.now(),
    userQuery: 'My online payment was fraudulent.',
    possibleArea: 'Cyber Crime / Online Financial Fraud',
    category: 'Cyber Crime',
    summary: 'You experienced an unauthorized or fraudulent digital financial transaction. Swift reporting to your bank and the national cyber crime channel is critical to freeze beneficiary accounts and preserve your right to zero customer liability.',
    whatThisMayInvolve: 'Online payment fraud typically involves unauthorized debits via UPI, net banking, cloned cards, or phishing scams. Because electronic funds move rapidly across multiple mule accounts, rapid inter-bank intervention through the 1930 emergency network is the primary way to recover the funds.',
    rights: [
      DEMO_RIGHTS[0], // Zero liability
      DEMO_RIGHTS[13], // 1930 reporting
      DEMO_RIGHTS[5] // Privacy and data protection
    ],
    routes: [
      {
        id: 'route-1',
        title: 'Emergency Banking & Helpline Freeze (First 2 Hours)',
        type: 'Informal / Direct',
        description: 'Immediately call your bank’s 24x7 fraud helpline to hotlist/block cards and UPI IDs, then call the 1930 National Cyber Crime Helpline to issue an inter-bank freeze on the recipient account.',
        timeframe: 'Immediate (0 – 2 Hours)',
        costIndicator: 'Low / Free',
        suitability: 'Essential for every instance of unauthorized electronic debit.',
        recommendedFirst: true
      },
      {
        id: 'route-2',
        title: 'National Cyber Crime Portal & Police Acknowledgment',
        type: 'Regulatory / Grievance',
        description: 'File an official online complaint on cybercrime.gov.in. Upload bank statements, SMS receipts, and transaction references to receive a formal incident acknowledgment number.',
        timeframe: 'Within 24 Hours',
        costIndicator: 'Low / Free',
        suitability: 'Necessary to substantiate your claim with the bank and local cyber cell.'
      },
      {
        id: 'route-3',
        title: 'Banking Ombudsman Redressal',
        type: 'Mediation / Conciliation',
        description: 'If your bank fails to shadow-credit or resolve your unauthorized transaction dispute within 30 days of written notice, escalate directly to the RBI Integrated Ombudsman.',
        timeframe: 'After 30 Days of Bank Non-Resolution',
        costIndicator: 'Low / Free',
        suitability: 'Applicable when the bank denies zero-liability without proving customer negligence.'
      }
    ],
    routeJourney: {
      situation: 'Unauthorized debit or deceptive UPI transaction detected on account.',
      legalArea: 'Cyber Crime / Unauthorized Electronic Banking Transaction',
      recommendedRoute: 'Dial 1930 for inter-bank beneficiary freeze + notify issuing bank in writing.',
      authorityForum: 'National Cyber Crime Reporting Portal & Bank Nodal Grievance Officer',
      primaryDocuments: ['Bank transaction statement', 'Fraudulent SMS / Email alert', 'UPI Reference Number / UTR', 'Call logs / Chat screenshots'],
      immediateNextStep: 'Block compromised card / net banking and call 1930 helpline to obtain complaint token.'
    },
    authority: DEMO_AUTHORITIES[0], // 1930 / cybercrime.gov.in
    documents: [
      {
        id: 'doc-1',
        name: 'Bank Account / Card Statement highlighting fraudulent debit',
        purpose: 'Proves the exact amount, date, timestamp, and recipient UTR/IMPS reference number.',
        required: true,
        exampleOrTip: 'Download PDF statement from mobile banking or net banking app.'
      },
      {
        id: 'doc-2',
        name: 'Screenshots of Debit SMS and Transaction Confirmation',
        purpose: 'Demonstrates immediate notice and lack of authorized consent.',
        required: true,
        exampleOrTip: 'Ensure sender header (e.g. VK-HDFCBK) and timestamp are clearly legible.'
      },
      {
        id: 'doc-3',
        name: 'Communication Logs with Scammer (if phishing / call)',
        purpose: 'Documents fraudulent inducement, caller phone numbers, links, or malicious APK files.',
        required: false,
        exampleOrTip: 'Take screenshots before the scammer deletes chat messages.'
      },
      {
        id: 'doc-4',
        name: 'Written Complaint Acknowledgment from Bank Branch / Portal',
        purpose: 'Establishes that the incident was reported within the 3-day zero-liability window.',
        required: true,
        exampleOrTip: 'Always obtain an email ticket number or stamped copy from bank branch.'
      }
    ],
    timeline: [
      {
        stage: 1,
        title: 'Incident Detection & Blocking',
        timeframe: 'Hour 0 – 2',
        description: 'Detect unauthorized debit, immediately freeze account/card, and capture transaction UTR.',
        keyAction: 'Call 1930 and bank emergency fraud number.'
      },
      {
        stage: 2,
        title: 'Formal Dispute Lodging',
        timeframe: 'Within 24 – 72 Hours',
        description: 'Submit written dispute form to the bank requesting Zero-Liability shadow credit; lodge portal complaint.',
        keyAction: 'File report on cybercrime.gov.in and obtain acknowledgment.'
      },
      {
        stage: 3,
        title: 'Inter-Bank Freeze & Investigation',
        timeframe: 'Days 3 – 10',
        description: 'Nodal cyber cell coordinates with recipient bank to verify frozen funds.',
        keyAction: 'Bank is mandated to reverse/shadow-credit disputed sum within 10 working days.'
      },
      {
        stage: 4,
        title: 'Resolution / Escalation',
        timeframe: 'Days 10 – 30',
        description: 'Final reversal of funds or escalation to Banking Ombudsman if bank claims negligence unfairly.',
        keyAction: 'Escalate to RBI CMS portal if unresolved at 30 days.'
      }
    ],
    nextSteps: [
      'Call the 1930 National Cyber Fraud Helpline right away to freeze the recipient bank wallet.',
      'Notify your bank in writing (via email or customer support ticket) stating that you did not authorize this transaction, claiming zero liability under RBI customer protection norms.',
      'File a complaint on the official National Cyber Crime Reporting Portal (cybercrime.gov.in) with transaction screenshots.',
      'Change all internet banking passwords, UPI PINs, and email recovery credentials from a secure device.'
    ],
    sources: [
      'RBI Master Circular on Customer Protection: Limiting Liability in Unauthorized Electronic Transactions (DBR.No.Leg.BC.78/09.07.005/2017-18)',
      'National Cyber Crime Reporting Portal Guidelines, Ministry of Home Affairs, Govt. of India',
      'Information Technology Act, 2000 (Section 43 & Section 66D)'
    ],
    disclaimer: 'NyayaPath provides legal information and navigation support. It does not replace qualified legal advice, legal representation, or professional judgment. Verified details should be confirmed with your financial institution and local law enforcement.',
    relevantSectionExplainer: {
      provision: 'Section 66D of the Information Technology Act',
      simpleMeaning: 'Punishment for cheating by personation by using computer resource or communication device.',
      whenApplies: 'Applies when a perpetrator uses fraudulent online identities, fake websites, or deceptive calls to deceive victims into transferring funds.',
      example: 'A scammer posing as a bank representative asks you to click a link to "update KYC" and drains funds.',
      relatedLegalArea: 'Cyber Crime / Digital Fraud',
      sourceReference: 'Information Technology Act, 2000'
    }
  },

  'salary': {
    id: 'guidance-scenario-salary',
    timestamp: Date.now(),
    userQuery: 'My employer has not paid my salary.',
    possibleArea: 'Employment & Labor Law / Unpaid Wages',
    category: 'Employment',
    summary: 'Withholding earned wages for work already completed violates statutory labor codes and the terms of your employment contract. You have clear legal avenues to demand your dues with interest.',
    whatThisMayInvolve: 'Employers are legally bound to pay wages by the agreed statutory cutoff each month. Withholding salary—whether during active employment, during a notice period, or as part of full-and-final settlement—cannot be done arbitrarily without contractual justification or statutory deduction rules.',
    rights: [
      DEMO_RIGHTS[1], // Timely payment of wages
      DEMO_RIGHTS[7], // Written employment terms
      DEMO_RIGHTS[4]  // Legal notice
    ],
    routes: [
      {
        id: 'route-1',
        title: 'Formal Written Demand (Internal Audit Trail)',
        type: 'Informal / Direct',
        description: 'Send a structured, objective email to HR, Finance, and senior leadership referencing your offer letter, days worked, and the specific outstanding sum.',
        timeframe: 'Immediate (Day 1 – 7)',
        costIndicator: 'Low / Free',
        suitability: 'Best first step; establishes undisputed paper trail of your demand.',
        recommendedFirst: true
      },
      {
        id: 'route-2',
        title: 'Legal Notice through an Employment Advocate',
        type: 'Formal Legal Action',
        description: 'Have an advocate serve a formal demand notice giving the employer 15 days to remit unpaid wages along with interest and damages.',
        timeframe: 'After 7 – 14 Days of Non-Response',
        costIndicator: 'Moderate',
        suitability: 'Highly effective against corporate entities wanting to avoid litigation and reputational exposure.'
      },
      {
        id: 'route-3',
        title: 'Complaint to the Labor Commissioner / Shram Suvidha',
        type: 'Regulatory / Grievance',
        description: 'Lodge a formal wage recovery grievance before the local Labour Commissioner or under the state Shops and Establishments Act.',
        timeframe: '15 – 45 Days',
        costIndicator: 'Low / Free',
        suitability: 'Government conciliation mechanism with statutory powers to summon employers.'
      }
    ],
    routeJourney: {
      situation: 'Earned monthly salary or Full & Final settlement withheld by employer.',
      legalArea: 'Employment Law / Payment of Wages & Contractual Breach',
      recommendedRoute: 'Document audit trail → Send formal written notice → Escalate to Labour Commissioner.',
      authorityForum: 'Office of the Labour Commissioner & Industrial Dispute Conciliation',
      primaryDocuments: ['Employment contract / Offer letter', 'Past payslips & bank statements', 'Timesheets / Attendance records', 'Resignation & clearance emails'],
      immediateNextStep: 'Compile attendance logs and send a dated formal demand email to HR.'
    },
    authority: DEMO_AUTHORITIES[2], // Labour Commissioner
    documents: [
      {
        id: 'doc-1',
        name: 'Offer Letter / Employment Agreement',
        purpose: 'Proves the contractual salary, designation, notice period, and terms of service.',
        required: true,
        exampleOrTip: 'Check salary breakdown and payment schedule clauses.'
      },
      {
        id: 'doc-2',
        name: 'Previous 3 to 6 Months Payslips and Bank Credit Statements',
        purpose: 'Demonstrates regular employment history and customary net pay.',
        required: true
      },
      {
        id: 'doc-3',
        name: 'Attendance Records / Timesheets / Email Logs',
        purpose: 'Substantiates that you performed work during the unpaid period.',
        required: true,
        exampleOrTip: 'Export client emails, system login logs, or task completion summaries.'
      },
      {
        id: 'doc-4',
        name: 'Written Correspondence with HR / Management',
        purpose: 'Demonstrates your attempts to resolve the matter and any admissions by the employer.',
        required: true
      }
    ],
    timeline: [
      {
        stage: 1,
        title: 'Initial Demand & Reminder',
        timeframe: 'Day 1 – 7',
        description: 'Polite, firm formal email summarizing owed amounts and days worked.',
        keyAction: 'Deliver written notice to HR and Finance.'
      },
      {
        stage: 2,
        title: 'Advocate Legal Notice',
        timeframe: 'Day 8 – 20',
        description: 'Drafting and dispatch of formal legal notice demanding settlement within 15 days.',
        keyAction: 'Engage legal counsel to issue registered notice.'
      },
      {
        stage: 3,
        title: 'Labour Authority Conciliation',
        timeframe: 'Day 21 – 45',
        description: 'Filing claim before Labour Commissioner; notice issued to company directors.',
        keyAction: 'Attend conciliation hearing with supporting wage records.'
      }
    ],
    nextSteps: [
      'Export and safely store all employment emails, appointment letter, past payslips, and attendance records on a personal device.',
      'Send a formal demand email to HR and company directors requesting settlement within 7 business days.',
      'If ignored, prepare to issue a legal notice or lodge an online complaint via the state labour grievance portal.'
    ],
    sources: [
      'Payment of Wages Act / Code on Wages Framework',
      'State Shops and Commercial Establishments Act',
      'Indian Contract Act, 1872 (Section 73 - Compensation for Breach of Contract)'
    ],
    disclaimer: 'NyayaPath provides legal information and navigation support. It does not replace qualified legal advice, legal representation, or professional judgment.',
    relevantSectionExplainer: {
      provision: 'Section 15 of the Payment of Wages Act',
      simpleMeaning: 'Claims arising out of deductions from wages or delay in payment of wages.',
      whenApplies: 'Enables an employee or registered trade union to apply to the designated Authority to recover unpaid wages with compensation up to ten times the delayed amount.',
      example: 'An IT company delays releasing the final two months salary after an engineer resigns.',
      relatedLegalArea: 'Employment Law / Wage Recovery',
      sourceReference: 'Payment of Wages Act, 1936'
    }
  },

  'notice': {
    id: 'guidance-scenario-notice',
    timestamp: Date.now(),
    userQuery: 'I received a legal notice.',
    possibleArea: 'General Procedural Law / Civil & Commercial Notice Response',
    category: 'General',
    summary: 'Receiving a legal notice is a formal pre-litigation step by the opposing party. It is not an arrest warrant or court decree, but requires a structured, timely response through a practicing advocate.',
    whatThisMayInvolve: 'A legal notice sets out the sender\'s grievances, assertions of fact, and statutory demands (such as clearing dues, vacating premises, or ceasing specific actions) within a specified timeframe (typically 15 to 30 days). A timely response clarifies your legal standing and prevents the sender from claiming uncontroverted facts later in court.',
    rights: [
      DEMO_RIGHTS[4], // Reasonable time to respond
      DEMO_RIGHTS[11], // Free legal aid
      DEMO_RIGHTS[15] // Commercial mediation
    ],
    routes: [
      {
        id: 'route-1',
        title: 'Advocate Consultation & Fact Mapping',
        type: 'Formal Legal Action',
        description: 'Take the notice to a qualified advocate along with all related contracts, receipts, and emails to prepare an itemized factual rebuttal.',
        timeframe: 'Immediate (Within 3 – 5 Days)',
        costIndicator: 'Moderate',
        suitability: 'Crucial for drafting a comprehensive, legally protected reply.',
        recommendedFirst: true
      },
      {
        id: 'route-2',
        title: 'Dispatch of Formal Rebuttal Reply',
        type: 'Formal Legal Action',
        description: 'Send a formal reply through your advocate via Registered Post A.D. and Email within the stipulated notice window.',
        timeframe: 'Within the Notice Period (e.g. 15 or 30 Days)',
        costIndicator: 'Moderate',
        suitability: 'Protects your legal defenses and puts counter-claims on record.'
      },
      {
        id: 'route-3',
        title: 'Pre-Litigation Settlement / Mediation',
        type: 'Mediation / Conciliation',
        description: 'If the notice involves a genuine commercial or monetary dispute, propose formal mediation or settlement terms without admitting liability.',
        timeframe: 'Simultaneous with Reply',
        costIndicator: 'Low / Free',
        suitability: 'Avoids costly multi-year court proceedings if terms can be amicably restructured.'
      }
    ],
    routeJourney: {
      situation: 'Received registered legal notice alleging claims or demanding specific performance.',
      legalArea: 'Civil & Commercial Procedure / Pre-Litigation Demands',
      recommendedRoute: 'Preserve postal envelope → Map factual timeline → Respond via practicing advocate.',
      authorityForum: 'District Legal Services Authority / Practicing Bar Association',
      primaryDocuments: ['Original legal notice + envelope with postal tracking', 'Underlying agreement / contract', 'Prior email and payment receipts', 'Written chronological fact sheet'],
      immediateNextStep: 'Note down the exact date received and preserve the postal envelope with tracking barcode.'
    },
    authority: DEMO_AUTHORITIES[7], // DLSA
    documents: [
      {
        id: 'doc-1',
        name: 'Original Legal Notice and Postal Envelope / Email Header',
        purpose: 'Establishes the exact date of receipt and identifies the advocate and sender details.',
        required: true,
        exampleOrTip: 'Do not discard the registered post envelope; the postmark date proves when you were served.'
      },
      {
        id: 'doc-2',
        name: 'Underlying Contracts, Invoices, or Agreements',
        purpose: 'Provides the legal foundation to verify whether any contractual clause was truly breached.',
        required: true
      },
      {
        id: 'doc-3',
        name: 'Chronological Written Timeline of Facts',
        purpose: 'Helps your lawyer quickly pinpoint misstatements and factual errors in the notice.',
        required: true,
        exampleOrTip: 'Write down dates, key events, and who said what in plain bullet points.'
      }
    ],
    timeline: [
      {
        stage: 1,
        title: 'Receipt & Deadline Calculation',
        timeframe: 'Day 1 – 2',
        description: 'Verify receipt date, identify statute cited (e.g. NI Act, CPC, Consumer Act), and note response deadline.',
        keyAction: 'Keep postal envelope safe.'
      },
      {
        stage: 2,
        title: 'Legal Counsel & Strategy Drafting',
        timeframe: 'Day 3 – 7',
        description: 'Review claims with an advocate, highlight factual misstatements, and draft point-by-point reply.',
        keyAction: 'Assemble all transaction proofs.'
      },
      {
        stage: 3,
        title: 'Dispatch of Formal Reply',
        timeframe: 'Before Deadline (Day 15/30)',
        description: 'Send reply by Registered Post A.D. and email to the sender\'s advocate and keep postal acknowledgment.',
        keyAction: 'Track delivery online.'
      }
    ],
    nextSteps: [
      'Do not contact the sender in anger or panic; avoid making verbal admissions over the phone.',
      'Check the date on the postal stamp or email delivery to calculate your exact response deadline.',
      'Gather all contracts, receipts, and email records relevant to the allegations in the notice.',
      'Schedule a consultation with a practicing advocate in your jurisdiction to draft an itemized reply.'
    ],
    sources: [
      'Code of Civil Procedure, 1908 (Section 80 & Pre-Litigation Practice)',
      'Indian Evidence Act / Bharatiya Sakshya Adhiniyam (Admissibility of Written Notices)',
      'Bar Council of India Standards of Professional Conduct'
    ],
    disclaimer: 'NyayaPath provides legal information and navigation support. It does not replace qualified legal advice, legal representation, or professional judgment. Consult a licensed advocate to draft official replies.',
    relevantSectionExplainer: {
      provision: 'Section 80 of the Code of Civil Procedure (Principle of Notice)',
      simpleMeaning: 'Mandates prior written notice before instituting certain suits, giving the party an opportunity to evaluate claims.',
      whenApplies: 'Applies as a fundamental principle across civil litigation to encourage settlement before invoking judicial machinery.',
      example: 'A vendor issues a 30-day notice demanding payment before filing a commercial suit in court.',
      relatedLegalArea: 'Civil Procedure / Pre-Litigation',
      sourceReference: 'Code of Civil Procedure, 1908'
    }
  },

  'deposit': {
    id: 'guidance-scenario-deposit',
    timestamp: Date.now(),
    userQuery: 'My landlord refuses to return my deposit.',
    possibleArea: 'Property Law / Tenancy & Security Deposit Recovery',
    category: 'Property',
    summary: 'A landlord cannot unlawfully withhold a tenant\'s security deposit after keys are surrendered. You are entitled to an itemized accounting of actual damages, and unreturned funds accrue statutory interest.',
    whatThisMayInvolve: 'Tenancy agreements stipulate that security deposits protect against unpaid utility bills and physical damage beyond normal wear and tear. If premises were vacated in accordance with notice terms, arbitrary retention of deposit amounts to illegal enrichment and breach of trust.',
    rights: [
      DEMO_RIGHTS[3], // Security deposit refund
      DEMO_RIGHTS[14], // No utility cut
      DEMO_RIGHTS[8]  // Anti-unfair contract
    ],
    routes: [
      {
        id: 'route-1',
        title: 'Formal Demand Notice with Vacating Proofs',
        type: 'Informal / Direct',
        description: 'Send a formal written email attaching the key handover receipt, zero-utility-dues receipts, and photos of the clean premises, demanding repayment in 7 days.',
        timeframe: 'Days 1 – 7 after Vacating',
        costIndicator: 'Low / Free',
        suitability: 'Immediate first step; creates evidentiary base.',
        recommendedFirst: true
      },
      {
        id: 'route-2',
        title: 'Advocate Demand Notice for Restitution & Interest',
        type: 'Formal Legal Action',
        description: 'Instruct an advocate to serve a registered legal notice asserting wrongful retention and warning of summary recovery proceedings with interest.',
        timeframe: 'After 10 – 14 Days',
        costIndicator: 'Moderate',
        suitability: 'Demonstrates serious intent and often compels landlords to settle without court.'
      },
      {
        id: 'route-3',
        title: 'Filing before Rent Authority / Consumer Commission',
        type: 'Regulatory / Grievance',
        description: 'Lodge an application before the Rent Authority or Consumer Commission citing unfair practice and wrongful retention.',
        timeframe: '30 – 60 Days',
        costIndicator: 'Low / Free',
        suitability: 'Empowered tribunal capable of issuing distress warrants against landlord assets.'
      }
    ],
    routeJourney: {
      situation: 'Vacated rental home in accordance with agreement, but landlord refuses deposit refund.',
      legalArea: 'Property Law / Tenancy & Security Deposit Restitution',
      recommendedRoute: 'Compile handover proofs → Send formal 7-day demand notice → Rent Tribunal application.',
      authorityForum: 'Rent Authority / Rent Controller Tribunal',
      primaryDocuments: ['Rental agreement', 'Security deposit bank transfer receipt', 'Move-out video/photos', 'Electricity/maintenance clearance receipts'],
      immediateNextStep: 'Collect final electricity bill clearance and send a dated demand email to the landlord.'
    },
    authority: DEMO_AUTHORITIES[6], // Rent Authority
    documents: [
      {
        id: 'doc-1',
        name: 'Rental Agreement (Signed Copy)',
        purpose: 'Establishes the deposit amount, notice period, and conditions for refund.',
        required: true
      },
      {
        id: 'doc-2',
        name: 'Bank Transaction Proof of Deposit Payment',
        purpose: 'Conclusive evidence that the security deposit was received by the landlord.',
        required: true,
        exampleOrTip: 'Highlight the initial deposit transfer on your bank statement.'
      },
      {
        id: 'doc-3',
        name: 'Move-Out Walkthrough Photos and Videos',
        purpose: 'Proves the physical condition of the property at handover to defeat false damage claims.',
        required: true,
        exampleOrTip: 'Include timestamped photos of walls, kitchen appliances, and sanitary fittings.'
      },
      {
        id: 'doc-4',
        name: 'Utility Bill Clearance Receipts (Electricity, Water, Maintenance)',
        purpose: 'Shows that no outstanding dues remain that could justify deposit retention.',
        required: true
      }
    ],
    timeline: [
      {
        stage: 1,
        title: 'Vacating & Handover Confirmation',
        timeframe: 'Day 0',
        description: 'Surrender keys, record walkthrough video, obtain written acknowledgment.',
        keyAction: 'Save handover proof.'
      },
      {
        stage: 2,
        title: 'Written Refund Demand',
        timeframe: 'Day 1 – 7',
        description: 'Send formal notice demanding deposit refund within 7 to 14 days.',
        keyAction: 'Send registered email.'
      },
      {
        stage: 3,
        title: 'Legal Notice & Escalation',
        timeframe: 'Day 15 – 30',
        description: 'Advocate notice served; complaint filed with local Rent Controller or Consumer Commission.',
        keyAction: 'Initiate tribunal proceedings.'
      }
    ],
    nextSteps: [
      'Check your rental agreement for the exact deposit amount and agreed refund period upon vacating.',
      'Compile all rent payment receipts, the original deposit transfer UTR, and utility clearance receipts.',
      'Send a formal written demand email with a 7-day timeline for full refund.',
      'If the landlord refuses or makes arbitrary deductions, consult an advocate to issue a legal notice.'
    ],
    sources: [
      'Model Tenancy Act & State Rent Control Legislations',
      'Transfer of Property Act, 1882 (Rights of Lessor and Lessee)',
      'Consumer Protection Act (Deficiency in Tenancy Facilitation Services)'
    ],
    disclaimer: 'NyayaPath provides legal information and navigation support. It does not replace qualified legal advice, legal representation, or professional judgment.',
    relevantSectionExplainer: {
      provision: 'Model Tenancy Act (Provisions on Security Deposit)',
      simpleMeaning: 'Restricts residential security deposits to maximum of 2 months rent and mandates refund upon vacation within specified days.',
      whenApplies: 'Governs modern rental agreements, prohibiting landlords from retaining deposits for general wear and tear.',
      example: 'A tenant leaves after 11 months; landlord claims 100% deposit for repainting, which is disallowed as normal wear and tear.',
      relatedLegalArea: 'Tenancy / Property Law',
      sourceReference: 'Model Tenancy Act'
    }
  },

  'defective': {
    id: 'guidance-scenario-defective',
    timestamp: Date.now(),
    userQuery: 'I bought a defective product.',
    possibleArea: 'Consumer Protection / Product Liability & Warranty Breach',
    category: 'Consumer',
    summary: 'Consumers have the statutory right to safe, functional products that match seller representations. If a product fails or is defective, you are entitled to repair, replacement, or a complete refund.',
    whatThisMayInvolve: 'Under modern consumer protection laws, both the manufacturer and the seller (including online marketplaces) share liability for manufacturing flaws, design defects, or deviation from advertised specifications. "No return" or "No refund" clauses cannot override your statutory consumer rights.',
    rights: [
      DEMO_RIGHTS[2], // Replacement/refund
      DEMO_RIGHTS[8], // Anti-unfair contracts
      DEMO_RIGHTS[16] // Right to cancel/cool off
    ],
    routes: [
      {
        id: 'route-1',
        title: 'Grievance Officer Escalation & Ticket Logging',
        type: 'Informal / Direct',
        description: 'Raise an official ticket on the seller\'s customer care portal and email the designated Grievance Officer under E-Commerce Rules.',
        timeframe: 'Day 1 – 3',
        costIndicator: 'Low / Free',
        suitability: 'Mandatory first step under e-commerce consumer regulations.',
        recommendedFirst: true
      },
      {
        id: 'route-2',
        title: 'National Consumer Helpline (NCH) Conciliation',
        type: 'Regulatory / Grievance',
        description: 'Lodge an online grievance via consumerhelpline.gov.in or call 1915. NCH directly loops in registered corporate partners for resolution.',
        timeframe: 'Within 7 – 15 Days',
        costIndicator: 'Low / Free',
        suitability: 'Resolves over 80% of consumer complaints without going to court.'
      },
      {
        id: 'route-3',
        title: 'E-Daakhil Online Consumer Commission Filing',
        type: 'Formal Legal Action',
        description: 'File a formal consumer case on the E-Daakhil portal against the manufacturer and seller claiming refund, compensation, and litigation costs.',
        timeframe: 'After 30 Days of Non-Resolution',
        costIndicator: 'Low / Free',
        suitability: 'Legally binding judicial award with power to award punitive damages.'
      }
    ],
    routeJourney: {
      situation: 'Purchased product has inherent defect or fails under warranty, seller refuses remedy.',
      legalArea: 'Consumer Protection / Product Liability & Deficiency of Service',
      recommendedRoute: 'Preserve invoice & unboxing → File National Consumer Helpline grievance → E-Daakhil.',
      authorityForum: 'National Consumer Helpline (NCH) & District Consumer Commission',
      primaryDocuments: ['Tax invoice / Bill of sale', 'Warranty card / Guarantee terms', 'Photos/videos of defect', 'Customer service chat/email transcript'],
      immediateNextStep: 'Log a formal complaint on consumerhelpline.gov.in or call 1915.'
    },
    authority: DEMO_AUTHORITIES[1], // NCH
    documents: [
      {
        id: 'doc-1',
        name: 'Original Tax Invoice / Receipt',
        purpose: 'Proves the date of purchase, purchase price, seller GSTIN, and serial number.',
        required: true,
        exampleOrTip: 'Download invoice PDF from your e-commerce order history.'
      },
      {
        id: 'doc-2',
        name: 'Warranty Card and Policy Terms',
        purpose: 'Demonstrates that the product is within the active warranty window.',
        required: true
      },
      {
        id: 'doc-3',
        name: 'Photographic & Video Evidence of Defect',
        purpose: 'Visual proof that the product is malfunctioned, broken, or not functioning as described.',
        required: true,
        exampleOrTip: 'Record a clear 30-second video demonstrating the malfunction.'
      },
      {
        id: 'doc-4',
        name: 'Customer Support Communication Logs & Service Job Sheet',
        purpose: 'Proves that the company was alerted and failed to repair or replace within reasonable time.',
        required: true
      }
    ],
    timeline: [
      {
        stage: 1,
        title: 'Seller Grievance Notification',
        timeframe: 'Day 1 – 3',
        description: 'Raise formal service ticket with brand and e-commerce portal with defect photos.',
        keyAction: 'Keep ticket reference number.'
      },
      {
        stage: 2,
        title: 'National Consumer Helpline',
        timeframe: 'Day 4 – 15',
        description: 'Escalate to NCH (1915 or portal) for government-mediated conciliation.',
        keyAction: 'Track NCH grievance status online.'
      },
      {
        stage: 3,
        title: 'Consumer Commission (E-Daakhil)',
        timeframe: 'Day 16 – 60',
        description: 'File consumer case online for refund, interest, and compensation for harassment.',
        keyAction: 'Submit petition via E-Daakhil.'
      }
    ],
    nextSteps: [
      'Locate and save your original invoice and warranty certificate.',
      'Record a clear video showcasing the product malfunction or physical defect.',
      'Call the National Consumer Helpline at 1915 or register your complaint at consumerhelpline.gov.in.',
      'Send a formal final email to the brand’s Grievance Officer indicating intent to approach the District Consumer Commission.'
    ],
    sources: [
      'Consumer Protection Act, 2019 (Section 82 to 87 - Product Liability)',
      'Consumer Protection (E-Commerce) Rules, 2020',
      'Bureau of Indian Standards (BIS) Quality Norms'
    ],
    disclaimer: 'NyayaPath provides legal information and navigation support. It does not replace qualified legal advice, legal representation, or professional judgment.',
    relevantSectionExplainer: {
      provision: 'Section 84 of the Consumer Protection Act, 2019',
      simpleMeaning: 'Liability of product manufacturer for manufacturing defects, deviation from specifications, or failure to contain adequate warnings.',
      whenApplies: 'Enables consumers to claim full financial damages against the maker of defective electronics, appliances, or vehicles.',
      example: 'A new refrigerator compressor burns out in 2 weeks and company service center refuses warranty repair.',
      relatedLegalArea: 'Consumer Protection / Product Liability',
      sourceReference: 'Consumer Protection Act, 2019'
    }
  },

  'business': {
    id: 'guidance-scenario-business',
    timestamp: Date.now(),
    userQuery: 'I have a business dispute.',
    possibleArea: 'Commercial Law / Contractual Breach & Partnership Dispute',
    category: 'Business',
    summary: 'Commercial disputes arising from unpaid invoices, breach of service levels, or partnership disagreements require a tactical review of contract terms, cure periods, and dispute resolution clauses.',
    whatThisMayInvolve: 'Commercial disputes can paralyze cash flows and enterprise operations. Depending on whether your contract contains an arbitration clause or whether you qualify under MSME regulations, specialized fast-track mechanisms like MSME Samadhaan or commercial mediation can resolve disputes without years of ordinary civil litigation.',
    rights: [
      DEMO_RIGHTS[15], // Commercial mediation
      DEMO_RIGHTS[19], // Fair notice & curing period
      DEMO_RIGHTS[9]   // Whistleblower / partner rights
    ],
    routes: [
      {
        id: 'route-1',
        title: 'Notice of Default & Cure Period Invocation',
        type: 'Informal / Direct',
        description: 'Serve a formal contractual Notice of Default citing the exact breached clause and granting the standard 15 to 30-day curing period.',
        timeframe: 'Day 1 – 15',
        costIndicator: 'Low / Free',
        suitability: 'Contractual prerequisite before invoking termination or damages.',
        recommendedFirst: true
      },
      {
        id: 'route-2',
        title: 'MSME Samadhaan Filing (For Registered MSMEs)',
        type: 'Regulatory / Grievance',
        description: 'If you are a registered MSME supplier facing delayed payments beyond 45 days, file directly on the government Samadhaan portal for statutory compound interest.',
        timeframe: 'Within 15 – 30 Days',
        costIndicator: 'Low / Free',
        suitability: 'Fastest and most powerful debt-recovery mechanism for small businesses.'
      },
      {
        id: 'route-3',
        title: 'Pre-Institution Commercial Mediation / Arbitration',
        type: 'Mediation / Conciliation',
        description: 'Trigger the contractual arbitration clause or approach the Commercial Court Mediation Centre for a binding settlement having decree status.',
        timeframe: '30 – 90 Days',
        costIndicator: 'Moderate',
        suitability: 'Enforceable, confidential, and resolves complex commercial terms.'
      }
    ],
    routeJourney: {
      situation: 'Business partner or enterprise client breached commercial agreement or withheld vendor payment.',
      legalArea: 'Commercial Contracts / MSME Delayed Payments & Breach of Agreement',
      recommendedRoute: 'Examine dispute clause → Serve notice of default → MSME Samadhaan or Commercial Mediation.',
      authorityForum: 'MSME Facilitation Council (Samadhaan) / Commercial Court Mediation Desk',
      primaryDocuments: ['Executed master service agreement / Purchase order', 'Accepted invoices & delivery receipts', 'Written email approvals / Milestones', 'Udyam registration certificate (if MSME)'],
      immediateNextStep: 'Verify if your enterprise has an active Udyam MSME certificate and compile unpaid invoices.'
    },
    authority: DEMO_AUTHORITIES[8], // MSME Samadhaan
    documents: [
      {
        id: 'doc-1',
        name: 'Master Service Agreement / Purchase Order (Signed)',
        purpose: 'Establishes agreed scope, payment milestones, cure period, and dispute jurisdiction.',
        required: true
      },
      {
        id: 'doc-2',
        name: 'Invoices with Proof of Delivery / Client Acceptance Sign-off',
        purpose: 'Irrefutable proof that contracted services or goods were delivered and accepted.',
        required: true
      },
      {
        id: 'doc-3',
        name: 'Email Communications Regarding Milestones & Approvals',
        purpose: 'Demonstrates performance and refutes last-minute frivolous claims of deficiency.',
        required: true
      },
      {
        id: 'doc-4',
        name: 'Udyam Registration Certificate (If MSME)',
        purpose: 'Unlocks statutory 45-day payment protections and 3x bank rate interest.',
        required: false,
        exampleOrTip: 'Obtainable from udyamregistration.gov.in.'
      }
    ],
    timeline: [
      {
        stage: 1,
        title: 'Contract Audit & Notice of Default',
        timeframe: 'Day 1 – 15',
        description: 'Audit clauses, check arbitration & jurisdiction, serve notice granting cure window.',
        keyAction: 'Send formal notice.'
      },
      {
        stage: 2,
        title: 'Mediation / Samadhaan Initiation',
        timeframe: 'Day 16 – 45',
        description: 'Lodge case on MSME Samadhaan portal or approach Commercial Court mediation desk.',
        keyAction: 'Attend conciliation.'
      },
      {
        stage: 3,
        title: 'Arbitration / Commercial Court Decree',
        timeframe: 'Day 45 – 120',
        description: 'Arbitral award passed or commercial decree executed against debtor assets.',
        keyAction: 'Enforce award.'
      }
    ],
    nextSteps: [
      'Locate your master agreement and check the "Dispute Resolution" and "Governing Law" clauses.',
      'Check if your business is registered under MSME (Udyam); this enables fast-track recovery through MSME Samadhaan.',
      'Prepare an itemized ledger of unpaid invoices, delivery sign-offs, and communication records.',
      'Serve a formal Notice of Default giving the commercial partner 15 to 30 days to resolve the breach.'
    ],
    sources: [
      'Micro, Small and Medium Enterprises Development (MSMED) Act, 2006 (Section 15 to 18)',
      'Commercial Courts Act, 2015 (Mandatory Pre-Institution Mediation)',
      'Arbitration and Conciliation Act, 1996'
    ],
    disclaimer: 'NyayaPath provides legal information and navigation support. It does not replace qualified legal advice, legal representation, or professional judgment.',
    relevantSectionExplainer: {
      provision: 'Section 16 of the MSMED Act, 2006',
      simpleMeaning: 'Mandatory compound interest with monthly rests at three times the bank rate for payments delayed beyond 45 days.',
      whenApplies: 'Applies automatically to any buyer purchasing goods or services from a registered MSME supplier.',
      example: 'A corporation delays paying a software development startup for 6 months; must pay 3x RBI bank rate interest.',
      relatedLegalArea: 'Business Law / MSME Protection',
      sourceReference: 'Micro, Small and Medium Enterprises Development Act'
    }
  }
};
