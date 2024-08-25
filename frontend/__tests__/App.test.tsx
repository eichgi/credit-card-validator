import {afterEach, describe, expect, it, vi} from "vitest";
import {cleanup, fireEvent, render, screen, waitFor} from '@testing-library/react'
import App from "../src/App";
import {userEvent} from "@testing-library/user-event";

describe('App testing', () => {

  afterEach(cleanup);

  it('should render the component', () => {
    render(<App/>);
    expect(screen.getByRole('heading', {level: 1, name: 'Credit Card Validation'})).toBeDefined();
  });

  it('should mark the inputted credit card as valid', async () => {
    const inputCreditCard = "4485275742308327";
    const outputText = "VALID CARD NUMBER";

    const mockedResponse = {
      "creditCard": inputCreditCard,
      isValid: true,
    };

    const fetchSpy = vi.spyOn(window, 'fetch');
    fetchSpy.mockImplementation(() => {
      return Promise.resolve({
        json: () => Promise.resolve(mockedResponse)
      } as Response);
    });

    render(<App/>);

    const user = userEvent.setup();
    const creditCardInput = screen.getByTestId('input-cc') as HTMLInputElement;
    await user.type(creditCardInput, inputCreditCard);
    expect(creditCardInput.value).toContain(inputCreditCard);

    const button = screen.getByTestId('button-validate-cc');
    fireEvent.click(button);

    await waitFor(
      () => expect(screen.findByText(`/${outputText}/i`)).toBeDefined(),
      {timeout: 5000}
    );

    expect(fetchSpy).toHaveBeenCalled();
  });

  it('should mark the inputted credit card as invalid', async () => {
    const inputCreditCard = "4485275742308328";
    const outputText = "INVALID CARD NUMBER";

    const mockedResponse = {
      "creditCard": inputCreditCard,
      isValid: false,
    };

    const fetchSpy = vi.spyOn(window, 'fetch');
    fetchSpy.mockImplementation(() => {
      return Promise.resolve({
        json: () => Promise.resolve(mockedResponse)
      } as Response);
    });

    render(<App/>);

    const user = userEvent.setup();
    const creditCardInput = screen.getByTestId('input-cc') as HTMLInputElement;
    await user.type(creditCardInput, inputCreditCard);
    expect(creditCardInput.value).toContain(inputCreditCard);

    const button = screen.getByTestId('button-validate-cc');
    fireEvent.click(button);

    await waitFor(
      () => expect(screen.findByText(`/${outputText}/i`)).toBeDefined(),
      {timeout: 5000}
    );

    expect(fetchSpy).toHaveBeenCalled();
  });
});