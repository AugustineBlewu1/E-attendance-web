import { useLocation, useNavigate } from "react-router-dom";
import useGetCourseQrCodes from "../../services/hooks/useGetCourseQrCodes";
import Loader from "../Loader";
import { format } from "date-fns";
import QrCodeSample from "../../assets/sample_qr_code.png";
import CustomModal from "../UI/CustomModal";
import { useDisclosure } from "@chakra-ui/react";
import QRCode from "react-qr-code";
import { useRef, useState } from "react";
import { encodeJson } from "../../services/store/security";
import { CourseQr } from "../../services/types";

const CoursePage = () => {
  const locaation = useLocation();
  const canvasRef = useRef<HTMLCanvasElement | any>(null);

  const navigate = useNavigate();
  const courseQrCodes = useGetCourseQrCodes(locaation?.state?.id);
  const [setQRCodeValue, SetQRCodeValue] = useState("");

  //Display qr code modal
  const {
    isOpen: isdisplayQRCode,
    onOpen: onOpenQRDISPLAY,
    onClose: onCloseQRDisplay,
  } = useDisclosure({ defaultIsOpen: false });


  function closeHandler() {
    SetQRCodeValue("");

    onCloseQRDisplay()

    console.log('Encode', setQRCodeValue);

  }

  return (
    <>
      {courseQrCodes?.loading ? (
        <Loader></Loader>
      ) : (
        <>
          <div className="flex flex-col space-y-4">
            {courseQrCodes?.courseQrCode?.map((e) => (
              <div key={e?.id} className="border-2 py-5 hover:shadow-lg rounded-lg px-10 flex justify-between flex-row hover:cursor-pointer ">
                <div
                  onClick={() =>
                    navigate(`/scannedStudents/${e?.id}`, {
                      state: { id: e?.id },
                    })
                  }
                >
                  <span className="flex flex-col md:flex-row md:space-x-2">
                    <p className="font-bold">Course Name : </p>
                    <p>{e?.course?.name}</p>
                  </span>
                  <span className="flex flex-col md:flex-row md:space-x-2">
                    <p className="font-bold">Venue : </p>{" "}
                    <p>{e?.venue?.name}</p>
                  </span>
                  <span className="flex flex-col md:flex-row md:space-x-2">
                    <p className="font-light text-sm">Date Generated : </p>{" "}
                    <span className="font-light text-sm">
                      {format(new Date(e?.created_at), "dd/MM/yyy hh:mm")}
                    </span>
                  </span>
                </div>

                <div
                  onClick={() => {
                    //get data for QrCode's View
                    const viewQrCode: CourseQr = {
                      id: e?.id,
                      venue: e?.venue,
                      course_id: e?.course_id?.toString(),
                      course_name: e?.course.name,
                      course_code: e?.course.code,
                      created_at: e?.course.created_at,
                      updated_at: e?.course.updated_at,
                    };

                    console.log('Encode View', viewQrCode);

                    const encodedData = encodeJson(JSON.stringify(viewQrCode));
                      if(encodedData){
                        console.log('Encode View', encodedData);

                        SetQRCodeValue(encodedData);
    
                        console.log('Encode', setQRCodeValue);
                        onOpenQRDISPLAY();
                      }
                   
                  }}
                >
                  <div className="h-10 w-10">
                    <img src={QrCodeSample} alt="" />
                  </div>{" "}
                  View
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      {/* Show Qr Code */}
      <CustomModal
        headerText="View Generated QR Code"
        footerText="Download"
        isOpen={isdisplayQRCode}
        loading={false}
        onClose={closeHandler}
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

export default CoursePage;
