import { useCallback, useEffect, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  CircleDollarSign,
  LoaderCircle,
  Pencil,
  Plus,
  RefreshCw,
  Save,
  Trash2,
  ToggleLeft,
  ToggleRight,
  X,
} from "lucide-react";
import { supabase } from "../../lib/supabase";

const emptyForm = {
  name: "",
  description: "",
  base_price: "",
  active: true,
};

const money = (value) =>
  value == null || value === ""
    ? "Not set"
    : new Intl.NumberFormat("en-KE", {
        style: "currency",
        currency: "KES",
        maximumFractionDigits: 2,
      }).format(Number(value));

export default function ServicesFares() {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const loadServices = useCallback(async () => {
    setLoading(true);
    setError("");

    const { data, error: queryError } = await supabase
      .from("services")
      .select("id, name, description, base_price, active, created_at, updated_at")
      .order("name", { ascending: true });

    if (queryError) {
      setError(queryError.message);
      setServices([]);
    } else {
      setServices(data ?? []);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    loadServices();
  }, [loadServices]);

  function startNew() {
    setEditingId(null);
    setForm(emptyForm);
    setError("");
    setNotice("");
  }

  function startEdit(service) {
    setEditingId(service.id);
    setForm({
      name: service.name ?? "",
      description: service.description ?? "",
      base_price: service.base_price ?? "",
      active: service.active ?? true,
    });
    setError("");
    setNotice("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setNotice("");

    const name = form.name.trim();
    const description = form.description.trim();
    const priceText = String(form.base_price).trim();
    const price = priceText === "" ? null : Number(priceText);

    if (!name) {
      setError("Enter a service name.");
      return;
    }

    if (name.length > 120 || description.length > 2000) {
      setError("The service name or description is too long.");
      return;
    }

    if (
      price !== null &&
      (!Number.isFinite(price) || price < 0 || price > 999999999)
    ) {
      setError("Enter a valid non-negative fare in KES, or leave it blank.");
      return;
    }

    setSaving(true);

    const payload = {
      name,
      description: description || null,
      base_price: price,
      active: Boolean(form.active),
      updated_at: new Date().toISOString(),
    };

    const result = editingId
      ? await supabase
          .from("services")
          .update(payload)
          .eq("id", editingId)
          .select("id")
          .maybeSingle()
      : await supabase
          .from("services")
          .insert(payload)
          .select("id")
          .single();

    setSaving(false);

    if (result.error) {
      setError(
        result.error.code === "23505"
          ? "A service with these details already exists."
          : result.error.message
      );
      return;
    }

    if (!result.data) {
      setError(
        "No service was changed. Check that your admin account has permission to manage services."
      );
      return;
    }

    setNotice(editingId ? "Service updated successfully." : "Service added successfully.");
    setEditingId(null);
    setForm(emptyForm);
    await loadServices();
  }

  async function toggleActive(service) {
    setError("");
    setNotice("");

    const { data, error: updateError } = await supabase
      .from("services")
      .update({
        active: !service.active,
        updated_at: new Date().toISOString(),
      })
      .eq("id", service.id)
      .select("id")
      .maybeSingle();

    if (updateError) {
      setError(updateError.message);
      return;
    }

    if (!data) {
      setError("The service was not changed. Check your admin permissions.");
      return;
    }

    setNotice(
      `${service.name} is now ${service.active ? "inactive" : "active"}.`
    );
    await loadServices();
  }

  async function deleteService() {
    if (!serviceToDelete) return;

    const service = serviceToDelete;
    setDeletingId(service.id);
    setError("");
    setNotice("");

    try {
      const { data, error: deleteError } = await supabase
        .from("services")
        .delete()
        .eq("id", service.id)
        .select("id")
        .maybeSingle();

      if (deleteError) {
        if (deleteError.code === "23503") {
          throw new Error(
            "This service is linked to existing bookings and cannot be deleted. Deactivate it instead."
          );
        }
        throw deleteError;
      }

      if (!data) {
        throw new Error(
          "The service was not deleted. Check your admin permissions and try again."
        );
      }

      setServices((current) =>
        current.filter((item) => item.id !== service.id)
      );
      if (editingId === service.id) {
        setEditingId(null);
        setForm(emptyForm);
      }
      setServiceToDelete(null);
      setNotice(`${service.name} was deleted.`);
    } catch (deleteError) {
      setError(deleteError.message || "Could not delete this service.");
      setServiceToDelete(null);
    } finally {
      setDeletingId(null);
    }
  }

  const activeCount = services.filter((service) => service.active).length;
  const pricedCount = services.filter(
    (service) => service.base_price != null
  ).length;

  return (
    <div className="space-y-7">
      <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-700">
            Pricing and catalogue
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-900">
            Services &amp; Fares
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-600">
            Manage the transport services offered by Fringe Transport and their
            indicative starting fares in Kenyan shillings.
          </p>
        </div>

        <button
          type="button"
          onClick={startNew}
          className="inline-flex min-h-11 items-center justify-center gap-2 bg-[#171717] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#333333]"
        >
          <Plus size={17} />
          Add service
        </button>
      </section>

      {error && (
        <div
          role="alert"
          className="flex items-start gap-3 border border-red-200 bg-red-50 p-4 text-sm text-red-800"
        >
          <AlertCircle size={19} className="mt-0.5 shrink-0" />
          <span className="break-words">{error}</span>
        </div>
      )}

      {notice && (
        <div
          role="status"
          className="flex items-start gap-3 border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800"
        >
          <CheckCircle2 size={19} className="mt-0.5 shrink-0" />
          <span>{notice}</span>
        </div>
      )}

      <section className="grid gap-4 sm:grid-cols-3">
        {[
          {
            label: "Total services",
            value: services.length,
            icon: CircleDollarSign,
          },
          { label: "Active services", value: activeCount, icon: CheckCircle2 },
          { label: "Fares configured", value: pricedCount, icon: Save },
        ].map(({ label, value, icon: Icon }) => (
          <article
            key={label}
            className="border border-neutral-200 bg-white p-5 sm:p-6"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-neutral-500">{label}</p>
              <span className="flex h-10 w-10 items-center justify-center bg-amber-50 text-amber-700">
                <Icon size={19} />
              </span>
            </div>
            <p className="mt-4 text-3xl font-semibold tabular-nums text-neutral-900">
              {value}
            </p>
          </article>
        ))}
      </section>

      <section className="border border-neutral-200 bg-white">
        <div className="border-b border-neutral-200 px-5 py-5 sm:px-7">
          <h2 className="font-semibold text-neutral-900">
            {editingId ? "Edit service" : "Add a service"}
          </h2>
          <p className="mt-1 text-sm text-neutral-500">
            A blank base fare means the price has not yet been configured.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-5 sm:p-7">
          <div className="grid gap-5 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-neutral-700">
                Service name <span className="text-red-600">*</span>
              </span>
              <input
                required
                maxLength={120}
                value={form.name}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    name: event.target.value,
                  }))
                }
                placeholder="e.g. Airport Transfer"
                className="w-full border border-neutral-300 bg-white px-3.5 py-3 text-sm outline-none focus:border-amber-600"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-neutral-700">
                Indicative base fare (KES)
              </span>
              <input
                type="number"
                min="0"
                max="999999999"
                step="0.01"
                value={form.base_price}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    base_price: event.target.value,
                  }))
                }
                placeholder="Leave blank if not set"
                className="w-full border border-neutral-300 bg-white px-3.5 py-3 text-sm outline-none focus:border-amber-600"
              />
              <span className="mt-2 block text-xs leading-5 text-neutral-500">
                This is a starting price, not an automatic final quotation.
              </span>
            </label>
          </div>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-neutral-700">
              Description
            </span>
            <textarea
              rows={3}
              maxLength={2000}
              value={form.description}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  description: event.target.value,
                }))
              }
              placeholder="Describe the service and what it covers."
              className="w-full resize-y border border-neutral-300 bg-white px-3.5 py-3 text-sm outline-none focus:border-amber-600"
            />
          </label>

          <label className="flex cursor-pointer items-start gap-3 border border-neutral-200 bg-neutral-50 p-4">
            <input
              type="checkbox"
              checked={form.active}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  active: event.target.checked,
                }))
              }
              className="mt-1 h-4 w-4 accent-amber-600"
            />
            <span>
              <span className="block text-sm font-semibold text-neutral-900">
                Available for new bookings
              </span>
              <span className="mt-1 block text-xs leading-5 text-neutral-500">
                Inactive services should be hidden from the public booking form
                when that form is connected to this catalogue.
              </span>
            </span>
          </label>

          <div className="flex flex-wrap gap-3 border-t border-neutral-100 pt-5">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex min-h-11 items-center justify-center gap-2 bg-[#D97706] px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? (
                <LoaderCircle size={17} className="animate-spin" />
              ) : (
                <Save size={17} />
              )}
              {saving
                ? "Saving..."
                : editingId
                  ? "Save changes"
                  : "Create service"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={startNew}
                className="inline-flex min-h-11 items-center justify-center gap-2 border border-neutral-300 px-5 py-3 text-sm font-semibold text-neutral-700 hover:bg-neutral-50"
              >
                <X size={17} />
                Cancel editing
              </button>
            )}
          </div>
        </form>
      </section>

      <section className="border border-neutral-200 bg-white">
        <div className="flex items-center justify-between gap-4 border-b border-neutral-200 px-5 py-5 sm:px-7">
          <div>
            <h2 className="font-semibold text-neutral-900">Service catalogue</h2>
            <p className="mt-1 text-sm text-neutral-500">
              Review, edit, deactivate or delete a service.
            </p>
          </div>
          <button
            type="button"
            onClick={loadServices}
            disabled={loading}
            aria-label="Refresh services"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center border border-neutral-200 text-neutral-600 hover:bg-neutral-50 disabled:opacity-50"
          >
            <RefreshCw size={17} className={loading ? "animate-spin" : ""} />
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center gap-3 p-12 text-sm text-neutral-500">
            <LoaderCircle size={19} className="animate-spin" />
            Loading services...
          </div>
        ) : services.length === 0 ? (
          <div className="px-6 py-14 text-center">
            <CircleDollarSign size={30} className="mx-auto text-neutral-300" />
            <h3 className="mt-4 font-semibold text-neutral-900">
              No services added yet
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-neutral-500">
              Create your first service above. You can leave the fare blank
              until your pricing is confirmed.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-neutral-100">
            {services.map((service) => (
              <article
                key={service.id}
                className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:px-7"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold text-neutral-900">
                      {service.name}
                    </h3>
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                        service.active
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-neutral-100 text-neutral-500"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          service.active ? "bg-emerald-500" : "bg-neutral-400"
                        }`}
                      />
                      {service.active ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <p className="mt-2 text-lg font-semibold text-neutral-800">
                    {money(service.base_price)}
                  </p>
                  <p className="mt-1 whitespace-pre-wrap break-words text-sm leading-6 text-neutral-500">
                    {service.description || "No description provided."}
                  </p>
                </div>

                <div className="flex shrink-0 flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => startEdit(service)}
                    className="inline-flex min-h-10 items-center justify-center gap-2 border border-neutral-200 px-3.5 py-2 text-sm font-medium text-neutral-700 hover:border-amber-500 hover:text-amber-800"
                  >
                    <Pencil size={15} />
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleActive(service)}
                    className="inline-flex min-h-10 items-center justify-center gap-2 border border-neutral-200 px-3.5 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
                  >
                    {service.active ? (
                      <ToggleRight size={17} />
                    ) : (
                      <ToggleLeft size={17} />
                    )}
                    {service.active ? "Deactivate" : "Activate"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setServiceToDelete(service)}
                    disabled={deletingId === service.id}
                    aria-label={`Delete ${service.name}`}
                    title="Delete service"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-red-200 text-red-600 transition hover:border-red-300 hover:bg-red-50 hover:text-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <p className="text-xs leading-5 text-neutral-500">
        Fares configured here are indicative base prices. Final journey prices
        may depend on distance, duration, waiting time, additional stops and
        other agreed requirements. Existing bookings retain their own
        quotations.
      </p>

      {serviceToDelete && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget && !deletingId) {
              setServiceToDelete(null);
            }
          }}
        >
          <section
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="delete-service-title"
            aria-describedby="delete-service-description"
            className="w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-6 shadow-2xl"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <Trash2 size={19} />
            </div>
            <h2
              id="delete-service-title"
              className="mt-4 text-lg font-semibold text-neutral-900"
            >
              Delete this service?
            </h2>
            <p
              id="delete-service-description"
              className="mt-2 text-sm leading-6 text-neutral-600"
            >
              <span className="font-semibold text-neutral-800">
                {serviceToDelete.name}
              </span>{" "}
              will be permanently removed from the service catalogue. If it is
              linked to existing bookings, the service must be deactivated
              instead.
            </p>
            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setServiceToDelete(null)}
                disabled={Boolean(deletingId)}
                className="rounded-xl border border-neutral-200 px-4 py-2.5 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50 disabled:opacity-50"
              >
                Keep service
              </button>
              <button
                type="button"
                onClick={deleteService}
                disabled={Boolean(deletingId)}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Trash2 size={15} />
                {deletingId ? "Deleting…" : "Delete service"}
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
