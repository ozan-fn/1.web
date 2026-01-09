<?php

namespace App\Console\Commands;

use App\Models\NewsImage;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;

class CleanupUnusedNewsImages extends Command
{
    /**
     * Nama perintah yang dijalankan via CLI
     * Contoh penggunaan: php artisan news:cleanup-images
     */
    protected $signature = 'news:cleanup-images';

    /**
     * Deskripsi perintah saat muncul di php artisan list
     */
    protected $description = 'Hapus gambar yang diunggah ke editor tapi tidak pernah disimpan ke dalam postingan (status inactive)';

    /**
     * Logika utama pembersihan
     */
    public function handle()
    {
        // 1. Ambil gambar dengan status 'inactive' yang berumur lebih dari 24 jam
        // Kita beri jeda 24 jam agar tidak menghapus gambar yang sedang dalam proses penulisan oleh user
        $images = NewsImage::where('status', 'inactive')
            ->where('created_at', '<', now()->subDay())
            ->get();

        if ($images->isEmpty()) {
            $this->info('Tidak ada gambar sampah yang ditemukan.');
            return 0;
        }

        $count = 0;
        foreach ($images as $image) {
            // 2. Cek apakah file benar-benar ada di storage sebelum dihapus
            if (Storage::disk('public')->exists($image->path)) {
                Storage::disk('public')->delete($image->path);
            }

            // 3. Hapus data dari database
            $image->delete();
            $count++;
        }

        $this->info("Berhasil membersihkan {$count} gambar tidak terpakai dari storage.");
        return 0;
    }
}
