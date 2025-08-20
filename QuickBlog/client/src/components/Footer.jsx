import React from 'react'
import { assets, footer_data } from '../assets/assets';

const Footer = () => {
  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-32 bg-primary/3'>
      <div className='flex flex-col  md:flex-row items-start justify-between gap-10
      py-10 border-b border-gray-500/30 test-gray-500 '>
       <div className=''>
        <img src={assets.logo} alt="logo" className='w-32 sm:w-44'/>
        <p className='max-w-[480px] mt-6'> Quickblog is perfect for both casual writers and professional bloggers. Whether you're publishing your latest article or exploring trending topics, Quickblog offers a seamless and enjoyable experience across all devices..</p>
       </div>

       <div className='flex flex-wrap justify-between w-full md:w-[45%] gap-5'>
          
        {footer_data.map((sections,index)=>(
           <div key={index}>
                <h3 className='font-semibold text-base text-gray-900 md:mb-5 mb-2'>{sections.title}</h3>
                <ul className='text-sm space-y-1'>
                    {sections.links.map((link,i)=>(
                        <li key={i}>
                            <a href="#" className='hover:underline transition'>{link}</a>
                        </li>
                    ))}
                </ul>

           </div>
        ))}

       </div>
      </div>
      <p className='py-4 text-center text-sm md:text-base text-gray-500/80'>
        Copyright 2025 © Quickblog . All Right Reserved
      </p>
    </div>
  )
}

export default Footer;
 