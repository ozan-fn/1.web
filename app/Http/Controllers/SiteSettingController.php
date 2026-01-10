<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use App\Models\SiteSetting;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cache;

class SiteSettingController extends Controller
{
    public function index(): Response
    {
        $settings = SiteSetting::first();

        return Inertia::render('dashboard/site-settings/index', [
            'settings' => $settings
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'site_name' => 'required|string|max:255',
            'tagline' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string',
            'logo' => 'nullable|image|max:2048',
            'favicon' => 'nullable|image|max:1024',

            // Tambahkan Validasi Warna (HEX format)
            'color_primary' => 'nullable|string|max:20',
            'color_primary_foreground' => 'nullable|string|max:20',
            'color_background' => 'nullable|string|max:20',
            'color_foreground' => 'nullable|string|max:20',
            'color_card' => 'nullable|string|max:20',
            'color_border' => 'nullable|string|max:20',
            'color_radius' => 'nullable|string|max:20',

            'social_facebook' => 'nullable|url',
            'social_instagram' => 'nullable|url',
            'social_twitter' => 'nullable|url',
            'social_youtube' => 'nullable|url',
        ]);

        $settings = SiteSetting::first() ?? new SiteSetting();

        // Kunci agar path file lama tidak tertimpa NULL jika user tidak upload file baru
        unset($validated['logo'], $validated['favicon']);

        // Handle Upload Logo
        if ($request->hasFile('logo')) {
            if ($settings->logo) {
                Storage::disk('public')->delete($settings->logo);
            }
            $validated['logo'] = $request->file('logo')->store('site', 'public');
        }

        // Handle Upload Favicon
        if ($request->hasFile('favicon')) {
            if ($settings->favicon) {
                Storage::disk('public')->delete($settings->favicon);
            }
            $validated['favicon'] = $request->file('favicon')->store('site', 'public');
        }

        // Eksekusi Update
        DB::transaction(function () use ($validated) {
            SiteSetting::updateOrCreate(
                ['id' => 1],
                $validated
            );
        });

        // Hapus cache agar perubahan warna/logo langsung terlihat di frontend
        Cache::forget('site_settings');

        return back()->with('success', 'Pengaturan situs berhasil diperbarui.');
    }
}