import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "../redux/jobSlice";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Checkbox } from "../components/ui/checkbox"; // ✅ Fixed import
import { Button } from "./ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

const filterData = [
  {
    filterType: "Location",
    type: "checkbox",
    options: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    filterType: "Job Role",
    type: "checkbox",
    options: [
      "Frontend Developer",
      "Backend Developer",
      "FullStack Developer",
      "UI/UX Designer",
      "Data Scientist",
    ],
  },
  {
    filterType: "Experience Level",
    type: "radio",
    options: ["0 years", "1+ years", "2+ years", "3+ years", "5+ years"],
  },
  {
    filterType: "Job Type",
    type: "radio",
    options: ["Full-Time", "Part-Time", "Internship", "Remote"],
  },
  {
    filterType: "Salary Range",
    type: "checkbox",
    options: ["3-5 LPA", "5-10 LPA", "10+ LPA"],
  },
];

const FilterCard = () => {
  const dispatch = useDispatch();
  const [selectedFilters, setSelectedFilters] = useState({});
  const [expandedFilters, setExpandedFilters] = useState({});

  // Handle filter selection
  const changeHandler = (filterType, value, isCheckbox) => {
    setSelectedFilters((prev) => {
      if (isCheckbox) {
        const prevSelections = prev[filterType] || [];
        const newSelections = prevSelections.includes(value)
          ? prevSelections.filter((item) => item !== value)
          : [...prevSelections, value];

        return { ...prev, [filterType]: newSelections };
      } else {
        return { ...prev, [filterType]: value };
      }
    });
  };

  // Convert selected filters to a string and update Redux
  useEffect(() => {
    const formattedQuery = Object.values(selectedFilters)
      .flat()
      .join(", "); // ✅ Converts filters into a string
    dispatch(setSearchedQuery(formattedQuery));
  }, [selectedFilters, dispatch]);

  // Reset filters
  const resetFilters = () => {
    setSelectedFilters({});
    dispatch(setSearchedQuery(""));
  };

  // Toggle filter sections
  const toggleFilterSection = (filterType) => {
    setExpandedFilters((prev) => ({
      ...prev,
      [filterType]: !prev[filterType],
    }));
  };

  return (
    <div className="w-full max-h-3rem bg-white p-5 rounded-lg shadow-md border border-gray-200">
      <h1 className="font-bold text-xl mb-3">Filter Jobs</h1>

      {filterData.map(({ filterType, type, options }) => (
        <div key={filterType} className="mb-4 border-b pb-3">
          {/* Section Header */}
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleFilterSection(filterType)}
          >
            <h2 className="font-semibold text-gray-800">{filterType}</h2>
            {expandedFilters[filterType] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </div>

          {/* Filter Options */}
          {expandedFilters[filterType] && (
            <div className="mt-2 space-y-2">
              {options.map((item) => (
                <div key={item} className="flex items-center space-x-2">
                  {type === "checkbox" ? (
                    <Checkbox
                      checked={selectedFilters[filterType]?.includes(item) || false}
                      onCheckedChange={() => changeHandler(filterType, item, true)}
                    />
                  ) : (
                    <RadioGroup
                      value={selectedFilters[filterType] || ""}
                      onValueChange={(value) => changeHandler(filterType, value, false)}
                    >
                      <RadioGroupItem value={item} id={`${filterType}-${item}`} />
                    </RadioGroup>
                  )}
                  <Label htmlFor={`${filterType}-${item}`}>{item}</Label>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Action Buttons */}
      <div className="flex justify-between mt-4">
        <Button variant="outline" className="w-1/2 mr-2" onClick={resetFilters}>
          Reset
        </Button>
        <Button className="bg-[#7200a8] text-white w-1/2 hover:bg-[#5a0080]">
          Apply Filters
        </Button>
      </div>
    </div>
  );
};

export default FilterCard;
