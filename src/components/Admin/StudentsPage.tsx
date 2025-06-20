import { SubmitHandler, useForm } from "react-hook-form";
import CustomModal from "../UI/CustomModal";
import { Checkbox, useDisclosure, useToast } from "@chakra-ui/react";
import { useMemo, useState } from "react";
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
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const StudentsPage = () => {
  const user = useSelector(selectCurrentAdmin);
  const toast = useToast();

  const [loading, setLoading] = useState(false);
  const [fileForUpload, setFile] = useState<any>();
  const [isUpdating, setUpdating] = useState(false);
  const [updateLevel, setUpdateLevel] = useState(false);
  const [levelSelected, setSelectedLevel] = useState("");
  const [levelToUpdateTo, setLevelToUpdateTo] = useState("");
  // const [isDeleting, setDeleting] = useState(false);
  const lecturers = useGetStudents();

  //register  a new Lecturer
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: false });
  const {
    isOpen: isOpenLevel,
    onOpen: onOpenLevel,
    onClose: onCloseLevel,
  } = useDisclosure({ defaultIsOpen: false });

  const level: number[] = [100, 200, 300, 400, 500, 600];
  // const [queryParameters, setQueryParameters] = useState({
  //   course_id: "all",
  //   user: user,
  // });

  type Inputs = {
    id?: string;
    first_name: string;
    last_name: string;
    email?: string;
    level: string;
    password?: string;
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

  const emptyForm = {
    first_name: "",
    last_name: "",
    email: "",
    level: "",
    password: "",
    student_id: "",
  };

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

  // const handleUpdatingUser = (formData: any) =>{
  //   setUpdating(true)
  //   reset(formData)
  //   onOpen();
  // }

  const onCloseUpdate = () => {
    reset(emptyForm);
    setUpdating(false);
    onClose();
    console.log("Zysd");
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
    if (fileForUpload != null) {
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
          setFile(null);
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

  // const onChange = (e: any) => {
  //   console.log("Errer", e);
  //   setQueryParameters({ course_id: e?.target?.value, user: user });
  // }; 
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const columns = useMemo(() => {
    const baseColumns: ColumnDef<UserStudent, unknown>[] = [
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
      columnStudentHelper.accessor("level", {
        header: () => "Level",
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

      // columnStudentHelper.display({
      //   header: () => "Action",
      //   id: "actions",
      //   cell: (_) => (
      //     <span>
      //       <span className="flex justify-start gap-2">
      //         <EditIcon
      //           height={5}
      //           width={5}
      //           color={"green"}
      //           className="hover:cursor-pointer"
      //           onClick={() => {
      //             // handleUpdatingUser(props?.row?.original)
      //             toast({
      //               title: "Coming Soon",
      //               description:"",
      //               status: "success",
      //               duration: 7000,
      //               isClosable: true,
      //               position: "top-right",
      //             });
      //           }}
      //         />
      //         {/* <DeleteIcon
      //           height={5}
      //           width={5}
      //           color={"red"}
      //           className="hover:cursor-pointer"
      //           onClick={() =>{}}
      //         /> */}
      //       </span>
      //     </span>
      //   ),
      // }),
    ] as Array<ColumnDef<UserStudent, unknown>>;

    if (updateLevel) {
      baseColumns.push(
        columnStudentHelper.display({
          header: () => "Action",
          id: "actions",
          cell: (props) => (
            <Checkbox
              colorScheme="green"
              id={props.row.original.id.toString()}
              isChecked={selectedIds.includes(props.row.original.id.toString())}
              // onChange={(event) =>
              //   handleCheckboxChange(
              //     props.row.original.id.toString(),
              //     event.target.checked
              //   )
              // }
            />
          ),
        })
      );
    }

    return baseColumns;
  }, [updateLevel, selectedIds]);
  // const [columnsData, setColumns] = useState(columns);

  // Function to handle checkbox change
  // const handleCheckboxChange = (id: string, isChecked: boolean) => {
  //   if (isChecked) {
  //     // Add ID to array
  //     setSelectedIds((prevIds) => [...prevIds, id]);
  //   } else {
  //     // Remove ID from array
  //     setSelectedIds((prevIds) =>
  //       prevIds.filter((selectedId) => selectedId !== id)
  //     );
  //   }
  // };
  const updateLevels = () => {
    console.log("tdfdfdfdsf");
    setUpdateLevel((prev) => !prev);
    if (!updateLevel) {
      setSelectedIds([]);
      setSelectedLevel("");
    }

  };

  const selectedLevels = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSelectedIds = lecturers.lecturers
      .filter((e) => e.level === event.target.value)
      .map((e) => e.id.toString());
      setSelectedLevel(event.target.value);
    setSelectedIds(newSelectedIds);
  };
  const exportToExcel = () => {
    // Sample data
    const data = [
      { FullName: "John Doe", "Student ID": "PH/PHA/19/0050", level: "100" },
      { FullName: "John Doe", "Student ID": "PH/PHA/19/0050", level: "100" },
    ];

    // Create a new workbook and a new worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sample Data");

    // Generate the Excel file and trigger the download
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "sample_data.xlsx");
  };

  const confirmUpdate = () => {
    console.log("confimr");
    onOpenLevel();
  };

  const onSubmitLevel = async () => {

    if(levelToUpdateTo?.length === 0 || levelSelected?.length === 0){
      toast({
        title: "Error",
        description: "No Selected Level to Update to",
        status: "error",
        duration: 7000,
        isClosable: true,
        position: "top-right",
      });
    } else {

    

    try {
      
      setLoading(true);

      const saveCourseResponse = await HttpService.postWithToken<any>(
        "/api/v1/students/update-level",
        `${(user as User)?.accessToken}`,
        {
          "current_level" : levelSelected,
          "new_level" : levelToUpdateTo
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
          title: "Level Updated Successfully",
          description:
            (saveCourseResponse as any).message,
          status: "success",
          duration: 7000,
          isClosable: true,
          position: "top-right",
        });
        onCloseLevel();
        onCloseUpdate()
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
  }
  };

 const onCloseLevelF = () => {
  setSelectedIds([]);
  setSelectedLevel("");
  setLevelToUpdateTo("");
    onCloseLevel();
    onCloseUpdate();
    setUpdateLevel((prev) => !prev);
  }
  const levels = ["100", "200", "300", "400", "500", "600"];

  return (
    <>
      <CustomModal
        headerText="Student Level Update"
        footerText="Confirm"
        isOpen={isOpenLevel}
        loading={loading}
        onClose={onCloseLevelF}
        onSubmit={onSubmitLevel}
        children={
          <div>
            <p className="text-lg py-2">Update {selectedIds?.length} level {levelSelected} students to </p>
            <select
              name="selectedLevel"
              id="level"
              className="border-2 text-[10px] w-full md:w-[300px] pl-3 rounded-lg h-14 mr-8 bg-white "
              onChange={(event) => {
                setLevelToUpdateTo(event.target.value)
              }}
            >
              <option value={"none"}>{"Select a level"}</option>
              {levels?.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        }
      />
      <CustomModal
        headerText={
          isUpdating ? "Update Student Details" : "Enter Student Details"
        }
        footerText={isUpdating ? "Update" : "Save"}
        isOpen={isOpen}
        loading={loading}
        onClose={isUpdating ? onCloseUpdate : onClose}
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
              {!isUpdating && (
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
              )}
              {!isUpdating && (
                <div>
                  <input
                    className="border border-primary rounded mt-2 mb-2 py-2 text-sm text-left pl-2 w-full"
                    type="password"
                    placeholder="Password"
                    {...register("password", {
                      required: "Password is required",
                      validate: (value) =>
                        !(value?.length! < 8) ||
                        "Password Length is short, must be at least 8 characters",
                    })}
                  />
                  {errors?.password && (
                    <span className="text-left text-rose-500 font-normal text-xs">
                      {errors?.password?.message}
                    </span>
                  )}
                </div>
              )}
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
              <div className="font-light text-green-light-mini">Upload</div>
            </button>
          </form>
          <div className="flex flex-row items-center gap-4">
            <p className="py-2">Add Students CSV file for bulkupload</p>
            <div
              className="hover:cursor-pointer hover:underline font-bold text-green-light-mini"
              onClick={exportToExcel}
            >
              Download Sample
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="mt-5 md:ml-5">
          {/* <DropdownFilter onChange={onChange} items={['100']} /> */}
          {
            <NewCustomTable
              columns={columns}
              data={lecturers?.lecturers}
              updateStudentsLevels={true}
              showPopoverFilter={true}
              updateLevels={updateLevels}
              updateLevel={updateLevel}
              confirmLevelUpdate={confirmUpdate}
              selectedLevels={selectedLevels}
            />
          }

          {/* <CustomTable columns={isMobile.isMobile ? mobileBuyColumns : columns} data={buyTransactionsSet} /> */}
        </div>
      </div>
    </>
  );
};

export default StudentsPage;
