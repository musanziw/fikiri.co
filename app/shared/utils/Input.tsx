interface InputProps {
    name: string;
    label: string;
    placeholder: string;
    error: string;
    type: string;
    value?: string;
}

export function Input({name, label, placeholder, error, value, type}: InputProps) {
    return (
        <div className="space-y-2">
            <label htmlFor={name} className="text-gray-800">
                {label}
            </label>
            <input
                id={name}
                type={type}
                name={name}
                defaultValue={value}
                autoComplete={name}
                placeholder={placeholder}
                className={`focus:outline-none text-sm block w-full placeholder:text-sm rounded-md border border-gray-200 px-4 py-3  placeholder:text-gray-600 transition-transform duration-300 ring-inset lg:text-base ${error ? 'ring-2 ring-red-500' : 'focus:ring-2 focus:ring-indigo-500'}`}
            />
            <p className={`text-red-700 text-sm mt-1 h-4 font-medium`}>
                {error}
            </p>
        </div>
    )
}
