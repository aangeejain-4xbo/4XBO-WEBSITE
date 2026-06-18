// Centralized contact details used across the site.
// Change the number / email here and it updates everywhere.

export const WHATSAPP_NUMBER = "971585099086";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

// "Book a Consultation" dial-to-call number (E.164 format).
export const CONSULTATION_PHONE = "+971585099086";
// Human-formatted version of CONSULTATION_PHONE for display in the UI.
export const CONSULTATION_PHONE_DISPLAY = "+971 58 509 9086";

// "Request Demo" email recipient. Also the general business contact address.
export const DEMO_REQUEST_EMAIL = "inquiry@4xbo.com";
export const CONTACT_EMAIL = DEMO_REQUEST_EMAIL;

// ---------------------------------------------------------------------------
// Company identity + NAP (Name / Address / Phone) — feeds LocalBusiness schema,
// the visible footer/contact blocks, and social metadata.
// ---------------------------------------------------------------------------
export const COMPANY_NAME = "4X BackOffice";
export const SITE_URL = "https://4xbo.com";

// Headquarters postal address.
// NOTE: street + postalCode are intentionally blank — fill them with the real
// registered address to unlock Google local-pack / map eligibility. Schema
// builders omit any field left empty, so blanks never ship as bad data.
export const HQ_ADDRESS = {
  street: "",          // e.g. "Office 1203, XYZ Tower, DIFC"
  locality: "Dubai",
  region: "Dubai",
  postalCode: "",      // e.g. "00000"
  country: "AE",       // ISO 3166-1 alpha-2 (UAE)
};

// Visible operational hubs (used for local-SEO copy + areaServed schema).
export const OFFICE_LOCATIONS = ["Dubai", "Hong Kong", "Singapore", "London"];

/** Build a WhatsApp click-to-chat URL, optionally with a prefilled message. */
export const waLink = (message?: string): string =>
  message ? `${WHATSAPP_URL}?text=${encodeURIComponent(message)}` : WHATSAPP_URL;

// Common prefilled WhatsApp messages
export const WA_CONSULT_MSG = "Hello I would like to book a consultation with 4X BackOffice";
export const WA_DEMO_MSG = "Hello I would like to request a demo for 4X BackOffice";
export const WA_DETAILS_MSG = "Hello I would like to request details for 4X BackOffice services";
