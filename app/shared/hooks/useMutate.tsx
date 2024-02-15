import {FormEvent, useState} from "react";
import {useMutation} from "react-query";
import {toast} from "react-hot-toast";
import {AxiosError} from "axios";

export const useMutate = function <T>(callback: Function, onSuccess: Function) {
    const [errors, setErrors] = useState<ApiValidationError[]>([]);

    const {isLoading, mutate} = useMutation(async (event: FormEvent) => {
        event.preventDefault()
        setErrors([])
        return await callback(event)
    }, {
        onSuccess: (data: T) => {
            onSuccess(data)
        },
        onError: (error: AxiosError<any>) => {
            const message: string | ApiValidationError[] = error.response?.data?.message
            if (Array.isArray(message)) setErrors(message)
            else toast.error(message)
        }
    })

    return {isLoading, mutate, errors}
}