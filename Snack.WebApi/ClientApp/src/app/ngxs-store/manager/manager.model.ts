export class ManagerStateModel {
  accessData: ManagerAccessModel[];
  selectedOption: string;
}

export class ManagerAccessModel {
  displayName: string;
  route: string;
  backgroundCss: string;
}
