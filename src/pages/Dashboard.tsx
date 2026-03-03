import { ShieldCheck, MapPin, User, Activity, AlertTriangle, LogOut, Phone, CreditCard, Clock, Bell, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Dashboard = () => {
    // Mock data for the dashboard
    const user = {
        name: "Alex Doe",
        id: "TRV-8924-X29",
        visaNumber: "VN-89324001",
        visaExpiry: "2026-03-15",
        status: "Protected",
        location: "New Delhi, India"
    };

    const handleSOS = () => {
        alert("EMERGENCY SOS TRIGGERED! Sending your location and details to authorities.");
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans antialiased flex flex-col pt-16">
            <Header />

            <main className="flex-1 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Left Sidebar */}
                    <aside className="w-full lg:w-72 shrink-0 space-y-6">
                        {/* Profile Section */}
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
                                    { icon: <User className="w-5 h-5" />, label: "Profile", active: true },
                                    { icon: <CreditCard className="w-5 h-5" />, label: "Travel Details", active: false },
                                    { icon: <Phone className="w-5 h-5" />, label: "Emergency Contacts", active: false },
                                    { icon: <Activity className="w-5 h-5" />, label: "Safety Status", active: false },
                                ].map((item) => (
                                    <a
                                        key={item.label}
                                        href="#"
                                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-colors ${item.active
                                            ? 'bg-primary/5 text-primary'
                                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                            }`}
                                    >
                                        {item.icon}
                                        {item.label}
                                    </a>
                                ))}
                            </nav>

                            <div className="pt-6 mt-6 border-t border-slate-100">
                                <a href="/" className="flex items-center gap-3 px-3 py-2 text-slate-500 hover:text-red-600 font-medium transition-colors rounded-xl hover:bg-red-50">
                                    <LogOut className="w-5 h-5" />
                                    Logout
                                </a>
                            </div>
                        </div>
                    </aside>

                    {/* Right Main Area */}
                    <div className="flex-1 space-y-6">

                        {/* Welcome & Top Status Banner */}
                        <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-teal/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />

                            <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                                <div>
                                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome back, {user.name.split(' ')[0]}</h1>
                                    <p className="text-slate-600">Your travel profile is active and being monitored.</p>
                                </div>

                                <div className="flex items-center gap-3 px-5 py-3 bg-teal/10 border border-teal/20 rounded-xl">
                                    <div className="relative flex h-3 w-3">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-teal"></span>
                                    </div>
                                    <div>
                                        <p className="text-xs text-teal-dark font-semibold uppercase tracking-wider">Current Status</p>
                                        <p className="text-lg font-bold text-teal flex items-center gap-1.5"><ShieldCheck className="w-5 h-5" /> {user.status}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Stats Grid */}
                        <div className="grid sm:grid-cols-2 gap-6">

                            {/* Location Card */}
                            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Live Location</h3>
                                    <MapPin className="w-5 h-5 text-primary" />
                                </div>
                                <p className="text-2xl font-bold text-slate-900">{user.location}</p>
                                <p className="text-sm text-slate-500 mt-2">Last synced: Just now</p>

                                <div className="mt-6 h-32 bg-slate-100 rounded-xl overflow-hidden relative grayscale opacity-70">
                                    {/* Mock map embed */}
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.83923192776!2d77.0688975472061!3d28.527582006175955!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x52c2b7494e204dce!2sNew%20Delhi%2C%20Delhi%2C%20India!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen={false}
                                        loading="lazy"
                                    ></iframe>
                                    <div className="absolute inset-0 bg-primary/10 pointer-events-none" />
                                </div>
                            </div>

                            {/* Alert/Notifications Card */}
                            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm flex flex-col">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Recent Alerts</h3>
                                    <Bell className="w-5 h-5 text-slate-400" />
                                </div>

                                <div className="flex-1 flex flex-col justify-center items-center text-center p-6 bg-slate-50 rounded-xl border border-slate-100 border-dashed">
                                    <CheckCircle2 className="w-10 h-10 text-slate-300 mb-3" />
                                    <p className="text-slate-600 font-medium">No recent alerts</p>
                                    <p className="text-sm text-slate-400 mt-1">Your area is currently secure.</p>
                                </div>
                            </div>
                        </div>

                        {/* Emergency Container */}
                        <div className="bg-red-50 rounded-2xl border border-red-100 p-8 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
                            <div>
                                <h3 className="text-xl font-bold text-red-900 mb-2">Require Immediate Assistance?</h3>
                                <p className="text-red-700/80 max-w-lg">
                                    Tap the emergency button to immediately share your live location with the nearest authorities and your emergency contacts.
                                </p>
                            </div>

                            <button
                                onClick={handleSOS}
                                className="shrink-0 relative group inline-flex items-center justify-center gap-2 bg-red-600 text-white px-8 py-5 rounded-2xl font-bold text-lg shadow-[0_4px_20px_rgba(220,38,38,0.3)] hover:shadow-[0_8px_30px_rgba(220,38,38,0.5)] hover:bg-red-700 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden min-w-[200px]"
                            >
                                <span className="absolute inset-0 w-full h-full bg-red-500 animate-ping opacity-20 group-hover:opacity-40 rounded-2xl" style={{ animationDuration: '2s' }}></span>
                                <AlertTriangle className="w-6 h-6 animate-pulse" />
                                SOS HELP
                            </button>
                        </div>

                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Dashboard;
