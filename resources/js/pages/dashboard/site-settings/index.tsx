import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { resizeImage } from '@/lib/image-compression';
import dashboard from '@/routes/dashboard';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Facebook, Instagram, Mail, MapPin, Palette, Phone, Twitter, Youtube } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Site Settings', href: '/dashboard/site-settings' },
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
        color_primary: string | null;
        color_primary_foreground: string | null;
        color_border: string | null;
        color_radius: string | null;
        social_facebook: string | null;
        social_instagram: string | null;
        social_twitter: string | null;
        social_youtube: string | null;
    } | null;
}

export default function SiteSettings({ settings }: SiteSettingsProps) {
    const [logoPreview, setLogoPreview] = useState<string | null>(settings?.logo ? `/storage/${settings.logo}` : null);
    const [faviconPreview, setFaviconPreview] = useState<string | null>(settings?.favicon ? `/storage/${settings.favicon}` : null);

    const { data, setData, post, processing, errors } = useForm({
        _method: 'PATCH',
        site_name: settings?.site_name ?? 'LENSAPUBLIK',
        tagline: settings?.tagline ?? '',
        description: settings?.description ?? '',
        email: settings?.email ?? '',
        phone: settings?.phone ?? '',
        address: settings?.address ?? '',
        logo: null as File | null,
        favicon: null as File | null,
        // Default Warna
        color_primary: settings?.color_primary ?? '#000000',
        color_primary_foreground: settings?.color_primary_foreground ?? '#ffffff',
        color_border: settings?.color_border ?? '#e5e5e5',
        color_radius: settings?.color_radius ?? '0.625rem',
        // Sosmed
        social_facebook: settings?.social_facebook ?? '',
        social_instagram: settings?.social_instagram ?? '',
        social_twitter: settings?.social_twitter ?? '',
        social_youtube: settings?.social_youtube ?? '',
    });

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, field: 'logo' | 'favicon') => {
        const file = e.target.files?.[0];
        if (file) {
            try {
                const maxHeight = field === 'logo' ? 100 : 64;
                const resized = await resizeImage(file, 800, maxHeight);
                setData(field, resized);

                const reader = new FileReader();
                reader.onloadend = () => {
                    if (field === 'logo') setLogoPreview(reader.result as string);
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

    // Helper: Input Warna dengan dukungan Manual Text Input
    const ColorInput = ({ label, field }: { label: string; field: keyof typeof data }) => (
        <div className="space-y-2 rounded-lg border p-3">
            <Label htmlFor={field as string} className="text-xs font-medium">
                {label}
            </Label>
            <div className="flex items-center gap-2">
                <div className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-md border">
                    <input type="color" className="absolute h-[150%] w-[150%] cursor-pointer border-none bg-transparent" value={data[field] as string} onChange={(e) => setData(field as any, e.target.value)} />
                </div>
                <Input type="text" className="h-9 font-mono text-xs" value={data[field] as string} onChange={(e) => setData(field as any, e.target.value)} placeholder="#000000" />
            </div>
        </div>
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Site Settings" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4 lg:p-8">
                <form onSubmit={submit} className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Left Column: Appearance & Assets */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Palette className="h-5 w-5" /> Appearance
                                </CardTitle>
                                <CardDescription>Identitas visual (Aman untuk Dark Mode)</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <ColorInput label="Primary Color (Brand)" field="color_primary" />
                                <ColorInput label="Text on Primary" field="color_primary_foreground" />
                                <ColorInput label="Border Color" field="color_border" />

                                <div className="grid gap-2 pt-2">
                                    <Label htmlFor="radius">Corner Radius (Kebulatan)</Label>
                                    <Select value={data.color_radius} onValueChange={(value) => setData('color_radius', value)}>
                                        <SelectTrigger id="radius" className="w-full">
                                            <SelectValue placeholder="Pilih radius" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="0px">None (Sharp)</SelectItem>
                                            <SelectItem value="0.25rem">Small (4px)</SelectItem>
                                            <SelectItem value="0.5rem">Medium (8px)</SelectItem>
                                            <SelectItem value="0.625rem">Default (10px)</SelectItem>
                                            <SelectItem value="1rem">Large (16px)</SelectItem>
                                            <SelectItem value="9999px">Full (Pill)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Assets</CardTitle>
                                <CardDescription>Logo dan Favicon situs</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="logo">Logo Situs</Label>
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="relative flex h-20 w-full items-center justify-center overflow-hidden rounded-md border bg-muted p-2">{logoPreview ? <img src={logoPreview} alt="Logo" className="h-full object-contain" /> : <span className="text-xs text-muted-foreground">No Logo</span>}</div>
                                        <Input id="logo" type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'logo')} />
                                    </div>
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="favicon">Favicon</Label>
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-md border bg-muted p-1">{faviconPreview ? <img src={faviconPreview} alt="Favicon" className="h-full w-full object-contain" /> : <span className="text-[10px]">None</span>}</div>
                                        <Input id="favicon" type="file" accept="image/*" className="flex-1" onChange={(e) => handleFileChange(e, 'favicon')} />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column: General Information & Socials */}
                    <div className="space-y-6 lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Informasi Umum</CardTitle>
                                <CardDescription>Detail publikasi dan kontak</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div className="grid gap-2">
                                        <Label htmlFor="site_name">Nama Situs</Label>
                                        <Input id="site_name" value={data.site_name} onChange={(e) => setData('site_name', e.target.value)} />
                                        {errors.site_name && <p className="text-xs text-red-500">{errors.site_name}</p>}
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="tagline">Tagline</Label>
                                        <Input id="tagline" value={data.tagline} onChange={(e) => setData('tagline', e.target.value)} />
                                    </div>
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="description">Meta Deskripsi</Label>
                                    <Textarea id="description" rows={3} value={data.description} onChange={(e) => setData('description', e.target.value)} />
                                </div>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div className="grid gap-2">
                                        <Label className="flex items-center gap-2">
                                            <Mail className="h-4 w-4" /> Email Publik
                                        </Label>
                                        <Input type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label className="flex items-center gap-2">
                                            <Phone className="h-4 w-4" /> Telepon
                                        </Label>
                                        <Input value={data.phone} onChange={(e) => setData('phone', e.target.value)} />
                                    </div>
                                </div>

                                <div className="grid gap-2">
                                    <Label className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4" /> Alamat Kantor
                                    </Label>
                                    <Textarea rows={2} value={data.address} onChange={(e) => setData('address', e.target.value)} />
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Media Sosial</CardTitle>
                            </CardHeader>
                            <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                {[
                                    { id: 'social_facebook', label: 'Facebook', Icon: Facebook, color: 'text-blue-600' },
                                    { id: 'social_instagram', label: 'Instagram', Icon: Instagram, color: 'text-pink-600' },
                                    { id: 'social_twitter', label: 'Twitter / X', Icon: Twitter, color: 'text-sky-500' },
                                    { id: 'social_youtube', label: 'Youtube', Icon: Youtube, color: 'text-red-600' },
                                ].map(({ id, label, Icon, color }) => (
                                    <div key={id} className="grid gap-2">
                                        <Label className="flex items-center gap-2">
                                            <Icon className={`h-4 w-4 ${color}`} /> {label}
                                        </Label>
                                        <Input placeholder="https://..." value={data[id as keyof typeof data] as string} onChange={(e) => setData(id as any, e.target.value)} />
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        <div className="flex items-center justify-between border-t pt-6">
                            <p className="text-xs text-muted-foreground italic">Terakhir diperbarui: {new Date().toLocaleDateString('id-ID')}</p>
                            <Button type="submit" disabled={processing} size="lg" className="min-w-[150px]">
                                {processing ? 'Menyimpan...' : 'Simpan Konfigurasi'}
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
