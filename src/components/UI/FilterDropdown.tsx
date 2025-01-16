import React from "react";
import { TableFilterProps } from "./CustomTable";

const FilterDropdown: React.FC<TableFilterProps> = ({
  setColumnFilters
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setColumnFilters([
      {
        id: "level",
        value: selectedValue === "all" ? "" : selectedValue,
      },
    ]);
    console.log("Selected Course ID:", selectedValue);
  };
  const levels = ["100", "200", "300", "400", "500", "600"];
  return (
    <div className="float-right right-0 rounded-md bg-white">
      {/* <div>Filter By Level</div> */}
      <select
        name="selectedLevel"
        id="level"
        className="border-2 text-[10px] w-full md:w-[300px] pl-3 rounded-lg h-14 mr-8 bg-white "
        onChange={handleChange}
      >
        <option value={"all"}>{"All"}</option>
        {levels?.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterDropdown;
