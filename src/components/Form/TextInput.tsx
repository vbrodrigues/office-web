import { InputHTMLAttributes } from "react";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function TextInput({ label }: TextInputProps) {
  return (
    <div className="flex flex-col gap-1">
      <p className="font-title text-gray-500">{label}</p>
      <input
        className="bg-gray-200 border border-gray-200 rounded-lg px-4 py-2 focus:outline-blue-500"
        type="email"
      />
    </div>
  );
}
