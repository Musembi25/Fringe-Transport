import { useCallback, useEffect, useState } from "react";
import {
  ArrowDownWideNarrow,
  ArrowRight,
  CheckCircle2,
  MessageSquareText,
  Send,
  ShieldCheck,
  Star,
  ThumbsUp,
} from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import toyotaWishBackground from "../assets/toyota-wish-2003.jpg";

const amber = "#d97706";

function Stars({ value = 0, interactive = false, onChange, size = 19 }) {
  return (
    <div
      className="flex items-center gap-1"
      role={interactive ? "radiogroup" : "img"}
      aria-label={`${value} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((star) => {
        const active = star <= value;
        const Icon = Star;

        return interactive ? (
          <button
            key={star}
            type="button"
            role="radio"
            aria-checked={value === star}
            aria-label={`${star} ${star === 1 ? "star" : "stars"}`}
            onClick={() => onChange(star)}
            className="rounded-sm p-1 transition duration-200 hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
          >
            <Icon
              size={size}
              strokeWidth={1.8}
              fill={active ? amber : "transparent"}
              color={active ? amber : "#a3a3a3"}
            />
          </button>
        ) : (
          <Icon
            key={star}
            size={size}
            strokeWidth={1.8}
            fill={active ? amber : "transparent"}
            color={active ? amber : "#d4d4d4"}
          />
        );
      })}
    </div>
  );
}

function formatDate(value) {
  if (!value) return "";
  return new Intl.DateTimeFormat("en-KE", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [sort, setSort] = useState("newest");
  const [rating, setRating] = useState(0);
  const [name, setName] = useState("");
  const [service, setService] = useState("");
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadReviews = useCallback(async () => {
    setLoading(true);
    setLoadError("");

    const [reviewResult, serviceResult] = await Promise.all([
      supabase
        .from("customer_reviews")
        .select("id, customer_name, service_name, rating, comment, created_at")
        .eq("status", "approved")
        .order("created_at", { ascending: false }),
      supabase.from("services").select("name").eq("active", true).order("name"),
    ]);

    if (reviewResult.error) {
      setLoadError(
        "We couldn't load reviews right now. Please refresh the page and try again."
      );
    } else {
      setReviews(reviewResult.data ?? []);
    }

    if (!serviceResult.error && serviceResult.data) {
      setServices(serviceResult.data);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    loadReviews();
  }, [loadReviews]);

  const average = reviews.length
    ? reviews.reduce((total, item) => total + item.rating, 0) / reviews.length
    : 0;

  const visibleReviews = reviews
    .filter((item) => ratingFilter === "all" || item.rating === Number(ratingFilter))
    .sort((a, b) =>
      sort === "highest"
        ? b.rating - a.rating || new Date(b.created_at) - new Date(a.created_at)
        : new Date(b.created_at) - new Date(a.created_at)
    );

  async function submitReview(event) {
    event.preventDefault();
    setError("");
    setMessage("");

    const cleanName = name.trim();
    const cleanComment = comment.trim();

    if (rating < 1 || rating > 5) {
      setError("Please select a star rating before submitting.");
      return;
    }

    if (cleanName.length < 2 || cleanName.length > 80) {
      setError("Enter a name between 2 and 80 characters.");
      return;
    }

    if (cleanComment.length < 10 || cleanComment.length > 1500) {
      setError("Your comment must be between 10 and 1,500 characters.");
      return;
    }

    setSubmitting(true);

    const { error: insertError } = await supabase.from("customer_reviews").insert({
      customer_name: cleanName,
      service_name: service || null,
      rating,
      comment: cleanComment,
      status: "pending",
    });

    setSubmitting(false);

    if (insertError) {
      setError(
        "Your review couldn't be submitted. Please try again in a moment."
      );
      return;
    }

    setMessage(
      "Thank you for sharing your experience. Your review has been submitted for approval before it appears publicly."
    );
    setName("");
    setService("");
    setRating(0);
    setComment("");
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f6f2] text-[#171717]">
      <section
        className="reviews-hero relative isolate overflow-hidden bg-[#111111] text-white"
        style={{ "--reviews-hero-image": `url(${toyotaWishBackground})` }}
      >
        <div className="reviews-hero-glow pointer-events-none absolute -right-24 -top-32 h-96 w-96 rounded-full bg-amber-600/15 blur-3xl" />
        <div className="reviews-hero-glow pointer-events-none absolute -bottom-40 left-1/4 h-80 w-80 rounded-full bg-orange-500/10 blur-3xl" />

        <div className="reviews-hero-content relative mx-auto grid max-w-[1280px] gap-12 px-5 py-20 sm:px-6 sm:py-28 lg:grid-cols-[1.2fr_.8fr] lg:items-end lg:px-8 lg:py-32">
          <div className="animate-[reviews-rise_.7s_ease-out_both]">
            <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[.28em] text-amber-500">
              <span className="h-px w-8 bg-amber-500" />
              The customer voice
            </div>

            <h1 className="mt-7 max-w-3xl text-4xl font-semibold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
              Every journey
              <br />
              <span className="text-amber-500">has a story.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-neutral-300 sm:text-lg">
              Your experience matters. Share your feedback, help us improve,
              and help other customers make informed decisions about their
              journey with Fringe Transport.
            </p>

            <a
              href="#write-review"
              className="mt-9 inline-flex items-center gap-3 bg-amber-600 px-6 py-4 text-sm font-semibold text-white transition duration-300 hover:-translate-y-1 hover:bg-amber-500"
            >
              Write a review <ArrowRight size={17} />
            </a>
          </div>

          <div className="animate-[reviews-rise_.8s_ease-out_.12s_both] border border-white/15 bg-white/[.04] p-7 backdrop-blur-sm sm:p-9">
            <p className="text-xs font-semibold uppercase tracking-[.2em] text-neutral-400">
              Customer rating
            </p>

            <div className="mt-5 flex items-end gap-3">
              <span className="text-6xl font-semibold tracking-tight sm:text-7xl">
                {reviews.length ? average.toFixed(1) : "—"}
              </span>
              <span className="pb-2 text-sm text-neutral-400">out of 5</span>
            </div>

            <div className="mt-4">
              <Stars value={reviews.length ? Math.round(average) : 0} size={23} />
            </div>

            <div className="mt-7 border-t border-white/15 pt-5">
              <p className="text-2xl font-medium">
                {reviews.length.toLocaleString()}
              </p>
              <p className="mt-1 text-sm text-neutral-400">
                {reviews.length === 1 ? "published review" : "published reviews"}
              </p>
            </div>

            <p className="mt-5 flex items-start gap-2 text-xs leading-6 text-neutral-400">
              <ShieldCheck size={16} className="mt-0.5 shrink-0 text-amber-500" />
              Only approved customer reviews appear here. Ratings reflect
              published feedback, not estimates.
            </p>
          </div>
        </div>
        <a
          href="https://commons.wikimedia.org/wiki/File:2003-2005_Toyota_Wish.jpg"
          target="_blank"
          rel="noreferrer"
          className="reviews-photo-credit"
          aria-label="Photo: TTTNIS, Wikimedia Commons, public domain"
        >
          Toyota Wish · 2003–2005 <span aria-hidden="true">|</span> Photo: TTTNIS / Wikimedia Commons
        </a>
      </section>

      <section className="mx-auto max-w-[1280px] px-5 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[.72fr_1.28fr] lg:gap-16">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-xs font-semibold uppercase tracking-[.25em] text-amber-700">
              Your feedback counts
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
              Real experiences.
              <br />
              Honest feedback.
            </h2>
            <p className="mt-5 text-sm leading-7 text-neutral-600">
              Tell us what went well and what could be better. Thoughtful
              feedback helps us improve the service we deliver to every customer.
            </p>

            <div className="mt-8 space-y-5">
              <div className="flex gap-4 border-t border-neutral-200 pt-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-white text-amber-700">
                  <MessageSquareText size={20} />
                </div>
                <div>
                  <h3 className="font-semibold">Your words matter</h3>
                  <p className="mt-1 text-sm leading-6 text-neutral-600">
                    Share specific feedback about your experience.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 border-t border-neutral-200 pt-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-white text-amber-700">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h3 className="font-semibold">Considerate and genuine</h3>
                  <p className="mt-1 text-sm leading-6 text-neutral-600">
                    Reviews are checked before being published.
                  </p>
                </div>
              </div>
            </div>
          </aside>

          <div className="min-w-0">
            <div className="flex flex-col gap-4 border-b border-neutral-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[.2em] text-amber-700">
                  Community feedback
                </p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                  What customers say
                </h2>
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-500">
                <ThumbsUp size={16} />
                Genuine published reviews
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap gap-2" aria-label="Filter reviews by rating">
                {[
                  ["all", "All"],
                  ["5", "5 stars"],
                  ["4", "4 stars"],
                  ["3", "3 stars"],
                  ["2", "2 stars"],
                  ["1", "1 star"],
                ].map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setRatingFilter(value)}
                    className={`border px-3 py-2 text-xs font-semibold transition duration-200 ${
                      ratingFilter === value
                        ? "border-[#111111] bg-[#111111] text-white"
                        : "border-neutral-200 bg-white text-neutral-600 hover:border-amber-600 hover:text-amber-800"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <label className="flex items-center gap-2 text-sm text-neutral-600">
                <ArrowDownWideNarrow size={16} />
                <span className="sr-only">Sort reviews</span>
                <select
                  value={sort}
                  onChange={(event) => setSort(event.target.value)}
                  className="min-h-10 max-w-full border border-neutral-200 bg-white px-3 text-sm outline-none focus:border-amber-600"
                >
                  <option value="newest">Newest first</option>
                  <option value="highest">Highest rated</option>
                </select>
              </label>
            </div>

            {loadError && (
              <div role="alert" className="mt-6 border border-red-200 bg-red-50 p-5 text-sm text-red-800">
                {loadError}
                <button
                  type="button"
                  onClick={loadReviews}
                  className="ml-2 font-semibold underline"
                >
                  Try again
                </button>
              </div>
            )}

            {loading ? (
              <div className="mt-8 grid gap-4 sm:grid-cols-2" aria-label="Loading reviews">
                {[1, 2].map((item) => (
                  <div key={item} className="h-52 animate-pulse border border-neutral-200 bg-white p-6">
                    <div className="h-3 w-24 bg-neutral-100" />
                    <div className="mt-7 h-4 w-3/4 bg-neutral-100" />
                    <div className="mt-3 h-3 w-full bg-neutral-100" />
                    <div className="mt-2 h-3 w-2/3 bg-neutral-100" />
                  </div>
                ))}
              </div>
            ) : !loadError && visibleReviews.length === 0 ? (
              <div className="mt-8 border border-dashed border-neutral-300 bg-white px-6 py-14 text-center sm:px-12 sm:py-20">
                <div className="mx-auto flex h-14 w-14 items-center justify-center bg-[#f7f6f2] text-amber-700">
                  <MessageSquareText size={25} strokeWidth={1.6} />
                </div>
                <p className="mt-6 text-xs font-semibold uppercase tracking-[.22em] text-amber-700">
                  A fresh beginning
                </p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                  {ratingFilter === "all"
                    ? "Be the first to share your experience."
                    : "No reviews match this rating yet."}
                </h3>
                <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-neutral-600">
                  {ratingFilter === "all"
                    ? "There are no published reviews yet. Your honest feedback can help make the next journey better."
                    : "Try another rating filter or view all published reviews."}
                </p>
                <div className="mt-7 flex flex-wrap justify-center gap-3">
                  {ratingFilter !== "all" && (
                    <button
                      type="button"
                      onClick={() => setRatingFilter("all")}
                      className="border border-neutral-300 px-5 py-3 text-sm font-semibold transition hover:border-amber-600"
                    >
                      View all reviews
                    </button>
                  )}
                  <a
                    href="#write-review"
                    className="inline-flex items-center gap-2 bg-[#111111] px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-700"
                  >
                    Leave the first review <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            ) : (
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {visibleReviews.map((item, index) => (
                  <article
                    key={item.id}
                    className="group border border-neutral-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-amber-500/70 hover:shadow-xl hover:shadow-neutral-900/[.05] sm:p-7"
                    style={{ animation: `reviews-rise .45s ease-out ${Math.min(index, 6) * 65}ms both` }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <Stars value={item.rating} size={17} />
                      <span className="text-xs text-neutral-400">{formatDate(item.created_at)}</span>
                    </div>
                    {item.service_name && (
                      <span className="mt-5 inline-block bg-[#f7f6f2] px-3 py-1.5 text-xs font-medium text-neutral-600">
                        {item.service_name}
                      </span>
                    )}
                    <p className="mt-5 whitespace-pre-wrap break-words text-sm leading-7 text-neutral-700">
                      {item.comment}
                    </p>
                    <div className="mt-6 flex items-center gap-3 border-t border-neutral-100 pt-5">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#111111] text-sm font-semibold text-amber-500">
                        {item.customer_name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{item.customer_name}</p>
                        <p className="mt-1 flex items-center gap-1 text-xs text-neutral-500">
                          <CheckCircle2 size={13} className="text-green-700" />
                          Published customer review
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section id="write-review" className="scroll-mt-24 bg-white">
        <div className="mx-auto grid max-w-[1280px] gap-12 px-5 py-16 sm:px-6 sm:py-24 lg:grid-cols-[.8fr_1.2fr] lg:gap-20 lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.25em] text-amber-700">
              Share your experience
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
              Help us move
              <br />
              <span className="text-amber-700">forward.</span>
            </h2>
            <p className="mt-5 max-w-md text-sm leading-7 text-neutral-600">
              Your review gives us a chance to celebrate what works and improve
              what doesn't. Please be honest, specific and respectful.
            </p>
            <p className="mt-8 flex items-start gap-3 border-t border-neutral-200 pt-5 text-sm leading-6 text-neutral-500">
              <ShieldCheck size={19} className="mt-0.5 shrink-0 text-amber-700" />
              Your review will be checked before publication. Please don't include
              sensitive personal or payment information.
            </p>
          </div>

          <form onSubmit={submitReview} className="border border-neutral-200 bg-[#f7f6f2] p-5 sm:p-8 lg:p-10">
            <h3 className="text-xl font-semibold tracking-tight">Write a customer review</h3>
            <p className="mt-2 text-sm leading-6 text-neutral-600">
              All fields are required except the service selection.
            </p>

            {message && (
              <div role="status" className="mt-6 flex gap-3 border border-green-200 bg-green-50 p-4 text-sm leading-6 text-green-900">
                <CheckCircle2 size={20} className="mt-0.5 shrink-0" />
                {message}
              </div>
            )}

            {error && (
              <div role="alert" className="mt-6 border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-800">
                {error}
              </div>
            )}

            <fieldset className="mt-7">
              <legend className="text-sm font-semibold">Your rating</legend>
              <div className="mt-3 flex items-center gap-3">
                <Stars value={rating} interactive onChange={setRating} size={25} />
                <span className="min-w-20 text-xs text-neutral-500">
                  {rating ? `${rating} of 5` : "Select stars"}
                </span>
              </div>
            </fieldset>

            <div className="mt-7 grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="review-name" className="mb-2 block text-sm font-semibold">
                  Display name
                </label>
                <input
                  id="review-name"
                  name="customer_name"
                  autoComplete="name"
                  required
                  minLength={2}
                  maxLength={80}
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="How should we display your name?"
                  className="min-h-12 w-full border border-neutral-300 bg-white px-4 text-sm outline-none transition placeholder:text-neutral-400 focus:border-amber-600 focus:ring-2 focus:ring-amber-600/10"
                />
              </div>

              <div>
                <label htmlFor="review-service" className="mb-2 block text-sm font-semibold">
                  Service used <span className="font-normal text-neutral-500">(optional)</span>
                </label>
                <select
                  id="review-service"
                  name="service_name"
                  value={service}
                  onChange={(event) => setService(event.target.value)}
                  className="min-h-12 w-full border border-neutral-300 bg-white px-4 text-sm outline-none transition focus:border-amber-600 focus:ring-2 focus:ring-amber-600/10"
                >
                  <option value="">General experience</option>
                  {services.map((item) => (
                    <option key={item.name} value={item.name}>{item.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between gap-3">
                <label htmlFor="review-comment" className="text-sm font-semibold">
                  Your comments
                </label>
                <span className="text-xs text-neutral-500">{comment.length}/1500</span>
              </div>
              <textarea
                id="review-comment"
                name="comment"
                required
                minLength={10}
                maxLength={1500}
                rows={5}
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                placeholder="Tell us about your experience with Fringe Transport..."
                className="w-full resize-y border border-neutral-300 bg-white p-4 text-sm leading-7 outline-none transition placeholder:text-neutral-400 focus:border-amber-600 focus:ring-2 focus:ring-amber-600/10"
              />
              <p className="mt-2 text-xs leading-5 text-neutral-500">
                Minimum 10 characters. Keep your comments respectful and avoid sharing private information.
              </p>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-3 bg-[#111111] px-6 py-4 text-sm font-semibold text-white transition duration-300 hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {submitting ? "Submitting review..." : "Submit review"}
              <Send size={16} />
            </button>

            <p className="mt-4 text-xs leading-5 text-neutral-500">
              Submission does not guarantee publication. Reviews are displayed after approval.
            </p>
          </form>
        </div>
      </section>

      <section className="bg-[#111111] text-white">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-6 px-5 py-12 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.24em] text-amber-500">
              Your next journey
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
              Ready to travel with Fringe?
            </h2>
          </div>
          <Link
            to="/booking"
            className="inline-flex items-center justify-center gap-3 bg-amber-600 px-6 py-4 text-sm font-semibold text-white transition hover:bg-amber-500"
          >
            Book a ride <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      <style>{`
        @keyframes reviews-rise {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </main>
  );
}
