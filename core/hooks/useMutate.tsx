import {FormEvent, useState} from "react";
import {useMutation} from "react-query";
import {AxiosError} from "axios";
import {Toast} from "@/core/utils/Toast";

export const useMutate = function <T>(
    method: Function,
    onSuccess: Function,
    link: string,
    modifier?: Function
) {
    const [errors, setErrors] = useState<ApiValidationError[]>([]);

    const {isLoading, mutate} = useMutation(
        async (event: FormEvent) => {
            event.preventDefault();
            setErrors([]);
            const formData = new FormData(event.target as HTMLFormElement);
            const payload = Object.fromEntries(formData);
            if (modifier) {
                const modifiedPayload = modifier(payload);
                return await method(link, modifiedPayload);
            }
            return await method(link, payload);
        },
        {
            onSuccess: (data: T) => {
                onSuccess(data);
            },
            onError: async (error: AxiosError<any>) => {
                const message: string | ApiValidationError[] =
                    error.response?.data?.message;
                if (Array.isArray(message)) setErrors(message);
                if (typeof message === "string") await Toast("error", message);
            },
        }
    );
    return {isLoading, mutate, errors};
};
