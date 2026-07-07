import { render, screen } from "@testing-library/react";
import Loading from "./index";

test("Debe mostrar el mensaje Verificando", () => {
  render(<Loading />);

  expect(screen.getByText(/Verificando/i)).toBeInTheDocument();
});