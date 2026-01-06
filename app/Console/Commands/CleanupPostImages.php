<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;
use App\Models\News;

class CleanupPostImages extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'images:cleanup';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Remove editor images that are not used in any post content';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $files = Storage::disk('public')->files('news-content');
        $allContent = News::pluck('content')->implode(' ');

        $deletedCount = 0;

        foreach ($files as $file) {
            $filename = basename($file);

            // Check if filename exists in any post content
            if (!str_contains($allContent, $filename)) {
                Storage::disk('public')->delete($file);
                $deletedCount++;
            }
        }

        $this->info("Cleanup completed! {$deletedCount} unused images removed.");
        return 0;
    }
}
