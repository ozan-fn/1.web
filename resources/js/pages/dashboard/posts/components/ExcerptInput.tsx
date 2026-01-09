import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface ExcerptInputProps {
    value: string;
    onChange: (value: string) => void;
    error?: string;
}

export function ExcerptInput({ value, onChange, error }: ExcerptInputProps) {
    return (
        <div className="grid gap-2">
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea
                id="excerpt"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Short summary of the post"
                rows={3}
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
    );
}
