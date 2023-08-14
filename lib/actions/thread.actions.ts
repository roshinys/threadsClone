"use server";

import { revalidatePath } from "next/cache";
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

export async function fetchThreadById(id: string) {
  try {
    connectToDB();
    // Todo populate community
    const thread = await Thread.findById(id)
      .populate({
        path: "author",
        model: User,
        select: "_id id name image",
      })
      .populate({
        path: "children",
        populate: [
          {
            path: "author",
            model: User,
            select: "_id id parentId name image",
          },
          {
            path: "children",
            model: Thread,
            populate: {
              path: "author",
              model: User,
              select: "_id id name parentId image",
            },
          },
        ],
      })
      .exec();
    return thread;
  } catch (err: any) {
    throw new Error(`Failed to fetch thread: ${err.message}`);
  }
}

export async function addCommentToThread({
  threadId,
  thread,
  currentUserId,
  pathname,
}: {
  threadId: string;
  thread: string;
  currentUserId: string;
  pathname: string;
}) {
  try {
    const originalThread = await Thread.findById(threadId);
    if (!originalThread) {
      throw new Error("No thread found");
    }
    const commentThread = await new Thread({
      text: thread,
      author: currentUserId,
      parentId: threadId,
    });
    await commentThread.save();
    originalThread.children.push(commentThread._id);
    await originalThread.save();
    revalidatePath(pathname);
  } catch (err: any) {
    throw new Error(`Failed to fetch thread: ${err.message}`);
  }
}
