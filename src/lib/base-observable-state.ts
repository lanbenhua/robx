import { getComputeReactionStackHead } from '../computed/computed-reaction';
import { getGlobalReaction } from '../observer/reaction';
import { enterWaitingTasksSet } from './batch-dispatch';
import { BaseReaction } from './base-reaction';
import { isInAction } from '../action';
import { isInOnlyComputed } from './computed-utils';

export class BaseObservableState {
  protected displayName: string;
  private reactions = new Map<PropertyKey, Set<BaseReaction>>();
  protected keyCollected = new Set();

  constructor(displayName: string) {
    this.displayName = displayName;
  }

  protected addReaction(key: PropertyKey, r: BaseReaction) {
    if (!r) return;
    if (!this.reactions.has(key)) this.reactions.set(key, new Set());
    this.reactions.get(key).add(r);
  }

  public dispatch(key: PropertyKey) {
    /**
     * if the `key` hasn't been Collected yet, it means
     * this `dispatch` happens during value initialize stage
     * like:
     *   @observable
     *   name = 'yaguang';
     *   @observable
     *   age = 18;
     */
    const isInitializing = !this.hasCollected(key);
    if (isInitializing) return;

    if (!isInAction()) {
      throw new Error(
        `When changing an observable data \`${this.displayName}${
          typeof key === 'string' ? `.${key}` : ''
        }\` which has been used in an observer, please wrap an \`@action\` decorator`
      );
    }

    this.beCarefulThisIsADangerousDispatch(key);
  }

  /**
   * @description
   * - this is a dangerous dispatch that without an `isInaction` checking
   * - please only call this api when you are very clear about the disptach senario
   * - Presently, we only call `beCarefulThisIsADangerousDispatch` in `computed` case without `isInAction` checking
   */
  public beCarefulThisIsADangerousDispatch(key: PropertyKey) {
    // console.log('dispatch key ==>', key);
    this.reactions.get(key)?.forEach((c) => {
      if (c.hasObservableState(this)) return enterWaitingTasksSet(c);
      this.reactions.get(key).delete(c);
    });
  }

  protected hasCollected(key: PropertyKey) {
    return this.keyCollected.has(key);
  }

  public initializeStageCollectKey(key: PropertyKey) {
    if (this.keyCollected.has(key)) return;
    this.keyCollected.add(key);
  }

  public collect(key: PropertyKey) {
    this.initializeStageCollectKey(key);
    this.collectComputedReaction(key);
    if (isInOnlyComputed()) return;
    this.collectRenderReaction(key);
  }

  private collectRenderReaction(key: PropertyKey) {
    const reaction = getGlobalReaction();
    if (!reaction) return;
    // console.log('collect key ==>', key);
    reaction.addObservableState(this);
    this.addReaction(key, reaction);
  }

  private collectComputedReaction(key: PropertyKey) {
    const reactionComputer = getComputeReactionStackHead();
    if (!reactionComputer) return;
    reactionComputer.addObservableState(this);
    this.addReaction(key, reactionComputer);
  }
}
