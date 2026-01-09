import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Category {
    id: number;
    name: string;
}

interface CategorySelectProps {
    value: string;
    onChange: (value: string) => void;
    categories: Category[];
    error?: string;
}

export function CategorySelect({ value, onChange, categories, error }: CategorySelectProps) {
    return (
        <div className="grid gap-2">
            <Select value={value} onValueChange={onChange}>
                <SelectTrigger className={error ? 'border-destructive' : ''}>
                    <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                    {categories.length > 0 ? (
                        categories.map((cat) => (
                            <SelectItem key={cat.id} value={cat.id.toString()}>
                                {cat.name}
                            </SelectItem>
                        ))
                    ) : (
                        <div className="relative flex w-full cursor-default items-center py-1.5 pr-2 pl-8 text-sm text-muted-foreground outline-none select-none">No categories found</div>
                    )}
                </SelectContent>
            </Select>
            {error && <p className="text-sm font-medium text-destructive">{error}</p>}
        </div>
    );
}
