import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

interface FeaturedToggleProps {
    value: boolean;
    onChange: (value: boolean) => void;
}

export function FeaturedToggle({ value, onChange }: FeaturedToggleProps) {
    return (
        <div className="flex items-center justify-between space-x-2 pt-2">
            <Label
                htmlFor="is_featured"
                className="flex cursor-pointer flex-col gap-1"
            >
                <span>Featured Post</span>
                <span className="text-xs font-normal text-wrap text-muted-foreground">
                    Show this post in featured section
                </span>
            </Label>
            <Switch
                id="is_featured"
                checked={value}
                onCheckedChange={onChange}
            />
        </div>
    );
}
