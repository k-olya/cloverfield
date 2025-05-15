import reducer, {
  Haystack,
  MAX_SCORE,
  WAIT_TICKS,
  increment,
  reset,
  tick,
  setModifiers,
} from "./slice";

describe("haystack game slice", () => {
  // Get initial state from reducer's default state
  const initialState = reducer(undefined, { type: "unknown" });

  it("should handle initial state", () => {
    expect(reducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("should handle increment", () => {
    const actual = reducer(initialState, increment());
    expect(actual.w).toEqual(3);
  });

  it("should update w/o increment in headstart mode", () => {
    let temp = reducer(initialState, setModifiers(["headstart"]));
    // it should work without manual reset, but it doesn't for some reason
    temp = reducer(temp, reset());
    const actual = reducer(temp, increment());
    expect(actual.w).toEqual(temp.w);
  });

  it("should stop increment after certain point", () => {
    let temp = reducer(initialState, increment());
    for (let i = 0; i < MAX_SCORE * 2; i++) {
      temp = reducer(temp, increment());
    }
    expect(temp.w).toEqual(MAX_SCORE + initialState.w);
  });

  it("should reset after changing modifiers", () => {
    let temp = reducer(initialState, setModifiers(["headstart"]));
    // it should work without manual reset, but it doesn't for some reason
    temp = reducer(temp, reset());
    expect(temp.w).toEqual(MAX_SCORE + initialState.w);
  });

  it("should continue playing in normal mode", () => {
    let temp = reducer(initialState, increment());
    for (let i = 0; i < MAX_SCORE * 2; i++) {
      temp = reducer(temp, increment());
    }
    expect(temp.count).toEqual(MAX_SCORE * 2 + 1);
  });

  it("should stop playing in speedrun mode", () => {
    let temp = reducer(initialState, setModifiers(["speedrun"]));
    for (let i = 0; i < MAX_SCORE; i++) {
      temp = reducer(temp, increment());
    }
    expect(temp.gameState).toEqual("playing");
    temp = reducer(temp, increment());
    expect(temp.gameState).toEqual("finished");
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
