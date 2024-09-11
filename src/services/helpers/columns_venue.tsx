import { ColumnDef } from "@tanstack/react-table";
import { Venues } from "../User";
import { columnVenuesHelper } from "./helper";
import { format } from "date-fns";

export const columnsVenue: ColumnDef<Venues, unknown>[] = [
    columnVenuesHelper.accessor("name", {
      header: () => "Venue",
      cell: (props) => <span className="">{props?.getValue()}</span>,
      enableGlobalFilter: true,
    }),

    columnVenuesHelper.accessor("created_at", {
      header: () => "Date Generated",
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
   
  ] as Array<ColumnDef<Venues, unknown>>;