import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import axios from 'axios';
import { Plus } from 'lucide-react';
import { useCallback, useMemo, useRef, useState } from 'react';

interface Category {
    id: number;
    name: string;
}

interface CategorySelectProps {
    value: string;
    onChange: (value: string) => void;
    categories: Category[];
    error?: string;
    onCategoryCreated?: (category: Category) => void;
}

export function CategorySelect({ value, onChange, categories, error, onCategoryCreated }: CategorySelectProps) {
    const [catInput, setCatInput] = useState('');
    const [showCatSuggestions, setShowCatSuggestions] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const catContainerRef = useRef<HTMLDivElement>(null);

    const filteredCategories = useMemo(() => {
        if (!catInput) return categories;
        return categories.filter((cat) => cat.name.toLowerCase().includes(catInput.toLowerCase()));
    }, [catInput, categories]);

    const categoryExists = useMemo(() => {
        return categories.some((cat) => cat.name.toLowerCase() === catInput.toLowerCase());
    }, [catInput, categories]);

    const handleCreateCategory = useCallback(async () => {
        const trimmed = catInput.trim();
        if (!trimmed) return;

        setIsCreating(true);
        try {
            const { data: newCategory } = await axios.post('/dashboard/categories', {
                name: trimmed,
            });

            onCategoryCreated?.(newCategory);
            onChange(newCategory.id.toString());
            setCatInput('');
            setShowCatSuggestions(false);
        } catch (error) {
            console.error('Failed to create category:', error);
        } finally {
            setIsCreating(false);
        }
    }, [catInput, onChange, onCategoryCreated]);

    const handleSelectCategory = (catId: string) => {
        onChange(catId);
        setCatInput('');
        setShowCatSuggestions(false);
    };

    return (
        <div className="grid gap-2">
            <div className="relative" ref={catContainerRef}>
                <div className="flex gap-2">
                    <Input
                        placeholder="Search or type to create..."
                        value={catInput}
                        className={`h-9 text-sm ${error ? 'border-destructive' : ''}`}
                        onChange={(e) => {
                            setCatInput(e.target.value);
                            setShowCatSuggestions(true);
                        }}
                        onFocus={() => setShowCatSuggestions(true)}
                    />
                    {catInput && !categoryExists && (
                        <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="h-9 w-9 shrink-0"
                            onClick={handleCreateCategory}
                            disabled={isCreating}
                        >
                            <Plus className="h-4 w-4" />
                        </Button>
                    )}
                </div>

                {showCatSuggestions && (
                    <Card className="absolute right-0 left-0 z-50 mt-1 max-h-[200px] animate-in overflow-y-auto border shadow-md duration-100 zoom-in-95 fade-in">
                        <div className="p-1">
                            {filteredCategories.length > 0 ? (
                                filteredCategories.map((cat) => (
                                    <button
                                        key={cat.id}
                                        type="button"
                                        className="w-full rounded-sm px-2 py-1.5 text-left text-xs transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
                                        onClick={() => handleSelectCategory(cat.id.toString())}
                                    >
                                        {cat.name}
                                    </button>
                                ))
                            ) : catInput ? (
                                <button
                                    type="button"
                                    className="w-full rounded-sm px-2 py-1.5 text-left text-xs text-muted-foreground transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
                                    onClick={handleCreateCategory}
                                    disabled={isCreating}
                                >
                                    Click to create "<span className="font-semibold text-foreground">{catInput}</span>"
                                </button>
                            ) : (
                                <div className="relative flex w-full cursor-default items-center py-1.5 pr-2 pl-8 text-sm text-muted-foreground outline-none select-none">
                                    No categories found
                                </div>
                            )}
                        </div>
                    </Card>
                )}
            </div>

            {/* Hidden Select for form submission */}
            {value && (
                <Select value={value} onValueChange={handleSelectCategory}>
                    <SelectTrigger className="hidden">
                        <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                        {categories.map((cat) => (
                            <SelectItem key={cat.id} value={cat.id.toString()}>
                                {cat.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            )}

            {value && (
                <div className="text-xs text-muted-foreground">
                    Selected: <span className="font-medium">{categories.find((c) => c.id.toString() === value)?.name || 'Unknown'}</span>
                </div>
            )}

            {error && <p className="text-sm font-medium text-destructive">{error}</p>}
        </div>
    );
}
