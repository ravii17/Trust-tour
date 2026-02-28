import { ShieldAlert, ShieldCheck, MapPin, User, FileText, Activity, AlertTriangle, Calendar, Clock, Navigation, CheckCircle2, Ticket } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Dashboard = () => {
    // Mock data for the dashboard
    const user = {
        name: "Alex Doe",
        id: "TRV-8924-X29",
        visaNumber: "VN-89324001",
        visaExpiry: "2026-03-15", // Expiring soon 
        securityScore: 85,
        status: "Safe",
        location: "Paris, France"
    };

    // Calculate remaining days
    const today = new Date();
    const expiryDate = new Date(user.visaExpiry);
    const timeDiff = expiryDate.getTime() - today.getTime();
    const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));

    // Mock Timeline data
    const timeline = [
        { id: 1, time: "10:30 AM, Mar 1", location: "Charles de Gaulle Airport", status: "Arrived", current: false },
        { id: 2, time: "12:15 PM, Mar 1", location: "Le Meurice Hotel", status: "Checked In", current: false },
        { id: 3, time: "14:00 PM, Mar 1", location: "Eiffel Tower", status: "Visiting", current: true },
    ];

    // Mock Itinerary data (Airbnb/MakeMyTrip style)
    const itinerary = [
        {
            id: 1,
            type: "Stay",
            title: "Le Meurice Hotel",
            date: "Mar 1 - Mar 5",
            image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            details: "Standard Room, City View"
        },
        {
            id: 2,
            type: "Activity",
            title: "Louvre Museum Tour",
            date: "Mar 2, 10:00 AM",
            image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            details: "Skip-the-line Guided Tour"
        }
    ];

    const handleSOS = () => {
        // Implement SOS logic here
        alert("EMERGENCY SOS TRIGGERED! Sending your location and details to authorities.");
    };

    return (
        <div className="min-h-screen bg-background font-sans antialiased flex flex-col">
            <Header />

            <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 bg-muted/30">
                <div className="mx-auto max-w-7xl space-y-8">

                    {/* Header Row & SOS */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-red-100">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-text flex items-center gap-3">
                                Traveler Dashboard
                                {user.status === "Safe" && (
                                    <span className="inline-flex items-center gap-1.5 bg-teal/10 text-teal text-xs font-semibold px-2.5 py-1 rounded-full">
                                        <ShieldCheck className="w-3.5 h-3.5" />
                                        Verified Safe
                                    </span>
                                )}
                            </h1>
                            <p className="text-slate-muted mt-2">Real-time status, active tracking, and itinerary</p>
                        </div>
                        <button
                            onClick={handleSOS}
                            className="group relative inline-flex items-center justify-center gap-2 bg-red-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_25px_rgba(220,38,38,0.6)] hover:bg-red-700 transition-all duration-300 transform hover:-translate-y-0.5 overflow-hidden"
                        >
                            <span className="absolute inset-0 w-full h-full bg-red-500 animate-ping opacity-20 group-hover:opacity-40 rounded-xl"></span>
                            <AlertTriangle className="w-6 h-6 animate-pulse" />
                            EMERGENCY SOS
                        </button>
                    </div>

                    {/* Top Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        {/* Identity & Visa Card */}
                        <div className="bg-card rounded-2xl border border-border shadow-sm p-6 flex flex-col space-y-5">
                            <div className="flex items-center gap-4 border-b border-border pb-5">
                                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center border-2 border-white shadow-sm shrink-0">
                                    <User className="w-8 h-8 text-slate-400" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-slate-text leading-tight">{user.name}</h2>
                                    <p className="text-sm text-slate-muted flex items-center gap-1 mt-1">
                                        <FileText className="w-3.5 h-3.5" /> {user.id}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4 pt-1">
                                <div>
                                    <p className="text-xs text-slate-muted uppercase font-semibold tracking-wider">Visa Number</p>
                                    <p className="text-slate-text font-medium flex items-center gap-2 mt-1">
                                        <Ticket className="w-4 h-4 text-saffron" /> {user.visaNumber}
                                    </p>
                                </div>
                                <div className="flex items-end justify-between bg-orange-50 p-3 rounded-xl border border-orange-100">
                                    <div>
                                        <p className="text-xs text-orange-600 uppercase font-semibold tracking-wider">Visa Expires</p>
                                        <p className="text-slate-text font-bold mt-0.5">{new Date(user.visaExpiry).toLocaleDateString()}</p>
                                    </div>
                                    <div className="text-right">
                                        <span className={`text-2xl font-black ${daysLeft <= 15 ? 'text-red-600' : 'text-orange-600'}`}>
                                            {daysLeft}
                                        </span>
                                        <span className="text-xs text-orange-700 font-medium ml-1">days left</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Security Score Card */}
                        <div className="bg-card rounded-2xl border border-border shadow-sm p-6 flex flex-col items-center justify-center">
                            <h3 className="text-sm font-semibold text-slate-muted uppercase tracking-wider mb-6">Area Security Score</h3>

                            <div className="relative w-36 h-36 flex items-center justify-center">
                                <svg className="w-full h-full transform -rotate-90">
                                    <circle cx="72" cy="72" r="62" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-100" />
                                    <circle
                                        cx="72"
                                        cy="72"
                                        r="62"
                                        stroke="currentColor"
                                        strokeWidth="12"
                                        strokeLinecap="round"
                                        fill="transparent"
                                        strokeDasharray={2 * Math.PI * 62}
                                        strokeDashoffset={2 * Math.PI * 62 * (1 - user.securityScore / 100)}
                                        className="text-teal transition-all duration-1000 ease-out drop-shadow-[0_0_8px_rgba(20,184,166,0.4)]"
                                    />
                                </svg>
                                <div className="absolute flex flex-col items-center justify-center">
                                    <span className="text-4xl font-extrabold text-slate-text">{user.securityScore}</span>
                                    <span className="text-[10px] text-slate-muted uppercase font-bold tracking-widest mt-1">/ 100</span>
                                </div>
                            </div>

                            <div className="mt-6 flex items-center justify-center gap-2 text-sm bg-teal/5 px-4 py-2 rounded-full border border-teal/10">
                                <Activity className="w-4 h-4 text-teal" />
                                <span className="text-slate-text font-medium">Zone is <strong className="text-teal font-bold uppercase text-xs tracking-wide">Optimal</strong></span>
                            </div>
                        </div>

                        {/* Live Map Box */}
                        <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden flex flex-col h-full min-h-[250px] relative group">
                            <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-xl shadow-sm border border-black/5">
                                <h3 className="text-sm font-bold text-slate-text flex items-center gap-2">
                                    <div className="relative flex h-3 w-3">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                                    </div>
                                    Live Tracking
                                </h3>
                                <span className="text-xs font-medium text-slate-500">{user.location}</span>
                            </div>
                            <div className="flex-1 w-full h-full bg-slate-200">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d83998.94722687619!2d2.277019841665155!3d48.8588377391234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e1f06e2b70f%3A0x40b82c3688c9460!2sParis%2C%20France!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0, minHeight: "100%" }}
                                    allowFullScreen={true}
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="absolute inset-0 grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
                                ></iframe>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Split: Timeline & Itinerary */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                        {/* Visited Timeline */}
                        <div className="lg:col-span-1 bg-card rounded-2xl border border-border shadow-sm p-6">
                            <h3 className="text-lg font-bold text-slate-text flex items-center gap-2 mb-6">
                                <Clock className="w-5 h-5 text-saffron" />
                                Visited Timeline
                            </h3>
                            <div className="relative border-l-2 border-slate-200 ml-3 space-y-8 pb-4">
                                {timeline.map((item, index) => (
                                    <div key={item.id} className="relative pl-6">
                                        <span className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 border-white ${item.current ? 'bg-teal animate-pulse shadow-[0_0_10px_rgba(20,184,166,0.6)]' : 'bg-slate-300'}`}></span>
                                        <div className="flex flex-col">
                                            <span className="text-xs font-semibold text-slate-400 mb-1">{item.time}</span>
                                            <span className={`font-bold ${item.current ? 'text-teal' : 'text-slate-text'}`}>{item.location}</span>
                                            <span className="text-sm text-slate-500 flex items-center gap-1 mt-0.5">
                                                {item.current ? <Navigation className="w-3.5 h-3.5 text-teal" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                                                {item.status}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Itinerary (MakeMyTrip / Airbnb style) */}
                        <div className="lg:col-span-2 bg-card rounded-2xl border border-border shadow-sm p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold text-slate-text flex items-center gap-2">
                                    <Calendar className="w-5 h-5 text-teal" />
                                    Upcoming Itinerary
                                </h3>
                                <button className="text-sm font-semibold text-teal hover:text-teal-dark">View All Trips</button>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-5">
                                {itinerary.map((trip) => (
                                    <div key={trip.id} className="group rounded-2xl overflow-hidden border border-border bg-white hover:shadow-md transition-all duration-300 cursor-pointer">
                                        <div className="relative h-40 overflow-hidden">
                                            <img
                                                src={trip.image}
                                                alt={trip.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider text-slate-text shadow-sm">
                                                {trip.type}
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <div className="flex justify-between items-start mb-1">
                                                <h4 className="font-bold text-slate-text text-lg line-clamp-1">{trip.title}</h4>
                                            </div>
                                            <p className="text-sm text-slate-muted mb-3 flex items-center gap-1.5">
                                                <Calendar className="w-4 h-4" /> {trip.date}
                                            </p>
                                            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                                                <span className="text-xs font-medium text-slate-500">{trip.details}</span>
                                                <span className="text-teal font-semibold text-sm">View Details</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button className="w-full mt-6 py-3.5 border border-dashed border-teal/40 bg-teal/5 text-teal font-semibold rounded-xl hover:bg-teal/10 hover:border-teal/60 transition-all flex items-center justify-center gap-2">
                                + Add Stay or Activity
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
