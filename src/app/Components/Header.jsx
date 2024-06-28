"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import goldbg from "../assets/goldbg.png";
import maskvector from "../assets/Mask_group.png";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import Link from "next/link";

function Header() {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        // Adjust this value as needed
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="h-[280px] rounded-b-[2rem] relative w-screen bg-gradient-to-b from-[#FFF9EA] mix-blend-multiply to-[#F5EC02]/30">
      <Image alt="bgbanner" src={maskvector} className="absolute top-0 left-0" />
      <div className="flex justify-between items-center p-6">
      <img
          src="https://www.baksish.in/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fbaksish_logo.b18dc14f.png&w=96&q=75" // Replace with actual logo URL
          alt="BakSish"
          className="mb-4"
        />
        <MenuIcon />
      </div>
      <div
        className={`search px-10 relative`}
      >
        <input
          type="text"
          placeholder="Search 'Butter nan'"
          className="pr-8 pl-10 py-3 focus:ring-0 shadow-md bg-[#FFF9EA] w-full rounded-full"
        />
        <SearchIcon className="absolute top-3 text-[#4E0433] h-6 left-12" />
      </div>
      <div className="mt-8 h-8 relative">
        <Image
          src={goldbg}
          alt="bggolds"
          className="object-cover absolute focus:border-none left-0 top-0 -z-10 h-full w-screen object-center"
        />
        <p className="text-center font-semibold p-1 text-[#6C0345]">
          Now you can review and rate our service !!
        </p>
      </div>
      <div className="flex justify-center items-center mt-4">
        <Link href={'/TippPage'} className="bg-[#6C0345] rounded-full py-1 px-4 text-[#FFF9EA] flex justify-center items-center hover:scale-90 duration-700">
          Treat the team
          <ArrowRightAltIcon />
        </Link >
      </div>
    </div>
  );
}

export default Header;
