import React, { useEffect } from "react";
import {
  X,
  Search,
  AlertTriangle,
  CheckCircle,
  Info,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription, AlertAction } from "@/components/ui/alert";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarBadge
} from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

// Re-export UI primitives
export {
  Button,
  Badge,
  Input,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Alert,
  AlertTitle,
  AlertDescription,
  AlertAction,
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarBadge,
  Progress,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue
};

// ----------------------------------------------------------------------------
// STAT CARD (Using Card primitives from UI folder)
// ----------------------------------------------------------------------------
export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  onClick,
  className
}) {
  return (
    <Card
      onClick={onClick}
      className={cn(
        "transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 relative overflow-hidden bg-card border-border hover:border-primary/40",
        onClick ? "cursor-pointer" : "cursor-default",
        className
      )}
    >
      <CardContent className="p-5 flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {title}
          </p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold tracking-tight text-foreground">
              {value}
            </span>
            {trend && (
              <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                {trend}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>
          )}
        </div>
        {Icon && (
          <div className="rounded-xl p-3 shadow-xs bg-primary/10 text-primary">
            <Icon className="h-5 w-5" />
          </div>
        )}
      </CardContent>
    </Card>
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
        className="fixed inset-0 bg-background/80 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Card */}
      <Card
        className={cn(
          "relative w-full overflow-hidden bg-card shadow-2xl border-border z-10 duration-200 max-h-[90vh] flex flex-col p-0",
          maxWidth
        )}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-border px-6 py-4 bg-muted/30">
          <div>
            <h3 className="text-lg font-bold text-card-foreground">
              {title}
            </h3>
            {description && (
              <p className="mt-0.5 text-xs text-muted-foreground">
                {description}
              </p>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={onClose}
            className="rounded-lg text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>
      </Card>
    </div>
  );
}

// ----------------------------------------------------------------------------
// SEARCH INPUT COMPONENT (Built on UI Input)
// ----------------------------------------------------------------------------
export function SearchInput({ value, onChange, placeholder = "Search records...", className = "" }) {
  return (
    <div className={cn("relative flex items-center", className)}>
      <Search className="absolute left-3 w-4 h-4 text-muted-foreground pointer-events-none z-10" />
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-9 pr-8"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute right-2.5 p-0.5 text-muted-foreground hover:text-foreground rounded cursor-pointer z-10"
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
    <div className={cn("relative flex items-center w-full", className)}>
      <Select value={value} onValueChange={(val) => val && onChange(val)}>
        <SelectTrigger className="w-full h-8 bg-transparent text-sm">
          {Icon && <Icon className="w-4 h-4 text-muted-foreground mr-1 shrink-0" />}
          <SelectValue placeholder={label || "Select option"} />
        </SelectTrigger>
        <SelectContent>
          {label && <SelectItem value="ALL">{label}</SelectItem>}
          {options.map((opt) => {
            const val = typeof opt === "string" ? opt : opt.value;
            const lbl = typeof opt === "string" ? opt : opt.label;
            return (
              <SelectItem key={val} value={val}>
                {lbl}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}

// ----------------------------------------------------------------------------
// EMPTY STATE COMPONENT
// ----------------------------------------------------------------------------
export function EmptyState({ icon: Icon = Info, title, description, actionLabel, onAction }) {
  return (
    <Card className="flex flex-col items-center justify-center py-12 px-4 text-center border-dashed border-2 bg-muted/20">
      <div className="rounded-2xl bg-primary/10 p-4 text-primary mb-4">
        <Icon className="w-8 h-8" />
      </div>
      <h4 className="text-base font-bold text-foreground mb-1">{title}</h4>
      <p className="text-xs text-muted-foreground max-w-sm mb-5">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction} variant="default" size="sm">
          {actionLabel}
        </Button>
      )}
    </Card>
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
        <Alert variant={confirmVariant === "destructive" ? "destructive" : "default"}>
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle className="font-semibold">Notice</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </Alert>

        <div className="flex justify-end gap-2 pt-3 border-t border-border">
          <Button variant="outline" onClick={onClose} size="sm">
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
    error: <AlertCircle className="w-5 h-5 text-destructive" />,
    info: <Info className="w-5 h-5 text-primary" />
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card
        className="flex flex-row items-center gap-3 px-4 py-3 shadow-xl backdrop-blur-md border-border bg-card/95 text-card-foreground p-0"
      >
        {icons[toast.type] || icons.info}
        <span className="text-sm font-medium">{toast.message}</span>
      </Card>
    </div>
  );
}
