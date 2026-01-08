<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    {{-- Inline script to detect system dark mode preference and apply it immediately --}}
    <script>
        (function () {
            const appearance = '{{ $appearance ?? "system" }}';
            const storageTheme = localStorage.getItem('theme');

            if (storageTheme === 'dark' || (!storageTheme && appearance === 'dark')) {
                document.documentElement.classList.add('dark');
            } else if (storageTheme === 'light') {
                document.documentElement.classList.remove('dark');
            } else if (appearance === 'system') {
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (prefersDark) {
                    document.documentElement.classList.add('dark');
                }
            }
        })();
    </script>

    {{-- Inline style to set the HTML background color based on our theme in app.css --}}
    <style>
        html {
            background-color: oklch(1 0 0);
        }

        html.dark {
            background-color: oklch(0.145 0 0);
        }
    </style>

    @php
        $siteSettings = \App\Models\SiteSetting::first();
        $siteName = $siteSettings->site_name ?? config('app.name', 'Lensa Publik');
        $siteDescription = $siteSettings->description ?? 'Portal Berita Terpercaya';
        $favicon = $siteSettings && $siteSettings->favicon ? asset('storage/' . $siteSettings->favicon) : null;
        $logo = $siteSettings && $siteSettings->logo ? asset('storage/' . $siteSettings->logo) : null;

        // Metadata override from controller
        $pageTitle = isset($title) ? $title . ' - ' . $siteName : $siteName;
        $pageDescription = $meta ?? $siteDescription;
        $pageImage = isset($image) ? asset('storage/' . $image) : $logo;
        $pageAuthor = $author ?? $siteName;
        $pageKeywords = $tags ?? '';
    @endphp

    <title inertia>{{ $pageTitle }}</title>

    <!-- SEO Meta Tags -->
    <meta name="description" content="{{ $pageDescription }}">
    @if($pageKeywords)
        <meta name="keywords" content="{{ $pageKeywords }}">
    @endif
    <meta name="author" content="{{ $pageAuthor }}">
    <link rel="canonical" href="{{ url()->current() }}">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="{{ isset($published_at) ? 'article' : 'website' }}">
    <meta property="og:url" content="{{ url()->current() }}">
    <meta property="og:title" content="{{ $pageTitle }}">
    <meta property="og:description" content="{{ $pageDescription }}">
    @if($pageImage)
        <meta property="og:image" content="{{ $pageImage }}">
    @endif

    @if(isset($published_at))
        <meta property="article:published_time" content="{{ $published_at }}">
        <meta property="article:author" content="{{ $pageAuthor }}">
        <meta property="article:section" content="{{ $category }}">
        @if(isset($tags) && !empty($tags))
            @foreach(explode(', ', $tags) as $tag)
                <meta property="article:tag" content="{{ $tag }}">
            @endforeach
        @endif
    @endif

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:url" content="{{ url()->current() }}">
    <meta name="twitter:title" content="{{ $pageTitle }}">
    <meta name="twitter:description" content="{{ $pageDescription }}">
    @if($pageImage)
        <meta name="twitter:image" content="{{ $pageImage }}">
    @endif

    @if($favicon)
        <link rel="icon" href="{{ $favicon }}">
        <link rel="apple-touch-icon" href="{{ $favicon }}">
    @else
        <link rel="icon" href="/favicon.ico" sizes="any">
        <link rel="icon" href="/favicon.svg" type="image/svg+xml">
        <link rel="apple-touch-icon" href="/apple-touch-icon.png">
    @endif

    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

    @viteReactRefresh
    @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
    @inertiaHead

    <script type="text/javascript">
        (function (c, l, a, r, i, t, y) {
            c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) };
            t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
            y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
        })(window, document, "clarity", "script", "ux9cg8p64m");
    </script>
</head>

<body class="font-sans antialiased">
    @inertia
</body>

</html>