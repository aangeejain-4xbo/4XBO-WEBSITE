// Centralized contact details used across the site.
// Change the number / email here and it updates everywhere.

export const WHATSAPP_NUMBER = "971585099086";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

// "Book a Consultation" dial-to-call number (E.164 format).
export const CONSULTATION_PHONE = "+971585099086";

// "Request Demo" email recipient.
export const DEMO_REQUEST_EMAIL = "inquiry@4xbo.com";

/** Build a WhatsApp click-to-chat URL, optionally with a prefilled message. */
export const waLink = (message?: string): string =>
  message ? `${WHATSAPP_URL}?text=${encodeURIComponent(message)}` : WHATSAPP_URL;

// Common prefilled WhatsApp messages
export const WA_CONSULT_MSG = "Hello I would like to book a consultation with 4X BackOffice";
export const WA_DEMO_MSG = "Hello I would like to request a demo for 4X BackOffice";
export const WA_DETAILS_MSG = "Hello I would like to request details for 4X BackOffice services";
