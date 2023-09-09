import PageProvider from "./PageProvider";
import prismadb from "@/lib/prismadb";

const Page = async ({params, searchParams}: {params: null, searchParams: {id: string}}) => {

  const data = await prismadb.workspace.findUnique({
    where: {
      id: searchParams.id
    },
    select: {
      workspaceData: { select: { title: true, description: true } },
      isDeployed: true,
      adminEmail: true
    }
  })
  let imgData
  try {
    const imgResponse = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/awsS3/thumbnail?id=${searchParams.id}`, {cache: "no-store"});
    imgData = await imgResponse.json();
  } catch (error) {
    console.log((error as Error).message)
  }
  let title = data?.workspaceData.title;
  let description = data?.workspaceData.description;
  if(!title ) title = ""
  if(!description) description = ""

  return (
    <div>
      <PageProvider adminEmail={data?.adminEmail} id={searchParams.id} imgUrl={imgData?.url} preTitle={title} description={description} isDeployed={data?.isDeployed} />
    </div>
  )
}

export default Page;