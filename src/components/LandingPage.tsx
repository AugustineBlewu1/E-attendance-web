
import { Link } from 'react-router-dom';
import Typewriter from 'typewriter-effect';
import Logo from '../assets/ucclogo1.png';


function LandingPage() {
  return (
    <div className='h-screen flex justify-center items-center'>
      <div className='mx-auto w-[90%]   h-auto  rounded bg-grey-bg shadow-sm
    md:w-[95%] md:flex md:justify-between md:items-center  md:px-[3%] md:py-[4rem]  lg:shadow-md
    lg:w-[70%]  lg:rounded-xl lg:px-[4%] lg:py-[1rem]'>
      <div>
      <figure>
        <img   className='max-w-[40%] py-[2rem] mx-auto md:py-[0.5rem] md:max-w-[60%] lg:max-w-[80%]' src={Logo} alt="ucc Logo" />
      </figure>
      <h4 className='text-center' >School of Pharmacy and Pharmaceutical Sciences <br /> Electronic Attendance </h4>
      </div>
      <div className="md:bg-white md:w-[50%] md:h-[100%] text-center">
      <h2 style={{color:"red"} } className='my-7 animate-bounce text-decoration-wavy'>Who are you?</h2>

<div className="typewriter">
<Typewriter 
  onInit={(typewriter) => {
    typewriter
      .typeString(' An Administrator of SoPPS')
      .pauseFor(1000)
      .deleteAll()
      .typeString(' A Lecturer of SoPPS')
      .pauseFor(1000)
      .deleteAll()
      .typeString(' A Student of SoPPS')
      .pauseFor(1000)
      .deleteAll()
      .typeString('You are Welcome to E-Attendance')
      .start();
  }}
/>
</div>

<Link to="/adminLogin" >
  <button className='my-10 md:my-8 border-[3px] border-solid border-primary bg-white text-bold outline-none w-[70%] h-[2rem] hover:text-white hover:bg-primary rounded active:border-black '>Administrator</button><br />
</Link>

<Link to="/lecturerLogin" >
  <button className='mb-10 md:mb-8 border-[3px] border-solid border-primary bg-white text-bold outline-none w-[70%] h-[2rem] hover:text-white hover:bg-primary rounded active:border-black '>Lecturer</button><br />
</Link>

<Link to="/studentLogin" >
  <button className='mb-10 md:mb-8 border-[3px] border-solid border-primary bg-white text-bold outline-none w-[70%] h-[2rem] hover:text-white hover:bg-primary rounded active:border-black '>Student</button><br />
</Link>
      </div>
    </div>
    </div>
  );
}

export default LandingPage;
