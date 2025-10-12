import { useEffect, useRef } from "react";
import { useLanguage } from "../context/LanguageContext";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const OurBranches = () => {
  const { t } = useLanguage();
  const headerRef = useRef<HTMLDivElement>(null);
  const branchesRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Enhanced header animation
    if (headerRef.current) {
      const headerContent = headerRef.current.querySelector(
        ".page-header-content"
      );
      const floatingShapes =
        headerRef.current.querySelectorAll(".floating-shape");

      if (headerContent) {
        gsap.fromTo(
          headerContent,
          { opacity: 0, y: 80, scale: 0.9, rotationX: 15 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationX: 0,
            duration: 1.5,
            ease: "power4.out",
          }
        );
      }

      if (floatingShapes) {
        gsap.fromTo(
          floatingShapes,
          { opacity: 0, scale: 0, rotation: 180 },
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            stagger: 0.2,
            duration: 2,
            ease: "elastic.out(1, 0.3)",
          }
        );
      }
    }

    // Enhanced branches section animation
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
              { opacity: 0, y: 100, scale: 0.8, rotationY: 25 },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                rotationY: 0,
                stagger: 0.2,
                duration: 1.2,
                ease: "power4.out",
              }
            );
          }
        },
      });
    }

    // Enhanced contact section animation
    if (contactRef.current) {
      ScrollTrigger.create({
        trigger: contactRef.current,
        start: "top 80%",
        onEnter: () => {
          const contactCards =
            contactRef.current?.querySelectorAll(".contact-card");

          if (contactCards && contactCards.length > 0) {
            gsap.fromTo(
              contactCards,
              { opacity: 0, y: 60, scale: 0.9, rotationX: 20 },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                rotationX: 0,
                stagger: 0.15,
                duration: 1.3,
                ease: "power4.out",
              }
            );
          }
        },
      });
    }

    // Advanced parallax effects
    gsap.to(".parallax-bg", {
      yPercent: -20,
      ease: "none",
      scrollTrigger: {
        trigger: ".parallax-bg",
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });
  }, []);

  const branches = [
    {
      id: 1,
      name: "Lebanon Headquarters",
      address: "Hasbaiyya, Lebanon",
      phone: "+32 466 31 69 14",
      hours: "Mon-Fri: 9:00 AM - 6:00 PM",
      description:
        "Our main headquarters in the heart of Lebanon, serving as the central hub for all European operations.",
      mapUrl: "https://maps.app.goo.gl/ssy116Siht1TmBz5A",
      mapEmbed:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d548218.1678235683!2d35.8649574809203!3d33.70424846532812!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151ec69cc4ea1465%3A0xe5a197746f6edd48!2sHasbaiyya!5e1!3m2!1sen!2slb!4v1760279671628!5m2!1sen!2slb",
      isHeadquarters: true,
    },
    {
      id: 2,
      name: "Belgium Distribution Center",
      address: "Grotewinkellaan 80, 1853 Grimbergen, Belgium",
      phone: "+32 478 69 25 86",
      hours: "Mon-Sat: 8:00 AM - 7:00 PM",
      description:
        "Our primary distribution center handling logistics and wholesale operations across Belgium and Netherlands.",
      mapUrl:
        "https://maps.google.com/?q=Grotewinkellaan+80,+1853+Grimbergen,+Belgium",
      mapEmbed:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2516.9295886847384!2d4.36675731577342!3d50.92686817954371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c3c24765f9f333%3A0x605c157948878c46!2sGrotewinkellaan%2080%2C%201853%20Grimbergen%2C%20Belgium!5e0!3m2!1sen!2sus!4v1652690859615!5m2!1sen!2sus",
      isHeadquarters: false,
    },
    // {
    //   id: 3,
    //   name: "Ghent Retail Store",
    //   address: "Korenlei 78, 9000 Ghent, Belgium",
    //   phone: "+32 478 69 25 86",
    //   hours: "Tue-Sun: 10:00 AM - 8:00 PM",
    //   description:
    //     "Our flagship retail store offering the complete range of ORSA olive oils and tasting experiences.",
    //   mapUrl: "https://maps.google.com/?q=Korenlei+78,+9000+Ghent,+Belgium",
    //   mapEmbed:
    //     "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2507.9472638547365!2d3.7194527157416227!3d51.05407787956251!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c371b7b1b1b1b1%3A0x7a7a7a7a7a7a7a7a!2sKorenlei%2078%2C%209000%20Gent%2C%20Belgium!5e0!3m2!1sen!2sus!4v1652690949461!5m2!1sen!2sus",
    //   isHeadquarters: false,
    // },
  ];

  return (
    <div className="w-full overflow-hidden">
      {/* Ultra-Enhanced Header */}
      <div
        ref={headerRef}
        className="py-32 bg-cover bg-center relative overflow-hidden"
        style={{ backgroundImage: `url(\"/new-background.jpg\")` }}
      >
        {/* Advanced Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/70"></div>

        {/* Animated Geometric Shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="floating-shape absolute top-20 left-20 w-40 h-40 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-full blur-xl"></div>
          <div className="floating-shape absolute bottom-1/4 right-1/4 w-32 h-32 bg-gradient-to-br from-green-400/20 to-emerald-500/20 rounded-full blur-lg"></div>
          <div className="floating-shape absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-cyan-500/20 rounded-lg transform rotate-45 blur-md"></div>
        </div>

        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="page-header-content backdrop-blur-md bg-white/10 rounded-3xl p-16 border border-white/20">
            {/* 3D Icon */}
            <div className="mb-8 perspective-1000">
              <div className="inline-block p-8 bg-gradient-to-br from-yellow-400/20 to-orange-600/20 rounded-full backdrop-blur-md border border-white/20 shadow-2xl transform-gpu">
                <svg
                  className="w-20 h-20 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm3 1h6v4H7V5zm8 8v2a1 1 0 01-1 1H6a1 1 0 01-1-1v-2h10z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl text-center text-transparent bg-gradient-to-r from-white via-yellow-200 to-orange-200 bg-clip-text mb-6 font-black">
              {t("our-branches")}
            </h1>
            <p className="text-lg md:text-2xl text-center text-gray-200 max-w-4xl mx-auto leading-relaxed">
              Discover our locations across Belgium where you can experience the
              finest Lebanese olive oils and connect with our passionate team.
            </p>
          </div>
        </div>
      </div>

      {/* Ultra-Enhanced Branches Section -----------------------------------------------------------------------------------------------*/}
      <section
        ref={branchesRef}
        className="py-40 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden"
      >
        <div className="parallax-bg absolute inset-0 bg-gradient-to-br from-yellow-50/50 to-transparent"></div>

        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <h2 className="text-4xl md:text-6xl text-center text-transparent bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text mb-16 font-black">
            Our Locations
          </h2>

          <div className="space-y-16">
            {branches.map((branch, index) => (
              <div
                key={branch.id}
                className={`branch-card grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
                }`}
              >
                {/* Branch Map */}
                <div
                  className={`relative ${
                    index % 2 === 1 ? "md:col-start-2" : ""
                  }`}
                >
                  <div className="backdrop-blur-md bg-white/80 rounded-3xl p-4 md:p-6 shadow-2xl border border-white/20 transform-gpu">
                    <iframe
                      src={branch.mapEmbed}
                      className="w-full h-64 md:h-80 rounded-2xl transition-transform duration-700 hover:scale-105"
                      loading="lazy"
                      allowFullScreen
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`Map of ${branch.name}`}
                    ></iframe>

                    {/* Branch Badge */}
                    {branch.isHeadquarters && (
                      <div className="absolute top-10 left-10 backdrop-blur-md bg-yellow-500/90 text-white px-4 py-2 rounded-full text-sm font-bold shadow-xl">
                        Headquarters
                      </div>
                    )}

                    {/* 3D Floating Elements */}
                    <div className="absolute top-10 right-10 w-16 h-16 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-full blur-lg animate-pulse"></div>
                    <div className="absolute bottom-10 left-10 w-12 h-12 bg-gradient-to-br from-green-400/20 to-emerald-500/20 rounded-full blur-md animate-bounce"></div>
                  </div>
                </div>

                {/* Branch Information */}
                <div
                  className={`${
                    index % 2 === 1 ? "md:col-start-1 md:row-start-1" : ""
                  }`}
                >
                  <div className="backdrop-blur-md bg-white/80 rounded-3xl p-8 md:p-10 shadow-2xl border border-white/20">
                    <h3 className="text-3xl md:text-4xl mb-4 md:mb-6 text-gray-800 font-black">
                      {branch.name}
                    </h3>

                    <p className="mb-6 md:mb-8 text-gray-600 leading-relaxed text-base md:text-lg">
                      {branch.description}
                    </p>

                    {/* Contact Information */}
                    <div className="space-y-4 mb-8">
                      <div className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg
                            className="w-4 h-4 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="text-gray-800 font-semibold text-sm md:text-base">
                            Address
                          </p>
                          <p className="text-gray-600 text-xs md:text-sm">
                            {branch.address}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg
                            className="w-4 h-4 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-gray-800 font-semibold text-sm md:text-base">
                            Phone
                          </p>
                          <p className="text-gray-600 text-xs md:text-sm">
                            {branch.phone}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg
                            className="w-4 h-4 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="text-gray-800 font-semibold text-sm md:text-base">
                            Hours
                          </p>
                          <p className="text-gray-600 text-xs md:text-sm">
                            {branch.hours}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="flex gap-4">
                      <a
                        href={`tel:${branch.phone}`}
                        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-6 rounded-full font-bold text-center transition-all duration-500 hover:from-green-600 hover:to-emerald-700 hover:shadow-xl transform hover:scale-105"
                      >
                        Call Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ultra-Enhanced Contact Section */}
      <section
        ref={contactRef}
        className="py-32 bg-gradient-to-br from-slate-900 via-yellow-900 to-slate-900 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gray-900 opacity-5"></div>

        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <h2 className="text-6xl text-center text-transparent bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text mb-20 font-black">
            Get In Touch
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="contact-card backdrop-blur-md bg-white/10 rounded-3xl p-8 border border-white/20 text-center text-white transform-gpu">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Call Us</h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                Speak directly with our team
              </p>
              <div className="space-y-2">
                <p className="text-yellow-300 font-semibold">
                  +32 466 31 69 14
                </p>
                <p className="text-yellow-300 font-semibold">
                  +32 478 69 25 86
                </p>
              </div>
            </div>

            <div className="contact-card backdrop-blur-md bg-white/10 rounded-3xl p-8 border border-white/20 text-center text-white transform-gpu">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Email Us</h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                Send us your inquiries
              </p>
              <p className="text-cyan-300 font-semibold">Orsa.t@hotmail.com</p>
            </div>

            <div className="contact-card backdrop-blur-md bg-white/10 rounded-3xl p-8 border border-white/20 text-center text-white transform-gpu">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.04 2c-5.45 0-9.91 4.46-9.91 9.91 0 1.75.46 3.45 1.35 4.96l-1.4 5.15 5.25-1.37c1.45.79 3.08 1.22 4.71 1.22 5.45 0 9.91-4.46 9.91-9.91s-4.46-9.91-9.91-9.91zm.04 1.5c4.6 0 8.41 3.74 8.41 8.41 0 4.6-3.74 8.41-8.41 8.41-1.58 0-3.1-.44-4.4-1.22l-4.5 1.18 1.2-4.4c-.8-1.3-1.2-2.8-1.2-4.4 0-4.6 3.74-8.41 8.41-8.41z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">WhatsApp</h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                Chat with us instantly
              </p>
              <a
                href="https://wa.me/32478692586"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-green-500 text-white px-6 py-2 rounded-full font-bold transition-all duration-300 hover:bg-green-600 transform hover:scale-105"
              >
                Start Chat
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurBranches;
