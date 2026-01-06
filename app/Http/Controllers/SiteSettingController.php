<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class SiteSettingController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('dashboard/site-settings/index');
    }
}
