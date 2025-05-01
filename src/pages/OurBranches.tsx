import { useEffect, useRef } from "react";
import { useLanguage } from "../context/LanguageContext";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// Branch data with map embed URLs
const branches = [
  {
    id: 1,
    nameKey: "lebanon-branch",
    address: "Beirut Central District, Lebanon",
    phone: "+961 70 141 087",
    email: "lebanon@orsa-group.com",
    hours:
      "Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 10:00 AM - 4:00 PM\nSunday: Closed",
    mapUrl: "https://maps.google.com/?q=Beirut+Central+District,+Lebanon",
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13249.114069868514!2d35.50229724249348!3d33.89633563239309!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151f17215880a78f%3A0x729182bae99836b4!2sBeirut%20Central%20District%2C%20Beirut%2C%20Lebanon!5e0!3m2!1sen!2sus!4v1652690749261!5m2!1sen!2sus",
  },
  {
    id: 2,
    nameKey: "belgium-branch",
    address: "Grotewinkellaan 80, 1853 Grimbergen, Belgium",
    phone: "+32 478 69 25 86",
    email: "belgium@orsa-group.com",
    hours:
      "Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 10:00 AM - 4:00 PM\nSunday: Closed",
    mapUrl:
      "https://maps.google.com/?q=Grotewinkellaan+80,+1853+Grimbergen,+Belgium",
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2516.9295886847384!2d4.36675731577342!3d50.92686817954371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c3c24765f9f333%3A0x605c157948878c46!2sGrotewinkellaan%2080%2C%201853%20Grimbergen%2C%20Belgium!5e0!3m2!1sen!2sus!4v1652690859615!5m2!1sen!2sus",
  },
];

// Team member data with translation keys
const teamMembers = [
  {
    id: 1,
    name: "John Doe",
    roleKey: "founder-ceo",
    descriptionKey: "john-doe-desc",
    image: "/assets/images/intro.jpeg",
    social: {
      linkedin: "#",
      twitter: "#",
      facebook: "#",
    },
  },
  {
    id: 2,
    name: "Sarah Smith",
    roleKey: "operations-manager",
    descriptionKey: "sarah-smith-desc",
    image: "/assets/images/intro.jpeg",
    social: {
      linkedin: "#",
      twitter: "#",
      facebook: "#",
    },
  },
  {
    id: 3,
    name: "Ali Hassan",
    roleKey: "lebanon-branch-manager",
    descriptionKey: "ali-hassan-desc",
    image: "/assets/images/intro.jpeg",
    social: {
      linkedin: "#",
      twitter: "#",
      facebook: "#",
    },
  },
  {
    id: 4,
    name: "Marie Dubois",
    roleKey: "customer-relations",
    descriptionKey: "marie-dubois-desc",
    image: "/assets/images/intro.jpeg",
    social: {
      linkedin: "#",
      twitter: "#",
      facebook: "#",
    },
  },
];

const OurBranches = () => {
  const { t } = useLanguage();
  const headerRef = useRef<HTMLDivElement>(null);
  const branchesRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);

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

    // Team members animation
    if (teamRef.current) {
      ScrollTrigger.create({
        trigger: teamRef.current,
        start: "top 80%",
        onEnter: () => {
          const teamCards = teamRef.current?.querySelectorAll(".team-card");
          if (teamCards && teamCards.length > 0) {
            gsap.fromTo(
              teamCards,
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
                <div className="p-6">
                  <h2 className="text-2xl text-[#333] mb-4 flex items-center">
                    <i className="fas fa-map-marker-alt mr-2"></i>
                    {t(branch.nameKey)}
                  </h2>
                  <p className="text-gray-600 mb-4 flex items-start">
                    <i className="fas fa-location-dot mr-2 mt-1"></i>
                    <span>{branch.address}</span>
                  </p>
                  <p className="mb-2 flex items-center">
                    <i className="fas fa-phone mr-2"></i>
                    <span>{branch.phone}</span>
                  </p>
                  <p className="mb-2 flex items-center">
                    <i className="fas fa-envelope mr-2"></i>
                    <span>{branch.email}</span>
                  </p>
                  <p className="mb-4 flex items-start">
                    <i className="fas fa-clock mr-2 mt-1"></i>
                    <span>
                      {branch.hours.split("\n").map((line, idx) => (
                        <span key={idx}>
                          {line}
                          <br />
                        </span>
                      ))}
                    </span>
                  </p>
                  {/* Google Maps Embed */}
                  <div className="mb-4 h-[250px] rounded overflow-hidden">
                    <iframe
                      src={branch.mapEmbed}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`${t(branch.nameKey)} Location`}
                    ></iframe>
                  </div>
                  <a
                    href={branch.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-[#4a8e3b] text-white py-2 px-4 rounded font-semibold transition-all duration-300 hover:bg-[#3b7e2c] mt-2"
                  >
                    {t("get-directions")}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Members Section */}
      <section ref={teamRef} className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl text-[#4a8e3b] mb-6 md:text-3xl">
              {t("our-team")}
            </h2>
            <p className="text-xl max-w-[600px] mx-auto md:text-lg">
              {t("team-subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="team-card bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:-translate-y-2.5"
              >
                {/* <div className="h-[220px] overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div> */}
                <div className="p-5 text-center">
                  <h3 className="text-xl font-semibold text-[#333] mb-1">
                    {member.name}
                  </h3>
                  <p className="text-[#4a8e3b] font-medium mb-3">
                    {t(member.roleKey)}
                  </p>
                  <p className="text-gray-600 mb-4 text-sm">
                    {t(member.descriptionKey)}
                  </p>
                  <div className="flex justify-center space-x-4">
                    <a
                      href={member.social.linkedin}
                      className="text-gray-600 hover:text-[#4a8e3b] transition-colors duration-300"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                    <a
                      href={member.social.twitter}
                      className="text-gray-600 hover:text-[#4a8e3b] transition-colors duration-300"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a
                      href={member.social.facebook}
                      className="text-gray-600 hover:text-[#4a8e3b] transition-colors duration-300"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-facebook-f"></i>
                    </a>
                  </div>
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
                <strong>{t("general-inquiries")}:</strong> info@orsa-group.com
              </p>
              <p>
                <strong>{t("customer-service")}:</strong> +961 70 141 087
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurBranches;
