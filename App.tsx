import React, { useState } from 'react';
import JSONEditor from './components/Json.tsx';
import FormPreview from './components/FormPreview.tsx';
import { FormSchema } from './types/schema';

const App: React.FC = () => {
  const [schema, setSchema] = useState<FormSchema | null>(null);

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <div className="lg:w-1/2 p-4 border-r">
        <h2 className="text-xl font-bold mb-2">JSON Editor</h2>
        <JSONEditor setSchema={setSchema} />
      </div>
      <div className="lg:w-1/2 p-4">
        <h2 className="text-xl font-bold mb-2">Form Preview</h2>
        {schema && <FormPreview schema={schema} />}
      </div>
    </div>
  );
}

export default App;
