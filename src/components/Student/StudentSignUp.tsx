import React, { useState } from 'react';
import '../../style/signup.css';
import { SignUP } from './signUp';

export default function StudentSignUp() {
  const [message, setMessage] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [rePassword, setRePassword] = useState<string>('');
  

  // Select level
  const level: number[] = [100, 200, 300, 400, 500, 600];

  const [formData, setFormData] = useState<SignUP>({
    name: '',
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === rePassword) {
      console.log('Form submitted:', formData, 'Password:', password);
      setMessage(false);
  
      setFormData({
        name: '',
        id: '',
        level: '100', 
        department: '',
        contact: '',
        email: '',
        password: '',
      });
    } else {
      setMessage(!message);
    }
  };
  

  return (
    <div className="signup-container">
      <h2>Student Sign Up</h2>
      <form onSubmit={handleSubmit} className='s-form'>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className='indexNumber' required />

        <label htmlFor="id">Index Number:</label>
        <input type="text" id="id" name="id" value={formData.id} onChange={handleChange} required  className='indexNumber'/>

        <label htmlFor="level">Level</label>
        <select name="level" value={formData.level} onChange={handleChange} className='dropDown'>
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
          className='indexNumber'
          required
        />

        <label htmlFor="contact">Contact:</label>
        <input
          type="text"
          id="contact"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          className='indexNumber'
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className='indexNumber'
          required
        />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} className='password' />

        <label htmlFor="Re-typepassword">Re-type Password</label>
        <input type="password" id="Re-typepassword" onChange={(e) => setRePassword(e.target.value)} className='password' />
        {message && <p>Passwords do not match</p>}

        <button type="submit" className='signIn'>Save</button>
      </form>
    </div>
  );
}
