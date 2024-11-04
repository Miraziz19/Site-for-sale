import React, { useContext, useEffect, useState } from 'react';
import per from "../assets/img/person.png";
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { Context } from '../utils/context';

export default function Info() {
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState(null);
    const [showBottomSheet, setShowBottomSheet] = useState(false);

    const { setPage } = useContext(Context);

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

    const navigate = useNavigate();
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

    const handleButtonClick = () => {
        setShowBottomSheet(!showBottomSheet);
    };

    return (
        <>
            <Navbar />
            <header className="container  m-auto w-full px-5">
                <img src={per} alt="Person" />
                <h1 className="text-[#FA6C1C] mt-4 text-2xl font-extrabold leading-9 tracking-tight">
                    ZAMONAVIY KASBLAR MUDDATLI TO‘LOV ASOSIDA
                </h1>
                {error && <p className="text-red-500">{error}</p>}
                <ul className="flex flex-col  ml-[15%] mt-4">
                    {courses.map((course) => (
                        <li  className="bb text-base font-medium mb-2 capitalize text-[#01101C]" key={course.id}>
                            {course.name}
                        </li>
                    ))}
                </ul>
                <button
                    onClick={handleButtonClick}
                    className="bg-[#FA6C1C] mt-5 text-white text-lg uppercase font-bold rounded-full py-4 w-full block">
                    To’liqroq ma’lumot olish
                </button>

                {/* Overlay with blur effect */}
                {showBottomSheet && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md z-40"
                        onClick={handleButtonClick}
                    />
                )}

                {/* Bottom Sheet */}
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
                                onClick={handleButtonClick}
                                className="text-[red] font-bold mt-4 hover:underline">
                                Yopish
                            </button>
                        </>
                    )}
                </div>
            </header>
        </>
    );
}

