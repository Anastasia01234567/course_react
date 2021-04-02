import React from "react";
import { create } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe("ProfileStatus Component", () => {
    test("status from props should be in the status", () => {
        const component = create(<ProfileStatus status={"it-kamasutra.com"} />);
        const instance = component.getInstance();
        expect(instance.state.status).toBe('it-kamasutra.com');
    });
});