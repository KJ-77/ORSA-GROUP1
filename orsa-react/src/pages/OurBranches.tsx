import { useEffect, useRef } from "react";
import { useLanguage } from "../context/LanguageContext";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import "../styles/OurBranches.css";

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
      gsap.fromTo(
        headerRef.current.querySelector(".page-header-content"),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1 }
      );
    }

    // Branches animation
    if (branchesRef.current) {
      ScrollTrigger.create({
        trigger: branchesRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.fromTo(
            branchesRef.current?.querySelectorAll(".branch-card"),
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, stagger: 0.2, duration: 0.8 }
          );
        },
      });
    }
  }, []);

  return (
    <div className="our-branches-page">
      {/* Page Header */}
      <div ref={headerRef} className="page-header">
        <div className="container">
          <div className="page-header-content">
            <h1>{t("our-branches")}</h1>
            <p>Visit us at one of our locations across Lebanon</p>
          </div>
        </div>
      </div>

      {/* Branches Section */}
      <section ref={branchesRef} className="branches-section">
        <div className="container">
          <div className="branches-grid">
            {branches.map((branch) => (
              <div key={branch.id} className="branch-card">
                <div className="branch-image">
                  <img src={branch.image} alt={branch.name} />
                </div>
                <div className="branch-content">
                  <h2>{branch.name}</h2>
                  <p className="branch-address">{branch.address}</p>
                  <p className="branch-contact">
                    <strong>Phone:</strong> {branch.phone}
                    <br />
                    <strong>Email:</strong> {branch.email}
                  </p>
                  <p className="branch-hours">
                    <strong>Hours:</strong>
                    <br />
                    {branch.hours}
                  </p>
                  <a
                    href={branch.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn"
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
      <section className="contact-section">
        <div className="container">
          <div className="contact-content">
            <h2>Get in Touch</h2>
            <p>
              Can't find a branch near you? Contact our customer service team
              for information about our products, wholesale inquiries, or to
              place an order for delivery.
            </p>
            <div className="contact-info">
              <p>
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
