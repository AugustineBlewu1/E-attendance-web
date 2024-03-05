import { ArrowLeftIcon, ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import CustomSelect from "./CustomSelect";

const Pagination = ({ table }: any) => (
    <footer className="w-full py-6 border-b-2 flex flex-row items-center justify-between">
  
     <div>

      {/* <span>Show: </span> */}
      <CustomSelect
        className="px-4 rounded-lg text-white"
        placeholder=""
        value={table.getState().pageSize}
        onChange={(e) => table.setPageSize(parseInt(e.target.value,  10))}
        options={[5,  10,  20].map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      >
        
      </CustomSelect>
      {/* <span> Items per page</span> */}
      </div>
      <div>
      <button className="mr-2"
        disabled={!table.getCanPreviousPage()}
        onClick={() => table.setPageIndex(0)}
      >
        <ArrowLeftIcon className="bg-green-light-mini px-2 py-2 rounded-lg " boxSize={"35px"} color={"white"}/>
      </button>
      <button
        disabled={!table.getCanPreviousPage()}
        onClick={table.previousPage}
      >
        <ChevronLeftIcon className="bg-green-light-mini px-2 py-2 rounded-lg" boxSize={"35px"} color={"white"}/>
      </button>
      <span className="text-[12px] mx-1">{`Page ${table.getState().pagination.pageIndex +  1} of ${table.getPageCount()}`}</span>
      <button disabled={!table.getCanNextPage()} onClick={table.nextPage}>
      <ChevronRightIcon className="bg-green-light-mini px-2 py-2 rounded-lg" boxSize={"35px"} color={"white"}/>
      </button>
      <button
        disabled={!table.getCanNextPage()}
        onClick={() => table.setPageIndex(table.getPageCount() -  1)}
        className="ml-2"
      >
        <ArrowRightIcon className="bg-green-light-mini px-2 py-2 rounded-lg" boxSize={"35px"}  color={"white"}/>
      </button>
      </div>
    </footer>
  );
  

  export default Pagination;