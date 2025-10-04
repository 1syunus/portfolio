"use client"
import React, {useState, useEffect} from "react"

export default function Portfolio() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        setIsVisible(true)
    }, [])

    const projects = [
        {
            title: "xOx XoX",
            year: "2025",
            type: "ML X Design"
        },
        {
            title: "Hime Filter",
            year: "2025",
            type: "Software",
        },
        {
            title: "Hoxoxod",
            year: "2025",
            type: "Typography",
        }
    ]

    return (
        <div className="min-h-screen bg-black text-white font-light overflow-hidden">
            {/* nav */}
            <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-6 flex justify-between items-center">
                <div className="text-xs tracking-[0.3em] opacity-60">PORTFOLIO</div>
                <div className="text-xs tracking-[0.3em] opacity-60">2025</div>
            </nav>

            {/* hero */}
            <div className="flex flex-col items-center justify-center min-h-screen px-8">
                <div 
                    className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                    >
                        <h1 className="text-7xl md:text-9xl font-extralight tracking-tight mb-4 text-center leading-none">
                            SUHAYB
                        </h1>
                        <p className="text-xs tracking-[0.4em] text-center opacity-40 mb-20">
                            CONTENT X DEVELOPEMENT
                        </p>
                </div>
            </div>

            {/* footer */}
            <footer className="px-8 py-6 border-t border-white border-opacity-10">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="text-xs tracking-[0.3em] opacity-30">
                        2025
                    </div>
                    <div className="text-xs tracking-[0.3em] opacity-30">
                        CRAFTED WITH PRECISION
                    </div>
                </div>
            </footer>
        </div>
    )
}