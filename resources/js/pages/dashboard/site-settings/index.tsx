import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

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

export default function SiteSettings() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Site Settings" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="max-w-4xl rounded-xl border border-sidebar-border/70 bg-white p-6 shadow-sm dark:border-sidebar-border dark:bg-neutral-900">
                    <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">
                        Pengaturan Situs
                    </h2>

                    <form className="space-y-6">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Nama Situs
                                </label>
                                <input
                                    type="text"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-[#3357a7] focus:ring-1 focus:ring-[#3357a7] dark:border-gray-700 dark:bg-gray-800"
                                    defaultValue="LENSAPUBLIK"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Tagline
                                </label>
                                <input
                                    type="text"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-[#3357a7] focus:ring-1 focus:ring-[#3357a7] dark:border-gray-700 dark:bg-gray-800"
                                    defaultValue="Academic News Portal"
                                />
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Deskripsi Situs
                                </label>
                                <textarea
                                    rows={3}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-[#3357a7] focus:ring-1 focus:ring-[#3357a7] dark:border-gray-700 dark:bg-gray-800"
                                    defaultValue="Portal berita akademik terpercaya menyajikan informasi terkini seputar dunia pendidikan, riset, dan pengabdian masyarakat."
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Email Kontak
                                </label>
                                <input
                                    type="email"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-[#3357a7] focus:ring-1 focus:ring-[#3357a7] dark:border-gray-700 dark:bg-gray-800"
                                    defaultValue="redaksi@lensapublik.ac.id"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Telepon
                                </label>
                                <input
                                    type="text"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-[#3357a7] focus:ring-1 focus:ring-[#3357a7] dark:border-gray-700 dark:bg-gray-800"
                                    defaultValue="+62 21 1234 5678"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end border-t border-gray-100 pt-6 dark:border-gray-800">
                            <button
                                type="button"
                                className="rounded-lg bg-[#3357a7] px-6 py-2 text-sm font-bold text-white shadow-md transition hover:bg-blue-800"
                            >
                                Simpan Perubahan
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
