import { render, screen } from "../../utils/test-utils";
import { LoadingCircularProgress } from "../../../src/components/common/ui/loaders/LoadingCircularProgress";

describe("LoadingCircularProgress", () => {
  describe("when absolute prop is true", () => {
    it("should render in absolute position when loading is true", () => {
      render(<LoadingCircularProgress loading={true} absolute={true} />);
      expect(screen.getByTestId("loading-circular-progress")).toBeInTheDocument();
    });

    it("should not render when loading is false", () => {
      render(<LoadingCircularProgress loading={false} absolute={true} />);
      expect(screen.queryByTestId("loading-circular-progress")).not.toBeInTheDocument();
    });
  });

  describe("when absolute prop is false", () => {
    it("should render as modal when loading is true", () => {
      render(<LoadingCircularProgress loading={true} absolute={false} />);
      // Modal should be in the document
      const modal = screen.getByRole("presentation");
      expect(modal).toBeInTheDocument();
      // CircularProgress should be visible
      const circularProgress = screen.getByRole("progressbar");
      expect(circularProgress).toBeInTheDocument();
    });

    it("should not render modal when loading is false", () => {
      render(<LoadingCircularProgress loading={false} absolute={false} />);
      expect(screen.queryByRole("presentation")).not.toBeInTheDocument();
      expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
    });
  });

  describe("when absolute prop is not provided", () => {
    it("should default to modal mode when loading is true", () => {
      render(<LoadingCircularProgress loading={true} />);
      // Should behave same as absolute={false}
      const modal = screen.getByRole("presentation");
      expect(modal).toBeInTheDocument();
      const circularProgress = screen.getByRole("progressbar");
      expect(circularProgress).toBeInTheDocument();
    });

    it("should not render when loading is false", () => {
      render(<LoadingCircularProgress loading={false} />);
      expect(screen.queryByRole("presentation")).not.toBeInTheDocument();
      expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
    });
  });
});
