import * as React from "react";
import { ChevronDown } from "lucide-react";

export interface SelectOption {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: SelectOption[];
  defaultValue?: string;
  placeholder?: string;
  className?: string;
  buttonClassName?: string;
  dropdownClassName?: string;
  optionClassName?: string;
  onValueChange?: (value: string) => void;
}

const CustomSelect = ({
  options,
  defaultValue,
  placeholder = "Select an option",
  className = "",
  buttonClassName = "",
  dropdownClassName = "",
  optionClassName = "",
  onValueChange,
}: CustomSelectProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(() => {
    if (defaultValue) {
      const defaultOption = options.find(
        (option) => option.value === defaultValue
      );
      return defaultOption ? defaultOption.label : placeholder;
    }
    return placeholder;
  });

  const handleSelect = (option: SelectOption) => {
    setSelectedValue(option.label);
    setIsOpen(false);
    if (onValueChange) {
      onValueChange(option.value);
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Select Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`bg-white border-0 shadow-2xl rounded-lg text-black px-2 py-1 text-xs font-medium min-w-[120px] flex items-center justify-between hover:bg-gray-50 transition-colors ${buttonClassName}`}
      >
        <span>{selectedValue}</span>
        <ChevronDown
          className={`w-3 h-3 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Options */}
      {isOpen && (
        <div
          className={`absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[120px] ${dropdownClassName}`}
        >
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSelect(option)}
              className={`w-full text-left px-3 py-2 text-xs font-medium text-black hover:bg-zinc-200 focus:bg-zinc-200 transition-colors first:rounded-t-lg last:rounded-b-lg ${optionClassName}`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}

      {/* Click outside to close */}
      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
};

export default CustomSelect;
