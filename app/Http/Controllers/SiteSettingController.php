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
        ]);

        SiteSetting::updateOrCreate(
            ['id' => 1], // Always update the first record
            $validated
        );

        return back()->with('success', 'Pengaturan situs berhasil diperbarui.');
    }
}
