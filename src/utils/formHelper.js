import { useFormik } from 'formik';
import { useState } from 'react';

const useForm = (initialValues, validationSchema, onSubmit) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      console.log(values)
      setIsSubmitting(true);
      await onSubmit(values);
      setIsSubmitting(false);
      resetForm();
    },
  });
  return { formik, isSubmitting }
};


export default useForm;