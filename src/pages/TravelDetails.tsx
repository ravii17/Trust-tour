import { User, LogOut, Phone, CreditCard, Activity, Calendar, FileText, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const TravelDetails = () => {
    // Mock data for travel details
    const user = {
        name: "Alex Doe",
        id: "TRV-8924-X29"
    };

    const travelInfo = {
        visaType: "Tourist Visa (e-Visa)",
        visaNumber: "VN-89324001",
        visaExpiry: "2026-03-15",
        countryOfIssue: "India",
        entryDate: "2026-02-15",
        allowedStayDays: 30,
        daysRemaining: 21,
        status: "Valid"
    };

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
                                    { icon: <CreditCard className="w-5 h-5" />, label: "Travel Details", path: "/travel-details", active: true },
                                    { icon: <Phone className="w-5 h-5" />, label: "Emergency Contacts", path: "/emergency-contacts", active: false },
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
                            <h1 className="text-3xl font-bold text-slate-900 mb-2">Travel & Visa Details</h1>
                            <p className="text-slate-600">Manage and view your current travel status and visa information.</p>
                        </div>

                        {/* Details Cards */}
                        <div className="grid sm:grid-cols-2 gap-6">
                            
                            {/* Visa Information */}
                            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-lg bg-teal/10 flex items-center justify-center">
                                        <FileText className="w-5 h-5 text-teal" />
                                    </div>
                                    <h2 className="text-xl font-bold text-slate-900">Visa Information</h2>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <p className="text-sm text-slate-500 font-medium">Visa Type</p>
                                        <p className="text-slate-900 font-semibold">{travelInfo.visaType}</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm text-slate-500 font-medium">Visa Number</p>
                                            <p className="text-slate-900 font-semibold">{travelInfo.visaNumber}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-slate-500 font-medium">Status</p>
                                            <p className="text-teal font-semibold flex items-center gap-1">
                                                <CheckCircle2 className="w-4 h-4" /> {travelInfo.status}
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-500 font-medium">Country of Issue</p>
                                        <p className="text-slate-900 font-semibold">{travelInfo.countryOfIssue}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Stay Duration */}
                            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                        <Calendar className="w-5 h-5 text-primary" />
                                    </div>
                                    <h2 className="text-xl font-bold text-slate-900">Stay Duration</h2>
                                </div>

                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm text-slate-500 font-medium">Entry Date</p>
                                            <p className="text-slate-900 font-semibold">{travelInfo.entryDate}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-slate-500 font-medium">Visa Expiry</p>
                                            <p className="text-slate-900 font-semibold">{travelInfo.visaExpiry}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="pt-4 border-t border-slate-100">
                                        <div className="flex justify-between items-end mb-2">
                                            <div>
                                                <p className="text-sm text-slate-500 font-medium">Allowed Stay</p>
                                                <p className="text-slate-900 font-semibold">{travelInfo.allowedStayDays} Days</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm text-slate-500 font-medium">Remaining</p>
                                                <p className="text-xl font-bold text-primary">{travelInfo.daysRemaining} Days</p>
                                            </div>
                                        </div>
                                        
                                        {/* Progress Bar */}
                                        <div className="w-full bg-slate-100 rounded-full h-2.5 mt-2 overflow-hidden">
                                            <div 
                                                className="bg-primary h-2.5 rounded-full" 
                                                style={{ width: `${((travelInfo.allowedStayDays - travelInfo.daysRemaining) / travelInfo.allowedStayDays) * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default TravelDetails;
