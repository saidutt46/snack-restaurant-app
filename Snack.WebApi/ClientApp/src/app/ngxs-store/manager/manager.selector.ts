import { ManagerStateModel } from './manager.model';
import { Selector } from '@ngxs/store';
import { ManagerState } from './manager.state';

export class ManagerStateSelector {

  @Selector([ManagerState])
  static getManagerAccessDetails(state: ManagerStateModel) {
    return state.accessData;
  }
}
