import React, { createContext, useContext, useState } from "react";

type Language = "en" | "hi";

interface LanguageContextType {
  lang: Language;
  setLang: (l: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Header
    "header.tagline": "Powered by Government of India Tourism Initiative",
    "header.lang_en": "EN",
    "header.lang_hi": "हिंदी",
    "header.tourist_login": "Tourist Login",

    // Hero
    "hero.title": "Your Safety is Our Priority",
    "hero.subtitle":
      "Welcome to India! We are committed to making your journey safe & memorable. Register your yourself and explore with confidence and safety.",
    "hero.badge1": " Encrypted Details",
    "hero.badge2": " 24/7 Support",
    "hero.badge3": " Official Authority Access",

    // Traveler Portal
    "traveler.heading": "Register Your Stay",
    "traveler.subheading":
      "Register yourself here and let us know your journey",
    "traveler.name": "Full Name",
    "traveler.passport": "Passport Number",
    "traveler.phone": "Phone Number",
    "traveler.city": "Current City",
    "traveler.nationality": "Nationality",
    "traveler.name_placeholder": "e.g. John Smith",
    "traveler.passport_placeholder": "e.g. A12345678",
    "traveler.phone_placeholder": "+91 9876878595",
    "traveler.city_placeholder": "e.g. New Delhi",
    "traveler.nationality_placeholder": "e.g. United Kingdom",
    "traveler.submit": "Submit Registration",
    "traveler.submitted": "Registration Submitted!",

    // Authority Portal
    "authority.badge": "Departmental Access Only",
    "authority.heading": "Police / Authority Access",
    "authority.subheading":
      "Secure portal for verified government officials only.",
    "authority.officer_id": "Officer ID",
    "authority.password": "Password",
    "authority.officer_id_placeholder": "Enter your ID",
    "authority.password_placeholder": "Enter your password",
    "authority.login": "Secure Login",
    "authority.note": "Unauthorized access is a punishable offence.",

    // Safety Guide
    "safety.section_title": "Your Safety Companion along your trip",
    "safety.section_sub": "Stay Safe in India With Us", 
    "safety.emergency_title": "National Emergency",
    "safety.emergency_num": "112",
    "safety.emergency_desc": "Dial 112 for any help police, fire, or ambulance available 24/7 across India.",
    "safety.medical_title": "Medical Help",
    "safety.medical_num": "108",
    "safety.medical_desc": "108 Ambulance Services free emergency medical response.",
    "safety.police_title": "Tourist Police",
    "safety.police_num": "1800-111-363",
    "safety.police_desc": "Toll-free helpline dedicated to tourist assistance and safety.",
    "safety.rights_title": "Know Your Rights",
    "safety.rights_desc":
      "As a tourist you have the right to police assistance, fair pricing, and emergency access to all goods.",
    "safety.tips_title": "Safe Travel Tips",
    "safety.tips_desc": "Follow the 5 Golden Rules for a safe and comfortable journey across India.",
    "safety.report_title": "Report an Incident",
    "safety.report_desc": "Experienced a problem? Report it instantly and get help from authorities.",
    "safety.report_btn": "Report Now",

    // Golden Rules
    "rules.title": "5 Golden Rules",
    "rules.subtitle": "for a Safe Journey in India",
    "rules.1_title": "Keep Passport Copies",
    "rules.1_desc": "Always carry digital and physical copies of your passport and visa documents.",
    "rules.2_title": "Share Your Itinerary",
    "rules.2_desc": "Tell someone you trust your travel plan, hotel details, and daily schedule.",
    "rules.3_title": "Use Official Transport",
    "rules.3_desc": "Only use licenced taxis, OLA/UBERS, or book tickets via IRCTC or through any registered apps.",
    "rules.4_title": "Save Numbers Offline or on device",
    "rules.4_desc": "Store emergency contacts 112, 108, Hotel, Family & Tourist Police offline on your device.",
    "rules.5_title": "Register Every City",
    "rules.5_desc": "This portal will keep a track of your location to keep you safe from high risk area.",

    // Report Modal
    "modal.title": "Report an Incident",
    "modal.name": "Your Name as per passport",
    "modal.incident_type": "Incident Type",
    "modal.location": "Location",
    "modal.description": "Description",
    "modal.submit": "Submit Report",
    "modal.cancel": "Cancel",
    "modal.submitted": "Report Submitted!",

    // Footer
    "footer.mission": "Dedicated to making India the safest and most welcoming destination for every traveller.",
    "footer.links_title": "Quick Links",
    "footer.home": "Home",
    "footer.safety": "Safety Guide",
    "footer.emergency": "Emergency Contacts",
    "footer.about": "About",
    "footer.ministry": "Ministry of Tourism, Government of India",
    "footer.rights": "2024 Trust Tour. All rights reserved.",
  },
  hi: {
    // Header
    "header.tagline": "",
    "header.lang_en": "EN",
    "header.lang_hi": "हिंदी",
    "header.tourist_login": "à¤ªà¤°à¥à¤¯à¤Ÿà¤• à¤²à¥‰à¤—à¤¿à¤¨",

    // Hero
    "hero.title": "à¤†à¤ªà¤•à¥€ à¤¸à¥à¤°à¤•à¥à¤·à¤¾ à¤¹à¤®à¤¾à¤°à¥€ à¤ªà¥à¤°à¤¾à¤¥à¤®à¤¿à¤•à¤¤à¤¾ à¤¹à¥ˆ",
    "hero.subtitle":
      "à¤­à¤¾à¤°à¤¤ à¤®à¥‡à¤‚ à¤†à¤ªà¤•à¤¾ à¤¸à¥à¤µà¤¾à¤—à¤¤ à¤¹à¥ˆ! à¤¹à¤® à¤†à¤ªà¤•à¥€ à¤¯à¤¾à¤¤à¥à¤°à¤¾ à¤•à¥‹ à¤¸à¥à¤°à¤•à¥à¤·à¤¿à¤¤, à¤¯à¤¾à¤¦à¤—à¤¾à¤° à¤”à¤° à¤¸à¤®à¥ƒà¤¦à¥à¤§ à¤¬à¤¨à¤¾à¤¨à¥‡ à¤•à¥‡ à¤²à¤¿à¤ à¤ªà¥à¤°à¤¤à¤¿à¤¬à¤¦à¥à¤§ à¤¹à¥ˆà¤‚à¥¤ à¤…à¤ªà¤¨à¤¾ à¤ à¤¹à¤°à¤¾à¤µ à¤ªà¤‚à¤œà¥€à¤•à¥ƒà¤¤ à¤•à¤°à¥‡à¤‚ à¤”à¤° à¤†à¤¤à¥à¤®à¤µà¤¿à¤¶à¥à¤µà¤¾à¤¸ à¤•à¥‡ à¤¸à¤¾à¤¥ à¤…à¤¨à¥à¤µà¥‡à¤·à¤£ à¤•à¤°à¥‡à¤‚à¥¤",
    "hero.badge1": "âœ“ à¤¸à¤¤à¥à¤¯à¤¾à¤ªà¤¿à¤¤ à¤ªà¥à¤²à¥‡à¤Ÿà¤«à¤¼à¥‰à¤°à¥à¤®",
    "hero.badge2": "âœ“ 24/7 à¤¸à¤¹à¤¾à¤¯à¤¤à¤¾",
    "hero.badge3": "âœ“ à¤†à¤§à¤¿à¤•à¤¾à¤°à¤¿à¤• à¤ªà¥à¤°à¤¾à¤§à¤¿à¤•à¤°à¤£ à¤ªà¤¹à¥à¤à¤š",

    // Traveler Portal
    "traveler.heading": "à¤…à¤ªà¤¨à¤¾ à¤ à¤¹à¤°à¤¾à¤µ à¤ªà¤‚à¤œà¥€à¤•à¥ƒà¤¤ à¤•à¤°à¥‡à¤‚",
    "traveler.subheading":
      "à¤¹à¤®à¥‡à¤‚ à¤¬à¤¤à¤¾à¤à¤‚ à¤•à¤¿ à¤†à¤ª à¤¯à¤¹à¤¾à¤ à¤¹à¥ˆà¤‚ à¤¤à¤¾à¤•à¤¿ à¤¹à¤® à¤†à¤ªà¤•à¥€ à¤¯à¤¾à¤¤à¥à¤°à¤¾ à¤•à¥‡ à¤¦à¥Œà¤°à¤¾à¤¨ à¤†à¤ªà¤•à¥‹ à¤¸à¥à¤°à¤•à¥à¤·à¤¿à¤¤ à¤°à¤– à¤¸à¤•à¥‡à¤‚à¥¤",
    "traveler.name": "à¤ªà¥‚à¤°à¤¾ à¤¨à¤¾à¤®",
    "traveler.passport": "à¤ªà¤¾à¤¸à¤ªà¥‹à¤°à¥à¤Ÿ à¤¨à¤‚à¤¬à¤°",
    "traveler.phone": "à¤«à¤¼à¥‹à¤¨ à¤¨à¤‚à¤¬à¤°",
    "traveler.city": "à¤µà¤°à¥à¤¤à¤®à¤¾à¤¨ à¤¶à¤¹à¤°",
    "traveler.nationality": "à¤°à¤¾à¤·à¥à¤Ÿà¥à¤°à¥€à¤¯à¤¤à¤¾",
    "traveler.name_placeholder": "à¤œà¥ˆà¤¸à¥‡: à¤œà¥‰à¤¨ à¤¸à¥à¤®à¤¿à¤¥",
    "traveler.passport_placeholder": "à¤œà¥ˆà¤¸à¥‡: A12345678",
    "traveler.phone_placeholder": "+91 XXXXX XXXXX",
    "traveler.city_placeholder": "à¤œà¥ˆà¤¸à¥‡: à¤¨à¤ˆ à¤¦à¤¿à¤²à¥à¤²à¥€",
    "traveler.nationality_placeholder": "à¤œà¥ˆà¤¸à¥‡: à¤¯à¥‚à¤¨à¤¾à¤‡à¤Ÿà¥‡à¤¡ à¤•à¤¿à¤‚à¤—à¤¡à¤®",
    "traveler.submit": "à¤ªà¤‚à¤œà¥€à¤•à¤°à¤£ à¤œà¤®à¤¾ à¤•à¤°à¥‡à¤‚",
    "traveler.submitted": "à¤ªà¤‚à¤œà¥€à¤•à¤°à¤£ à¤¸à¤«à¤²!",

    // Authority Portal
    "authority.badge": "à¤µà¤¿à¤­à¤¾à¤—à¥€à¤¯ à¤ªà¤¹à¥à¤à¤š",
    "authority.heading": "à¤ªà¥à¤²à¤¿à¤¸ / à¤ªà¥à¤°à¤¾à¤§à¤¿à¤•à¤°à¤£ à¤ªà¤¹à¥à¤à¤š",
    "authority.subheading":
      "à¤¸à¤¤à¥à¤¯à¤¾à¤ªà¤¿à¤¤ à¤¸à¤°à¤•à¤¾à¤°à¥€ à¤”à¤° à¤•à¤¾à¤¨à¥‚à¤¨ à¤ªà¥à¤°à¤µà¤°à¥à¤¤à¤¨ à¤…à¤§à¤¿à¤•à¤¾à¤°à¤¿à¤¯à¥‹à¤‚ à¤•à¥‡ à¤²à¤¿à¤ à¤¸à¥à¤°à¤•à¥à¤·à¤¿à¤¤ à¤ªà¥‹à¤°à¥à¤Ÿà¤²à¥¤",
    "authority.officer_id": "à¤…à¤§à¤¿à¤•à¤¾à¤°à¥€ ID",
    "authority.password": "à¤ªà¤¾à¤¸à¤µà¤°à¥à¤¡",
    "authority.officer_id_placeholder": "à¤…à¤ªà¤¨à¥€ à¤…à¤§à¤¿à¤•à¤¾à¤°à¥€ ID à¤¦à¤°à¥à¤œ à¤•à¤°à¥‡à¤‚",
    "authority.password_placeholder": "à¤…à¤ªà¤¨à¤¾ à¤ªà¤¾à¤¸à¤µà¤°à¥à¤¡ à¤¦à¤°à¥à¤œ à¤•à¤°à¥‡à¤‚",
    "authority.login": "à¤¸à¥à¤°à¤•à¥à¤·à¤¿à¤¤ à¤²à¥‰à¤—à¤¿à¤¨",
    "authority.note": "à¤…à¤¨à¤§à¤¿à¤•à¥ƒà¤¤ à¤ªà¤¹à¥à¤à¤š IT à¤…à¤§à¤¿à¤¨à¤¿à¤¯à¤® 2000 à¤•à¥‡ à¤¤à¤¹à¤¤ à¤¦à¤‚à¤¡à¤¨à¥€à¤¯ à¤…à¤ªà¤°à¤¾à¤§ à¤¹à¥ˆà¥¤",

    // Safety Guide
    "safety.section_title": "à¤†à¤ªà¤•à¤¾ à¤¸à¥à¤°à¤•à¥à¤·à¤¾ à¤¸à¤¾à¤¥à¥€",
    "safety.section_sub": "à¤­à¤¾à¤°à¤¤ à¤®à¥‡à¤‚ à¤¸à¥à¤°à¤•à¥à¤·à¤¿à¤¤ à¤°à¤¹à¥‡à¤‚",
    "safety.emergency_title": "à¤°à¤¾à¤·à¥à¤Ÿà¥à¤°à¥€à¤¯ à¤†à¤ªà¤¾à¤¤à¤•à¤¾à¤²",
    "safety.emergency_num": "112",
    "safety.emergency_desc": "à¤ªà¥à¤²à¤¿à¤¸, à¤…à¤—à¥à¤¨à¤¿ à¤¯à¤¾ à¤à¤®à¥à¤¬à¥à¤²à¥‡à¤‚à¤¸ à¤•à¥‡ à¤²à¤¿à¤ 112 à¤¡à¤¾à¤¯à¤² à¤•à¤°à¥‡à¤‚ â€” à¤ªà¥‚à¤°à¥‡ à¤­à¤¾à¤°à¤¤ à¤®à¥‡à¤‚ 24/7 à¤‰à¤ªà¤²à¤¬à¥à¤§à¥¤",
    "safety.medical_title": "à¤šà¤¿à¤•à¤¿à¤¤à¥à¤¸à¤¾ à¤¸à¤¹à¤¾à¤¯à¤¤à¤¾",
    "safety.medical_num": "108",
    "safety.medical_desc": "108 à¤à¤®à¥à¤¬à¥à¤²à¥‡à¤‚à¤¸ à¤¸à¥‡à¤µà¤¾ â€” à¤¨à¤¿à¤ƒà¤¶à¥à¤²à¥à¤• à¤†à¤ªà¤¾à¤¤à¤•à¤¾à¤²à¥€à¤¨ à¤šà¤¿à¤•à¤¿à¤¤à¥à¤¸à¤¾ à¤ªà¥à¤°à¤¤à¤¿à¤•à¥à¤°à¤¿à¤¯à¤¾à¥¤",
    "safety.police_title": "à¤ªà¤°à¥à¤¯à¤Ÿà¤• à¤ªà¥à¤²à¤¿à¤¸",
    "safety.police_num": "1800-111-363",
    "safety.police_desc": "à¤ªà¤°à¥à¤¯à¤Ÿà¤• à¤¸à¤¹à¤¾à¤¯à¤¤à¤¾ à¤”à¤° à¤¸à¥à¤°à¤•à¥à¤·à¤¾ à¤•à¥‡ à¤²à¤¿à¤ à¤¸à¤®à¤°à¥à¤ªà¤¿à¤¤ à¤Ÿà¥‹à¤²-à¤«à¥à¤°à¥€ à¤¹à¥‡à¤²à¥à¤ªà¤²à¤¾à¤‡à¤¨à¥¤",
    "safety.rights_title": "à¤…à¤ªà¤¨à¥‡ à¤…à¤§à¤¿à¤•à¤¾à¤° à¤œà¤¾à¤¨à¥‡à¤‚",
    "safety.rights_desc":
      "à¤à¤• à¤ªà¤°à¥à¤¯à¤Ÿà¤• à¤•à¥‡ à¤°à¥‚à¤ª à¤®à¥‡à¤‚ à¤†à¤ªà¤•à¥‹ à¤ªà¥à¤²à¤¿à¤¸ à¤¸à¤¹à¤¾à¤¯à¤¤à¤¾, à¤‰à¤šà¤¿à¤¤ à¤®à¥‚à¤²à¥à¤¯ à¤”à¤° à¤†à¤ªà¤¾à¤¤à¤•à¤¾à¤²à¥€à¤¨ à¤•à¤¾à¤‚à¤¸à¥à¤²à¤° à¤ªà¤¹à¥à¤à¤š à¤•à¤¾ à¤…à¤§à¤¿à¤•à¤¾à¤° à¤¹à¥ˆà¥¤",
    "safety.tips_title": "à¤¸à¥à¤°à¤•à¥à¤·à¤¿à¤¤ à¤¯à¤¾à¤¤à¥à¤°à¤¾ à¤Ÿà¤¿à¤ªà¥à¤¸",
    "safety.tips_desc": "à¤­à¤¾à¤°à¤¤ à¤®à¥‡à¤‚ à¤¸à¥à¤°à¤•à¥à¤·à¤¿à¤¤ à¤”à¤° à¤†à¤°à¤¾à¤®à¤¦à¤¾à¤¯à¤• à¤¯à¤¾à¤¤à¥à¤°à¤¾ à¤•à¥‡ à¤²à¤¿à¤ 5 à¤¸à¥à¤¨à¤¹à¤°à¥‡ à¤¨à¤¿à¤¯à¤®à¥‹à¤‚ à¤•à¤¾ à¤ªà¤¾à¤²à¤¨ à¤•à¤°à¥‡à¤‚à¥¤",
    "safety.report_title": "à¤˜à¤Ÿà¤¨à¤¾ à¤•à¥€ à¤°à¤¿à¤ªà¥‹à¤°à¥à¤Ÿ à¤•à¤°à¥‡à¤‚",
    "safety.report_desc": "à¤•à¥‹à¤ˆ à¤¸à¤®à¤¸à¥à¤¯à¤¾ à¤†à¤ˆ? à¤¤à¥à¤°à¤‚à¤¤ à¤°à¤¿à¤ªà¥‹à¤°à¥à¤Ÿ à¤•à¤°à¥‡à¤‚ à¤”à¤° à¤…à¤§à¤¿à¤•à¤¾à¤°à¤¿à¤¯à¥‹à¤‚ à¤¸à¥‡ à¤¸à¤¹à¤¾à¤¯à¤¤à¤¾ à¤ªà¥à¤°à¤¾à¤ªà¥à¤¤ à¤•à¤°à¥‡à¤‚à¥¤",
    "safety.report_btn": "à¤…à¤­à¥€ à¤°à¤¿à¤ªà¥‹à¤°à¥à¤Ÿ à¤•à¤°à¥‡à¤‚",

    // Golden Rules
    "rules.title": "5 à¤¸à¥à¤¨à¤¹à¤°à¥‡ à¤¨à¤¿à¤¯à¤®",
    "rules.subtitle": "à¤­à¤¾à¤°à¤¤ à¤®à¥‡à¤‚ à¤¸à¥à¤°à¤•à¥à¤·à¤¿à¤¤ à¤¯à¤¾à¤¤à¥à¤°à¤¾ à¤•à¥‡ à¤²à¤¿à¤",
    "rules.1_title": "à¤ªà¤¾à¤¸à¤ªà¥‹à¤°à¥à¤Ÿ à¤•à¥€ à¤ªà¥à¤°à¤¤à¤¿à¤¯à¤¾à¤ à¤°à¤–à¥‡à¤‚",
    "rules.1_desc": "à¤…à¤ªà¤¨à¥‡ à¤ªà¤¾à¤¸à¤ªà¥‹à¤°à¥à¤Ÿ à¤”à¤° à¤µà¥€à¤œà¤¼à¤¾ à¤¦à¤¸à¥à¤¤à¤¾à¤µà¥‡à¤œà¤¼à¥‹à¤‚ à¤•à¥€ à¤¡à¤¿à¤œà¤¿à¤Ÿà¤² à¤”à¤° à¤­à¥Œà¤¤à¤¿à¤• à¤ªà¥à¤°à¤¤à¤¿à¤¯à¤¾à¤ à¤¹à¤®à¥‡à¤¶à¤¾ à¤¸à¤¾à¤¥ à¤°à¤–à¥‡à¤‚à¥¤",
    "rules.2_title": "à¤…à¤ªà¤¨à¥€ à¤¯à¤¾à¤¤à¥à¤°à¤¾ à¤¯à¥‹à¤œà¤¨à¤¾ à¤¸à¤¾à¤à¤¾ à¤•à¤°à¥‡à¤‚",
    "rules.2_desc": "à¤•à¤¿à¤¸à¥€ à¤µà¤¿à¤¶à¥à¤µà¤¸à¤¨à¥€à¤¯ à¤µà¥à¤¯à¤•à¥à¤¤à¤¿ à¤•à¥‹ à¤…à¤ªà¤¨à¥€ à¤¯à¤¾à¤¤à¥à¤°à¤¾ à¤¯à¥‹à¤œà¤¨à¤¾, à¤¹à¥‹à¤Ÿà¤² à¤µà¤¿à¤µà¤°à¤£ à¤”à¤° à¤¦à¥ˆà¤¨à¤¿à¤• à¤•à¤¾à¤°à¥à¤¯à¤•à¥à¤°à¤® à¤¬à¤¤à¤¾à¤à¤‚à¥¤",
    "rules.3_title": "à¤†à¤§à¤¿à¤•à¤¾à¤°à¤¿à¤• à¤ªà¤°à¤¿à¤µà¤¹à¤¨ à¤‰à¤ªà¤¯à¥‹à¤— à¤•à¤°à¥‡à¤‚",
    "rules.3_desc": "à¤•à¥‡à¤µà¤² à¤ªà¥à¤°à¥€-à¤ªà¥‡à¤¡ à¤Ÿà¥ˆà¤•à¥à¤¸à¥€, à¤à¤ª-à¤•à¥ˆà¤¬ à¤¯à¤¾ à¤¸à¤°à¤•à¤¾à¤° à¤¦à¥à¤µà¤¾à¤°à¤¾ à¤…à¤§à¤¿à¤•à¥ƒà¤¤ à¤ªà¤°à¤¿à¤µà¤¹à¤¨ à¤¸à¥‡à¤µà¤¾à¤“à¤‚ à¤•à¤¾ à¤‰à¤ªà¤¯à¥‹à¤— à¤•à¤°à¥‡à¤‚à¥¤",
    "rules.4_title": "à¤¨à¤‚à¤¬à¤° à¤‘à¤«à¤²à¤¾à¤‡à¤¨ à¤¸à¥‡à¤µ à¤•à¤°à¥‡à¤‚",
    "rules.4_desc": "112, 108, à¤ªà¤°à¥à¤¯à¤Ÿà¤• à¤ªà¥à¤²à¤¿à¤¸ à¤œà¥ˆà¤¸à¥‡ à¤†à¤ªà¤¾à¤¤à¤•à¤¾à¤²à¥€à¤¨ à¤¨à¤‚à¤¬à¤° à¤…à¤ªà¤¨à¥‡ à¤¡à¤¿à¤µà¤¾à¤‡à¤¸ à¤ªà¤° à¤‘à¤«à¤²à¤¾à¤‡à¤¨ à¤¸à¤‚à¤—à¥à¤°à¤¹à¥€à¤¤ à¤•à¤°à¥‡à¤‚à¥¤",
    "rules.5_title": "à¤¹à¤° à¤¶à¤¹à¤° à¤®à¥‡à¤‚ à¤ªà¤‚à¤œà¥€à¤•à¤°à¤£ à¤•à¤°à¥‡à¤‚",
    "rules.5_desc": "à¤œà¤¬ à¤­à¥€ à¤†à¤ª à¤•à¤¿à¤¸à¥€ à¤¨à¤ à¤¶à¤¹à¤° à¤®à¥‡à¤‚ à¤ªà¤¹à¥à¤à¤šà¥‡à¤‚, à¤‡à¤¸ à¤ªà¥‹à¤°à¥à¤Ÿà¤² à¤•à¤¾ à¤‰à¤ªà¤¯à¥‹à¤— à¤•à¤°à¤•à¥‡ à¤…à¤ªà¤¨à¤¾ à¤ à¤¹à¤°à¤¾à¤µ à¤ªà¤‚à¤œà¥€à¤•à¥ƒà¤¤ à¤•à¤°à¥‡à¤‚à¥¤",

    // Report Modal
    "modal.title": "à¤˜à¤Ÿà¤¨à¤¾ à¤•à¥€ à¤°à¤¿à¤ªà¥‹à¤°à¥à¤Ÿ à¤•à¤°à¥‡à¤‚",
    "modal.name": "à¤†à¤ªà¤•à¤¾ à¤¨à¤¾à¤®",
    "modal.incident_type": "à¤˜à¤Ÿà¤¨à¤¾ à¤•à¤¾ à¤ªà¥à¤°à¤•à¤¾à¤°",
    "modal.location": "à¤¸à¥à¤¥à¤¾à¤¨",
    "modal.description": "à¤µà¤¿à¤µà¤°à¤£",
    "modal.submit": "à¤°à¤¿à¤ªà¥‹à¤°à¥à¤Ÿ à¤œà¤®à¤¾ à¤•à¤°à¥‡à¤‚",
    "modal.cancel": "à¤°à¤¦à¥à¤¦ à¤•à¤°à¥‡à¤‚",
    "modal.submitted": "à¤°à¤¿à¤ªà¥‹à¤°à¥à¤Ÿ à¤œà¤®à¤¾ à¤¹à¥‹ à¤—à¤ˆ!",

    // Footer
    "footer.mission": "à¤ªà¥à¤°à¤¤à¥à¤¯à¥‡à¤• à¤¯à¤¾à¤¤à¥à¤°à¥€ à¤•à¥‡ à¤²à¤¿à¤ à¤­à¤¾à¤°à¤¤ à¤•à¥‹ à¤¸à¤¬à¤¸à¥‡ à¤¸à¥à¤°à¤•à¥à¤·à¤¿à¤¤ à¤”à¤° à¤¸à¥à¤µà¤¾à¤—à¤¤ à¤¯à¥‹à¤—à¥à¤¯ à¤—à¤‚à¤¤à¤µà¥à¤¯ à¤¬à¤¨à¤¾à¤¨à¥‡ à¤•à¥‡ à¤²à¤¿à¤ à¤¸à¤®à¤°à¥à¤ªà¤¿à¤¤à¥¤",
    "footer.links_title": "à¤¤à¥à¤µà¤°à¤¿à¤¤ à¤²à¤¿à¤‚à¤•",
    "footer.home": "à¤¹à¥‹à¤®",
    "footer.safety": "à¤¸à¥à¤°à¤•à¥à¤·à¤¾ à¤—à¤¾à¤‡à¤¡",
    "footer.emergency": "à¤†à¤ªà¤¾à¤¤à¤•à¤¾à¤²à¥€à¤¨ à¤¸à¤‚à¤ªà¤°à¥à¤•",
    "footer.about": "à¤¹à¤®à¤¾à¤°à¥‡ à¤¬à¤¾à¤°à¥‡ à¤®à¥‡à¤‚",
    "footer.ministry": "à¤ªà¤°à¥à¤¯à¤Ÿà¤¨ à¤®à¤‚à¤¤à¥à¤°à¤¾à¤²à¤¯, à¤­à¤¾à¤°à¤¤ à¤¸à¤°à¤•à¤¾à¤°",
    "footer.rights": "Â© 2024 à¤Ÿà¥à¤°à¤¸à¥à¤Ÿ à¤Ÿà¥‚à¤°à¥¤ à¤¸à¤°à¥à¤µà¤¾à¤§à¤¿à¤•à¤¾à¤° à¤¸à¥à¤°à¤•à¥à¤·à¤¿à¤¤à¥¤",
  },
};

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  t: (k) => k,
});

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLang] = useState<Language>("en");
  const t = (key: string) => translations[lang][key] ?? key;
  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = () => useContext(LanguageContext);

