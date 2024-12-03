"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { NavBar } from "@/components";
import { useRouter } from "next/navigation";

const Main = () => {
  const refs = useRef([]);
  const lineRef = useRef(null);
  const router = useRouter();

  const addToRefs = (el) => {
    if (el && !refs.current.includes(el)) {
      refs.current.push(el);
    }
  };

  // gsap animations:
  useGSAP(() => {
    const timeline = gsap.timeline();

    timeline.from(refs.current, {
      opacity: 0,
      y: 40,
      duration: 0.5,
      stagger: 0.5,
    });

    timeline.to(lineRef.current, {
      width: "250px",
      duration: 0.5,
    });
  }, []);

  return (
    <div className="h-screen w-full bg-white">
      {/* Navbar */}
      <NavBar />

      {/* hero section */}
      <div className="h-[92vh] flex justify-center items-center flex-col gap-5">
        {/* top section */}
        <div className="">
          <h1 className="text-[40px] font-semibold text-center" ref={addToRefs}>
            Consistet Branding Made Effortless
          </h1>
          <p
            className="text-center w-[75%] m-auto text-animation"
            ref={addToRefs}
          >
            No Designers? No Problem ! BrandSync simplifies the process ,
            ensuring every prodcut shines with EG&apos;s logo, ready to use in
            seconds
          </p>
          <p
            className="bg-[#123845] w-[5px] rounded-full h-[3px] m-auto mt-3"
            ref={lineRef}
          ></p>
        </div>
        {/* bottom section */}
        <div>
          <button
            className="bg-[#123845] text-white px-4 py-2 rounded-md shadow-xl"
            onClick={() => router.push("/home")}
          >
            Create Your Logo
          </button>
        </div>
      </div>
    </div>
  );
};

export default Main;
