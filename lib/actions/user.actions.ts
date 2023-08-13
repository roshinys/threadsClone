"use server";

import User from "../model/user.model";
import { connectToDB } from "../mongoose";
import { revalidatePath } from "next/cache";

interface Params {
  userId: String;
  username: string;
  name: string;
  bio: string;
  image: string;
  path: string;
}

export async function updateUser({
  userId,
  bio,
  name,
  path,
  username,
  image,
}: Params): Promise<void> {
  connectToDB();
  try {
    await User.findOneAndUpdate(
      { id: userId },
      {
        username: username.toLowerCase(),
        image,
        bio,
        name,
        onboarded: true,
      },
      { upsert: true }
    );
    if (path === "/profile/edit") {
      revalidatePath(path);
    }
  } catch (err: any) {
    throw new Error(`Failed to create/update user: ${err.message}`);
  }
}

export async function fetchUser(userId: String) {
  try {
    connectToDB();
    const user = await User.findOne({ id: userId });
    // .populate({
    //   path: "communities",
    //   model: Community,
    // });
    return user;
  } catch (err: any) {
    throw new Error(`Failed to fetch user: ${err.message}`);
  }
}
