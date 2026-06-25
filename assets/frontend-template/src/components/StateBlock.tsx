import type { ViewState } from "../App";
import { Button } from "./Button";

type StateBlockProps = {
  state: Extract<ViewState, "loading" | "empty" | "error">;
  onReset?: () => void;
};

const stateCopy = {
  loading: {
    title: "Loading fresh picks",
    body: "A compact skeleton keeps layout dimensions stable while content arrives.",
  },
  empty: {
    title: "No matching media yet",
    body: "Try a broader query or reset filters to continue browsing.",
  },
  error: {
    title: "Content could not load",
    body: "Explain the cause, preserve the layout, and offer a clear recovery action.",
  },
};

export function StateBlock({ state, onReset }: StateBlockProps) {
  const copy = stateCopy[state];
  return (
    <section className={`state-block state-block--${state}`} role={state === "error" ? "alert" : "status"}>
      <div aria-hidden="true" className="state-block__mark" />
      <h2>{copy.title}</h2>
      <p>{copy.body}</p>
      {onReset ? <Button onClick={onReset}>Reset view</Button> : null}
    </section>
  );
}
