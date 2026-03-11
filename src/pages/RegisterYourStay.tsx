import Header from "@/components/Header";
import RegistrationForm from "@/components/RegistrationForm";
import TouristLoginForm from "@/components/TouristLoginForm";
import Footer from "@/components/Footer";

const RegisterYourStay = () => {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <Header />
      <main className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Abstract background blobs for premium feel */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/4 w-[600px] h-[600px] bg-teal/5 rounded-full blur-3xl" />

        <div className="relative z-10 w-full mt-10 max-w-2xl mx-auto space-y-8">
          <RegistrationForm />
          <TouristLoginForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RegisterYourStay;
