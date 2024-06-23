import { useEffect, useRef, useState } from "react";
import { decodeJson } from "../../services/store/security";
import { CircularProgress, useToast } from "@chakra-ui/react";
import HttpService from "../../services/HttpService";
import { useSelector } from "react-redux";
import { selectCurrentStudentUser } from "../../services/studentReducer";
import { UserStudent } from "../../services/User";
import { useNavigate } from "react-router-dom";
import QrScanner from "qr-scanner";

const QrScanPage = () => {
  const toast = useToast();
  const user = useSelector(selectCurrentStudentUser);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const scanner = useRef<QrScanner>();
  const videoEl = useRef<HTMLVideoElement>(null);
  const qrBoxEl = useRef<HTMLDivElement>(null);
  const [qrOn, setQrOn] = useState<boolean>(true);
  
  const onScanSuccess = (result: QrScanner.ScanResult) => {
    console.log(result);
    // ✅ Handle success.
    // 😎 You can do whatever you want with the scanned result.

    const decode = decodeJson(result?.data);
    console.log("decode", decode);
    const id = (decode as any)?.id;
    console.log("id", id);

    submitScanData(id);
  };

  // Fail
  const onScanFail = (err: string | Error) => {
    // 🖨 Print the "err" to browser console.
    console.log(err);
  };

  useEffect(() => {
    if (videoEl?.current && !scanner.current) {
      scanner.current = new QrScanner(videoEl?.current, onScanSuccess, {
        onDecodeError: onScanFail,
        preferredCamera: "environment",
        highlightScanRegion: true,
        highlightCodeOutline: true,
        maxScansPerSecond: 1,
        overlay: qrBoxEl?.current || undefined,
      });

      // 🚀 Start QR Scanner
      scanner?.current
        ?.start()
        .then(() => setQrOn(true))
        .catch((err) => {
          if (err) setQrOn(false);
        });
    }

    // 🧹 Clean up on unmount.
    // 🚨 This removes the QR Scanner from rendering and using camera when it is closed or removed from the UI.
    return () => {
      if (!videoEl?.current) {
        scanner?.current?.stop();
      }
    };
  }, []);

  const positionOptions = {
    enableHighAccuracy: true,
    timeout: 2000, // 2 seconds
    maximumAge: 0
  };
  // const getLocation = async () => {
  //   return new Promise<{ latitude: number; longitude: number }>(
  //     (resolve, reject) => {
  //       if (navigator.geolocation) {
        
  //         navigator.geolocation.getCurrentPosition(
  //           (position) => {
  //             const { latitude, longitude } = position.coords;
  //             resolve({ latitude, longitude });
  //           },
  //           (error) => {
  //             toast({
  //               title: "Error",
  //               description: `Error getting user's location: ${error}`,
  //               status: "error",
  //               duration: 5000,
  //               isClosable: true,
  //               position: "top-right",
  //             });
  //             console.log('Getting Location error',error)
  //             reject(error);
  //           },
  //           positionOptions
  //         );
  //       } else {
  //         const error = new Error(
  //           "Geolocation is not supported by this browser."
  //         );
  //         toast({
  //           title: "Error",
  //           description: "Geolocation is not supported by this browser.",
  //           status: "error",
  //           duration: 5000,
  //           isClosable: true,
  //           position: "top-right",
  //         });
  //         console.error(error);
  //         reject(error);
  //       }
  //     }
  //   );
  // };

  const watchUserLocation = () => {
    return new Promise<{ latitude: number; longitude: number; clearWatch: () => void }>(
      (resolve, reject) => {
        if (navigator.geolocation) {
          const positionOptions = {
            enableHighAccuracy: true,
            timeout: 10000, // 10 seconds
            maximumAge: 0
          };
  
          const watchId = navigator.geolocation.watchPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              resolve({ latitude, longitude, clearWatch: () => navigator.geolocation.clearWatch(watchId) });
            },
            (error) => {
              let errorMessage;
              switch(error.code) {
                case error.PERMISSION_DENIED:
                  errorMessage = "User denied the request for Geolocation.";
                  break;
                case error.POSITION_UNAVAILABLE:
                  errorMessage = "Location information is unavailable.";
                  break;
                case error.TIMEOUT:
                  errorMessage = "The request to get user location timed out.";
                  break;
             
              }
              toast({
                title: "Error",
                description: `Error getting user's location: ${errorMessage}`,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top-right",
              });
              reject(error);
            },
            positionOptions
          );
        } else {
          const error = new Error(
            "Geolocation is not supported by this browser."
          );
          toast({
            title: "Error",
            description: "Geolocation is not supported by this browser.",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top-right",
          });
          console.error(error);
          reject(error);
        }
      }
    );
  };
  
  useEffect(() => {
    if (!qrOn)
      alert(
        "Camera is blocked or not accessible. Please allow camera in your browser permissions and Reload."
      );
  }, [qrOn]);

  const submitScanData = async (qrCode: any) => {
    // const { latitude, longitude } = await getLocation();
    const { latitude, longitude, clearWatch } = await watchUserLocation();
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    
    // To stop watching the location
    // clearWatch();
     console.log("Latitude in submitScanData:", latitude);
     console.log("Longitude in submitScanData:", longitude);


    // console.log("Qrcode", qrCode);
    // console.log("Student", user?.id);
    // console.log(latitude, longitude);

    
    setLoading(true);

    try {
      const saveCourseResponse = await HttpService.postWithToken<any>(
        "/api/v1/qrCodeScan",
        `${(user as UserStudent)?.accessToken}`,
        {
          qr_code_id: qrCode?.toString(),
          student_id: user?.id?.toString(),
          latitude,
          longitude,
        }
      );
      console.log("Response", saveCourseResponse);
      if (saveCourseResponse.hasOwnProperty("error")) {
        toast({
          title: "Error",
          description: (saveCourseResponse as any).data?.message,
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top-right",
        });
        setLoading(false);
        clearWatch()
      } else {
        toast({
          title: "Scan Succesful",
          description: (saveCourseResponse as any).data?.message,
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "top-right",
        });
        setLoading(false);
        navigate(-1);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: (error as any)?.response?.data?.message,
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });
      navigate(-1);
      clearWatch()

      console.log("catch error", error);
    }
  };

  return (
    <>
      <div className="text-center">
        {loading === true ? (
          <>
            {" "}
            <CircularProgress
              isIndeterminate
              color="#04A551"
              size="50px"
              thickness={"10px"}
            />
            <span className="ml-4"> Loading</span>
          </>
        ) : (
          <>
            <div className="text-center font-bold">Scanning...</div>

            <video ref={videoEl} className="md:w-[30%] w-full py-5 "></video>

            {/* <QrReader
              onResult={(result, error) => {
                if (!!result) {
                  console.log(result);
                  const decode = decodeJson(result?.getText());
                  console.log("decode", decode);
                  const id = (decode as any)?.id
                  console.log("id", id);

                  submitScanData(id);
                }

                if (!!error) {
                  console.info(error);
                }
              }}
              className="md:w-[30%] w-full py-5 "
              constraints={{ facingMode: "user" }}
            /> */}
          </>
        )}
      </div>
    </>
  );
};

export default QrScanPage;
