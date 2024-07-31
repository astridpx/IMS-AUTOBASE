import { useState } from "react";
import { useSearchParams } from "react-router-dom";

interface DropdownProps {
  options: string[] | number[];
  placeholder?: string;
  param: string;
}

const Dropdown = ({ options, placeholder, param }: DropdownProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [selected, setSelected] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  // Dropdown trigger
  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option: string) => {
    setSelected(option);
    setIsOpen(false);

    const params = new URLSearchParams(searchParams);

    // delete params if selected "all"
    if (option === "All") {
      params.delete(param);
      setSearchParams(params);
    } else {
      // set search param
      params.set(param, option);
      setSearchParams(params);
    }
  };

  return (
    <div className="relative inline-block w-full">
      <div className="border border-gray-300 rounded-md shadow-sm">
        {/* button trigger */}
        <button
          onClick={toggleDropdown}
          className="w-full px-4 py-2 text-sm text-left bg-white rounded-md shadow-sm min-w-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {selected || placeholder}
          <span className="float-right">
            <svg
              className={`w-5 h-5 transition-transform transform ${
                isOpen ? "rotate-180" : "rotate-0"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </span>
        </button>

        {/* option filter list */}
        {isOpen && (
          <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
            <li
              onClick={() => handleOptionClick("All")}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              All
            </li>
            {options?.map((option) => (
              <li
                key={option}
                onClick={() => handleOptionClick(option.toString())}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
