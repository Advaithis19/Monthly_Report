import { useState, useEffect } from "react";

const useForm = (callback, validate) => {
  const [values, setValues] = useState({
    email: "",
    username: "",
    password: "",
    password2: "",
    first_name: "",
    last_name: "",
    is_teacher: true,
    is_admin: false,
    is_superadmin: false,
    department: "ISE",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [type, setType] = useState("teacher");
  const [departmentSelect, setDepartmentSelect] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleRoleSelect = (e) => {
    setType(e.target.value);
    if ([e.target.value] == "super_admin") {
      setValues({
        ...values,

        ["is_superadmin"]: true,
        ["is_teacher"]: false,
        ["is_admin"]: false,
      });
      setDepartmentSelect(false);
    } else if ([e.target.value] == "teacher") {
      setValues({
        ...values,

        ["is_superadmin"]: false,
        ["is_teacher"]: true,
        ["is_admin"]: false,
      });
      setDepartmentSelect(true);
    } else {
      setValues({
        ...values,

        ["is_superadmin"]: false,
        ["is_teacher"]: false,
        ["is_admin"]: true,
      });
      setDepartmentSelect(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrors(validate(values));
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    }
  }, [errors]);

  return {
    handleChange,
    handleSubmit,
    values,
    errors,
    type,
    departmentSelect,
    handleRoleSelect,
  };
};

export default useForm;
