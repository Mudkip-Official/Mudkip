import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
    stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
    addons: [
        "@storybook/addon-viewport",
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-interactions",
        "@storybook/addon-mdx-gfm",
        "@storybook/addon-a11y",
    ],
    // reactOptions: {
    //     fastRefresh: true,
    // },
    framework: {
        name: "@storybook/react-vite",
        options: {
            strictMode: true,
        },
    },
    docs: {
        autodocs: "tag",
    },
};
export default config;
