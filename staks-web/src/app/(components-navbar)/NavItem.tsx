import Link from "next/link";
import { manrope } from "../fonts";

interface NavItemProps {
  name: string;
  url: string;
}

const NavItem = ({ name, url }: NavItemProps) => {
  return (
    <Link href={url}>
      <span className={`${manrope.className} font-[700] text-[16px]`}>{name}</span>
    </Link>
  );
};

export default NavItem;
