export type ServiceSlug =
  | 'company-incorporation'
  | 'company-liquidation-services'
  | 'golden-visa-services'
  | 'license-renewal-pro-services'
  | 'vat-corporate-tax-filing-services'
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


/**
 * Short menu labels + one-line blurbs. The navbar, footer, service-detail rail and
 * consultation dropdown each used to hand-maintain their own copy of this list; they
 * had already drifted (the accounting service went out under four different names).
 * Everything menu-shaped now derives from here.
 */
export interface ServiceNavEntry {
  slug: ServiceSlug;
  label: string;
  tag: string;
  desc: string;
}

const SERVICE_NAV_DATA: Record<
  ServiceSlug,
  { labelEn: string; labelAr: string; tagEn: string; tagAr: string; descEn: string; descAr: string }
> = {
  'company-incorporation': {
    labelEn: 'Company Incorporation',
    labelAr: 'تأسيس الشركات وإصدار التراخيص',
    tagEn: 'Mainland & Free Zone',
    tagAr: 'بر رئيسي ومناطق حرة',
    descEn: 'Turnkey formation across Mainland DED, 40+ Free Zones, and Offshore SPVs.',
    descAr: 'تأسيس متكامل في البر الرئيسي وأكثر من 40 منطقة حرة والشركات الخارجية.',
  },
  'company-liquidation-services': {
    labelEn: 'Company Liquidation & De-Registration',
    labelAr: 'تصفية الشركات وشطب الرخص',
    tagEn: 'De-Registration Support',
    tagAr: 'دعم شطب الرخصة',
    descEn: 'Closure file preparation, licensed liquidator coordination, and formal de-registration.',
    descAr: 'تجهيز ملف الإغلاق والتنسيق مع مصفٍّ مرخّص وشطب الرخصة رسمياً.',
  },
  'golden-visa-services': {
    labelEn: 'Golden Visa Services',
    labelAr: 'خدمات الإقامة الذهبية (10 سنوات)',
    tagEn: '10-Year Long-Term',
    tagAr: 'إقامة 10 سنوات',
    descEn: '10-year Golden Visa processing for investors, founders, and specialized talent.',
    descAr: 'إجراءات الإقامة الذهبية لعشر سنوات للمستثمرين والمؤسسين وأصحاب الكفاءات.',
  },
  'license-renewal-pro-services': {
    labelEn: 'License Renewal (PRO) Services',
    labelAr: 'خدمات تجديد الرخص (PRO)',
    tagEn: 'Annual Compliance',
    tagAr: 'الامتثال السنوي',
    descEn: 'Trade license renewals, Ejari attestation, and Establishment Card renewals.',
    descAr: 'تجديد الرخص التجارية وتصديق الإيجاري وتجديد بطاقة المنشأة.',
  },
  'vat-corporate-tax-filing-services': {
    labelEn: 'VAT & Corporate Tax Filing',
    labelAr: 'ضريبة الشركات والقيمة المضافة',
    tagEn: 'Corporate Tax 9%',
    tagAr: 'ضريبة الشركات 9%',
    descEn: 'FTA TRN registration support, 9% Corporate Tax filing, and QFZP eligibility review.',
    descAr: 'دعم تسجيل الرقم الضريبي وإقرارات ضريبة الشركات ومراجعة أهلية الإعفاء.',
  },
  'accounting-services': {
    labelEn: 'Cloud Accounting Software',
    labelAr: 'حلول برامج المحاسبة السحابية',
    tagEn: 'Third-Party Software',
    tagAr: 'برامج خارجية',
    descEn: 'Setup, integration and support for third-party cloud accounting software.',
    descAr: 'تهيئة وربط ودعم برامج المحاسبة السحابية من مزودين خارجيين.',
  },
};

export const SERVICE_SLUGS = Object.keys(SERVICE_NAV_DATA) as ServiceSlug[];

