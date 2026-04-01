"use client"

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 .297c-6.63 0-12 5.373-12 12 
           0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 
           0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61 
           -.546-1.387-1.333-1.757-1.333-1.757-1.089-.744.083-.729.083-.729 
           1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.809 1.305 
           3.495.998.108-.776.418-1.305.762-1.605-2.665-.305-5.466-1.332-5.466-5.93 
           0-1.31.468-2.381 1.236-3.221-.123-.303-.536-1.523.117-3.176 
           0 0 1.008-.322 3.301 1.23a11.52 11.52 0 0 1 3.003-.404 
           c1.018.005 2.045.138 3.003.404 2.291-1.552 3.297-1.23 
           3.297-1.23.655 1.653.242 2.873.119 3.176.77.84 
           1.236 1.911 1.236 3.221 0 4.61-2.804 5.624-5.475 
           5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 
           3.286 0 .319.216.694.825.576C20.565 22.092 24 17.592 
           24 12.297c0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}

export function HeroSection() {

  return (
    <section className="container mx-auto py-5">
      <div className="rounded-2xl bg-foreground p-8 md:p-15 lg:p-35 flex flex-col md:flex-row items-center gap-5">
        <div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-background">
            Hi, I&apos;m Harold Catipay!
          </h1>
          <p className="mt-2 text-xl md:text-2xl lg:text-3xl text-muted-foreground font-semibold leading-snug">
            Graphic Designer,
            <br />
            Event Producer &
            <br />
            Aspiring Web Developer.
          </p>

          <div className="mt-8 space-y-2 text-muted-foreground text-base md:text-lg lg:text-l leading-relaxed max-w-3xl ">
            <p>I am a passionate and detail-oriented individual with a strong foundation in graphic design and event production. Currently expanding my skills into web development, I am driven by a curiosity to create seamless and engaging digital experiences. My goal is to blend creativity with technical expertise to deliver innovative solutions that make a difference.</p>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3 ">
            <Button
              variant={"outline"}
              className="gap-2 bg-background text-foreground py-6 px-6"
              asChild
            >
              <Link
                href="/projects"
              >
                View Projects
                <ArrowRight className="h-6 w-6" />
              </Link>
            </Button>

            <div className="h-8 w-px bg-muted-foreground/30" />
            <div className="flex items-center gap-3">
              <Link
                href="https://github.com/Eychz"
                className="flex h-12 w-12 items-center justify-center rounded-md bg-background text-foreground hover:bg-background/80 transition-colors"
              >
                <GitHubIcon className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>
        <a
          href="mailto:eych.xander@gmail.com"
          className="rounded-full overflow-hidden w-full max-w-sm md:max-w-md lg:max-w-lg aspect-square block cursor-pointer transition-transform duration-500 hover:scale-[1.02] hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-primary/50"
        >
          <Image
            src="/Profilec.png"
            alt="Harold Catipay"
            width={1080}
            height={1080}
            className="w-full h-full object-cover transition-transform duration-700 ease-in-out hover:scale-105"
          />
        </a>
      </div>
    </section>
  );
}

