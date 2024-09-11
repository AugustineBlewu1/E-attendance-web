import { useSelector } from "react-redux";
import { selectCurrentAdmin } from "../../services/adminReducer";
import { useDisclosure, useToast } from "@chakra-ui/react";
import { useState } from "react";
import useGetSemesters from "../../services/hooks/useGetSemesters";
import NewCustomTable from "../UI/CustomTable";
import { columnsSemester } from "../../services/helpers/columns_semester";
import { SubmitHandler, useForm } from "react-hook-form";
import { Semester } from "../../services/types";
import HttpService from "../../services/HttpService";
import CustomModal from "../UI/CustomModal";
import { User } from "../../services/User";

const SemesterPage = () => {
  const user = useSelector(selectCurrentAdmin);
  const toast = useToast();

  const [loading, setLoading] = useState(false);
  const semesters = useGetSemesters();

  console.log(semesters);

  //create a new semester
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: false });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Semester>({
    defaultValues: {},
  });

  const onSubmit: SubmitHandler<Semester> = async (data) => {
    console.log(data);
    setLoading(true);
    try {
      const saveSemester = await HttpService.postWithToken<any>(
        "/api/v1/semesters",
        `${(user as User)?.accessToken}`,
        {
          academic_year: data?.academic_year,
          start_date: data?.start_date,
          end_date: data?.end_date,
          is_current: data?.is_current === "yes" ? true : false,
        }
      );
      console.log(saveSemester);
      if (saveSemester.hasOwnProperty("error")) {
        toast({
          title: "Error",
          description: (saveSemester as any).data?.message,
          status: "error",
          duration: 7000,
          isClosable: true,
          position: "top-right",
        });
        setLoading(false);
      } else {
        toast({
          title: "Semester Created Successfully",
          description: (saveSemester as any).data?.message,
          status: "success",
          duration: 7000,
          isClosable: true,
          position: "top-right",
        });

        reset();
        onClose();
        setLoading(false);
        window.location.reload();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error as any,
        status: "error",
        duration: 7000,
        isClosable: true,
        position: "top-right",
      });
      setLoading(false);
    }
  };

  return (
    <>
      <CustomModal
        headerText="Provide New Semester Details"
        footerText="Save"
        isOpen={isOpen}
        loading={loading}
        onClose={onClose}
        onSubmit={handleSubmit(onSubmit)}
        children={
          <div>

            <form action="">
              <div>
                <span className="pt-5">Academic Year</span>

                <select
                  className="border border-primary rounded mt-2 mb-2 h-11 pl-2 text-sm text-left w-full"
                  {...register("academic_year", {
                    required: "Academic year is required",
                  })}
                >
                  <option
                    selected
                    disabled
                    value="--select your academic year --"
                  >
                    --select your academic year --
                  </option>
                  <option value="2023/2024">2023/2024</option>
                  <option value="2024/2025">2024/2025</option>
                  <option value="2025/2026">2025/2026</option>
                  <option value="2026/2027">2026/2027</option>
                </select>
                {errors.academic_year && (
                  <span className="text-left text-rose-500 font-normal text-xs">
                    {errors?.academic_year?.message}
                  </span>
                )}
              </div>

              <div>
                <span className="pt-5">Start Date</span>
                <input
                  className="border border-primary rounded mt-2 mb-2 py-2 text-sm text-left pl-2 w-full"
                  type="date"
                  placeholder="Semester Start Date"
                  {...register("start_date", {
                    required: "Start Date is required",
                  })}
                />
                {errors?.start_date && (
                  <span className="text-left text-rose-500 font-normal text-xs">
                    {errors?.start_date?.message}
                  </span>
                )}
              </div>
              <div>
                <span className="pt-5">End Date</span>
                <input
                  className="border border-primary rounded mt-2 mb-2 py-2 text-sm text-left pl-2 w-full"
                  type="date"
                  placeholder="Semester End Date"
                  {...register("end_date", {
                    required: "End Date is required",
                  })}
                />
                {errors?.end_date && (
                  <span className="text-left text-rose-500 font-normal text-xs">
                    {errors?.end_date?.message}
                  </span>
                )}
              </div>
              <div>
                <span className="pt-5">Is Current?</span>

                <select
                  className="border border-primary rounded mt-2 mb-2 h-11 pl-2 text-sm text-left w-full"
                  {...register("is_current", {
                    required: "Is Current Status is required",
                  })}
                >
                  <option selected disabled value="--select your state --">
                    --select your state --
                  </option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
                {errors.is_current && (
                  <span className="text-left text-rose-500 font-normal text-xs">
                    {errors?.is_current?.message}
                  </span>
                )}
              </div>
            </form>
          </div>
        }
      />
      <div className="flex flex-row justify-end">
        <div
          className="py-2 px-2 rounded-lg  w-fit border-2 hover:cursor-pointer hover:bg-slate-100"
          onClick={onOpen}
        >
          Add Academic Semester
        </div>
      </div>
      <div>
        <div className="mt-5 md:ml-5">
          {
            <NewCustomTable
              columns={columnsSemester}
              data={semesters?.semesters}
            />
          }

          {/* <CustomTable columns={isMobile.isMobile ? mobileBuyColumns : columns} data={buyTransactionsSet} /> */}
        </div>
      </div>
    </>
  );
};

export default SemesterPage;
