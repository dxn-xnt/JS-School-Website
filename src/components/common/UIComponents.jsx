import React, { useEffect } from "react";
import {
  X,
  Search,
  AlertTriangle,
  CheckCircle,
  Info,
  AlertCircle,
  ChevronRight,
  Sparkles
} from "lucide-react";

/**
 * Modern Reusable UI Components
 */

// ----------------------------------------------------------------------------
// BADGE COMPONENT
// ----------------------------------------------------------------------------
export function Badge({ children, variant = "default", className = "", size = "md" }) {
  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-xs",
    lg: "px-3 py-1.5 text-sm"
  };

  const variants = {
    default: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700",
    primary: "bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border-blue-200 dark:border-blue-800",
    success: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
    warning: "bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800",
    danger: "bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200 dark:border-rose-800",
    purple: "bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border-purple-200 dark:border-purple-800",
    indigo: "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800",
    teal: "bg-teal-50 text-teal-700 dark:bg-teal-950/60 dark:text-teal-300 border-teal-200 dark:border-teal-800",
    outline: "bg-transparent text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-700"
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full border transition-all ${
        sizeClasses[size] || sizeClasses.md
      } ${variants[variant] || variants.default} ${className}`}
    >
      {children}
    </span>
  );
}

// ----------------------------------------------------------------------------
// BUTTON COMPONENT
// ----------------------------------------------------------------------------
export function Button({
  children,
  variant = "primary",
  size = "md",
  icon: Icon,
  iconPosition = "left",
  className = "",
  disabled = false,
  onClick,
  type = "button",
  ...props
}) {
  const baseClasses =
    "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] select-none";

  const sizeClasses = {
    sm: "px-3 py-1.5 text-xs gap-1.5 shadow-xs",
    md: "px-4 py-2 text-sm gap-2 shadow-xs",
    lg: "px-5 py-2.5 text-base gap-2.5 shadow-sm",
    icon: "p-2 text-sm"
  };

  const variantClasses = {
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500 shadow-blue-500/20 shadow-md",
    secondary:
      "bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 focus:ring-slate-400 border border-slate-200 dark:border-slate-700",
    outline:
      "bg-transparent hover:bg-slate-100 text-slate-700 dark:hover:bg-slate-800 dark:text-slate-300 border border-slate-300 dark:border-slate-700 focus:ring-slate-400",
    ghost:
      "bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 focus:ring-slate-400",
    destructive:
      "bg-rose-600 hover:bg-rose-700 text-white focus:ring-rose-500 shadow-rose-500/20 shadow-md",
    success:
      "bg-emerald-600 hover:bg-emerald-700 text-white focus:ring-emerald-500 shadow-emerald-500/20 shadow-md",
    warning:
      "bg-amber-600 hover:bg-amber-700 text-white focus:ring-amber-500 shadow-amber-500/20 shadow-md"
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseClasses} ${sizeClasses[size] || sizeClasses.md} ${
        variantClasses[variant] || variantClasses.primary
      } ${className}`}
      {...props}
    >
      {Icon && iconPosition === "left" && <Icon className="w-4 h-4 shrink-0" />}
      {children}
      {Icon && iconPosition === "right" && <Icon className="w-4 h-4 shrink-0" />}
    </button>
  );
}

