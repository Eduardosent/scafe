import React from 'react';
import { ImageIcon, X } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { R2_URL } from '@/config';

interface ImageUploaderProps {
    label: string;
    name: string;
    form: UseFormReturn<any>;
}

export const ImageUploader = ({ label, name, form }: ImageUploaderProps) => {
    const { setValue, watch, formState: { errors } } = form;
    const images: (File | string)[] = watch(name) || [];
    const error = errors[name]?.message as string | undefined;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            const updated = [...images, ...newFiles];
            setValue(name, updated, { shouldValidate: true });
        }
    };

    const removeFile = (index: number) => {
        const updated = images.filter((_, i) => i !== index);
        setValue(name, updated, { shouldValidate: true });
    };

    return (
        <div className="flex flex-col gap-2 w-full">
            <label className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">
                {label}
            </label>
            
            <div className="flex flex-wrap gap-4 items-start">
                {images.map((item, i) => {
                    const isFile = item instanceof File;
                    const previewUrl = isFile 
                        ? URL.createObjectURL(item) 
                        : `${R2_URL}${item}`;

                    return (
                        /* Contenedor con tamaño estrictamente fijo y cuadrado */
                        <div key={i} className="relative w-40 h-40 aspect-square rounded-3xl overflow-hidden border-2 border-gray-100 bg-gray-50 flex-shrink-0 shadow-sm group">
                            <img 
                                src={previewUrl} 
                                alt="preview" 
                                /* object-cover asegura que la imagen sea cuadrada sin deformarse */
                                className="w-full h-full object-cover block aspect-square" 
                                onLoad={() => { if (isFile) URL.revokeObjectURL(previewUrl); }}
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <button 
                                    type="button" 
                                    onClick={() => removeFile(i)} 
                                    className="p-2 bg-white text-red-500 rounded-full shadow-lg hover:scale-110 transition-transform"
                                >
                                    <X className="size-5" />
                                </button>
                            </div>
                            {isFile && (
                                <div className="absolute top-2 left-2 text-[8px] text-white px-2 py-1 rounded-full font-bold uppercase tracking-widest">
                                    New
                                </div>
                            )}
                        </div>
                    );
                })}

                {/* Botón de subida exactamente del mismo tamaño cuadrado */}
                <label className={`
                    w-40 h-40 aspect-square rounded-3xl border-2 border-dashed transition-all cursor-pointer 
                    flex flex-col items-center justify-center gap-2 flex-shrink-0
                    ${error ? "border-red-500 bg-red-50/10" : "border-gray-200 hover:border-blue-500 hover:bg-blue-50/30"}
                `}>
                    <div className="p-3 rounded-full bg-gray-50">
                        <ImageIcon className={`size-6 ${error ? "text-red-500" : "text-gray-400"}`} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                        Add Photo
                    </span>
                    <input 
                        type="file" 
                        multiple 
                        accept="image/*" 
                        className="hidden" 
                        onChange={handleFileChange} 
                    />
                </label>
            </div>

            {error && (
                <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest ml-1 mt-1">
                    {error}
                </span>
            )}
        </div>
    );
};