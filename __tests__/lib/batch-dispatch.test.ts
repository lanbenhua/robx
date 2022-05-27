import { enterWaitingTasksSet, dispatchReactions } from '../../src/lib/batch-dispatch';
import { BaseReaction } from '../../src/lib/base-reaction';

describe('batch-dispatch', () => {
  let runCounter = 0;
  beforeEach(() => {
    runCounter = 0;
  });

  test('enterWaitingTasksSet same reaction', () => {
    const br = new BaseReaction();
    br.setUpdate(() => {
      runCounter++;
    });
    enterWaitingTasksSet(br);
    enterWaitingTasksSet(br);
    enterWaitingTasksSet(br);
    enterWaitingTasksSet(br);
    dispatchReactions();
    expect(runCounter).toBe(1);
  });

  test('enterWaitingTasksSet ', () => {
    const br1 = new BaseReaction();
    br1.setUpdate(() => {
      runCounter++;
    });

    const br2 = new BaseReaction();
    br2.setUpdate(() => {
      runCounter++;
    });

    const br3 = new BaseReaction();

    enterWaitingTasksSet(br1);
    enterWaitingTasksSet(br2);
    enterWaitingTasksSet(br3);
    enterWaitingTasksSet(br1);
    dispatchReactions();
    expect(runCounter).toBe(2);
  });
});
