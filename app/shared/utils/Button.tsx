interface ButtonProps {
    label: string;
    type: 'submit' | 'button' | 'reset',
    pending: boolean
}

export function Button({label, type, pending}: ButtonProps) {

    return (
        <button type={type} disabled={pending}
                className="flex items-center justify-center px-5 py-2 leading-6 text-sm shadow rounded-md text-white font-bold bg-indigo-500 hover:bg-indigo-400 transition ease-in-out duration-150 disabled:cursor-not-allowed">
            {
                pending ? (
                    <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg"
                             fill="none"
                             viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                    strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        En cours de traitement...</>
                ) : label
            }
        </button>
    );
}
