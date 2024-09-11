import { useEffect, useState } from "react";
import HttpService from "../HttpService";
import { Semesters, User } from "../User";
import { useSelector } from "react-redux";
import { selectCurrentAdmin } from "../adminReducer";

const useGetSemesters = () => {
  const [semesters, setSemesters] = useState<Semesters[]>([]);
  const user = useSelector(selectCurrentAdmin);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getSemesters();
  }, []);
  const getSemesters = async () => {
    setLoading(true);
    const semesterData = await HttpService.getWithToken<any>(
      `/api/v1/semesters`,
      `${(user as User)?.accessToken}`
    );

    console.log(semesters);

    if (semesters) {
      setSemesters(semesterData?.data);
      setLoading(false);
    } else {
      setSemesters([]);
      setLoading(false);
    }

    console.log("QrCodes", semesterData);
  };

  return {
    loading,
    semesters,
  };
};

export default useGetSemesters;
