import ChatPageHeader from "@/components/shared/ChatPageHeader";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const DUMMY_CHAT = [
  {
    id: 1,
    isReceived: false,
    text: "hi",
  },
  {
    id: 2,
    isReceived: true,
    text: "hello",
  },
  {
    id: 3,
    isReceived: false,
    text: "How are you doing",
  },
  {
    id: 4,
    isReceived: true,
    text: "Great I guess",
  },
  {
    id: 5,
    isReceived: true,
    text: "what about you ",
  },
  {
    id: 6,
    isReceived: false,
    text: "Am Good",
  },
];

async function Page() {
  const user = await currentUser();
  if (!user) {
    return null;
  }
  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) {
    redirect("/onboarding");
  }
  return (
    <section className="absolute inset-0 bg-dark-2 flex flex-col py-20">
      <div>
        <ChatPageHeader username={userInfo.username} imgUrl={userInfo.image} />
      </div>
      <div className="h-20 bg-green-500 fixed bottom-0 left-0 w-full">
        Enter Message Here
      </div>
    </section>
  );
}

export default Page;
