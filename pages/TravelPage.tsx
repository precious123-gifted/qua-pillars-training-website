'use client'

import React, { useState } from 'react';

export default function TravelPage() {
  const [mapLoaded, setMapLoaded] = useState(false);

  return (
    <div className='travel-page w-full bg-[#e9ebf0] font-[family-name:var(--font-kanit)] grid place-items-center pt-[1vw]'>
      <div className='content w-[95%] overflow-hidden landscape:space-y-[1vw] portrait:space-y-[6vw]'>

        {/* Travel Section */}
        <section className='text-[#3b4a6e] text-center h-[100vh] flex flex-col items-center landscape:text-[1.2vw] portrait:text-center'>
          <h3 className='landscape:text-[1.6vw] mb-4'>Travel and Accommodations</h3>
          
          <h4 className='landscape:text-[1.6vw] mb-4'>Visa Information</h4>
          <p>
            Visa letters will be issued upon request to enquires@qphrf.org. 
            Please check whether your country is exempt before applying.
          </p>
          <br />
          
          <h4 className='landscape:text-[1.6vw] mb-4'>Venue</h4>
          <p>
            Golfview Hotel and Conference Center, 
            12 Gen. Adeyinka Adebayo Road, 
            Ikeja GRA, Ikeja 101233, Lagos, Nigeria
          </p>
          <br />
          
          <h4 className='landscape:text-[1.6vw] mb-4'>Hotel</h4>
          <p>
            Golfview Hotel and Conference Center 
            12 Gen. Adeyinka Adebayo Road, Ikeja GRA, 
            101233, Lagos, Nigeria
            <br />
            Rooms are available to participants at discounted rates. 
            Email enquires@qphrf.org for booking.
          </p>
          <p>
            <b>Cancellation Policy:</b> Any reservation canceled within 7 days of arrival 
            will be charged in full or late cancellation or non-arrival.
          </p>

          {/* Map Section with Loading Spinner */}
          <div className='w-full h-[50vh] relative mt-8'>
            {!mapLoaded && (
              <div className='absolute inset-0 flex items-center justify-center bg-white z-10'>
                <div className='animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600'></div>
              </div>
            )}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1982.7544548578897!2d3.3446125!3d6.581519!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b0fe459e36b%3A0xf625f2bacca55829!2sGolfView%20Hotel%20-%20Suites%20%26%20Conference%20Centre%20GRA%20Ikeja%20Lagos%20Nigeria!5e0!3m2!1sen!2sng!4v1684328606397!5m2!1sen!2sng"
              width="100%"
              height="100%"
              className='border-0'
              loading="lazy"
              onLoad={() => setMapLoaded(true)}
              allowFullScreen
            ></iframe>
          </div>

        </section>
      </div>
    </div>
  );
}
