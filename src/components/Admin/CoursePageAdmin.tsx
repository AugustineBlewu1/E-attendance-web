import { useEffect, useState } from "react";
import HttpService from "../../services/HttpService";
import { Courses, User } from "../../services/User";
import { useSelector } from "react-redux";
import { Button, useDisclosure, useToast } from "@chakra-ui/react";
import CustomModal from "../UI/CustomModal";
import { SubmitHandler, useForm } from "react-hook-form";
import { selectCurrentAdmin } from "../../services/adminReducer";
import NewCustomTable from "../UI/CustomTable";
import { ColumnDef } from "@tanstack/react-table";
import { columnCoursesHelper } from "../../services/helpers/helper";
import { format } from "date-fns";
// import useGetVenues from "../../services/hooks/useGetVenues";
import {  PlusCircleIcon } from "@heroicons/react/24/outline";
import useGetLecturers from "../../services/hooks/useGetLecturers";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import Loading from "../UI/Loading";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';


const CoursePageAdmin = () => {
  const user = useSelector(selectCurrentAdmin);
  const [courses, SetCourses] = useState<Courses[]>([]);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [courseId, setCourseId] = useState("");
  const lecturers = useGetLecturers();
  const [fileForUpload, setFile] = useState<any>();

  const [courseData, saveCourseData] = useState<Courses | null>(null);

  const toast = useToast();

  //qrcode modal
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: false });
  const {
    isOpen: isAssign,
    onOpen: openAssign,
    onClose: closeAssign,
  } = useDisclosure({ defaultIsOpen: false });

  type Assign = {
    lecturer_id: string;
  };

  //register  a new course

  const exportToExcel = () => {
    // Sample data
    const data = [
        { "Course Name": "PHARMACOLOGY", "Code": "PHARM 1", level: "100" },
        { "Course Name": "PHARMACOLOGY 2", "Code": "PHARM 2", level: "200" },
    ];

    // Create a new workbook and a new worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    
    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sample Data");

    // Generate the Excel file and trigger the download
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "sample_data.xlsx");
};


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Courses>({
    defaultValues: {},
  });

  //assign  a new course

  const {
    register: assign,
    handleSubmit: handleAssign,
    reset: resetAassign,
  } = useForm<Assign>({
    defaultValues: {},
  });

  const emptyForm = {
    course_id: "",
    name: "",
    level: "",
    course_code: "",
  };
  const handleUpdatingCourse = (course: Courses) => {
    setUpdating(true);
    reset(course);
    onOpen();
  };
  const handleDeletingCourse = (course: Courses) => {
    setDeleting(true);
    saveCourseData(course);
    openAssign();
  };

  const handleDeletingClose = () => {
    setDeleting(false);
    saveCourseData(null);

    closeAssign();
  };
  const handleUpdateClose = () => {
    setUpdating(false);
    reset(emptyForm);
    onClose();
  };

  const handleDeletingFinalCourse = async (id: string) => {
    console.log(id);
    setLoading(true);
    try {
      const deleteUser = await HttpService.deleteWithToken<any>(
        `/api/v1/courses/${id}`,
        `${(user as User)?.accessToken}`
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
          title: "Course Deleted Successfully",
          description: "",
          status: "success",
          duration: 7000,
          isClosable: true,
          position: "top-right",
        });

        reset(emptyForm);
        setLoading(false);
        closeAssign();
        setTimeout(() => {
          window.location.reload();
        }, 600);
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

  //Generate a new qr Code

  //get courses on first initialization of pages
  //dependency on user
  useEffect(() => {
    getCourse();
  }, [user]);

  const getCourse = async () => {
    const course = await HttpService.getWithToken<any>(
      "/api/v1/courses",
      `${(user as User)?.accessToken}`
    );
    console.log("Courses", course?.data);
    SetCourses(course?.data);
  };
  console.log("Lecturer", lecturers.lecturers);

  const onSubmitAssign: SubmitHandler<Assign> = async (data) => {
    console.log(data);
    console.log(courseId);

    setLoading(true);
    const saveCourseResponse = await HttpService.postWithToken<any>(
      "/api/v1/coursesAttach",
      `${(user as User)?.accessToken}`,
      {
        user_id: data?.lecturer_id,
        course_id: courseId,
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
        title: "Lecturer Assigned Successfully",
        description: (saveCourseResponse as any).data?.message,
        status: "success",
        duration: 7000,
        isClosable: true,
        position: "top-right",
      });
      resetAassign();
      closeAssign();
      setCourseId("");
      setLoading(false);
    }
    console.log(saveCourseResponse);

    //country id
  };
  const onSubmit: SubmitHandler<Courses> = async (data) => {
    console.log(data);
    setLoading(true);
    const saveCourseResponse = !updating
      ? await HttpService.postWithToken<any>(
          "/api/v1/courses",
          `${(user as User)?.accessToken}`,
          {
            code: data?.course_code,
            name: data?.name,
            level: data?.level,
          }
        )
      : await HttpService.patchWithToken<any>(
          `/api/v1/courses/${data?.course_id}`,
          `${(user as User)?.accessToken}`,
          {
            code: data?.course_code,
            name: data?.name,
            level: data?.level,
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
      updating
        ? toast({
            title: "Course Updated",
            description: (saveCourseResponse as any).data?.message,
            status: "success",
            duration: 7000,
            isClosable: true,
            position: "top-right",
          })
        : toast({
            title: "Course Created",
            description: (saveCourseResponse as any).data?.message,
            status: "success",
            duration: 7000,
            isClosable: true,
            position: "top-right",
          });

      reset();
      getCourse();
      onClose();
      setLoading(false);
    }
    console.log(saveCourseResponse);

    //country id
  };

  const columns: ColumnDef<Courses, unknown>[] = [
    columnCoursesHelper.accessor("name", {
      header: () => "Course Name",
      cell: (props) => (
        <>
          <div className="flex">
            <span>{props?.getValue()}</span>
          </div>
        </>
      ),
    }),

    columnCoursesHelper.accessor("course_code", {
      header: () => "Course Code",
      cell: (props) => (
        <>
          <span>{props?.getValue()}</span>
        </>
      ),
    }),
    columnCoursesHelper.accessor("created_at", {
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
    columnCoursesHelper.display({
      header: () => "Assign",
      id: "assign",
      cell: (props) => (
        <span className="">
          <PlusCircleIcon
            className="h-6 hover:cursor-pointer"
            onClick={() => {
              setCourseId(props?.row.original.course_id!);
              openAssign();
            }}
          />
        </span>
      ),
      enableGlobalFilter: true,
    }),
    columnCoursesHelper.display({
      header: () => "Actions",
      id: "actions",
      cell: (props) => (
        <span>
          <span className="flex justify-start gap-2">
            <EditIcon
              height={5}
              width={5}
              color={"green"}
              className="hover:cursor-pointer"
              onClick={() => handleUpdatingCourse(props?.row?.original)}
            />
            <DeleteIcon
              height={5}
              width={5}
              color={"red"}
              className="hover:cursor-pointer"
              onClick={() => handleDeletingCourse(props?.row?.original)}
            />
          </span>
        </span>
      ),
      enableGlobalFilter: true,
    }),
  ] as Array<ColumnDef<Courses, unknown>>;

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
          "/api/v1/courses/importCourses",
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
            title: "Courses Uploaded Successfully",
            description:"",
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

  return (
    <>
      <CustomModal
        headerText={updating ? "Update Course Details" : "Enter Course Details"}
        footerText={updating ? "Update" : "Save"}
        isOpen={isOpen}
        loading={loading}
        onClose={updating ? handleUpdateClose : onClose}
        onSubmit={handleSubmit(onSubmit)}
        children={
          <div>
            <p>Provide the course details</p>
            <form action="">
              <select
                className="border border-primary rounded mt-2 mb-2 h-11 pl-2 text-sm text-left w-full"
                {...register("level", {
                  required: "Course Level is required",
                })}
              >
                <option selected disabled value="--select your level --">
                  --select your level --
                </option>
                <option value="100">100</option>
                <option value="200">200</option>
                <option value="300">300</option>
                <option value="400">400</option>
                <option value="500">500</option>
                <option value="600">600</option>
              </select>
              {errors.level && (
                <span className="text-left text-rose-500 font-normal text-xs">
                  {errors?.level?.message}
                </span>
              )}
              <input
                className="border border-primary rounded mt-2 mb-2 py-2 pl-2 text-sm text-left w-full"
                type="text"
                placeholder="Course Name"
                {...register("name", {
                  required: "Course Venue field is required",
                  validate: (value) =>
                    !(value?.length < 4) || "Invalid Course Name",
                })}
              />
              {errors.name && (
                <span className="text-left text-rose-500 font-normal text-xs">
                  {errors?.name?.message}
                </span>
              )}
              <input
                className="border border-primary rounded mt-2 mb-2 py-2 text-sm text-left pl-2 w-full"
                type="text"
                placeholder="Course Code"
                {...register("course_code", {
                  required: "Course Code field is required",
                  validate: (value) =>
                    !(value?.length < 3) || "Invalid Course Code",
                })}
              />
              {errors.course_code && (
                <span className="text-left text-rose-500 font-normal text-xs">
                  {errors?.course_code?.message}
                </span>
              )}
            </form>
          </div>
        }
      />
      <div
        className="float-right"
        
      >
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
          <p className="py-2">Add Courses CSV file for bulkupload</p> 
            <div className="hover:cursor-pointer hover:underline font-bold text-green-light-mini" onClick={exportToExcel}>Download Sample</div>
          </div>
      </div>
      <div>
        <Button
          className="bg-primary  my-4 mx-4 hover:border-none"
          onClick={onOpen}
        >
          Add New Course
        </Button>
      </div>

      <NewCustomTable columns={columns} data={courses} showPopoverFilter={false} updateStudentsLevels={false} />

      {/* <CustomTable columns={isMobile.isMobile ? mobileBuyColumns : columns} data={buyTransactionsSet} /> */}

      <CustomModal
        headerText={
          deleting ? "Delete this Course?" : "Select Lecturer to Assign Course"
        }
        footerText={deleting ? "Delete" : "Save"}
        isOpen={isAssign}
        loading={loading}
        onClose={deleting ? handleDeletingClose : closeAssign}
        onSubmit={handleAssign(onSubmitAssign)}
        showFooter={false}
        children={
          !deleting ? (
            <div>
              <p>Select a lecturer</p>
              <form action="">
                <select
                  className="border border-primary rounded mt-2 mb-2 h-9 pl-2 text-sm text-left w-full"
                  {...assign("lecturer_id", {
                    required: "Course Level is required",
                  })}
                >
                  <option selected disabled value="--select your lecturer --">
                    --select your lecturer --
                  </option>

                  {lecturers?.lecturers.map((lecturer) => (
                    <option key={lecturer.id} value={lecturer.id}>
                      <span>
                        {lecturer?.first_name ?? "" + lecturer?.last_name ?? ""}
                      </span>
                      <span className="pl-3">
                        {"@"} {lecturer?.email}
                      </span>
                    </option>
                  ))}
                </select>
              </form>
            </div>
          ) : (
            <div>
              <p className="font-medium">{`Are you sure you want to delete ${courseData?.name}`}</p>

              {loading ? (
                <div className="text-center pt-3">
                  <Loading />
                </div>
              ) : (
                <button
                  type="submit"
                  className=" w-[80%]  mx-[10%] bg-[#e62b2be8] border-2 rounded-full py-2  text-white    hover:bg-[#ff0000e8] hover:text-white hover:border-none
           lg:mt-[1.3rem]"
                  onClick={() => {
                    handleDeletingFinalCourse(courseData?.course_id!);
                  }}
                >
                  {"Delete"}
                </button>
              )}
            </div>
          )
        }
      />
    </>
  );
};

export default CoursePageAdmin;
