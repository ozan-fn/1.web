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
import dashboard from '@/routes/dashboard';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

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
    } | null;
}

export default function SiteSettings({ settings }: SiteSettingsProps) {
    const { data, setData, patch, processing, errors } = useForm({
        site_name: settings?.site_name ?? 'LENSAPUBLIK',
        tagline: settings?.tagline ?? 'Academic News Portal',
        description:
            settings?.description ??
            'Portal berita akademik terpercaya menyajikan informasi terkini seputar dunia pendidikan, riset, dan pengabdian masyarakat.',
        email: settings?.email ?? 'redaksi@lensapublik.ac.id',
        phone: settings?.phone ?? '+62 21 1234 5678',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        patch(dashboard.siteSettings.update().url);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Site Settings" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <Card className="max-w-4xl">
                    <CardHeader>
                        <CardTitle>Pengaturan Situs</CardTitle>
                        <CardDescription>
                            Kelola informasi dasar situs web Anda.
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={submit} className="space-y-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div className="grid gap-2">
                                    <Label htmlFor="site_name">
                                        Nama Situs
                                    </Label>
                                    <Input
                                        id="site_name"
                                        value={data.site_name}
                                        onChange={(e) =>
                                            setData('site_name', e.target.value)
                                        }
                                        aria-invalid={!!errors.site_name}
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
                                            setData('tagline', e.target.value)
                                        }
                                        aria-invalid={!!errors.tagline}
                                    />
                                    {errors.tagline && (
                                        <p className="text-sm text-red-500">
                                            {errors.tagline}
                                        </p>
                                    )}
                                </div>

                                <div className="grid gap-2 md:col-span-2">
                                    <Label htmlFor="description">
                                        Deskripsi Situs
                                    </Label>
                                    <Textarea
                                        id="description"
                                        rows={3}
                                        value={data.description}
                                        onChange={(e) =>
                                            setData(
                                                'description',
                                                e.target.value,
                                            )
                                        }
                                        aria-invalid={!!errors.description}
                                    />
                                    {errors.description && (
                                        <p className="text-sm text-red-500">
                                            {errors.description}
                                        </p>
                                    )}
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email Kontak</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData('email', e.target.value)
                                        }
                                        aria-invalid={!!errors.email}
                                    />
                                    {errors.email && (
                                        <p className="text-sm text-red-500">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="phone">Telepon</Label>
                                    <Input
                                        id="phone"
                                        value={data.phone}
                                        onChange={(e) =>
                                            setData('phone', e.target.value)
                                        }
                                        aria-invalid={!!errors.phone}
                                    />
                                    {errors.phone && (
                                        <p className="text-sm text-red-500">
                                            {errors.phone}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-end pt-6">
                                <Button type="submit" disabled={processing}>
                                    {processing
                                        ? 'Menyimpan...'
                                        : 'Simpan Perubahan'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
