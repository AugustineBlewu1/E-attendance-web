import { GlobalTableFilterProps } from "./CustomTable";

const GlobalTableFilter: React.FC<GlobalTableFilterProps> = ({
  globalFilter,
  setGlobalFilter,
}) => {
  return (
    <div className="">
      <div className="flex items-center my-4 md:my-0 pb-4">
        <input
          type="text"
          className="border-2 text-[10px] w-full md:w-[300px] pl-8 rounded-lg py-4"
          placeholder="Search"
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e?.target?.value)}
        />
      </div>
    </div>
  );
};

export default GlobalTableFilter;
