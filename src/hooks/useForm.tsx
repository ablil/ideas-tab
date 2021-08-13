import { ChangeEvent, useEffect, useState } from "react";

type FormObject = {
  name: string;
  value: string;
  validator: (value: string) => { [key: string]: string[] };
};

export default function useForm<T>(
  initialData: T,
  validate: (obj: T) => { [key: string]: string },
  callback: () => void
) {
  const [data, setData] = useState<T>(initialData);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) callback();
  }, [errors]);

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setData((old) => ({ ...old, [evt.target.name]: evt.target.value }));
  };

  const handleSubmit = (evt: any) => {
    if (evt) evt.preventDefault();
    setIsSubmitting(true);
    setErrors(validate(data));
  };

  return { data, handleChange, handleSubmit, errors };
}
