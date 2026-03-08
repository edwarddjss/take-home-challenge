import { Button } from "@/components/ui/button";

type SegmentedControlOption<T extends string | number> = {
  label: string;
  value: T;
};

type SegmentedControlProps<T extends string | number> = {
  label: string;
  onChange: (value: T) => void;
  options: SegmentedControlOption<T>[];
  value: T;
};

export function SegmentedControl<T extends string | number>({
  label,
  onChange,
  options,
  value,
}: SegmentedControlProps<T>) {
  return (
    <fieldset className="field-stack">
      <legend className="field-label">{label}</legend>
      <div className="option-row">
        {options.map((option) => (
          <Button
            key={option.value}
            aria-pressed={value === option.value}
            isActive={value === option.value}
            onClick={() => onChange(option.value)}
            type="button"
            variant="option"
          >
            {option.label}
          </Button>
        ))}
      </div>
    </fieldset>
  );
}
