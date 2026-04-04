"use client";

import * as React from "react";
import { ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export type CustomSelectOption = {
  value: string;
  label: string;
};

export type CustomSelectProps = {
  options: CustomSelectOption[];
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  className?: string;
  id?: string;
  disabled?: boolean;
  "aria-invalid"?: boolean;
};

function CustomSelect({
  options,
  value,
  onChange,
  onBlur,
  placeholder = "Seleccionar...",
  className,
  id,
  disabled,
  "aria-invalid": ariaInvalid,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const selectedLabel =
    options.find((opt) => opt.value === value)?.label ?? placeholder;

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      <button
        id={id}
        type="button"
        disabled={disabled}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-invalid={ariaInvalid}
        onBlur={() => onBlur?.()}
        onClick={() => !disabled && setIsOpen((o) => !o)}
        className={cn(
          "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-all",
          "hover:border-primary/25 hover:bg-muted/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          isOpen && "border-ring ring-2 ring-ring/30",
          disabled && "cursor-not-allowed opacity-50",
          ariaInvalid && "border-destructive focus-visible:ring-destructive/40",
        )}
      >
        <span className={value ? "text-foreground" : "text-muted-foreground"}>
          {selectedLabel}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="h-4 w-4 opacity-50" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 4, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className={cn(
              "absolute z-50 max-h-60 w-full overflow-hidden rounded-md border border-border bg-popover text-popover-foreground shadow-lg",
            )}
          >
            <div className="p-1">
              {options.map((option) => (
                <motion.li
                  key={option.value === "" ? "__empty" : option.value}
                  role="option"
                  aria-selected={value === option.value}
                  whileHover={{ x: 2 }}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                    onBlur?.();
                  }}
                  className={cn(
                    "relative flex cursor-pointer select-none items-center rounded-md py-2 pl-3 pr-9 text-sm outline-none transition-colors",
                    "hover:bg-accent hover:text-accent-foreground",
                    value === option.value
                      ? "bg-muted font-medium"
                      : "text-foreground",
                  )}
                >
                  {option.label}
                  {value === option.value && (
                    <span className="absolute right-3 flex h-3.5 w-3.5 items-center justify-center">
                      <Check className="h-4 w-4" />
                    </span>
                  )}
                </motion.li>
              ))}
            </div>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export { CustomSelect };
