import { useCallback, useEffect, useState } from "react";
import { Check, Clock3, RefreshCw, Search, Star, Trash2, X } from "lucide-react";
import { supabase } from "../../lib/supabase";

const filters = ["pending", "approved", "rejected", "all"];

export default function ReviewsManagement() {
const [reviews, setReviews] = useState([]);
const [filter, setFilter] = useState("pending");
const [search, setSearch] = useState("");
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");
const [notice, setNotice] = useState("");
const [busy, setBusy] = useState("");

const load = useCallback(async () => {
setLoading(true);
setError("");
const result = await supabase.from("customer_reviews").select("id,customer_name,service_name,rating,comment,status,created_at").order("created_at", { ascending: false });
if (result.error) {
setError(result.error.message);
} else {
setReviews(result.data || []);
}
setLoading(false);
}, []);

useEffect(() => { load(); }, [load]);

const counts = {
all: reviews.length,
pending: reviews.filter((r) => r.status === "pending").length,
approved: reviews.filter((r) => r.status === "approved").length,
rejected: reviews.filter((r) => r.status === "rejected").length
};

const shown = reviews.filter((r) => {
const statusMatch = filter === "all" || r.status === filter;
const term = search.trim().toLowerCase();
const textMatch = !term || [r.customer_name, r.service_name, r.comment].some((v) => String(v || "").toLowerCase().includes(term));
return statusMatch && textMatch;
});

async function updateStatus(review, status) {
setBusy(review.id);
setError("");
setNotice("");
const result = await supabase.from("customer_reviews").update({ status }).eq("id", review.id);
if (result.error) {
setError(result.error.message);
} else {
setReviews((items) => items.map((r) => r.id === review.id ? { ...r, status } : r));
setNotice("Review status updated.");
}
setBusy("");
}

async function removeReview(review) {
if (!window.confirm("Permanently delete this customer review?")) return;
setBusy(review.id);
setError("");
setNotice("");
const result = await supabase.from("customer_reviews").delete().eq("id", review.id);
if (result.error) {
setError(result.error.message);
} else {
setReviews((items) => items.filter((r) => r.id !== review.id));
setNotice("Review deleted.");
}
setBusy("");
}

return (

<main className="mx-auto w-full max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
<header className="flex flex-wrap items-center justify-between gap-4">
<div>
<p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600">Customer experience</p>
<h1 className="mt-2 text-3xl font-bold text-neutral-900">Customer Reviews</h1>
<p className="mt-2 text-sm text-neutral-500">Moderate customer feedback before publication.</p>
</div>
<button type="button" onClick={load} disabled={loading} className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm font-semibold hover:border-amber-500 disabled:opacity-50"><RefreshCw size={16} /> Refresh</button>
</header>

<section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
{[{ key: "all", label: "Total reviews" }, { key: "pending", label: "Pending" }, { key: "approved", label: "Approved" }, { key: "rejected", label: "Rejected" }].map((item) => (
<div key={item.key} className="rounded-2xl border border-neutral-200 bg-white p-5">
<p className="text-sm text-neutral-500">{item.label}</p>
<p className="mt-2 text-3xl font-bold text-neutral-900">{counts[item.key]}</p>
</div>
))}
</section>

{error && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">{error}</p>}
{notice && <p role="status" className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">{notice}</p>}

<section className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
<div className="flex flex-col gap-4 border-b border-neutral-200 p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
<div className="flex flex-wrap gap-2">
{filters.map((item) => <button key={item} type="button" onClick={() => setFilter(item)} className={`rounded-full px-4 py-2 text-sm font-semibold capitalize ${filter === item ? "bg-neutral-900 text-white" : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"}`}>{item} ({counts[item]})</button>)}
</div>
<label className="flex items-center gap-2 rounded-xl border border-neutral-200 px-3 py-2"><Search size={17} className="text-neutral-400" /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search reviews" className="min-w-0 bg-transparent text-sm outline-none" /></label>
</div>

{loading ? <p className="p-10 text-center text-sm text-neutral-500">Loading reviews…</p> : shown.length === 0 ? <p className="p-10 text-center text-sm text-neutral-500">No reviews found for this filter.</p> : (

<div className="divide-y divide-neutral-100">
{shown.map((review) => (
<article key={review.id} className="space-y-4 p-4 sm:p-6">
<div className="flex flex-wrap items-start justify-between gap-3">
<div>
<h2 className="font-bold text-neutral-900">{review.customer_name || "Customer"}</h2>
<p className="mt-1 text-xs text-neutral-500">{review.service_name || "Transport service"} · {review.created_at ? new Date(review.created_at).toLocaleString() : ""}</p>
<div className="mt-3 flex items-center gap-1" aria-label={`${review.rating} out of 5 stars`}>
{[1,2,3,4,5].map((n) => <Star key={n} size={16} className={n <= review.rating ? "fill-amber-400 text-amber-500" : "text-neutral-300"} />)}
<span className="ml-1 text-sm text-neutral-600">{review.rating}/5</span>
</div>
</div>
<span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold capitalize text-neutral-700">{review.status}</span>
</div>
<p className="whitespace-pre-wrap break-words text-sm leading-7 text-neutral-700">{review.comment || "No written comment."}</p>
<div className="flex flex-wrap gap-2 border-t border-neutral-100 pt-4">
{review.status !== "approved" && <button type="button" disabled={busy === review.id} onClick={() => updateStatus(review, "approved")} className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-3 py-2 text-sm font-semibold text-neutral-950 disabled:opacity-50"><Check size={16} /> Approve</button>}
{review.status !== "rejected" && <button type="button" disabled={busy === review.id} onClick={() => updateStatus(review, "rejected")} className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 px-3 py-2 text-sm font-semibold text-neutral-700 disabled:opacity-50"><X size={16} /> Reject</button>}
{review.status !== "pending" && <button type="button" disabled={busy === review.id} onClick={() => updateStatus(review, "pending")} className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 px-3 py-2 text-sm font-semibold text-neutral-700 disabled:opacity-50"><Clock3 size={16} /> Return to pending</button>}
<button type="button" disabled={busy === review.id} onClick={() => removeReview(review)} className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm font-semibold text-red-700 disabled:opacity-50 sm:ml-auto"><Trash2 size={16} /> Delete</button>
</div>
</article>
))}
</div>
)}
</section>
</main>
);
}
