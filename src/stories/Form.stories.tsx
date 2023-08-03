import * as React from "react";
import { Form, FormField } from "../components/Form";
import { Meta, StoryFn } from "@storybook/react";

export default {
    title: "Form",
    component: Form,
    tags: ["autodocs"],
} satisfies Meta;

export const Newsletter: StoryFn<typeof Form> = (args) => <Form {...args} />;

Newsletter.args = {
    fields:[ {
        name: "email",
    },]
};
