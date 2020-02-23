import {ComponentState} from '@helpers';

export interface HomeState extends ComponentState{
  title: string;
  content: string;
  submitted: boolean;
}
