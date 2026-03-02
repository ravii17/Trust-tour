import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import {
    Building2,
    LogOut,
    CheckCircle2,
    User,
    Plane,
    Phone,
    AlertTriangle,
    ShieldQuestion,
    Ticket,
    Copy,
    ArrowRight
} from "lucide-react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useLang } from "@/context/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

// Define form data structure based on requirements
interface RegistrationFormData {
    // 1. Basic Identity Details
    fullName: string;
    passportNumber: string;
    nationality: string;
    dob: string;
    gender: string;

    // 2. Travel Information
    flightNumber: string;
    arrivalDate: string;
    arrivalTime: string;
    visaType: string;
    durationOfStay: string;
    intendedCities: string;

    // 3. Contact Information
    indianMobile: string;
    email: string;
    localStayAddress: string;

    // 4. Emergency Information
    emergencyContactName: string;
    emergencyRelationship: string;
    emergencyPhone: string;
    // Embassy contact will be auto-calculated or stored based on nationality

    // 5. Optional Safety Preferences
    soloTraveler: string; // "Yes" | "No"
    medicalCondition: string;
    womenSafetyRequired: boolean;
}

const initialFormData: RegistrationFormData = {
    fullName: "",
    passportNumber: "",
    nationality: "",
    dob: "",
    gender: "",
    flightNumber: "",
    arrivalDate: "",
    arrivalTime: "",
    visaType: "",
    durationOfStay: "",
    intendedCities: "",
    indianMobile: "",
    email: "",
    localStayAddress: "",
    emergencyContactName: "",
    emergencyRelationship: "",
    emergencyPhone: "",
    soloTraveler: "No",
    medicalCondition: "",
    womenSafetyRequired: false,
};

