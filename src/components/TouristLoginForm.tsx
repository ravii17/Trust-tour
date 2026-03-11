import { useState } from "react";
import { UserRound, Lock, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLang } from "@/context/LanguageContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const TouristLoginForm = () => {
    const { t } = useLang();
    const navigate = useNavigate();
    const { toast } = useToast();
    const [travelId, setTravelId] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        
        // Simulate login
        setTimeout(() => {
            setIsLoading(false);
            if (travelId.trim() && password.trim()) {
                toast({
                    title: "Login Successful",
                    description: "Redirecting to your dashboard...",
                });
                navigate("/dashboard");
            } else {
                toast({
                    variant: "destructive",
                    title: "Login Failed",
                    description: "Please enter your Unique Travel ID and Password.",
                });
            }
        }, 800);
    };

    return (
        <div className="w-full bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-8 sm:p-12">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Already Registered? Login to Dashboard</h2>
                <p className="text-slate-500 text-sm">Access your travel details, update itinerary, and check status.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-4">
                    <div className="space-y-1.5 relative group">
                        <Label className="text-slate-700 font-semibold ml-1">Unique Travel ID</Label>
                        <div className="relative">
                            <Input 
                                className="h-12 pl-11 bg-slate-50 border-slate-200 focus:bg-white transition-colors" 
                                placeholder="e.g. TRV-1234-5678" 
                                value={travelId}
                                onChange={(e) => setTravelId(e.target.value)}
                                required 
                            />
                            <UserRound className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                        </div>
                    </div>

                    <div className="space-y-1.5 relative group">
                        <Label className="text-slate-700 font-semibold ml-1">Password</Label>
                        <div className="relative">
                            <Input 
                                type="password"
                                className="h-12 pl-11 bg-slate-50 border-slate-200 focus:bg-white transition-colors" 
                                placeholder="Enter your password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required 
                            />
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                        </div>
                    </div>
                </div>

                <div className="pt-2">
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-12 rounded-xl bg-slate-900 hover:bg-primary text-white font-semibold transition-colors"
                    >
                        {isLoading ? "Logging in..." : "Login to Dashboard"}
                        {!isLoading && <ArrowRight className="w-5 h-5 ml-2" />}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default TouristLoginForm;
