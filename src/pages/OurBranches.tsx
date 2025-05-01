import { useEffect, useRef } from "react";
import { useLanguage } from "../context/LanguageContext";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// Sample branch data
const branches = [
  {
    id: 1,
    name: "Beirut Flagship Store",
    address: "123 Hamra Street, Beirut, Lebanon",
    phone: "+961 1 234 567",
    email: "beirut@orsagroup.com",
    hours: "Monday - Saturday: 9am - 7pm, Sunday: 10am - 5pm",
    mapUrl: "https://maps.google.com/?q=Beirut,Lebanon",
    image: "/assets/images/cover2.jpg",
  },
  {
    id: 2,
    name: "Tripoli Branch",
    address: "456 Main Road, Tripoli, Lebanon",
    phone: "+961 6 789 012",
    email: "tripoli@orsagroup.com",
    hours: "Monday - Saturday: 9am - 7pm, Sunday: Closed",
    mapUrl: "https://maps.google.com/?q=Tripoli,Lebanon",
    image: "/assets/images/cover3.jpg",
  },
  {
    id: 3,
    name: "Byblos Outlet",
    address: "789 Coastal Highway, Byblos, Lebanon",
    phone: "+961 9 345 678",
    email: "byblos@orsagroup.com",
    hours: "Monday - Sunday: 10am - 8pm",
    mapUrl: "https://maps.google.com/?q=Byblos,Lebanon",
    image: "/assets/images/cover4.jpg",
  },
  {
    id: 4,
    name: "Baalbek Shop",
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
              {t("our-branches")}
            </h1>
            <p className="text-xl max-w-[600px] mx-auto md:text-lg">
              Visit us at one of our locations across Lebanon
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
                    alt={branch.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-2xl text-[#333] mb-4">{branch.name}</h2>
                  <p className="text-gray-600 mb-4 italic">{branch.address}</p>
                  <p className="mb-4 leading-relaxed">
                    <strong>Phone:</strong> {branch.phone}
                    <br />
                    <strong>Email:</strong> {branch.email}
                  </p>
                  <p className="mb-4 leading-relaxed">
                    <strong>Hours:</strong>
                    <br />
                    {branch.hours}
                  </p>
                  <a
                    href={branch.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-[#4a8e3b] text-white py-2 px-4 rounded font-semibold transition-all duration-300 hover:bg-[#3b7e2c] mt-2"
                  >
                    View on Map
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
              Get in Touch
            </h2>
            <p className="mb-8 text-lg">
              Can't find a branch near you? Contact our customer service team
              for information about our products, wholesale inquiries, or to
              place an order for delivery.
            </p>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <p className="mb-4">
                <strong>General Inquiries:</strong> info@orsagroup.com
              </p>
              <p>
                <strong>Customer Service:</strong> +961 1 123 456
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurBranches;
