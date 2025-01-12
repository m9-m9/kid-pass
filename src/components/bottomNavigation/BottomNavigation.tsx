"use client";

import { useRouter } from "next/navigation";
import styles from "./style.module.css";
import Image from "next/image";

const BottomNavigation = () => {
  const router = useRouter();

  const navItems = [
    {
      icon: "/images/icons/ruler.png",
      label: "홈",
      path: "/home",
    },
    {
      icon: "/images/icons/ruler.png",
      label: "아이기록",
      path: "/record",
    },
    {
      icon: "/images/icons/book.png",
      label: "아기수첩",
      path: "/note",
    },
    {
      icon: "/images/icons/hospital.png",
      label: "병원기록",
      path: "/hospital",
    },
    {
      icon: "/images/icons/more.png",
      label: "더보기",
      path: "/more",
    },
  ];

  return (
    <nav className={styles.bottomNav}>
      {navItems.map((item) => (
        <button
          key={item.path}
          className={styles.navItem}
          onClick={() => router.push(item.path)}
        >
          <Image
            src={item.icon}
            alt={item.label}
            width={24}
            height={24}
            className={styles.icon}
          />
          <span className={styles.label}>{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default BottomNavigation;
