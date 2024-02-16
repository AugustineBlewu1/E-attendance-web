import { useState } from "react";
import { QrReader } from "react-qr-reader";
import { decode, decodeJson } from "../../services/store/security";
import { CircularProgress, useToast } from "@chakra-ui/react";
import HttpService from "../../services/HttpService";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../services/userReducer";
import { selectCurrentStudentUser } from "../../services/studentReducer";
import { UserStudent } from "../../services/User";
const QrScanPage = () => {
  const [data, setData] = useState<any>();
  const toast = useToast();
  const [showScan, setShowScan] = useState(false);
  const user = useSelector(selectCurrentStudentUser);
  const [loading, setLoading] = useState(false);

  const submitScanData = async ({ qrCode }: any) => {
    setLoading(true);

    const saveCourseResponse = await HttpService.postWithToken<any>(
      "http://127.0.0.1/api/v1/qrCodeScan",
      `${(user as UserStudent)?.accessToken}`,
      {
        qr_code_id: qrCode,
        student_id: user?.id,
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
        title: "Scan Succesful",
        description: (saveCourseResponse as any).data?.message,
        status: "success",
        duration: 7000,
        isClosable: true,
        position: "top-right",
      });
      setLoading(false);
    }
  };

  return (
    <>
      <div className="text-center font-bold">Scanning...</div>

      {loading === true ? (
        <>
          {" "}
          <CircularProgress
            isIndeterminate
            color="#04A551"
            size="20px"
            thickness={"40px"}
          />
          <span className="ml-4"> Loading</span>
        </>
      ) : (
        <QrReader
          onResult={(result, error) => {
            if (!!result) {
              console.log(result);
                const decode = decodeJson(result?.getText());
                console.log('decode',decode);

              console.log("data", data);
              submitScanData((decode as any)?.id);
            }

            if (!!error) {
              console.info(error);
            }
          }}
          className="md:w-[30%] w-full py-5 "
          constraints={{ facingMode: "user" }}
        />
      )}
    </>
  );
};

export default QrScanPage;
