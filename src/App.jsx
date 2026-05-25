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

// Scroll to top on navigation or reset
function ScrollReset() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
}

// Gorgeous Loader element
function Loader() {
  const { lang } = useI18n();
  return (
    <div className="fixed inset-0 bg-slate-950 flex flex-col items-center justify-center z-50">
      <div className="w-12 h-12 border-4 border-slate-800 border-t-primary-500 rounded-full animate-spin mb-4"></div>
      <div className="text-slate-400 font-display font-medium text-xs tracking-widest uppercase animate-pulse">
        {lang === 'uz' ? "Yuklanmoqda..." : lang === 'en' ? "Loading Engineering Systems..." : "Загрузка инженерных систем..."}
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
      />
      <Stats experienceData={pageData?.experience} />
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
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState("");
  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const response = await endpoints.pageData();
        setPageData(response.data);
      } catch (err) {
        console.error("Failed to load page data from Django API", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPageData();
  }, []);

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
