import {Post} from './post.model';
import * as _ from 'lodash';

export class Posts {
  readonly posts: Post[] = [];
  constructor(data: Post[]) {
    this.posts = [];
    _.forEach(data, (item): void => {
      this.posts.push(new Post(item));
    });
  }
}