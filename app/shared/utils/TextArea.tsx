interface TextareaProps {
    name: string;
    label: string;
    placeholder: string;
    error: string;
    value?: string;
}

export function Textarea({name, label, placeholder, error, value}: TextareaProps) {
    return (
        <div className="space-y-2">
            <label htmlFor={name} className="text-gray-800">
                {label}
            </label>
            <textarea
                id={name}
                name={name}
                defaultValue={value}
                className="focus:outline-none text-sm block w-full placeholder:text-sm rounded-md h-[180px] border border-gray-200 px-4 py-3 transition duration-300 invalid:ring-3 placeholder:text-gray-600 ring-inset invalid:ring-red-400 focus:ring-2 focus:ring-indigo-500 lg:text-lg"
                placeholder={placeholder}>
            </textarea>
            <p className={`text-red-700 text-sm mt-1 h-4 font-medium`}>
                {error}
            </p>
        </div>
    )
}
