import { SubmitHandler, useForm } from "react-hook-form";
import CustomModal from "../UI/CustomModal";
import { useDisclosure, useToast } from "@chakra-ui/react";
import { useState } from "react";
import HttpService from "../../services/HttpService";
import { useSelector } from "react-redux";
import { selectCurrentAdmin } from "../../services/adminReducer";
import { User, UserStudent } from "../../services/User";
import { ColumnDef } from "@tanstack/react-table";
import {
  columnStudentHelper,
  validateIndexNumber,
} from "../../services/helpers/helper";
import { format } from "date-fns";
import NewCustomTable from "../UI/CustomTable";
import useGetStudents from "../../services/hooks/useGetStudents";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";

const StudentsPage = () => {
  const user = useSelector(selectCurrentAdmin);
  const toast = useToast();

  const [loading, setLoading] = useState(false);
  const [fileForUpload, setFile] = useState<any>();
  const lecturers = useGetStudents();

  //register  a new Lecturer
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: false });
  const level: number[] = [100, 200, 300, 400, 500, 600];

  type Inputs = {
    first_name: string;
    last_name: string;
    email?: string;
    level: string;
    password: string;
    student_id: string;
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
        "/api/v1/auth/registerStudent",
        `${(user as User)?.accessToken}`,
        {
          first_name: data?.first_name,
          last_name: data?.last_name,
          student_id: data?.student_id,
          level: data?.level,
          //email: data?.email,
          password: data?.password,
        }
      );
      console.log(saveCourseResponse);
      if (saveCourseResponse.hasOwnProperty("error")) {
        toast({
          title: "Error",
          description: (saveCourseResponse as any)?.message,
          status: "error",
          duration: 7000,
          isClosable: true,
          position: "top-right",
        });
        setLoading(false);
      } else {
        toast({
          title: "Student Registered Successfully",
          description:
            (saveCourseResponse as any).message +
            "Kindly provide password to the student with student ID to login",
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

  const getFullName = (row: any) => `${row.first_name} ${row.last_name}`;

  const filterByFullName = (rows: any, id: any, filterValue: any) => {
    return rows.filter((row: any) => {
      const rowValue = getFullName(row.original);
      return rowValue.toLowerCase().includes(filterValue.toLowerCase());
    });
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      // Create a FormData object

      // Now you can use formData in your postWithToken function
      // For example: postWithToken('/api/import-students', token, formData);
    }
  };

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    if(fileForUpload != null) {
      try {
        const formData = new FormData();
        // Append the file to the FormData object
        formData.append("csv_file", fileForUpload);
  
        const saveCourseResponse = await HttpService.postWithTokenForm<any>(
          "/api/v1/users/importStudents",
          `${(user as User)?.accessToken}`,
          formData
        );
        console.log(saveCourseResponse);
    
        if (saveCourseResponse.hasOwnProperty("error")) {
          toast({
            title: "Error",
            description: (saveCourseResponse as any)?.message,
            status: "error",
            duration: 7000,
            isClosable: true,
            position: "top-right",
          });
          setLoading(false);
        } else {
          toast({
            title: "Student Registered Successfully",
            description:
              (saveCourseResponse as any).message +
              "Kindly provide password to the student with student ID to login",
            status: "success",
            duration: 7000,
            isClosable: true,
            position: "top-right",
          });
          setFile(null)
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
    } else {
      toast({
        title: "Error",
        description: "Upload CSV file in the required format only",
        status: "info",
        duration: 7000,
        isClosable: true,
        position: "top-right",
      });
    }
   
  };

  const columns: ColumnDef<UserStudent, unknown>[] = [
    columnStudentHelper.accessor("first_name", {
      header: () => "First Name",
      cell: (props) => (
        <>
          <div className="flex">
            <span>{props?.getValue()}</span>
          </div>
        </>
      ),
    }),
    columnStudentHelper.accessor("last_name", {
      header: () => "Last Name",
      cell: (props) => (
        <>
          <div className="flex">
            <span>{props?.getValue()}</span>
          </div>
        </>
      ),
    }),
    columnStudentHelper.accessor("student_id", {
      header: () => "Student ID",
      cell: (props) => (
        <>
          <div className="flex">
            <span>{props?.getValue()}</span>
          </div>
        </>
      ),
    }),

    columnStudentHelper.accessor("created_at", {
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
  ] as Array<ColumnDef<UserStudent, unknown>>;

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
            <p>Provide the Student's details</p>
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
              <select
                className="py-2 w-full focus:border-2 focus:border-[#646cff] focus:outline-none pl-2 h-12"
                {...register("level", {
                  required: "Level is required",
                })}
              >
                {level.map((slevel) => (
                  <option value={slevel.toString()} key={slevel}>
                    {slevel}
                  </option>
                ))}
              </select>
              <div>
                <input
                  className="border border-primary rounded mt-2 mb-2 py-2 text-sm text-left pl-2 w-full"
                  type="text"
                  placeholder="Student ID"
                  {...register("student_id", {
                    required: "Student ID is required",
                    validate: (value) =>
                      validateIndexNumber(value) || "Invalid Index Number",
                  })}
                />
                {errors?.student_id && (
                  <span className="text-left text-rose-500 font-normal text-xs">
                    {errors?.student_id?.message}
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
      <div className="flex flex-row justify-between items-center">
        <div
          className="py-2 px-2 rounded-lg ml-5  w-fit border-2 hover:cursor-pointer hover:bg-slate-100 h-fit"
          onClick={onOpen}
        >
          Add Student
        </div>
        <div className="">
          <form
            className="py-2 px-2 rounded-lg w-fit border-2 hover:cursor-pointer hover:bg-slate-100"
            onSubmit={handleFormSubmit}
          >
            <input type="file" accept=".csv" onChange={handleFileChange} />
            <button type="submit" className="px-2">
              {" "}
              <ArrowUpTrayIcon className="w-4 h-4" />
            </button>
          </form>
          <p className="py-2">Add Student CSV file for bulkupload</p>
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

export default StudentsPage;
