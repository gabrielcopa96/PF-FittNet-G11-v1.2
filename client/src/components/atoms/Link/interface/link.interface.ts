import { PropsWithChildren } from "react";

export type LinkSize = "sm" | "md" | "lg" | "xl";

export interface LinkProps extends PropsWithChildren {
    onNavigate?: string;
    size?: LinkSize;
}