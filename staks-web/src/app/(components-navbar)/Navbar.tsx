"use client";
import Image from "next/image";
import Logo from "../../../public/images/logo.svg";
import NavItem from "./NavItem";
import { useRouter } from "next/navigation";
import { pt_serif } from "../fonts";

const Navbar = () => {
  const router = useRouter();
  return (
    <div className="flex flex-row justify-between py-3 px-24 items-center w-full cursor-pointer">
      <div
        className="flex flex-row space-x-5 items-center"
        onClick={() => {
          router.push("/");
        }}
      >
        <Image src={Logo} width={45} height={55} alt="Staks AI logo" />
        <span
          className={`text-[40px]`}
          style={{
            fontFamily: "CMU Serif",
            fontWeight: 700, 
          }}
        >
          staks
        </span>
      </div>
    </div>
  );
};

export default Navbar;
