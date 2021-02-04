import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import ContactForm from "./components/ContactForm";

test("renders App without crashing", () => {
  render(<App />);
});

test('User can fill out and submit form', async () => {
  render(<ContactForm />);

  const firstNameInput = screen.getByLabelText(/first name/i);
  const lastNameInput = screen.getByLabelText(/last name/i);
  const emailInput = screen.getByLabelText(/email/i);
  const messageInput = screen.getByLabelText(/message/i);

  fireEvent.change(firstNameInput, { target:{ value: 'Justin', name:'firstName'}});
  fireEvent.change(lastNameInput, { target:{ value: 'Mavity', name:'lastName'}});
  fireEvent.change(emailInput, { target:{ value: 'justinmavity1021@gmail.com', name:'email'}});
  fireEvent.change(messageInput, { target:{ value: 'My test message', name:'message'}});

  const button = screen.getByRole('button');
  fireEvent.click(button);

  await waitFor(() => {
    expect(screen.getByText(/justin/i)).toBeInTheDocument();
  })
  await waitFor(() => {
    expect(screen.getByText(/mavity/i)).toBeInTheDocument();
  })
  await waitFor(() => {
    expect(screen.getByText(/justinmavity1021@gmail.com/i)).toBeInTheDocument();
  })
  await waitFor(() => {
    expect(screen.getByText(/My test message/i)).toBeInTheDocument();
  })
})