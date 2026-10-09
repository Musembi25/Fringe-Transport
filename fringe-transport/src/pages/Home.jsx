import {
  ArrowRight,
  Check,
  Clock3,
  MapPin,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import backgroundVideo from "../../../BG.mp4";

const services = [
  {
    title: "Airport Transfers",
    description:
      "Reliable airport pickup and drop-off services with clear coordination from departure to arrival.",
  },
  {
    title: "Private Rides",
    description:
      "Comfortable private transport for business, personal travel, appointments and everyday journeys.",
  },
  {
    title: "Corporate Transport",
    description:
      "Professional transport solutions for executives, teams, meetings and corporate engagements.",
  },
];

const benefits = [
  "Professional and dependable service",
  "Comfortable, well-maintained vehicle",
  "Clear communication from booking to arrival",
  "Flexible transport arrangements",
  "Available for scheduled and private journeys",
  "Personal attention to every booking",
];

const processSteps = [
  {
    number: "01",
    title: "Tell us where",
    description:
      "Submit your journey details, pickup location, destination and preferred time.",
  },
  {
    number: "02",
    title: "We confirm",
    description:
      "Your request is reviewed and confirmed with the relevant trip details.",
  },
  {
    number: "03",
    title: "Enjoy the ride",
    description:
      "We take care of the journey while you focus on where you are going.",
  },
];

const stats = [
  {
    icon: Clock3,
    title: "Flexible scheduling",
    detail: "Travel around your schedule",
  },
  {
    icon: Users,
    title: "Personal service",
    detail: "A more direct experience",
  },
  {
    icon: Star,
    title: "Professional standard",
    detail: "Service you can depend on",
  },
];

export default function Home() {
  return (
    <div className="home-page">
      <section className="hero-section">
        <video
          className="hero-background-video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
        >
          <source src={backgroundVideo} type="video/mp4" />
        </video>
        <div className="hero-video-overlay" />
        <div className="hero-glow hero-glow-top" />
        <div className="hero-glow hero-glow-bottom" />

        <div className="section-shell hero-grid">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="eyebrow-line" />
              <span>Private Transport · Nairobi</span>
            </div>

            <h1 className="hero-title">
              Your journey.
              <span className="hero-accent">Our commitment.</span>
            </h1>

            <p className="hero-subtitle">
              Professional, dependable private transport built around your
              schedule. From airport transfers to everyday journeys, Fringe
              Transport gets you where you need to be with confidence.
            </p>

            <div className="hero-actions">
              <Link to="/booking" className="primary-button">
                Book a Ride
                <ArrowRight size={18} className="button-icon" />
              </Link>

              <a href="tel:+254742934895" className="secondary-button">
                Call +254 742 934 895
              </a>
            </div>

            <div className="hero-metrics">
              <div className="metric-box">
                <div className="metric-value">24/7</div>
                <div className="metric-label">Booking enquiries</div>
              </div>

              <div className="metric-box metric-box--bordered">
                <div className="metric-value">Nairobi</div>
                <div className="metric-label">Based &amp; serving</div>
              </div>

              <div className="metric-box metric-box--bordered">
                <div className="metric-value">1:1</div>
                <div className="metric-label">Personal service</div>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-visual-card">
              <div className="visual-topbar">
                <div className="visual-badge">
                  <MapPin size={21} className="visual-icon" />
                </div>

                <div>
                  <p className="visual-label">Service Area</p>
                  <p className="visual-location">Nairobi, Kenya</p>
                </div>
              </div>

              <div className="visual-footer">
                <p className="visual-kicker">FRINGE TRANSPORT</p>
                <p className="visual-heading">Move with confidence.</p>
              </div>
            </div>

            <div className="ride-card">
              <div className="ride-card-header">
                <div>
                  <p className="ride-card-label">Book with Fringe</p>
                  <p className="ride-card-title">Your next ride, made simple.</p>
                </div>

                <div className="ride-icon-wrap">
                  <ArrowRight size={18} />
                </div>
              </div>

              <div className="ride-card-meta">
                <ShieldCheck size={15} />
                <span>Airport · Private · Corporate</span>
              </div>

              <Link to="/booking" className="ride-card-link">
                Start booking
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-plain">
        <div className="section-shell intro-grid">
          <div>
            <p className="section-kicker">Transport made personal</p>
            <h2 className="section-heading">More than getting from A to B.</h2>
          </div>

          <div className="section-copy">
            <p>
              We believe good transport is about more than the vehicle. It is
              about reliability, communication, comfort and knowing that your
              journey is being handled properly.
            </p>

            <Link to="/about" className="inline-link">
              Learn more about Fringe
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      <section className="section section-light">
        <div className="section-shell">
          <div className="section-heading-row">
            <div>
              <p className="section-kicker">What we do</p>
              <h2 className="section-heading">Transport for the journey ahead.</h2>
            </div>

            <Link to="/services" className="inline-link">
              View all services
              <ArrowRight size={17} />
            </Link>
          </div>

          <div className="service-grid">
            {services.map((service, index) => (
              <article key={service.title} className="service-card">
                <div className="service-number">0{index + 1}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <Link to="/services" className="service-link">
                  Explore
                  <ArrowRight size={16} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="section-shell why-grid">
          <div className="why-copy">
            <p className="section-kicker section-kicker-dark">Why Fringe</p>
            <h2 className="section-heading section-heading-dark">
              Dependability is part of the service.
            </h2>

            <p className="why-text">
              Whether you are heading to the airport, a business meeting or
              simply across Nairobi, we focus on making the journey smooth,
              comfortable and professionally handled.
            </p>

            <Link to="/booking" className="primary-button primary-button-dark">
              Plan your journey
              <ArrowRight size={18} className="button-icon" />
            </Link>
          </div>

          <div className="benefits-grid">
            {benefits.map((benefit, index) => (
              <div
                key={benefit}
                className={`benefit-item ${index % 2 === 0 ? "benefit-item-left" : "benefit-item-right"}`}
              >
                <div className="benefit-icon">
                  <Check size={14} />
                </div>
                <p>{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-plain">
        <div className="section-shell">
          <div className="section-heading-stack">
            <p className="section-kicker">Simple process</p>
            <h2 className="section-heading">Book. Confirm. Go.</h2>
          </div>

          <div className="steps-grid">
            {processSteps.map((step) => (
              <div key={step.number} className="step-card">
                <div className="step-number">{step.number}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="stats-strip">
        <div className="section-shell stats-grid">
          {stats.map(({ icon: Icon, title, detail }) => (
            <div key={title} className="stat-item">
              <Icon className="stat-icon" size={28} />
              <div>
                <p className="stat-title">{title}</p>
                <p className="stat-detail">{detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-band">
        <div className="section-shell cta-inner">
          <div>
            <p className="cta-kicker">Ready when you are</p>
            <h2>Have somewhere to be? Let&apos;s get you there.</h2>
          </div>

          <Link to="/booking" className="primary-button primary-button-contrast">
            Book a Ride
            <ArrowRight size={18} className="button-icon" />
          </Link>
        </div>
      </section>
    </div>
  );
}
