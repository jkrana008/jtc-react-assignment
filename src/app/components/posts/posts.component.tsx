import * as React from 'react';
import Moment from 'react-moment';

import { Post } from '@models';
import { AppProps, DependencyInjector } from '@helpers';

import { ComponentViewState } from '@helpers';
import { PostsState } from './posts.state';
import { PostsProps } from './posts.props';

import './posts.style.css';

type PostsComponentProps = PostsProps & AppProps;

class PostsComponent extends React.Component<PostsComponentProps, PostsState>{
    constructor(props: PostsComponentProps) {
        super(props);
        this.state = {
            componentState: ComponentViewState.DEFAULT
        }
        this.fetchPosts = this.fetchPosts.bind(this);
        this.upVote = this.upVote.bind(this);
    }

    async upVote(): Promise<void> {
        let id = this.state.post ? this.state.post.id : '';
        const response = await this.props.postService.upVote(id);
        this.setState({ post: response.data });
    }

    async fetchPosts(): Promise<void> {
        this.setState({
            componentState: ComponentViewState.LOADING,
        });
        const response = await this.props.postService.getPosts();
        if (response.hasData()
            && response.data) {
            this.setState({
                componentState: ComponentViewState.LOADED,
                posts: response.data,
            });
        } else {
            this.setState({
                componentState: ComponentViewState.ERROR,
                error: response.error,
            });
        }
    }

    async componentDidMount(): Promise<void> {
        this.fetchPosts();
    }

    formatDate(date: string) {

    }

    render(): React.ReactNode {
        const { componentState, posts, error, post } = this.state;
        const { translation } = this.props;

        const isLoaded = componentState === ComponentViewState.LOADED;
        const isLoading = componentState === ComponentViewState.LOADING;
        const isError = componentState === ComponentViewState.ERROR;

        return (
            <div>
                <h3>
                    {translation.t('LABLE_POSTS')}
                </h3>
                <br /><br />
                {
                    isLoading && <span>{translation.t('LABEL_LOADING_POSTS')}</span>
                }
                {
                    isLoaded && posts && !post &&
                    <div className="posts-list" >
                        {
                            posts.posts.map((el: Post): JSX.Element => {
                                return (
                                    <div key={el.id}>
                                        <p onClick={() => {
                                            console.log('Posts:', posts);
                                            this.setState({ post: el })
                                        }}>{el.title} - ({el.votes})</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                }
                {
                    isLoaded && post &&
                    <div>
                        <button onClick={() => this.setState({ post: undefined })}>Back</button>
                        <h1>{post.title}</h1>
                        <p>{post.content}</p>
                        <p><Moment format="DD/MM/YYYY HH:mm A">{post.createdAt}</Moment></p>
                        <p>{post.votes} vote{post.votes && post.votes > 1 ? 's' : ''} <a href="javascript:void(0)" onClick={this.upVote}>Vote Now</a></p>
                    </div>
                }
                {
                    isError &&
                    <div> {error} </div>
                }
            </div>
        );
    }
}

export default DependencyInjector(PostsComponent);
