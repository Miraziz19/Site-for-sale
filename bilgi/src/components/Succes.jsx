import React from 'react'
import "./suc.css"
import { Link } from 'react-router-dom'
export default function Succes() {

    return (
        <div className="body">

            <div className="card">
                <div className="rounded-[200px] h-[200px] w-[200px] bg-[#F8FAF5] mx-auto">
                    <i className="checkmark">✓</i>
                </div>
                {/* <h1>Success</h1> */}
                <h1>Raxmat</h1>
                <p>Siz bilan tez orada operatorlar<br />aloqaga chiqadi</p>
                <Link to={"https://t.me/tramplin_uz"} className='bntc'>Telegram Kanaliga O'ting</Link>
            </div>
        </div>
    )
}
