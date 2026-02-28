import React, { useState } from "react";
import { ShieldAlert, Map as MapIcon, Megaphone, AlertOctagon, TriangleAlert, Bell, Plus, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/components/ui/use-toast";

// Fix leaflet default marker icon issue in react
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const dangerZoneStyle = { color: "red", fillColor: "red", fillOpacity: 0.3 };
const moderateZoneStyle = { color: "orange", fillColor: "orange", fillOpacity: 0.3 };

export default function AuthorityDashboard() {
    const { toast } = useToast();
    const [zones, setZones] = useState([
        { id: 1, type: "danger", center: [48.86, 2.34], radius: 500 },
        { id: 2, type: "moderate", center: [48.87, 2.33], radius: 800 },
    ]);

    const [tourists] = useState([
        { id: "T1", name: "Alex Doe", lat: 48.8588, lng: 2.277, status: "safe", phone: "+1 234 567 890" },
        { id: "T2", name: "Sarah Smith", lat: 48.865, lng: 2.30, status: "sos", phone: "+44 7700 900077" },
        { id: "T3", name: "Yuki Tanaka", lat: 48.875, lng: 2.32, status: "safe", phone: "+81 90 1234 5678" }
    ]);

    const [sosAlerts, setSosAlerts] = useState([
        { id: 1, touristName: "Sarah Smith", location: "Near Champs-Élysées", time: "10 mins ago", valid: true },
        { id: 2, touristName: "John Matthews", location: "Louvre Museum Area", time: "25 mins ago", valid: true }
    ]);

    const [broadcastMsg, setBroadcastMsg] = useState("");

    const handleAddZone = (type: "danger" | "moderate") => {
        // In a real app, this would be an interactive map click, but we simulate it by adding to the center
        const newZone = {
            id: Date.now(),
            type,
            center: [48.85 + (Math.random() - 0.5) * 0.05, 2.3 + (Math.random() - 0.5) * 0.05],
            radius: type === "danger" ? 400 : 700
        };
        setZones([newZone, ...zones]);
        toast({
            title: "Zone Added",
            description: `New ${type} zone has been added to the map.`,
        });
    };

    const handleBroadcast = (e: React.FormEvent) => {
        e.preventDefault();
        if (!broadcastMsg.trim()) return;

        toast({
            title: "Broadcast Sent",
            description: "Emergency message sent to all tourists in the area.",
            variant: "destructive",
        });
        setBroadcastMsg("");
    };

    const resolveAlert = (id: number) => {
        setSosAlerts(sosAlerts.filter(a => a.id !== id));
        toast({
            title: "Alert Resolved",
            description: "SOS alert marked as resolved.",
        });
    };

    // Center on Paris as default
    const mapCenter: [number, number] = [48.864716, 2.349014];

    return (
        <div className="min-h-screen bg-background font-sans antialiased flex flex-col">
            <Header />

            <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8 bg-muted/30">
                <div className="mx-auto max-w-7xl space-y-6">
                    {/* Top Bar */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-teal-dark text-white p-6 rounded-2xl shadow-sm gap-4">
                        <div>
                            <h1 className="text-2xl font-bold flex items-center gap-3">
                                <ShieldAlert className="w-6 h-6 text-teal-light" />
                                Authority Command Center
                            </h1>
                            <p className="text-teal-light/80 mt-1">Monitor live situations, dispatch aid, and manage regional safety.</p>
                        </div>
                        <div className="flex items-center gap-3 bg-black/20 px-4 py-2 rounded-xl border border-white/10">
                            <Users className="w-5 h-5 text-teal" />
                            <div>
                                <p className="text-sm font-semibold text-white/90">Active Tourists</p>
                                <p className="text-xl font-bold">1,248</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left Column - Alerts & Broadcast (1/3 width) */}
                        <div className="lg:col-span-1 space-y-6">

                            {/* SOS Alerts Panel */}
                            <div className="bg-card rounded-2xl border border-red-200 shadow-sm overflow-hidden flex flex-col">
                                <div className="bg-red-50 border-b border-red-100 p-4 flex items-center justify-between">
                                    <h2 className="text-red-700 font-bold flex items-center gap-2">
                                        <TriangleAlert className="w-5 h-5" />
                                        Live SOS Alerts
                                    </h2>
                                    <span className="bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded-full animate-pulse">
                                        {sosAlerts.length} Active
                                    </span>
                                </div>
                                <div className="p-4 space-y-4 max-h-[400px] overflow-y-auto">
                                    {sosAlerts.length === 0 ? (
                                        <div className="text-center py-8 text-slate-500 flex flex-col items-center">
                                            <ShieldAlert className="w-10 h-10 text-slate-300 mb-2" />
                                            <p>No active emergencies</p>
                                        </div>
                                    ) : (
                                        sosAlerts.map(alert => (
                                            <div key={alert.id} className="bg-white border border-red-100 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h3 className="font-bold text-slate-text">{alert.touristName}</h3>
                                                    <span className="text-xs font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded">{alert.time}</span>
                                                </div>
                                                <p className="text-sm text-slate-600 mb-3 flex items-center gap-1.5">
                                                    <MapIcon className="w-4 h-4 text-slate-400" />
                                                    {alert.location}
                                                </p>
                                                <div className="flex gap-2">
                                                    <button className="flex-1 bg-red-600 text-white text-xs font-bold py-2 rounded-lg hover:bg-red-700 transition">
                                                        Dispatch Help
                                                    </button>
                                                    <button
                                                        onClick={() => resolveAlert(alert.id)}
                                                        className="bg-slate-100 text-slate-600 text-xs font-bold px-3 py-2 rounded-lg hover:bg-slate-200 transition"
                                                    >
                                                        Resolve
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>

                            {/* Broadcast Message Form */}
                            <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
                                <div className="bg-slate-50 border-b border-border p-4">
                                    <h2 className="text-slate-text font-bold flex items-center gap-2">
                                        <Megaphone className="w-5 h-5 text-teal" />
                                        Emergency Broadcast
                                    </h2>
                                </div>
                                <form onSubmit={handleBroadcast} className="p-4 space-y-4">
                                    <p className="text-sm text-slate-muted">Push an instant notification to all registered tourist devices in the region.</p>
                                    <textarea
                                        value={broadcastMsg}
                                        onChange={(e) => setBroadcastMsg(e.target.value)}
                                        placeholder="Enter urgent instructions..."
                                        className="w-full h-24 p-3 border border-border rounded-xl text-sm focus:ring-teal focus:border-teal resize-none"
                                        required
                                    ></textarea>
                                    <button
                                        type="submit"
                                        className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-slate-800 transition flex items-center justify-center gap-2"
                                    >
                                        <Bell className="w-4 h-4" /> Send Alert
                                    </button>
                                </form>
                            </div>

                        </div>

                        {/* Right Column - Map (2/3 width) */}
                        <div className="lg:col-span-2 space-y-6">

                            {/* Map Controls */}
                            <div className="bg-card p-4 rounded-2xl border border-border shadow-sm flex flex-wrap gap-3 items-center justify-between">
                                <h3 className="font-bold text-slate-text flex items-center gap-2">
                                    <MapIcon className="w-5 h-5 text-slate-500" />
                                    Live Operations Map
                                </h3>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleAddZone('moderate')}
                                        className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 text-orange-700 border border-orange-200 rounded-lg text-sm font-semibold hover:bg-orange-100 transition"
                                    >
                                        <Plus className="w-4 h-4" /> Add Moderate Zone
                                    </button>
                                    <button
                                        onClick={() => handleAddZone('danger')}
                                        className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-700 border border-red-200 rounded-lg text-sm font-semibold hover:bg-red-100 transition"
                                    >
                                        <AlertOctagon className="w-4 h-4" /> Add Danger Zone
                                    </button>
                                </div>
                            </div>

                            {/* Map View */}
                            <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm h-[600px] relative z-0">
                                <MapContainer center={mapCenter} zoom={12} scrollWheelZoom={true} style={{ height: "100%", width: "100%" }}>
                                    <TileLayer
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />

                                    {/* Tourists Markers */}
                                    {tourists.map(tourist => (
                                        <Marker key={tourist.id} position={[tourist.lat, tourist.lng]}>
                                            <Popup>
                                                <div className="min-w-[150px]">
                                                    <strong className="block text-slate-900 text-base">{tourist.name}</strong>
                                                    <span className="text-xs text-slate-500 mb-2 block">{tourist.phone}</span>
                                                    <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${tourist.status === 'sos' ? 'bg-red-100 text-red-700' : 'bg-teal/10 text-teal-dark'}`}>
                                                        Status: {tourist.status}
                                                    </span>
                                                </div>
                                            </Popup>
                                        </Marker>
                                    ))}

                                    {/* Zones */}
                                    {zones.map(zone => (
                                        <Circle
                                            key={zone.id}
                                            center={zone.center as [number, number]}
                                            radius={zone.radius}
                                            pathOptions={zone.type === 'danger' ? dangerZoneStyle : moderateZoneStyle}
                                        />
                                    ))}
                                </MapContainer>
                            </div>

                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
