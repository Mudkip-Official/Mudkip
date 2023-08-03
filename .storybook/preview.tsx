import type { Preview } from "@storybook/react";
import * as React from "react";
import withFont from "../src/decorators/withFont";

const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: "^on[A-Z].*" },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
    },
    decorators: [withFont],
};

export default preview;
