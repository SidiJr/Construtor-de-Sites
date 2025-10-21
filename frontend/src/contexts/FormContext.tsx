/* eslint-disable @typescript-eslint/no-explicit-any */
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
  console.log(values);

  const setValue = (name: string, value: any) => {
    setValues((prev) => {
      const keys = name.split(".");
      const newValues = { ...prev };
      let current: any = newValues;

      for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        if (!current[key] || typeof current[key] !== "object") {
          current[key] = {};
        }
        current = current[key];
      }

      current[keys[keys.length - 1]] = value;
      return newValues;
    });
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
