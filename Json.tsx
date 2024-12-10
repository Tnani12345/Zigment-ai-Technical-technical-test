import React, { useState } from 'react';

interface JSONEditorProps {
  setSchema: React.Dispatch<React.SetStateAction<any>>;
}

const JSONEditor: React.FC<JSONEditorProps> = ({ setSchema }) => {
  const [jsonText, setJsonText] = useState<string>(''); // State for the JSON text
  const [error, setError] = useState<string | null>(null); // Error message if JSON is invalid

  const handleJSONChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value;
    setJsonText(newText);

    try {
      // Attempt to parse the JSON text
      const parsed = JSON.parse(newText);
      setSchema(parsed); // Update the schema state with the parsed data
      setError(null); // Clear any previous error
    } catch (e) {
      setError('Invalid JSON'); // Set error message if parsing fails
    }
  };

  // Function to copy the current JSON text to the clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(jsonText).then(() => {
      alert('Form JSON copied to clipboard!');
    }).catch((err) => {
      console.error('Error copying text: ', err);
    });
  };

  return (
    <div className="p-4 bg-black text-white h-full">
      <textarea
        value={jsonText}
        onChange={handleJSONChange} // Update JSON state when user edits
        rows={20}
        className="w-full h-full p-2 bg-gray-800 text-white border border-gray-600"
        placeholder="Enter JSON schema here..."
      />
      {error && <p className="text-red-500 mt-2">{error}</p>} {/* Show error if JSON is invalid */}
      <button
        onClick={handleCopy}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Copy Form JSON
      </button>
    </div>
  );
};

export default JSONEditor;
