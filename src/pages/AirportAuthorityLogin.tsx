import { Building2, ShieldCheck, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLang } from "@/context/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AirportAuthorityLogin = () => {
    const { t } = useLang();
    const navigate = useNavigate();
    const [officerId, setOfficerId] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        // Mock Validation for Airport Authority
        const validOfficerId = "AIR-123";
        const validPassword = "securepassword";

        if (officerId === validOfficerId && password === validPassword) {
            navigate("/airport-dashboard");
        } else {
            alert("Invalid Officer ID or Passcode.");
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-slate-bg font-sans selection:bg-teal selection:text-white">
            <Header />

            <main className="flex-1 flex items-center justify-center p-4 py-24 sm:py-32 relative overflow-hidden">
                {/* Background elements */}
                <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-teal/5 to-transparent pointer-events-none" />
                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-teal/5 rounded-full blur-[100px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-sky/5 rounded-full blur-[80px] rounded-full pointer-events-none" />

                <div className="w-full max-w-[420px] relative z-10">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white shadow-xl shadow-teal/5 border border-slate-text/10 mb-6 relative">
                            <Building2 className="w-8 h-8 text-teal relative z-10" />
                            <div className="absolute inset-0 bg-gradient-to-br from-teal/10 to-transparent rounded-2xl" />
                        </div>
                        <h1 className="text-3xl font-bold text-slate-text mb-3">
                            Airport Authority <span className="text-teal">Access</span>
                        </h1>
                        <p className="text-slate-muted">Secure portal for verifying incoming travelers.</p>
                    </div>

                    <div className="bg-white rounded-[24px] shadow-2xl shadow-slate-text/5 border border-slate-text/10 overflow-hidden backdrop-blur-sm">
                        <div className="p-8">
                            <form onSubmit={handleLogin} className="space-y-5">
                                <div className="space-y-1.5">
                                    <Label className="text-slate-text font-medium text-sm">Officer ID</Label>
                                    <Input
                                        required
                                        value={officerId}
                                        onChange={(e) => setOfficerId(e.target.value)}
                                        placeholder="Enter Airport Authority ID"
                                        className="h-12 bg-slate-50 border-slate-200 focus-visible:ring-teal focus-visible:border-teal"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <Label className="text-slate-text font-medium text-sm">Passcode</Label>
                                    <Input
                                        required
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter passcode"
                                        className="h-12 bg-slate-50 border-slate-200 focus-visible:ring-teal focus-visible:border-teal"
                                    />
                                </div>

                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        className="w-full h-12 rounded-xl bg-teal text-white font-semibold text-sm hover:bg-teal-dark transition-all duration-200 shadow-md shadow-teal/20 hover:shadow-lg hover:shadow-teal/30 hover:-translate-y-0.5 flex items-center justify-center gap-2"
                                    >
                                        Authenticate
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div className="bg-slate-50 border-t border-slate-100 p-5 flex items-center justify-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-slate-muted" />
                            <p className="text-xs text-slate-muted font-medium text-center">
                                Access is monitored. Unauthorized login is prohibited.
                            </p>
                        </div>
                    </div>

                    <div className="text-center mt-8">
                        <Link to="/" className="text-sm font-medium text-slate-muted hover:text-teal transition-colors">
                            ← Return to Home
                        </Link>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default AirportAuthorityLogin;
