import { Form } from "../lib/components/Form.mjs";
import { FormField } from "../lib/components/Form";

function App() {
	const fields: FormField[] = [
		{
			name: "username",
			messages: [{ text: "username", messageMatch: "valueMissing" }],
		},
	];

	return (
		<>
			<Form.Root {...{ fields }} />
		</>
	);
}

export default App;
