import { SubmitHandler, useForm } from "react-hook-form";
import CustomModal from "../UI/CustomModal";
import { useDisclosure, useToast } from "@chakra-ui/react";
import { useState } from "react";
import HttpService from "../../services/HttpService";
import { useSelector } from "react-redux";
import { selectCurrentAdmin } from "../../services/adminReducer";
import { User } from "../../services/User";
import useGetLecturers from "../../services/hooks/useGetLecturers";
import { columnUsersHelper } from "../../services/helpers/helper";
import NewCustomTable from "../UI/CustomTable";
import { CopyIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { columnsLecturer } from "../../services/helpers/columns_lecturer";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import Loading from "../UI/Loading";

const LecturerPage = () => {
  const user = useSelector(selectCurrentAdmin);
  const toast = useToast();

  const [loading, setLoading] = useState(false);
  const [response, saveResponse] = useState("");
  const [isUpdating, setUpdating] = useState(false);
  const [isDeleting, setDeleting] = useState(false);
  const [resetData, saveResetData] = useState<User>();
  const [deleteId, savedeleteId] = useState<User>();
  const lecturers = useGetLecturers();

  //register  a new Lecturer
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: false });
  const {
    isOpen: isOpenReponse,
    onOpen: onOpenResponse,
    onClose: onCloseResponse,
  } = useDisclosure({ defaultIsOpen: false });
  const {
    isOpen: isOpenReset,
    onOpen: onOpenReset,
    onClose: onCloseReset,
  } = useDisclosure({ defaultIsOpen: false });

  type Inputs = {
    id?: string;
    first_name: string;
    last_name: string;
    email?: string;
    phone_number?: string;
  };
