import { useEffect, useState } from "react";
import HttpService from "../HttpService";
import {  User } from "../User";
import { Scans } from "../types";

type QueryParameters={
    course_id: string | number 
    user: User
}


const useScanReports  = (params: QueryParameters) => {
    const [reports, setReports] = useState<Scans[] | null>([]);
  
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
        getScans(params);
    }, [params]);
  
    const getScans = async (params: QueryParameters) => {
      setLoading(true);
      const reportsSearch = await HttpService.getWithToken<any>(
        `/api/v1/scans${params.course_id === 'all' ? '' : `?course_id=${params.course_id}`}`,
        `${(params.user as User)?.accessToken}`,
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

export default useScanReports;