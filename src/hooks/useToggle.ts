import { useState } from "react";

export function useToggle(initialState?: boolean) {
	const [value, setValue] = useState(!!initialState);

	function toggle() {
		setValue(!value);
	}

	return {
		value,
		toggle,
	};
}