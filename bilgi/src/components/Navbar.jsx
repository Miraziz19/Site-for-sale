import React from 'react'
import logo from "../assets/img/Logo.svg"
import { Link } from 'react-router-dom'
export default function Navbar() {
    return (
        <div className='py-[20px] flex border-b-[2px] justify-center '>
            <Link to={"/"}>
                <img src={logo} alt="" />
            </Link>
        </div>
    )
}
