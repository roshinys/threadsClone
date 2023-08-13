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
    throw new Error(`Failed to create thread: ${err.message}`);
  }
}

export async function fetchPosts(pageNumber = 1, pageSize = 20) {
  try {
    connectToDB();
    // have no parents
    const skipAmount = (pageNumber - 1) * pageSize;
    const postsQuery = Thread.find({
      parentId: { $in: [null, undefined] },
    })
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(pageSize)
      .populate({ path: "author", model: User })
      .populate({
        path: "children",
        populate: {
          path: "author",
          model: User,
          select: "_id name parentId image",
        },
      });
    const totalPostsCount = await Thread.countDocuments({
      parentId: { $in: [null, undefined] },
    });
    const posts = await postsQuery.exec();
    const isNext = totalPostsCount > skipAmount + posts.length;
    return { posts, isNext };
  } catch (err: any) {
    throw new Error(`Failed to create thread: ${err.message}`);
  }
}
