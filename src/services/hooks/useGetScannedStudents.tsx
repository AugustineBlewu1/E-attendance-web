import { useEffect, useState } from "react";
import {  ScannedStudent } from "../types";
import { useSelector } from "react-redux";
import HttpService from "../HttpService";
import { User } from "../User";
import { selectCurrentUser } from "../userReducer";

const useGetScannedStudents = (id: any) => {
    const [scannedStudent, setScannedStudents] = useState<ScannedStudent[]>([]);
    const user = useSelector(selectCurrentUser);
  
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      getQrCodes();
    }, []);
  
    const getQrCodes = async () => {
      setLoading(true);
      const myQrCodes = await HttpService.postWithToken<any>(
        `/api/v1/scannedQrCodes`,
        `${(user as User)?.accessToken}`,
       {
        "qr_code_id" : id?.toString()
       }
      );
  
      if (myQrCodes?.data) {
        setScannedStudents(myQrCodes?.data);
        setLoading(false);
      } else {
        setScannedStudents([]);
        setLoading(false);
      }
  
      console.log("QrCodes", myQrCodes);
    };

    return {
        loading,
        scannedStudent
    }
}

export default useGetScannedStudents;