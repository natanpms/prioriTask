import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select';

type ComboboxOption = {
  label: string;
  value: string;
};

type ComboboxProps<T extends ComboboxOption = ComboboxOption> = {
  name?: string;
  value: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  textPlaceholder?: string;
  groupOptions: T[];
  isRequired?: boolean;
  isDisabled?: boolean;
};

function Combobox<T extends ComboboxOption>({
  name,
  value,
  defaultValue,
  onChange,
  textPlaceholder,
  groupOptions,
  isRequired,
  isDisabled
}: ComboboxProps<T>) {
  return (
    <Select name={name} value={value} onValueChange={onChange} required={isRequired} disabled={isDisabled}>
      <SelectTrigger className="w-full">
        <SelectValue defaultValue={defaultValue ?? ''} placeholder={textPlaceholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {groupOptions?.map((opt, index) => (
            <SelectItem key={index} value={String(opt.value)}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default Combobox;
