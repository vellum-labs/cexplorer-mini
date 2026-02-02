import type { FC } from "react";
import { useState } from "react";
import {
  Menu,
  X,
  ChevronDown,
  Link2,
  Layers,
  Coins,
  Wrench,
  Settings,
  Sun,
  Moon,
} from "lucide-react";
import { Link, useNavigate } from "@tanstack/react-router";
import { MainLogo } from "@vellumlabs/cexplorer-sdk/MainLogo";
import { useThemeStore } from "@vellumlabs/cexplorer-sdk/ThemeStore";
import { navigationOptions } from "@/constants/navigationOptions";

export const BurgerMenu: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useThemeStore();

  const menuSections = [
    { label: "Blockchain", key: "blockchain", icon: <Link2 size={20} /> },
    { label: "Staking", key: "staking", icon: <Layers size={20} /> },
    { label: "Assets", key: "assets", icon: <Coins size={20} /> },
    { label: "Tools", key: "tools", icon: <Wrench size={20} /> },
  ] as const;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setExpandedSection(null);
    }
  };

  const closeMenu = () => {
    setIsOpen(false);
    setExpandedSection(null);
  };

  const toggleSection = (key: string) => {
    setExpandedSection(expandedSection === key ? null : key);
  };

  return (
    <>
      <button onClick={toggleMenu} aria-label='Toggle menu'>
        <Menu size={24} />
      </button>

      {isOpen && (
        <div
          className='bg-black/80 fixed inset-0 z-[100]'
          onClick={closeMenu}
        />
      )}

      <div
        className={`fixed left-0 top-0 z-[101] h-full w-[85%] max-w-[400px] transform bg-background p-5 shadow-lg transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={closeMenu}
          className='absolute right-4 top-6 opacity-70 hover:opacity-100'
        >
          <X size={20} />
        </button>

        <MainLogo
          className='-translate-x-1'
          mini
          size={120}
          onClick={() => {
            closeMenu();
            navigate({ to: "/" });
          }}
        />

        <div className='flex flex-col'>
          {menuSections.map(section => (
            <div key={section.key}>
              <button
                className='flex h-10 w-full items-center gap-3 text-left'
                onClick={() => toggleSection(section.key)}
              >
                <span className='text-textSecondary'>{section.icon}</span>
                <span className='flex-1 font-medium'>{section.label}</span>
                <ChevronDown
                  size={16}
                  className={`text-textSecondary transition-transform ${
                    expandedSection === section.key ? "rotate-180" : ""
                  }`}
                />
              </button>

              {expandedSection === section.key && (
                <div className='flex flex-col pl-[52px]'>
                  {navigationOptions[section.key].map(item => (
                    <Link
                      key={item.href}
                      to={item.href || "/"}
                      onClick={closeMenu}
                      className='border-b border-borderFaded py-[6px] text-textSecondary hover:text-text'
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div>
            <button
              className='flex h-10 w-full items-center gap-3 text-left'
              onClick={() => toggleSection("settings")}
            >
              <span className='text-textSecondary'>
                <Settings size={20} />
              </span>
              <span className='flex-1 font-medium'>Settings</span>
              <ChevronDown
                size={16}
                className={`text-textSecondary transition-transform ${
                  expandedSection === "settings" ? "rotate-180" : ""
                }`}
              />
            </button>

            {expandedSection === "settings" && (
              <div className='pl-[52px]'>
                <button
                  className='flex w-full items-center justify-between border-b border-borderFaded py-[6px] text-textSecondary hover:text-text'
                  onClick={toggleTheme}
                >
                  <span>Theme</span>
                  {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
