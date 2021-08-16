import { ChangeEvent, useEffect, useState } from "react";

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
  }, [callback, errors, isSubmitting]);

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
