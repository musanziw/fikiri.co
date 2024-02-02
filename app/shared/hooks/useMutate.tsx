import {FormEvent, useState} from "react";
import {useMutation} from "react-query";
import {toast} from "react-hot-toast";
import {AxiosError} from "axios";

export const useMutate = function <T>(getFormData: Function, callback: Function, onSuccess: Function) {
    const [errors, setErrors] = useState<ApiValidationError[]>([]);

    const {isLoading, mutate} = useMutation(async (e: FormEvent) => {
        e.preventDefault()
        setErrors([])
        const payload = getFormData(e)
        return await callback(payload)
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