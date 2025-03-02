'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Logo from '../public/Qua Pillar Logo.png';
import menuIcon from '../public/menu-icon.png';
import Image from 'next/image';

export default function Navigation() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="content font-[family-name:var(--font-kanit)] landscape:text-[1.3vw] w-full grid place-items-center bg-[#0d1424] overflow-hidden text-[#CED8ED] landscape:h-[10vh] portrait:h-[12vh]">
      <nav className="flex justify-between w-[95%] items-center">
        {/* Logo */}
        <Link href="/" className="landscape:w-[10%] portrait:w-[30%]">
          <Image src={Logo} alt="qua pillars logo" className="rounded-sm" />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden landscape:flex justify-between w-[32%]">
          <li className="nav-item hover:bg-[rgba(206,216,237,0.1)] p-1 grid place-items-center rounded-sm">
            <Link href="/">Home</Link>
          </li>
          <li className="nav-item hover:bg-[rgba(206,216,237,0.1)] p-1 grid place-items-center rounded-sm">
            <Link href="/registration">Registration</Link>
          </li>
          <li className="nav-item hover:bg-[rgba(206,216,237,0.1)] p-1 grid place-items-center rounded-sm">
            <Link href="/travel">Travel</Link>
          </li>
          <li className="nav-item hover:bg-[rgba(206,237,237,0.1)] p-1 grid place-items-center rounded-sm">
            <Link href="/agenda">Agenda</Link>
          </li>
        </ul>

        {/* Mobile Menu Icon */}
        <div className="landscape:hidden cursor-pointer" onClick={toggleSidebar}>
          <Image src={menuIcon} alt="menu icon" width={30} height={30} />
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className="fixed inset-0 bg-[#0d1424] bg-opacity-95 z-50 landscape:hidden"
        style={{
          transform: isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out',
          opacity: isSidebarOpen ? 1 : 0,
          pointerEvents: isSidebarOpen ? 'auto' : 'none', // Disable clicks when sidebar is closed
        }}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleSidebar} className="text-[#CED8ED] text-3xl">
            &times;
          </button>
        </div>
        <ul className="flex flex-col items-center space-y-6 mt-10">
          <li className="nav-item hover:bg-[rgba(206,216,237,0.1)] p-2 rounded-sm">
            <Link href="/" onClick={toggleSidebar}>
              Home
            </Link>
          </li>
          <li className="nav-item hover:bg-[rgba(206,216,237,0.1)] p-2 rounded-sm">
            <Link href="/registration" onClick={toggleSidebar}>
              Registration
            </Link>
          </li>
          <li className="nav-item hover:bg-[rgba(206,216,237,0.1)] p-2 rounded-sm">
            <Link href="/travel" onClick={toggleSidebar}>
              Travel
            </Link>
          </li>
          <li className="nav-item hover:bg-[rgba(206,237,237,0.1)] p-2 rounded-sm">
            <Link href="/agenda" onClick={toggleSidebar}>
              Agenda
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}