
export type FormItemType<T> = {
    onChange?: (value: T) => void;
    value?: T;
};