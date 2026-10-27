import { useRef, useState } from 'react';
import { FileText, Upload, X } from 'lucide-react';

const MAX_BYTES = 20 * 1024 * 1024;

export default function FileUpload({ file, onChange }) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState('');

  function acceptFiles(fileList) {
    const next = fileList && fileList[0];
    if (!next) return;
    if (!/\.(doc|docx)$/i.test(next.name)) {
      setError('Please choose a Word document (.doc or .docx).');
      return;
    }
    if (next.size > MAX_BYTES) {
      setError('The file must be 20 MB or smaller.');
      return;
    }
    setError('');
    onChange(next);
  }

  function handleDrop(event) {
    event.preventDefault();
    setDragging(false);
    acceptFiles(event.dataTransfer.files);
  }

  if (file) {
    return (
      <div className="flex items-center gap-3 rounded-md border border-navy-100 bg-navy-50 p-3">
        <FileText className="h-5 w-5 shrink-0 text-navy-700" aria-hidden="true" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-navy-900">{file.name}</p>
          <p className="text-xs text-muted">{Math.max(1, Math.round(file.size / 1024))} KB</p>
        </div>
        <button
          type="button"
          onClick={() => onChange(null)}
          className="rounded-md p-1 text-muted hover:bg-white hover:text-navy-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600"
          aria-label="Remove file"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={`flex w-full flex-col items-center justify-center gap-2 rounded-md border border-dashed px-4 py-8 text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 ${
          dragging ? 'border-navy-600 bg-navy-50' : 'border-navy-100 bg-white hover:bg-navy-50'
        }`}
      >
        <Upload className="h-5 w-5 text-navy-700" aria-hidden="true" />
        <span className="text-sm font-medium text-navy-900">Choose a Word file</span>
        <span className="text-xs text-muted">Drag and drop, or click to browse</span>
      </button>
      <input
        ref={inputRef}
        type="file"
        accept=".doc,.docx"
        className="hidden"
        onChange={(event) => acceptFiles(event.target.files)}
      />
      {error && <p className="mt-2 text-xs text-danger">{error}</p>}
    </div>
  );
}