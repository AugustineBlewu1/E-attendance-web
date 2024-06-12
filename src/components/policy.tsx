import { useToast } from "@chakra-ui/react";
import SoPPSlogo from "../assets/ucclogo.png"


export default function Policy() {

    const toast = useToast();
  return (
    <div className="text-center p-3" >

         <h1 className=" font-bold text-[2.5rem] mt-[4rem">Electronic Attendance Policy</h1>
         <figure className="text-center w-[15%] sm:w-[8%] h-auto mr-auto ml-auto">
            <img src={SoPPSlogo} className="w-[100]" />

         </figure>
         <button  className=" mt-[5rem]  w-[8rem] sm:w-[20%] h-[3rem] text-[1.5rem]  bg-primary text-white "
         onClick={() => 
                toast({
                  title: "policy",
                  description: "Policy is being reviewed",
                  status: "info",
                  duration: 5000,
                  isClosable: true,
                  position: "top-right",
                })}  > view  </button>
      
    </div>
  )
}
