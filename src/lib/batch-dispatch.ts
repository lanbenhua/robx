import { BaseReaction } from '../lib/base-reaction';

const waitingRunReactions = new Set<BaseReaction>();

export const enterWaitingTasksSet = (reaction: BaseReaction) => {
  waitingRunReactions.add(reaction);
};

export const dispatchReactions = () => {
  waitingRunReactions.forEach((v) => {
    v.run();
  });
  waitingRunReactions.clear();
};
