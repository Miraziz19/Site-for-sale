import React from 'react'

export default function Scrol() {
    return (
        <div className='w-[35px] flex-col flex justify-between items-center p-[2px] h-[365px] relative  rounded-[25px] border-[3px] border-[#FA6C1C]'>
            <div className='w-[25px] h-[25px] rounded-full border-[2px] border-[black]'></div>
            <div className='w-[25px] mt-[40px] h-[25px] rounded-full border-[2px] border-[black]'></div>
            <div className='w-[25px] h-[32%] absolute bottom-[30px] bg-[#FA6C1C26] rounded-full border-[2px] border-[#FA6C1C26]'></div>
            <div className='w-[25px] h-[25px] bg-[#FA6C1C] rounded-full border-[2px] border-[#FA6C1C]'></div>
        </div>
    )
}
