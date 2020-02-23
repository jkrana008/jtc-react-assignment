
import {UserService, AuthService, PostService} from '@services';
import i18next from 'i18next';
import {RouteComponentProps} from 'react-router';

export interface AppDependenciesProps {
  userService: UserService;
  authService: AuthService;
  postService: PostService;
  translation: i18next.i18n;
}

export interface AppProps extends RouteComponentProps, AppDependenciesProps {
}
