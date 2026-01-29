import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axios from 'axios';
import { AlertCircle, Loader2, Link2 } from 'lucide-react';
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
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleExtract = async () => {
        if (!url.trim()) {
            setError('Please enter a URL');
            return;
        }

        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await axios.get('https://test1-gl4j.vercel.app/extract', {
                params: { url },
                headers: {
                    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                    'accept-language': 'en-US,en;q=0.9,id;q=0.8,fi;q=0.7',
                    'cache-control': 'max-age=0',
                    'dnt': '1',
                    'priority': 'u=0, i',
                    'sec-ch-ua': '"Not(A:Brand";v="8", "Chromium";v="144", "Microsoft Edge";v="144"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-ch-ua-platform': '"Windows"',
                    'sec-fetch-dest': 'document',
                    'sec-fetch-mode': 'navigate',
                    'sec-fetch-site': 'none',
                    'sec-fetch-user': '?1',
                    'upgrade-insecure-requests': '1',
                    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36 Edg/144.0.0.0',
                },
            });

            const { title, thumbnail, content, tags } = response.data;

            onExtractSuccess({
                title: title || '',
                thumbnail: thumbnail || '',
                content: content || '',
                tags: Array.isArray(tags) ? tags : [],
            });

            setSuccess(true);
            setUrl('');
            setTimeout(() => setSuccess(false), 3000);
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || 'Failed to extract URL. Please check the URL and try again.';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !loading) {
            handleExtract();
        }
    };

    return (
        <Card>
            <CardHeader className="space-y-1">
                <CardTitle className="flex items-center gap-2 text-lg">
                    <Link2 className="h-5 w-5" />
                    Auto-fill from URL
                </CardTitle>
                <CardDescription>Extract article data from a URL to auto-fill the form</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="url-input" className="text-sm font-medium">
                        Article URL
                    </Label>
                    <div className="flex gap-2">
                        <Input
                            id="url-input"
                            type="url"
                            placeholder="https://example.com/article"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            onKeyPress={handleKeyPress}
                            disabled={loading || isLoading}
                            className="flex-1"
                        />
                        <Button onClick={handleExtract} disabled={loading || isLoading || !url.trim()} className="px-4">
                            {loading || isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Extract'}
                        </Button>
                    </div>
                </div>

                {error && (
                    <Alert className="border-red-500/50 bg-red-500/5">
                        <AlertCircle className="h-4 w-4 text-red-600" />
                        <AlertDescription className="text-red-600">{error}</AlertDescription>
                    </Alert>
                )}

                {success && (
                    <Alert className="border-green-500/50 bg-green-500/5">
                        <AlertCircle className="h-4 w-4 text-green-600" />
                        <AlertDescription className="text-green-600">Article data extracted successfully! Fields have been auto-filled.</AlertDescription>
                    </Alert>
                )}
            </CardContent>
        </Card>
    );
}
