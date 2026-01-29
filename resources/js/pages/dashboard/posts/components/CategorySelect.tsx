import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus } from 'lucide-react';
import { useState } from 'react';

interface Category {
    id: number;
    name: string;
}

interface CategorySelectProps {
    value: string;
    onChange: (value: string) => void;
    onCreateCategory: (name: string) => void;
    categories: Category[];
    error?: string;
}

export function CategorySelect({ value, onChange, onCreateCategory, categories, error }: CategorySelectProps) {
    const [newCategory, setNewCategory] = useState('');

    const handleCreate = () => {
        const name = newCategory.trim();
        if (!name) return;
        onCreateCategory(name);
        setNewCategory('');
    };

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
            <div className="flex gap-2">
                <Input placeholder="Create new category..." value={newCategory} onChange={(e) => setNewCategory(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleCreate())} />
                <Button type="button" variant="outline" size="icon" onClick={handleCreate}>
                    <Plus className="h-4 w-4" />
                </Button>
            </div>
            {error && <p className="text-sm font-medium text-destructive">{error}</p>}
        </div>
    );
}
