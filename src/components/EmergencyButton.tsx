import { useState, useEffect } from "react";
import { AlertTriangle, X, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const EmergencyButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const [countdown, setCountdown] = useState(3);

    // Countdown logic for the confirmation step
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isOpen && !isSending && !isSent && countdown > 0) {
            timer = setTimeout(() => setCountdown(c => c - 1), 1000);
        } else if (countdown === 0 && isOpen && !isSending && !isSent) {
            handleConfirmAlert();
        }
        return () => clearTimeout(timer);
    }, [isOpen, isSending, isSent, countdown]);

    const handleOpen = () => {
        setIsOpen(true);
        setCountdown(3);
        setIsSending(false);
        setIsSent(false);
    };

    const handleClose = () => {
        setIsOpen(false);
        setTimeout(() => {
            setCountdown(3);
            setIsSending(false);
            setIsSent(false);
        }, 300); // Reset after close animation
    };

    const handleConfirmAlert = () => {
        setIsSending(true);
        // Simulate sending alert
        setTimeout(() => {
            setIsSending(false);
            setIsSent(true);
            // Auto close after success
            setTimeout(() => {
                handleClose();
            }, 3000);
        }, 1500);
    };

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={handleOpen}
                className="fixed bottom-6 right-6 z-[100] group flex items-center justify-center w-14 h-14 bg-destructive text-white rounded-full shadow-[0_4px_20px_rgba(220,38,38,0.4)] hover:shadow-[0_8px_30px_rgba(220,38,38,0.6)] hover:bg-red-700 transition-all duration-300 hover:scale-105"
                aria-label="Emergency SOS"
            >
                <span className="absolute inset-0 w-full h-full bg-red-500 animate-ping opacity-20 group-hover:opacity-40 rounded-full" style={{ animationDuration: '2s' }}></span>
                <AlertTriangle className="w-6 h-6" />
            </button>

            {/* Confirmation Dialog Overlay */}
            {isOpen && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl border border-slate-100 p-6 animate-in zoom-in-95 slide-in-from-bottom-4 duration-300 relative overflow-hidden">

                        {/* Soft red glow background */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-red-50 rounded-full blur-3xl opacity-50" />

                        {/* Close Button (only show if not sending/sent) */}
                        {!isSending && !isSent && (
                            <button
                                onClick={handleClose}
                                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-full p-2 transition-colors z-10"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        )}

                        <div className="relative z-10 flex flex-col items-center text-center mt-2">
                            {/* Icon Container */}
                            <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 transition-all duration-500 ${isSent ? 'bg-teal/10 text-teal' : 'bg-red-100 text-destructive'
                                }`}>
                                {isSent ? (
                                    <CheckCircle2 className="w-10 h-10 animate-in zoom-in" />
                                ) : (
                                    <AlertTriangle className={`w-10 h-10 ${isSending ? 'animate-pulse' : 'animate-bounce'}`} />
                                )}
                            </div>

                            {/* Text Content */}
                            <h3 className="text-2xl font-bold text-slate-900 mb-2">
                                {isSent ? "Alert Sent" : isSending ? "Sending Alert..." : "Trigger SOS Alert?"}
                            </h3>

                            <p className="text-slate-600 mb-8 max-w-[260px]">
                                {isSent
                                    ? "Authorities have been notified and possess your live location."
                                    : isSending
                                        ? "Establishing secure connection to emergency dispatch..."
                                        : "This will immediately notify the nearest Tourist Police and your emergency contacts."
                                }
                            </p>

                            {/* Actions/Status */}
                            {!isSent && !isSending && (
                                <div className="w-full space-y-3">
                                    <Button
                                        onClick={handleConfirmAlert}
                                        className="w-full h-14 text-lg font-bold rounded-xl bg-destructive hover:bg-red-700 text-white shadow-lg shadow-red-500/20"
                                    >
                                        Confirm SOS immediately
                                    </Button>

                                    <div className="flex items-center justify-center gap-2 text-sm text-slate-500 font-medium">
                                        Auto-sending in <span className="text-red-600 font-bold w-4 text-center">{countdown}</span>s
                                    </div>

                                    <Button
                                        variant="ghost"
                                        onClick={handleClose}
                                        className="w-full h-12 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl"
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            )}

                            {/* Sending Progress Bar */}
                            {isSending && (
                                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mt-4">
                                    <div className="h-full bg-destructive w-1/2 animate-[progress_1.5s_ease-in-out_infinite]" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default EmergencyButton;
