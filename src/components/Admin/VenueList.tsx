import Loader from "../Loader";
import useGetVenues from "../../services/hooks/useGetVenues";
import { useNavigate } from "react-router-dom";
import { selectCurrentAdmin } from "../../services/adminReducer";
import NewCustomTable from "../UI/CustomTable";
import { columnVenuesHelper } from "../../services/helpers/helper";
import { DeleteIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { Venue } from "../../services/types";
import CustomModal from "../UI/CustomModal";
import { useDisclosure, useToast } from "@chakra-ui/react";
import Loading from "../UI/Loading";
import HttpService from "../../services/HttpService";
import { useSelector } from "react-redux";
import { User } from "../../services/User";
import { updatedListcolumnsVenue } from "../../services/helpers/columns_venue";

const VenueList = () => {
  const user = useSelector(selectCurrentAdmin);
  const venueList = useGetVenues(selectCurrentAdmin);
  const [isDeleting, setDeleting] = useState(false);
  const [deleteId, savedeleteId] = useState<Venue>();
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const navigate = useNavigate();
  const {
    isOpen: isOpenReset,
    onOpen: onOpenReset,
    onClose: onCloseReset,
  } = useDisclosure({ defaultIsOpen: false });


  console.log(venueList);

    const handleDelete = (venue: Venue) => {
      setDeleting(true);
      savedeleteId(venue);
      onOpenReset();
    }

    const onCloseDelete = () => {
    setDeleting(false);
    onCloseReset();
  }

   const  handleFinalDelete = async (id: string) => {
  // http://127.0.0.1/api/v1/admin/users/f3088232-31ea-49be-b8f0-c4b667e7fb3c
  console.log(id);
  setLoading(true);
  try {
    const deleteVenue = await HttpService.deleteWithToken<any>(
      `/api/v1/venues/${id}`,
      `${(user as User)?.accessToken}`,
      
    );

    if (deleteVenue.hasOwnProperty("error")) {
      toast({
        title: "Error",
        description: (deleteVenue as any)?.message,
        status: "error",
        duration: 7000,
        isClosable: true,
        position: "top-right",
      });
      setLoading(false);
    } else {
      toast({
        title: "Lecturer Deleted Successfully",
        description:
          "",
        status: "success",
        duration: 7000,
        isClosable: true,
        position: "top-right",
      });

      setLoading(false);
      onCloseDelete();
      setTimeout(() => {
        window.location.reload();
      }, 600)
      // window.location.reload();
    }
  } catch (error) {
    toast({
      title: "Error",
      description: error as any,
      status: "error",
      duration: 7000,
      isClosable: true,
      position: "top-right",
    });
    setLoading(false);
  }
  }

  const updatedList = [
    ...updatedListcolumnsVenue,
      columnVenuesHelper.display({
      header: () => "Action",
      id: "actions",
      cell: (props) => (
        <span>
          <span className="flex justify-start gap-2">
            
            <DeleteIcon
              height={5}
              width={5}
              color={"red"}
              className="hover:cursor-pointer"
              onClick={() => handleDelete(props?.row?.original)}
            />
          </span>
        </span>
      ),
    }),
  ]

  return (
    <>
      <CustomModal
        headerText={ "Delete Venue"}
        footerText="Done"
        isOpen={isOpenReset}
        loading={false}
        onClose={isDeleting ? onCloseDelete : onCloseReset}
        onSubmit={onCloseReset}
        showFooter={false}
        children={
          <div>
            <p className="font-medium">{`Are you sure you want to delete ${deleteId?.name}` }</p>
            <p>All related venue items will be lost</p>
            {loading ? (
              <div className="text-center pt-3">
                <Loading />
              </div>
            ) : (  <button
              type="submit"
              className=" w-[80%]  mx-[10%] bg-[#e62b2be8] border-2 rounded-full py-2  text-white    hover:bg-[#ff0000e8] hover:text-white hover:border-none
          lg:mt-[1.3rem]"
              onClick={() => {
              handleFinalDelete(`${deleteId?.id}`);
              }}
            >
              {  "Delete"}
            </button>)
        }
          </div>
        }
      />
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
              columns={updatedList}
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
