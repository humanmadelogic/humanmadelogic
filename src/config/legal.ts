/**
 * Legal and compliance pages. PLACEHOLDER: owner must supply or approve all body text.
 */

export type LegalSection = {
  id: string;
  title: string;
  /** PLACEHOLDER notes for the owner, not final legal text */
  placeholderNote: string;
};

export type LegalPageContent = {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
};

const placeholder =
  'PLACEHOLDER: Human Made Logic legal counsel must draft and approve the final text for this section.';

export const privacyPage: LegalPageContent = {
  title: 'Privacy policy',
  updated: 'PLACEHOLDER: insert last reviewed date',
  intro:
    'PLACEHOLDER: This privacy policy will explain how Human Made Logic collects, uses, and protects personal data for visitors in the UK, Australia, Canada, and Singapore.',
  sections: [
    { id: 'controller', title: 'Who we are', placeholderNote: placeholder },
    { id: 'data-we-collect', title: 'Data we collect', placeholderNote: placeholder },
    { id: 'lawful-basis', title: 'Lawful basis and purposes', placeholderNote: placeholder },
    { id: 'retention', title: 'Retention', placeholderNote: placeholder },
    { id: 'sharing', title: 'Sharing and processors', placeholderNote: placeholder },
    { id: 'international', title: 'International transfers', placeholderNote: placeholder },
    { id: 'rights', title: 'Your rights', placeholderNote: placeholder },
    { id: 'contact', title: 'Contact and complaints', placeholderNote: placeholder },
  ],
};

export const cookiePage: LegalPageContent = {
  title: 'Cookie policy',
  updated: 'PLACEHOLDER: insert last reviewed date',
  intro:
    'PLACEHOLDER: This cookie policy will list the cookies and similar technologies used on humanmadelogic.com, including consent controls.',
  sections: [
    { id: 'what-are-cookies', title: 'What cookies are', placeholderNote: placeholder },
    { id: 'essential', title: 'Strictly necessary cookies', placeholderNote: placeholder },
    { id: 'analytics', title: 'Analytics', placeholderNote: placeholder },
    { id: 'marketing', title: 'Marketing and pixels', placeholderNote: placeholder },
    { id: 'consent', title: 'How we obtain consent', placeholderNote: placeholder },
    { id: 'manage', title: 'How to manage choices', placeholderNote: placeholder },
  ],
};

export const termsPage: LegalPageContent = {
  title: 'Terms of use',
  updated: 'PLACEHOLDER: insert last reviewed date',
  intro:
    'PLACEHOLDER: These terms will govern use of the Human Made Logic website and any materials published on it.',
  sections: [
    { id: 'agreement', title: 'Agreement', placeholderNote: placeholder },
    { id: 'use', title: 'Permitted use', placeholderNote: placeholder },
    { id: 'ip', title: 'Intellectual property', placeholderNote: placeholder },
    { id: 'disclaimer', title: 'Disclaimer', placeholderNote: placeholder },
    { id: 'liability', title: 'Limitation of liability', placeholderNote: placeholder },
    { id: 'law', title: 'Governing law', placeholderNote: placeholder },
  ],
};

export const accessibilityPage: LegalPageContent = {
  title: 'Accessibility statement',
  updated: 'PLACEHOLDER: insert last reviewed date',
  intro:
    'PLACEHOLDER: This statement will describe accessibility standards Human Made Logic aims to meet and how to report issues.',
  sections: [
    { id: 'commitment', title: 'Our commitment', placeholderNote: placeholder },
    { id: 'standard', title: 'Conformance target', placeholderNote: placeholder },
    { id: 'testing', title: 'Testing and feedback', placeholderNote: placeholder },
    { id: 'contact', title: 'Request assistance', placeholderNote: placeholder },
  ],
};

export const companyPage: LegalPageContent = {
  title: 'Company information',
  updated: 'PLACEHOLDER: insert last reviewed date',
  intro:
    'PLACEHOLDER: Registered company details, trading name, and regulatory information for UK transparency requirements.',
  sections: [
    { id: 'legal-entity', title: 'Legal entity', placeholderNote: placeholder },
    { id: 'registered-office', title: 'Registered office', placeholderNote: placeholder },
    { id: 'registration', title: 'Company registration', placeholderNote: placeholder },
    { id: 'vat', title: 'VAT and tax identifiers', placeholderNote: placeholder },
    { id: 'contact', title: 'Business contact', placeholderNote: placeholder },
  ],
};
