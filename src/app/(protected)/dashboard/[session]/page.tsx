import { redirect } from "next/navigation";

type Props = {
    params: Promise<{ session: string }>;
}

const Page = async ({ params }: Props) => {
    const { session } = await params;
    // Redirect to canvas if someone lands directly on the session page
    redirect(`/dashboard/${session}/canvas`);
}

export default Page