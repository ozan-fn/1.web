<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    @php
        // Ambil data dari props yang dikirim middleware
        $settings = $page['props']['settings'] ?? null;
        $seo = $page['props']['seo'] ?? null;

        // Logika title & meta (tetap izinkan override dari controller)
        $siteName = $seo['site_name'] ?? config('app.name');
        $displayTitle = isset($page['props']['title']) ? $page['props']['title'] . ' - ' . $siteName : $siteName;
    @endphp

    <title inertia>{{ $displayTitle }}</title>

    {{-- 1. Theme Manager (Script Pencegah Flash White/Dark) --}}
    <script>
        (function () {
            const theme = localStorage.getItem('theme') || 'system';
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (theme === 'dark' || (theme === 'system' && prefersDark)) {
                document.documentElement.classList.add('dark');
            }
        })();
    </script>

    {{-- 2. SEO & Favicon --}}
    <meta name="description" content="{{ $page['props']['meta'] ?? $seo['description'] }}">
    <link rel="icon" href="{{ $seo['favicon'] }}">
    <link rel="apple-touch-icon" href="{{ $seo['favicon'] }}">
    <link rel="canonical" href="{{ url()->current() }}">

    {{-- 3. Dynamic Theme Colors (CSS Variables) --}}
    @if($settings)
        <style>
            :root {
                /* Gunakan sintaks Array: $settings['kolom'] */
                --primary:
                    {{ $settings['color_primary'] ?? '#000000' }}
                    !important;
                --primary-foreground:
                    {{ $settings['color_primary_foreground'] ?? '#ffffff' }}
                    !important;

                --border:
                    {{ $settings['color_border'] ?? '#e5e7eb' }}
                    !important;
                --input:
                    {{ $settings['color_border'] ?? '#e5e7eb' }}
                    !important;
                --radius:
                    {{ $settings['color_radius'] ?? '0.625rem' }}
                    !important;

                --ring: var(--primary) !important;
                --sidebar-primary: var(--primary) !important;
                --sidebar-ring: var(--primary) !important;
            }
        </style>
    @endif

    {{-- 4. Fonts & Assets --}}
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=inter:300,400,500,600,700,800,900|pt-serif:400,700"
        rel="stylesheet" />

    @viteReactRefresh
    @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
    @inertiaHead

    {{-- 5. Analytics --}}
    @production
        <script type="text/javascript">
            (function (c, l, a, r, i, t, y) {
                c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) };
                t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
                y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
            })(window, document, "clarity", "script", "ux9cg8p64m");
        </script>
    @endproduction
</head>

<body class="font-sans antialiased">
    @inertia
</body>

</html>