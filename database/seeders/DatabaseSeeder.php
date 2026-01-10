<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Comment;
use App\Models\News;
use App\Models\SiteSetting;
use App\Models\SubCategory;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Create User
        $user = User::firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Admin',
                'password' => bcrypt('password'),
                'email_verified_at' => now(),
            ]
        );

        // 2. Create Site Settings
        SiteSetting::updateOrCreate(
            ['id' => 1],
            [
                'site_name' => 'LENSA PUBLIK',
                'tagline' => 'INFORMASI TERPERCAYA',
                'description' => 'Portal berita terpercaya yang menyajikan informasi tercepat, akurat, dan mendalam dari seluruh penjuru negeri.',
                'email' => 'redaksi@lensapublik.com',
                'phone' => '+62 21 1234 5678',
                'address' => 'Jl. Merdeka No. 123, Jakarta Pusat, DKI Jakarta 10110',
                'social_facebook' => 'https://facebook.com/lensapublik',
                'social_instagram' => 'https://instagram.com/lensapublik',
                'social_twitter' => 'https://twitter.com/lensapublik',
                'social_youtube' => 'https://youtube.com/@lensapublik',
                'color_primary' => 'oklch(0.577 0.245 27.325)',
                'color_primary_foreground' => 'oklch(0.985 0 0)',
                'color_radius' => '0.625rem',
            ]
        );

        // 3. Create Categories
        $categories = [
            ['name' => 'Politik', 'description' => 'Berita seputar politik dalam dan luar negeri', 'order' => 1, 'is_nav' => true, 'is_homepage' => true],
            ['name' => 'Ekonomi', 'description' => 'Berita ekonomi, bisnis, dan keuangan', 'order' => 2, 'is_nav' => true, 'is_homepage' => true],
            ['name' => 'Teknologi', 'description' => 'Berita teknologi, gadget, dan inovasi', 'order' => 3, 'is_nav' => true, 'is_homepage' => true],
            ['name' => 'Olahraga', 'description' => 'Berita olahraga nasional dan internasional', 'order' => 4, 'is_nav' => true, 'is_homepage' => true],
            ['name' => 'Entertainment', 'description' => 'Berita hiburan, film, musik, dan selebriti', 'order' => 5, 'is_nav' => true, 'is_homepage' => true],
            ['name' => 'Pendidikan', 'description' => 'Berita pendidikan dan dunia kampus', 'order' => 6, 'is_nav' => true, 'is_homepage' => true],
        ];

        $categoryModels = [];
        foreach ($categories as $cat) {
            $categoryModels[$cat['name']] = Category::firstOrCreate(
                ['slug' => Str::slug($cat['name'])],
                array_merge($cat, ['slug' => Str::slug($cat['name'])])
            );
        }

        // 4. Create SubCategories
        $subCategories = [
            ['category' => 'Politik', 'name' => 'Nasional', 'order' => 1],
            ['category' => 'Politik', 'name' => 'Internasional', 'order' => 2],
            ['category' => 'Ekonomi', 'name' => 'Bisnis', 'order' => 1],
            ['category' => 'Ekonomi', 'name' => 'Keuangan', 'order' => 2],
            ['category' => 'Teknologi', 'name' => 'Gadget', 'order' => 1],
            ['category' => 'Teknologi', 'name' => 'Startup', 'order' => 2],
            ['category' => 'Olahraga', 'name' => 'Sepak Bola', 'order' => 1],
            ['category' => 'Olahraga', 'name' => 'Basket', 'order' => 2],
        ];

        $subCategoryModels = [];
        foreach ($subCategories as $subCat) {
            $subCategoryModels[$subCat['name']] = SubCategory::firstOrCreate(
                [
                    'slug' => Str::slug($subCat['name']),
                    'category_id' => $categoryModels[$subCat['category']]->id,
                ],
                [
                    'name' => $subCat['name'],
                    'slug' => Str::slug($subCat['name']),
                    'description' => 'Berita ' . $subCat['name'],
                    'order' => $subCat['order'],
                    'is_nav' => true,
                    'category_id' => $categoryModels[$subCat['category']]->id,
                ]
            );
        }

        // 5. Create Tags
        $tagNames = ['Breaking News', 'Trending', 'Viral', 'Eksklusif', 'Investigasi', 'Opini', 'Feature', 'Reportase'];
        $tags = [];
        foreach ($tagNames as $tagName) {
            $tags[] = Tag::firstOrCreate(
                ['slug' => Str::slug($tagName)],
                [
                    'name' => $tagName,
                    'slug' => Str::slug($tagName),
                    'description' => 'Tag untuk ' . $tagName,
                ]
            );
        }

        // 6. Create News Articles
        $newsArticles = [
            // Politik
            [
                'category' => 'Politik',
                'sub_category' => 'Nasional',
                'title' => 'Presiden Hadiri Sidang Kabinet Pembahasan APBN 2026',
                'content' => '<p>Jakarta - Presiden Republik Indonesia menghadiri sidang kabinet paripurna untuk membahas Anggaran Pendapatan dan Belanja Negara (APBN) tahun 2026. Dalam kesempatan ini, presiden menekankan pentingnya efisiensi anggaran dan fokus pada sektor pendidikan dan kesehatan.</p><p>Menteri Keuangan memaparkan proyeksi pendapatan negara yang diperkirakan meningkat 8% dari tahun sebelumnya. "Kita optimis dapat mencapai target pertumbuhan ekonomi 5,5% di tahun depan," ujar Menkeu dalam konferensi pers.</p>',
                'is_featured' => true,
                'views' => 15420,
            ],
            [
                'category' => 'Politik',
                'sub_category' => 'Internasional',
                'title' => 'KTT ASEAN 2026 Bahas Kerja Sama Regional',
                'content' => '<p>Bangkok - Konferensi Tingkat Tinggi (KTT) ASEAN ke-44 resmi dibuka hari ini dengan agenda utama memperkuat kerja sama ekonomi regional. Para pemimpin negara anggota ASEAN berkumpul membahas strategi menghadapi tantangan ekonomi global.</p><p>Indonesia mengusulkan pembentukan zona perdagangan bebas digital yang akan memudahkan transaksi e-commerce antar negara ASEAN.</p>',
                'is_featured' => true,
                'views' => 12340,
            ],

            // Ekonomi
            [
                'category' => 'Ekonomi',
                'sub_category' => 'Bisnis',
                'title' => 'Startup Indonesia Raih Pendanaan Seri B USD 50 Juta',
                'content' => '<p>Jakarta - Startup teknologi finansial asal Indonesia berhasil meraih pendanaan seri B senilai USD 50 juta. Pendanaan ini dipimpin oleh investor global terkemuka dan akan digunakan untuk ekspansi ke negara-negara Asia Tenggara.</p><p>"Kami optimis dapat melayani 10 juta pengguna dalam 2 tahun ke depan," kata CEO perusahaan.</p>',
                'is_featured' => false,
                'views' => 8750,
            ],
            [
                'category' => 'Ekonomi',
                'sub_category' => 'Keuangan',
                'title' => 'Bank Indonesia Pertahankan Suku Bunga Acuan',
                'content' => '<p>Jakarta - Bank Indonesia memutuskan mempertahankan suku bunga acuan di level 6% dalam Rapat Dewan Gubernur (RDG) bulan ini. Keputusan ini diambil untuk menjaga stabilitas nilai tukar rupiah dan mengendalikan inflasi.</p>',
                'is_featured' => false,
                'views' => 6420,
            ],

            // Teknologi
            [
                'category' => 'Teknologi',
                'sub_category' => 'Gadget',
                'title' => 'Smartphone Flagship Terbaru Hadir dengan AI Canggih',
                'content' => '<p>Seoul - Produsen smartphone terkemuka meluncurkan perangkat flagship terbarunya yang dilengkapi dengan teknologi AI generatif. Fitur unggulan mencakup asisten AI yang dapat membantu pengguna dalam berbagai tugas sehari-hari.</p><p>Harga dipatok mulai dari USD 999 dan akan tersedia di Indonesia bulan depan.</p>',
                'is_featured' => true,
                'views' => 18960,
            ],
            [
                'category' => 'Teknologi',
                'sub_category' => 'Startup',
                'title' => 'Platform E-Learning Lokal Capai 5 Juta Pengguna',
                'content' => '<p>Bandung - Platform e-learning karya anak bangsa berhasil mencatatkan pertumbuhan signifikan dengan mencapai 5 juta pengguna aktif. Platform ini menawarkan ribuan kursus gratis dan berbayar dalam bahasa Indonesia.</p>',
                'is_featured' => false,
                'views' => 7230,
            ],

            // Olahraga
            [
                'category' => 'Olahraga',
                'sub_category' => 'Sepak Bola',
                'title' => 'Timnas Indonesia Lolos ke Putaran Final Piala Asia',
                'content' => '<p>Jakarta - Timnas Indonesia berhasil lolos ke putaran final Piala Asia setelah mengalahkan rivalnya dengan skor 2-1. Kemenangan ini mengantarkan Garuda ke puncak klasemen grup dengan 15 poin.</p><p>Pelatih timnas mengapresiasi kerja keras para pemain dan dukungan suporter yang luar biasa.</p>',
                'is_featured' => true,
                'views' => 24560,
            ],
            [
                'category' => 'Olahraga',
                'sub_category' => 'Basket',
                'title' => 'Pemain Basket Indonesia Gabung Klub NBA',
                'content' => '<p>Los Angeles - Untuk pertama kalinya, pemain basket Indonesia resmi bergabung dengan klub NBA. Kontrak selama 2 tahun ditandatangani setelah pemain tersebut menunjukkan performa impresif di liga Asia.</p>',
                'is_featured' => false,
                'views' => 11230,
            ],

            // Entertainment
            [
                'category' => 'Entertainment',
                'sub_category' => null,
                'title' => 'Film Indonesia Raih Penghargaan di Festival Internasional',
                'content' => '<p>Cannes - Film karya sutradara Indonesia berhasil meraih penghargaan bergengsi di Festival Film Cannes. Film yang mengangkat tema sosial ini mendapat standing ovation selama 10 menit dari penonton.</p><p>"Ini adalah pencapaian membanggakan bagi perfilman Indonesia," kata sutradara.</p>',
                'is_featured' => true,
                'views' => 16780,
            ],
            [
                'category' => 'Entertainment',
                'sub_category' => null,
                'title' => 'Konser Musik Terbesar Tahun Ini Siap Digelar',
                'content' => '<p>Jakarta - Konser musik dengan lineup artis internasional dan lokal terbaik akan digelar bulan depan di Gelora Bung Karno. Tiket early bird sudah habis terjual dalam 24 jam.</p>',
                'is_featured' => false,
                'views' => 9450,
            ],

            // Pendidikan
            [
                'category' => 'Pendidikan',
                'sub_category' => null,
                'title' => 'Universitas Indonesia Masuk 100 Besar Dunia',
                'content' => '<p>Depok - Universitas Indonesia (UI) berhasil masuk dalam jajaran 100 universitas terbaik dunia versi QS World University Rankings. Pencapaian ini merupakan yang pertama kali dalam sejarah perguruan tinggi Indonesia.</p><p>Rektor UI menyatakan bahwa pencapaian ini adalah hasil dari peningkatan kualitas riset dan kerja sama internasional.</p>',
                'is_featured' => true,
                'views' => 13240,
            ],
            [
                'category' => 'Pendidikan',
                'sub_category' => null,
                'title' => 'Program Beasiswa Penuh untuk Mahasiswa Berprestasi',
                'content' => '<p>Jakarta - Pemerintah meluncurkan program beasiswa penuh untuk 10.000 mahasiswa berprestasi dari keluarga kurang mampu. Program ini mencakup biaya kuliah, uang saku, dan biaya penelitian.</p>',
                'is_featured' => false,
                'views' => 8960,
            ],
        ];

        foreach ($newsArticles as $index => $article) {
            $news = News::create([
                'user_id' => $user->id,
                'category_id' => $categoryModels[$article['category']]->id,
                'sub_category_id' => $article['sub_category'] ? $subCategoryModels[$article['sub_category']]->id : null,
                'title' => $article['title'],
                'slug' => Str::slug($article['title']),
                'excerpt' => Str::limit(strip_tags($article['content']), 200),
                'content' => $article['content'],
                'status' => 'published',
                'views' => $article['views'],
                'is_featured' => $article['is_featured'],
                'published_at' => now()->subDays(rand(0, 30)),
            ]);

            // Attach random tags (2-4 tags per news)
            $randomTags = collect($tags)->random(rand(2, 4));
            $news->tags()->attach($randomTags->pluck('id'));

            // Add some comments
            if ($index % 3 === 0) {
                Comment::create([
                    'news_id' => $news->id,
                    'name' => 'John Doe',
                    'email' => 'john@example.com',
                    'comment' => 'Berita yang sangat informatif dan menarik!',
                    'is_approved' => true,
                ]);

                Comment::create([
                    'news_id' => $news->id,
                    'name' => 'Jane Smith',
                    'email' => 'jane@example.com',
                    'comment' => 'Terima kasih atas informasinya.',
                    'is_approved' => true,
                ]);
            }
        }

        $this->command->info('Database seeded successfully!');
        $this->command->info('Email: admin@example.com');
        $this->command->info('Password: password');
    }
}
