'use client';
import { useStore } from '../store/useStore';
import { useEffect, useRef } from 'react';

export default function ComponentPreview() {
  const { code } = useStore();
  const previewRef = useRef(null);

  useEffect(() => {
    if (previewRef.current) {
      const doc = previewRef.current.contentDocument;
      const content = `
        <html>
          <head>
            <style>${code.css}</style>
          </head>
          <body>${code.jsx}</body>
        </html>
      `;
      doc.open();
      doc.write(content);
      doc.close();
    }
  }, [code]);

  return (
    <div className="border-b h-1/2">
      <iframe ref={previewRef} className="w-full h-full" title="Live Preview" />
    </div>
  );
}
