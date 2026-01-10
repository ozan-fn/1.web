<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use App\Models\SiteSetting;

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
            'social_facebook' => 'nullable|url',
            'social_instagram' => 'nullable|url',
            'social_twitter' => 'nullable|url',
            'social_youtube' => 'nullable|url',
        ]);

        $settings = SiteSetting::first() ?? new SiteSetting();

        // --- LOGIC KUNCI AGAR LOGO TIDAK HILANG ---
        // Kita hapus logo & favicon dari array $validated bawaan validasi.
        // Kita hanya akan mengisinya kembali JIKA ada file baru.
        unset($validated['logo'], $validated['favicon']);

        if ($request->hasFile('logo')) {
            // Hapus file lama jika ada
            if ($settings->logo) {
                \Illuminate\Support\Facades\Storage::disk('public')->delete($settings->logo);
            }
            // Simpan file baru ke array $validated
            $validated['logo'] = $request->file('logo')->store('site', 'public');
        }

        if ($request->hasFile('favicon')) {
            if ($settings->favicon) {
                \Illuminate\Support\Facades\Storage::disk('public')->delete($settings->favicon);
            }
            $validated['favicon'] = $request->file('favicon')->store('site', 'public');
        }

        // Gunakan DB Transaction agar jika query error, file tidak terlanjur terhapus (Opsional tapi bagus)
        \Illuminate\Support\Facades\DB::transaction(function () use ($validated) {
            SiteSetting::updateOrCreate(
                ['id' => 1],
                $validated
            );
        });

        \Illuminate\Support\Facades\Cache::forget('site_settings');

        return back()->with('success', 'Pengaturan situs berhasil diperbarui.');
    }
}
