import Loader from "../Loader";
import { format } from "date-fns";
import useGetVenues from "../../services/hooks/useGetVenues";
import { useNavigate } from "react-router-dom";
import { selectCurrentAdmin } from "../../services/adminReducer";

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
          <button
            onClick={() => navigate("/add_venue")}
            className={`mb-4 px-4 py-2  bg-blue-500
             text-white rounded`}
          >
            <p>Add Venue</p>
          </button>
          <div className="flex flex-col space-y-4">
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
          </div>
        </>
      )}
    </>
  );
};

export default VenueList;
