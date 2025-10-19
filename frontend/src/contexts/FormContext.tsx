"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type FormValues = Record<string, any>;

type FormContextType = {
  values: FormValues;
  setValue: (name: string, value: any) => void;
};

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider = ({
  children,
  initialValues = {},
}: {
  children: ReactNode;
  initialValues?: FormValues;
}) => {
  const [values, setValues] = useState<FormValues>(initialValues);

  const setValue = (name: string, value: any) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };


  return (
    <FormContext.Provider value={{ values, setValue }}>
      {children}
    </FormContext.Provider>
  );
};

export const useForm = () => {
  const context = useContext(FormContext);
  if (!context) throw new Error("useForm must be used within a FormProvider");
  return context;
};
