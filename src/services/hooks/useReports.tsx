import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import HttpService from "../HttpService";
import { Reports, User } from "../User";
import { selectCurrentAdmin } from "../adminReducer";

const useReports = () => {
    const [reports, setReports] = useState<Reports | null>(null);
    const user = useSelector(selectCurrentAdmin);
  
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
        getLecturers();
    }, []);
  
    const getLecturers = async () => {
      setLoading(true);
      const reportsSearch = await HttpService.getWithToken<any>(
        `/api/v1/reports`,
        `${(user as User)?.accessToken}`,
       
      );

      console.log(reportsSearch)

  
      if (reportsSearch) {
        setReports(reportsSearch);
        setLoading(false);
      } else {
        setReports(null);
        setLoading(false);
      }
  
      console.log("QrCodes", reportsSearch);
    };

    return {
        loading,
        reports
    }
}

export default useReports;