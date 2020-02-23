export class Post {
    id?: string;
    title: string;
    content: string;
    votes?: number;
    createdAt?: string;
    constructor(post: any) {
      this.id = post.id;
      this.title = post.title;
      this.content = post.content;
      this.votes = post.votes;
      this.createdAt = post.created_at;
    }
  }
  