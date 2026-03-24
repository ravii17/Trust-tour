import { User, LogOut, Phone, CreditCard, Activity, MapPin, ShieldCheck, ShieldAlert, Navigation } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const SafetyStatus = () => {
    // Mock user data
    const user = {
        name: "Alex Doe",
        id: "TRV-8924-X29"
    };

    const safetyData = {
        currentLocation: "New Delhi, India",
        overallScore: 85, // out of 100
        status: "Safe Zone", // Safe, Moderate, High Risk
        metrics: [
            { category: "Petty Crime", score: 70, description: "Moderate risk of pickpocketing in crowded areas." },
            { category: "Violent Crime", score: 95, description: "Very low risk." },
            { category: "Health & Medical", score: 80, description: "Good access to medical facilities." },
            { category: "Transport Safety", score: 75, description: "Use trusted transport apps." }
        ],
        recentAlerts: [
            { id: 1, type: "Traffic", message: "Heavy congestion expected on Ring Road.", time: "2 hours ago", severity: "low" }
        ],
        nearbySafeZones: [
            { name: "Connaught Place Police HQ", distance: "2.4 km" },
            { name: "Max Super Speciality Hospital", distance: "3.1 km" }
        ]
    };

    const getScoreColor = (score: number) => {
        if (score >= 80) return "text-teal bg-teal/10";
        if (score >= 60) return "text-amber-600 bg-amber-100";
        return "text-red-600 bg-red-100";
    };

    const getProgressBarColor = (score: number) => {
        if (score >= 80) return "bg-teal";
        if (score >= 60) return "bg-amber-500";
        return "bg-red-500";
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
                                    { icon: <CreditCard className="w-5 h-5" />, label: "Travel Details", path: "/travel-details", active: false },
                                    { icon: <Phone className="w-5 h-5" />, label: "Emergency Contacts", path: "/emergency-contacts", active: false },
                                    { icon: <Activity className="w-5 h-5" />, label: "Safety Status", path: "/safety-status", active: true },
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
                        <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-teal/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
                            
                            <div className="relative z-10">
                                <h1 className="text-3xl font-bold text-slate-900 mb-2">Location Safety Status</h1>
                                <p className="text-slate-600 flex items-center gap-2">
                                    <MapPin className="w-4 h-4" /> 
                                    Currently tracking in <strong>{safetyData.currentLocation}</strong>
                                </p>
                            </div>

                            <div className="relative z-10 shrink-0 flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                <div className="text-right">
                                    <p className="text-sm text-slate-500 font-medium uppercase tracking-wider mb-1">Overall Score</p>
                                    <div className="flex items-end gap-2 justify-end">
                                        <span className="text-4xl font-black text-slate-900 leading-none">{safetyData.overallScore}</span>
                                        <span className="text-slate-400 font-medium">/100</span>
                                    </div>
                                </div>
                                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${getScoreColor(safetyData.overallScore)}`}>
                                    {safetyData.overallScore >= 80 ? (
                                        <ShieldCheck className="w-8 h-8" />
                                    ) : (
                                        <ShieldAlert className="w-8 h-8" />
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="grid lg:grid-cols-3 gap-6">
                            {/* Left Column: Metrics */}
                            <div className="lg:col-span-2 space-y-6">
                                <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                                    <h2 className="text-xl font-bold text-slate-900 mb-6">Category Analysis</h2>
                                    
                                    <div className="space-y-6">
                                        {safetyData.metrics.map((metric, idx) => (
                                            <div key={idx}>
                                                <div className="flex justify-between items-end mb-2">
                                                    <div>
                                                        <p className="font-bold text-slate-900">{metric.category}</p>
                                                        <p className="text-sm text-slate-500">{metric.description}</p>
                                                    </div>
                                                    <div className={`px-2.5 py-1 rounded-lg text-sm font-bold ${getScoreColor(metric.score)}`}>
                                                        {metric.score}/100
                                                    </div>
                                                </div>
                                                {/* Progress Bar */}
                                                <div className="w-full bg-slate-100 rounded-full h-2 mt-3 overflow-hidden">
                                                    <div 
                                                        className={`h-2 rounded-full ${getProgressBarColor(metric.score)}`}
                                                        style={{ width: `${metric.score}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Safe Zones & Alerts */}
                            <div className="space-y-6">
                                {/* Local Alerts */}
                                <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                                    <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                                        <Activity className="w-5 h-5 text-amber-500" />
                                        Local Advisories
                                    </h3>
                                    
                                    {safetyData.recentAlerts.length > 0 ? (
                                        <div className="space-y-3">
                                            {safetyData.recentAlerts.map(alert => (
                                                <div key={alert.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                                                    <p className="text-xs text-slate-400 font-medium mb-1">{alert.time}</p>
                                                    <p className="text-slate-700 text-sm font-medium">{alert.message}</p>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-slate-500 text-sm">No active advisories for your area.</p>
                                    )}
                                </div>

                                {/* Nearby Safe Zones */}
                                <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                                    <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                                        <Navigation className="w-5 h-5 text-primary" />
                                        Nearby Safe Zones
                                    </h3>
                                    <div className="space-y-3">
                                        {safetyData.nearbySafeZones.map((zone, idx) => (
                                            <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 group hover:border-primary/30 transition-colors cursor-pointer">
                                                <p className="text-sm font-semibold text-slate-700 group-hover:text-primary transition-colors">{zone.name}</p>
                                                <span className="text-xs font-bold text-slate-400 bg-white px-2 py-1 rounded-md shadow-sm">{zone.distance}</span>
                                            </div>
                                        ))}
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

export default SafetyStatus;
