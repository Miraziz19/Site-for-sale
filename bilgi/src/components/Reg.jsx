import React, { useContext, useEffect, useState } from 'react';
import Navbar from './Navbar';
import { Context } from '../utils/context';
import { useNavigate } from 'react-router-dom';

export default function Reg() {
  const [courses, setCourses] = useState([]);
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState(null);

  const { reg } = useContext(Context);
  const course = reg;
  console.log(course);
  const navigate = useNavigate()


  // Check if the reg (course ID) is correctly received from Context
  console.log('Selected course ID:', course);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://free.tramplin.uz/course/');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        console.log('Fetched courses:', data); // Debug: Check courses data
        setCourses(data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Log the data being sent
    console.log('Sending data:', { username, phone, course });

    try {
      const response = await fetch('https://back.tramplin.uz/registrant/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, phone, course }),
      });

      // Check if the response is okay, otherwise log the status and response
      if (!response.ok) {
        const responseText = await response.text();
        console.error('API response:', response.status, responseText);
        throw new Error('Failed to submit application');
      }

      navigate("/success")
      setUsername('');
      setPhone('');

    } catch (error) {
      console.error('Submission error:', error);
      setError(error.message || 'An unexpected error occurred.');
    }
  };

  return (
    <>
      <Navbar />
      <div>
        {courses.length === 0 && !error && <p>Loading courses...</p>}
        {courses.length > 0 &&
          courses.map((course) => {
            if (course.id == reg) {
              return (
                <div key={course.id}>
                  <h2 className='m-auto px-[20px] uppercase text-[24px] mt-[25px] font-[700] leading-[30px] text-[#FA6C1C]'>
                    {course.name} kursi uchun Ariza topshirish
                  </h2>
                  <form onSubmit={handleSubmit} className='m-auto w-[330px] mt-[25px]'>
                    <input
                      className='border-b-[2px] tracking-[1.3px] text-[16px] outline-none border-b-[#132839] font-[400] leading-[19.09px] py-[15px] mt-[20px] text-[#314E66] w-full'
                      type="text"
                      placeholder='Ism Familiya'
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                    <input
                      className='border-b-[2px] tracking-[1.3px] text-[16px] outline-none border-b-[#132839] font-[400] leading-[19.09px] py-[15px]  text-[#314E66] w-full'
                      type="tel"
                      placeholder='Telefon raqam'
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                    <button type="submit" className='block w-full py-[15px] bg-[#FA6C1C] text-white rounded-[50px] text-[16px] font-[700] leading-[22.4px] tracking-[1px] mt-[25px]'>
                      ARIZA TOPSHIRISH
                    </button>
                  </form>
                  {error && <div className="error">{error}</div>}
                </div>
              );
            }
            return null;
          })}
        {!courses.some((course) => course.id == reg) && <p>No matching course found for the selected ID.</p>}
      </div>
    </>
  );
}

