import { render as rtlRender, RenderOptions, screen, within, fireEvent, waitFor } from "@testing-library/react";
import { ReactElement } from "react";
import { TestProviders } from "./TestProviders";

const render = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => rtlRender(ui, { wrapper: TestProviders, ...options });

// Export solo las funciones que necesitamos
export {
  render,
  screen,
  within,
  fireEvent,
  waitFor
};
