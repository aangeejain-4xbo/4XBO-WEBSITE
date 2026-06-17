export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string; // Lucide icon lookup name
}

export interface WhyUsCard {
  id: string;
  title: string;
  description: string;
  iconName: string;
  isActive?: boolean;
}

export interface MapMarker {
  id: string;
  city: string;
  coordinates: { x: number; y: number }; // Percentage position on the custom SVG map
  timezone: string;
  status: string;
  details: string;
}

export interface ContactFormInputs {
  name: string;
  email: string;
  phoneCode: string;
  phoneNumber: string;
  message: string;
}
