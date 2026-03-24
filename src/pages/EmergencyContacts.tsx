import { User, LogOut, Phone, CreditCard, Activity, Users, AlertCircle, PhoneCall, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const EmergencyContacts = () => {
    // Mock user data
    const user = {
        name: "Alex Doe",
        id: "TRV-8924-X29"
    };

    const emergencyContacts = [
        {
            id: 1,
            name: "Sarah Doe",
            relation: "Spouse",
            phone: "+1 (555) 123-4567",
            email: "sarah.doe@example.com",
            address: "123 Main St, New York, NY 10001",
            primary: true
        },
        {
            id: 2,
            name: "Robert Doe",
            relation: "Father",
            phone: "+1 (555) 987-6543",
            email: "robert.doe@example.com",
            address: "456 Oak Lane, Boston, MA 02108",
            primary: false
        },
        {
            id: 3,
            name: "Emily Chen",
            relation: "Sister",
            phone: "+1 (555) 555-0199",
            email: "emily.chen@example.com",
            address: "789 Pine Rd, Seattle, WA 98101",
            primary: false
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 font-sans antialiased flex flex-col pt-16">
            <Header />

            <main className="flex-1 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Left Sidebar */}
                    <aside className="w-full lg:w-72 shrink-0 space-y-6">
                        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                                    <User className="w-6 h-6 text-slate-400" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-slate-900 leading-tight">{user.name}</h2>
                                    <p className="text-sm text-slate-500">{user.id}</p>
                                </div>
                            </div>

                            <nav className="space-y-1 mt-4">
                                {[
                                    { icon: <User className="w-5 h-5" />, label: "Profile", path: "/dashboard", active: false },
                                    { icon: <CreditCard className="w-5 h-5" />, label: "Travel Details", path: "/travel-details", active: false },
                                    { icon: <Phone className="w-5 h-5" />, label: "Emergency Contacts", path: "/emergency-contacts", active: true },
                                    { icon: <Activity className="w-5 h-5" />, label: "Safety Status", path: "/safety-status", active: false },
                                ].map((item) => (
                                    <Link
                                        key={item.label}
                                        to={item.path}
                                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-colors ${item.active
                                            ? 'bg-primary/5 text-primary'
                                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                            }`}
                                    >
                                        {item.icon}
                                        {item.label}
                                    </Link>
                                ))}
                            </nav>

                            <div className="pt-6 mt-6 border-t border-slate-100">
                                <Link to="/" className="flex items-center gap-3 px-3 py-2 text-slate-500 hover:text-red-600 font-medium transition-colors rounded-xl hover:bg-red-50">
                                    <LogOut className="w-5 h-5" />
                                    Logout
                                </Link>
                            </div>
                        </div>
                    </aside>

                    {/* Right Main Area */}
                    <div className="flex-1 space-y-6">
                        {/* Title Banner */}
                        <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                                    <AlertCircle className="w-5 h-5 text-red-600" />
                                </div>
                                <h1 className="text-3xl font-bold text-slate-900">Emergency Contacts</h1>
                            </div>
                            <p className="text-slate-600 pl-13 mt-2">These family members will be notified automatically in case of an SOS alert.</p>
                        </div>

                        {/* Contacts List */}
                        <div className="space-y-4">
                            {emergencyContacts.map((contact) => (
                                <div key={contact.id} className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                                    <div className="flex items-center gap-5">
                                        <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                                            <Users className="w-6 h-6 text-slate-400" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-3 mb-1">
                                                <h3 className="text-xl font-bold text-slate-900">{contact.name}</h3>
                                                {contact.primary && (
                                                    <span className="bg-primary/10 text-primary text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">Primary</span>
                                                )}
                                            </div>
                                            <p className="text-sm font-medium text-slate-500">{contact.relation}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto mt-4 md:mt-0">
                                        <div className="flex items-center gap-2 bg-slate-50 px-4 py-3 rounded-xl">
                                            <Phone className="w-4 h-4 text-slate-400" />
                                            <span className="text-slate-700 font-medium">{contact.phone}</span>
                                        </div>
                                        <button className="flex items-center justify-center gap-2 bg-slate-100 text-slate-700 px-5 py-3 rounded-xl hover:bg-slate-200 transition-colors font-medium">
                                            <MessageSquare className="w-4 h-4" />
                                            SMS
                                        </button>
                                        <button className="flex items-center justify-center gap-2 bg-primary text-white px-5 py-3 rounded-xl hover:bg-primary/90 transition-colors font-medium">
                                            <PhoneCall className="w-4 h-4" />
                                            Call
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default EmergencyContacts;
