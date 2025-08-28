import { PostModel } from "@/models/post/post-model";
import { PostRepository } from "./post-repository";
import { resolve } from "path";
import { readFile } from "fs/promises";

const ROOT_DIR = process.cwd();
const JSON_POSTS_FILE_PATH = resolve(
  ROOT_DIR,
  "src",
  "db",
  "seed",
  "posts.json"
);

export class JsonPostRepository implements PostRepository {
  private async readFromDisk(): Promise<PostModel[]> {
    const jsonContent = await readFile(JSON_POSTS_FILE_PATH, "utf-8");
    const parsedJson = JSON.parse(jsonContent);
    return parsedJson;
  }

  async findAll(): Promise<PostModel[]> {
    return this.readFromDisk();
  }

  async findById(id: string): Promise<PostModel> {
    const posts = await this.findAll();
    const post = await posts.find((post) => post.id === id);
    if (!post) throw new Error("Post nao encontrado");
    return post;
  }
}
