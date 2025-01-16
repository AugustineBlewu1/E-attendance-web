import Loader from "../Loader";
import useGetVenues from "../../services/hooks/useGetVenues";
import { useNavigate } from "react-router-dom";
import { selectCurrentAdmin } from "../../services/adminReducer";
import NewCustomTable from "../UI/CustomTable";
import { columnsVenue } from "../../services/helpers/columns_venue";

const VenueList = () => {
  const venueList = useGetVenues(selectCurrentAdmin);
  const navigate = useNavigate();

  console.log(venueList);

  return (
    <>
      {venueList?.loading ? (
        <Loader></Loader>
      ) : (
        <>
        <div className="flex flex-row justify-end">


          <button
            onClick={() => navigate("/add_venue")}
            className={`mb-4 px-4 py-2  bg-blue-500
             text-white rounded`}
          >
            <p>Add Venue</p>
          </button>
          </div>
          {
            <NewCustomTable
              columns={columnsVenue}
              data={venueList?.venues}
              showPopoverFilter={false}
              updateStudentsLevels={false}
            />
          }
          {/* <div className="">
            {venueList?.venues?.map((e) => (
              <div className="border-2 py-5 hover:shadow-lg rounded-lg px-10 flex justify-between flex-row hover:cursor-pointer w-fit ">
                <div>
                  <span className="flex flex-col md:flex-row md:space-x-2">
                    <p className="font-bold">Venue Name : </p>
                    <p>{e?.name}</p>
                  </span>

                  <span className="flex flex-col md:flex-row md:space-x-2">
                    <p className="font-light text-sm">Date Generated : </p>{" "}
                    <span className="font-light text-sm">
                      {format(new Date(e?.created_at), "dd/MM/yyy hh:mm a")}
                    </span>
                  </span>
                </div>
              </div>
            ))}
          </div> */}
        </>
      )}
    </>
  );
};

export default VenueList;
