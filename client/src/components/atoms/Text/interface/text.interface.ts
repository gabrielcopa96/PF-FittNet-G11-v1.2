import type { PropsWithChildren } from "react";

// TYPE OF SIZE FOR TEXT COMPONENT
export type TextSize = 'sm' | 'md' | 'lg' | 'xl';

// PROPS FOR TEXT COMPONENT - INTERFACE
export interface TextProps extends PropsWithChildren {
    size?: TextSize;
    color?: string;
}