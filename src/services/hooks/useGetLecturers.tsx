import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import HttpService from "../HttpService";
import { User } from "../User";
import { selectCurrentAdmin } from "../adminReducer";

const useGetLecturers = () => {
    const [lecturers, setLectureers] = useState<User[]>([]);
    const user = useSelector(selectCurrentAdmin);
  
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
        getLecturers();
    }, []);
  
    const getLecturers = async () => {
      setLoading(true);
      const lecturersSearch = await HttpService.getWithToken<any>(
        `/api/v1/users/lecturers`,
        `${(user as User)?.accessToken}`,
       
      );

      console.log(lecturersSearch)

  
      if (lecturersSearch) {
        setLectureers(lecturersSearch?.users);
        setLoading(false);
      } else {
        lecturersSearch([]);
        setLoading(false);
      }
  
      console.log("QrCodes", lecturersSearch);
    };

    return {
        loading,
        lecturers
    }
}

export default useGetLecturers;