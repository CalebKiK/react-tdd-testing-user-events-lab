import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import App from "../App";

// Portfolio Elements
test("displays a top-level heading with the text `Hi, I'm _______`", () => {
  render(<App />);

  const topLevelHeading = screen.getByRole("heading", {
    name: /hi, i'm/i,
    exact: false,
    level: 1,
  });

  expect(topLevelHeading).toBeInTheDocument();
});

test("displays an image of yourself", () => {
  render(<App />);

  const image = screen.getByAltText("My profile pic");

  expect(image).toHaveAttribute("src", "https://via.placeholder.com/350");
});

test("displays second-level heading with the text `About Me`", () => {
  render(<App />);

  const secondLevelHeading = screen.getByRole("heading", {
    name: /about me/i,
    level: 2,
  });

  expect(secondLevelHeading).toBeInTheDocument();
});

test("displays a paragraph for your biography", () => {
  render(<App />);

  const bio = screen.getByText(/lorem ipsum/i);

  expect(bio).toBeInTheDocument();
});

test("displays the correct links", () => {
  render(<App />);

  const githubLink = screen.getByRole("link", {
    name: /github/i,
  });
  const linkedinLink = screen.getByRole("link", {
    name: /linkedin/i,
  });

  expect(githubLink).toHaveAttribute(
    "href",
    expect.stringContaining("https://github.com")
  );

  expect(linkedinLink).toHaveAttribute(
    "href",
    expect.stringContaining("https://linkedin.com")
  );
});

// Newsletter Form - Initial State
test("the form includes text inputs for name and email address", () => {
  render(<App />);
  const nameInput = screen.getByLabelText(/name/i);
  const emailInput = screen.getByLabelText(/email/i);

  expect(nameInput).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
  expect(nameInput).toHaveAttribute("type", "text");
  expect(emailInput).toHaveAttribute("type", "email");
});

test("the form includes three checkboxes to select areas of interest", () => {
  render(<App />);

  const sportsCheckbox = screen.getByLabelText(/sports/i);
  const musicCheckbox = screen.getByLabelText(/music/i);
  const technologyCheckbox = screen.getByLabelText(/technology/i);

  expect(sportsCheckbox).toBeInTheDocument();
  expect(musicCheckbox).toBeInTheDocument();
  expect(technologyCheckbox).toBeInTheDocument();

  expect(sportsCheckbox).toHaveAttribute("type", "checkbox");
  expect(musicCheckbox).toHaveAttribute("type", "checkbox");
  expect(technologyCheckbox).toHaveAttribute("type", "checkbox");
});

test("the checkboxes are initially unchecked", () => {
  render(<App />);

  const sportsCheckbox = screen.getByLabelText(/sports/i);
  const musicCheckbox = screen.getByLabelText(/music/i);
  const technologyCheckbox = screen.getByLabelText(/technology/i);

  expect(sportsCheckbox).not.toBeChecked();
  expect(musicCheckbox).not.toBeChecked();
  expect(technologyCheckbox).not.toBeChecked();
});

// Newsletter Form - Adding Responses
test("the page shows information the user types into the name and email address form fields", () => {
  render(<App />);

  const nameInput = screen.getByLabelText(/name/i);
  const emailInput = screen.getByLabelText(/email/i);

  userEvent.type(nameInput, "John Doe");
  userEvent.type(emailInput, "johndoe@example.com");

  expect(nameInput.value).toBe("John Doe");
  expect(emailInput.value).toBe("johndoe@example.com");
});

test("checked status of checkboxes changes when user clicks them", () => {
  render(<App />);

  const sportsCheckbox = screen.getByLabelText(/sports/i);
  const musicCheckbox = screen.getByLabelText(/music/i);
  const technologyCheckbox = screen.getByLabelText(/technology/i);

  userEvent.click(sportsCheckbox);
  userEvent.click(musicCheckbox);

  expect(sportsCheckbox).toBeChecked();
  expect(musicCheckbox).toBeChecked();
  expect(technologyCheckbox).not.toBeChecked();

  userEvent.click(sportsCheckbox);
  userEvent.click(technologyCheckbox);

  expect(sportsCheckbox).not.toBeChecked();
  expect(musicCheckbox).toBeChecked();
  expect(technologyCheckbox).toBeChecked();
});

test("a message is displayed when the user clicks the Submit button", () => {
  render(<App />);
  const nameInput = screen.getByLabelText(/name/i);
  const emailInput = screen.getByLabelText(/email/i);
  const submitButton = screen.getByRole("button", { name: /submit/i });

  userEvent.type(nameInput, "Jane Doe");
  userEvent.type(emailInput, "janedoe@example.com");

  userEvent.click(submitButton);

  const successMessage = screen.getByText(/thank you for signing up,/i);
  const confirmationEmail = screen.getByText(/we've sent a confirmation email to/i);

  expect(successMessage).toBeInTheDocument();
  expect(confirmationEmail).toBeInTheDocument();
});

// test('includes a list of the user\'s interests in the message as well', () => {
//   render(<App />);

//   const nameInput = screen.getByLabelText(/name/i);
//   const emailInput = screen.getByLabelText(/email/i);
//   const sportsCheckbox = screen.getByLabelText(/sports/i);
//   const musicCheckbox = screen.getByLabelText(/music/i);
//   const technologyCheckbox = screen.getByLabelText(/technology/i);
//   const submitButton = screen.getByRole('button', { name: /submit/i });

//   userEvent.type( nameInput, "Alex Smith");
//   userEvent.type( emailInput, "alex.smith@example.com");

//   userEvent.click(sportsCheckbox);
//   userEvent.click(technologyCheckbox);

//   userEvent.click(submitButton);

//   const successMessage = screen.getByText(/thank you for signing up, alex smith!/i);
//   expect(successMessage).toBeInTheDocument();

//   const confirmationEmail = screen.getByText(/we've sent a confirmation email to alex.smith@example.com./i);
//   expect(confirmationEmail).toBeInTheDocument();

//   const sportsInterest = screen.getAllByText(/sports/i);
//   const technologyInterest = screen.getAllByText(/technology/i);
//   const musicInterest = screen.queryAllByText(/music/i);

//   expect(sportsInterest).toBeInTheDocument();
//   expect(technologyInterest).toBeInTheDocument();
//   expect(musicInterest).not.toBeInTheDocument();
// });
