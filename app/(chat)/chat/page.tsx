import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import UserCard from "@/components/cards/UserCard";

async function Page() {
  const user = await currentUser();
  if (!user) {
    return null;
  }
  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) {
    redirect("/onboarding");
  }
  const result = await fetchUsers({
    userId: user.id,
    searchString: "",
  });

  return (
    <section className="main-container">
      <div className="w-full max-w-4xl">
        <h1 className="head-text mb-10">Chat</h1>
        <div className="mt-14 flex flex-col gap-9">
          {result.users.length == 0 ? (
            <p className="no-result">No Users</p>
          ) : (
            result.users.map((person) => {
              return (
                <UserCard
                  key={person.id}
                  id={person.id}
                  name={person.name}
                  username={person.username}
                  imgUrl={person.image}
                  personType="User"
                  isChat={true}
                />
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}

export default Page;
