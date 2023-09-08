"use client"

import Typewriter from 'typewriter-effect';
const LandingHeader = () => {
    return (
        <div>
            <div className="font-bold w-full flex flex-col items-center justify-center ">
                <div className="drop-shadow-2xl select-none ml-7 h-20 md:h-36 text-7xl md:text-9xl bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-transparent bg-clip-text w-fit">
                    <Typewriter
                        options={{
                            strings: ["Create", "Set", "Deploy"],
                            autoStart: true,
                            loop: true,
                        }}
                    />
                </div>
                <span className="select-none text-muted-foreground text-sm md:text-xl italic p-0 m-0 md:mr-2">your
                    <span className="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-pink-500 relative inline-block ml-[0.55rem] mr-1">
                        <span className="relative text-white">youtube</span>
                    </span>
                    videos</span>
            </div>
        </div>
    )
}
export default LandingHeader;