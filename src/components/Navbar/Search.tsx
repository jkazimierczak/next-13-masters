"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";
import { Input } from "@/components/ui/input";

export function Search() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [inputValue, setInputValue] = useState(searchParams.get("query") || "");
	const debouncedValue = useDebounce(inputValue, 500);

	function goToSearchPage(query: string) {
		router.push(`/search?query=${encodeURIComponent(query)}`);
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
		<Input
			role="searchbox"
			type="text"
			value={inputValue}
			className="text-black"
			onKeyDownCapture={handleKeyDown}
			onChange={handleChange}
		/>
	);
}
