<?php

namespace App\Http\Middleware;

use App\Models\SiteSetting;
use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        [$message, $author] = str(Inspiring::quotes()->random())->explode('-');

        // Ambil Site Settings dari Cache untuk performa maksimal
        $settings = Cache::remember('site_settings', 60, function () {
            return SiteSetting::first();
        });

        return [
            ...parent::share($request),
            'name' => config('app.name'),

            // Tambahkan data settings agar bisa diakses di semua halaman React
            'settings' => $settings,
            'seo' => [
                'site_name' => $settings->site_name ?? config('app.name'),
                'description' => $settings->description ?? 'Portal Berita Terpercaya',
                'logo' => $settings->logo ? asset('storage/' . $settings->logo) : null,
                'favicon' => $settings->favicon ? asset('storage/' . $settings->favicon) : asset('favicon.ico'),
            ],

            'quote' => [
                'message' => trim($message),
                'author' => trim($author)
            ],
            'auth' => [
                'user' => $request->user(),
            ],
            'sidebarOpen' => !$request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
            'flash' => [
                'success' => $request->session()->get('success'),
                'error' => $request->session()->get('error'),
            ],
        ];
    }
}