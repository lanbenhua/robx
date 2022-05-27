import * as H from 'history';
import { useHistory, useLocation, useParams } from 'react-router-dom';

interface INavigatorState {
  from: string;
}

class Navigate {
  private history: H.History;
  private location: H.Location;
  private params: Record<string, string>;

  public setNavigator() {
    this.history = useHistory();
    this.location = useLocation();
    this.params = useParams();
  }

  public getParams() {
    return this.params;
  }

  public getPreUrl() {
    return (this.history.location.state as INavigatorState)?.from;
  }

  public goto(link: string) {
    this.history.push(link, { from: this.location.pathname });
  }

  public goBack() {
    this.history.goBack();
  }

  public getRouterFirstPath(pathName = '') {
    return this.getRouterIndexPath(0, pathName);
  }

  public getRouterIndexPath(index: number, pathName = '') {
    return (pathName || this.location.pathname).split('/').filter((p) => !!p)[index];
  }
}

export const navigate = new Navigate();
