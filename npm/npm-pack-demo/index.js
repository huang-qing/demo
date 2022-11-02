import { clone } from "lodash-es";

const obj = { name: "a", title: "标题" };

const objClone = clone(obj);

console.log(objClone);
