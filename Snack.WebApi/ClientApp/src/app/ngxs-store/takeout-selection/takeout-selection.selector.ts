import { TakeoutSelectionStateModel } from './takeout-selection.model';
import { TakeoutSelectionState } from './takeout-selection.state';
import { Selector } from '@ngxs/store';

export class TakeoutSelectionSelector {
  @Selector([TakeoutSelectionState])
  static getItemsToDisplay(state: TakeoutSelectionStateModel) {
    return state.itemsToDisplay;
  }

  @Selector([TakeoutSelectionState])
  static getLoading(state: TakeoutSelectionStateModel) {
    return state.loading;
  }
}
