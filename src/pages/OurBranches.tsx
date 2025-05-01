import { useEffect, useRef } from "react";
import { useLanguage } from "../context/LanguageContext";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// Sample branch data
const branches = [
  {
    id: 1,
    nameKey: "branch-1-name",
    address: "123 Hamra Street, Beirut, Lebanon",
    phone: "+961 1 234 567",
    email: "beirut@orsagroup.com",
    hours: "Monday - Saturday: 9am - 7pm, Sunday: 10am - 5pm",
    mapUrl: "https://maps.google.com/?q=Beirut,Lebanon",
    image: "/assets/images/cover2.jpg",
  },
  {
    id: 2,
    nameKey: "branch-2-name",
    address: "456 Main Road, Tripoli, Lebanon",
    phone: "+961 6 789 012",
    email: "tripoli@orsagroup.com",
    hours: "Monday - Saturday: 9am - 7pm, Sunday: Closed",
    mapUrl: "https://maps.google.com/?q=Tripoli,Lebanon",
    image: "/assets/images/cover3.jpg",
  },
  {
    id: 3,
    nameKey: "branch-3-name",
    address: "789 Coastal Highway, Byblos, Lebanon",
    phone: "+961 9 345 678",
    email: "byblos@orsagroup.com",
    hours: "Monday - Sunday: 10am - 8pm",
    mapUrl: "https://maps.google.com/?q=Byblos,Lebanon",
    image: "/assets/images/cover4.jpg",
  },
  {
    id: 4,
    nameKey: "branch-4-name",
    address: "101 Temple Road, Baalbek, Lebanon",
    phone: "+961 8 901 234",
    email: "baalbek@orsagroup.com",
    hours: "Monday - Friday: 9am - 6pm, Saturday - Sunday: 10am - 4pm",
    mapUrl: "https://maps.google.com/?q=Baalbek,Lebanon",
    image: "/assets/images/cover5.jpg",
  },
];

const OurBranches = () => {
  const { t } = useLanguage();
  const headerRef = useRef<HTMLDivElement>(null);
  const branchesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Header animation
    if (headerRef.current) {
      const pageHeaderContent = headerRef.current.querySelector(
        ".page-header-content"
      );
      if (pageHeaderContent) {
        gsap.fromTo(
          pageHeaderContent,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1 }
        );
      }
    }

    // Branches animation
    if (branchesRef.current) {
      ScrollTrigger.create({
        trigger: branchesRef.current,
        start: "top 80%",
        onEnter: () => {
          const branchCards =
            branchesRef.current?.querySelectorAll(".branch-card");
          if (branchCards && branchCards.length > 0) {
            gsap.fromTo(
              branchCards,
              { opacity: 0, y: 50 },
              { opacity: 1, y: 0, stagger: 0.2, duration: 0.8 }
            );
          }
        },
      });
    }
  }, []);

  return (
    <div className="w-full">
      {/* Page Header */}
      <div
        ref={headerRef}
        className="bg-[#4a8e3b] text-white py-24 pb-16 text-center"
      >
        <div className="max-w-7xl mx-auto px-8">
          <div className="page-header-content">
            <h1 className="text-5xl mb-4 uppercase md:text-4xl">
              {t("branches-page-title")}
            </h1>
            <p className="text-xl max-w-[600px] mx-auto md:text-lg">
              {t("branches-page-subtitle")}
            </p>
          </div>
        </div>
      </div>

      {/* Branches Section */}
      <section ref={branchesRef} className="py-20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {branches.map((branch) => (
              <div
                key={branch.id}
                className="branch-card bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:-translate-y-2.5"
              >
                <div className="h-[250px] overflow-hidden">
                  <img
                    src={branch.image}
                    alt={t(branch.nameKey)}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-2xl text-[#333] mb-4">
                    {t(branch.nameKey)}
                  </h2>
                  <p className="text-gray-600 mb-4 italic">{branch.address}</p>
                  <p className="mb-4 leading-relaxed">
                    <strong>{t("phone")}:</strong> {branch.phone}
                    <br />
                    <strong>{t("email")}:</strong> {branch.email}
                  </p>
                  <p className="mb-4 leading-relaxed">
                    <strong>{t("hours")}:</strong>
                    <br />
                    {branch.hours}
                  </p>
                  <a
                    href={branch.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-[#4a8e3b] text-white py-2 px-4 rounded font-semibold transition-all duration-300 hover:bg-[#3b7e2c] mt-2"
                  >
                    {t("view-on-map")}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl text-[#4a8e3b] mb-6 md:text-3xl">
              {t("get-in-touch")}
            </h2>
            <p className="mb-8 text-lg">{t("cannot-find")}</p>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <p className="mb-4">
                <strong>{t("general-inquiries")}:</strong> info@orsagroup.com
              </p>
              <p>
                <strong>{t("customer-service")}:</strong> +961 1 123 456
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurBranches;
