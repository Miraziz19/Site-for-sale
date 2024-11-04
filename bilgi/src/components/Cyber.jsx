import React, { useContext, useEffect, useState } from 'react';
import Navbar from './Navbar';
import { Context } from '../utils/context';
import { useNavigate } from 'react-router-dom';
import Scrol from './Scrol';

export default function Cyber() {


    const [showPopup, setShowPopup] = useState(false);
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState(null);
    const [showBottomSheet, setShowBottomSheet] = useState(false);
    const { page, setPage,setReg ,reg } = useContext(Context);
    const navigate = useNavigate()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://free.tramplin.uz/course/');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setCourses(data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchData();
    }, []);
    const handleButtonClick = () => {
        setShowPopup(!showPopup);
    };
    const handleNext = (e) => {
        setReg(e)
        if (e == 1) {
            navigate("/cyber/regis")
            console.log(reg);

        }


    }
    const handlePage = (e) => {
        setPage(e);
        if (e === 2) {
            navigate("/front");
        } else if (e === 3) {
            navigate("/back");
        } else if (e === 1) {
            navigate("/cyber");
        } else if (e === 4) {
            navigate("/graphic")
        }
    };
    const handleButtonClicks = () => {
        setShowBottomSheet(!showBottomSheet);
    };

    return (
        <>
            <Navbar />
            <main className='container px-[20px]'>
                <h1 className='text-[40px] mt-[20px] text-[#FA6C1C] font-[800] leading-[45px] tracking-[-1%]'>
                    KIBER XAVFSIZLIK
                </h1>
                <ul>
                    {courses.map((course) => {
                        if (course.id === page) {
                            return (<>
                                <div className='flex justify-between flex-wrap' key={course.id}>
                                    <div className='w-[150px] mt-[30px]'>
                                        <h3 className='text-[16px]  font-[400] leading-[16.7px] text-[#01101C]'>Kurs davomiyligi</h3>
                                        <h4 className='text-[#FA6C1C] text-[32px] font-[700] leading-[35.28px]'>{course.course_period_in_month} <span className='text-[18px]'>oy</span></h4>
                                    </div>
                                    <div className='w-[120px] mt-[30px]'>
                                        <h3 className='text-[16px]  font-[400] leading-[16.7px] text-[#01101C]'>Haftada</h3>
                                        <h4 className='text-[#FA6C1C] text-[32px] font-[700] leading-[35.28px]'>3 <span className='text-[18px]'>marta</span></h4>
                                    </div>
                                    <div className='w-[120px] mt-[30px]'>
                                        <h3 className='text-[16px]  font-[400] leading-[16.7px] text-[#01101C]'>Amaliy loyihalar</h3>
                                        <h4 className='text-[#FA6C1C] text-[32px] font-[700] leading-[35.28px]'>{course.total_projects_by_students}<span className='text-[18px]'>+</span></h4>
                                    </div>
                                    <div className='w-[120px] mt-[30px]'>
                                        <h3 className='text-[16px]  font-[400] leading-[16.7px] text-[#01101C]'>Darslar soni</h3>
                                        <h4 className='text-[#FA6C1C] text-[32px] font-[700] leading-[35.28px]'>{course.total_lessons} <span className='text-[18px]'>ta</span></h4>
                                    </div>
                                </div>
                                <div className='w-full bg-[#F7F7F7] rounded-[15px] p-[15px]'>
                                    <h2 className='text-[32px] font-[700] leading-[32px] tracking-[1.5px]'>
                                        {Number(course.price).toLocaleString('uz-UZ')} <span>UZS</span>
                                    </h2>
                                    <h4 className='text-[#01101C99] mt-[10px] text-[14px] font-[400] tracking-[-1%] leading-[16.7px]'>1 oylik kurs narxi</h4>
                                </div>
                                <button onClick={handleButtonClick} className='text-[16px] mt-[50px] font-[700] lending-[22.4px] bg-[#FA6C1C] text-white rounded-[50px] py-[20px] text-center w-full uppercase tracking-[1px]'>Bo’lib to’lash haqida</button>
                                <button onClick={handleButtonClicks} className='text-[16px] font-[700] lending-[22.4px] bg-[#fa6d1c2d] text-[#FA6C1C] mt-[10px] rounded-[50px] py-[20px] text-center w-full uppercase tracking-[1px]'>BOSHQA KURSDA O’QIMOQCHIMAN</button>
                                {showBottomSheet && (
                                    <div
                                        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md z-40"
                                        onClick={handleButtonClick}
                                    />
                                )}
                                <div
                                    className={`fixed inset-x-0 bottom-0 bg-white rounded-t-lg p-6 text-center z-50 max-h-[50vh] overflow-y-auto transition-transform transform ${showBottomSheet ? 'translate-y-0' : 'translate-y-full'
                                        }`}
                                    style={{ transitionDuration: '0.9s' }}>
                                    {showBottomSheet && (
                                        <>
                                            <h2 className="text-[#FA6C1C] text-xl font-bold mb-2">QAYSI KURSDA O‘QIMOQCHISIZ?</h2>
                                            <p className="text-gray-500 mb-4">Iltimos qaysi kursda o‘qimoqchiligingizni tanlang</p>
                                            <ul>
                                                {courses.map((course) => (
                                                    <li
                                                        onClick={() => handlePage(course.id)}
                                                        className="bg-[#FFE6D8] mt-2 text-[#FA6C1C] py-3 rounded-full font-medium cursor-pointer hover:bg-[#FA6C1C] hover:text-white"
                                                        key={course.id}>
                                                        {course.name}
                                                    </li>
                                                ))}
                                            </ul>
                                            <button
                                                onClick={handleButtonClicks}
                                                className="text-[red] font-bold mt-4 hover:underline">
                                                Yopish
                                            </button>
                                        </>
                                    )}
                                </div>
                            </>
                            );
                        }
                        return null; // Return null if the condition is not met
                    })}
                </ul>

                {showPopup && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white rounded-lg p-6 max-w-sm w-full text-center relative slide-up max-h-[100vh] overflow-y-auto">
                        
                            <ul className="space-y-3">
                                {courses.map((course) => (
                                    course.id == page && <div key={course.id}>
                                        <h2 className='text-[32px] text-[#FA6C1C] font-[800] leading-[40px] tracking-[-1%]'>BO‘LIB TO‘LASH QANAQA ISHLAYDI?</h2>
                                        <div className='flex mt-[15px]'>
                                            <Scrol />
                                            <div className='flex  flex-col justify-between text-start ml-[10px] py-[5px]'>
                                                <h3 className='text-[14px] font-[700] leading-[20.50px]'>1-oy <span className='text-[#000000B2] text-[14px] font-[400] ml-[4px]'>Dars boshlandi</span></h3>
                                                <p className='text-[#FA6C1C] text-[14px] font-[400] w-[71px]'>
                                                    Bu
                                                    oralig’da
                                                    pul
                                                    to’lamaysiz</p>
                                                <h3 className='text-[14px] font-[700] leading-[20.50px]'>8-oy <span className='text-[#000000B2] text-[14px] font-[400] ml-[4px]'>Dars tugadi</span></h3>
                                                <p className='text-[#FA6C1C] text-[14px] font-[400] '>2 oy
                                                    qo’shimcha
                                                    muddat, bu paytda ham pul to’lamaysiz</p>
                                                <h3 className='text-[14px] font-[700] text-[#FA6C1C] leading-[20.50px]'>10-oydan keyin <span className='text-[#FA6C1C] text-[14px] font-[400] ml-[4px]'>Pul to’lashni boshlaysiz</span></h3>
                                            </div>
                                        </div>
                                        <div className='mt-[25px]'>
                                            <div className='flex mt-[7px]'>
                                                <h2 className='bg-[#F7F7F7] w-[50px] text-[18px] font-[700] lending-[32px] py-[15px] px-[18px] rounded-[15px]'>6 <span className='block text-[12px] font-[400] lending-[14.32px] text-[#01101C]'>oy</span></h2>
                                                <div className='text-start w-full bg-[#F7F7F7] rounded-[15px] p-[8px] ml-[5px]'>
                                                    <h2 className='text-[12px] flex justify-between font-[400] leading-[14.32px] tracking-[-1%] text-[#01101C99] items-center'>Umumiy kurs narxi: <span className='text-[16px] leading-[28px] font-[400] text-[#01101C]'>15 480 000 UZS</span></h2>
                                                    <hr className='mt-[7px]' />
                                                    <h2 className='text-[12px]  flex justify-between font-[400] leading-[14.32px] tracking-[-1%] text-[#01101C99] items-center'>Oyiga: <span className='text-[16px] leading-[28px] font-[800] text-[#01101C]'>2 580 000 UZS</span></h2>
                                                </div>
                                            </div>
                                            <div className='flex mt-[7px]'>
                                                <h2 className='bg-[#F7F7F7] w-[50px] text-[18px] font-[700] lending-[32px] py-[15px] px-[18px] rounded-[15px]'>12 <span className='block text-[12px] font-[400] lending-[14.32px] text-[#01101C]'>oy</span></h2>
                                                <div className='text-start w-full bg-[#F7F7F7] rounded-[15px] p-[8px] ml-[5px]'>
                                                    <h2 className='text-[12px] flex justify-between font-[400] leading-[14.32px] tracking-[-1%] text-[#01101C99] items-center'>Umumiy kurs narxi: <span className='text-[16px] leading-[28px] font-[400] text-[#01101C]'>16 560 000 UZS</span></h2>
                                                    <hr className='mt-[7px]' />
                                                    <h2 className='text-[12px]  flex justify-between font-[400] leading-[14.32px] tracking-[-1%] text-[#01101C99] items-center'>Oyiga: <span className='text-[16px] leading-[28px] font-[800] text-[#01101C]'>1 380 000 UZS</span></h2>
                                                </div>
                                            </div>
                                            <div className='flex mt-[7px]'>
                                                <h2 className='bg-[#F7F7F7] w-[50px] text-[18px] font-[700] lending-[32px] py-[15px] px-[18px] rounded-[15px]'>18 <span className='block text-[12px] font-[400] lending-[14.32px] text-[#01101C]'>oy</span></h2>
                                                <div className='text-start w-full bg-[#F7F7F7] rounded-[15px] p-[8px] ml-[5px]'>
                                                    <h2 className='text-[12px] flex justify-between font-[400] leading-[14.32px] tracking-[-1%] text-[#01101C99] items-center'>Umumiy kurs narxi: <span className='text-[16px] leading-[28px] font-[400] text-[#01101C]'>17 240 000 UZS</span></h2>
                                                    <hr className='mt-[7px]' />
                                                    <h2 className='text-[12px]  flex justify-between font-[400] leading-[14.32px] tracking-[-1%] text-[#01101C99] items-center'>Oyiga: <span className='text-[16px] leading-[28px] font-[800] text-[#01101C]'>958 000 UZS</span></h2>
                                                </div>
                                            </div>
                                            <div className='text-start'>
                                                <h3 className='text-[14px] font-[700] leading-[20.58px] mt-[20px]'>Ariza topshirishni 2 ta sharti bor:</h3>
                                                <p className='text-[14px] leading-[16.7px] text-[#01101C] font-[500] mt-[10px]'>
                                                    1. Ariza topshiruvchi 16-35 yosh oralig’ida bo’lishi kerak <br />
                                                    <br />
                                                    2. Kafil bo’lishi kerak (Kafil bu davlat nodavlat tashkilotida ishlaydigan va oxirgi 6 oy oylik olgan bo’lishi kerak. MIB dan qarzi bo’lmasa bo’ldi)
                                                </p>
                                            </div>
                                            <button onClick={(e) => handleNext(course.id)} className='w-full py-[15px] bg-[#FA6C1C] text-white rounded-[50px] text-[16px] font-[700] leading-[22.4px] tracking-[1px] mt-[25px]'>ARIZA TOPSHIRISH</button>
                                        </div>
                                    </div>

                                ))}
                            </ul>
                            <button
                                onClick={handleButtonClick}
                                className="text-[red] font-bold mt-4 hover:underline">
                                Yopish
                            </button>
                        </div>
                    </div >
                )}
                {error && <div className="error">{error}</div>} {/* Display error message if any */}
            </main>
        </>
    );
}