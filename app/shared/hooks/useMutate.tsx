import {FormEvent, useState} from "react";
import {useMutation} from "react-query";
import {AxiosError} from "axios";
import {toast} from "@/app/shared/helpers/toast";

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
        onError: async (error: AxiosError<any>) => {
            const message: string | ApiValidationError[] = error.response?.data?.message
            if (Array.isArray(message)) setErrors(message)
            if (typeof message === 'string') await toast('error', message)
        }
    })

    return {isLoading, mutate, errors}
}