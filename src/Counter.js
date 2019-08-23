import React, { useState } from "react";

export function useCounter(initial = 0) {
  const [count, setCount] = useState(initial);

  const increment = () => {
    setCount(count => count + 1);
  };

  const decrement = () => {
    setCount(count => count - 1);
  };
  return { count, increment, decrement };
}

export const Counter = () => {
  let { count, increment, decrement } = useCounter(0);

  return (
    <>
      <div data-testid="counter" className="t-counter">
        {count}
      </div>
      <button
        data-testid="btn-increment"
        className="t-btn-increment"
        onClick={increment}
      >
        Increment
      </button>
      <button
        data-testid="btn-decrement"
        className="t-btn-decrement"
        onClick={decrement}
      >
        Decrement
      </button>
    </>
  );
};
// export default Counter;
