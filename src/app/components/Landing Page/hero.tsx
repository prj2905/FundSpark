"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";


export default function Hero() {
    const router = useRouter();
    return (<div className="hero">
       <div className="cta text-center py-12 px-4">
  <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
    Bring Your Ideas to Life — <span className="text-[#364f6b]">Together.</span>
  </h1>

  <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-base sm:text-lg">
    FundSpark empowers creators to turn bold visions into reality — with the support of backers who believe in their potential.
  </p>

  <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
    <button
      className="bg-[#364f6b] text-white px-8 py-3 rounded-lg text-base font-semibold shadow-md hover:bg-[#2c3e50] hover:scale-105 transition transform duration-200"
      onClick={() => router.push("/create")}
    >
      🚀 Start a Campaign
    </button>
    <button
      className="border border-[#364f6b] text-[#364f6b] px-8 py-3 rounded-lg text-base font-semibold hover:bg-[#f5f5f5] hover:scale-105 transition transform duration-200"
      onClick={() => router.push("/projects-list")}
    >
      🔍 Explore Projects
    </button>
  </div>

  <p className="text-sm text-gray-500 mt-6">Join 1,200+ creators launching this month</p>
</div>

        <div className="illustration"><Image src={"/hero2.png"} width={900} height={200} alt="Hero-pic" /></div>

    </div>

    );
}