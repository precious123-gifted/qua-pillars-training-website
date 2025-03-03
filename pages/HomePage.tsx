import React from 'react'
import headerImg from '../public/header-img.png'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className='home-page w-full h-[100vh] bg-[#CED8ED] font-[family-name:var(--font-kanit)] grid place-items-center pt-[1vw] '>
    <div className="content w-[95%]  overflow-hidden landscape:space-y-[1vw] portrait:space-y-[6vw] ">
{/* header banner */}
<header
   style={{
    backgroundImage: `url(${headerImg.src})`, // Set the background image
    backgroundSize: 'contain', // Ensure the image covers the entire header
    backgroundPosition: 'center', // Center the image
    backgroundRepeat: 'no-repeat', // Prevent the image from repeating
  }}
className='flex justify-center items-center h-[60vh] bg-[#283b63] text-[#b8c2d8] rounded-sm portrait:space-x-4'>

<div className="writeup flex flex-col space-y-2 pr-[1vw]">
<h1 className='landscape:text-[2vw] portrait:text-[4vw]'>Evidence-Based Medicines Research & PharmacovigilanceTraining</h1>
<p className='landscape:text-[1.4vw] portrait:text-[3vw]'>1-3 July 2025</p>
<p className='landscape:text-[1.3vw] portrait:text-[3vw]'>Lagos, Nigeria</p>
<Link href='/registration' className='landscape:w-[10vw] portrait:w-[25vw] text-center hover:bg-[#959fb6] landscape:text-[1.3vw] portrait:text-[4vw] py-2 cursor-pointer portrait:my-2 mt-[2vw] bg-[#CED8ED] text-[#0d1424] rounded-sm'>Register Now</Link>

</div>

</header>
{/* why attend */}
<section className='text-[#3b4a6e] flex flex-col items-center landscape:text-[1.2vw] portrait:text-center'>
<h3 className='landscape:text-[1.6vw] mb-4'>Why Attend</h3>
<p>This Evidence-Based Medicines Research and Pharmacovigilance Training offers a comprehensive and hands-on learning experience inthe rapidly evolving fields of medicine research and pharmacovigilance. It provides an excellent opportunity for professionals to stayinformed about study design, ethical considerations, patient safety, and regulatory practices. Led by experts, the program exploresmedicine research and pharmacovigilance principles and practices. Participants will gain insights into adverse event reporting,medication errors, and safety monitoring for vaccines, biologics, and herbal medicines. The training also covers practical projectmanagement and publication writing skills, including the use of AI. A key feature of this training is the roundtable discussion onmedicines research in Africa, where professionals will share insights, lessons learned, and future directions. This program is ideal forresearchers, healthcare professionals, and regulatory authorities who aim to enhance their skills, expand their professional network,and contribute to advancing medicines research and pharmacovigilance.</p>
</section>




    </div>
    
    
    </div>
  )
}
