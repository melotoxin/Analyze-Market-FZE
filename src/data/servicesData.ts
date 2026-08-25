export type ServiceSlug =
  | 'company-incorporation'
  | 'company-liquidation-services'
  | 'golden-visa-services'
  | 'license-renewal-pro-services'
  | 'vat-corporate-tax-filing-services'
  | 'audit-and-assurance-services'
  | 'accounting-services';

export interface ServiceDetail {
  slug: ServiceSlug;
  titleEn: string;
  titleAr: string;
  subtitleEn: string;
  subtitleAr: string;
  tagEn: string;
  tagAr: string;
  leadEn: string;
  leadAr: string;
  steps: { title: string; desc: string }[];
  deliverables: string[];
  documents: string[];
  faqs: { q: string; a: string }[];
}

export const SERVICES_CATALOG: Record<ServiceSlug, ServiceDetail> = {
  'company-incorporation': {
    slug: 'company-incorporation',
    titleEn: 'Company Incorporation Services in UAE',
    titleAr: 'تأسيس الشركات وإصدار التراخيص التجارية',
    subtitleEn: 'Turnkey legal incorporation across Mainland DED, 40+ Free Zones, and Offshore holding jurisdictions.',
    subtitleAr: 'إجراءات قانونية متكاملة لتأسيس الشركات في البر الرئيسي والمناطق الحرة والأوفشور',
    tagEn: 'Mainland & Free Zone',
    tagAr: 'البر الرئيسي والمناطق الحرة',
    leadEn: 'Incorporation is the process of creating a commercial entity legally so that it functions as an independent corporate person. Our turnkey formation services manage initial approvals, trade name reservation, notarized Memorandum of Association (MOA), establishment card registration, and guaranteed corporate bank account opening.',
    leadAr: 'تأسيس الشركات هو العملية القانونية لإنشاء كيان تجاري مستقل. تشمل خدماتنا إصدار الموافقة المبدئية وحجز الاسم التجاري وتوثيق عقد التأسيس وبطاقة المنشأة وفتح الحساب البنكي.',
    steps: [
      { title: '1. Select Business Structure & Activity', desc: 'Choose between Mainland LLC, Free Zone (FZE / FZC), or Offshore SPV matching your specific economic activity codes.' },
      { title: '2. Trade Name Reservation & Initial Approval', desc: 'Secure statutory name clearance with the Department of Economic Development (DED) or Free Zone authority.' },
      { title: '3. Draft & Notarize Memorandum of Association (MOA)', desc: 'Preparation of statutory MOA, power of attorney, and electronic notary clearance.' },
      { title: '4. Physical Lease or Smart Flexi-Desk (Ejari)', desc: 'Lease agreement attestation and commercial address allocation.' },
      { title: '5. Trade License Issuance & E-Channel Registration', desc: 'Receipt of commercial license and immigration establishment card for visa processing.' },
      { title: '6. Corporate Bank Account Prequalification', desc: 'Direct dossier submission to UAE tier-1 banks (Wio, Emirates NBD, Mashreq).' }
    ],
    deliverables: [
      'Official UAE Trade License',
      'Notarized Memorandum of Association (MOA)',
      'Commercial Registry Certificate',
      'Establishment Card (Immigration)',
      'Chamber of Commerce Membership',
      'Corporate Bank Account Clearance'
    ],
    documents: [
      'Passport Copies of Shareholders & Directors',
      'Emirates ID & UAE Visa Copy (if resident)',
      '3 Preferred Trade Name Options',
      'Summary of Business Commercial Activities'
    ],
    faqs: [
      {
        q: 'What are the main types of business entities in the UAE?',
        a: 'You can incorporate a Limited Liability Company (LLC) on the Mainland, a Free Zone Establishment (FZE - Solo) or Free Zone Company (FZC - Multiple Shareholders), an Offshore SPV, or a Branch of a foreign/local company.'
      },
      {
        q: 'How long does the incorporation process take?',
        a: 'Trade license issuance takes between 2 to 4 business days once documents are submitted. Residency visas take an additional 3 to 5 business days.'
      }
    ]
  },
  'company-liquidation-services': {
    slug: 'company-liquidation-services',
    titleEn: 'Company Liquidation Services in UAE',
    titleAr: 'خدمات تصفية وإلغاء الشركات',
    subtitleEn: 'Official liquidator appointment, Liquidator’s Report, No-Liability clearance letters, and formal commercial deregistration.',
    subtitleAr: 'إنهاء العمليات المالية وإلغاء السجل التجاري وإصدار تقرير المصفي الرسمي',
    tagEn: 'Official Liquidator',
    tagAr: 'مصفٍ قانوني معتمد',
    leadEn: 'Liquidation is the formal legal process of ending a company’s financial operations and distributing remaining assets to creditors and shareholders. As an accredited advisory firm, we manage the entire statutory liquidation process, author the certified Liquidator’s Report (Statement of Affairs), obtain government clearance letters, and formally deregister the trade license.',
    leadAr: 'التصفية هي الإنهاء القانوني للعمليات المالية للشركة وتوزيع الأصول وسداد الالتزامات. نقوم بتعيين المصفي وإعداد تقرير المصفي واستخراج خطابات براءة الذمة وإلغاء الرخصة.',
    steps: [
      { title: '1. Shareholder Resolution & Liquidator Appointment', desc: 'Drafting board resolution to dissolve company and officially appoint AnalyzeMarkets as certified liquidator.' },
      { title: '2. Preparation of Liquidator’s Statement of Affairs', desc: 'Independent audit of accounts and authoring the official liquidator’s letter / statement of solvency.' },
      { title: '3. Public Newspaper Gazette Notification', desc: 'Publishing mandatory 45-day liquidation advertisement in official Arabic and English newspapers (if required by jurisdiction).' },
      { title: '4. Visa Cancellations & Ministry Clearances', desc: 'Cancelling all employment and investor visas, obtaining Ministry of Human Resources & Emiratisation (MOHRE) clearance.' },
      { title: '5. Customs, Utility & Bank Account Closure', desc: 'Securing no-liability certificates from Federal Tax Authority (FTA), customs, telecommunications, and corporate banks.' },
      { title: '6. Final Trade License Deregistration', desc: 'Submitting final liquidation dossier to DED or Free Zone authority for issuance of the formal License Cancellation Certificate.' }
    ],
    deliverables: [
      'Certified Liquidator’s Statement of Affairs',
      'Official Gazette Publication Affidavits',
      'MOHRE & Immigration Clearances',
      'FTA Corporate Tax De-Registration Clearance',
      'Corporate Bank Account Closure Confirmation',
      'Final Government License Cancellation Certificate'
    ],
    documents: [
      'Original Trade License & Commercial Registry',
      'Original Memorandum of Association (MOA)',
      'Audited Financial Statements up to date of liquidation',
      'Clearance letters from utility providers & landlord',
      'Proof of visa cancellation for all staff'
    ],
    faqs: [
      {
        q: 'Why is an official liquidator required in the UAE?',
        a: 'UAE Commercial Companies Law mandates that a licensed auditor or certified liquidator oversee the dissolution to guarantee that all creditor liabilities, employee dues, and tax obligations are fulfilled.'
      },
      {
        q: 'Can a Free Zone company be liquidated without auditing?',
        a: 'Most Free Zones require a formal liquidation audit report and a liquidator’s acceptance letter before issuing the final deregistration certificate.'
      }
    ]
  },
  'golden-visa-services': {
    slug: 'golden-visa-services',
    titleEn: 'UAE 10-Year Golden Visa Services',
    titleAr: 'خدمات الإقامة الذهبية (10 سنوات)',
    subtitleEn: 'Self-sponsored 10-year residency with 100% family sponsorship, zero local sponsor mandate, and VIP fast-track processing.',
    subtitleAr: 'إقامة طويلة الأمد ذاتية الكفالة للمستثمرين ورواد الأعمال والمدراء التنفيذيين',
    tagEn: '10-Year Long-Term Residence',
    tagAr: 'إقامة 10 سنوات',
    leadEn: 'The UAE Golden Visa is a prestigious 10-year renewable residence permit enabling foreign investors, entrepreneurs, senior executives, and specialized talent to live, work, and study in the UAE without needing a national sponsor. Our concierge team manages nomination files, document attestation, ICP/GDRFA approvals, and VIP medical testing.',
    leadAr: 'تمنح الإقامة الذهبية حق الإقامة والعمل والاستثمار لمدة 10 سنوات قابلة للتجديد دون كفيل، مع كفالة أفراد الأسرة والمرافقين بالكامل.',
    steps: [
      { title: '1. Golden Visa Category & Eligibility Verification', desc: 'Pre-screening qualifying criteria: Real Estate (AED 2M+), Business Founders, Executive Management, or Specialized Talent.' },
      { title: '2. Nomination & Initial Approval Dossier', desc: 'Submission of qualifying documents to Federal Authority for Identity, Citizenship, Customs and Port Security (ICP) or GDRFA Dubai.' },
      { title: '3. Entry Permit & Status Adjustment', desc: 'Issuance of 6-month multiple-entry visa or internal change of status without leaving the country.' },
      { title: '4. VIP Medical Fitness & Biometrics Escort', desc: 'Private VIP concierge escort for expedited medical screening and Emirates ID biometric capture.' },
      { title: '5. 10-Year Residency Stamping & Emirates ID', desc: 'Issuance of the digital and physical 10-year Golden Visa residency card.' },
      { title: '6. Family & Domestic Staff Sponsorship', desc: 'Extending 10-year residency permits to spouses, children (regardless of age), and domestic support staff.' }
    ],
    deliverables: [
      '10-Year UAE Golden Visa Residency Permit',
      'Physical & Digital Emirates ID Cards',
      'VIP Medical Fitness Clearance Certificate',
      'Family Sponsorship File Activation',
      'Tax Residency Certificate Prequalification'
    ],
    documents: [
      'Passport copy (minimum 6 months validity)',
      'Title Deed / Proof of Real Estate Investment (AED 2M+), OR',
      'Company Trade License & Audited Financials, OR',
      'Attested University Degree & Salary Certificate (> AED 30,000/month for Executives)',
      'High-Resolution Digital Photograph'
    ],
    faqs: [
      {
        q: 'Can Golden Visa holders stay outside the UAE for more than 6 months?',
        a: 'Yes! Unlike standard residence visas that expire if you stay outside the UAE for over 180 days, Golden Visa holders can stay outside the country indefinitely without their visa becoming invalid.'
      },
      {
        q: 'Is there an age limit for sponsoring male children under Golden Visa?',
        a: 'No. Golden Visa holders can sponsor their sons up to any age (previously 25), as well as unmarried daughters of any age.'
      }
    ]
  },
  'license-renewal-pro-services': {
    slug: 'license-renewal-pro-services',
    titleEn: 'License Renewal & PRO Services',
    titleAr: 'خدمات تجديد الرخص وخدمات العلاقات العامة',
    subtitleEn: 'Expedited annual trade license renewals, Ejari registration, Establishment Card renewals, and corporate MOA amendments.',
    subtitleAr: 'تجديد سنوي سلس للرخص التجارية وتوثيق عقود الإيجار وبطاقات المنشأة',
    tagEn: 'Annual Maintenance',
    tagAr: 'التجديد السنوي',
    leadEn: 'Maintaining active corporate compliance in the UAE requires timely annual trade license renewals, lease (Ejari) attestations, immigration card updates, and Chamber of Commerce renewals. AnalyzeMarkets FZE provides automated renewal tracking and end-to-end PRO management to prevent government fines and bank account freezes.',
    leadAr: 'نوفر متابعة وتجديد الرخص التجارية السنوية وعقود الإيجاري وبطاقات المنشأة وتعديل الشركاء بسرعة تامة لتجنب الغرامات وتجميد الحسابات.',
    steps: [
      { title: '1. Annual Lease (Ejari) / Flexi-Desk Attestation', desc: 'Securing valid tenancy contract attestation or Free Zone smart office allocation.' },
      { title: '2. External Department Approvals', desc: 'Obtaining specialized ministry clearances (e.g. SIRA, KHDA, DHA, Municipality if applicable).' },
      { title: '3. License Renewal Voucher Payment', desc: 'Settling government fees with DED or Free Zone authority and generating updated trade license.' },
      { title: '4. Establishment Card & E-Channel Renewal', desc: 'Updating immigration files to maintain uninterrupted visa processing capabilities.' },
      { title: '5. Corporate Bank File Update', desc: 'Submitting renewed license to corporate banks to maintain active IBAN & payment gateway status.' }
    ],
    deliverables: [
      'Renewed UAE Trade License',
      'Attested Ejari Tenancy Contract',
      'Updated Immigration Establishment Card',
      'Chamber of Commerce Renewal Certificate',
      'Bank Compliance Update Confirmation'
    ],
    documents: [
      'Current Trade License Copy',
      'Current Tenancy Contract / Ejari',
      'Shareholders’ Passport & Emirates ID copies',
      'Any amended corporate resolutions'
    ],
    faqs: [
      {
        q: 'What happens if a UAE trade license is not renewed on time?',
        a: 'Late renewals incur monthly government fines, freeze on new visa issuance, and eventually lead to corporate bank account suspension by compliance departments.'
      },
      {
        q: 'Can AnalyzeMarkets handle shareholder additions or name changes during renewal?',
        a: 'Yes, we handle simultaneous license amendments, share transfers, and board changes during the annual renewal cycle.'
      }
    ]
  },
  'vat-corporate-tax-filing-services': {
    slug: 'vat-corporate-tax-filing-services',
    titleEn: 'VAT & Corporate Tax Filing Services',
    titleAr: 'خدمات ضريبة الشركات وضريبة القيمة المضافة',
    subtitleEn: 'Federal Tax Authority (FTA) TRN registration, 9% Corporate Tax returns, Qualifying Free Zone Person (QFZP) 0% optimization, and quarterly VAT.',
    subtitleAr: 'تسجيل رقم ضريبي (TRN)، إقرارات ضريبة الشركات بنسبة 9%، واستيفاء معايير الإعفاء الضريبي',
    tagEn: 'FTA Registered Agent',
    tagAr: 'وكيل ضريبي معتمد',
    leadEn: 'Under Federal Decree-Law No. 47 of 2022, UAE businesses are subject to a 9% federal corporate tax rate on taxable net profits exceeding AED 375,000, while Qualifying Free Zone Persons (QFZPs) benefit from 0% on qualifying income. Our certified tax agents ensure 100% FTA compliance, statutory TRN registration, and optimized tax returns.',
    leadAr: 'نقدم خدمات التسجيل الضريبي لدى الهيئة الاتحادية للضرائب، وتقديم إقرارات ضريبة الشركات بنسبة 9%، واستيفاء شروط الإعفاء 0% للشركات المؤهلة في المناطق الحرة.',
    steps: [
      { title: '1. Corporate Tax & VAT Registration', desc: 'Applying for Federal Tax Authority (FTA) Tax Registration Numbers (TRN for VAT and CT).' },
      { title: '2. Qualifying Free Zone Person (QFZP) Substance Audit', desc: 'Evaluating whether your business qualifies for 0% corporate tax under cabinet decision guidelines.' },
      { title: '3. Quarterly VAT 201 Return Filing', desc: 'Reconciliation of input and output VAT, preparing quarterly declarations and settlement vouchers.' },
      { title: '4. Annual Corporate Tax Return Computation', desc: 'Taxable income adjustments, depreciation schedules, and filing Form CT01 within 9 months of financial year-end.' },
      { title: '5. Transfer Pricing & Economic Substance (ESR)', desc: 'Local file, master file, and related-party disclosure documentation.' }
    ],
    deliverables: [
      'Official FTA Tax Registration Numbers (TRN)',
      'Quarterly VAT 201 Filing Acknowledgements',
      'Annual Corporate Tax Return (Form CT01) Submission',
      'QFZP 0% Tax Optimization Assessment Report',
      'Transfer Pricing Local & Master Documentation'
    ],
    documents: [
      'Trade License, MOA, & Certificate of Incorporation',
      'Audited Financial Statements / Trial Balance',
      'Sales Invoices, Purchase Bills & Bank Statements',
      'Customs Declarations (for Import/Export businesses)'
    ],
    faqs: [
      {
        q: 'Does every UAE business have to register for Corporate Tax?',
        a: 'Yes! Registration with the Federal Tax Authority (FTA) for Corporate Tax is mandatory for all taxable persons, including Free Zone entities and holding companies, regardless of revenue level.'
      },
      {
        q: 'What is the corporate tax threshold in the UAE?',
        a: 'Taxable net profit up to AED 375,000 is taxed at 0% to support startups. Net profit exceeding AED 375,000 is taxed at 9%.'
      }
    ]
  },
  'audit-and-assurance-services': {
    slug: 'audit-and-assurance-services',
    titleEn: 'Audit & Assurance Services in UAE',
    titleAr: 'خدمات التدقيق والضمان المالي',
    subtitleEn: 'Statutory annual audit reports, financial assurance, and independent verification accepted by UAE commercial banks and Free Zones.',
    subtitleAr: 'تقارير تدقيق سنوية معتمدة مقبولة لدى كافة البنوك وهيئات المناطق الحرة والوزارات',
    tagEn: 'Certified Audit Reports',
    tagAr: 'تقارير تدقيق معتمدة',
    leadEn: 'Independent audit reports are mandatory for annual Free Zone license renewals, bank loan facilities, corporate tax filing, and shareholder governance. In collaboration with certified chartered accountants, we perform thorough audit procedures conforming to International Financial Reporting Standards (IFRS).',
    leadAr: 'تقارير تدقيق الحسابات المستقلة معتمدة ومتوافقة مع المعايير الدولية لإعداد التقارير المالية (IFRS)، ومقبولة لدى جميع البنوك وهيئات المناطق الحرة.',
    steps: [
      { title: '1. Audit Planning & Risk Assessment', desc: 'Scoping internal controls, accounting systems, and material financial reporting parameters.' },
      { title: '2. Substantive Testing & Balance Sheet Verification', desc: 'Verification of bank balances, trade receivables, revenue recognition, and vendor liabilities.' },
      { title: '3. Preparation of IFRS Compliant Financials', desc: 'Compiling balance sheet, income statement, cash flow statement, and accompanying disclosure notes.' },
      { title: '4. Issuance of Independent Auditor’s Report', desc: 'Signing and stamping certified audit report by licensed chartered accountant.' },
      { title: '5. Submission to Regulatory Authorities', desc: 'Filing audited statements with Free Zone authorities (DMCC, JAFZA, DAFZA, SRTI) and corporate banks.' }
    ],
    deliverables: [
      'Signed Independent Auditor’s Report',
      'Audited Balance Sheet & P&L Statements (IFRS)',
      'Cash Flow & Changes in Equity Statements',
      'Management Letter on Internal Control Observations',
      'Free Zone Portal Financial Upload Confirmation'
    ],
    documents: [
      'General Ledger & Trial Balance',
      'Bank Statements & Year-End Bank Confirmations',
      'Inventory Stock Sheets (if applicable)',
      'Fixed Asset Register & Depreciation Schedules',
      'Major Customer & Supplier Contracts'
    ],
    faqs: [
      {
        q: 'Is an annual audit mandatory for Free Zone companies?',
        a: 'Yes, major Free Zones (including DMCC, JAFZA, DAFZA, RAKEZ, and SRTI) require submitted audited financial statements annually before license renewal.'
      },
      {
        q: 'Are your audit reports accepted by UAE commercial banks?',
        a: 'Yes, our reports are prepared under IFRS and accepted across all tier-1 UAE banks for credit facilities and annual KYC updates.'
      }
    ]
  },
  'accounting-services': {
    slug: 'accounting-services',
    titleEn: 'Cloud Accounting & Bookkeeping Services',
    titleAr: 'خدمات المحاسبة ومسك الدفاتر المالية',
    subtitleEn: 'Monthly bookkeeping, P&L statements, balance sheet reconciliations, Wages Protection System (WPS) payroll, and cloud accounting.',
    subtitleAr: 'إعداد القوائم المالية الشهرية، نظام حماية الأجور (WPS)، وربط البرامج المحاسبية السحابية',
    tagEn: 'Cloud Bookkeeping',
    tagAr: 'محاسبة سحابية',
    leadEn: 'Accurate and timely accounting is the foundation of tax compliance, investor reporting, and financial control. Our dedicated accountants manage your daily transaction entries, bank reconciliations, VAT-ready books, and Wages Protection System (WPS) payroll using modern cloud platforms (Zoho Books, QuickBooks, Xero).',
    leadAr: 'مسك دفاتر محاسبية شهرية منتظمة وإصدار ميزانيات الأرباح والخسائر وحسابات الرواتب عبر نظام حماية الأجور (WPS) وربط البرامج السحابية.',
    steps: [
      { title: '1. Accounting Software Setup & Chart of Accounts', desc: 'Configuring cloud accounting ledger mapped specifically to your UAE industry and FTA VAT rules.' },
      { title: '2. Monthly Transaction Recording & Bank Reconciliation', desc: 'Entering sales invoices, expense receipts, and reconciling all corporate bank accounts.' },
      { title: '3. Wages Protection System (WPS) Payroll Processing', desc: 'Generating SIF files for monthly bank salary disbursements compliant with UAE labor laws.' },
      { title: '4. Monthly Management Accounts Generation', desc: 'Delivering executive P&L statement, balance sheet, and aged receivables report.' },
      { title: '5. Year-End Closing & Tax Preparation', desc: 'Finalizing trial balance for annual audit and corporate tax filing.' }
    ],
    deliverables: [
      'Monthly Profit & Loss (P&L) Statements',
      'Monthly Balance Sheet & Cash Flow Reports',
      'Bank & Credit Card Reconciliation Summaries',
      'Monthly WPS Salary Information Files (SIF)',
      'Quarterly VAT-Ready Transaction Reports',
      'Real-Time Cloud Accounting Dashboard Access'
    ],
    documents: [
      'Monthly Bank Statements in PDF/Excel',
      'Customer Sales Invoices & Agreements',
      'Vendor Bills & Expense Receipts',
      'Employee Salary & Commission Structure'
    ],
    faqs: [
      {
        q: 'Can you migrate our existing spreadsheets into cloud accounting software?',
        a: 'Yes, we set up and migrate your historical data into Zoho Books, QuickBooks, or Xero, configuring UAE VAT tax codes automatically.'
      },
      {
        q: 'How does WPS payroll compliance work in the UAE?',
        a: 'Under MOHRE regulations, private sector salaries must be routed through the central Wages Protection System via electronic SIF files, which our payroll team prepares and submits monthly.'
      }
    ]
  }
};
