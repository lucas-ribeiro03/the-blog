import { PostModel } from "@/models/post/post-model";
import { PostRepository } from "./post-repository";
import { drizzleDb } from "@/drizzle";
import { asyncDelay } from "@/utils/async-delay";
import { SIMULATE_WAIT_IN_MS } from "@/lib/constants";
import { PostTable } from "@/drizzle/schemas";
import { eq } from "drizzle-orm";

export class DrizzlePostRepository implements PostRepository {
  async findAllPublic(): Promise<PostModel[]> {
    await asyncDelay(SIMULATE_WAIT_IN_MS, true);
    const posts = await drizzleDb.query.posts.findMany({
      orderBy: (posts, { desc }) => desc(posts.createdAt),
      where: (posts, { eq }) => eq(posts.published, true),
    });

    return posts;
  }

  async findAll(): Promise<PostModel[]> {
    await asyncDelay(SIMULATE_WAIT_IN_MS, true);
    const posts = await drizzleDb.query.posts.findMany({
      orderBy: (posts, { desc }) => desc(posts.createdAt),
    });
    return posts;
  }

  async findBySlugPublic(slug: string): Promise<PostModel> {
    await asyncDelay(SIMULATE_WAIT_IN_MS, true);
    const post = await drizzleDb.query.posts.findFirst({
      where: (posts, { and, eq }) =>
        and(eq(posts.published, true), eq(posts.slug, slug)),
    });

    if (!post) throw new Error("Post não encontrado");

    return post;
  }

  async findById(id: string): Promise<PostModel> {
    const post = await drizzleDb.query.posts.findFirst({
      where: (posts, { eq }) => eq(posts.id, id),
    });

    if (!post) throw new Error("Post não encontrado");

    return post;
  }
  async create(post: PostModel): Promise<PostModel> {
    const postExists = await drizzleDb.query.posts.findFirst({
      where: (posts, { or, eq }) =>
        or(eq(posts.id, post.id), eq(posts.slug, post.slug)),
      columns: { id: true },
    });
    if (!!postExists) {
      throw new Error("Post com ID ou Slug já existe");
    }

    await drizzleDb.insert(PostTable).values(post);
    return post;
  }

  async delete(id: string): Promise<PostModel> {
    const post = await drizzleDb.query.posts.findFirst({
      where: (posts, { eq }) => eq(posts.id, id),
    });
    if (!post) {
      throw new Error("Post não existe");
    }

    await drizzleDb.delete(PostTable);
    return post;
  }

  async update(
    id: string,
    newPostData: Omit<PostModel, "id" | "slug" | "createdAt" | "updatedAt">
  ): Promise<PostModel> {
    const oldPost = await drizzleDb.query.posts.findFirst({
      where: (post, { eq }) => eq(post.id, id),
    });

    if (!oldPost) {
      throw new Error("Post não existe");
    }

    const updatedAt = new Date().toISOString();
    const updatedPost = {
      author: newPostData.author,
      content: newPostData.content,
      coverImageUrl: newPostData.coverImageUrl,
      excerpt: newPostData.excerpt,
      published: newPostData.published,
      title: newPostData.title,
      updatedAt,
    };

    await drizzleDb
      .update(PostTable)
      .set(updatedPost)
      .where(eq(PostTable.id, id));

    return {
      ...oldPost,
      ...updatedPost,
    };
  }
}

// (async () => {
//   const posts = new DrizzlePostRepository();
//   return await posts.findAllPublic();
// })();
