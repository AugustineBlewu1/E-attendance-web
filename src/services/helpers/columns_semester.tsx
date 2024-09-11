import { ColumnDef } from "@tanstack/react-table";
import { Semesters } from "../User";
import { columnSemesterHelper } from "./helper";
import { format } from "date-fns";



export const columnsSemester: ColumnDef<Semesters, unknown>[] = [
    columnSemesterHelper.accessor("academic_year", {
      header: () => "Academic Year",
      cell: (props) => <span className="">{props?.getValue()}</span>,
      enableGlobalFilter: true,
    }),

    columnSemesterHelper.accessor("start_date", {
      header: () => "Start Date",
      cell: (props) => (
        <>
          <span>
            <span>
              {format(new Date(props.getValue() ?? ""), "dd/MM/yyy hh:mm a")}
            </span>
          </span>
        </>
      ),
    }),
    columnSemesterHelper.accessor("end_date", {
      header: () => "End Date",
      cell: (props) => (
        <>
          <span>
            <span>
              {format(new Date(props.getValue() ?? ""), "dd/MM/yyy hh:mm a")}
            </span>
          </span>
        </>
      ),
    }),
    columnSemesterHelper.accessor("created_at", {
      header: () => "Date Added",
      cell: (props) => (
        <>
          <span>
            <span>
              {format(new Date(props.getValue() ?? ""), "dd/MM/yyy hh:mm a")}
            </span>
          </span>
        </>
      ),
    }),
    columnSemesterHelper.accessor("is_current", {
      header: () => "Is Current",
      cell: (props) => (
        <>
          <span>
            <span>{props?.getValue() ? "Yes" : "No"}</span>
          </span>
        </>
      ),
    }),
  ] as Array<ColumnDef<Semesters, unknown>>;