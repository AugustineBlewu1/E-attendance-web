// import { useState } from "react";




import { useSelector } from "react-redux";
import {  selectCurrentUser } from "../../services/userReducer";
import useLecturerReports from "../../services/hooks/useLectuerReports";
import Loader from "../Loader";

export default function LecturerDashboard() {
  const reports = useLecturerReports();

  //const [lecturerData, setLecturerData] = useState({});
  // const [selectedItem, setSelectedItem] = useState<null | string>(null);
  // const [profile, setProfile] = useState<boolean>(false);
  const user  = useSelector(selectCurrentUser);


  console.log('User',user)

  // const handleItemClick = (itemName: null | string): void => {
  //   setSelectedItem(itemName);
  // };

  return (
    <div className=" ">
   {
    reports?.loading ? <Loader /> : (
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
      <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
        <dt className="truncate text-sm font-medium text-gray-500">
          Total Number of Scans
        </dt>
        <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
          {reports?.reports?.attendance?.reduce(
            (a, b) => a + b.total_scans,
            0
          )}
        </dd>
      </div>
      <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
        <dt className="truncate text-sm font-medium text-gray-500">
          Course with highest number of scans / attendance
        </dt>
        <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900 flex justify-between">
          {
            reports?.reports?.attendance.reduce((max, course) => {
              return course.total_scans > max.total_scans ? course : max;
            }, reports.reports?.attendance[0])?.course_name
          }
          <dd className="font-light">
            {
              reports?.reports?.attendance.reduce((max, course) => {
                return course.total_scans > max.total_scans
                  ? course
                  : max;
              }, reports.reports?.attendance[0])?.total_scans
            }
          </dd>
        </dd>
      </div>
      <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
        <dt className="truncate text-sm font-medium text-gray-500">
          Total Number of created QrCodes
        </dt>
        <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
          {reports?.reports?.attendance?.reduce(
            (a, b) => a + b?.total_qr_codes_created,
            0
          )}
        </dd>
      </div>
    </dl>
    )
   }
    </div>
  );
}
