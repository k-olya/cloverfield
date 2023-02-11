import reducer, {
  Cloverfield,
  MAX_SCORE,
  WAIT_TICKS,
  increment,
  update,
  reset,
  tick,
} from "./slice";

describe("cloverfield game slice", () => {
  const initialState: Cloverfield = {
    w: 2,
    h: 2,
    x: 0,
    y: 0,
    count: 0,
    ticks: 0,
    gameState: "initial",
  };
  it("should handle initial state", () => {
    expect(reducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("should handle increment", () => {
    const actual = reducer(initialState, increment());
    expect(actual.w).toEqual(3);
  });

  it("should update w/o increment when asked", () => {
    const actual = reducer(initialState, update());
    expect(actual.w).toEqual(2);
  });

  it("should stop increment after certain point", () => {
    let temp = reducer(initialState, increment());
    for (let i = 0; i < MAX_SCORE * 2; i++) {
      temp = reducer(temp, increment());
    }
    expect(temp.w).toEqual(MAX_SCORE + initialState.w);
  });

  it("should handle ticks", () => {
    let temp = reducer(initialState, increment());
    for (let i = 0; i < WAIT_TICKS; i++) {
      temp = reducer(temp, tick());
    }
    expect(temp.gameState).toEqual("finished");
  });

  it("should handle reset", () => {
    const temp = reducer(initialState, increment());
    const actual = reducer(temp, reset());
    expect(actual.w).toEqual(2);
  });
});
