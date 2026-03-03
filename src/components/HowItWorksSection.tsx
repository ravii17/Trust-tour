import { ClipboardCheck, Database, Headphones } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

const HowItWorksSection = () => {
    const { t } = useLang();

    const steps = [
        {
            icon: <ClipboardCheck className="w-8 h-8 text-primary" />,
            title: "Register at Airport",
            description: "Quickly submit your travel details via the official portal upon arrival.",
        },
        {
            icon: <Database className="w-8 h-8 text-primary" />,
            title: "Secure Database Entry",
            description: "Your information is securely encrypted and stored by the government.",
        },
        {
            icon: <Headphones className="w-8 h-8 text-primary" />,
            title: "24/7 Monitoring & Support",
            description: "Enjoy your trip knowing you have round-the-clock emergency support.",
        },
    ];

    return (
        <section id="how-it-works" className="py-24 bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">How It Works</h2>
                    <p className="text-lg text-slate-600">
                        A simple 3-step process to ensure a secure and enjoyable journey across India.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="group bg-white p-8 rounded-2xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:-translate-y-2 transition-all duration-300 relative overflow-hidden text-center"
                        >
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="w-16 h-16 mx-auto bg-primary/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
                                {step.icon}
                            </div>

                            <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                            <p className="text-slate-600 leading-relaxed">
                                {step.description}
                            </p>

                            {/* Step indicator */}
                            <div className="absolute -top-4 -right-4 w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 font-extrabold text-2xl group-hover:text-primary/10 transition-colors">
                                {index + 1}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorksSection;
