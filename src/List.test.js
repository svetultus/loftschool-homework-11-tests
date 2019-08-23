// Компонент List - список
// Напишите для него тесты.
// Компонент позволяет добавлять элементы в список.
// При добавлении нового элемента тексовое поле очищается.

// При клике на элементы списка они удаляются.

// Убедитесь, что вы протестировали всю функциональнось.

import React from "react";
import ReactDOM from "react-dom";
import List from "./List";
import renderer from "react-test-renderer";
import { render, fireEvent } from "@testing-library/react";
const domTestingLib = require("@testing-library/dom");
const { queryHelpers } = domTestingLib;
const queryByTagName = (...args) => queryHelpers.queryAllByTagName(...args);

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<List />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe("List", () => {
  it("соответсвует snapshot'у", () => {
    expect(renderer.create(<List />)).toMatchSnapshot();
  });

  it("добавляет значение input в List", () => {
    const wrapper = render(<List />);

    fireEvent.change(wrapper.queryByTestId("input"), {
      target: { value: "1000 чертей" }
    });
    fireEvent.click(wrapper.queryByTestId("button"));
    expect(wrapper.queryByText("1000 чертей")).toBeTruthy;
    expect(wrapper.queryByTestId("list").children.length).toBe(1);
    expect(wrapper.queryByTestId("input").value).toBe("");
    fireEvent.change(wrapper.queryByTestId("input"), {
      target: { value: "2000 чертей" }
    });
    fireEvent.click(wrapper.queryByTestId("button"));
    expect(wrapper.queryByText("2000 чертей")).toBeTruthy;
    expect(wrapper.queryByTestId("input").value).toBe("");
  });

  it("не добавляет пустое значение input в List", () => {
    const wrapper = render(<List />);

    fireEvent.change(wrapper.queryByTestId("input"), {
      target: { value: "" }
    });
    fireEvent.click(wrapper.queryByTestId("button"));
    expect(wrapper.queryByTestId("list").children.length).toBe(0);
  });

  it("удаляет элемент li при клике", () => {
    const wrapper = render(<List />);
    fireEvent.change(wrapper.queryByTestId("input"), {
      target: { value: "1000 чертей" }
    });
    fireEvent.click(wrapper.queryByTestId("button"));
    fireEvent.click(wrapper.queryByText("1000 чертей"));
    expect(wrapper.queryByText("1000 чертей")).toBeFalsy();
  });
});