const emptyForm = {
  id: "",
  first_name: "",
  last_name:  "",
  email: "",
  phone_number: ""
}
  const {
    register,
    handleSubmit,
    reset,
    
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {},
  });

  const onOpenResetPassword = (data: User) => {
    saveResetData(data);
    onOpenReset();
  };

  const handleUpdatingUser = (formData: any) =>{
    setUpdating(true)
    reset(formData)
    onOpen();
  }

  const onCloseUpdate = () => {
    console.log('Zysdsdfsdfsdfdsfsd')

    reset(
        emptyForm
    )
    setUpdating(false)
    onClose()
    console.log('Zysd')
  }

  console.log(lecturers);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    setLoading(true);

    try {
      const saveCourseResponse = isUpdating ? 
      await HttpService.patchWithToken<any>(
        `/api/v1/admin/users/${data?.id}/update`,
        `${(user as User)?.accessToken}`,
        {
          first_name: data?.first_name,
          last_name: data?.last_name,
          email: data?.email,
          phone_number: data?.phone_number,
          role: "lecturer",
        }
      ) : await HttpService.postWithToken<any>(
        "/api/v1/auth/register",
        `${(user as User)?.accessToken}`,
        {
          first_name: data?.first_name,
          last_name: data?.last_name,
          email: data?.email,
          phone_number: data?.phone_number,
          role: "lecturer",
        }
      );

      console.log(saveCourseResponse);
      saveResponse(saveCourseResponse?.data!["generatedPassword"]);
      if (saveCourseResponse.hasOwnProperty("error")) {
        toast({
          title: "Error",
          description: (saveCourseResponse as any).data?.message,
          status: "error",
          duration: 7000,
          isClosable: true,
          position: "top-right",
        });
        setLoading(false);
      } else {
      isUpdating ? toast({
          title: "Lecturer Updated Successfully",
          description:
            "",
          status: "success",
          duration: 7000,
          isClosable: true,
          position: "top-right",
        }) : toast({
          title: "Lecturer Registered Successfully",
          description:
            "Kindly provide password to the lecturer with email to login",
          status: "success",
          duration: 7000,
          isClosable: true,
          position: "top-right",
        });

        reset();
        onClose();
        setLoading(false);
        if(!isUpdating) {
          onOpenResponse();
         
        }else {
          setTimeout(() => {
            window.location.reload();
          }, 600)
        }
       
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
  };

  const handleDelete = (user: User) => {
    setDeleting(true);
    savedeleteId(user);
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
    const deleteUser = await HttpService.deleteWithToken<any>(
      `/api/v1/admin/users/${id}`,
      `${(user as User)?.accessToken}`,
      
    );

    if (deleteUser.hasOwnProperty("error")) {
      toast({
        title: "Error",
        description: (deleteUser as any)?.message,
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

      reset();
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

  const handleCopyPassword = () => {
    navigator.clipboard
      .writeText(response)
      .then(() => {
        toast({
          title: "Copied Successfully",
          description: "",
          status: "success",
          duration: 7000,
          isClosable: true,
          position: "top-right",
        });
      })
      .catch((error) => {
        console.error("Failed to copy text:", error);
        toast({
          title: "Error",
          description: error as any,
          status: "error",
          duration: 7000,
          isClosable: true,
          position: "top-right",
        });
      });
  };

  const onPasswordReset = async (email: any) => {
    console.log(email);
    setLoading(true);
    try {
      const resetPassword = await HttpService.postWithToken<any>(
        "/api/v1/auth/resetPassword",
        `${(user as User)?.accessToken}`,
        {
          email: email,
        }
      );

      console.log(resetPassword);
      saveResponse(resetPassword?.data!["generatedPassword"]);
      if (resetPassword.hasOwnProperty("error")) {
        toast({
          title: "Error",
          description: (resetPassword as any).data?.message,
          status: "error",
          duration: 7000,
          isClosable: true,
          position: "top-right",
        });
        setLoading(false);
      } else {
        toast({
          title: "Password Reset Successfully",
          description:
            "Kindly provide password to the lecturer with email to login",
          status: "success",
          duration: 7000,
          isClosable: true,
          position: "top-right",
        });

        reset();
        onCloseReset();
        setLoading(false);
        onOpenResponse();
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
  };
  const columns = [
    ...columnsLecturer,
    columnUsersHelper.display({
      header: () => "Reset Password",
      id: "reset",
      cell: (props) => (
        <>
          <span className="flex justify-start">
            <ArrowPathIcon
              height={20}
              width={30}
              className="hover:cursor-pointer"
              onClick={() => onOpenResetPassword(props?.row?.original)}
            />
          </span>
        </>
      ),
    }),
    columnUsersHelper.display({
      header: () => "Action",
      id: "actions",
      cell: (props) => (
        <span>
          <span className="flex justify-start gap-2">
            <EditIcon
              height={5}
              width={5}
              color={"green"}
              className="hover:cursor-pointer"
              onClick={() => handleUpdatingUser(props?.row?.original)}
            />
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
  ];

 const onCopyComplete = () => {
    onCloseResponse();
    window.location.reload()
  }

  return (
    <>
      <CustomModal
        headerText={isDeleting ? "Delete Lecturer" : "Reset Password"}
        footerText="Done"
        isOpen={isOpenReset}
        loading={false}
        onClose={isDeleting ? onCloseDelete : onCloseReset}
        onSubmit={onCloseReset}
        showFooter={false}
        children={
          <div>
            <p className="font-medium">{isDeleting ? `Are you sure you want to delete ${deleteId?.first_name}` : `Are you sure you want to reset ${resetData?.first_name} Password`}</p>

            {loading ? (
              <div className="text-center pt-3">
                <Loading />
              </div>
            ) : (  <button
              type="submit"
              className=" w-[80%]  mx-[10%] bg-[#e62b2be8] border-2 rounded-full py-2  text-white    hover:bg-[#ff0000e8] hover:text-white hover:border-none
          lg:mt-[1.3rem]"
              onClick={() => {
               isDeleting ? handleFinalDelete(`${deleteId?.id}`) : onPasswordReset(resetData?.email);
              }}
            >
              { isDeleting ? "Delete" : "Reset"}
            </button>)
        }
          </div>
        }
      />
      <CustomModal
        headerText="Copy Password"
        footerText="Done"
        isOpen={isOpenReponse}
        loading={false}
        onClose={onCopyComplete}
        onSubmit={onCopyComplete}
        children={
          <div>
            <p className="font-bold">Generated Lecturer's Password</p>
            <p>Kindly copy the password below before closing this section.</p>
            <span className="flex flex-row items-center gap-5 pt-4">
              <p className="font-bold">{response}</p>
              <CopyIcon
                onClick={handleCopyPassword}
                className="hover:cursor-pointer"
              />
            </span>
          </div>
        }
      />
      <CustomModal
        headerText={isUpdating ? "Update Lecturer Details" : "Enter Lecturer Details"}
        footerText="Save"
        isOpen={isOpen}
        loading={loading}
        onClose= { isUpdating ? onCloseUpdate  :onClose}
        onSubmit={handleSubmit(onSubmit)}
        children={
          <div>
            <p>Provide the Lecturer's details</p>
            <form action="">
              <div>
                <input
                  className="border border-primary rounded mt-2 mb-2 py-2 pl-2 text-sm text-left w-full"
                  type="text"
                  placeholder="First Name"
                  {...register("first_name", {
                    required: "First Name is required",
                  })}
                />
                {errors.first_name && (
                  <span className="text-left text-rose-500 font-normal text-xs">
                    {errors?.first_name?.message}
                  </span>
                )}
              </div>
              <div>
                <input
                  className="border border-primary rounded mt-2 mb-2 py-2 text-sm text-left pl-2 w-full"
                  type="text"
                  placeholder="Last Name"
                  {...register("last_name", {
                    required: "Last Name is required",
                  })}
                />
                {errors?.last_name && (
                  <span className="text-left text-rose-500 font-normal text-xs">
                    {errors?.last_name?.message}
                  </span>
                )}
              </div>
              <div>
                <input
                  className="border border-primary rounded mt-2 mb-2 py-2 text-sm text-left pl-2 w-full"
                  type="email"
                  placeholder="Email"
                  {...register("email", {
                    required: "Email is required",
                  })}
                />
                {errors?.email && (
                  <span className="text-left text-rose-500 font-normal text-xs">
                    {errors?.email?.message}
                  </span>
                )}
              </div>
              <div>
                <input
                  className="border border-primary rounded mt-2 mb-2 py-2 text-sm text-left pl-2 w-full "
                  type="phone_number"
                  maxLength={10}
                  placeholder="Phone Number"
                  {...register("phone_number")}
                />
                
              </div>
            </form>
          </div>
        }
      />
      <div className="flex flex-row justify-end">
        <div
          className="py-2 px-2 rounded-lg  w-fit border-2 hover:cursor-pointer hover:bg-slate-100"
          onClick={onOpen}
        >
          Register Lecturer
        </div>
      </div>

      <div>
        <div className="mt-5 md:ml-5">
          {<NewCustomTable columns={columns} data={lecturers?.lecturers} />}

          {/* <CustomTable columns={isMobile.isMobile ? mobileBuyColumns : columns} data={buyTransactionsSet} /> */}
        </div>
      </div>
    </>
  );
};

export default LecturerPage;
