import React from 'react'
import headerImg from '../public/header-img.jpg'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className='home-page w-full landscape:h-[120vh] bg-[#e9ebf0] font-[family-name:var(--font-kanit)] grid place-items-center   '>
    <div className="content w-[95%]  overflow-hidden landscape:space-y-[1vw] portrait:space-y-[6vw] ">
{/* header banner */}
<header
   style={{
    backgroundImage: `url(${headerImg.src})`, // Set the background image
    backgroundSize: 'cover', // Ensure the image covers the entire header 
    backgroundPosition: 'center', // Center the image
    backgroundRepeat: 'no-repeat', // Prevent the image from repeating
  }}
className='flex justify-center pt-[0vw]  h-[60vh]  text-[#b8c2d8] rounded-sm portrait:space-x-4'>

<div className="writeup flex flex-col space-y-2  items-center portrait:text-center w-full">
<h1 className='landscape:text-[3vw] portrait:text-[6vw] bg-[#283b63] w-full h-[6vw] text-center mb-[6vw]'>Evidence-Based Medicines Research & Pharmacovigilance Training</h1>
<p className='landscape:text-[2vw] portrait:text-[3vw] text-[#283b63]'>1-3 July 2025</p>
<p className='landscape:text-[2vw] portrait:text-[3vw] text-[#283b63]'>Lagos, Nigeria</p>
<Link href='/registration' className='landscape:w-[10vw] portrait:w-[40vw] text-center hover:bg-[#959fb6] landscape:text-[1.3vw] portrait:text-[6vw] py-2 cursor-pointer portrait:my-2 mt-[2vw] bg-[#CED8ED] text-[#0d1424] rounded-sm'>Register Now</Link>
</div>
</header> 
{/* why attend */}
<section className='text-[#3b4a6e] flex flex-col items-center landscape:text-[1.2vw] portrait:text-center mt-[4vw] '>
<h3 className='landscape:text-[1.6vw] mb-4'>Why Attend?</h3>
<p className='mb-[2vw]'>This Evidence-Based Medicines Research and Pharmacovigilance Training offers a comprehensive and hands-on learning experience in the rapidly evolving fields of medicine research and pharmacovigilance. It provides an excellent opportunity for professionals to stay informed about study design, ethical considerations, patient safety, and regulatory practices. Led by experts, the program explores medicine research and pharmacovigilance principles and practices. 
</p>
<p className='mb-[2vw]'>Participants will gain insights into adverse event reporting,medication errors, and safety monitoring for vaccines, biologics, and herbal medicines. The training also covers practical project management and publication writing skills, including the use of AI. A key feature of this training is the roundtable discussion on medicines research in Africa, where professionals will share insights, lessons learned, and future directions. 

</p>
<p className='mb-[2vw]'>
This program is ideal for researchers, healthcare professionals, and regulatory authorities who aim to enhance their skills, expand their professional network,and contribute to advancing medicines research and pharmacovigilance.
</p>
</section>




    </div>
    
    
    </div>
  )
}
