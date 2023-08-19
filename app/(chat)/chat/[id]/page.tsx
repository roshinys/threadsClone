import SendMessage from "@/components/forms/SendMessage";
import ChatPageHeader from "@/components/shared/ChatPageHeader";

function Page() {
  return (
    <>
      <section className="chat-container ">
        <div className="w-full max-w-4xl text-light-2 flex-1 border border-white rounded">
          <ChatPageHeader />
        </div>
      </section>
      <SendMessage />
    </>
  );
}

export default Page;
