import { ChevronRightIcon } from "@heroicons/react/24/outline";
import useReports from "../../services/hooks/useReports";
import Loader from "../Loader";
import LineChart from "./LineChart";

export default function AdminDashboard() {
  const reports = useReports();

console.log(reports.reports?.attendanceByDay)

  return (
    <div>
      {reports?.loading ? (
        <>
          <Loader />
        </>
      ) : (
        <div>
          {/* <h3 className="text-base font-semibold leading-6 text-gray-900">
            Last 30 days
          </h3> */}
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
          <div className="flex flex-row">
          <LineChart data={reports?.reports?.attendanceByDay ?? []}/>
            <div className="w-full">
              <div className="font-bold pt-8 pl-6">Courses with their scans</div>
            <ul role="list" className="divide-y divide-white/5">
              {reports?.reports?.attendance.map((data, index) => (
                <li key={index} className="relative flex items-center px-4 py-4 gap-x-3 shadow-sm rounded-md hover:bg-slate-200 cursor-pointer">
                  <div className="w-full flex-auto">
                    <div className="flex items-center gap-x-3">
                      <div className='flex-none rounded-full p-1'>
                        <div className="h-2 w-2 rounded-full bg-current" />
                      </div>
                      <h2 className="w-full text-sm font-semibold leading-6">
                        <div  className="flex gap-x-2 flex-col">
                          <span className="whitespace-nowrap">{data?.course_name}</span>
                          <span className="whitespace-nowrap font-bold">Total Scans  -  {data?.total_scans}</span>
                        </div>
                      </h2>
                    </div>
                   
                  </div>
                  
                  <ChevronRightIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                </li>
              ))}
            </ul>
            
            </div> 
          </div>
        </div>
      )}
    </div>
  );
}
