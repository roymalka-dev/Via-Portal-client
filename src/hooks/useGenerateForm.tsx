import { FormStepper, IFormInitialValues, ITab } from "form-stepper";

interface IuseGenerateForm {
  submitFunction: (values: IFormInitialValues) => void;
  tabs: ITab[];
  useCache?: boolean;
  submitText?: string;
  nextText?: string;
}

const useGenerateForm = ({
  submitFunction,
  tabs,
  useCache,
  submitText,
  nextText,
}: IuseGenerateForm) => {
  return (
    <FormStepper
      tabs={tabs}
      submitFunction={submitFunction}
      submitText={submitText}
      nextText={nextText}
      useCache={useCache}
    />
  );
};

export default useGenerateForm;
