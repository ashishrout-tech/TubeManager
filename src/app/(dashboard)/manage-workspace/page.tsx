import prismadb from "@/lib/prismadb";
import { cookies } from "next/headers";
import { redirect } from 'next/navigation'
import PageProvider from "./PageProvider";

const Page = async ({ params, searchParams }: { params: null, searchParams: { id: string } }) => {
   let dbData: {adminEmail: string, editor: {email: string}[]} | null;
    try {
        dbData = await prismadb.workspace.findUnique({
           where: {
               id: searchParams.id
           },
           select: {
               adminEmail: true,
               editor: { select: { email: true } }
           }
       })

       const credentials = cookies().get("credentials");
       const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user`, {
           headers: {
               'Cookie': `${credentials?.name!}=${credentials?.value!}`
           },
           cache: "no-store"
       })
       if(!response.ok) throw new Error((await response.json()).error)
       const data = await response.json();
       const adminData = data.userData;
       if(!dbData || !dbData.adminEmail || !adminData.email) {
           throw new Error ("Invalid Request")
       }

       if(dbData.adminEmail !== adminData.email){
           throw new Error ("Invalid Request");
       }
   } catch (err: any) {
       console.log(err.message);
       redirect('/')
       return;
   }



   return <div className=" h-screen w-screen flex items-center justify-center">
      <div className=" w-fit h-4/6 mt-32 md:mt-12 flex flex-col">
         <span className=" text-2xl">Editors</span>
         <p className=" text-muted-foreground text-sm">users who have editing access of this workspace</p>
         <PageProvider wId={searchParams.id} editor={dbData?.editor}/>
      </div>
   </div>
}

export default Page;