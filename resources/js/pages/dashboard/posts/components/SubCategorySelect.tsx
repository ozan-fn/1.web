import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useMemo } from 'react';

interface SubCategory {
    id: number;
    name: string;
    category_id: number;
}

interface SubCategorySelectProps {
    value: string | number | null;
    onChange: (value: string | null) => void;
    subCategories: SubCategory[];
    categoryId: number;
    error?: string;
}

export function SubCategorySelect({ value, onChange, subCategories, categoryId, error }: SubCategorySelectProps) {
    // Filter subcategories berdasarkan categoryId yang dipilih
    const filteredSubCategories = useMemo(() => {
        if (!categoryId || !subCategories) return [];
        return subCategories.filter((sc) => Number(sc.category_id) === Number(categoryId));
    }, [categoryId, subCategories]);

    return (
        <div className="grid gap-2">
            <Select
                value={value?.toString() || 'none'}
                onValueChange={(val) => onChange(val === 'none' ? null : val)}
                disabled={!categoryId} // Otomatis disabled jika kategori utama belum dipilih
            >
                <SelectTrigger className={error ? 'border-destructive' : ''}>
                    <SelectValue placeholder={!categoryId ? 'Select category first' : 'Select Sub Category'} />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    {filteredSubCategories.length > 0 &&
                        filteredSubCategories.map((sc) => (
                            <SelectItem key={sc.id} value={sc.id.toString()}>
                                {sc.name}
                            </SelectItem>
                        ))}
                    {categoryId && filteredSubCategories.length === 0 && (
                        <SelectItem value="none" disabled className="text-muted-foreground italic">
                            No subcategories available
                        </SelectItem>
                    )}
                </SelectContent>
            </Select>
            {error && <p className="text-sm font-medium text-destructive">{error}</p>}
        </div>
    );
}
