import { ColumnDef } from "@tanstack/react-table";
import NewCustomTable from "../UI/CustomTable";
import { columnLecturerHelper } from "../../services/helpers/helper";
import {  Scans } from "../../services/types";
import useScanReports from "../../services/hooks/useScanReports";
import Loader from "../Loader";
import DropdownFilter from "../UI/CustomDropdownFilter";
import useCourses from "../../services/hooks/useCourses";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentAdmin } from "../../services/adminReducer";

export default function ReportsPage() {
    const user = useSelector(selectCurrentAdmin);

  const [queryParameters, setQueryParameters] = useState({ course_id: 'all', user: user });

  const scannedReports = useScanReports(queryParameters);
  const courses = useCourses(user);


  console.log(courses);

  const onChange = (e: any) => {
    console.log('Errer',e)
    setQueryParameters({ course_id: e?.target?.value , user: user});
  };

  const columns: ColumnDef<Scans, unknown>[] = [
    columnLecturerHelper.accessor("indexNumber", {
      header: () => "Index Number",
      cell: (props) => (
        <>
          <div className="flex">
            <span>{props?.getValue()}</span>
          </div>
        </>
      ),
    }),
    columnLecturerHelper.accessor("name", {
      header: () => "Full Name",
      cell: (props) => (
        <>
          <div className="flex">
            <span>{props?.getValue()}</span>
          </div>
        </>
      ),
    }),
    columnLecturerHelper.accessor("total_scans", {
      header: () => "Total Scans",
      cell: (props) => (
        <>
          <div className="flex">
            <span>{props?.getValue()}</span>
          </div>
        </>
      ),
    }),
  ] as Array<ColumnDef<Scans, unknown>>;
  return (
    <div className="mt-5 md:ml-5">
      {scannedReports?.loading ? (
        <Loader />
      ) : (
        <>
          <DropdownFilter onChange={onChange} items={courses?.courseQrCode} />
          <div className="pt-9">
            {" "}
            <NewCustomTable
              columns={columns}
              updateStudentsLevels={false}
              data={scannedReports.reports ?? []}
              showPopoverFilter={false}
            />
          </div>
        </>
      )}

      {/* <CustomTable columns={isMobile.isMobile ? mobileBuyColumns : columns} data={buyTransactionsSet} /> */}
    </div>
  );
}
