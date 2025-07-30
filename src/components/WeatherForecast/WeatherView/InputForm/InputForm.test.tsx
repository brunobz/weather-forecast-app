import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import InputForm from "./InputForm";

describe("InputForm", () => {
  const mockOnSubmit = vi.fn();

  beforeEach(() => {
    mockOnSubmit.mockReset();
  });

  it("renders the input and button", () => {
    render(<InputForm onSubmit={mockOnSubmit} isLoading={false} />);

    expect(screen.getByLabelText(/enter address/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /get forecast/i })
    ).toBeInTheDocument();
  });

  it("shows an error when submitting empty input", async () => {
    render(<InputForm onSubmit={mockOnSubmit} isLoading={false} />);

    const button = screen.getByRole("button", { name: /get forecast/i });
    await userEvent.click(button);

    expect(
      await screen.findByText(/Please enter a valid address./i)
    ).toBeInTheDocument();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it("calls onSubmit with the entered address", async () => {
    render(<InputForm onSubmit={mockOnSubmit} isLoading={false} />);

    const input = screen.getByPlaceholderText(
      /1360 S Blue Island Ave, Chicago, IL/i
    );
    await userEvent.type(input, "149 Mar do Leste, Florianópolis");

    const button = screen.getByRole("button", { name: /get forecast/i });
    await userEvent.click(button);

    expect(mockOnSubmit).toHaveBeenCalledWith(
      "149 Mar do Leste, Florianópolis"
    );
  });

  it("disables the input and button while loading", () => {
    render(<InputForm onSubmit={mockOnSubmit} isLoading={true} />);

    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button");

    expect(input).toBeDisabled();
    expect(button).toBeDisabled();
  });
});
