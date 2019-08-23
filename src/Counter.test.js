// Компонент Counter - простой счётчик
// Напишите для него тесты.
// Убедитесь, что вы протестировали всю функциональнось.
// Также проверьте что компонент рендерится верно, используя Snapshot тест.

// * Задание со звёздочкой - выполнять не обязательно

// Вынесите логику в хук и протестируйте его

import React from "react";
import ReactDOM from "react-dom";
import { Counter, useCounter } from "./Counter";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import { render } from "@testing-library/react";
import { renderHook, act } from "@testing-library/react-hooks";

// describe("Counter", () => {
//   it("renders without crashing", () => {
//     const div = document.createElement("div");
//     ReactDOM.render(<Counter />, div);
//     ReactDOM.unmountComponentAtNode(div);
//   });

//   const wrapper = shallow(<Counter />);

//   it("начальное значение счетчика = 0", () => {
//     expect(wrapper.find(".t-counter").text()).toEqual("0");
//   });

//   it("значение счетчика может быть отрицательным", () => {
//     wrapper.find(".t-btn-decrement").simulate("click");
//     expect(wrapper.find(".t-counter").text()).toEqual("-1");
//   });

//   it("отрицательное значение счетчика увеличивается до 0", () => {
//     wrapper.find(".t-btn-increment").simulate("click");
//     expect(wrapper.find(".t-counter").text()).toEqual("0");
//   });

//   it("при клике значение счетчика увеличивается на 1", () => {
//     wrapper.find(".t-btn-increment").simulate("click");
//     expect(wrapper.find(".t-counter").text()).toEqual("1");
//     wrapper.find(".t-btn-increment").simulate("click");
//     expect(wrapper.find(".t-counter").text()).toEqual("2");
//   });

//   it("при клике значение счетчика уменьшается на 1", () => {
//     wrapper.find(".t-btn-decrement").simulate("click");
//     expect(wrapper.find(".t-counter").text()).toEqual("1");
//     wrapper.find(".t-btn-decrement").simulate("click");
//     expect(wrapper.find(".t-counter").text()).toEqual("0");
//   });

//   it("соответсвует snapshot'у", () => {
//     expect(renderer.create(<Counter />)).toMatchSnapshot();
//   });
// });

describe("Counter", () => {
  it("renders without crashing", () => {
    const wrapper = render(<Counter />);
    expect(wrapper.getByTestId("counter").textContent).toEqual("0");
  });

  it("начальное значение счетчика = 0", () => {
    const wrapper = render(<Counter />);
    expect(wrapper.getByTestId("counter").textContent).toEqual("0");
  });

  it("значение счетчика может быть отрицательным", () => {
    const wrapper = render(<Counter />);
    wrapper.getByTestId("btn-decrement").click();
    expect(wrapper.getByTestId("counter").textContent).toEqual("-1");
  });

  it("при клике значение счетчика увеличивается на 1", () => {
    const wrapper = render(<Counter />);
    wrapper.getByTestId("btn-increment").click();
    expect(wrapper.getByTestId("counter").textContent).toEqual("1");
    wrapper.getByTestId("btn-increment").click();
    expect(wrapper.getByTestId("counter").textContent).toEqual("2");
  });

  it("при клике значение счетчика уменьшается на 1", () => {
    const wrapper = render(<Counter />);
    wrapper.getByTestId("btn-decrement").click();
    expect(wrapper.getByTestId("counter").textContent).toEqual("-1");
    wrapper.getByTestId("btn-decrement").click();
    expect(wrapper.getByTestId("counter").textContent).toEqual("-2");
  });

  it("соответсвует snapshot'у", () => {
    const wrapper = render(<Counter />);
    expect(renderer.create(<Counter />)).toMatchSnapshot();
  });
});

describe("hook useCounter", () => {
  it("Счетчик запускается с заданным значением", () => {
    const { result } = renderHook(() => useCounter(5));

    act(() => {
      result.current.increment();
    });
    expect(result.current.count).toEqual(6);
  });

  it("значение count увеличивается на 1 при вызове increment", () => {
    const { result } = renderHook(() => useCounter(0));

    act(() => {
      result.current.increment();
    });
    expect(result.current.count).toEqual(1);
  });

  it("значение count уменьшается на 1 при вызове decrement", () => {
    const { result } = renderHook(() => useCounter(0));

    act(() => {
      result.current.decrement();
    });
    expect(result.current.count).toEqual(-1);
  });
});
