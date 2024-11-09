import Container from "@/components/Container";
import { useEffect, useRef, Suspense, useState } from "react";
import styles from "@/styles/Home.module.css";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  Code2,
  Frame,
  Eye,
  MonitorSmartphone,
} from "lucide-react";
import { TriangleDownIcon } from "@radix-ui/react-icons";
import Spline from "@splinetool/react-spline";
import Link from "next/link";
import { cn, scrollTo } from "@/lib/utils";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import VanillaTilt from "vanilla-tilt";
import { motion } from "framer-motion";

const aboutStats = [
  { label: "Years of experience", value: "1+" },
  { label: "Technologies mastered", value: "3+" },
  { label: "Committees worked with", value: "4+" },
];

const projects = [
  {
    title: "News Aggregator",
    description: "This project is a news aggregator built using the MERN stack (MongoDB, Express, React, Node.js) and the NewsAPI.org API. It enables users to view news articles from various sources.",
    image: "/assets/news.jpg",
    href: "https://github.com/abhinxvz/news_aggregator",
  },
  {
    title: "Space Invader",
    description: "The game has features such as player movement, map borders, mystery ships, high score saving systems and a pack of aliens moving down the screen gradually.",
    image: "/assets/what.jpg",
    href: "https://github.com/abhinxvz/SpaceInvaderxmain-",
  },
  {
    title: "Login Authenticator",
    description: "This project demonstrates how to implement a login authenticator using Firebase and Node.js",
    image: "/assets/log.jpg",
    href: "https://github.com/abhinxvz/news_aggregator/",
  },
  {
    title: "Design and VFX",
    description: "My work in Design and VFX",
    image: "/assets/val.png",
    href: "https://drive.google.com/drive/u/0/folders/1hEX4eFOIFTPQiXvM0WFgHtVG1ATd79Wx",
  },
];

const services = [
  {
    service: "Frontend Development",
    description:
      "Creating stellar user interfaces and web experiences using the latest technologies.",
    icon: Code2,
  },
  {
    service: "UX Design",
    description:
      "Building intuitive, user-centric designs that drive engagement and conversion.",
    icon: Frame,
  },
  {
    service: "Responsive Design",
    description:
      "Designing websites that look and perform equally well on all devices and screen sizes.",
    icon: MonitorSmartphone,
  },
  {
    service: "Backend Development",
    description:
      "Developing robust, scalable server-side logic for a wide range of web applications.",
    icon: Eye,
  },
];

export default function Home() {
  const refScrollContainer = useRef(null);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState<number>(0);
  const [count, setCount] = useState<number>(0);

  // handle scroll
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    async function getLocomotive() {
      const Locomotive = (await import("locomotive-scroll")).default;
      new Locomotive({
        el: refScrollContainer.current ?? new HTMLElement(),
        smooth: true,
      });
    }

    function handleScroll() {
      let current = "";
      setIsScrolled(window.scrollY > 0);

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 250) {
          current = section.getAttribute("id") ?? "";
        }
      });

      navLinks.forEach((li) => {
        li.classList.remove("nav-active");

        if (li.getAttribute("href") === `#${current}`) {
          li.classList.add("nav-active");
          console.log(li.getAttribute("href"));
        }
