import { ColumnDef } from "@tanstack/react-table";
import NewCustomTable from "../UI/CustomTable";
import { columnLecturerHelper } from "../../services/helpers/helper";
import {  Scans } from "../../services/types";
import useScanReports from "../../services/hooks/useScanReports";
import Loader from "../Loader";
import DropdownFilter from "../UI/CustomDropdownFilter";
import { useState } from "react";
import useGetMyCourses from "../../services/hooks/useGetMyCourses";
import { selectCurrentUser } from "../../services/userReducer";
import { useSelector } from "react-redux";

export default function LecturerReportsPage() {
    const user = useSelector(selectCurrentUser);

  const [queryParameters, setQueryParameters] = useState({ course_id: 'all', user: user });

  const scannedReports = useScanReports(queryParameters);
  const courses = useGetMyCourses();


  console.log(courses);

  const onChange = (e: any) => {
    console.log('Errer',e)
    setQueryParameters({ course_id: e?.target?.value , user:user});
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
              data={scannedReports.reports ?? []}
              showPopoverFilter={false}
              updateStudentsLevels={false}
            />
          </div>
        </>
      )}

      {/* <CustomTable columns={isMobile.isMobile ? mobileBuyColumns : columns} data={buyTransactionsSet} /> */}
    </div>
  );
}
