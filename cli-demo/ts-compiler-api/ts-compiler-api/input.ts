// console.log("into");

// type IsString<T> = T extends string ? "Yes" : "No";

// type res = IsString<true>;
// type res2 = IsString<"aaa">;

export type IOnInputChange = (event: { value: string | number }) => void;
export type IOnInputPressEnter = (event: { value: string | number }) => void;
export type IOnInputsearch = (event: { value: string | number }) => void;

export interface IInputEvents {
  change: IOnInputChange;
  pressEnter: IOnInputPressEnter;
  search: IOnInputsearch;
}
