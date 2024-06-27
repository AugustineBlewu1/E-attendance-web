import React from "react";
import { CustomDropDownFilter } from "./CustomTable";

const DropdownFilter: React.FC<CustomDropDownFilter> = ({
  onChange,
  items,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    console.log("Selected Course ID:", selectedValue);
    onChange(event);
  };
  return (
    <div className="float-right right-0 rounded-md bg-white">
      <div>Filter By course</div>
      <select
        name="selectedCourse"
        id="Course"
        className="border-2 text-[10px] w-full md:w-[300px] pl-8 rounded-lg h-14 mr-8 bg-white"
        onChange={handleChange}
      >
         <option value={"all"}>
            {"All"}
          </option>
        {items?.map((item, index) => (
          <option key={index} value={item.course_id}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownFilter;
