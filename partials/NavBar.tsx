import Link from 'next/link';
import Logo from '../public/Qua Pillar Logo.png';
import Image from 'next/image';

export default function Navigation() {
  return (
    <div className="content font-[family-name:var(--font-kanit)] landscape:text-[1.3vw] w-full grid place-items-center bg-[#0d1424] overflow-hidden text-[#CED8ED] landscape:h-[10vh] portrait:h-[12vh]">
      <nav className="flex justify-between w-[95%]">
        <Link href='/' className="landscape:w-[10%] portrait:w-[30%] " ><Image src={Logo} alt="qua pillars logo" className='rounded-sm'/> </Link>

        <ul className="flex justify-between w-[32%]">
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
      </nav>
    </div>
  );
}
