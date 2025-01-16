import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  SortingState,
  Table,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import transaction from "../../lotties/transaction.json";
import { useState } from "react";
import GlobalTableFilter from "./GlobalFilter";
import Lottie from "react-lottie";
import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";
import Pagination from "./Pagination";
import { Course } from "../../services/types";
import { Courses } from "../../services/User";
import FilterDropdown from "./FilterDropdown";

const NewCustomTable = <T extends object>({
  data,
  columns,
  showPopoverFilter,
  updateStudentsLevels,
  updateLevels,
  updateLevel,
  confirmLevelUpdate,
  selectedLevels
}: TableProps<T>) => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<SortingState>([
    { id: "created_at", desc: true },
  ]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
  const levels = ["100", "200", "300", "400", "500", "600"];

  const filterFns = {
    // Add a new filter function for filtering by full name
    fullName: (rows: any, filterValue: string) => {
      return rows.filter((row: any) => {
        const fullName = `${row.values.first_name} ${row.values.last_name}`;
        return fullName.toLowerCase().includes(filterValue.toLowerCase());
      });
    },
  };

  const activateUpdateLevels = () => {
    updateLevels && updateLevels();
  };

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
      globalFilter,
      sorting,
      pagination,
    },
    filterFns: filterFns,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    onPaginationChange: setPagination, // Add this
    manualPagination: false,
  });

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: transaction,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  console.log(columnFilters);

  return (
    <>
      {data?.length === 0 ? (
        <>
          <div className="relative">
            <div className="hidden md:block">
              <Lottie options={defaultOptions} width={"50%"} height={"50%"} />
            </div>
            <div className="block md:hidden">
              <Lottie options={defaultOptions} width={"100%"} height={"100%"} />
            </div>
            {/* <p className="absolute top-14 md:top-14 bottom-20 text-center inset-0 mx-auto ">
              No Transaction Found
            </p> */}
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-row justify-between ">
            <GlobalTableFilter
              globalFilter={globalFilter}
              setGlobalFilter={setGlobalFilter}
            />
            <div className="flex flex-row justify-center items-center gap-3">
              {updateStudentsLevels && (
                <div className="flex gap-3">
                  {" "}
                  {updateLevel && (
                    <>
                      <select
                        name="selectedLevel"
                        id="level"
                        className="border-2 text-[10px] w-full md:w-[300px] pl-3 rounded-lg h-14 mr-8 bg-white "
                        onChange={(event) => {
                        selectedLevels &&  selectedLevels(event)
                        }}
                      >
                      
                        <option value={"none"}>{"Select a level to update to"}</option>
                        {levels?.map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>  
                      
                      <button
                          onClick={confirmLevelUpdate}
                          className="hover:border-none"
                        >
                          <p className="text-lg text-white bg-green px-2 rounded-sm">{"Update"}</p>
                        </button>


                    </>
                  )}
                  <button
                    onClick={activateUpdateLevels}
                    className="hover:border-none"
                  >
                   { updateLevel ? <p className="text-lg text-white bg-rose-600 px-2 rounded-sm">Cancel Update</p> : <p className="text-lg text-white bg-green px-2 rounded-sm">{"Update Levels"}</p>}
                  </button>{" "}
                </div>
              )}
              {showPopoverFilter && (
                <FilterDropdown
                  columnFilters={columnFilters}
                  setColumnFilters={setColumnFilters}
                />
              )}
            </div>
          </div>
          <table className="w-full">
            <thead>
              {table?.getHeaderGroups().map((headerGroup) => (
                <tr className="bg-slate-50 border-y" key={headerGroup.id}>
                  {" "}
                  {headerGroup?.headers.map((header) => (
                    <th
                      className="items-center  px-5 py-2 text-xs font-normal text-left"
                      key={header.id}
                      colSpan={header?.colSpan}
                      onClick={header?.column?.getToggleSortingHandler()}
                    >
                      {" "}
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      {header.column.getCanSort() && (
                        <>
                          {header.column.getIsSorted() === "asc" && (
                            <ArrowUpIcon
                              boxSize={"25px"}
                              className="pl-2 pb-1"
                            />
                          )}
                          {header.column.getIsSorted() === "desc" && (
                            <ArrowDownIcon
                              boxSize={"25px"}
                              className="pl-2 pb-1"
                            />
                          )}
                        </>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="w-full">
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="border-b-2">
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="items-center px-5 py-3 text-sm font-medium text-left text-darkGray"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination table={table} />
        </>
      )}{" "}
    </>
  );
};

export default NewCustomTable;

export interface TableProps<T> {
  data: Array<T>;
  showPopoverFilter: boolean;
  updateStudentsLevels: boolean;
  updateLevels?: () => void;
  updateLevel?: boolean;
  confirmLevelUpdate?: () => void;
  selectedLevels? : (event:  React.ChangeEvent<HTMLSelectElement>) => void;
  columns: Array<ColumnDef<T, unknown>>;
}

export interface MainTable<T> {
  table: Table<T>;
}

export interface TableFilterProps {
  columnFilters: ColumnFiltersState; // Array of column filters
  setColumnFilters: React.Dispatch<React.SetStateAction<ColumnFiltersState>>; // Setter function for column filters
}
export interface GlobalTableFilterProps {
  globalFilter: any; // Array of column filters
  setGlobalFilter: React.Dispatch<React.SetStateAction<string>>; // Setter function for column filters
}

export interface CustomDropDownFilter {
  onChange: (value: any) => void;
  items: Course[] | Courses[];
}
