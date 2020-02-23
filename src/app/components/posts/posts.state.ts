import {Posts, Post} from '@models';
import {ComponentState} from '@helpers';

export interface PostsState extends ComponentState {
  posts?: Posts;
  post?: Post;
}
