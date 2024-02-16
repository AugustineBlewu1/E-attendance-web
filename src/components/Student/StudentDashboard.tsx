import { useState } from "react";
import "../../style/Dashboard.css";

const StudentDashboard = () => {
  const [selectedItem, setSelectedItem] = useState<null | string>(null);
  const [profile, setProfile] = useState<boolean>(false);

  const handleItemClick = (itemName: string | null) => {
    setSelectedItem(itemName);
  };

  return (
    <div>
      <div className="flex flex-row bg-slate-200">
      
      </div>
    </div>
  );
};

export default StudentDashboard;
