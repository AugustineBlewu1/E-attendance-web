import { Link } from "react-router-dom";
import Typewriter from "typewriter-effect";
import Logo from "../assets/ucclogo1.png";

function LandingPage() {

  // buttons containing links to either the administrator, student or lecturer's login
const landingButton = [
  {name:"Administrator",href:"/adminLogin"},
  {name:"Lecturer",href:"/lecturerLogin"},
  {name:"Student",href:"/studentLogin"},

]
  return (
    <div className="h-screen flex justify-center md:items-center">
      <div
        className="mx-auto w-[90%]   h-auto  rounded bg-grey-bg shadow-sm
    md:w-[95%] md:flex md:justify-between md:items-center  md:px-[3%] md:py-[4rem]  lg:shadow-md
    lg:w-[70%]  lg:rounded-xl lg:px-[4%] lg:py-[1rem]"
      >
        <div>
          <figure>
            <img
              className="w-[20%]  py-[2rem] mx-auto md:py-[0.5rem] md:w-[50%] lg:max-w-[80%]"
              src={Logo}
              alt="ucc Logo"
            />
          </figure>
          <h4 className="text-center">
            School of Pharmacy and Pharmaceutical Sciences <br /> Electronic
            Attendance{" "}
          </h4>
        </div>
        <div className="md:bg-white md:w-[50%] md:h-[100%] text-center">
          <h2
            style={{ color: "red" }}
            className="my-7 animate-bounce text-decoration-wavy"
          >
            Who are you?
          </h2>

          <div className="typewriter">
            <Typewriter
              onInit={(typewriter) => {
                typewriter
                  .typeString(" An Administrator of SoPPS")
                  .pauseFor(1000)
                  .deleteAll()
                  .typeString(" A Lecturer of SoPPS")
                  .pauseFor(1000)
                  .deleteAll()
                  .typeString(" A Student of SoPPS")
                  .pauseFor(1000)
                  .deleteAll()
                  .typeString("You are Welcome to E-Attendance")
                  .start();
              }}
            />
          </div>
          <div className="flex flex-col space-y-6 mt-8 md:mt-0">
                {
                       landingButton.map((item)=>{
                        return(
                          <Link to={item.href} key={item.name}>
                      <button className=" md:my-5 border-[3px] border-solid border-primary bg-white text-bold outline-none w-[70%] h-[2rem] hover:text-white hover:bg-primary rounded active:border-blue ">
                        {item.name}
                      </button>
                      
                    </Link>
          
                        )
                      })

                }
        
          
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;