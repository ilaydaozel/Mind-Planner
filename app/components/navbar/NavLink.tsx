import Link from "next/link";

const NavLink = ({ href, title }:{ href: string, title: string }) => {
  return (
    <Link
      href={href}
      className="block py-2 pl-3 pr-4 text-textColor1-300 sm:text-lg rounded md:p-0 hover:text-white"
    >
      {title}
    </Link>
  );
};

export default NavLink;