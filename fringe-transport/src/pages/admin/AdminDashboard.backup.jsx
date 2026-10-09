import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  CheckCircle2,
  Clock3,
  Download,
  MapPin,
  Phone,
  RefreshCw,
  Search,
  Users,
  XCircle,
} from "lucide-react";
import { supabase } from "../../lib/supabase";

const statuses = ["pending", "confirmed", "completed", "cancelled"];

const statusStyles = {
  pending: "bg-amber-50 text-amber-800 ring-amber-200",
  confirmed: "bg-blue-50 text-blue-800 ring-blue-200",
  completed: "bg-emerald-50 text-emerald-800 ring-emerald-200",
  cancelled: "bg-red-50 text-red-700 ring-red-200",
};

function field(row, ...keys) {
  for (const key of keys) {
    if (row?.[key] !== undefined && row?.[key] !== null && row[key] !== "") {
      return row[key];
    }
  }
  return "";
}

function displayDate(value) {
  if (!value) return "—";
  const parsed = new Date(`${value}`.length === 10 ? `${value}T00:00:00` : value);
  return Number.isNaN(parsed.getTime())
    ? String(value)
    : new Intl.DateTimeFormat("en-KE", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }).format(parsed);
}

function formatStatus(value) {
  return String(value || "unknown")
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function MetricCard({ title, value, note, icon: Icon, accent, loading }) {
  return (
    <div className="rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.025)] sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-neutral-500">{title}</p>
          <p className="mt-4 text-3xl font-semibold tracking-tight text-[#171717]">
            {loading ? (
              <span className="inline-block h-9 w-14 animate-pulse rounded-lg bg-neutral-100" />
            ) : (
              value
            )}
          </p>
        </div>
        <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${accent}`}>
          <Icon size={20} strokeWidth={1.8} />
        </span>
      </div>
      <p className="mt-4 text-xs text-neutral-500">{note}</p>
    </div>
  );
}

function StatusBadge({ status }) {
  const value = String(status || "pending").toLowerCase();
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ring-inset ${
        statusStyles[value] || "bg-neutral-100 text-neutral-700 ring-neutral-200"
      }`}
    >
      {formatStatus(value)}
    </span>
  );
}

