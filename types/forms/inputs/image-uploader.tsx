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
        <div className="flex flex-col w-full">
            <label className="text-[11px] font-bold text-black uppercase tracking-widest mb-2">
                {label}
            </label>
            
            {/* gap-0 para que las imágenes estén pegadas */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-0 border border-black bg-black">
                {images.map((item, i) => {
                    const isFile = item instanceof File;
                    const previewUrl = isFile 
                        ? URL.createObjectURL(item) 
                        : `${R2_URL}${item}`;

                    return (
                        <div key={i} className="relative aspect-square overflow-hidden group bg-white border-[0.5px] border-black">
                            <img 
                                src={previewUrl} 
                                alt="preview" 
                                className="w-full h-full object-cover" 
                                onLoad={() => { if (isFile) URL.revokeObjectURL(previewUrl); }}
                            />
                            
                            {/* Overlay minimalista negro */}
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <button 
                                    type="button" 
                                    onClick={() => removeFile(i)} 
                                    className="p-2 bg-white text-black hover:bg-black hover:text-white transition-colors"
                                >
                                    <X className="size-5" />
                                </button>
                            </div>
                            
                            {/* Badge con color café (#6F4E37) */}
                            {isFile && (
                                <div className="absolute top-0 left-0 bg-[#6F4E37] text-[8px] text-white px-2 py-0.5 font-bold uppercase tracking-tighter">
                                    Nuevo
                                </div>
                            )}
                        </div>
                    );
                })}

                {/* Input de carga estilo industrial/minimalista */}
                <label className={`
                    aspect-square transition-all cursor-pointer 
                    flex flex-col items-center justify-center gap-2 group border-[0.5px] border-black
                    ${error ? "bg-red-50" : "bg-white hover:bg-gray-100"}
                `}>
                    <ImageIcon className={`size-6 ${error ? "text-red-600" : "text-black"}`} />
                    <span className={`text-[9px] font-bold uppercase tracking-tighter ${error ? "text-red-600" : "text-black"}`}>
                        Subir Foto
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
                <span className="text-[10px] font-bold text-red-600 uppercase tracking-widest mt-2">
                    {error}
                </span>
            )}
        </div>
    );
};