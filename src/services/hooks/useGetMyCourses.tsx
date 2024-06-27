import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import HttpService from "../HttpService";
import { Courses, User } from "../User";
import { selectCurrentUser } from "../userReducer";

const useGetMyCourses = () => {
    const [courseQrCode, setCourses] = useState<Courses[]>([]);
    const user = useSelector(selectCurrentUser);
  
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      getQrCodes();
    }, []);
  
    const getQrCodes = async () => {
      setLoading(true);
      const myCourses = await HttpService.getWithToken<any>(
        `/api/v1/getMyCourses`,
        `${(user as User)?.accessToken}`,
       
      );
  
      if (myCourses?.data) {
        setCourses(myCourses?.data);
        setLoading(false);
      } else {
        setCourses([]);
        setLoading(false);
      }
  
      console.log("QrCodes", myCourses);
    };

    return {
        loading,
        courseQrCode
    }
}

export default useGetMyCourses;