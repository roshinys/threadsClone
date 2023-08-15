import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import ProfileHeader from "@/components/shared/ProfileHeader";

import { profileTabs } from "@/constants";
import Image from "next/image";
import ThreadsTab from "@/components/cards/ThreadsTab";
import SearchBar from "@/components/shared/SearchBar";
import UserCard from "@/components/cards/UserCard";
import Pagination from "@/components/shared/Pagination";

const Page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
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
    searchString: searchParams.q,
  });

  return (
    <section>
      <h1 className="head-text mb-10">Search</h1>
      <SearchBar routeType="search" />
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
              />
            );
          })
        )}
      </div>
      <Pagination
        path="search"
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={result.isNext}
      />
    </section>
  );
};

export default Page;