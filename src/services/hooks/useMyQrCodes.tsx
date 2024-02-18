import { useEffect, useState } from "react";
import { MyQrCode } from "../types";
import { useSelector } from "react-redux";
import { selectCurrentStudentUser } from "../studentReducer";
import HttpService from "../HttpService";
import { UserStudent } from "../User";

const useMyQrCode = () => {
    const [myQrCodes, setMyQrCodes] = useState<MyQrCode[]>([]);
    const user = useSelector(selectCurrentStudentUser);
  
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      getQrCodes();
    }, []);
  
    const getQrCodes = async () => {
      setLoading(true);
      const myQrCodes = await HttpService.postWithToken<any>(
        "/api/v1/myQrCodes",
        `${(user as UserStudent)?.accessToken}`,
        {
          id: user?.id?.toString(),
        }
      );
  
      if (myQrCodes?.data) {
        setMyQrCodes(myQrCodes?.data);
        setLoading(false);
      } else {
        setMyQrCodes([]);
        setLoading(false);
      }
  
      console.log("QrCodes", myQrCodes);
    };

    return {
        loading,
        myQrCodes
    }
}

export default useMyQrCode;