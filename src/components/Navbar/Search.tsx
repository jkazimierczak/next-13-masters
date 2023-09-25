"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";

export function Search() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [inputValue, setInputValue] = useState(searchParams.get("query") || "");
	const debouncedValue = useDebounce(inputValue, 500);

	const createQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams();
			params.set(name, value);

			return params.toString();
		},
		[searchParams],
	);

	function goToSearchPage(query: string) {
		router.push(`/search?${createQueryString("query", query)}`);
	}

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		setInputValue(e.target.value);
	}

	function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
		if (e.key === "Enter") {
			goToSearchPage(inputValue);
		}
	}

	useEffect(() => {
		if (debouncedValue === "") return;

		goToSearchPage(debouncedValue);
	}, [debouncedValue]);

	return (
		<>
			<input
				type="text"
				value={inputValue}
				className="text-red-500"
				onKeyDownCapture={handleKeyDown}
				onChange={handleChange}
			/>
		</>
	);
}
