import Chat from "@/components/cards/Chat";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

async function Page({ params }: { params: { id: string } }) {
  const user = await currentUser();
  if (!user) {
    return null;
  }
  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) {
    redirect("/onboarding");
  }
  const chatUserInfo = await fetchUser(params.id);
  if (!chatUserInfo) {
    redirect("/");
  }
  return (
    <section className="absolute inset-0 bg-dark-2 flex flex-col py-20">
      <Chat username={chatUserInfo.username} image={chatUserInfo.image} />
    </section>
  );
}

export default Page;
