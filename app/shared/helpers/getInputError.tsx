export function getInputError(errors = [], field: string): string {
    if (errors.length > 0) {
        const error = errors.find(error => error['property'] === field)
        if (error) {
            return error['message']
        }
    }
    return ''
}
