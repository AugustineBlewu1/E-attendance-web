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
import { ArrowUpTrayIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import useGetLecturers from "../../services/hooks/useGetLecturers";

const CoursePageAdmin = () => {
  const user = useSelector(selectCurrentAdmin);
  const [courses, SetCourses] = useState<Courses[]>([]);
  const [loading, setLoading] = useState(false);
  const [courseId, setCourseId] = useState(0);
  const lecturers = useGetLecturers();

  const toast = useToast();

  //qrcode modal
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: false });
  const {
    isOpen: isAssign,
    onOpen: openAssign,
    onClose: closeAssign,
  } = useDisclosure({ defaultIsOpen: false });

  type Inputs = {
    courseName: string;
    courseCode: string;
    courseLevel: string;
    courseDescription: string | null;
  };
  type Assign = {
    lecturer_id: string;
  };

  //register  a new course

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
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
      setCourseId(0);
      setLoading(false);
    }
    console.log(saveCourseResponse);

    //country id
  };
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    setLoading(true);
    const saveCourseResponse = await HttpService.postWithToken<any>(
      "/api/v1/courses",
      `${(user as User)?.accessToken}`,
      {
        code: data?.courseCode,
        name: data?.courseName,
        level: data?.courseLevel,
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
              setCourseId(props?.row.original.course_id);
              openAssign();
            }}
          />
        </span>
      ),
      enableGlobalFilter: true,
    }),
  ] as Array<ColumnDef<Courses, unknown>>;

  return (
    <>
      <CustomModal
        headerText="Enter Course Details"
        footerText="Save"
        isOpen={isOpen}
        loading={loading}
        onClose={onClose}
        onSubmit={handleSubmit(onSubmit)}
        children={
          <div>
            <p>Provide the course details</p>
            <form action="">
              <select
                className="border border-primary rounded mt-2 mb-2 h-11 pl-2 text-sm text-left w-full"
                {...register("courseLevel", {
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
              </select>
              {errors.courseName && (
                <span className="text-left text-rose-500 font-normal text-xs">
                  {errors?.courseName?.message}
                </span>
              )}
              <input
                className="border border-primary rounded mt-2 mb-2 py-2 pl-2 text-sm text-left w-full"
                type="text"
                placeholder="Course Name"
                {...register("courseName", {
                  required: "Course Venue field is required",
                  validate: (value) =>
                    !(value?.length < 4) || "Invalid Course Name",
                })}
              />
              {errors.courseName && (
                <span className="text-left text-rose-500 font-normal text-xs">
                  {errors?.courseName?.message}
                </span>
              )}
              <input
                className="border border-primary rounded mt-2 mb-2 py-2 text-sm text-left pl-2 w-full"
                type="text"
                placeholder="Course Code"
                {...register("courseCode", {
                  required: "Course Code field is required",
                  validate: (value) =>
                    !(value?.length < 3) || "Invalid Course Code",
                })}
              />
              {errors.courseCode && (
                <span className="text-left text-rose-500 font-normal text-xs">
                  {errors?.courseCode?.message}
                </span>
              )}
            </form>
          </div>
        }
      />
      <div
        className="float-right"
        onClick={() => {
          toast({
            title: "Coming Soon",
            description: "",
            status: "info",
            duration: 7000,
            isClosable: true,
            position: "top-right",
          });
        }}
      >
        <form className="py-2 px-2 rounded-lg w-fit border-2 hover:cursor-pointer hover:bg-slate-100">
          <input type="file" accept=".csv" />
          <button type="submit" className="px-2">
            {" "}
            <ArrowUpTrayIcon className="w-4 h-4" />
          </button>
        </form>
        <p className="py-2">Upload Courses</p>
      </div>
      <div>
        <Button
          className="bg-primary  my-4 mx-4 hover:border-none"
          onClick={onOpen}
        >
          Add New Course
        </Button>
      </div>

      <NewCustomTable columns={columns} data={courses} />

      {/* <CustomTable columns={isMobile.isMobile ? mobileBuyColumns : columns} data={buyTransactionsSet} /> */}

      <CustomModal
        headerText="Select Lecturer to Assign Course"
        footerText="Save"
        isOpen={isAssign}
        loading={loading}
        onClose={closeAssign}
        onSubmit={handleAssign(onSubmitAssign)}
        children={
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
        }
      />
    </>
  );
};

export default CoursePageAdmin;
