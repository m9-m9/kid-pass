import { Box } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { FormValues } from "../../app/record/components/RecordForm";

interface CheckButtonProps {
  value: string;
  form: UseFormReturnType<FormValues>;
  formKey: string;
}

const CheckButton = ({ value, form, formKey }: CheckButtonProps) => {
  return (
    <Box
      key={`@${formKey}-${value}`}
      p="md"
      style={{
        borderRadius: "8px",
        border: "1px solid",
        borderColor:
          form.values[formKey] === value
            ? "var(--mantine-color-blue-6)"
            : "var(--mantine-color-gray-3)",
        color:
          form.values[formKey] === value
            ? "var(--mantine-color-blue-6)"
            : "var(--mantine-color-gray-6)",
        cursor: "pointer",
        textAlign: "center",
      }}
      onClick={() => form.setFieldValue(formKey, value)}
    >
      {value}
    </Box>
  );
};

export default CheckButton;
