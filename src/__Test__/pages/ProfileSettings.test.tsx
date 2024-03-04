import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import * as ItemBar from "../../components/ItemBar";

import ProfileSettings from "../../pages/ProfileSettings";

describe("Testing ProfileSettings page.", () => {
    test("Should render Itembar in profile settings page.", () => {
        // Arrange
        const mockComponent = jest.fn(() => <div data-testid="mockItembar">Mocked Itembar</div>);
        jest.spyOn(ItemBar, "default").mockImplementation(mockComponent);

        render(<ProfileSettings />);

        // Act
        const mockItembar = screen.getByTestId("mockItembar");

        // Assert
        expect(mockItembar).toBeInTheDocument();
    });
});
