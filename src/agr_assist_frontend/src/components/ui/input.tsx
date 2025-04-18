interface InputProps {
  type: string; 
  value: string; 
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; 
  placeholder: string;
  className: string; 
  [x: string]: any; 
}

export const Input: React.FC<InputProps> = ({ type, value, onChange, placeholder, className, ...props }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`border p-2 rounded ${className}`} 
      {...props} 
    />
  );
};