/** Menu entries in display order, resolved for the active language. */
export function getServiceNav(lang: 'en' | 'ar'): ServiceNavEntry[] {
  const ar = lang === 'ar';
  return SERVICE_SLUGS.map((slug) => {
    const e = SERVICE_NAV_DATA[slug];
    return {
      slug,
      label: ar ? e.labelAr : e.labelEn,
      tag: ar ? e.tagAr : e.tagEn,
      desc: ar ? e.descAr : e.descEn,
    };
  });
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
    titleEn: 'Company Liquidation & De-Registration Support',
    titleAr: 'خدمات تصفية وإلغاء الشركات',
    subtitleEn: 'End-to-end coordination of company closure: liquidator liaison, clearance letters, visa cancellation and formal trade licence de-registration.',
    subtitleAr: 'تنسيق كامل لإجراءات إغلاق الشركة: التنسيق مع المصفي، خطابات براءة الذمة، إلغاء التأشيرات وشطب الرخصة التجارية',
    tagEn: 'De-Registration Support',
    tagAr: 'دعم شطب الرخصة',
    leadEn: 'Liquidation is the formal legal process of ending a company’s financial operations and settling obligations to creditors and shareholders. UAE law requires the Liquidator’s Report to be issued by a licensed auditor or registered liquidator — a role we do not perform. We manage everything around it: preparing the closure file, appointing and coordinating a licensed liquidator on your behalf, obtaining government clearance letters, cancelling visas and accounts, and submitting the final de-registration dossier.',
    leadAr: 'التصفية هي الإنهاء القانوني للعمليات المالية للشركة وسداد الالتزامات. يشترط القانون الإماراتي أن يصدر تقرير المصفي عن مدقق حسابات مرخّص أو مصفٍّ مسجَّل، وهو دور لا نقوم به. نتولى ما عدا ذلك: تجهيز ملف الإغلاق، والتنسيق مع مصفٍّ مرخّص نيابةً عنك، واستخراج خطابات براءة الذمة، وإلغاء التأشيرات والحسابات، وتقديم ملف الشطب النهائي.',
    steps: [
      { title: '1. Shareholder Resolution & Liquidator Appointment', desc: 'Drafting the shareholder, partner, or General Assembly resolution to dissolve the company and coordinating appointment of a licensed third-party liquidator on your behalf.' },
      { title: '2. Closure File Preparation & Liquidator Liaison', desc: 'Compiling the accounts and records the appointed liquidator needs, and managing correspondence until the Liquidator’s Report is issued.' },
      { title: '3. Public Newspaper Gazette Notification', desc: 'Publishing mandatory 45-day liquidation advertisement in official Arabic and English newspapers (if required by jurisdiction).' },
      { title: '4. Visa Cancellations & Ministry Clearances', desc: 'Cancelling all employment and investor visas, obtaining Ministry of Human Resources & Emiratisation (MOHRE) clearance.' },
      { title: '5. Customs, Utility & Bank Account Closure', desc: 'Securing no-liability certificates from Federal Tax Authority (FTA), customs, telecommunications, and corporate banks.' },
      { title: '6. Final Trade License Deregistration', desc: 'Submitting final liquidation dossier to DED or Free Zone authority for issuance of the formal License Cancellation Certificate.' }
    ],
    deliverables: [
      'Liquidator’s Report obtained from the appointed licensed liquidator',
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
        q: 'Who acts as the official liquidator?',
        a: 'A licensed audit firm or registered liquidator, appointed on your behalf. UAE Commercial Companies Law reserves that role for licensed auditors, so AnalyzeMarkets does not perform it. We select and engage the liquidator, prepare the file they require, and manage every other step of the closure.'
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
    subtitleEn: 'Federal Tax Authority (FTA) TRN registration support, 9% Corporate Tax returns, Qualifying Free Zone Person (QFZP) eligibility review, and quarterly VAT.',
    subtitleAr: 'تسجيل رقم ضريبي (TRN)، إقرارات ضريبة الشركات بنسبة 9%، واستيفاء معايير الإعفاء الضريبي',
    tagEn: 'Corporate Tax & VAT Filing',
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
  'accounting-services': {
    slug: 'accounting-services',
    titleEn: 'Cloud Accounting Software Solutions',
    titleAr: 'حلول برامج المحاسبة السحابية',
    subtitleEn: 'Implementation, migration and support for third-party cloud accounting platforms, including Wages Protection System (WPS) payroll file configuration.',
    subtitleAr: 'تهيئة وربط ودعم برامج المحاسبة السحابية من مزودين خارجيين، بما في ذلك إعداد ملفات نظام حماية الأجور (WPS)',
    tagEn: 'Third-Party Software',
    tagAr: 'برامج خارجية',
    leadEn: 'We are a technology and advisory partner, not your bookkeeper. We help you select, configure and adopt third-party cloud accounting software (Zoho Books, QuickBooks, Xero) — mapping a UAE chart of accounts, applying FTA VAT tax codes, configuring Wages Protection System (WPS) payroll files, migrating your historical data, and training your team. Your own staff or your appointed accountant keeps the books inside the platform.',
    leadAr: 'نحن شريك تقني واستشاري ولسنا محاسبك. نساعدك في اختيار وتهيئة واعتماد برامج المحاسبة السحابية من مزودين خارجيين (Zoho Books وQuickBooks وXero)، مع إعداد دليل الحسابات ورموز ضريبة القيمة المضافة وملفات نظام حماية الأجور (WPS)، ونقل بياناتك التاريخية وتدريب فريقك. يتولى فريقك أو محاسبك المعيَّن مسك الدفاتر داخل النظام.',
    steps: [
      { title: '1. Platform Selection & Licensing', desc: 'Comparing third-party cloud accounting platforms against your sector, transaction volume and budget, then arranging the software subscription.' },
      { title: '2. Chart of Accounts & VAT Configuration', desc: 'Configuring the ledger structure for your UAE industry and applying the correct FTA VAT tax codes inside the software.' },
      { title: '3. Historical Data Migration', desc: 'Importing your existing spreadsheets or prior system data into the new platform and validating opening balances.' },
      { title: '4. WPS Payroll File Configuration', desc: 'Setting up the payroll module so your team can generate MOHRE-compliant SIF files for salary disbursement.' },
      { title: '5. Team Training & Ongoing Support', desc: 'Training your staff to operate the platform day to day, with a support channel for configuration questions.' }
    ],
    deliverables: [
      'Configured Cloud Accounting Platform Account',
      'UAE Chart of Accounts & FTA VAT Tax Codes',
      'Validated Historical Data Migration',
      'WPS Payroll Module Configuration',
      'Reporting Templates for P&L and Balance Sheet',
      'Team Training Session & Written Handover Guide'
    ],
    documents: [
      'Existing accounting records or spreadsheets to migrate',
      'Trade licence and FTA TRN certificate (for VAT setup)',
      'Corporate bank account details for feed configuration',
      'Employee salary structure (for payroll module setup)'
    ],
    faqs: [
      {
        q: 'Do you keep our books for us?',
        a: 'No. Our licence covers software implementation and advisory, not bookkeeping. We configure the third-party platform, migrate your data and train your team; your own staff or an appointed accountant records the transactions. We can introduce you to a licensed accounting firm if you need one.'
      },
      {
        q: 'How is WPS payroll handled?',
        a: 'Under MOHRE regulations, private sector salaries must be routed through the Wages Protection System via electronic SIF files. We configure the payroll module so your team can generate compliant SIF files each month; the submission itself stays with you and your bank.'
      }
    ]
  }
};
