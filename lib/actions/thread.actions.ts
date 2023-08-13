"use server";

import Thread from "../model/thread.model";
import User from "../model/user.model";
import { connectToDB } from "../mongoose";

interface Params {
  text: string;
  author: String;
  communityId: string | null;
  path: string;
}

export async function createThread({
  text,
  author,
  communityId,
  path,
}: Params) {
  try {
    connectToDB();
    console.log(text);
    const createdThread = await Thread.create({
      text,
      author,
      community: null,
    });
    console.log("hope");
    //update user model
    await User.findByIdAndUpdate(author, {
      $push: { threads: createdThread._id },
    });
  } catch (err: any) {
    console.log(err);
    throw new Error(`Failed to create thread: ${err.message}`);
  }
}
