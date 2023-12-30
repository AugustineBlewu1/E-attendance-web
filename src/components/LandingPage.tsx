
import { Link } from 'react-router-dom';
import Typewriter from 'typewriter-effect';
import Logo from '../assets/ucclogo1.png';
import "../style/LandingPage.css"

function LandingPage() {
  return (
    <div className='landingPage'>
      <div className="section-1">
      <figure>
        <img   className='ucclogo' src={Logo} alt="ucc Logo" />
      </figure>
      <h4 >School of Pharmacy and Pharmaceutical Sciences <br /> Electronic Attendance </h4>
      </div>
      <div className="section-2">
      <h2 style={{color:"red"} } className='header-3'>Who are you?</h2>

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

<Link to="/AdminLogin" className='link'>
  <button className='lecturer'>Administrator</button>
</Link>

<Link to="/LecturerLogin" className='link'>
  <button className='lecturer'>Lecturer</button>
</Link>

<Link to="/StudentLogin" className='link'>
  <button className='student'>Student</button>
</Link>
      </div>
    </div>
  );
}

export default LandingPage;
