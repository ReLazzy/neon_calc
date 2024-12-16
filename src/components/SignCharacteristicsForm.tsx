import React from "react";
import { observer } from "mobx-react-lite";

interface Option {
  label: string;
  value: string;
}

export interface Characteristic {
  name: string;
  type: "select" | "text";
  options?: Option[];
  value: string;
}

interface SignCharacteristicsFormProps {
  value: string;
  characteristic: Characteristic;
  onChange: (name: string, value: string) => void;
}

const SignCharacteristicsForm: React.FC<SignCharacteristicsFormProps> =
  observer(({ value, characteristic, onChange }) => {
    const handleChange = (newValue: string) => {
      onChange(characteristic.name, newValue);
    };

    return (
      <div className="rounded-md bg-gray-800 p-3 shadow-md">
        <label className="mb-2 block text-sm font-semibold text-white">
          {characteristic.name}
        </label>

        {characteristic.type === "select" && characteristic.options ? (
          <div className="grid grid-cols-2 gap-2">
            {characteristic.options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleChange(option.value)}
                className={`rounded-md px-3 py-1.5 text-sm transition ${
                  option.value === value
                    ? "bg-blue-500 text-white"
                    : "bg-gray-700 text-white hover:bg-gray-600"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        ) : (
          <input
            type="text"
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-1.5 text-white focus:ring-2 focus:ring-blue-500"
          />
        )}
      </div>
    );
  });

export default SignCharacteristicsForm;
