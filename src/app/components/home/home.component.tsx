
import * as React from 'react';

import { AppProps, DependencyInjector } from '@helpers';
import { ComponentViewState } from '@helpers';

import { HomeProps } from './home.props';
import { HomeState } from './home.state';

import './home.styles.css';
type HomeComponentProps = HomeProps & AppProps;

class HomeComponent extends React.Component<HomeComponentProps, HomeState> {
  constructor(props: HomeComponentProps) {
    super(props);
    this.state = {
      componentState: ComponentViewState.DEFAULT,
      title: "",
      content: "",
      submitted: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
    switch (e.target.id) {
      case 'title':
        this.setState({ title: e.target.value });
        break;
      case 'content':
        this.setState({ content: e.target.value });
        break;
    }
  }

  async handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    this.setState({ submitted: true });

    const { title, content } = this.state;
    if (title && content) {
      this.setState({
        componentState: ComponentViewState.LOADING,
      });

      let response = await this.props.postService.savePost({ title, content });
      
      if (response.hasData()
        && response.data) {
        this.setState({
          componentState: ComponentViewState.LOADED,
        });
        this.props.history.push('/posts');
      } else {
        this.setState({
          componentState: ComponentViewState.ERROR,
          error: response.error,
        });
      }
    }
  }

  render(): React.ReactNode {
    const { componentState, title, content, submitted, error } = this.state;
    const { translation } = this.props;
    const isLoading = componentState === ComponentViewState.LOADING;
    const isError = componentState === ComponentViewState.ERROR;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="title">{translation.t('POST_TITLE')}</label>
            <input type="text" onChange={this.handleChange} id="title" />
            {submitted && !title &&
              <div className="text-error">{translation.t('POST_TITLE_INVALID')}</div>
            }
          </div>
          <br />
          <div>
            <label htmlFor="content"></label>
            <textarea onChange={this.handleChange} placeholder="Content " id="content" ></textarea>
            {submitted && !content &&
              <div className="text-error">{translation.t('POST_CONTENT_INVALID')}</div>
            }
          </div>
          <br />
          <button>Publish</button>

        </form>
        {
          isLoading && <span>{translation.t('LABEL_PUBLISHING_POST')}</span>
        }
        {
          isError &&
          <div> {error} </div>
        }
      </div>
    );
  }
}

export default DependencyInjector(HomeComponent);
