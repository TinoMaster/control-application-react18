import { handleFetchError } from "../../src/core/utilities/helpers/errorManager";

describe("ErrorManager", () => {
  test("should handle fetch error", () => {
    const error = new Error("Failed to fetch");
    console.log("error", error.message);
    const result = handleFetchError(error);
    expect(result.message).toBe(
      "No se ha podido establecer conexión con el servidor"
    );
    expect(result.status).toBe(503);
    expect(result.data).toBeUndefined();
  });
});
