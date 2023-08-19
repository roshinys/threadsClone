"use client";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

function ChatPageHeader({
  username,
  imgUrl,
}: {
  username: string;
  imgUrl: string;
}) {
  return (
    <div className="flex-grow bg-green-500 text-light-2 flex space-x-4 h-9 items-center ">
      <Link href="/" className="pl-3">
        <Image src="/assets/back.svg" alt="Back" width={24} height={24} />
      </Link>
      <div className="flex h-7">
        <Image
          src={imgUrl}
          alt={username}
          width={24}
          height={24}
          className="rounded-full ml-2"
        />
        <span className="ml-4">@{username}</span>
      </div>
    </div>
  );
}

export default ChatPageHeader;
