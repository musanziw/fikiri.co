import {FormEvent, useState} from "react";
import {useMutation} from "react-query";
import {AxiosError} from "axios";
import {toast} from "@/app/shared/helpers/toast";

export const useMutate = function <T>(method: Function, onSuccess: Function, link: string, modifier?: Function) {
    const [errors, setErrors] = useState<ApiValidationError[]>([]);

    const {isLoading, mutate} = useMutation(async (event: FormEvent) => {
        event.preventDefault()
        setErrors([])
        const formData = new FormData(event.target as HTMLFormElement)
        const payload = Object.fromEntries(formData)
        if (modifier) return await method(link, modifier(payload))
        return await method(link, payload)
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