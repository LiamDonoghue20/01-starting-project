import { forwardRef } from "react"
//custom component for the input field, which is a forwarded reference returned from the function
const Input = forwardRef(function Input({label, textarea, ...props}, ref){
    //whether this represents a text field, or a regular input field is decided by the ref passed through to this component
    const stylingClass = "w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:bored-stone-600"
    return <p className="flex flex-col gap-1 my-4">
        <label className="text-sm font-bold upperccase text-stone-500">{label}</label>
        {textarea ? (<textarea ref={ref} className={stylingClass} {...props}/>) 
        : (<input ref={ref} className={stylingClass} {...props}/>)}
    </p>
})

export default Input;