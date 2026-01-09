import { Input } from '@/components/ui/input';

interface PublishDateInputProps {
    value: string | null;
    onChange: (value: string | null) => void;
    error?: string;
}

export function PublishDateInput({ value, onChange, error }: PublishDateInputProps) {
    /**
     * Konversi ISO String ke format YYYY-MM-DDTHH:mm (Lokal)
     * datetime-local memerlukan format tersebut agar value tampil benar
     */
    const formatToLocalDatetime = (dateStr: string | null) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        const offset = date.getTimezoneOffset() * 60000;
        const localISOTime = new Date(date.getTime() - offset).toISOString().slice(0, 16);
        return localISOTime;
    };

    return (
        <div className="grid gap-2">
            {/*// Di dalam PublishDateInput.tsx*/}
            <Input
                id="published_at"
                type="datetime-local"
                className={error ? 'border-destructive' : ''}
                value={formatToLocalDatetime(value)}
                onChange={(e) => {
                    const val = e.target.value; // Formatnya: YYYY-MM-DDTHH:mm
                    if (!val) {
                        onChange(null);
                        return;
                    }
                    // Kirim format yang lebih bersahabat dengan database (YYYY-MM-DD HH:mm:ss)
                    // atau gunakan format ISO tanpa suffix Z jika Laravel ketat
                    const date = new Date(val);
                    onChange(date.toISOString());
                }}
            />
            {error && <p className="text-sm font-medium text-destructive">{error}</p>}
        </div>
    );
}
