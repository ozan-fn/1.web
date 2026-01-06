<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\SiteSettingController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\SubCategoryController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\NewsController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('dashboard/site-settings', [SiteSettingController::class, 'index'])->name('dashboard.site-settings');
    Route::patch('dashboard/site-settings', [SiteSettingController::class, 'update'])->name('dashboard.site-settings.update');

    Route::resource('dashboard/categories', CategoryController::class)->names([
        'index' => 'dashboard.categories.index',
        'create' => 'dashboard.categories.create',
        'store' => 'dashboard.categories.store',
        'edit' => 'dashboard.categories.edit',
        'update' => 'dashboard.categories.update',
        'destroy' => 'dashboard.categories.destroy',
    ]);

    Route::resource('dashboard/sub-categories', SubCategoryController::class)->names([
        'index' => 'dashboard.sub-categories.index',
        'create' => 'dashboard.sub-categories.create',
        'store' => 'dashboard.sub-categories.store',
        'edit' => 'dashboard.sub-categories.edit',
        'update' => 'dashboard.sub-categories.update',
        'destroy' => 'dashboard.sub-categories.destroy',
    ]);

    Route::resource('dashboard/tags', TagController::class)->names([
        'index' => 'dashboard.tags.index',
        'create' => 'dashboard.tags.create',
        'store' => 'dashboard.tags.store',
        'edit' => 'dashboard.tags.edit',
        'update' => 'dashboard.tags.update',
        'destroy' => 'dashboard.tags.destroy',
    ]);

    Route::post('dashboard/posts/upload-image', [NewsController::class, 'uploadEditorImage'])->name('dashboard.posts.upload-image');
    Route::resource('dashboard/posts', NewsController::class)->names([
        'index' => 'dashboard.posts.index',
        'create' => 'dashboard.posts.create',
        'store' => 'dashboard.posts.store',
        'edit' => 'dashboard.posts.edit',
        'update' => 'dashboard.posts.update',
        'destroy' => 'dashboard.posts.destroy',
    ]);
});

require __DIR__ . '/settings.php';
