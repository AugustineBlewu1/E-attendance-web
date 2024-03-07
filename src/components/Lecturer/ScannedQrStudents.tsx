import { useLocation } from "react-router-dom";
import Loader from "../Loader";
import { format } from "date-fns";
import transaction from "../../lotties/transaction.json";
import useGetScannedStudents from "../../services/hooks/useGetScannedStudents";
import Lottie from "react-lottie";
// import CustomModal from "../UI/CustomModal";
// import QRCode from "react-qr-code";
// import { useDisclosure } from "@chakra-ui/react";
// import { useState } from "react";

const ScannedQrStudents = () => {
  const locaation = useLocation();
  // const [setQRCodeValue, SetQRCodeValue] = useState('');

  const courseQrCodes = useGetScannedStudents(locaation?.state?.id);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: transaction,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <>
      {courseQrCodes?.loading ? (
        <Loader></Loader>
      ) : courseQrCodes?.scannedStudent.length === 0 ? (
        <div>
          <Lottie options={defaultOptions} width={"40%"} height={"40%"} />
        </div>
      ) : (
        <>
          <div className="flex flex-col space-y-4">
            {courseQrCodes?.scannedStudent?.map((e) => (
              <div className="border-2 py-5 hover:shadow-lg rounded-lg px-10 flex justify-between flex-row ">
                <div>
                  <span className="flex flex-col md:flex-row md:space-x-2">
                    <p className="font-bold">Student ID : </p>
                    <p>{e?.student?.student_id}</p>
                  </span>
                  <span className="flex flex-col md:flex-row md:space-x-2">
                    <p className="font-bold">Full Name : </p>{" "}
                    <p>
                      {e?.student?.user?.first_name} {e?.student.user?.last_name}
                    </p>
                  </span>
                  <span className="flex flex-col md:flex-row md:space-x-2">
                    <p className="font-light text-sm">Date Scanned : </p>{" "}
                    <span className="font-light text-sm">
                      {format(new Date(e?.created_at), "dd/MM/yyy hh:mm")}
                    </span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default ScannedQrStudents;
