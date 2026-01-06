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
        $this->info("Scanning files in news-content...");
        $files = Storage::disk('public')->files('news-content');

        if (empty($files)) {
            $this->info("No files found in news-content folder.");
            return 0;
        }

        $this->info("Indexing referenced images from database...");

        // Use a hash map for O(1) lookups
        $referencedImages = [];

        // Chunking prevents memory overflow with large number of records
        News::select('content')->chunk(200, function ($posts) use (&$referencedImages) {
            foreach ($posts as $post) {
                // Regex to find all filenames in news-content path
                preg_match_all('/news-content\/([a-zA-Z0-9_\-\.]+)/', $post->content, $matches);
                if (!empty($matches[1])) {
                    foreach ($matches[1] as $filename) {
                        $referencedImages[$filename] = true;
                    }
                }
            }
        });

        $this->info("Comparing " . count($files) . " files with referenced images...");
        $deletedCount = 0;

        foreach ($files as $file) {
            $filename = basename($file);

            // Check if the filename from the folder exists in our "referenced" map
            if (!isset($referencedImages[$filename])) {
                Storage::disk('public')->delete($file);
                $deletedCount++;
            }
        }

        $this->info("Cleanup completed! {$deletedCount} unused images removed.");
        return 0;
    }
}
