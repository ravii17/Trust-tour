import { useState } from "react";
import { CheckCircle2, ChevronRight, UserRound, MapPin, Contact } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLang } from "@/context/LanguageContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const RegistrationForm = () => {
    const { t } = useLang();
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const totalSteps = 3;

    const handleNext = (e: React.MouseEvent) => {
        e.preventDefault();
        if (step < totalSteps) setStep(step + 1);
    };

    const handlePrev = (e: React.MouseEvent) => {
        e.preventDefault();
        if (step > 1) setStep(step - 1);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate submission
        setTimeout(() => {
            navigate("/registration-submitted");
        }, 1000);
    };

    return (
        <div className="w-full max-w-2xl mx-auto bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-8 sm:p-12">
            <div className="mb-8">
                <h2 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">Register Your Travel</h2>
                <p className="text-slate-500">Secure entry to ensure 24/7 monitoring and support.</p>
            </div>

            {/* Progress Bar */}
            <div className="mb-10">
                <div className="flex justify-between mb-2">
                    <span className="text-sm font-semibold text-primary">Step {step} of {totalSteps}</span>
                    <span className="text-sm font-medium text-slate-400">
                        {step === 1 ? "Personal Info" : step === 2 ? "Contact Details" : "Travel Plan"}
                    </span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-primary transition-all duration-500 ease-out"
                        style={{ width: `${(step / totalSteps) * 100}%` }}
                    />
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                {/* Step 1: Personal Info */}
                <div className={`space-y-6 ${step === 1 ? 'block animate-in fade-in slide-in-from-right-4' : 'hidden'}`}>
                    <div className="space-y-4">
                        <div className="space-y-1.5 relative group">
                            <Label className="text-slate-700 font-semibold ml-1">Full Name</Label>
                            <div className="relative">
                                <Input className="h-12 pl-11 bg-slate-50 border-slate-200 focus:bg-white transition-colors" placeholder="e.g. John Doe" required />
                                <UserRound className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                            </div>
                        </div>

                        <div className="space-y-1.5 relative group">
                            <Label className="text-slate-700 font-semibold ml-1">Passport Number</Label>
                            <div className="relative">
                                <Input className="h-12 pl-11 bg-slate-50 border-slate-200 focus:bg-white transition-colors uppercase" placeholder="e.g. A1234567" required />
                                <Contact className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                            </div>
                        </div>

                        <div className="space-y-1.5 relative group">
                            <Label className="text-slate-700 font-semibold ml-1">Country of Origin</Label>
                            <div className="relative">
                                <Input className="h-12 pl-11 bg-slate-50 border-slate-200 focus:bg-white transition-colors" placeholder="e.g. United States" required />
                                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Step 2: Contact Details */}
                <div className={`space-y-6 ${step === 2 ? 'block animate-in fade-in slide-in-from-right-4' : 'hidden'}`}>
                    <div className="space-y-4">
                        <div className="space-y-1.5">
                            <Label className="text-slate-700 font-semibold ml-1">Contact Number</Label>
                            <Input type="tel" className="h-12 bg-slate-50 border-slate-200 focus:bg-white transition-colors" placeholder="+1 (555) 000-0000" required />
                        </div>

                        <div className="space-y-1.5">
                            <Label className="text-slate-700 font-semibold ml-1">Emergency Contact Number</Label>
                            <Input type="tel" className="h-12 bg-slate-50 border-slate-200 focus:bg-white transition-colors" placeholder="+1 (555) 111-1111" required />
                            <p className="text-xs text-slate-500 ml-1 mt-1">We will contact this number only in case of a verified emergency.</p>
                        </div>
                    </div>
                </div>

                {/* Step 3: Travel Plan */}
                <div className={`space-y-6 ${step === 3 ? 'block animate-in fade-in slide-in-from-right-4' : 'hidden'}`}>
                    <div className="space-y-4">
                        <div className="space-y-1.5">
                            <Label className="text-slate-700 font-semibold ml-1">Destination City/State</Label>
                            <Input className="h-12 bg-slate-50 border-slate-200 focus:bg-white transition-colors" placeholder="e.g. New Delhi, Delhi" required />
                        </div>

                        <div className="space-y-1.5">
                            <Label className="text-slate-700 font-semibold ml-1">Stay Duration (Days)</Label>
                            <Input type="number" min="1" className="h-12 bg-slate-50 border-slate-200 focus:bg-white transition-colors" placeholder="e.g. 14" required />
                        </div>

                        <div className="flex items-start gap-3 p-4 bg-teal/5 text-teal-dark rounded-xl border border-teal/10 mt-6">
                            <CheckCircle2 className="w-5 h-5 text-teal shrink-0 mt-0.5" />
                            <span className="text-sm font-medium">I agree to securely share my travel data with the Government of India Tourist Police for monitoring and safety purposes.</span>
                        </div>
                    </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex gap-4 mt-10 pt-6 border-t border-slate-100">
                    {step > 1 && (
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handlePrev}
                            className="px-6 h-12 rounded-xl text-slate-600 font-semibold border-slate-200 hover:bg-slate-50"
                        >
                            Back
                        </Button>
                    )}

                    {step < totalSteps ? (
                        <Button
                            type="button"
                            onClick={handleNext}
                            className="ml-auto px-8 h-12 rounded-xl bg-slate-900 hover:bg-primary text-white font-semibold transition-colors"
                        >
                            Continue
                            <ChevronRight className="w-5 h-5 ml-2" />
                        </Button>
                    ) : (
                        <Button
                            type="submit"
                            className="ml-auto px-8 h-12 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold shadow-lg shadow-primary/20 transition-all"
                        >
                            Submit Registration
                        </Button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default RegistrationForm;
