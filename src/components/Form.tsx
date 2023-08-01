import * as React from "react";
import * as RadixForm from "@radix-ui/react-form";
import clsx, { ClassValue } from "clsx";

// * Fields
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
}

// * Props
interface RootProps extends React.ComponentProps<typeof RadixForm.Root> {
    fields: FormField[];
    sharedFieldProps?: InputProps;
}
interface InputProps
    extends Omit<
            React.ComponentProps<typeof RadixForm.Field>,
            "id" | "className"
        >,
        FormField {}

// * Composite
interface FormComposition {
    Input: React.FC<InputProps>;
    Root: React.FC<RootProps>;
}

/**
 * Warning! Do not use outside of a form element. You should use Mudkip's default "Input" component instead.
 */
const FormInput: FormComposition["Input"] = ({
	id,
	name,
	label = "",
	className = "",
	placeholder = "",
	messages = [],
	messageClassName,
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
			{...{
				id,
				name,
				className: clsx(className),
				placeholder,
				...props,
			}}
		>
			<RadixForm.Label>{label || capitalizedName}</RadixForm.Label>
			<RadixForm.Control>Yo!</RadixForm.Control>
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

const FormRoot: React.FC<RootProps> = ({ fields, ...props }, ref) => {
	return (
		<RadixForm.Root {...{ ref, ...props }}>
			{fields.map(({ id, name, ...props }) => (
				<FormInput key={id || name} {...{ id, name, ...props }} />
			))}
		</RadixForm.Root>
	);
};

const Form: FormComposition = {
	Root: FormRoot,
	Input: FormInput,
};

export { Form, FormField, RootProps, InputProps };
