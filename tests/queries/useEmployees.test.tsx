import { describe, it, expect, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEmployees } from "../../src/core/hooks/useEmployees";
import { NotificationProvider } from "../../src/core/context/NotificationContext";
import { BrowserRouter } from "react-router-dom";
import * as businessStore from "../../src/core/store/business.store";
import { employeeService } from "../../src/core/services/employeeService";

// ====================================
// CONFIGURACIÓN DE MOCKS
// ====================================

/**
 * Mock 1: Zustand Store
 * Este mock simula el store de Zustand que provee el ID del negocio.
 * Cuando el código real llame a useBusinessStore(), recibirá este objeto simulado.
 */
const createMockStore = (
  initialState: Partial<businessStore.BusinessState>
) => {
  const store = vi.fn(() => initialState);
  vi.spyOn(businessStore, "useBusinessStore").mockImplementation(store);
  return store;
};

/**
 * Mock 2: Servicio de Empleados
 * Simulamos el servicio que hace las llamadas a la API.
 * Cuando el código llame a employeeService.getEmployeesByBusinessId(),
 * en lugar de hacer una llamada HTTP real, devolverá estos datos de prueba.
 */
const mockGetEmployees = vi.fn().mockResolvedValue({
  data: [
    {
      id: 1,
      user: {
        name: "Juan Pérez",
        email: "juan@example.com",
      },
    },
    {
      id: 2,
      user: {
        name: "Ana García",
        email: "ana@example.com",
      },
    },
  ],
});

vi.mock("../../src/core/services/employeeService", () => ({
  employeeService: {
    getEmployeesByBusinessId: () => mockGetEmployees(),
    saveEmployee: vi.fn().mockResolvedValue({ data: { id: 1 } }),
  },
}));

// ====================================
// CONFIGURACIÓN DEL WRAPPER
// ====================================

/**
 * Wrapper para los tests
 * Proporciona todos los providers necesarios para que el hook funcione:
 * 1. BrowserRouter: Para useNavigate
 * 2. QueryClientProvider: Para react-query
 * 3. NotificationProvider: Para las notificaciones
 */
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // Desactivamos los reintentos para que los tests sean más rápidos
      },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <NotificationProvider>{children}</NotificationProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

// ====================================
// TESTS
// ====================================

describe("useEmployees", () => {
  // Limpiamos el estado de los mocks antes de cada test
  beforeEach(() => {
    vi.clearAllMocks();
    createMockStore({ businessId: 1 });
  });

  it("should fetch and sort employees correctly", async () => {
    // 1. Renderizamos el hook con todos sus providers
    const { result } = renderHook(() => useEmployees(), {
      wrapper: createWrapper(),
    });

    // 2. Verificamos el estado inicial de carga
    expect(result.current.loadingEmployees).toBe(true);

    // 3. Esperamos a que la consulta se complete
    await waitFor(() => {
      expect(result.current.loadingEmployees).toBe(false);
    });

    // 4. Verificamos que se llamó al servicio con el businessId correcto
    expect(mockGetEmployees).toHaveBeenCalled();

    // 5. Verificamos los datos recibidos
    expect(result.current.employees).toHaveLength(2);
    expect(result.current.employees[0].user.name).toBe("Juan Pérez");
    expect(result.current.employees[1].user.name).toBe("Ana García");
  });

  it("should not fetch when businessId is not available", async () => {
    // 1. Sobrescribimos el mock para simular que no hay businessId
    createMockStore({ businessId: undefined });

    // 2. Renderizamos el hook
    const { result } = renderHook(() => useEmployees(), {
      wrapper: createWrapper(),
    });

    // 3. Verificamos que no se hicieron llamadas al servicio
    expect(mockGetEmployees).not.toHaveBeenCalled();

    // 4. Verificamos que tenemos un array vacío por defecto
    expect(result.current.employees).toHaveLength(0);
  });
});
