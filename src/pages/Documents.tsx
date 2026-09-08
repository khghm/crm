import React, { useState, useRef } from 'react';
import { Upload, Download, FileText, Trash2, Eye } from 'lucide-react';
import { mockDocuments } from '../data/mockData';
import { Document } from '../types';

const Documents: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      const newDoc: Document = {
        id: Date.now().toString() + Math.random(),
        name: file.name,
        type: 'other',
        size: file.size,
        uploadedAt: new Date().toISOString().split('T')[0],
        uploadedBy: 'محمد رضوی'
      };
      setDocuments([newDoc, ...documents]);
    });
  };

  const handleDelete = (id: string) => {
    if (confirm('آیا از حذف این سند اطمینان دارید؟')) {
      setDocuments(documents.filter(d => d.id !== id));
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-heading-1">اسناد</h1>
          <p className="text-body-sm mt-1">مدیریت فایل‌ها و اسناد</p>
        </div>
        <button onClick={() => fileInputRef.current?.click()} className="btn btn-primary">
          <Upload size={16} />
          <span>آپلود سند</span>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleUpload}
          className="hidden"
        />
      </div>

      {/* Upload Area */}
      <div className="card p-8">
        <div className="border-2 border-dashed border-slate-300 rounded-xl p-12 text-center hover:border-blue-400 transition-colors">
          <Upload size={48} className="mx-auto text-slate-400 mb-4" />
          <p className="text-sm text-slate-600 mb-2">فایل‌های خود را اینجا بکشید و رها کنید</p>
          <p className="text-xs text-slate-400 mb-4">یا</p>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="btn btn-secondary"
          >
            انتخاب فایل
          </button>
        </div>
      </div>

      {/* Documents List */}
      <div className="card overflow-hidden">
        <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
          <div className="col-span-5">نام فایل</div>
          <div className="col-span-2">نوع</div>
          <div className="col-span-2">حجم</div>
          <div className="col-span-2">تاریخ آپلود</div>
          <div className="col-span-1">عملیات</div>
        </div>
        <div className="divide-y divide-slate-100">
          {documents.map((doc) => (
            <div key={doc.id} className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-slate-50 transition-all items-center group">
              <div className="col-span-5 flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <FileText size={18} className="text-blue-500" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-800 truncate">{doc.name}</p>
                  <p className="text-xs text-slate-500">آپلود توسط: {doc.uploadedBy}</p>
                </div>
              </div>
              <div className="col-span-2">
                <span className="badge badge-brand">{doc.type}</span>
              </div>
              <div className="col-span-2">
                <span className="text-sm text-slate-600">{formatFileSize(doc.size)}</span>
              </div>
              <div className="col-span-2">
                <span className="text-sm text-slate-600">{new Date(doc.uploadedAt).toLocaleDateString('fa-IR')}</span>
              </div>
              <div className="col-span-1 flex items-center gap-1">
                <button className="p-1.5 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-500 transition-all">
                  <Eye size={16} />
                </button>
                <button onClick={() => handleDelete(doc.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-all">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Documents;
