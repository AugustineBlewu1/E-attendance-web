import { SubmitHandler, useForm } from "react-hook-form";
import CustomModal from "../UI/CustomModal";
import { useDisclosure, useToast } from "@chakra-ui/react";
import { useState } from "react";
import HttpService from "../../services/HttpService";
import { useSelector } from "react-redux";
import { selectCurrentAdmin } from "../../services/adminReducer";
import { User } from "../../services/User";
import useGetLecturers from "../../services/hooks/useGetLecturers";
import { ColumnDef } from "@tanstack/react-table";
import { columnUsersHelper } from "../../services/helpers/helper";
import { format } from "date-fns";
import NewCustomTable from "../UI/CustomTable";

const LecturerPage = () => {
  const user = useSelector(selectCurrentAdmin);
  const toast = useToast();

  const [loading, setLoading] = useState(false);
  const lecturers = useGetLecturers();

  //register  a new Lecturer
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: false });

  type Inputs = {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {},
  });

  console.log(lecturers);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    setLoading(true);
    try {
      const saveCourseResponse = await HttpService.postWithToken<any>(
        "/api/v1/auth/register",
        `${(user as User)?.accessToken}`,
        {
          first_name: data?.first_name,
          last_name: data?.last_name,
          email: data?.email,
          password: data?.password,
          role: "lecturer",
        }
      );
      console.log(saveCourseResponse);
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
        toast({
          title: "Lecturer Registered Successfully",
          description:
            (saveCourseResponse as any).data?.message +
            "Kindly provide password to the lecturer with email to login",
          status: "success",
          duration: 7000,
          isClosable: true,
          position: "top-right",
        });

        reset();
        onClose();
        setLoading(false);
        window.location.reload();
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

  const columns: ColumnDef<User, unknown>[] = [
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

  return (
    <>
      <CustomModal
        headerText="Enter Lecturer Details"
        footerText="Save"
        isOpen={isOpen}
        loading={loading}
        onClose={onClose}
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
                  className="border border-primary rounded mt-2 mb-2 py-2 text-sm text-left pl-2 w-full"
                  type="password"
                  placeholder="Password"
                  {...register("password", {
                    required: "Password is required",
                    validate: (value) =>
                      !(value?.length < 8) ||
                      "Password Length is short, must be at least 8 characters",
                  })}
                />
                {errors?.password && (
                  <span className="text-left text-rose-500 font-normal text-xs">
                    {errors?.password?.message}
                  </span>
                )}
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
