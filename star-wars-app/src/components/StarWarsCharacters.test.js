import React from "react";
import { render, fireEvent, wait } from "@testing-library/react";
import { getData as mockGetData } from "../api";
import StarWarsCharacters from "./StarWarsCharacters";

jest.mock("../api");

test("renders StarWarsCharacters, with functional prev and next buttons, making an api call", async () => {
  mockGetData.mockResolvedValueOnce({
    results: [
      {
        name: "Adrian",
        height: "tall",
        mass: "dense",
        hair_color: "brown",
        skin_color: "brown"
      }
    ],
    next: "next url",
    previous: "prev url"
  });

  const { getByText } = render(<StarWarsCharacters />);

  const nextButton = getByText(/next/i);
  const prevButton = getByText(/previous/i);

  fireEvent.click(nextButton);
  fireEvent.click(prevButton);

  expect(mockGetData).toHaveBeenCalledTimes(1);

  await wait(() => expect(getByText(/adrian/i)));
});