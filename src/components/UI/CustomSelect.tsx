import { Select } from "@chakra-ui/react";

interface ICustomSelect {
  onChange?: React.ChangeEventHandler<HTMLSelectElement> | undefined;
  options: React.DetailedHTMLProps<React.OptionHTMLAttributes<HTMLOptionElement>, HTMLOptionElement>[];
  value?: string | number | undefined;
  className: string;
  placeholder: string;
  props?: any
}

const CustomSelect: React.FC<ICustomSelect> = ({
  onChange,
  value,
  options,
  className,
  placeholder = "Select",
  props
}) => {
  return (
    <Select
      placeholder={placeholder}
      value={value}
      className={className}
      onChange={onChange}
      bgColor={"#04A551"}
      color={"white"}
      {...props}
    >
      {options.map((option : any) => (
        option
      ))}
    </Select>
  );
};

export default CustomSelect;
