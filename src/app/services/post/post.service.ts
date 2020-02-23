import { ServiceResponse } from "../api";
import { Posts, Post } from "@models";

export interface PostService {
  getPosts: () => Promise<ServiceResponse<Posts>>;
  savePost: (post: Post) => Promise<ServiceResponse<Post>>;
  upVote: (id: any ) => Promise<ServiceResponse<Post>>;

}