// ----------------------------------------------------------------------------
// STAT CARD COMPONENT
// ----------------------------------------------------------------------------
export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  color = "blue",
  onClick
}) {
  const colorThemes = {
    blue: "from-blue-500/10 to-indigo-500/5 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-900/40",
    emerald: "from-emerald-500/10 to-teal-500/5 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/40",
    purple: "from-purple-500/10 to-pink-500/5 text-purple-600 dark:text-purple-400 border-purple-100 dark:border-purple-900/40",
    amber: "from-amber-500/10 to-orange-500/5 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-900/40",
    rose: "from-rose-500/10 to-red-500/5 text-rose-600 dark:text-rose-400 border-rose-100 dark:border-rose-900/40",
    indigo: "from-indigo-500/10 to-cyan-500/5 text-indigo-600 dark:text-indigo-400 border-indigo-100 dark:border-indigo-900/40"
  };

  const iconBgThemes = {
    blue: "bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400",
    emerald: "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400",
    purple: "bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400",
    amber: "bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400",
    rose: "bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400",
    indigo: "bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400"
  };

  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden rounded-2xl border bg-white dark:bg-slate-900 p-5 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 ${
        onClick ? "cursor-pointer" : ""
      } ${colorThemes[color] || colorThemes.blue}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {title}
          </p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              {value}
            </span>
            {trend && (
              <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                {trend}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{subtitle}</p>
          )}
        </div>
        {Icon && (
          <div className={`rounded-xl p-3 shadow-xs ${iconBgThemes[color] || iconBgThemes.blue}`}>
            <Icon className="h-6 w-6" />
          </div>
        )}
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------------
// MODAL COMPONENT
// ----------------------------------------------------------------------------
export function Modal({ isOpen, onClose, title, description, children, maxWidth = "max-w-xl" }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={onClose}
      />

      {/* Dialog container */}
      <div
        className={`relative w-full ${maxWidth} overflow-hidden rounded-2xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-800 z-10 animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col`}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 px-6 py-5 bg-slate-50/50 dark:bg-slate-950/30">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {title}
            </h3>
            {description && (
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                {description}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------------
// SEARCH INPUT COMPONENT
// ----------------------------------------------------------------------------
export function SearchInput({ value, onChange, placeholder = "Search records...", className = "" }) {
  return (
    <div className={`relative flex items-center ${className}`}>
      <Search className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-9 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-xs"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-3 p-0.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}

// ----------------------------------------------------------------------------
// SELECT FILTER COMPONENT
// ----------------------------------------------------------------------------
export function SelectFilter({ value, onChange, options, label, icon: Icon, className = "" }) {
  return (
    <div className={`relative flex items-center ${className}`}>
      {Icon && <Icon className="absolute left-3 w-4 h-4 text-slate-400 pointer-events-none" />}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full ${
          Icon ? "pl-9" : "pl-3.5"
        } pr-8 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer transition-all shadow-xs`}
      >
        {label && <option value="ALL">{label}</option>}
        {options.map((opt) => (
          <option key={typeof opt === "string" ? opt : opt.value} value={typeof opt === "string" ? opt : opt.value}>
            {typeof opt === "string" ? opt : opt.label}
          </option>
        ))}
      </select>
      <div className="absolute right-3 pointer-events-none text-slate-400 text-xs">▼</div>
    </div>
  );
}

// ----------------------------------------------------------------------------
// EMPTY STATE COMPONENT
// ----------------------------------------------------------------------------
export function EmptyState({ icon: Icon = Info, title, description, actionLabel, onAction }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30">
      <div className="rounded-2xl bg-blue-50 dark:bg-blue-950/50 p-4 text-blue-600 dark:text-blue-400 mb-4">
        <Icon className="w-8 h-8" />
      </div>
      <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1">{title}</h4>
      <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mb-5">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction} variant="primary" size="sm">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

// ----------------------------------------------------------------------------
// CONFIRM DIALOG COMPONENT
// ----------------------------------------------------------------------------
export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure you want to proceed? This action cannot be undone.",
  confirmLabel = "Delete",
  confirmVariant = "destructive"
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="max-w-md">
      <div className="space-y-4">
        <div className="flex items-start gap-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 p-3.5 text-rose-800 dark:text-rose-200 border border-rose-200 dark:border-rose-900/50">
          <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 text-rose-600 dark:text-rose-400" />
          <p className="text-xs leading-relaxed">{message}</p>
        </div>

        <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
          <Button variant="secondary" onClick={onClose} size="sm">
            Cancel
          </Button>
          <Button
            variant={confirmVariant}
            onClick={() => {
              onConfirm();
              onClose();
            }}
            size="sm"
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

// ----------------------------------------------------------------------------
// TOAST NOTIFICATION COMPONENT
// ----------------------------------------------------------------------------
export function Toast({ toast }) {
  if (!toast) return null;

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-emerald-500" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-500" />,
    error: <AlertCircle className="w-5 h-5 text-rose-500" />,
    info: <Info className="w-5 h-5 text-blue-500" />
  };

  const bgClasses = {
    success: "border-emerald-500/20 bg-emerald-950/90 text-white",
    warning: "border-amber-500/20 bg-amber-950/90 text-white",
    error: "border-rose-500/20 bg-rose-950/90 text-white",
    info: "border-blue-500/20 bg-slate-900/95 text-white"
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-200">
      <div
        className={`flex items-center gap-3 rounded-xl border px-4 py-3 shadow-xl backdrop-blur-md ${
          bgClasses[toast.type] || bgClasses.info
        }`}
      >
        {icons[toast.type] || icons.info}
        <span className="text-sm font-medium">{toast.message}</span>
      </div>
    </div>
  );
}
