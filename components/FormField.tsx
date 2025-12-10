"use client";

import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

type BaseProps = {
  id: string;
  label: string;
  error?: string;
  helperText?: string;
};

type InputProps = BaseProps &
  InputHTMLAttributes<HTMLInputElement> & {
    as?: "input";
  };

type TextAreaProps = BaseProps &
  TextareaHTMLAttributes<HTMLTextAreaElement> & {
    as: "textarea";
  };

export type FormFieldProps = InputProps | TextAreaProps;

export function FormField(props: FormFieldProps) {
  const { id, label, error, helperText } = props;
  const common =
    "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:border-gray-700 dark:bg-gray-950 dark:text-white";
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium" htmlFor={id}>
        {label}
      </label>
      {props.as === "textarea" ? (
        <textarea id={id} {...(props as TextAreaProps)} className={common} />
      ) : (
        <input id={id} {...(props as InputProps)} className={common} />
      )}
      {error ? <p className="text-xs text-red-600">{error}</p> : null}
      {helperText ? <p className="text-xs text-gray-500 dark:text-gray-400">{helperText}</p> : null}
    </div>
  );
}
