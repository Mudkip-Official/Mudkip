import * as React from "react";
import { Decorator } from "@storybook/react";
import "./decorators.css";

const withFont: Decorator = (Story) => (
    <div className="@dec/withFont">
        <Story />
    </div>
);

export default withFont;
