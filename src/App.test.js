import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import App from "./App";
import Item from "./components/item";

beforeEach(() => {
  jest.spyOn(global, 'fetch').mockImplementation((url) => {
    return Promise.resolve({
      json: () => Promise.resolve(url.includes('provinces') ?
      [
        {
          "name": "Ontario",
          "capital": "Toronto",
          "flagUrl": "https://upload.wikimedia.org/wikipedia/commons/8/88/Flag_of_Ontario.svg"
        },
        {
          "name": "Quebec",
          "capital": "Quebec City",
          "flagUrl": "https://upload.wikimedia.org/wikipedia/commons/5/5f/Flag_of_Quebec.svg"
        },
        {
          "name": "Nova Scotia",
          "capital": "Halifax",
          "flagUrl": "https://upload.wikimedia.org/wikipedia/commons/c/c0/Flag_of_Nova_Scotia.svg"
        },
        {
          "name": "New Brunswick",
          "capital": "Fredericton",
          "flagUrl": "https://upload.wikimedia.org/wikipedia/commons/f/fb/Flag_of_New_Brunswick.svg"
        },
        {
          "name": "Manitoba",
          "capital": "Winnipeg",
          "flagUrl": "https://upload.wikimedia.org/wikipedia/commons/c/c4/Flag_of_Manitoba.svg"
        },
        {
          "name": "British Columbia",
          "capital": "Victoria",
          "flagUrl": "https://upload.wikimedia.org/wikipedia/commons/b/b8/Flag_of_British_Columbia.svg"
        },
        {
          "name": "Prince Edward Island",
          "capital": "Charlottetown",
          "flagUrl": "https://upload.wikimedia.org/wikipedia/commons/d/d7/Flag_of_Prince_Edward_Island.svg"
        },
        {
          "name": "Saskatchewan",
          "capital": "Regina",
          "flagUrl": "https://upload.wikimedia.org/wikipedia/commons/b/bb/Flag_of_Saskatchewan.svg"
        },
        {
          "name": "Alberta",
          "capital": "Edmonton",
          "flagUrl": "https://upload.wikimedia.org/wikipedia/commons/f/f5/Flag_of_Alberta.svg"
        },
        {
          "name": "Newfoundland and Labrador",
          "capital": "St. John\"s",
          "flagUrl": "https://upload.wikimedia.org/wikipedia/commons/d/dd/Flag_of_Newfoundland_and_Labrador.svg"
        }
      ] : [
        {
          "name": "Northwest Territories",
          "capital": "Yellowknife",
          "flagUrl": "https://upload.wikimedia.org/wikipedia/commons/c/c1/Flag_of_the_Northwest_Territories.svg"
        },
        {
          "name": "Yukon",
          "capital": "Whitehorse",
          "flagUrl": "https://upload.wikimedia.org/wikipedia/commons/6/69/Flag_of_Yukon.svg"
        },
        {
          "name": "Nunavut",
          "capital": "Iqaluit",
          "flagUrl": "https://upload.wikimedia.org/wikipedia/commons/9/90/Flag_of_Nunavut.svg"
        }
      ])
    });
  });
});

// Existing test case
test("renders App component", () => {
  render(<App />);
  const appElement = screen.getByText("Hello Canada");
  expect(appElement).toBeInTheDocument();
});

test('Fetches provinces data and verifies Province Names Are Rendered', async () => {
  render(<App />);
  await waitFor(() => {
    expect(screen.getByText('Ontario')).toBeInTheDocument();
    expect(screen.getByText('Quebec')).toBeInTheDocument();
    expect(screen.getByText('Nova Scotia')).toBeInTheDocument();
    expect(screen.getByText('New Brunswick')).toBeInTheDocument();
    expect(screen.getByText('Manitoba')).toBeInTheDocument();
    expect(screen.getByText('British Columbia')).toBeInTheDocument();
    expect(screen.getByText('Prince Edward Island')).toBeInTheDocument();
    expect(screen.getByText('Saskatchewan')).toBeInTheDocument();
    expect(screen.getByText('Alberta')).toBeInTheDocument();
    expect(screen.getByText("Newfoundland and Labrador")).toBeInTheDocument();
  });
});

