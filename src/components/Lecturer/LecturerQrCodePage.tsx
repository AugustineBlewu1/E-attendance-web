import { useEffect, useState } from "react";
import HttpService from "../../services/HttpService";
import { Courses, User } from "../../services/User";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../services/userReducer";
import { Button, useDisclosure, useToast } from "@chakra-ui/react";
import CustomModal from "../UI/CustomModal";
import { SubmitHandler, useForm } from "react-hook-form";
import QRCode from "react-qr-code";
import { encodeJson } from "../../services/store/security";

const LecturerQrCodePage = () => {
  const user = useSelector(selectCurrentUser);
  const [courses, SetCourses] = useState<Courses[]>([]);
  const [loading, setLoading] = useState(false);
  const [courseId, setCourseId] = useState<number>(0);
  const [setQRCodeValue, SetQRCodeValue] = useState('');
  const toast = useToast();

  //qrcode modal
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: false });
  const {
    isOpen: isOpenQR,
    onOpen: onOpenQR,
    onClose: onCloseQR,
  } = useDisclosure({ defaultIsOpen: false });

  //Display qr code modal
  const {
    isOpen: isdisplayQRCode,
    onOpen: onOpenQRDISPLAY,
    onClose: onCloseQRDisplay,
  } = useDisclosure({ defaultIsOpen: false });

  type Inputs = {
    courseName: string;
    courseCode: string;
    courseLevel: string;
    courseDescription: string | null;
  };
  type QrCOde = {
    courseVenue: string;
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

  //Generate a new qr Code

  const {
    register: qrGenerate,
    handleSubmit: handleQrGenerate,
    watch: watchQr,
    reset: resetQr,
    formState: { errors: qrErrors },
  } = useForm<QrCOde>({
    defaultValues: {},
  });

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
        semester_id: 1,
      }
    );
      console.log(saveCourseResponse)
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

  const onSubmitQr: SubmitHandler<QrCOde> = async (data) => {
    console.log(data);
    setLoading(true);
    try {
      const saveQrResponse = await HttpService.postWithToken<any>(
        "/api/v1/qrCode",
        `${(user as User)?.accessToken}`,
        {
          course_id: courseId.toString(),
          venue: data?.courseVenue,
          user_id: user?.id.toString(),
        }
      );

      console.log(saveQrResponse);

      if (saveQrResponse?.errors) {
        toast({
          title: "Error",
          description: (saveQrResponse as any).message,
          status: "error",
          duration: 7000,
          isClosable: true,
          position: "top-right",
        });
        setLoading(false);
      } else {
        toast({
          title: "QR Code Generated",
          description: (saveQrResponse as any).data?.message,
          status: "success",
          duration: 7000,
          isClosable: true,
          position: "top-right",
        });
        resetQr();
        onCloseQR();
        setLoading(false);
        console.log('data here', saveQrResponse?.data);

        const encodedData = encodeJson(JSON.stringify(saveQrResponse?.data));
        SetQRCodeValue(encodedData);
        onOpenQRDISPLAY();

      }
      console.log(saveQrResponse);
      setLoading(false);
    } catch (error) {
      console.log(error)
      toast({
        title: "Error",
        description: "Request Failed",
        status: "error",
        duration: 7000,
        isClosable: true,
        position: "top-right",
      });
      setLoading(false);
    }
    //country id
  };

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
                <option selected disabled value="--select your level --">--select your level --</option>
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
      <div>
        <Button
          className="bg-primary  my-4 mx-4 hover:border-none"
          onClick={onOpen}
        >
          Add New Course
        </Button>
      </div>
      <div className="grid md:grid-cols-3 grid-cols-1">
        {courses?.map((e) => (
          <div
            className="bg-white rounded-lg border-2 my-4 mx-4 hover:shadow-2xl hover:cursor-pointer"
            key={e.course_id}
          >
            <div className="flex flex-col py-5 px-5 space-y-2">
              <span className="text-sm">{e?.name}</span>
              <span className="text-sm">{e?.course_code}</span>
              <span className="text-sm">{`${new Date()?.getFullYear()}-${(
                "0" +
                (new Date()?.getMonth() + 1)
              ).slice(-2)}-${("0" + new Date()?.getDate()).slice(-2)}`}</span>

              <span className="border-2  w-fit p-2 rounded-lg bg-gray-200"
                onClick={() => {
                  onOpenQR();
                  setCourseId(e?.course_id);
                }}
              >
                Generate QR
              </span>
            </div>
          </div>
        ))}
      </div>

      <CustomModal
        headerText="Generate QR Code"
        footerText="Save"
        isOpen={isOpenQR}
        loading={loading}
        onClose={onCloseQR}
        onSubmit={handleQrGenerate(onSubmitQr)}
        children={
          <div>
            <p>Provide the venue for the course</p>
            <form action="">
              <input
                className="border border-primary rounded mt-2 mb-2 py-2 pl-2 text-sm text-left w-full"
                type="text"
                placeholder="Course venue"
                {...qrGenerate("courseVenue", {
                  required: "Course Venue field is required",
                  validate: (value) =>
                    !(value?.length < 4) || "Invalid Course Venue",
                })}
              />
              {qrErrors.courseVenue && (
                <span className="text-left text-rose-500 font-normal text-xs">
                  {qrErrors?.courseVenue?.message}
                </span>
              )}
            </form>
          </div>
        }
      />

      <CustomModal
        headerText="Generated QR CODE"
        footerText="Okay"
        isOpen={isdisplayQRCode}
        loading={false}
        onClose={onCloseQRDisplay}
        onSubmit={() => {}}
        children={
          <div>
            <div
              style={{
                height: "auto",
                margin: "0 auto",
                width: "100%",
              }}
            >
              <QRCode
                size={1000}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={setQRCodeValue.toString()}
                viewBox={`0 0 256 256`}
              />
            </div>
          </div>
        }
      />
    </>
  );
};

export default LecturerQrCodePage;
