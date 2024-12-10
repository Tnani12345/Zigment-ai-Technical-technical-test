import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { FormSchema } from '../types/schema';

interface FormPreviewProps {
  schema: FormSchema;
}

const FormPreview: React.FC<FormPreviewProps> = ({ schema }) => {
  const { control, handleSubmit, formState: { errors } } = useForm();

  const downloadJSON = (data: any) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'form_submission.json';
    link.click(); // Trigger the download
  };

  const onSubmit = (data: any) => {
    console.log('Form Data:', data); // Log the submitted data
    downloadJSON(data); // Trigger download after form submission
    alert('Form submitted successfully!'); // Show a success alert
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">{schema.formTitle}</h2>
      {schema.formDescription && <p>{schema.formDescription}</p>}

      <form className="space-y-4 mt-4" onSubmit={handleSubmit(onSubmit)}>
        {schema.fields.map((field) => (
          <div key={field.id}>
            <label className="block font-medium mb-1">{field.label}</label>
            
            {field.type === 'radio' ? (
              field.options?.map((option) => (
                <div key={option.value} className="flex items-center">
                  <Controller
                    name={field.id}
                    control={control}
                    rules={{ required: field.required }}
                    render={({ field: controllerField }) => (
                      <input
                        type="radio"
                        {...controllerField}
                        value={option.value}
                        id={option.value}
                        className="mr-2"
                      />
                    )}
                  />
                  <label htmlFor={option.value} className="ml-2">{option.label}</label>
                </div>
              ))
            ) : field.type === 'select' ? (
              <Controller
                name={field.id}
                control={control}
                rules={{
                  required: field.required,
                  pattern: field.validation?.pattern ? new RegExp(field.validation.pattern) : undefined
                }}
                render={({ field: controllerField }) => (
                  <>
                    <select {...controllerField} className="block w-full border rounded">
                      {field.options?.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    {errors[field.id] && <p className="text-red-500 text-sm">{errors[field.id]?.message}</p>}
                  </>
                )}
              />
            ) : field.type === 'textarea' ? (
              <Controller
                name={field.id}
                control={control}
                rules={{
                  required: field.required,
                  pattern: field.validation?.pattern ? new RegExp(field.validation.pattern) : undefined
                }}
                render={({ field: controllerField }) => (
                  <>
                    <textarea {...controllerField} className="block w-full border rounded" placeholder={field.placeholder} />
                    {errors[field.id] && <p className="text-red-500 text-sm">{errors[field.id]?.message}</p>}
                  </>
                )}
              />
            ) : (
              <Controller
                name={field.id}
                control={control}
                rules={{
                  required: field.required,
                  pattern: field.validation?.pattern ? new RegExp(field.validation.pattern) : undefined
                }}
                render={({ field: controllerField }) => (
                  <>
                    <input {...controllerField} type={field.type} className="block w-full border rounded" placeholder={field.placeholder} />
                    {errors[field.id] && <p className="text-red-500 text-sm">{errors[field.id]?.message}</p>}
                  </>
                )}
              />
            )}
          </div>
        ))}
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormPreview;
