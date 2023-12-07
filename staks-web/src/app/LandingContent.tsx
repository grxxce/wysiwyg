"use client";
import Image from "next/image";
import Navbar from "./(components-navbar)/Navbar";
import { dm_sans, dm_serif_display, pt_serif } from "./fonts";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const images = [
  {
    path: "/images/staks_landing_1.png",
    width: 1394,
    height: 700,
  },
  { path: "/images/staks_landing_2.png", width: 1394, height: 898 },
  { path: "/images/staks_landing_3.png", width: 1394, height: 745 },
];

const LandingContent = () => {
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up("lg"));
  const tablet = useMediaQuery(theme.breakpoints.down("sm"));
  console.log(desktop);
  return (
    <div
      className={`flex flex-col items-center text-center justify-center h-full ${dm_sans.className}`}
    >
      <div
        className={`flex flex-col text-[50px] font-[700] lg:text-[80px] mb-4`}
        style={{
          lineHeight: "100px",
          letterSpacing: '-2.4px',
          fontFamily: "CMU Serif",
          color: "var(--Brown, #2C1911)",
        }}
      >
        <span> Type beautiful, intricate</span>
        <span>equations in seconds</span>
      </div>

      <span className="font-[400] lg:text-[24px] mt-6">
        Run code, typeset formulas, and manage your citations{" "}
      </span>
      <span className="font-[400] lg:text-[24px]">— all in one editor </span>
      <span className="font-[700] lg:text-[24px]">
        Desktop app coming soon.
      </span>

      <div className="flex flex-col space-y-28 mt-32">
        {images.map((image, index) => {
          return (
            <div key={index}>
              <Image
                src={image.path}
                width={1300}
                height={745}
                alt={`landing page demo ${index}`}
              />
            </div>
          );
        })}
      </div>
      <div className="flex flex-col mt-16 text-center mb-10">
        <span>Exportable to .tex, .pdf, and .md files</span>
        <div className={`font-[700] text-[#2C1911] ${dm_sans.className}`}>
          <a href="https://l81q0k9feb6.typeform.com/to/hFWAyYvm" target="_blank">
            <span className="mt-8 underline cursor-pointer">Sign up</span>{" "}
          </a>
          <span>for the waitlist!</span>
        </div>
      </div>
    </div>
  );
};

export default LandingContent;
