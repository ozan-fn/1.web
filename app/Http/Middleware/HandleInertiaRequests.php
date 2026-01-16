<?php

namespace App\Http\Middleware;

use App\Models\SiteSetting;
use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function share(Request $request): array
    {
        // 1. Ambil Settings dari Database (Cached)
        $settings = Cache::rememberForever('site_settings', function () {
            return SiteSetting::first();
        });

        $domain = $request->getHost();
        $appName = config('app.name');

        $domainParts = explode('.', $domain);
        $brandName = ucfirst(collect($domainParts)->reverse()->values()->get(1) ?? 'Localhost');


        // 2. Ambil Tema (Tetap menggunakan function getAppTheme yang hardcoded)
        $theme = $this->getAppTheme($domain);

        // 3. Quote
        [$message, $author] = str(Inspiring::quotes()->random())->explode('-');

        return [
            ...parent::share($request),

            // Inject settings agar bisa dipakai di Footer/Navbar jika perlu
            'siteSettings' => $settings,

            'app' => [
                // Gunakan nama dari DB, kalau kosong pakai config env
                'name' => $brandName,
                'url' => $request->url(),
                'domain' => $domain,
            ],

            // Kirim data tema lengkap ke Frontend
            'theme' => $theme,

            // INI BAGIAN YANG DIUBAH SESUAI REQUEST
            'seo' => [
                'title' => $brandName,
                'description' => $settings->description ?? 'Portal Berita Terpercaya',
                // Logo dari Storage atau null
                'logo' => ($settings && $settings->logo) ? asset('storage/' . $settings->logo) : null,
                'favicon' => ($settings && $settings->favicon) ? asset('storage/' . $settings->favicon) : asset('favicon.ico'),
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

    private function getAppTheme(string $domain): array
    {
        // DAFTAR TEMA LENGKAP (URL Font + CSS Name)
        $themes = [
            [
                'name' => 'Default Blue',
                'radius' => '0.5rem',
                'font_url' => 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
                'font_name' => "'Inter', sans-serif",
                'light' => ['primary' => '#2563eb', 'border' => '#e2e8f0'],
                'dark' => ['primary' => '#3b82f6', 'border' => '#1e293b']
            ],
            [
                'name' => 'Corporate',
                'radius' => '0.3rem',
                'font_url' => 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap',
                'font_name' => "'Roboto', sans-serif",
                'light' => ['primary' => '#475569', 'border' => '#cbd5e1'],
                'dark' => ['primary' => '#94a3b8', 'border' => '#0f172a']
            ],
            [
                'name' => 'Editorial',
                'radius' => '0.2rem',
                'font_url' => 'https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700&display=swap',
                'font_name' => "'Merriweather', serif",
                'light' => ['primary' => '#be123c', 'border' => '#fecdd3'],
                'dark' => ['primary' => '#fb7185', 'border' => '#881337']
            ],
            [
                'name' => 'Tech',
                'radius' => '0.5rem',
                'font_url' => 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700&display=swap',
                'font_name' => "'Plus Jakarta Sans', sans-serif",
                'light' => ['primary' => '#4f46e5', 'border' => '#e0e7ff'],
                'dark' => ['primary' => '#818cf8', 'border' => '#312e81']
            ],
            [
                'name' => 'Nature',
                'radius' => '0.75rem',
                'font_url' => 'https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap',
                'font_name' => "'Nunito', sans-serif",
                'light' => ['primary' => '#059669', 'border' => '#a7f3d0'],
                'dark' => ['primary' => '#34d399', 'border' => '#064e3b']
            ],
            [
                'name' => 'Luxury',
                'radius' => '0rem',
                'font_url' => 'https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600&display=swap',
                'font_name' => "'Lora', serif",
                'light' => ['primary' => '#b45309', 'border' => '#fde68a'],
                'dark' => ['primary' => '#fbbf24', 'border' => '#451a03']
            ],
            [
                'name' => 'Minimal',
                'radius' => '0rem',
                'font_url' => 'https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700&display=swap',
                'font_name' => "'Manrope', sans-serif",
                'light' => ['primary' => '#18181b', 'border' => '#e4e4e7'],
                'dark' => ['primary' => '#fafafa', 'border' => '#27272a']
            ],
            [
                'name' => 'Creative',
                'radius' => '1rem',
                'font_url' => 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;600&display=swap',
                'font_name' => "'Space Grotesk', sans-serif",
                'light' => ['primary' => '#7c3aed', 'border' => '#ddd6fe'],
                'dark' => ['primary' => '#a78bfa', 'border' => '#4c1d95']
            ],
            [
                'name' => 'Warm',
                'radius' => '0.5rem',
                'font_url' => 'https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap',
                'font_name' => "'Lato', sans-serif",
                'light' => ['primary' => '#ea580c', 'border' => '#ffedd5'],
                'dark' => ['primary' => '#fb923c', 'border' => '#7c2d12']
            ],
            [
                'name' => 'Ocean',
                'radius' => '0.5rem',
                'font_url' => 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap',
                'font_name' => "'DM Sans', sans-serif",
                'light' => ['primary' => '#0d9488', 'border' => '#ccfbf1'],
                'dark' => ['primary' => '#2dd4bf', 'border' => '#134e4a']
            ],
            [
                'name' => 'Berry',
                'radius' => '1rem',
                'font_url' => 'https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;600&display=swap',
                'font_name' => "'Work Sans', sans-serif",
                'light' => ['primary' => '#db2777', 'border' => '#fce7f3'],
                'dark' => ['primary' => '#f472b6', 'border' => '#831843']
            ],
            [
                'name' => 'Forest',
                'radius' => '0.2rem',
                'font_url' => 'https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&display=swap',
                'font_name' => "'Libre Baskerville', serif",
                'light' => ['primary' => '#15803d', 'border' => '#dcfce7'],
                'dark' => ['primary' => '#4ade80', 'border' => '#14532d']
            ],
            [
                'name' => 'Sky',
                'radius' => '0.75rem',
                'font_url' => 'https://fonts.googleapis.com/css2?family=Mulish:wght@400;600;700&display=swap',
                'font_name' => "'Mulish', sans-serif",
                'light' => ['primary' => '#0284c7', 'border' => '#e0f2fe'],
                'dark' => ['primary' => '#38bdf8', 'border' => '#0c4a6e']
            ],
            [
                'name' => 'Midnight',
                'radius' => '0.25rem',
                'font_url' => 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&display=swap',
                'font_name' => "'IBM Plex Sans', sans-serif",
                'light' => ['primary' => '#1e3a8a', 'border' => '#dbeafe'],
                'dark' => ['primary' => '#60a5fa', 'border' => '#172554']
            ],
            [
                'name' => 'Sunset',
                'radius' => '0.5rem',
                'font_url' => 'https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;600;700&display=swap',
                'font_name' => "'Public Sans', sans-serif",
                'light' => ['primary' => '#e11d48', 'border' => '#ffe4e6'],
                'dark' => ['primary' => '#fb7185', 'border' => '#881337']
            ],
            [
                'name' => 'Fresh',
                'radius' => '0.6rem',
                'font_url' => 'https://fonts.googleapis.com/css2?family=Figtree:wght@400;600;700&display=swap',
                'font_name' => "'Figtree', sans-serif",
                'light' => ['primary' => '#65a30d', 'border' => '#ecfccb'],
                'dark' => ['primary' => '#a3e635', 'border' => '#3f6212']
            ],
            [
                'name' => 'Royal',
                'radius' => '0.4rem',
                'font_url' => 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap',
                'font_name' => "'Open Sans', sans-serif",
                'light' => ['primary' => '#6d28d9', 'border' => '#ede9fe'],
                'dark' => ['primary' => '#a78bfa', 'border' => '#4c1d95']
            ],
            [
                'name' => 'Earthy',
                'radius' => '0.3rem',
                'font_url' => 'https://fonts.googleapis.com/css2?family=Bitter:wght@400;600&display=swap',
                'font_name' => "'Bitter', serif",
                'light' => ['primary' => '#57534e', 'border' => '#e7e5e4'],
                'dark' => ['primary' => '#a8a29e', 'border' => '#1c1917']
            ],
            [
                'name' => 'Cypher',
                'radius' => '0.8rem',
                'font_url' => 'https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;700&display=swap',
                'font_name' => "'Outfit', sans-serif",
                'light' => ['primary' => '#0891b2', 'border' => '#cffafe'],
                'dark' => ['primary' => '#22d3ee', 'border' => '#155e75']
            ],
            [
                'name' => 'Lavender',
                'radius' => '1.0rem',
                'font_url' => 'https://fonts.googleapis.com/css2?family=Quicksand:wght@400;600;700&display=swap',
                'font_name' => "'Quicksand', sans-serif",
                'light' => ['primary' => '#9333ea', 'border' => '#f3e8ff'],
                'dark' => ['primary' => '#c084fc', 'border' => '#581c87']
            ],
        ];

        $seed = abs(crc32($domain));
        $index = $seed % count($themes);

        return $themes[$index];
    }
}