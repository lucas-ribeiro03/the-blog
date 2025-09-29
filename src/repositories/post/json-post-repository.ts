import { PostModel } from "@/models/post/post-model";
import { PostRepository } from "./post-repository";
import { resolve } from "path";
import { readFile, writeFile } from "fs/promises";
import { SIMULATE_WAIT_IN_MS } from "@/lib/constants";

const ROOT_DIR = process.cwd();
const JSON_POSTS_FILE_PATH = resolve(
  ROOT_DIR,
  "src",
  "db",
  "seed",
  "posts.json"
);

export class JsonPostRepository implements PostRepository {
  private async simulateWait() {
    if (SIMULATE_WAIT_IN_MS <= 0) return;
    await new Promise((resolve) => setTimeout(resolve, SIMULATE_WAIT_IN_MS));
  }

  private async readFromDisk(): Promise<PostModel[]> {
    this.simulateWait();
    const jsonContent = await readFile(JSON_POSTS_FILE_PATH, "utf-8");
    const parsedJson = JSON.parse(jsonContent);
    const { posts } = parsedJson;
    return posts;
  }

  private async writeToDisk(posts: PostModel[]): Promise<void> {
    const jsonToString = JSON.stringify(posts, null, 2);
    await writeFile(JSON_POSTS_FILE_PATH, jsonToString, "utf-8");
  }

  async create(post: PostModel): Promise<PostModel> {
    const posts = await this.findAll();
    const checkIfPostExists = await posts.find(
      (savedPost) => savedPost.id === post.id || savedPost.slug === post.slug
    );

    if (checkIfPostExists) {
      throw new Error("Este post já existe na base dados");
    }

    if (!post.slug || !post.id) {
      throw new Error("Dados inválidos");
    }

    posts.push(post);
    await this.writeToDisk(posts);

    return post;
  }

  async findAllPublic(): Promise<PostModel[]> {
    const posts = await this.readFromDisk();
    const publicPosts = posts.filter((posts) => posts.published);
    return publicPosts;
  }

  async findAll(): Promise<PostModel[]> {
    const posts = await this.readFromDisk();
    return posts;
  }

  async findById(id: string): Promise<PostModel> {
    const posts = await this.findAllPublic();
    const post = posts.find((post) => post.id === id);
    if (!post) throw new Error("Post nao encontrado");
    return post;
  }

  async findBySlugPublic(slug: string): Promise<PostModel> {
    const posts = await this.findAllPublic();
    const post = posts.find((post) => post.slug === slug);
    if (!post) throw new Error("Post não encontrado");
    return post;
  }

  async update(
    id: string,
    newPostData: Omit<PostModel, "id" | "slug" | "createdAt" | "updatedAt">
  ): Promise<PostModel> {
    if (!id) {
      throw new Error("Dados inválidos");
    }

    const posts = await this.findAll();
    const postIndex = posts.findIndex((p) => p.id === id);
    const savedPost = posts[postIndex];

    if (postIndex < 0) {
      throw new Error("Post não existe");
    }

    const newPost = {
      ...savedPost,
      ...newPostData,
      updatedAt: new Date().toISOString(),
    };

    posts[postIndex] = newPost;
    await this.writeToDisk(posts);
    return newPost;
  }

  async delete(id: string): Promise<PostModel> {
    const posts = await this.findAll();
    const postIndex = posts.findIndex((p) => p.id === id);
    if (postIndex < 0) {
      throw new Error("Post não existe");
    }

    const postToDelete = posts[postIndex];
    posts.splice(postIndex, 1);
    await this.writeToDisk(posts);

    return postToDelete;
  }
}
