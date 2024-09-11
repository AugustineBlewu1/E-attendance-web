import { ColumnDef } from "@tanstack/react-table";
import { User } from "../User";
import { columnUsersHelper } from "./helper";
import { format } from "date-fns";

export const columnsLecturer: ColumnDef<User, unknown>[] = [
    columnUsersHelper.display({
      header: () => "Full Name",
      id: "Name",
      cell: (props) => (
        <span className="">
          {props?.row?.original?.first_name} {props?.row?.original?.last_name}
        </span>
      ),
      enableGlobalFilter: true,
    }),

    columnUsersHelper.accessor("email", {
      header: () => "Email",
      cell: (props) => (
        <>
          <div className="flex">
            <span>{props?.getValue()}</span>
          </div>
        </>
      ),
    }),

    columnUsersHelper.accessor("created_at", {
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
  
  ] as Array<ColumnDef<User, unknown>>;
