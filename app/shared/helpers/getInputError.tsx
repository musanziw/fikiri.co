import "@/app/shared/types/ApiValidationError";

export function getInputError(
  errors: ApiValidationError[],
  field: string
): string {
  const error = errors.find(
    (error: ApiValidationError) => error.property === field
  );
  if (!error) return "";
  return error.message;
}
