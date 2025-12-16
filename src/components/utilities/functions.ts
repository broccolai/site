export const createVariable = (overrideId: string): { identifier: string; wrapped: string } => {
    const backingVariable = `var(--${overrideId})`;
    const backingLength = backingVariable.length;

    const identifier = backingVariable.substring(4, backingLength - 1);

    return { identifier, wrapped: backingVariable };
};

declare global {
    interface String {
        url(): string;
    }
}

String.prototype.url = function url(): string {
    const value = this as string;
    return `url(${value})`;
};
