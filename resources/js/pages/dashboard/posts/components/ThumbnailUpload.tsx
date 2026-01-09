import { Input } from '@/components/ui/input';
import { ImageIcon, Upload } from 'lucide-react';
import { ChangeEvent } from 'react';

interface ThumbnailUploadProps {
    previewUrl: string | null;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    error?: string;
}

export function ThumbnailUpload({ previewUrl, onChange, error }: ThumbnailUploadProps) {
    return (
        <div className="grid w-full gap-2">
            <div className="relative flex flex-col items-center gap-3">
                {previewUrl ? (
                    <div className="relative aspect-video w-full overflow-hidden rounded-md border bg-muted">
                        <img src={previewUrl} alt="Thumbnail preview" className="h-full w-full object-cover" />
                    </div>
                ) : (
                    <div className={`flex aspect-video w-full flex-col items-center justify-center rounded-md border border-dashed text-muted-foreground transition-colors ${error ? 'border-destructive bg-destructive/5' : 'bg-zinc-50/50 dark:bg-zinc-900/50'}`}>
                        <ImageIcon className="mb-2 h-8 w-8 opacity-20" />
                        <span className="text-[10px] font-medium tracking-wider uppercase opacity-60">No image selected</span>
                    </div>
                )}

                <label className="w-full">
                    <div className={`flex h-9 cursor-pointer items-center justify-center rounded-md border px-3 text-xs font-medium transition-colors ${previewUrl ? 'bg-background hover:bg-accent' : 'bg-primary text-primary-foreground hover:bg-primary/90'}`}>
                        <Upload className="mr-2 h-3.5 w-3.5" />
                        {previewUrl ? 'Change Thumbnail' : 'Upload Thumbnail'}
                    </div>
                    <Input type="file" className="hidden" accept="image/*" onChange={onChange} />
                </label>
            </div>

            {error && <p className="text-sm font-medium text-destructive">{error}</p>}
        </div>
    );
}
