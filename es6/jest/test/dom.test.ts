import { describe, expect, test } from "@jest/globals";
import { renderHtml } from "../js/dom";

test("renderHtml", () => {
  renderHtml();
  expect(document.body.innerHTML).toMatchSnapshot();
});