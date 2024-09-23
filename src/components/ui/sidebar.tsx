"use client";
import { AnimatePresence, motion } from "framer-motion";
import Link, { type LinkProps } from "next/link";
import { createContext, useContext, useState } from "react";

import { cn } from "@/libs/utils/core/cn";
import MenuIcon from "@/components/icons/menu";
import X from "@/components/icons/x";

const SIDEBAR_WIDTH = {
  OPEN: "180px",
  CLOSED: "60px",
} as const;

/*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
/*                      ✨ CONTEXT ✨                         */
/*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

/*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
/*                     ✨ FUNCTIONS ✨                        */
/*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/

export function SidebarProvider({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true,
}: TSidebarProvider) {
  const [openState, setOpenState] = useState(false);

  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate: animate }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function Sidebar({ children, open, setOpen, animate }: TSidebar) {
  return (
    <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      {children}
    </SidebarProvider>
  );
}

export function SidebarBody(props: TSidebarBody) {
  return (
    <>
      <DesktopSidebar {...props} />
      <MobileSidebar {...(props as React.ComponentProps<"div">)} />
    </>
  );
}

export function DesktopSidebar({ className, children, ...props }: TDesktopSidebar) {
  const { open, setOpen, animate } = useSidebar();

  return (
    <>
      <motion.div
        className={cn(
          SIDEBAR_WIDTH.OPEN,
          "h-full p-4 hidden  md:flex md:flex-col bg-card/70 flex-shrink-0",
          className,
        )}
        animate={{
          width: animate
            ? open
              ? SIDEBAR_WIDTH.OPEN
              : SIDEBAR_WIDTH.CLOSED
            : SIDEBAR_WIDTH.OPEN,
        }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        {...props}
      >
        {children}
      </motion.div>
    </>
  );
}

export function MobileSidebar({ className, children, ...props }: TMobileSidebar) {
  const { open, setOpen } = useSidebar();
  return (
    <>
      <div
        className={cn(
          "h-10 p-4 flex flex-row md:hidden  items-center justify-between bg-card/70 w-full",
        )}
        {...props}
      >
        <div className="z-20 flex justify-end w-full">
          <MenuIcon className="text-primary" onClick={() => setOpen(!open)} />
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              className={cn(
                "fixed h-full w-full inset-0 bg-card/70 p-10 z-[100] flex flex-col justify-between",
                className,
              )}
            >
              <div
                className="absolute z-50 right-10 top-10 text-primary"
                onClick={() => setOpen(!open)}
                onKeyUp={(e) => e.key === "Enter" && setOpen(!open)} // Added keyboard event
                role="button" // Added role for accessibility
                tabIndex={0} // Added tabIndex for focusability
              >
                <X />
              </div>
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export function SidebarLink({ link, className, onClick, ...props }: TSidebarLink) {
  const { open, animate } = useSidebar();
  return (
    <Link
      href={link.href}
      className={cn(
        "flex items-center justify-start gap-2 group/sidebar py-2",
        className,
        "hover:text-primary"
      )}
      {...props}
      onClick={onClick}
    >
      {link.icon}

      <motion.span
        animate={{
          display: animate ? (open ? "inline-block" : "none") : "inline-block",
          opacity: animate ? (open ? 1 : 0) : 1,
        }}
        className="text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0"
      >
        {link.label}
      </motion.span>
    </Link>
  );
}

/*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
/*                     ✨   TYPES   ✨                        */
/*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/

type TDesktopSidebar = React.ComponentProps<typeof motion.div>;
type TMobileSidebar = React.ComponentProps<"div">;
type TSidebarBody = React.ComponentProps<typeof motion.div>;

interface Links {
  label: string;
  href: string;
  icon: React.JSX.Element | React.ReactNode;
}

interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
}

type TSidebarProvider = {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
};

type TSidebar = {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
};

type TSidebarLink = {
  link: Links;
  className?: string;
  props?: LinkProps;
  onClick?: () => void;
};
