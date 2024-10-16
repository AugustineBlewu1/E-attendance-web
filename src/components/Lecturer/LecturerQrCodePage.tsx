import {  useRef, useState } from "react";
import HttpService from "../../services/HttpService";
import {  User } from "../../services/User";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../services/userReducer";
import { Button, useDisclosure, useToast } from "@chakra-ui/react";
import CustomModal from "../UI/CustomModal";
import { SubmitHandler, useForm } from "react-hook-form";
import QRCode from "react-qr-code";
import { encodeJson } from "../../services/store/security";
import { useNavigate } from "react-router-dom";
import useGetVenues from "../../services/hooks/useGetVenues";
import useGetMyCourses from "../../services/hooks/useGetMyCourses";
import Loader from "../Loader";
// import useGetVenues from "../../services/hooks/useGetVenues";

const LecturerQrCodePage = () => {
  const user = useSelector(selectCurrentUser);
  // const [courses, SetCourses] = useState<Courses[]>([]);
  const [loading, setLoading] = useState(false);
  const [courseId, setCourseId] = useState<string>("");
  const [setQRCodeValue, SetQRCodeValue] = useState("");
  const toast = useToast();
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement | any >(null);
   const venueList = useGetVenues(selectCurrentUser);

   const getMyCourses = useGetMyCourses();

   console.log("myco", getMyCourses)

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
    // watch: watchQr,
    reset: resetQr,
    formState: { errors: qrErrors },
  } = useForm<QrCOde>({
    defaultValues: {},
  });

  //get courses on first initialization of pages
  //dependency on user
  // useEffect(() => {
  //   getCourse();
  // }, [user]);

  // const getCourse = async () => {
  //   const course = await HttpService.getWithToken<any>(
  //     "/api/v1/courses",
  //     `${(user as User)?.accessToken}`
  //   );
  //   console.log("Courses", course?.data);
  //   SetCourses(course?.data);
  // };
  console.log('Venue',venueList);

  const downloadQRCode = () => {
    const svg = canvasRef.current; // Get the SVG element

    // Create a canvas element to render the SVG
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    // Calculate SVG dimensions
    const svgWidth = svg.getAttribute('width');
    const svgHeight = svg.getAttribute('height');

    canvas.width = svgWidth;
    canvas.height = svgHeight;

    // Create a new image element
    const image = new Image();

    // Convert SVG to a data URL
    const svgData = new XMLSerializer().serializeToString(svg);
    const svgUrl = 'data:image/svg+xml;base64,' + btoa(svgData);

    // Draw SVG onto the canvas
    image.onload = function () {
      context?.drawImage(image, 0, 0);

      // Convert canvas to PNG and download
      const pngUrl = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.href = pngUrl;
      downloadLink.download = 'qrCodeImage.png';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    };

    image.src = svgUrl;
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
      // getCourse();
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
          venue_id: data?.courseVenue,
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
        console.log("data here", saveQrResponse?.data);

        const encodedData = encodeJson(JSON.stringify(saveQrResponse?.data));
        SetQRCodeValue(encodedData);
        onOpenQRDISPLAY();
      }
      console.log(saveQrResponse);
      setLoading(false);
    } catch (error) {
      console.log(error);
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
      <div>
        <Button
          className="bg-primary  my-4 mx-4 hover:border-none"
          onClick={onOpen}
        >
          Add New Course
        </Button>
      </div>
      {
        getMyCourses?.loading ? <Loader />
     :
      <div className="grid md:grid-cols-3 grid-cols-1">
        {getMyCourses?.courseQrCode?.map((e) => (
          <div
            className="bg-white rounded-lg border-2 my-4 mx-4 hover:shadow-2xl hover:cursor-pointer"
            key={e?.course_id}
          >
            <div className="flex flex-col py-5 px-5 space-y-2">
              <div
                className="flex-col py-5 px-5 space-y-2"
                onClick={() =>
                  navigate(`/course/${e?.course_id}`, {
                    state: { id: e?.course_id },
                  })
                }
              >
                <div className="font-bold text-lg">{e?.name}</div>
                <div className="font-medium text-sm">{e?.course_code}</div>
               
              </div>
                <div className="flex flex-row items-center justify-between">
                <span
                className="border-2  w-fit p-2 rounded-lg bg-gray-200"
                onClick={() => {
                  onOpenQR();
                  setCourseId(e?.course_id!);
                }}
              >
                Generate QR
              </span>
                <span className="text-sm">{`${new Date()?.getFullYear()}-${(
                  "0" +
                  (new Date()?.getMonth() + 1)
                ).slice(-2)}-${("0" + new Date()?.getDate()).slice(-2)}`}</span>
                </div>
              
            </div>
          </div>
        ))}
      </div>
 }
      <CustomModal
        headerText="Generate QR Code"
        footerText="Save"
        isOpen={isOpenQR}
        loading={loading}
        onClose={onCloseQR}
        onSubmit={handleQrGenerate(onSubmitQr)}
        children={
          <div>
            <p>Select the venue for the course</p>
            <form action="">
              <select
                className="border border-primary rounded py-2 mt-2  h-11 pl-2 text-sm text-left w-full"
                {...qrGenerate("courseVenue", {
                  required: "Course Venue field is required",
                 })}
                >
                {
                  ...venueList?.venues?.map((ve, id) => (
                    <option key={id} value={ve?.id}>
                      {
                        ve?.name
                      }
                    </option>
                  ))
                }
              </select>
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
        headerText="Generated QR Code"
        footerText="Download"
        isOpen={isdisplayQRCode}
        loading={false}
        onClose={onCloseQRDisplay}
        onSubmit={downloadQRCode}
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
                ref={canvasRef}
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
