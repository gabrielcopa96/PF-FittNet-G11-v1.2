import type { PropsWithChildren } from "react";

// TYPE OF SIZE FOR TEXT COMPONENT
export type TitleSize = 'sm' | 'md' | 'lg' | 'xl';
export type TitleWeight = 'light' | 'normal' | 'bold';

// PROPS FOR TEXT COMPONENT - INTERFACE
export interface TitleProps extends PropsWithChildren {
    size?: TitleSize;
    color?: string;
    weight?: TitleWeight;
}