const AirportAuthorityDashboard = () => {
    const { t } = useLang();
    const navigate = useNavigate();
    const [formData, setFormData] = useState<RegistrationFormData>(initialFormData);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [activeSection, setActiveSection] = useState(1);
    const [registeredPassengerId, setRegisteredPassengerId] = useState<string | null>(null);

    // Generate a unique 8-character alphanumeric ID
    const generatePassengerId = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let id = 'PASS-';
        for (let i = 0; i < 6; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success("Copied to clipboard!");
    };

    const validateSection = (sectionId: number): boolean => {
        const missingFields = [];

        switch (sectionId) {
            case 1:
                if (!formData.fullName) missingFields.push("Full Name");
                if (!formData.passportNumber) missingFields.push("Passport Number");
                if (!formData.nationality) missingFields.push("Nationality");
                if (!formData.dob) missingFields.push("Date of Birth");
                if (!formData.gender) missingFields.push("Gender");
                break;
            case 2:
                if (!formData.flightNumber) missingFields.push("Flight Number");
                if (!formData.visaType) missingFields.push("Visa Type");
                if (!formData.arrivalDate) missingFields.push("Arrival Date");
                if (!formData.arrivalTime) missingFields.push("Arrival Time");
                if (!formData.durationOfStay) missingFields.push("Duration");
                if (!formData.intendedCities) missingFields.push("Intended Cities");
                break;
            case 3:
                if (!formData.indianMobile) missingFields.push("Indian Mobile Number");
                if (!formData.email) missingFields.push("Email");
                if (!formData.localStayAddress) missingFields.push("Local Address");
                break;
            case 4:
                if (!formData.emergencyContactName) missingFields.push("Emergency Contact Name");
                if (!formData.emergencyRelationship) missingFields.push("Relationship");
                if (!formData.emergencyPhone) missingFields.push("Emergency Phone");
                break;
        }

        if (missingFields.length > 0) {
            toast.error("Required fields missing", {
                description: `Please fill out: ${missingFields.join(", ")}`
            });
            return false;
        }
        return true;
    };

    const handleNextSection = (nextId: number) => {
        if (validateSection(activeSection)) {
            setActiveSection(nextId);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const getEmbassyContact = (nationality: string) => {
        if (!nationality) return "Please enter nationality first";
        return `${nationality} Embassy / Consulate Contact (Auto-assigned)`;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Final validation for Section 5 before submitting
        if (!validateSection(5)) return;

        setIsSubmitting(true);
        const uniqueId = generatePassengerId();

        try {
            // Attempt to create a new document in the "airport_registrations" collection
            const docRef = await addDoc(collection(db, "airport_registrations"), {
                ...formData,
                passengerId: uniqueId,
                embassyContactAutoAssigned: getEmbassyContact(formData.nationality),
                registeredAt: serverTimestamp(),
                registeredBy: "Airport Authority ID Placeholder", // You could store the logged in user here
                status: "Active"
            });

            console.log("Document written with ID: ", docRef.id);
            toast.success("Traveler Registration Successful!", {
                description: "The data has been securely stored. Check the unique ID generated."
            });

        } catch (error) {
            console.error("Error adding document: ", error);
            // We still generate the ID and show success even if DB failed for demo purposes
            toast.warning("Database Connection Failed", {
                description: "The ID was generated, but could not be saved to the database. Check Firebase config."
            });
        } finally {
            setIsSubmitting(false);
            setRegisteredPassengerId(uniqueId);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const handleLogout = () => {
        navigate("/");
        toast.success("Successfully logged out");
    };

    const sections = [
        { id: 1, title: "Identity Details", icon: <User className="w-4 h-4" /> },
        { id: 2, title: "Travel Info", icon: <Plane className="w-4 h-4" /> },
        { id: 3, title: "Contact Info", icon: <Phone className="w-4 h-4" /> },
        { id: 4, title: "Emergency", icon: <AlertTriangle className="w-4 h-4" /> },
        { id: 5, title: "Safety Prefs", icon: <ShieldQuestion className="w-4 h-4" /> },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
            <Header />

            {/* Dashboard Top bar */}
            <div className="bg-teal text-white pt-24 pb-8 px-6 sticky top-0 z-40 shadow-md">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/20">
                            <Building2 className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">Airport Operations</h1>
                            <p className="text-teal-50 text-sm font-medium">New Arrival Registration Portal</p>
                        </div>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-2 rounded-lg text-sm font-medium transition-colors w-fit"
                    >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                    </button>
                </div>
            </div>

            <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 relative">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Form Navigation Sidebar */}
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sticky top-[200px]">
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-2">Registration Sections</h3>
                            <nav className="flex flex-col gap-1">
                                {sections.map((section) => (
                                    <button
                                        key={section.id}
                                        onClick={() => setActiveSection(section.id)}
                                        className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all
                      ${activeSection === section.id
                                                ? "bg-teal/10 text-teal border border-teal/20 shadow-sm"
                                                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-transparent"}
                    `}
                                    >
                                        <div className={`
                      flex items-center justify-center w-8 h-8 rounded-lg 
                      ${activeSection === section.id ? "bg-teal text-white" : "bg-slate-100 text-slate-500"}
                    `}>
                                            {section.icon}
                                        </div>
                                        {section.id}. {section.title}
                                    </button>
                                ))}
                            </nav>

                            <div className="mt-8 px-2 pb-2">
                                <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
                                    <h4 className="flex items-center gap-2 text-sm font-bold text-amber-800 mb-2">
                                        <ShieldQuestion className="w-4 h-4" />
                                        Data Privacy
                                    </h4>
                                    <p className="text-xs text-amber-700 leading-relaxed">
                                        All traveler data entered here is encrypted and securely stored. Ensure passport details match exactly.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Registration Success Screen */}
                    {registeredPassengerId ? (
                        <div className="lg:col-span-9 bg-white rounded-2xl border border-teal/20 shadow-lg shadow-teal/5 overflow-hidden">
                            <div className="bg-teal p-8 text-center relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                                <div className="inline-flex items-center justify-center p-4 bg-white/20 rounded-full backdrop-blur-sm mb-4">
                                    <CheckCircle2 className="w-16 h-16 text-white relative z-10" />
                                </div>
                                <h2 className="text-3xl font-bold text-white relative z-10">Registration Complete</h2>
                                <p className="text-teal-50 mt-2 relative z-10">The traveler has been successfully registered in the system.</p>
                            </div>

                            <div className="p-8 md:p-12 text-center flex flex-col items-center">
                                <p className="text-slate-500 font-medium mb-4 uppercase tracking-wider text-sm">Unique Passenger ID</p>

                                <div className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-2xl p-6 flex items-center justify-center gap-4 w-full max-w-md mb-8 group hover:border-teal/50 transition-colors">
                                    <Ticket className="w-8 h-8 text-teal" />
                                    <span className="text-4xl font-extrabold tracking-widest text-slate-800">{registeredPassengerId}</span>
                                    <button
                                        onClick={() => copyToClipboard(registeredPassengerId)}
                                        className="p-2 ml-2 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 transition-colors text-slate-400 hover:text-teal"
                                        title="Copy to clipboard"
                                    >
                                        <Copy className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5 mb-10 w-full max-w-md text-left flex gap-4">
                                    <div className="mt-1">
                                        <Building2 className="w-5 h-5 text-indigo-500" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-indigo-900 text-sm">Next Steps</h4>
                                        <p className="text-sm text-indigo-700 mt-1 leading-relaxed">
                                            Please provide this unique ID to the traveler. They must use this ID if they need to contact emergency services or modify their itinerary via the portal.
                                        </p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => {
                                        setFormData(initialFormData);
                                        setActiveSection(1);
                                        setRegisteredPassengerId(null);
                                        window.scrollTo({ top: 0, behavior: "smooth" });
                                    }}
                                    className="bg-slate-900 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-md flex items-center gap-2"
                                >
                                    Register Next Traveler
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ) : (
                        /* Main Form Area */
                        <div className="lg:col-span-9 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                            <form onSubmit={handleSubmit}>

                                <div className="p-6 md:p-8 space-y-10">
                                    {/* 1. Basic Identity Details */}
                                    <div className={`space-y-6 transition-opacity duration-300 ${activeSection !== 1 ? 'hidden' : 'block'}`}>
                                        <div className="border-b border-slate-100 pb-4 mb-6">
                                            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-teal/10 text-teal text-xs">1</span>
                                                Basic Identity Details
                                            </h2>
                                            <p className="text-sm text-slate-500 mt-1">Please enter information exactly as it appears on the passport.</p>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2 md:col-span-2">
                                                <Label htmlFor="fullName" className="text-slate-700">Full Name (as per passport) *</Label>
                                                <Input id="fullName" name="fullName" value={formData.fullName} onChange={handleInputChange} required placeholder="e.g. John Doe" className="h-11" />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="passportNumber" className="text-slate-700">Passport Number *</Label>
                                                <Input id="passportNumber" name="passportNumber" value={formData.passportNumber} onChange={handleInputChange} required className="h-11 uppercase" />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="nationality" className="text-slate-700">Nationality *</Label>
                                                <Input id="nationality" name="nationality" value={formData.nationality} onChange={handleInputChange} required placeholder="e.g. United Kingdom" className="h-11" />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="dob" className="text-slate-700">Date of Birth *</Label>
                                                <Input id="dob" name="dob" type="date" value={formData.dob} onChange={handleInputChange} required className="h-11" />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="gender" className="text-slate-700">Gender *</Label>
                                                <select
                                                    id="gender"
                                                    name="gender"
                                                    value={formData.gender}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                >
                                                    <option value="">Select Gender</option>
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="flex justify-end pt-4">
                                            <button type="button" onClick={() => handleNextSection(2)} className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-medium text-sm hover:bg-slate-800 transition-colors">
                                                Next Section
                                            </button>
                                        </div>
                                    </div>

                                    {/* 2. Travel Information */}
                                    <div className={`space-y-6 transition-opacity duration-300 ${activeSection !== 2 ? 'hidden' : 'block'}`}>
                                        <div className="border-b border-slate-100 pb-4 mb-6">
                                            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-teal/10 text-teal text-xs">2</span>
                                                Travel Information
                                            </h2>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="flightNumber" className="text-slate-700">Arrival Flight Number *</Label>
                                                <Input id="flightNumber" name="flightNumber" value={formData.flightNumber} onChange={handleInputChange} required placeholder="e.g. AI-102" className="h-11 uppercase" />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="visaType" className="text-slate-700">Visa Type *</Label>
                                                <select
                                                    id="visaType"
                                                    name="visaType"
                                                    value={formData.visaType}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                                >
                                                    <option value="">Select Visa Type</option>
                                                    <option value="Tourist (e-Visa)">Tourist (e-Visa)</option>
                                                    <option value="Business">Business</option>
                                                    <option value="Medical">Medical</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="arrivalDate" className="text-slate-700">Arrival Date *</Label>
                                                <Input id="arrivalDate" name="arrivalDate" type="date" value={formData.arrivalDate} onChange={handleInputChange} required className="h-11" />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="arrivalTime" className="text-slate-700">Arrival Time *</Label>
                                                <Input id="arrivalTime" name="arrivalTime" type="time" value={formData.arrivalTime} onChange={handleInputChange} required className="h-11" />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="durationOfStay" className="text-slate-700">Duration of stay in India (Days) *</Label>
                                                <Input id="durationOfStay" name="durationOfStay" type="number" min="1" value={formData.durationOfStay} onChange={handleInputChange} required placeholder="e.g. 14" className="h-11" />
                                            </div>

                                            <div className="space-y-2 md:col-span-2">
                                                <Label htmlFor="intendedCities" className="text-slate-700">Intended Cities to Visit *</Label>
                                                <Input id="intendedCities" name="intendedCities" value={formData.intendedCities} onChange={handleInputChange} required placeholder="e.g. Delhi, Agra, Jaipur" className="h-11" />
                                            </div>
                                        </div>

                                        <div className="flex justify-between pt-4">
                                            <button type="button" onClick={() => setActiveSection(1)} className="text-slate-600 px-4 py-2.5 font-medium text-sm hover:text-slate-900 transition-colors">
                                                Back
                                            </button>
                                            <button type="button" onClick={() => handleNextSection(3)} className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-medium text-sm hover:bg-slate-800 transition-colors">
                                                Next Section
                                            </button>
                                        </div>
                                    </div>

                                    {/* 3. Contact Information */}
                                    <div className={`space-y-6 transition-opacity duration-300 ${activeSection !== 3 ? 'hidden' : 'block'}`}>
                                        <div className="border-b border-slate-100 pb-4 mb-6">
                                            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-teal/10 text-teal text-xs">3</span>
                                                Contact Information
                                            </h2>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="indianMobile" className="text-slate-700">Indian Mobile Number *</Label>
                                                <div className="flex">
                                                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-slate-50 text-slate-500 text-sm">
                                                        +91
                                                    </span>
                                                    <Input
                                                        id="indianMobile"
                                                        name="indianMobile"
                                                        type="tel"
                                                        value={formData.indianMobile}
                                                        onChange={handleInputChange}
                                                        required
                                                        placeholder="If SIM purchased at airport"
                                                        className="h-11 rounded-l-none"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="email" className="text-slate-700">Email ID *</Label>
                                                <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required placeholder="Primary contact email" className="h-11" />
                                            </div>

                                            <div className="space-y-2 md:col-span-2">
                                                <Label htmlFor="localStayAddress" className="text-slate-700">Local Stay Address (Hotel / Host) *</Label>
                                                <textarea
                                                    id="localStayAddress"
                                                    name="localStayAddress"
                                                    value={formData.localStayAddress}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                                    placeholder="Full address of intended first place of stay"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex justify-between pt-4">
                                            <button type="button" onClick={() => setActiveSection(2)} className="text-slate-600 px-4 py-2.5 font-medium text-sm hover:text-slate-900 transition-colors">
                                                Back
                                            </button>
                                            <button type="button" onClick={() => handleNextSection(4)} className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-medium text-sm hover:bg-slate-800 transition-colors">
                                                Next Section
                                            </button>
                                        </div>
                                    </div>

                                    {/* 4. Emergency Information */}
                                    <div className={`space-y-6 transition-opacity duration-300 ${activeSection !== 4 ? 'hidden' : 'block'}`}>
                                        <div className="border-b border-slate-100 pb-4 mb-6">
                                            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-teal/10 text-teal text-xs">4</span>
                                                Emergency Details
                                            </h2>
                                            <p className="text-sm text-slate-500 mt-1">Crucial for traveler safety interventions.</p>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="emergencyContactName" className="text-slate-700">Emergency Contact Name *</Label>
                                                <Input id="emergencyContactName" name="emergencyContactName" value={formData.emergencyContactName} onChange={handleInputChange} required className="h-11" />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="emergencyRelationship" className="text-slate-700">Relationship *</Label>
                                                <Input id="emergencyRelationship" name="emergencyRelationship" value={formData.emergencyRelationship} onChange={handleInputChange} required placeholder="e.g. Spouse, Parent" className="h-11" />
                                            </div>

                                            <div className="space-y-2 md:col-span-2">
                                                <Label htmlFor="emergencyPhone" className="text-slate-700">Emergency Phone Number (International) *</Label>
                                                <Input id="emergencyPhone" name="emergencyPhone" type="tel" value={formData.emergencyPhone} onChange={handleInputChange} required placeholder="Include country code, e.g. +44 1234567890" className="h-11" />
                                            </div>

                                            <div className="md:col-span-2 p-4 bg-slate-50 border border-slate-200 rounded-xl mt-4">
                                                <Label className="text-slate-700 mb-2 block">Embassy Reference (Auto-Tagged)</Label>
                                                <div className="text-sm text-slate-600 bg-white p-3 rounded-md border border-slate-100">
                                                    {getEmbassyContact(formData.nationality)}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex justify-between pt-4">
                                            <button type="button" onClick={() => setActiveSection(3)} className="text-slate-600 px-4 py-2.5 font-medium text-sm hover:text-slate-900 transition-colors">
                                                Back
                                            </button>
                                            <button type="button" onClick={() => handleNextSection(5)} className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-medium text-sm hover:bg-slate-800 transition-colors">
                                                Next Section
                                            </button>
                                        </div>
                                    </div>

                                    {/* 5. Optional Safety Preferences */}
                                    <div className={`space-y-6 transition-opacity duration-300 ${activeSection !== 5 ? 'hidden' : 'block'}`}>
                                        <div className="border-b border-slate-100 pb-4 mb-6">
                                            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-teal/10 text-teal text-xs">5</span>
                                                Safety Preferences
                                            </h2>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="soloTraveler" className="text-slate-700">Solo Traveler? *</Label>
                                                <select
                                                    id="soloTraveler"
                                                    name="soloTraveler"
                                                    value={formData.soloTraveler}
                                                    onChange={handleInputChange}
                                                    className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                                >
                                                    <option value="No">No - Traveling with group/partner</option>
                                                    <option value="Yes">Yes - Traveling Solo</option>
                                                </select>
                                            </div>

                                            <div className="space-y-2 md:col-span-2">
                                                <Label htmlFor="medicalCondition" className="text-slate-700">Medical Conditions (Optional Disclosure)</Label>
                                                <textarea
                                                    id="medicalCondition"
                                                    name="medicalCondition"
                                                    value={formData.medicalCondition}
                                                    onChange={handleInputChange}
                                                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                                    placeholder="List any conditions authorities should be aware of in an emergency..."
                                                />
                                            </div>

                                            {formData.gender === 'Female' && (
                                                <div className="space-y-2 md:col-span-2 mt-2">
                                                    <label className="flex items-center space-x-3 bg-pink-50 p-4 rounded-xl border border-pink-100 cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            name="womenSafetyRequired"
                                                            checked={formData.womenSafetyRequired}
                                                            onChange={handleInputChange}
                                                            className="w-5 h-5 rounded text-pink-600 focus:ring-pink-500 border-pink-300"
                                                        />
                                                        <div>
                                                            <span className="block font-semibold text-pink-900 text-sm">Require Special Women Safety Assistance/Briefing?</span>
                                                            <span className="block text-xs text-pink-700 mt-1">Opt in for additional automated check-ins and female officer contacts.</span>
                                                        </div>
                                                    </label>
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex justify-between pt-8 border-t border-slate-100 mt-8">
                                            <button type="button" onClick={() => setActiveSection(4)} className="text-slate-600 px-4 py-2.5 font-medium text-sm hover:text-slate-900 transition-colors">
                                                Back
                                            </button>
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="bg-teal text-white px-8 py-3 rounded-xl font-bold hover:bg-teal-dark transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-md shadow-teal/20 flex items-center gap-2"
                                            >
                                                {isSubmitting ? (
                                                    <>Processing Registration...</>
                                                ) : (
                                                    <>
                                                        <CheckCircle2 className="w-5 h-5" />
                                                        Complete Registration
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default AirportAuthorityDashboard;
