export default function Button({
  children,
  variant = "primary",
  className = "",
  type = "button",
  loading = false,
  disabled = false,
  ...props
}) {
  const variants = {
    primary:
      "bg-gradient-to-r from-[#D97706] to-[#F59E0B] text-white shadow-md shadow-amber-900/15 hover:brightness-105 hover:shadow-lg",
    secondary:
      "bg-[#171717] text-white shadow-sm hover:bg-[#303030] hover:shadow-md",
    outline:
      "border border-amber-700/40 bg-white text-amber-800 hover:border-amber-700 hover:bg-amber-50",
    ghost:
      "text-[#171717] hover:bg-black/5",
    success:
      "bg-emerald-700 text-white shadow-sm hover:bg-emerald-800 hover:shadow-md",
    warning:
      "bg-amber-500 text-neutral-950 shadow-sm hover:bg-amber-400 hover:shadow-md",
    danger:
      "bg-red-600 text-white shadow-sm hover:bg-red-700 hover:shadow-md",
    link:
      "text-amber-800 underline-offset-4 hover:text-amber-900 hover:underline",
  }

  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold transition duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 active:translate-y-0 active:scale-[.98] disabled:cursor-not-allowed disabled:opacity-55 disabled:shadow-none ${variants[variant] || variants.primary} ${className}`}
      {...props}
    >
      {loading && (
        <span
          aria-hidden="true"
          className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent"
        />
      )}
      {children}
    </button>
  )
}