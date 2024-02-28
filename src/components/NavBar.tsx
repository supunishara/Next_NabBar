"use client";

import Image from "next/image";
import React, { useState } from "react";
import logo from "@/assets/images/logo.svg";
import todoImage from "@/assets/images/icon-todo.svg";
import calendarImage from "@/assets/images/icon-calendar.svg";
import reminderImage from "@/assets/images/icon-reminders.svg";
import planningImage from "@/assets/images/icon-planning.svg";
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";
import { IoMenuOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { useAutoAnimate } from "@formkit/auto-animate/react";

type NavItem = {
  label: string;
  link?: string;
  children?: NavItem[];
  iconImage?: string;
};

const navItems: NavItem[] = [
  {
    label: "Features",
    link: "#",
    children: [
      {
        label: "Todo List",
        link: "#",
        iconImage: todoImage,
      },
      {
        label: "Calendar",
        link: "#",
        iconImage: calendarImage,
      },
      {
        label: "Reminders",
        link: "#",
        iconImage: reminderImage,
      },
      {
        label: "Planning",
        link: "#",
        iconImage: planningImage,
      },
    ],
  },
  {
    label: "Compnay",
    link: "#",
    children: [
      {
        label: "History",
        link: "#",
      },
      {
        label: "Our Team",
        link: "#",
      },
      {
        label: "Blog",
        link: "#",
      },
    ],
  },
  {
    label: "Careers",
    link: "#",
  },
  {
    label: "About",
    link: "#",
  },
];

const NavBar = () => {
  const [isSideMenuOpen, setSideMenu] = useState(false);
  const [animationParent] = useAutoAnimate();

  const openCloseSideMenu = () => {
    setSideMenu(!isSideMenuOpen);
  };
  return (
    <div className="mx-auto flex w-full max-w-7xl justify-between px-4 py-5 text-sm">
      {/* left side */}
      <section ref={animationParent} className="flex items-center gap-10">
        {/* logo */}
        <Image src={logo} alt="logo" />

        {isSideMenuOpen && <MobileNav openCloseSideMenu={openCloseSideMenu} />}

        {/* nav items */}
        <div className="hidden md:flex items-center gap-4 transition-all">
          {navItems.map((d, i) => (
            <Link
              key={i}
              href={`${d.link}`}
              className="relative group px-2 py-3 transition-all"
            >
              <p className="flex cursor-pointer items-center gap-2 text-neutral-400  group-hover:text-black/90">
                <span>{d.label}</span>
                {d.children && (
                  <IoIosArrowDown className="rotate-180 transition-all group-hover:rotate-0" />
                )}
              </p>

              {/* dropDown */}
              {d.children && (
                <div className="absolute right-0 top-10 hidden w-auto flex-col gap-1 rounded-lg bg-white py-3 shadow-md transition-all group-hover:flex">
                  {d.children.map((ch, j) => (
                    <Link
                      key={j}
                      href={`${ch.link}`}
                      className="flex cursor-pointer items-center py-1 pl-6 pr-8 text-neutral-400  hover:text-black/90"
                    >
                      {/* image */}
                      {ch.iconImage && (
                        <Image src={ch.iconImage ?? ""} alt="item-icon" />
                      )}

                      {/* Item */}
                      <span className="whitespace-nowrap pl-3">{ch.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </Link>
          ))}
        </div>
      </section>

      {/* right side */}
      <section className="hidden md:flex items-center gap-8">
        <button className="h-fit text-neutral-400 transition-all hover:text-black/90">
          Login
        </button>

        <button className="h-fit rounded-xl border-2 border-neutral-400 px-4 py-2 text-neutral-400 transition-all hover:border-black hover:text-black/90">
          Register
        </button>
      </section>

      <IoMenuOutline
        onClick={openCloseSideMenu}
        className="cursor-pointer text-4xl md:hidden"
      />
    </div>
  );
};

export default NavBar;

const MobileNav = ({
  openCloseSideMenu,
}: {
  openCloseSideMenu: () => void;
}) => {
  return (
    <div className="fixed left-0 top-0 flex h-full min-h-screen w-full justify-end bg-black/60 md:hidden">
      <div className="h-full w-[65%] bg-white px-4 py-4">
        <section className="flex justify-end">
          <IoMdClose
            onClick={openCloseSideMenu}
            className="cursor-pointer text-4xl"
          />
        </section>

        <div className="flex flex-col text-base gap-2 transition-all">
          {navItems.map((d, i) => (
            <SingleNavItem
              label={d.label}
              iconImage={d.iconImage}
              link={d.link}
              key={i}
            >
              {d.children}
            </SingleNavItem>
          ))}
        </div>

        <section className="flex flex-col items-center gap-8 mt-4">
          <button className="h-fit text-neutral-400 transition-all hover:text-black/90">
            Login
          </button>

          <button className="w-full max-w-[200px] rounded-xl border-2 border-neutral-400 px-4 py-2 text-neutral-400 transition-all hover:border-black hover:text-black/90">
            Register
          </button>
        </section>
      </div>
    </div>
  );
};

const SingleNavItem = (d: NavItem) => {
  const [isItemOpen, setItemOpen] = useState(false);
  const [animationParent] = useAutoAnimate();

  const toggleItem = () => {
    return setItemOpen(!isItemOpen);
  };
  return (
    <Link
      onClick={toggleItem}
      ref={animationParent}
      href={`${d.link}`}
      className="relative px-2 py-3 transition-all"
    >
      <p className="flex cursor-pointer items-center gap-2 text-neutral-400  group-hover:text-black/90">
        <span>{d.label}</span>
        {d.children && (
          <IoIosArrowDown
            className={`text-xs transition-all ${isItemOpen && "rotate-180"}`}
          />
        )}
      </p>

      {/* dropDown */}
      {isItemOpen && d.children && (
        <div className=" w-auto flex-col gap-1 rounded-lg bg-white py-3 transition-all">
          {d.children.map((ch, j) => (
            <Link
              key={j}
              href={`${ch.link}`}
              className="flex cursor-pointer items-center py-1 pl-6 pr-8 text-neutral-400  hover:text-black/90"
            >
              {/* image */}
              {ch.iconImage && (
                <Image src={ch.iconImage ?? ""} alt="item-icon" />
              )}

              {/* Item */}
              <span className="whitespace-nowrap pl-3">{ch.label}</span>
            </Link>
          ))}
        </div>
      )}
    </Link>
  );
};
