// import { useState } from "react";
import "../../style/Dashboard.css";
import useMyQrCode from "../../services/hooks/useMyQrCodes";
import Loader from "../Loader";

const StudentDashboard = () => {
  // const [selectedItem, setSelectedItem] = useState<null | string>(null);
  // const [profile, setProfile] = useState<boolean>(false);

  // const handleItemClick = (itemName: string | null) => {
  //   setSelectedItem(itemName);
  // };

  const qrdata = useMyQrCode();

  return (
    <div>
      {qrdata?.loading ? (
        <Loader />
      ) : (
        <div className=" rounded-lg border-2 w-full h-[100px] md:w-[30%] md:h-[30%] py-4 px-4">
          <p className="font-bold text-lg">Total Scanned</p>
          <p className="font-medium text-2xl py-2">{qrdata?.myQrCodes?.length}</p>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
