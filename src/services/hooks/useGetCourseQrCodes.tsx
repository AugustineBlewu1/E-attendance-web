import { useEffect, useState } from "react";
import {  QrCode } from "../types";
import { useSelector } from "react-redux";
import { selectCurrentStudentUser } from "../studentReducer";
import HttpService from "../HttpService";
import { User, UserStudent } from "../User";
import { selectCurrentUser } from "../userReducer";

const useGetCourseQrCodes = (id: any) => {
    const [courseQrCode, setCourseQrCodes] = useState<QrCode[]>([]);
    const user = useSelector(selectCurrentUser);
  
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      getQrCodes();
    }, []);
  
    const getQrCodes = async () => {
      setLoading(true);
      const myQrCodes = await HttpService.getWithToken<any>(
        `/api/v1/qrCode/course/${id}`,
        `${(user as User)?.accessToken}`,
       
      );
  
      if (myQrCodes?.data) {
        setCourseQrCodes(myQrCodes?.data);
        setLoading(false);
      } else {
        setCourseQrCodes([]);
        setLoading(false);
      }
  
      console.log("QrCodes", myQrCodes);
    };

    return {
        loading,
        courseQrCode
    }
}

export default useGetCourseQrCodes;