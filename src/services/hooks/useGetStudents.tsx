import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import HttpService from "../HttpService";
import { User, UserStudent } from "../User";
import { selectCurrentAdmin, } from "../adminReducer";

const useGetStudents = () => {
    const [lecturers, setStudents] = useState<UserStudent[]>([]);
    const user = useSelector(selectCurrentAdmin);
  
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
        getStudents();
    }, []);
  
    const getStudents = async () => {
      setLoading(true);
      const students = await HttpService.getWithToken<any>(
        `/api/v1/users/students`,
        `${(user as User)?.accessToken}`,
       
      );

      console.log(students)
      if (students) {
        setStudents(students?.users);
        setLoading(false);
      } else {
        students([]);
        setLoading(false);
      }
  
      console.log("QrCodes", students);
    };

    return {
        loading,
        lecturers
    }
}

export default useGetStudents;