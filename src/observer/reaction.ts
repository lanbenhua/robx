import { BaseReaction } from '../lib/base-reaction';

export class Reaction extends BaseReaction {
  public name: string;

  constructor(name: string) {
    super();
    this.name = name;
  }

  public render(originalRender: () => JSX.Element) {
    setGlobalReaction(this);
    this.clearDeps();
    try {
      return originalRender();
    } finally {
      setGlobalReaction(null);
    }
  }
}

let globalRender: BaseReaction = null;
const setGlobalReaction = (r: Reaction) => (globalRender = r);
export const getGlobalReaction = () => globalRender;