test('Fetches provinces data and validates Rendering and Source URLs of Province Flags', async () => {
  render(<App />);
  await waitFor(() => {
    expect(screen.getByAltText("Ontario's Flag")).toHaveAttribute('src', "https://upload.wikimedia.org/wikipedia/commons/8/88/Flag_of_Ontario.svg");
    expect(screen.getByAltText("Quebec's Flag")).toHaveAttribute('src', "https://upload.wikimedia.org/wikipedia/commons/5/5f/Flag_of_Quebec.svg");
    expect(screen.getByAltText("Nova Scotia's Flag")).toHaveAttribute('src', "https://upload.wikimedia.org/wikipedia/commons/c/c0/Flag_of_Nova_Scotia.svg");
    expect(screen.getByAltText("New Brunswick's Flag")).toHaveAttribute('src', "https://upload.wikimedia.org/wikipedia/commons/f/fb/Flag_of_New_Brunswick.svg");
    expect(screen.getByAltText("Manitoba's Flag")).toHaveAttribute('src', "https://upload.wikimedia.org/wikipedia/commons/c/c4/Flag_of_Manitoba.svg");
    expect(screen.getByAltText("British Columbia's Flag")).toHaveAttribute('src', "https://upload.wikimedia.org/wikipedia/commons/b/b8/Flag_of_British_Columbia.svg");
    expect(screen.getByAltText("Prince Edward Island's Flag")).toHaveAttribute('src', "https://upload.wikimedia.org/wikipedia/commons/d/d7/Flag_of_Prince_Edward_Island.svg");
    expect(screen.getByAltText("Saskatchewan's Flag")).toHaveAttribute('src', "https://upload.wikimedia.org/wikipedia/commons/b/bb/Flag_of_Saskatchewan.svg");
    expect(screen.getByAltText("Alberta's Flag")).toHaveAttribute('src', "https://upload.wikimedia.org/wikipedia/commons/f/f5/Flag_of_Alberta.svg");
    expect(screen.getByAltText("Newfoundland and Labrador's Flag")).toHaveAttribute('src', "https://upload.wikimedia.org/wikipedia/commons/d/dd/Flag_of_Newfoundland_and_Labrador.svg");
  });
});

test('Fetches territories data and renders items correctly', async () => {
  render(<App />);
  fireEvent.click(screen.getByText('Territories'));
  await waitFor(() => {
    expect(screen.getByText('Northwest Territories')).toBeInTheDocument();
    expect(screen.getByText('Yukon')).toBeInTheDocument();
    expect(screen.getByText('Nunavut')).toBeInTheDocument();
    expect(screen.getByAltText("Northwest Territories's Flag")).toHaveAttribute('src', "https://upload.wikimedia.org/wikipedia/commons/c/c1/Flag_of_the_Northwest_Territories.svg");
    expect(screen.getByAltText("Yukon's Flag")).toHaveAttribute('src', "https://upload.wikimedia.org/wikipedia/commons/6/69/Flag_of_Yukon.svg");
    expect(screen.getByAltText("Nunavut's Flag")).toHaveAttribute('src', "https://upload.wikimedia.org/wikipedia/commons/9/90/Flag_of_Nunavut.svg");
  });
});

test("Ensures capital names are not shown initially in Item component", () => {
  const mockData = {
    name: "Ontario",
    capital: "Toronto",
    flagUrl: "https://upload.wikimedia.org/wikipedia/commons/8/88/Flag_of_Ontario.svg"
  };

  render(
    <Item 
      name={mockData.name} 
      capital={mockData.capital} 
      flagUrl={mockData.flagUrl}
    />
  );

  const capitalElement = screen.queryByText(mockData.capital);
  expect(capitalElement).not.toBeInTheDocument();
});

test('Toggles capital name on button click', () => {
  const mockData = {
    name: "Ontario",
    capital: "Toronto",
    flagUrl: "https://upload.wikimedia.org/wikipedia/commons/8/88/Flag_of_Ontario.svg"
  };
  render(<Item name={mockData.name} capital={mockData.capital} flagUrl={mockData.flagUrl} />);
  fireEvent.click(screen.getByRole('button'));
  expect(screen.getByText(mockData.capital)).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button'));
  expect(screen.queryByText(mockData.capital)).not.toBeInTheDocument();
});