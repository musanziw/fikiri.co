import {ApiValidationError} from "@/core/types/ApiValidationError";

const getInputError = (errors: ApiValidationError[], field: string): string => {
    const error = errors.find((error: ApiValidationError) => error.property === field);
    if (!error) return "";
    return error.message;
}
export default getInputError
