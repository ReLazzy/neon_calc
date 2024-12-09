import React from "react";

interface Option {
  label: string;
  value: string;
}

export interface Characteristic {
  name: string;
  type: "select" | "radio" | "text";
  options?: Option[];
  value: string;
}

interface SignCharacteristicsFormProps {
  value: string;
  characteristic: Characteristic;
  onChange: (name: string, value: string) => void;
}

const SignCharacteristicsForm: React.FC<SignCharacteristicsFormProps> = ({
  value,
  characteristic,
  onChange,
}) => {
  const handleChange = (name: string, value: string) => {
    onChange(name, value);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-8 rounded-xl px-4 py-6">
      <div className="space-y-4">
        <label className="block text-xl font-semibold text-white">
          {characteristic.name}
        </label>

        {/* Если тип характеристики - "select" */}
        {characteristic.type === "select" && characteristic.options ? (
          <div className="flex gap-2">
            {characteristic.options.map((option) => (
              <div
                key={option.value}
                onClick={() => handleChange(characteristic.name, option.value)}
                className={`flex cursor-pointer select-none items-center justify-center rounded-md border-2 px-6 py-3 transition duration-300 ${
                  option.value === value
                    ? "border-blue-500 bg-blue-500 text-white"
                    : "bg-transparent text-white hover:bg-gray-700"
                }`}
              >
                {option.label}
              </div>
            ))}
          </div>
        ) : characteristic.type === "radio" && characteristic.options ? (
          <div className="flex gap-2">
            {characteristic.options.map((option) => (
              <div
                key={option.value}
                onClick={() => handleChange(characteristic.name, option.value)}
                className={`flex cursor-pointer select-none items-center justify-center rounded-md border-2 px-6 py-3 transition duration-300 ${
                  option.value === value
                    ? "border-blue-500 bg-blue-500 text-white"
                    : "bg-transparent text-white hover:bg-gray-700"
                }`}
              >
                {option.label}
              </div>
            ))}
          </div>
        ) : (
          <input
            type="text"
            value={value}
            onChange={(e) => handleChange(characteristic.name, e.target.value)}
            className="mt-2 block w-full rounded-xl border-2 border-gray-300 bg-transparent px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        )}
      </div>
    </div>
  );
};

export default SignCharacteristicsForm;
