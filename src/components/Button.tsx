import { ComponentProps } from "react"

type ButtonProps = {
  variant?: 'void' | 'outline' | 'contain' | 'icon'
} & ComponentProps<'button'>
const Button: React.FC<ButtonProps> = ({ variant = 'void', children, className, ...props }) => {

  return (
    <button
      {...props}
      className={`
        ${(variant !== 'void' && variant !== 'icon') && 'px-8 py-2 rounded-md shadow-sm font-semibold'}
        ${variant == 'icon' && "rounded-full p-2 hover:bg-gray-100"}
        ${variant == 'contain' && "bg-blue-600 text-white hover:bg-blue-700"}
        ${variant == 'outline' && "border bg-white text-gray-500 hover:bg-gray-50"}
        ${variant == 'outline' && "border bg-white text-gray-500 hover:bg-gray-50"}
        ${className}
      `}
    >
      {children}
    </button>
  )

}

export default Button