import * as React from "react";
import * as RadixForm from "@radix-ui/react-form";
import clsx, { ClassValue } from "clsx";

// * General Types *
type Value = React.ComponentProps<typeof RadixForm.Control>["value"];

// * Fields *
interface FormField {
    id?: string;
    label?: string;
    name: string;
    className?: ClassValue;
    placeholder?: string;
    messages?: {
        text: string;
        messageMatch: RadixForm.FormMessageProps["match"];
    }[];
    messageClassName?: ClassValue;
    type: RadixForm.FormControlProps["type"];
}

// * Props *
interface FormProps
    extends Omit<React.ComponentProps<typeof RadixForm.Root>, "onSubmit"> {
    fields: FormField[];
    sharedFieldProps?: InputProps;
    onSubmit: (
        event: React.FormEvent<HTMLFormElement>,
        formValues: FieldValues
    ) => void;
}

interface InputProps
    extends Omit<
            React.ComponentProps<typeof RadixForm.Field>,
            "id" | "className"
        >,
        FormField {
    value: Value;
    setValue: (
        newValue: Value
    ) => void;
}

/**
 * Warning! Do not use outside of a form element. You should use Mudkip's default "Input" component instead.
 */
const Input: React.FC<InputProps> = ({
    id,
    name,
    label = "",
    className = "",
    placeholder = "",
    messages = [],
    messageClassName,
    type,
    setValue,
    value,
    ...props
}) => {
    const reactGeneratedId = React.useId();

    id ||= reactGeneratedId;
    const capitalizedName = [
        name.split("")[0]?.toUpperCase(),
        ...name.split("").slice(1),
    ];

    return (
        <RadixForm.Field
            id={id}
            name={name}
            className={clsx(className)}
            placeholder={placeholder}
            {...props}
        >
            <RadixForm.Label>{label || capitalizedName}</RadixForm.Label>
            <RadixForm.Control
                type={type}
                onChange={(e) => setValue(e.target.value)}
                value={value}
            />
            {messages.map(({ text, messageMatch }) => (
                <RadixForm.Message
                    match={messageMatch}
                    className={clsx(messageClassName)}
                    key={id || name}
                >
                    {text}
                </RadixForm.Message>
            ))}
            <RadixForm.ValidityState>
                {(props) => <>{props?.valid}</>}
            </RadixForm.ValidityState>
        </RadixForm.Field>
    );
};

interface withFieldNamesAsKeys<FieldValueType> {
    [name: string | number]: FieldValueType;
}

type FieldValues = withFieldNamesAsKeys<Value>;

const Form: React.FC<FormProps> = ({
    fields,
    onSubmit,
    sharedFieldProps,
    ...props
}) => {
    const [values, setValues] = React.useState<FieldValues>(
        fields.reduce<FieldValues>((previousValue, field) => {
            (previousValue as FieldValues)[field.name] = field.name;

            return {};
        }, {})
    );

    const handleSubmit = React.useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            onSubmit(e, values);
        },
        [onSubmit]
    );

    return (
        <RadixForm.Root onSubmit={handleSubmit} {...props}>
            {fields.map(({ id, name, ...props }) => (
                <Input
                    key={id || name}
                    id={id}
                    name={name}
                    {...{ ...props, ...(sharedFieldProps || {}) }}
                    setValue={(newValue) =>
                        setValues((values) => {
                            values[name] = newValue;

                            return values;
                        })
                    }
                    value={values[name]}
                />
            ))}
            <input type="submit" value="submit" />
        </RadixForm.Root>
    );
};

export { Form, FormField, FormProps, FieldValues };
