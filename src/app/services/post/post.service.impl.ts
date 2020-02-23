
import { APIServiceImpl, ServiceResponse } from '../api';

import { Posts, Post } from '@models';
import { PostService } from './post.service';

export default class PostServiceImpl extends APIServiceImpl implements PostService {
  static readonly RESOURCE = '/post';

  async getPosts(): Promise<ServiceResponse<Posts>> {
    try {
      const response = await this.get(PostServiceImpl.RESOURCE);
      const posts = new Posts(response.data)
      return new ServiceResponse<Posts>(posts);
    } catch (e) {
      return new ServiceResponse<Posts>(undefined, APIServiceImpl.parseError(e));
    }
  }

  async savePost(postData: Post): Promise<ServiceResponse<Post>> {
    try {
      const response = await this.post(PostServiceImpl.RESOURCE, postData);
      const post = new Post(response.data)
      return new ServiceResponse<Post>(post);
    } catch (e) {
      return new ServiceResponse<Post>(undefined, APIServiceImpl.parseError(e));
    }
  }

  async upVote(id: string): Promise<ServiceResponse<Post>> {
    try {
      const response = await this.patch(PostServiceImpl.RESOURCE + '/upvote', {id});
      const post = new Post(response.data)
      return new ServiceResponse<Post>(post);
    } catch (e) {
      return new ServiceResponse<Post>(undefined, APIServiceImpl.parseError(e));
    }
  }
}
