import React, { useState } from 'react';
import '../../style/signup.css';
import { SignUP } from './signUp';
import HttpService from '../../services/HttpService';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const  StudentSignUp = ()  => {
  const [message, setMessage] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [rePassword, setRePassword] = useState<string>('');
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();


  // Select level
  const level: number[] = [100, 200, 300, 400, 500, 600];

  const [formData, setFormData] = useState<SignUP>({
    fname: '',
    lname: '',
    id: '',
    level: '100', 
    department: '',
    contact: '',
    email: '',
    password: '',
  });

  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password === rePassword) {
      console.log('Form submitted:', formData, 'Password:', password);
      setMessage(false);
      setLoading(true);

      // setFormData({
      //   name: '',
      //   id: '',
      //   level: '100', 
      //   department: '',
      //   contact: '',
      //   email: '',
      //   password: '',
      // });
      setLoading(true);

      try {
        const result = await HttpService.post<any>(
          "http://127.0.0.1/api/v1/auth/registerStudent",
          {
            first_name: formData.fname,
            last_name: formData.lname,
            email: formData.email,
            phone_number: formData.contact,
            level: formData.level,
            student_id: formData.id,
            password : password
        }
        );
        console.log(result);
        toast({
          title: "Error",
          description:result?.message,
          status: "success",
          duration: 7000,
          isClosable: true,
          position: "top-right",
        });
        navigate("/StudentLogin");
   
        
      } catch (error: any) {
        // console.log(error?.message);
        toast({
          title: "Error",
          description: error?.message,
          status: "error",
          duration: 7000,
          isClosable: true,
          position: "top-right",
        });
      } finally {
        setLoading(false);
      }
    } else {
      setMessage(!message);
    }
  };
  

  return (
    <div className="signup-container">
      <h2>Student Sign Up</h2>
      <form onSubmit={handleSubmit} className='flex flex-col'>
        <label htmlFor="fname">First Name:</label>
        <input type="text" id="fname" name="fname" value={formData.fname} onChange={handleChange} className='py-2 w-full focus:border-2 focus:border-[#646cff] focus:outline-none pl-2' required />
       
        <label htmlFor="lname">Last Name:</label>
        <input type="text" id="lname" name="lname" value={formData.lname} onChange={handleChange} className='py-2 w-full focus:border-2 focus:border-[#646cff] focus:outline-none pl-2' required />

        <label htmlFor="id">Index Number:</label>
        <input type="text" id="id" name="id" value={formData.id} onChange={handleChange} required  className='py-2 w-full focus:border-2 focus:border-[#646cff] focus:outline-none pl-2'/>

        <label htmlFor="level">Level</label>
        <select name="level" value={formData.level} onChange={handleChange} className='py-2 w-full focus:border-2 focus:border-[#646cff] focus:outline-none pl-2 h-12'>
          {level.map((slevel) => (
            <option value={slevel.toString()} key={slevel}>
              {slevel}
            </option>
          ))}
        </select>

        <label htmlFor="department">Department:</label>
        <input
          type="text"
          id="department"
          name="department"
          value={formData.department}
          onChange={handleChange}
          className='py-2 w-full focus:border-2 focus:border-[#646cff] focus:outline-none pl-2'
          required
        />

        <label htmlFor="contact">Contact:</label>
        <input
          type="text"
          id="contact"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          className='py-2 w-full focus:border-2 focus:border-[#646cff] focus:outline-none pl-2'
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className='py-2 w-full focus:border-2 focus:border-[#646cff] focus:outline-none pl-2'
          required
        />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} className='py-2 w-full focus:border-2 focus:border-[#646cff] focus:outline-none pl-2' />

        <label htmlFor="Re-typepassword">Re-type Password</label>
        <input type="password" id="Re-typepassword" onChange={(e) => setRePassword(e.target.value)} className='py-2 w-full focus:border-2 focus:border-[#646cff] focus:outline-none pl-2' />
        {message && <p>Passwords do not match</p>}

        <button type="submit" className=' bg-primary border-2 rounded-full py-2 mt-4 text-white hover:bg-[#0000ffa7] hover:border-none justify-center'>Save</button>
      </form>
    </div>
  );
}
export default StudentSignUp