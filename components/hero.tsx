"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

function Hero(): React.ReactNode {
  const badgeVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        delay: 0.2,
      },
    },
  };

  const headingVariants = {
    hidden: {
      opacity: 0,
      x: -100,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        delay: 0.5,
      },
    },
  };

  const secondaryHeadingVariants = {
    hidden: {
      opacity: 0,
      y: 100,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        delay: 0.8,
      },
    },
  };

  const buttonVariants = {
    hidden: {
      opacity: 0,
      y: 100,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        delay: 1.1,
      },
    },
  };

  const imageVariants = {
    hidden: {
      opacity: 0,
      y: 100,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        delay: 1.4,
      },
    },
  };
  return (
    <section
      className={"container h-full min-h-[var(--height-screen)] w-full pt-20"}
    >
      <div
        className={
          "grid h-fit items-center justify-center xs:gap-y-10 md:grid-cols-2 md:gap-6"
        }
      >
        <div className={"flex h-full flex-col justify-center gap-y-10"}>
          <motion.div
            variants={badgeVariants}
            initial="hidden"
            animate="visible"
          >
            <Badge
              className={"w-fit hover:bg-blue-800 hover:dark:text-zinc-100"}
            >
              Gemini Powered
            </Badge>
          </motion.div>
          <motion.h1
            variants={headingVariants}
            initial={"hidden"}
            animate={"visible"}
            className="relative font-poppins font-semibold leading-relaxed text-zinc-800 dark:text-zinc-100 xs:text-4xl xl:text-6xl"
          >
            Find the Perfect Scholarship <br /> Tailored Just for You
          </motion.h1>
          <motion.h2
            variants={secondaryHeadingVariants}
            initial={"hidden"}
            animate={"visible"}
            className="text-left text-sm leading-loose tracking-wide text-zinc-500 antialiased dark:text-zinc-300 sm:text-xl"
          >
            ScholarSync uses AI to match students with the best scholarship
            opportunities based on their background and needs.
          </motion.h2>
          <motion.div
            variants={buttonVariants}
            initial={"hidden"}
            animate={"visible"}
          >
            <Link href={"/scholarships"}>
              <Button
                className={
                  "flex w-fit gap-x-2 text-start font-roboto font-normal tracking-widest hover:bg-blue-800 hover:text-zinc-100 xl:text-xs 2xl:text-sm"
                }
              >
                EXPLORE SCHOLARSHIPS <ChevronRight />
              </Button>
            </Link>
          </motion.div>
        </div>
        <motion.div
          variants={imageVariants}
          initial={"hidden"}
          animate={"visible"}
        >
          <Image
            src={"/student-exploring-scholarships.svg"}
            alt={"student-exploring-scholarships"}
            height={600}
            width={600}
          />
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
