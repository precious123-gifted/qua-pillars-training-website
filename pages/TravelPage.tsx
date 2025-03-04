import React from 'react'

export default function TravelPage() {
  return (
    <div className='travel-page w-full bg-[#dce0ea] font-[family-name:var(--font-kanit)] grid place-items-center pt-[1vw] '>
    <div className="content w-[95%]  overflow-hidden landscape:space-y-[1vw] portrait:space-y-[6vw]">

{/* Travel*/}
<section className='text-[#3b4a6e] text-center  h-[100vh] flex flex-col items-center landscape:text-[1.2vw] portrait:text-center'>
<h3 className='landscape:text-[1.6vw] mb-4'>Travel and Accomodations</h3>
<h4 className='landscape:text-[1.6vw] mb-4'>Visa Information</h4>
<p>
Visa letters will be issued upon request to enquires@qphrf.org . Please check whether your country is exempt before applying.</p><br />
<h4 className='landscape:text-[1.6vw] mb-4'>Venue</h4>
<p>
Golfview Hotel and Conference Center, 12 Gen. Adeyinka Adebayo Road, Ikeja GRA, Ikeja 101233, Lagos, Nigeria
</p><br />
<h4 className='landscape:text-[1.6vw] mb-4'>Hotel</h4>
<p>
Golfview Hotel and Conference Center 
12 Gen. Adeyinka Adebayo Road, Ikeja GRA, 
101233, Lagos, Nigeria

Rooms are available to participants at discounted rates. Email enquires@qphrf.org for booking.

Cancellation Policy:  Any reservation canceled within 7 days of arrival will be charged in full or late cancellation or non-arrival.
</p>
</section>




    </div>
    
    
    </div>
  )
}
