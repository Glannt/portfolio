"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Link } from "@heroui/link";
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { Button } from "@heroui/button";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { GithubIcon, Logo } from "@/components/icons";

export const Navbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Track active section using IntersectionObserver on single page
  useEffect(() => {
    if (pathname !== "/") return;

    const sectionIds = ["home", "experience", "skills", "projects", "contact"];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { threshold: 0.25, rootMargin: "-80px 0px -40% 0px" },
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, [pathname]);

  const handleNavClick = (e: React.SyntheticEvent, href: string) => {
    if (pathname === "/" && href.startsWith("/#")) {
      const targetId = href.replace("/#", "");
      const elem = document.getElementById(targetId);

      if (elem) {
        e.preventDefault();
        elem.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", href);
        setActiveSection(targetId);
        setIsMenuOpen(false);
      }
    } else {
      setIsMenuOpen(false);
    }
  };

  return (
    <HeroUINavbar
      isMenuOpen={isMenuOpen}
      maxWidth='xl'
      position='sticky'
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className='basis-1/5 sm:basis-full' justify='start'>
        <NavbarBrand as='li' className='gap-3 max-w-fit'>
          <NextLink
            className='flex justify-start items-center gap-1.5'
            href='/#home'
            onClick={(e) => handleNavClick(e, "/#home")}
          >
            <Logo />
            <p className='font-bold text-inherit text-base tracking-tight'>Thành Đô</p>
          </NextLink>
        </NavbarBrand>
        <ul className='hidden lg:flex gap-5 justify-start ml-4'>
          {siteConfig.navItems.map((item) => {
            const targetId = item.href.replace("/#", "");
            const isActive =
              item.href === "/blog"
                ? pathname.startsWith("/blog")
                : pathname === "/" && activeSection === targetId;

            return (
              <NavbarItem key={item.href}>
                <NextLink
                  className={clsx(
                    linkStyles({ color: "foreground" }),
                    "text-sm font-medium transition-colors cursor-pointer",
                    isActive
                      ? "text-primary font-bold border-b-2 border-primary pb-0.5"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                >
                  {item.label}
                </NextLink>
              </NavbarItem>
            );
          })}
        </ul>
      </NavbarContent>

      <NavbarContent className='hidden sm:flex basis-1/5 sm:basis-full' justify='end'>
        <NavbarItem className='hidden sm:flex gap-2.5 items-center'>
          <Link isExternal aria-label='Github' href={siteConfig.links.github}>
            <GithubIcon className='text-default-500 hover:text-foreground transition-colors' />
          </Link>
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className='hidden md:flex'>
          <Button
            as={NextLink}
            className='text-sm font-semibold'
            color='primary'
            href='/#contact'
            size='sm'
            variant='flat'
            onClick={(e) => handleNavClick(e, "/#contact")}
          >
            Get In Touch
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className='lg:hidden basis-1 pl-4' justify='end'>
        <Link isExternal aria-label='Github' href={siteConfig.links.github}>
          <GithubIcon className='text-default-500' />
        </Link>
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      {/* Mobile Nav Menu */}
      <NavbarMenu className='pt-6 gap-4'>
        {siteConfig.navMenuItems.map((item) => {
          const targetId = item.href.replace("/#", "");
          const isActive =
            item.href === "/blog"
              ? pathname.startsWith("/blog")
              : pathname === "/" && activeSection === targetId;

          return (
            <NavbarMenuItem key={item.href}>
              <NextLink
                className={clsx(
                  "w-full text-lg py-2 block transition-colors",
                  isActive ? "text-primary font-bold" : "text-foreground hover:text-primary",
                )}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
              >
                {item.label}
              </NextLink>
            </NavbarMenuItem>
          );
        })}
      </NavbarMenu>
    </HeroUINavbar>
  );
};
