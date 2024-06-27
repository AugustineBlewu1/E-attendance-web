import { useEffect, useState } from "react";
import {  Course } from "../types";
import HttpService from "../HttpService";
import { User } from "../User";


const useCourses = (user: User) => {
    const [courseQrCode, setCourses] = useState<Course[]>([]);
  
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      getQrCodes();
    }, []);
  
    const getQrCodes = async () => {
      setLoading(true);
      const myQrCodes = await HttpService.getWithToken<any>(
        `/api/v1/courses`,
        `${(user as User)?.accessToken}`,
       
      );
  
      if (myQrCodes?.data) {
        setCourses(myQrCodes?.data);
        setLoading(false);
      } else {
        setCourses([]);
        setLoading(false);
      }
  
      console.log("QrCodes", myQrCodes);
    };

    return {
        loading,
        courseQrCode
    }
}

export default useCourses;