export interface IMenuItem {
  id: string;
  icon?: string;
  text: string;
  children?: IMenuItem[];
}
