import PageProvider from "./PageProvider";

const Page = async ({params, searchParams}: {params: null, searchParams: {id: string}}) => {


  // const response = await fetch("/api/title-desc", {cache: "no-cache"})
  // const data = await response.json();
  const data:{title?: string, desc?: string} = {}
  let imgData
  try {
    const imgResponse = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/awsS3/thumbnail?id=${searchParams.id}`, {cache: "no-store"});
    imgData = await imgResponse.json();
  } catch (error) {
    console.log((error as Error).message)
  }

  return (
    <div>
      <PageProvider id={searchParams.id} imgUrl={imgData?.url} title={data?.title} description={data?.desc} />
    </div>
  )
}

export default Page;