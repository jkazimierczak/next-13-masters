import React from "react";
import { cn } from "@/lib/utils";

type ScreenMarginLayoutProps = {
	children: React.ReactNode;
	className?: string;
};

export function ScreenMarginLayout({ children, className }: ScreenMarginLayoutProps) {
	return <div className={cn("px-5 md:px-12 lg:px-24", className)}>{children}</div>;
}
