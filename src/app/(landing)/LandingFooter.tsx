"use client"
import {Separator} from "@/components/ui/separator";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {QuoteIcon, TextQuoteIcon} from "lucide-react";

const testimonials:any[] = []
for(let i = 0; i < 5; i++) {
    testimonials.push({
        id: i+1,
        name: "Ashish Rout",
        title: "Software Engineer",
        description: "This is one of the best app I have ever used.",
    })
}

const LandingFooter = () => {

    return (
        <>
            <div className="text-center text-5xl font-bold font-serif bg-gradient-to-r from-teal-100 to-fuchsia-300 bg-clip-text text-transparent">Testimonials</div>
            <span className="flex justify-center"><Separator className="my-4 w-10/12 md:w-9/12" /></span>
            <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 mx-12 md:mx-20 pb-4">
                {
                    testimonials.map((item) =>(
                        <div key={item.id} className="hover:-translate-y-1 hover:drop-shadow-xl transition-all h-[20.7rem] w-[20.7rem] flex justify-center items-center rounded-3xl bg-gradient-to-r from-fuchsia-500 to-cyan-500">
                            <Card className="h-80 w-[20rem] bg-background ">
                                <CardHeader>
                                    <CardTitle>{item.name}</CardTitle>
                                    <CardDescription>{item.title}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="break-words mt-8 flex gap-x-1">
                                        <QuoteIcon className="rotate-180 h-8 w-8" />
                                        <span className="mt-2">{item.description}</span>
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    ))
                }
            </div>
        </>
    )
}
export default LandingFooter;