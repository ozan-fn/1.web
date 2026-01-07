import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { resizeImage } from '@/lib/image-compression';
import dashboard from '@/routes/dashboard';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import {
    Facebook,
    Instagram,
    Mail,
    MapPin,
    Phone,
    Twitter,
    Youtube,
} from 'lucide-react';
import { FormEventHandler, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Site Settings',
        href: '/dashboard/site-settings',
    },
];

interface SiteSettingsProps {
    settings: {
        site_name: string;
        tagline: string | null;
        description: string | null;
        email: string | null;
        phone: string | null;
        address: string | null;
        logo: string | null;
        favicon: string | null;
        social_facebook: string | null;
        social_instagram: string | null;
        social_twitter: string | null;
        social_youtube: string | null;
    } | null;
}

export default function SiteSettings({ settings }: SiteSettingsProps) {
    const [logoPreview, setLogoPreview] = useState<string | null>(
        settings?.logo ? `/storage/${settings.logo}` : null,
    );
    const [faviconPreview, setFaviconPreview] = useState<string | null>(
        settings?.favicon ? `/storage/${settings.favicon}` : null,
    );

    const { data, setData, post, processing, errors } = useForm({
        _method: 'PATCH',
        site_name: settings?.site_name ?? 'LENSAPUBLIK',
        tagline: settings?.tagline ?? 'Academic News Portal',
        description: settings?.description ?? '',
        email: settings?.email ?? '',
        phone: settings?.phone ?? '',
        address: settings?.address ?? '',
        logo: null as File | null,
        favicon: null as File | null,
        social_facebook: settings?.social_facebook ?? '',
        social_instagram: settings?.social_instagram ?? '',
        social_twitter: settings?.social_twitter ?? '',
        social_youtube: settings?.social_youtube ?? '',
    });

    const handleFileChange = async (
        e: React.ChangeEvent<HTMLInputElement>,
        field: 'logo' | 'favicon',
    ) => {
        const file = e.target.files?.[0];
        if (file) {
            try {
                // Resize for efficiency
                // Logo: max height 100px as requested for storage efficiency
                // Favicon: max height 64px
                const maxHeight = field === 'logo' ? 100 : 64;
                const resized = await resizeImage(file, 800, maxHeight);

                setData(field, resized);

                // Set preview
                const reader = new FileReader();
                reader.onloadend = () => {
                    if (field === 'logo')
                        setLogoPreview(reader.result as string);
                    else setFaviconPreview(reader.result as string);
                };
                reader.readAsDataURL(resized);
            } catch (err) {
                console.error('Failed to process image:', err);
            }
        }
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(dashboard.siteSettings.update().url, {
            forceFormData: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Site Settings" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4 lg:p-8">
                <form
                    onSubmit={submit}
                    className="grid grid-cols-1 gap-6 lg:grid-cols-3"
                >
                    {/* Left Column: Branding Assets */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Branding</CardTitle>
                                <CardDescription>
                                    Logo dan Identitas Visual
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="logo">Logo Situs</Label>
                                    <div className="flex flex-col items-center gap-4">
                                        {logoPreview ? (
                                            <div className="relative flex h-20 w-full items-center justify-center overflow-hidden rounded-md border bg-muted p-2">
                                                <img
                                                    src={logoPreview}
                                                    alt="Logo Preview"
                                                    className="h-full object-contain"
                                                />
                                            </div>
                                        ) : (
                                            <div className="flex h-20 w-full items-center justify-center rounded-md border-2 border-dashed text-xs text-muted-foreground">
                                                Belum ada logo
                                            </div>
                                        )}
                                        <Input
                                            id="logo"
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) =>
                                                handleFileChange(e, 'logo')
                                            }
                                        />
                                        <p className="text-[10px] text-muted-foreground">
                                            Rekomendasi: Tinggi maks 100px.
                                            PNG/JPG/WebP.
                                        </p>
                                    </div>
                                    {errors.logo && (
                                        <p className="text-sm text-red-500">
                                            {errors.logo}
                                        </p>
                                    )}
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="favicon">Favicon</Label>
                                    <div className="flex items-center gap-4">
                                        {faviconPreview ? (
                                            <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-md border bg-muted p-1">
                                                <img
                                                    src={faviconPreview}
                                                    alt="Favicon"
                                                    className="h-full w-full object-contain"
                                                />
                                            </div>
                                        ) : (
                                            <div className="flex h-12 w-12 items-center justify-center rounded-md border-2 border-dashed text-[10px] text-muted-foreground">
                                                None
                                            </div>
                                        )}
                                        <div className="flex-1">
                                            <Input
                                                id="favicon"
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) =>
                                                    handleFileChange(
                                                        e,
                                                        'favicon',
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                    {errors.favicon && (
                                        <p className="text-sm text-red-500">
                                            {errors.favicon}
                                        </p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Sosial Media</CardTitle>
                                <CardDescription>
                                    Tautan ke platform sosial
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-2">
                                    <Label className="flex items-center gap-2 pt-1">
                                        <Facebook className="h-4 w-4 text-blue-600" />{' '}
                                        Facebook
                                    </Label>
                                    <Input
                                        placeholder="https://facebook.com/..."
                                        value={data.social_facebook}
                                        onChange={(e) =>
                                            setData(
                                                'social_facebook',
                                                e.target.value,
                                            )
                                        }
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label className="flex items-center gap-2 pt-1">
                                        <Instagram className="h-4 w-4 text-pink-600" />{' '}
                                        Instagram
                                    </Label>
                                    <Input
                                        placeholder="https://instagram.com/..."
                                        value={data.social_instagram}
                                        onChange={(e) =>
                                            setData(
                                                'social_instagram',
                                                e.target.value,
                                            )
                                        }
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label className="flex items-center gap-2 pt-1">
                                        <Twitter className="h-4 w-4 text-sky-500" />{' '}
                                        Twitter / X
                                    </Label>
                                    <Input
                                        placeholder="https://twitter.com/..."
                                        value={data.social_twitter}
                                        onChange={(e) =>
                                            setData(
                                                'social_twitter',
                                                e.target.value,
                                            )
                                        }
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label className="flex items-center gap-2 pt-1">
                                        <Youtube className="h-4 w-4 text-red-600" />{' '}
                                        Youtube
                                    </Label>
                                    <Input
                                        placeholder="https://youtube.com/..."
                                        value={data.social_youtube}
                                        onChange={(e) =>
                                            setData(
                                                'social_youtube',
                                                e.target.value,
                                            )
                                        }
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Middle Column: General Settings */}
                    <div className="space-y-6 lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Informasi Umum</CardTitle>
                                <CardDescription>
                                    Detail utama yang muncul di situs
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div className="grid gap-2">
                                        <Label htmlFor="site_name">
                                            Nama Situs
                                        </Label>
                                        <Input
                                            id="site_name"
                                            value={data.site_name}
                                            onChange={(e) =>
                                                setData(
                                                    'site_name',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        {errors.site_name && (
                                            <p className="text-sm text-red-500">
                                                {errors.site_name}
                                            </p>
                                        )}
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="tagline">Tagline</Label>
                                        <Input
                                            id="tagline"
                                            value={data.tagline}
                                            onChange={(e) =>
                                                setData(
                                                    'tagline',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        {errors.tagline && (
                                            <p className="text-sm text-red-500">
                                                {errors.tagline}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="description">
                                        Deskripsi (Meta Description)
                                    </Label>
                                    <Textarea
                                        id="description"
                                        rows={4}
                                        value={data.description}
                                        onChange={(e) =>
                                            setData(
                                                'description',
                                                e.target.value,
                                            )
                                        }
                                    />
                                    {errors.description && (
                                        <p className="text-sm text-red-500">
                                            {errors.description}
                                        </p>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 gap-4 pt-2 md:grid-cols-2">
                                    <div className="grid gap-2">
                                        <Label className="flex items-center gap-2">
                                            <Mail className="h-4 w-4" /> Email
                                            Kontak
                                        </Label>
                                        <Input
                                            type="email"
                                            value={data.email}
                                            onChange={(e) =>
                                                setData('email', e.target.value)
                                            }
                                        />
                                        {errors.email && (
                                            <p className="text-sm text-red-500">
                                                {errors.email}
                                            </p>
                                        )}
                                    </div>

                                    <div className="grid gap-2">
                                        <Label className="flex items-center gap-2">
                                            <Phone className="h-4 w-4" />{' '}
                                            Telepon
                                        </Label>
                                        <Input
                                            value={data.phone}
                                            onChange={(e) =>
                                                setData('phone', e.target.value)
                                            }
                                        />
                                        {errors.phone && (
                                            <p className="text-sm text-red-500">
                                                {errors.phone}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="grid gap-2">
                                    <Label className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4" /> Alamat
                                        Kantor
                                    </Label>
                                    <Textarea
                                        rows={2}
                                        value={data.address}
                                        onChange={(e) =>
                                            setData('address', e.target.value)
                                        }
                                    />
                                    {errors.address && (
                                        <p className="text-sm text-red-500">
                                            {errors.address}
                                        </p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        <div className="sticky bottom-0 flex items-center justify-between border-t bg-background/95 pt-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                            <p className="text-sm text-muted-foreground italic">
                                Terakhir diperbarui:{' '}
                                {new Date().toLocaleDateString('id-ID')}
                            </p>
                            <Button
                                type="submit"
                                disabled={processing}
                                size="lg"
                            >
                                {processing
                                    ? 'Menyimpan...'
                                    : 'Simpan Perubahan'}
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
