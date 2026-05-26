import { useEffect, useState, Suspense } from "react";
import { BrowserRouter, Routes, Route, useNavigate, useParams, useLocation } from "react-router-dom";
import { I18nProvider, useI18n } from "./i18n";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import About from "./components/About";
import Services from "./components/Services";
import Advantages from "./components/Advantages";
import Projects from "./components/Projects";
import Certificates from "./components/Certificates";
import FAQ from "./components/FAQ";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import FeedbackModal from "./components/FeedbackModal";
import ServicePage from "./components/ServicePage";
import { endpoints } from "./api";
import { getLocalized } from "./utils/localize";
import { WifiOff, RefreshCw, X } from "lucide-react";

// Scroll to top on navigation or reset
function ScrollReset() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
}

// Gorgeous premium Loader element with premium elevator blueprint animations
function Loader() {
  const { lang } = useI18n();
  const [progress, setProgress] = useState(0);
  const [statusIdx, setStatusIdx] = useState(0);

  const statuses = lang === 'uz' ? [
    "Lift shaxtalarini diagnostika qilish...",
    "VVVF chastota rostlagichlarini sozlash...",
    "Elektronika va boshqaruv panellarini ulash...",
    "Safetech Engineering tizimlarini yuklash..."
  ] : lang === 'en' ? [
    "Diagnosing elevator shafts...",
    "Configuring VVVF drive controllers...",
    "Connecting electronics and control boards...",
    "Loading Safetech Engineering systems..."
  ] : [
    "Диагностика лифтовых шахт...",
    "Настройка частотных регуляторов VVVF...",
    "Подключение электроники и плат управления...",
    "Загрузка систем Safetech Engineering..."
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + Math.floor(Math.random() * 12) + 4;
      });
    }, 180);

    const statusTimer = setInterval(() => {
      setStatusIdx((prev) => (prev + 1) % statuses.length);
    }, 1100);

    return () => {
      clearInterval(timer);
      clearInterval(statusTimer);
    };
  }, []);

  const clampedProgress = Math.min(progress, 100);

  return (
    <div className="fixed inset-0 bg-slate-950 flex flex-col items-center justify-center z-50 select-none px-4">
      {/* Background High-tech Blueprint Grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_100%,transparent_100%)]"></div>
      
      {/* Visual glowing lift shaft container */}
      <div className="w-20 h-32 border-2 border-slate-800 rounded-xl relative mb-8 flex flex-col justify-between p-1 bg-slate-900/60 overflow-hidden shadow-[0_0_25px_rgba(37,99,235,0.1)]">
        {/* Rails */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-700 -translate-x-1/2"></div>
        {/* Moving glowing elevator cab */}
        <div 
          className="w-10 h-10 bg-gradient-to-br from-primary-600 to-amber-500 rounded-lg flex items-center justify-center shadow-lg relative left-1/2 -translate-x-1/2 z-10 transition-all duration-300"
          style={{ 
            transform: `translate(-50%, ${80 - (clampedProgress * 0.8)}px)` 
          }}
        >
          {/* Cab light */}
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
          {/* Cables */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-0.5 bg-amber-500/80" style={{ height: '80px' }}></div>
        </div>
      </div>

      {/* Brand logo title */}
      <div className="text-center mb-6 space-y-1">
        <span className="font-display font-black text-2xl tracking-tight text-white block">
          SAFETECH <span className="text-amber-500">ENGINEERING</span>
        </span>
        <span className="text-[10px] text-slate-500 tracking-widest uppercase block font-mono">
          High Standards of Vertical Mobility
        </span>
      </div>

      {/* Progress percentage */}
      <div className="font-mono text-3xl font-bold text-white mb-2 tracking-tight">
        {clampedProgress}%
      </div>

      {/* Premium Loader Progress Bar */}
      <div className="w-64 sm:w-80 h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800/80 mb-3 relative">
        <div 
          className="h-full bg-gradient-to-r from-primary-600 via-primary-500 to-amber-500 rounded-full transition-all duration-300 shadow-[0_0_12px_rgba(245,158,11,0.5)]"
          style={{ width: `${clampedProgress}%` }}
        ></div>
      </div>

      {/* Dynamic Load State Text */}
      <div className="text-slate-400 font-mono text-xs tracking-wide animate-pulse-subtle h-4 text-center">
        {statuses[statusIdx]}
      </div>
    </div>
  );
}

function MainLayout({ pageData, onSelectService, onOpenModal }) {
  return (
    <>
      <Hero 
        onOpenCallback={() => onOpenModal("Монтаж лифтового оборудования")} 
        heroData={pageData?.hero}
        heroSlides={pageData?.hero_slides}
      />
      <Stats experienceData={pageData?.experience} experienceCards={pageData?.experience_cards} />
      <About 
        experience={pageData?.experience} 
        experienceCards={pageData?.experience_cards} 
      />
      <Services 
        onSelectService={onSelectService} 
        serviceSection={pageData?.service}
        serviceCards={pageData?.service_cards}
      />
      <Advantages 
        advantages={pageData?.advantages}
        advantageCards={pageData?.advantage_cards}
      />
      <Projects 
        gallerySection={pageData?.gallery} 
        galleryImages={pageData?.gallery_images} 
      />
      <Certificates 
        certificates={pageData?.certificates}
        certificateCards={pageData?.certificate_cards}
      />
      <FAQ 
        faqs={pageData?.faqs}
        faqItems={pageData?.faq_items}
      />
      <ContactForm 
        initialService="Монтаж лифтов под ключ" 
        general={pageData?.general}
        phones={pageData?.phones}
        emails={pageData?.emails}
      />
    </>
  );
}

function ServiceDetailRoute({ pageData, onOpenModal }) {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { lang } = useI18n();

  // Find dynamic service strictly in backend cards
  const getSelectedService = () => {
    if (pageData?.service_cards) {
      const found = pageData.service_cards.find(s => s.slug === slug);
      if (found) {
        return {
          id: found.id || found.slug,
          slug: found.slug,
          title: getLocalized(found, "title", lang),
          shortDescription: getLocalized(found, "desc", lang) || getLocalized(found, "description", lang),
          description: getLocalized(found, "full_desc", lang) || getLocalized(found, "desc", lang) || getLocalized(found, "description", lang),
          iconName: found.icon || "Wrench",
          image: found.image || "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800&auto=format&fit=crop"
        };
      }
    }
    return null;
  };

  const service = getSelectedService();

  useEffect(() => {
    // If backend data is loaded but this service slug is not valid, redirect home!
    if (!service && pageData) {
      navigate("/");
    }
  }, [service, pageData, navigate]);

  if (!service) return null;

  return (
    <ServicePage 
      service={service} 
      onBack={() => navigate("/")} 
      onSuccessSubmit={(details) => onOpenModal(service?.title || "Консультация")}
      phones={pageData?.phones}
    />
  );
}

function AppContent() {
  const [pageData, setPageData] = useState(null);
  // loading = true means the initial full-page loader is visible
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState("");
  const [apiError, setApiError] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const [retrying, setRetrying] = useState(false);
  const { lang } = useI18n();

  const navigate = useNavigate();
  const location = useLocation();

  // Initial load: both the API fetch AND a 3-second timer must finish
  useEffect(() => {
    const MIN_LOAD_MS = 3000;

    const apiPromise = endpoints.pageData()
      .then((response) => {
        setPageData(response.data);
        setApiError(false);
      })
      .catch((err) => {
        console.error("Failed to load page data from Django API", err);
        setApiError(true);
        setShowBanner(true);
      });

    const timerPromise = new Promise((resolve) => setTimeout(resolve, MIN_LOAD_MS));

    // Hide loader only when BOTH are done
    Promise.all([apiPromise, timerPromise]).finally(() => {
      setLoading(false);
    });
  }, []);

  // Retry (from the error banner) — no minimum timer, just re-fetch
  const fetchPageData = async (isRetry = false) => {
    if (!isRetry) return; // guard: only used for retries
    setRetrying(true);
    try {
      const response = await endpoints.pageData();
      setPageData(response.data);
      setApiError(false);
    } catch (err) {
      console.error("Failed to load page data from Django API", err);
      setApiError(true);
      setShowBanner(true);
    } finally {
      setRetrying(false);
    }
  };

  const handleSelectService = (slug) => {
    navigate(`/services/${slug}`);
  };

  const handleOpenModal = (serviceName = "") => {
    setPreselectedService(serviceName);
    setIsModalOpen(true);
  };

  if (loading) {
    return <Loader />;
  }

  const forceSolidBg = location.pathname.startsWith("/services");

  return (
    <div className="bg-white min-h-screen text-slate-900 selection:bg-primary-500 selection:text-white flex flex-col justify-between">
      <ScrollReset />
      
      <Header 
        onOpenCallback={() => handleOpenModal("Общая консультация")} 
        onHomeReset={() => navigate("/")}
        forceSolidBg={forceSolidBg}
        general={pageData?.general}
        phones={pageData?.phones}
      />

      <main className="flex-grow">
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route 
              path="/" 
              element={
                <MainLayout 
                  pageData={pageData} 
                  onSelectService={handleSelectService}
                  onOpenModal={handleOpenModal}
                />
              } 
            />
            <Route 
              path="/services/:slug" 
              element={
                <ServiceDetailRoute 
                  pageData={pageData} 
                  onOpenModal={handleOpenModal} 
                />
              } 
            />
            <Route path="*" element={<MainLayout pageData={pageData} onSelectService={handleSelectService} onOpenModal={handleOpenModal} />} />
          </Routes>
        </Suspense>
      </main>

      <Footer 
        onOpenCallback={() => handleOpenModal("Заказ сметы КП")}
        general={pageData?.general}
        phones={pageData?.phones}
        emails={pageData?.emails}
      />

      <FeedbackModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        preselectedService={preselectedService}
        onSuccessSubmit={(details) => console.log("Form successfully posted:", details)}
      />

      {/* Premium Glassmorphic Offline/Demo Mode Floating Banner */}
      {apiError && showBanner && (
        <div className="fixed bottom-6 left-6 right-6 md:left-auto md:max-w-md bg-slate-950/90 backdrop-blur-xl border border-amber-500/30 rounded-2xl p-5 shadow-[0_10px_50px_rgba(245,158,11,0.15)] z-50 animate-fade-in flex flex-col gap-4 text-left">
          <div className="flex items-start justify-between gap-3">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                <WifiOff className="w-5 h-5 text-amber-500 animate-pulse" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping"></span>
                  <h4 className="font-display font-extrabold text-sm text-white uppercase tracking-wider">
                    {lang === 'uz' ? "Demo Rejimi Faol" : lang === 'en' ? "Local Demo Mode" : "Демонстрационный Режим"}
                  </h4>
                </div>
                <p className="text-slate-400 text-xs font-sans font-light leading-relaxed">
                  {lang === 'uz' 
                    ? "Tizim Django API (port 8000) bilan bog'lana olmadi. Premium dizayn elementlarini sinab ko'rishingiz uchun lokal ma'lumotlar faollashtirildi."
                    : lang === 'en'
                    ? "Could not connect to the Django API on port 8000. We have loaded a premium local demo experience for your preview."
                    : "Не удалось подключиться к Django API на порту 8000. Мы активировали премиальный демо-режим для ознакомления."
                  }
                </p>
              </div>
            </div>
            <button 
              onClick={() => setShowBanner(false)}
              className="text-slate-500 hover:text-white p-1 hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2.5 items-stretch border-t border-slate-900 pt-3.5">
            <button
              onClick={() => fetchPageData(true)}
              disabled={retrying}
              className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs py-2.5 px-4 rounded-xl shadow-lg shadow-amber-950/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-60"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${retrying ? "animate-spin" : ""}`} />
              {retrying 
                ? (lang === 'uz' ? "Bog'lanish tekshirilmoqda..." : lang === 'en' ? "Checking connection..." : "Проверка связи...")
                : (lang === 'uz' ? "Qayta ulanish" : lang === 'en' ? "Retry Connection" : "Повторить подключение")
              }
            </button>
            <span className="text-[9px] text-slate-550 font-mono flex items-center justify-center leading-none uppercase select-none">
              Port: 8000
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <I18nProvider>
        <AppContent />
      </I18nProvider>
    </BrowserRouter>
  );
}
