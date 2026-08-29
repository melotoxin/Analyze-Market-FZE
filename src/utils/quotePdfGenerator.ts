import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export interface QuoteDetails {
  clientName: string;
  clientPhone: string;
  jurisdiction: string;
  activity: string;
  visaCount: number;
  totalFormatted: string;
  currency: string;
}

export const generateQuotePdf = (details: QuoteDetails) => {
  const doc = new jsPDF();

  // 1. Header & Branding Banner
  doc.setFillColor(15, 23, 42); // Deep Charcoal #0F172A
  doc.rect(0, 0, 210, 38, 'F');

  // Title
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('ANALYZEMARKETS FZE', 14, 18);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(203, 213, 225); // #CBD5E1
  doc.text('Sharjah Research Technology & Innovation Park (SRTI Park)', 14, 25);
  doc.text('Block B - Office #B34-B047 | License #B34-B047 | www.amdxb.com', 14, 31);

  // Quote Badge Top Right
  doc.setFillColor(16, 185, 129); // Emerald
  doc.roundedRect(145, 12, 51, 14, 2, 2, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.text('OFFICIAL TARIFF PROPOSAL', 147, 18);
  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.text('VALID FOR 30 DAYS (2026)', 147, 23);

  // 2. Client & Mandate Details
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Executive Mandate Summary', 14, 48);

  const dateStr = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  const clientInfo = [
    ['Client Name:', details.clientName || 'Valued Corporate Client', 'Date Issued:', dateStr],
    ['Phone / WhatsApp:', details.clientPhone || '+971 56 339 6961', 'Status:', 'Pre-Approved Tariff (2026)'],
    ['Structure:', details.jurisdiction.toUpperCase(), 'Commercial Scope:', details.activity]
  ];

  autoTable(doc, {
    startY: 52,
    body: clientInfo,
    theme: 'plain',
    styles: { fontSize: 8, cellPadding: 2, textColor: [51, 65, 85] },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 35 },
      1: { cellWidth: 65 },
      2: { fontStyle: 'bold', cellWidth: 30 },
      3: { cellWidth: 60 }
    }
  });

  // 3. Itemized Government & Service Tariff Breakdown
  const tableY = (doc as any).lastAutoTable.finalY + 8;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('Itemized Scope & Deliverables', 14, tableY);

  const items = [
    [
      '1',
      `${details.jurisdiction} Trade License & Registration`,
      'Includes Trade Name Reservation, Initial Approval, Notarized MOA, and Government Registry Filing',
      'Included'
    ],
    [
      '2',
      `Residence Investor / Employment Visas (${details.visaCount}x)`,
      'VIP Medical Fast-Track, Emirates ID Biometrics, Entry Permits, and Status Adjustment Stamping',
      `Included (${details.visaCount} Visas)`
    ],
    [
      '3',
      'Corporate Bank Account Fast-Track (Tier-1)',
      'Dedicated compliance file preparation and pre-clearance with Wio Bank, Emirates NBD, or Mashreq Bank',
      'Included'
    ],
    [
      '4',
      'Registered Office & E-Channel Registration',
      'Smart flexi-desk lease agreement attestation and Ministry of Interior immigration portal activation',
      'Included'
    ],
    [
      '5',
      'Dedicated Executive Concierge Support',
      'Full legal accompaniment through all federal departments with 0% hidden surcharge guarantee',
      'Included'
    ]
  ];

  autoTable(doc, {
    startY: tableY + 4,
    head: [['#', 'Item / Milestone', 'Detailed Legal Scope', 'Allocation']],
    body: items,
    theme: 'grid',
    headStyles: {
      fillColor: [15, 23, 42],
      textColor: [255, 255, 255],
      fontSize: 8,
      fontStyle: 'bold'
    },
    styles: { fontSize: 8, cellPadding: 3, textColor: [30, 41, 59] },
    columnStyles: {
      0: { cellWidth: 10, halign: 'center' },
      1: { fontStyle: 'bold', cellWidth: 50 },
      2: { cellWidth: 90 },
      3: { cellWidth: 35, fontStyle: 'bold', halign: 'center' }
    }
  });

  // 4. Total Amount Block
  const totalY = (doc as any).lastAutoTable.finalY + 6;
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(14, totalY, 182, 22, 2, 2, 'FD');

  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(100, 116, 139);
  doc.text('TOTAL ALL-INCLUSIVE ESTIMATE (NO HIDDEN FEES):', 20, totalY + 14);

  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text(details.totalFormatted, 190, totalY + 15, { align: 'right' });

  // 5. Authority & Accreditation SLA
  const slaY = totalY + 28;
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('AnalyzeMarkets FZE Regulatory SLA Commitments:', 14, slaY);

  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  const slaText = [
    '• Turnaround Guarantee: Standard license issuance within 2 to 4 business days upon document submission.',
    '• Tier-1 Banking: 99.8% first-time account clearance with automated corporate IBAN generation.',
    '• Tax & Substance: Comprehensive assistance for 0% Qualifying Free Zone Person (QFZP) tax status compliance.'
  ];
  doc.text(slaText, 14, slaY + 5);

  // 6. Footer
  doc.setDrawColor(226, 232, 240);
  doc.line(14, 275, 196, 275);

  doc.setFontSize(7);
  doc.setTextColor(148, 163, 184);
  doc.text('Headquarters: SRTI Park, Block B - Office #B34-B047, Sharjah, UAE | Direct Hotline: +971 56 339 6961 | Email: contact@amdxb.com', 105, 282, { align: 'center' });

  // Trigger browser download
  const cleanName = details.clientName ? details.clientName.replace(/[^a-zA-Z0-9]/g, '_') : 'Company';
  doc.save(`AM_DXB_Proposal_${cleanName}_2026.pdf`);
};
