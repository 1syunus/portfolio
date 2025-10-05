import React, {useState, useEffect} from "react"

interface Project {
    title: string
    year: string
    type: string
}

export default function Portfolio() {
    const [isVisible, setIsVisible] = useState<boolean>(false)
    const [activeProject, setActiveProject] = useState<number>(0)
    const [theme, setTheme] = useState<number>(0)
    const [isPulling, setIsPulling] = useState<boolean>(false)
    const [pullDistance, setPullDistance] = useState<number>(0)
    const [startY, setStartY] = useState<number>(0)

    const videos: string[] = [
        "/videos/bg-1.mp4",
    ]

    // theme calcs
    const isDark: boolean = theme === 0
    const isLight: boolean = theme === 1
    const hasVideo: boolean = theme >= 2
    const videoIndex: number = hasVideo ? theme - 2 : 0
    const currentVideo: string | null = hasVideo ? videos[videoIndex] : null

    const bgClass: string = isDark ? "bg-black" : isLight ? "bg-zinc-50" : "bg-black"
    const textClass: string = isDark || hasVideo ? "text-white" : "text-zinc-900"
    const lineClass: string = isDark || hasVideo ? "bg-white" : "bg-black"
    const borderClass: string = isDark || hasVideo ? "border-white" : "border-zinc-900"

    const opacityNav: string = isDark || hasVideo ? "opacity-60" : "opacity-70"
    const opacitySubtle: string = isDark || hasVideo ? "opacity-40" : "opacity-50"
    const opacityFaint: string = isDark || hasVideo ? "opacity-30" : "opacity-40"

    useEffect(() => {
        setIsVisible(true)
    }, [])

    const projects: Project[] = [
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

    // handlers
    const handlePullStart = (
        e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
    ): void => {
        setIsPulling(true)
        setPullDistance(0)

        const clientY: number = "touches" in e
            ? e.touches[0].clientY
            : e.clientY
        setStartY(clientY)
    }

    const handlePullMove = (e: MouseEvent | TouchEvent): void => {
        if (!isPulling) return

        const clientY: number = e.type.includes("touch")
            ? (e as TouchEvent).touches[0].clientY
            : (e as MouseEvent).clientY
        const distance: number = Math.max(0, Math.min(clientY - startY, 100))
        setPullDistance(distance)
    }

    const handlePullEnd = (): void => {
        if (!isPulling) return

        if (pullDistance > 60) {
            setTheme((prev: number) => prev >= 2 ? 0 : prev + 1)
        }

        setIsPulling(false)
        setPullDistance(0)
        setStartY(0)
    }

    useEffect((): (() => void) | undefined => {
        if (isPulling) {
            const moveHandler = (e: Event): void => handlePullMove(e as TouchEvent | MouseEvent)
            const endHandler = (): void => handlePullEnd()

            document.addEventListener("touchmove", moveHandler)
            document.addEventListener("touchend", endHandler)
            document.addEventListener("mousemove", moveHandler)
            document.addEventListener("mouseup", endHandler)

            return (): void => {
                document.removeEventListener("touchmove", moveHandler)
                document.removeEventListener("touchend", endHandler)
                document.removeEventListener("mousemove", moveHandler)
                document.removeEventListener("mouseup", endHandler)
            }
        }
    }, [isPulling, pullDistance])

    return (
        <div className={`min-h-screen ${bgClass} ${textClass} font-light overflow-hidden transition-colors duration-1000 ease-in`}>
            {/* nav */}
            <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-6 flex justify-between items-center">
                <div className={`text-xs tracking-[0.3em] ${opacityNav}`}>PORTFOLIO</div>
                <div className={`text-xs tracking-[0.3em] ${opacityNav}`}>2025</div>
            </nav>

            {/* hero */}
            <div className="flex flex-col items-center justify-center min-h-screen px-8">
                <div 
                    className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                    >
                        <h1 className="text-7xl md:text-9xl font-extralight tracking-tight mb-4 text-center leading-none">
                            SUHAYB
                        </h1>
                        <p className={`text-xs tracking-[0.4em] text-center ${opacitySubtle} mb-20`}>
                            CONTENT X DEVELOPEMENT
                        </p>
                </div>

                {/* interactive pull cord */}
                <div
                    className={`absolute top-96 left-1/2 -translate-x-1/2
                        flex flex-col items-center
                        px-8 py-8
                        cursor-grab select-none transition-all
                        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
                        `}
                    onTouchStart={handlePullStart}
                    onMouseDown={handlePullStart}
                >
                    {/* animated cord-line */}
                    <div
                        className={`w-px ${lineClass} ${isDark || hasVideo ? "opacity-20 bg-white" : "opacity-30"}
                            transition-all duration-300 ${!isPulling ? "animate-pulse" : ""}
                            `}
                        style={{
                            height: `${64 + pullDistance}px`,
                        }}    
                    ></div>

                    {/* spherical top */}
                    <div className={`w-4 h-4 rounded-full animate-pulse
                        ${lineClass} ${isDark || hasVideo ? "opacity-20 bg-white" : "opacity-30"}
                        transition-all duration-300
                        ${isPulling ? "scale-110" : "scale-100"}`}
                    ></div>

                    {/* pull indicator */}
                    {pullDistance > 0 && (
                        <div
                            className={`text-[10px] tracking-[0.3em] text-center mt-6 animate-pulse
                                ${isDark || hasVideo ? "opacity-40" : "opacity-55"}`}
                        >
                            {pullDistance > 60 ? "RELEASE" : "PULL"}
                        </div>
                    )}
                </div>
            </div>

            {/* projects grid */}
            <div className="px-8 md:px-20 py-32 max-w-7xl mx-auto">
                <div className={`grid grid-cols-1 md:grid-cols-3 gap-1 border-t ${borderClass} ${isDark || hasVideo ? "border-opacity-10" : "border-opacity-5"}`}>
                    {projects.map((project, idx) => (
                        <div
                            key={idx}
                            onMouseEnter={() => setActiveProject(idx)}
                            className={`border-b
                                ${borderClass}
                                ${isDark || hasVideo ? "border-opacity-10" : "border-opacity-5"} py-12 px-8 cursor-pointer group transition-all duration-300
                                ${isDark
                                    ? "hover:bg-white hover:bg-opacity-5"
                                    : isLight
                                    ? "hover:bg-black hover:bg-opacity-5"
                                    : "hover:bg-white hover:bg-opacity-10"}`}
                        >
                            <div className={`text-xs tracking-[0.3em] ${opacitySubtle} mb-4`}>
                                {project.type}
                            </div>
                            <h3 className="text-2xl md:text-3xl font-light tracking-tight mb-2
                                transition-all duration-300 group-hover:tracking-wide"
                            >
                                {project.title}
                            </h3>
                            <div className={`text-xs tracking-[0.3em] ${opacitySubtle}`}>
                                {project.year}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* contact section */}
            <div className={`px-8 md:px-20 py-32 border-t
                ${borderClass} ${isDark || hasVideo ? "border-opacity-30" : "border-opacity-20"}`}
                >
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div>
                        <h2 className="text-5xl md:text-7xl font-extralight tracking-tight mb-6">
                            LET'S TALK
                        </h2>
                        <p className={`text-xs tracking-[0.3em] ${opacitySubtle}`}>
                            AVAILABLE FOR SELECT PROJECTS
                        </p>
                    </div>
                    <div className="mt-12 md:mt-0 space-y-4 text-right">
                        <a
                            href="https://github.com/1syunus"
                            className={`block text-sm tracking-[0.2em]
                                opacity-60 hover:opacity-100 transition-opacity duration-300
                                ${isDark || hasVideo ? "opacity-60 hover:opacity-100" : "opacity-50 hover:opacity-100"}
                                `}
                        >
                            GITHUB
                        </a>
                        <a
                            href="linkedin.com/in/suhayb1"
                            className={`block text-sm tracking-[0.2em]
                                opacity-60 hover:opacity-100 transition-opacity duration-300
                                ${isDark || hasVideo ? "opacity-60 hover:opacity-100" : "opacity-50 hover:opacity-100"}
                                `}
                        >
                            LINKEDIN
                        </a>
                    </div>
                </div>
            </div>

            {/* footer */}
            <footer className={`px-8 py-6 border-t border-white border-opacity-10
                ${borderClass} ${isDark || hasVideo ? "border-opacity-10" : "border-opacity-5"}
                `}>
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className={`text-xs tracking-[0.3em] ${opacityFaint}`}>
                        2025
                    </div>
                    <div className={`text-xs tracking-[0.3em] ${opacityFaint}`}>
                        BUILT WITH TASTE
                    </div>
                </div>
            </footer>
        </div>
    )
}