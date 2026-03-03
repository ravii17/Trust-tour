import { MapPin, PhoneCall, ShieldCheck, BellRing } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

const FeaturesSection = () => {
    const { t } = useLang();

    const features = [
        {
            title: "Real-time tracking",
            description: "Allow your location to be securely monitored by relevant authorities. This ensures you are always within reach of assistance in case of emergencies, especially in remote areas.",
            icon: <MapPin className="w-6 h-6 text-primary" />,
            image: "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800",
            reversed: false,
        },
        {
            title: "Emergency contact integration",
            description: "Directly link your preferred emergency contacts back home with local authorities in India. Ensuring your loved ones are informed immediately should any situation arise.",
            icon: <PhoneCall className="w-6 h-6 text-primary" />,
            image: "https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?auto=format&fit=crop&q=80&w=800",
            reversed: true,
        },
        {
            title: "Secure government database",
            description: "Your travel data is encrypted and housed within secured government servers. We prioritize your privacy and ensure data is strictly used for safety purposes.",
            icon: <ShieldCheck className="w-6 h-6 text-primary" />,
            image: "https://images.unsplash.com/photo-1507925922893-873105f4eb1b?auto=format&fit=crop&q=80&w=800",
            reversed: false,
        },
        {
            title: "Instant alert system",
            description: "Send out a distress signal with one tap. Our intelligent system automatically shares your live location with the nearest Tourist Police station for rapid dispatch.",
            icon: <BellRing className="w-6 h-6 text-primary" />,
            image: "https://images.unsplash.com/photo-1534081333815-ae5019106622?auto=format&fit=crop&q=80&w=800",
            reversed: true,
        }
    ];

    return (
        <section id="features" className="py-24 bg-slate-50 overflow-hidden">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Uncompromising Safety Features</h2>
                    <p className="text-lg text-slate-600">
                        Engineered from the ground up to provide seamless protection and peace of mind during your travels.
                    </p>
                </div>

                <div className="space-y-24 md:space-y-32">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className={`flex flex-col md:flex-row gap-12 lg:gap-20 items-center ${feature.reversed ? 'md:flex-row-reverse' : ''}`}
                        >
                            {/* Image side */}
                            <div className="w-full md:w-1/2 relative group">
                                <div className="absolute inset-0 bg-primary/10 rounded-3xl transform translate-x-4 translate-y-4 group-hover:translate-x-6 group-hover:translate-y-6 transition-transform duration-500" />
                                <img
                                    src={feature.image}
                                    alt={feature.title}
                                    className="relative rounded-3xl object-cover aspect-[4/3] w-full shadow-lg border border-white/20"
                                />
                            </div>

                            {/* Text side */}
                            <div className="w-full md:w-1/2 space-y-6">
                                <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center">
                                    {feature.icon}
                                </div>
                                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
                                    {feature.title}
                                </h3>
                                <p className="text-lg text-slate-600 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
