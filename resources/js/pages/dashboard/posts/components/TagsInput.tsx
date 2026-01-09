import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Plus, X } from 'lucide-react';
import { useMemo, useRef, useState } from 'react';

interface Tag {
    id: number;
    name: string;
}

interface TagsInputProps {
    tags: string[];
    onAddTag: (tagName: string) => void;
    onRemoveTag: (tagName: string) => void;
    availableTags: Tag[];
    error?: string;
}

export function TagsInput({ tags, onAddTag, onRemoveTag, availableTags, error }: TagsInputProps) {
    const [tagInput, setTagInput] = useState('');
    const [showTagSuggestions, setShowTagSuggestions] = useState(false);
    const tagContainerRef = useRef<HTMLDivElement>(null);

    // Optimized filtering
    const filteredTags = useMemo(() => {
        if (!tagInput) return [];
        return availableTags.filter((tag) => tag.name.toLowerCase().includes(tagInput.toLowerCase()) && !tags.includes(tag.name));
    }, [tagInput, availableTags, tags]);

    const handleAddTag = (tagName: string) => {
        const trimmed = tagName.trim();
        if (trimmed) {
            onAddTag(trimmed);
            setTagInput('');
            setShowTagSuggestions(false);
        }
    };

    return (
        <div className="grid gap-2">
            {/* Tag List - Compact badges */}
            <div className="flex flex-wrap gap-1.5">
                {tags.map((tagName) => (
                    <Badge key={tagName} variant="secondary" className="rounded-md border-none px-2 py-0.5 text-[11px] font-medium transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-800">
                        {tagName}
                        <button type="button" onClick={() => onRemoveTag(tagName)} className="ml-1.5 rounded-sm p-px text-muted-foreground transition-colors hover:bg-zinc-300 hover:text-zinc-900 dark:hover:bg-zinc-700 dark:hover:text-zinc-100">
                            <X className="h-3 w-3" />
                        </button>
                    </Badge>
                ))}
            </div>

            {/* Input Area */}
            <div className="relative" ref={tagContainerRef}>
                <div className="flex gap-2">
                    <Input
                        placeholder="Add tags..."
                        value={tagInput}
                        className={`h-9 text-sm ${error ? 'border-destructive' : ''}`}
                        onChange={(e) => {
                            setTagInput(e.target.value);
                            setShowTagSuggestions(true);
                        }}
                        onFocus={() => setShowTagSuggestions(true)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                handleAddTag(tagInput);
                            }
                        }}
                    />
                    <Button type="button" variant="outline" size="icon" className="h-9 w-9 shrink-0" onClick={() => handleAddTag(tagInput)}>
                        <Plus className="h-4 w-4" />
                    </Button>
                </div>

                {/* Suggestions Popover */}
                {showTagSuggestions && tagInput && (
                    <Card className="absolute right-0 left-0 z-50 mt-1 max-h-[160px] animate-in overflow-y-auto border shadow-md duration-100 zoom-in-95 fade-in">
                        <div className="p-1">
                            {filteredTags.length > 0 ? (
                                filteredTags.map((tag) => (
                                    <button key={tag.id} type="button" className="w-full rounded-sm px-2 py-1.5 text-left text-xs transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800" onClick={() => handleAddTag(tag.name)}>
                                        {tag.name}
                                    </button>
                                ))
                            ) : (
                                <button type="button" className="w-full rounded-sm px-2 py-1.5 text-left text-xs text-muted-foreground transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800" onClick={() => handleAddTag(tagInput)}>
                                    Press Enter to create "<span className="font-semibold text-foreground">{tagInput}</span>"
                                </button>
                            )}
                        </div>
                    </Card>
                )}
            </div>

            {error && <p className="text-[11px] font-medium text-destructive">{error}</p>}
        </div>
    );
}
