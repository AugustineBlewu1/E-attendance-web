import { useLocation, useNavigate } from "react-router-dom";
import useGetCourseQrCodes from "../../services/hooks/useGetCourseQrCodes";
import Loader from "../Loader";
import { format } from "date-fns";
import QrCodeSample from "../../assets/sample_qr_code.png";
// import CustomModal from "../UI/CustomModal";
// import QRCode from "react-qr-code";
// import { useDisclosure } from "@chakra-ui/react";
// import { useState } from "react";

const CoursePage = () => {
  const locaation = useLocation();
  // const [setQRCodeValue, SetQRCodeValue] = useState('');
  const navigate = useNavigate();
  const courseQrCodes = useGetCourseQrCodes(locaation?.state?.id);
  //Display qr code modal
  // const {
  //   isOpen: isdisplayQRCode,
  //   onOpen: onOpenQRDISPLAY,
  //   onClose: onCloseQRDisplay,
  // } = useDisclosure({ defaultIsOpen: false });

  return (
    <>
      {courseQrCodes?.loading ? (
        <Loader></Loader>
      ) : (
        <>
          {/* <CustomModal
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
      /> */}
          <div className="flex flex-col space-y-4">
            {courseQrCodes?.courseQrCode?.map((e) => (
              <div
                className="border-2 py-5 hover:shadow-lg rounded-lg px-10 flex justify-between flex-row hover:cursor-pointer "
                onClick={() =>
                  navigate(`/scannedStudents/${e?.id}`, {
                    state: { id: e?.id },
                  })
                }
              >
                <div>
                  <span className="flex flex-col md:flex-row md:space-x-2">
                    <p className="font-bold">Course Name : </p>
                    <p>{e?.course?.name}</p>
                  </span>
                  <span className="flex flex-col md:flex-row md:space-x-2">
                    <p className="font-bold">Venue : </p> <p>{e?.venue}</p>
                  </span>
                  <span className="flex flex-col md:flex-row md:space-x-2">
                    <p className="font-light text-sm">Date Generated : </p>{" "}
                    <span className="font-light text-sm">
                      {format(new Date(e?.created_at), "dd/MM/yyy hh:mm")}
                    </span>
                  </span>
                </div>

                <div>
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
    </>
  );
};

export default CoursePage;
