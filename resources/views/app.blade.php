<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    @php
        /* AMBIL DATA LANGSUNG DARI MIDDLEWARE */
        $theme = $page['props']['theme'];
        $seo = $page['props']['seo'] ?? [];
        $siteName = $seo['title'] ?? config('app.name');
    @endphp

    <title inertia>{{ $siteName }}</title>

    {{-- Script Pencegah Flash (Kedip) saat Dark Mode --}}
    <script>
        (function () {
            const theme = localStorage.getItem('theme') || 'system';
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (theme === 'dark' || (theme === 'system' && prefersDark)) {
                document.documentElement.classList.add('dark');
            }
        })();
    </script>

    {{-- SEO & Icons --}}
    <meta name="description" content="{{ $seo['description'] ?? '' }}">
    <link rel="icon" href="{{ $seo['favicon'] ?? asset('favicon.ico') }}">
    <link rel="canonical" href="{{ url()->current() }}">

    {{-- LOAD FONT DINAMIS (Menggunakan URL dari Middleware) --}}
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="{{ $theme['font_url'] }}" rel="stylesheet">

    {{-- INJECT VARIABLES KE CSS --}}
    <style>
        /* Paksa Font Body */
        body {
            font-family:
                {!! $theme['font_name'] !!}
                !important;
        }

        :root {
            /* FONT VARIABLE */
            --font-sans:
                {!! $theme['font_name'] !!}
                !important;

            /* LIGHT MODE */
            --primary:
                {{ $theme['light']['primary'] }}
                !important;
            --primary-foreground: #ffffff !important;
            --border:
                {{ $theme['light']['border'] }}
                !important;
            --input:
                {{ $theme['light']['border'] }}
                !important;
            --radius:
                {{ $theme['radius'] }}
                !important;

            /* SHADCN COMPONENTS */
            --ring: var(--primary) !important;
            --sidebar-primary: var(--primary) !important;
            --sidebar-ring: var(--primary) !important;
            --sidebar-primary-foreground: var(--primary-foreground) !important;
        }

        /* DARK MODE OVERRIDES */
        .dark {
            --primary:
                {{ $theme['dark']['primary'] }}
                !important;
            --border:
                {{ $theme['dark']['border'] }}
                !important;
            --input:
                {{ $theme['dark']['border'] }}
                !important;
            --ring: var(--primary) !important;
        }
    </style>

    @viteReactRefresh
    @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
    @inertiaHead
</head>

<body class="font-sans antialiased">
    @inertia
</body>

</html>