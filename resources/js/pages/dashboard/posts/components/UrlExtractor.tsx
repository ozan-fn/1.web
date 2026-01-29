import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axios from 'axios';
import { AlertCircle, Loader2, Wand2 } from 'lucide-react';
import { useState } from 'react';

interface ExtractedData {
    title: string;
    thumbnail: string;
    content: string;
    tags: string[];
}

interface UrlExtractorProps {
    onExtractSuccess: (data: ExtractedData) => void;
    isLoading?: boolean;
}

export function UrlExtractor({ onExtractSuccess, isLoading = false }: UrlExtractorProps) {
    const [url, setUrl] = useState('');
    const [extracting, setExtracting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleExtract = async () => {
        if (!url.trim()) {
            setError('Please enter a URL');
            return;
        }

        setExtracting(true);
        setError(null);

        try {
            const response = await axios.get<ExtractedData>(
                `https://test1-gl4j.vercel.app/extract?url=${encodeURIComponent(url)}`,
                {
                    headers: {
                        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
                        'accept-language': 'en-US,en;q=0.9,id;q=0.8',
                        'cache-control': 'max-age=0',
                        'dnt': '1',
                        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36',
                    },
                }
            );

            if (response.data) {
                onExtractSuccess(response.data);
                setUrl('');
                setError(null);
            } else {
                setError('Failed to extract content from URL');
            }
        } catch (err: any) {
            console.error('Extract error:', err);
            setError(err.response?.data?.message || 'Failed to extract content. Please check the URL and try again.');
        } finally {
            setExtracting(false);
        }
    };

    return (
        <Card className="border-dashed">
            <CardHeader className="space-y-1">
                <CardTitle className="flex items-center gap-2 text-lg">
                    <Wand2 className="h-5 w-5 text-primary" />
                    Auto-Fill from URL
                </CardTitle>
                <CardDescription>
                    Extract title, content, thumbnail, and tags automatically from a news URL
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid gap-2">
                    <Label htmlFor="extract-url">Article URL</Label>
                    <div className="flex gap-2">
                        <Input
                            id="extract-url"
                            type="url"
                            placeholder="https://example.com/article/..."
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleExtract())}
                            disabled={extracting || isLoading}
                            className="flex-1"
                        />
                        <Button
                            type="button"
                            onClick={handleExtract}
                            disabled={extracting || isLoading || !url.trim()}
                            className="shrink-0"
                        >
                            {extracting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Extracting...
                                </>
                            ) : (
                                <>
                                    <Wand2 className="mr-2 h-4 w-4" />
                                    Extract
                                </>
                            )}
                        </Button>
                    </div>
                </div>

                {error && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
            </CardContent>
        </Card>
    );
}
