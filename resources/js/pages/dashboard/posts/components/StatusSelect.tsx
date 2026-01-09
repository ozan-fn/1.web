import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface StatusSelectProps {
    value: string;
    onChange: (value: string) => void;
    error?: string;
}

export function StatusSelect({ value, onChange, error }: StatusSelectProps) {
    return (
        <div className="grid gap-2">
            <Select value={value} onValueChange={onChange}>
                <SelectTrigger className={error ? 'border-destructive' : ''}>
                    <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
            </Select>
            {error && <p className="text-sm font-medium text-destructive">{error}</p>}
        </div>
    );
}