export default function AdminDashboard() {
  const location = useLocation();
  const bookingsPage = location.pathname.endsWith("/bookings");
  const [bookings, setBookings] = useState([]);
  const [counts, setCounts] = useState({
    total: 0,
    today: 0,
    pending: 0,
    confirmed: 0,
    completed: 0,
    cancelled: 0,
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [updatingId, setUpdatingId] = useState("");

  const loadData = useCallback(async (refresh = false) => {
    setError("");
    if (refresh) setRefreshing(true);
    else setLoading(true);

    try {
      const today = new Date();
      const dayStart = [
        today.getFullYear(),
        String(today.getMonth() + 1).padStart(2, "0"),
        String(today.getDate()).padStart(2, "0"),
      ].join("-");
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const dayEnd = [
        tomorrow.getFullYear(),
        String(tomorrow.getMonth() + 1).padStart(2, "0"),
        String(tomorrow.getDate()).padStart(2, "0"),
      ].join("-");

      const [listResult, totalResult, todayResult, ...statusResults] =
        await Promise.all([
          supabase
            .from("bookings")
            .select("*")
            .order("created_at", { ascending: false })
            .limit(200),
          supabase.from("bookings").select("id", { count: "exact", head: true }),
          supabase
            .from("bookings")
            .select("id", { count: "exact", head: true })
            .gte("travel_date", dayStart)
            .lt("travel_date", dayEnd),
          ...statuses.map((status) =>
            supabase
              .from("bookings")
              .select("id", { count: "exact", head: true })
              .eq("status", status)
          ),
        ]);

      if (listResult.error) throw listResult.error;
      if (totalResult.error) throw totalResult.error;
      if (todayResult.error) throw todayResult.error;

      for (const result of statusResults) {
        if (result.error) throw result.error;
      }

      setBookings(listResult.data || []);
      setCounts({
        total: totalResult.count || 0,
        today: todayResult.count || 0,
        pending: statusResults[0].count || 0,
        confirmed: statusResults[1].count || 0,
        completed: statusResults[2].count || 0,
        cancelled: statusResults[3].count || 0,
      });
    } catch (err) {
      setError(
        err.message ||
          "Could not load bookings. Check your Supabase connection and administrator policies."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const visibleBookings = useMemo(() => {
    const query = search.trim().toLowerCase();

    return bookings.filter((booking) => {
      const status = String(booking.status || "pending").toLowerCase();
      const matchesFilter = filter === "all" || status === filter;
      const searchable = [
        field(booking, "reference", "booking_reference"),
        field(booking, "full_name", "customer_name", "name", "passenger_name"),
        field(booking, "phone", "customer_phone", "phone_number"),
        field(booking, "email", "customer_email"),
        field(booking, "pickup", "pickup_location", "pickup_address"),
        field(booking, "destination", "destination_location", "dropoff"),
      ]
        .join(" ")
        .toLowerCase();

      return matchesFilter && (!query || searchable.includes(query));
    });
  }, [bookings, filter, search]);

  async function updateStatus(booking, nextStatus) {
    if (booking.status === nextStatus) return;
    setUpdatingId(booking.id);
    setError("");

    try {
      const { error: updateError } = await supabase
        .from("bookings")
        .update({ status: nextStatus })
        .eq("id", booking.id);

      if (updateError) throw updateError;

      setBookings((current) =>
        current.map((item) =>
          item.id === booking.id ? { ...item, status: nextStatus } : item
        )
      );

      await loadData(true);
    } catch (err) {
      setError(
        err.message ||
          "Status could not be updated. Check your database permissions."
      );
    } finally {
      setUpdatingId("");
    }
  }

  function exportCsv() {
    const columns = [
      ["Reference", (b) => field(b, "reference", "booking_reference")],
      ["Customer", (b) => field(b, "full_name", "customer_name", "name")],
      ["Phone", (b) => field(b, "phone", "customer_phone", "phone_number")],
      ["Email", (b) => field(b, "email", "customer_email")],
      ["Pickup", (b) => field(b, "pickup", "pickup_location", "pickup_address")],
      ["Destination", (b) => field(b, "destination", "destination_location", "dropoff")],
      ["Travel date", (b) => field(b, "travel_date", "date")],
      ["Travel time", (b) => field(b, "travel_time", "time")],
      ["Status", (b) => field(b, "status")],
    ];

    const escape = (value) =>
      `"${String(value ?? "").replaceAll('"', '""')}"`;

    const csv = [
      columns.map(([label]) => escape(label)).join(","),
      ...visibleBookings.map((booking) =>
        columns.map(([, getValue]) => escape(getValue(booking))).join(",")
      ),
    ].join("\r\n");

    const url = URL.createObjectURL(
      new Blob(["\uFEFF", csv], { type: "text/csv;charset=utf-8;" })
    );
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `fringe-bookings-${new Date().toISOString().slice(0, 10)}.csv`;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  const metrics = [
    {
      title: "Bookings today",
      value: counts.today,
      note: "Trips scheduled for today",
      icon: CalendarDays,
      accent: "bg-orange-50 text-[#B45309]",
    },
    {
      title: "Awaiting action",
      value: counts.pending,
      note: "Requests pending confirmation",
      icon: Clock3,
      accent: "bg-amber-50 text-amber-700",
    },
    {
      title: "Confirmed",
      value: counts.confirmed,
      note: "Bookings confirmed",
      icon: CheckCircle2,
      accent: "bg-blue-50 text-blue-700",
    },
    {
      title: "Completed",
      value: counts.completed,
      note: "Successfully completed trips",
      icon: Check,
      accent: "bg-emerald-50 text-emerald-700",
    },
  ];

  return (
    <div>
      <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[#B45309]">
            {bookingsPage ? "Operations / Bookings" : "Operations overview"}
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-[34px]">
            {bookingsPage ? "Booking management" : "Good to see you."}
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-6 text-neutral-500">
            {bookingsPage
              ? "Review customer requests, manage trip status and export your booking records."
              : "Here is the current picture of your transport operations."}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => loadData(true)}
            disabled={refreshing}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm font-semibold transition hover:border-neutral-300 disabled:opacity-50"
          >
            <RefreshCw size={15} className={refreshing ? "animate-spin" : ""} />
            Refresh
          </button>
          <button
            type="button"
            onClick={exportCsv}
            disabled={visibleBookings.length === 0}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#171717] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#333] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Download size={15} />
            Export CSV
          </button>
        </div>
      </div>

      {error && (
        <div
          role="alert"
          className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-700"
        >
          <XCircle size={18} className="mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold">There is a problem loading or updating data.</p>
            <p>{error}</p>
            <button
              type="button"
              onClick={() => loadData(true)}
              className="mt-2 font-semibold underline underline-offset-2"
            >
              Try again
            </button>
          </div>
        </div>
      )}

      {!bookingsPage && (
        <>
          <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {metrics.map((metric) => (
              <MetricCard
                key={metric.title}
                {...metric}
                loading={loading}
              />
            ))}
          </div>

          <div className="mb-7 grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div className="rounded-2xl bg-[#171717] p-6 text-white sm:p-7 lg:col-span-2">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
                    Booking activity
                  </p>
                  <p className="mt-3 text-3xl font-semibold">
                    {loading ? "—" : counts.total}
                  </p>
                  <p className="mt-2 text-sm text-white/55">
                    Total recorded bookings
                  </p>
                </div>
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#D97706]">
                  <Users size={20} />
                </span>
              </div>

              <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  ["Pending", counts.pending, "bg-amber-400"],
                  ["Confirmed", counts.confirmed, "bg-blue-400"],
                  ["Completed", counts.completed, "bg-emerald-400"],
                  ["Cancelled", counts.cancelled, "bg-red-400"],
                ].map(([label, value, color]) => (
                  <div
                    key={label}
                    className="rounded-xl border border-white/10 bg-white/[0.05] p-3"
                  >
                    <span className={`mb-3 block h-1 w-7 rounded-full ${color}`} />
                    <p className="text-xl font-semibold">{loading ? "—" : value}</p>
                    <p className="mt-1 text-[11px] text-white/50">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-2xl border border-neutral-200/80 bg-white p-6 sm:p-7">
              <div>
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-[#B45309]">
                  <CalendarDays size={20} />
                </span>
                <h2 className="mt-5 text-lg font-semibold">Stay on top of requests</h2>
                <p className="mt-2 text-sm leading-6 text-neutral-500">
                  Review new bookings and keep customers informed of their trip status.
                </p>
              </div>
              <Link
                to="/admin/bookings"
                className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#B45309] transition hover:text-[#D97706]"
              >
                Manage bookings <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </>
      )}

      <section className="overflow-hidden rounded-2xl border border-neutral-200/80 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.025)]">
        <div className="flex flex-col gap-4 border-b border-neutral-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <h2 className="text-base font-semibold">
              {bookingsPage ? "All bookings" : "Recent bookings"}
            </h2>
            <p className="mt-1 text-xs text-neutral-500">
              {loading ? "Loading records..." : `${visibleBookings.length} displayed · ${counts.total} total`}
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
              />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search bookings..."
                aria-label="Search bookings"
                className="w-full rounded-xl border border-neutral-200 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-[#D97706] sm:w-56"
              />
            </div>
            <select
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
              aria-label="Filter by status"
              className="rounded-xl border border-neutral-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#D97706]"
            >
              <option value="all">All statuses</option>
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {formatStatus(status)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="space-y-3 p-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="h-14 animate-pulse rounded-xl bg-neutral-50" />
            ))}
          </div>
        ) : visibleBookings.length === 0 ? (
          <div className="px-5 py-16 text-center sm:px-8">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-500">
              <CalendarDays size={22} />
            </span>
            <h3 className="mt-4 text-sm font-semibold">
              {bookings.length === 0 ? "No bookings yet" : "No matching bookings"}
            </h3>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-neutral-500">
              {bookings.length === 0
                ? "Customer booking requests will appear here when they are submitted through your website."
                : "Try a different search term or change the selected status filter."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] border-collapse text-left">
              <thead>
                <tr className="border-b border-neutral-100 bg-neutral-50/70">
                  {["Booking / Customer", "Journey", "Travel date", "Status", "Update status"].map(
                    (label) => (
                      <th
                        key={label}
                        className="px-5 py-3.5 text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-500 sm:px-6"
                      >
                        {label}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {visibleBookings.map((booking) => {
                  const reference = field(booking, "reference", "booking_reference");
                  const name = field(
                    booking,
                    "full_name",
                    "customer_name",
                    "name",
                    "passenger_name"
                  );
                  const phone = field(booking, "phone", "customer_phone", "phone_number");
                  const pickup = field(booking, "pickup", "pickup_location", "pickup_address");
                  const destination = field(
                    booking,
                    "destination",
                    "destination_location",
                    "dropoff"
                  );
                  const date = field(booking, "travel_date", "date");
                  const time = field(booking, "travel_time", "time");
                  const currentStatus = String(booking.status || "pending").toLowerCase();

                  return (
                    <tr key={booking.id} className="transition hover:bg-neutral-50/70">
                      <td className="px-5 py-4 sm:px-6">
                        <p className="text-xs font-bold text-[#B45309]">
                          {reference || `#${String(booking.id).slice(0, 8)}`}
                        </p>
                        <p className="mt-1.5 max-w-[190px] truncate text-sm font-semibold">
                          {name || "Customer name unavailable"}
                        </p>
                        {phone && (
                          <a
                            href={`tel:${phone}`}
                            className="mt-1 inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-[#B45309]"
                          >
                            <Phone size={12} /> {phone}
                          </a>
                        )}
                      </td>
                      <td className="px-5 py-4 sm:px-6">
                        <p className="flex max-w-[250px] items-center gap-1.5 text-xs text-neutral-700">
                          <MapPin size={13} className="shrink-0 text-[#D97706]" />
                          <span className="truncate">{pickup || "Pickup not recorded"}</span>
                        </p>
                        <p className="mt-2 max-w-[250px] truncate pl-5 text-xs text-neutral-500">
                          To: {destination || "Destination not recorded"}
                        </p>
                      </td>
                      <td className="px-5 py-4 sm:px-6">
                        <p className="whitespace-nowrap text-sm font-medium">
                          {displayDate(date)}
                        </p>
                        <p className="mt-1 text-xs text-neutral-500">
                          {time || "Time not set"}
                        </p>
                      </td>
                      <td className="px-5 py-4 sm:px-6">
                        <StatusBadge status={currentStatus} />
                      </td>
                      <td className="px-5 py-4 sm:px-6">
                        <select
                          value={currentStatus}
                          disabled={updatingId === booking.id}
                          onChange={(event) => updateStatus(booking, event.target.value)}
                          aria-label={`Update status for ${reference || booking.id}`}
                          className="max-w-[145px] rounded-lg border border-neutral-200 bg-white px-2.5 py-2 text-xs font-medium outline-none focus:border-[#D97706] disabled:opacity-50"
                        >
                          {statuses.map((status) => (
                            <option key={status} value={status}>
                              {formatStatus(status)}
                            </option>
                          ))}
                        </select>
                        {updatingId === booking.id && (
                          <span className="ml-2 inline-block h-3 w-3 animate-spin rounded-full border border-neutral-300 border-t-[#D97706]" />
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex flex-col gap-3 border-t border-neutral-100 px-5 py-4 text-xs text-neutral-500 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <span>
            Showing up to 200 most recent records. Summary totals are counted from the database.
          </span>
          {!bookingsPage && (
            <Link
              to="/admin/bookings"
              className="inline-flex items-center gap-1.5 font-semibold text-[#B45309] hover:text-[#D97706]"
            >
              Open bookings <ArrowRight size={14} />
            </Link>
          )}
        </div>
      </section>

      <p className="mt-7 text-center text-[11px] text-neutral-400">
        Fringe Transport · Operations dashboard
      </p>
    </div>
  );
}
