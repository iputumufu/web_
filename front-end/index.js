const dataBahan = {
    A: ["Agar-Agar", "Alpukat", "Apel", "Asam Jawa", "Ayam", "Ayam Cincang"],
    B: ["Basil", "Bawang Bombay", "Bawang Merah", "Bawang Putih", "Bayam", "Beras", "Beras Ketan", "Bihun"],
    C: ["Cabe", "Cabe Bubuk", "Cokelat", "Cokelat Bubuk", "Cream Cheese", "Cumi"],
    D: ["Daging Sapi", "Daun Bawang", "Daun Jeruk", "Daun Pisang", "Daun Salam", "Donat"],
    G: ["Garam", "Gochujang", "Gula", "Gula Merah"],
    I: ["Ikan Salmon", "Ikan Tuna", "Ikan Tenggiri", "Iga Sapi"],
    J: ["Jagung", "Jahe", "Jamur", "Jeruk Nipis"],
    K: ["Kacang Panjang", "Kacang Tanah", "Kayu Manis", "Kecap Asin", "Kecap Manis", "Keju Mozarella", "Kelapa Parut", "Kentang", "Kimchi", "Kol", "Kubis", "Kunyit", "Kulit Pangsit", "Kulit Lumpia"],
    L: ["Lada", "Lemon", "Lengkuas"],
    M: ["Madu", "Mentega", "Minyak Wijen", "Mirin", "Miso"],
    N: ["Nanas", "Nangka", "Nasi", "Nori"],
    P: ["Paprika", "Pasta", "Pisang"],
    R: ["Ragi", "Roti Tawar", "Rebung", "Rumput Laut"],
    S: ["Santan", "Sawi", "Serai", "Sosis", "Spaghetti", "Susu"],
    T: ["Tahu", "Tauge", "Telur", "Tempe", "Tepung Terigu", "Tepung Beras", "Tepung Tapioka", "Tepung Ketan", "Timun", "Tomat"],
    U: ["Udang", "Udon"],
    W: ["Wortel", "Wijen", "Wakame"]
};

const allRecipes = [
    { nama: "Siomay", img: "../assets/siomay.jpg", negara: "Indonesia", tipe: "Pembuka", level: "Sedang", bahan: ["Ikan Tenggiri", "Tepung Tapioka", "Telur", "Minyak Wijen"], detail: "Porsi: 20 buah | Waktu: 60 menit | Alat: Food processor, dandang, panci saus\nBahan: 500g daging ikan tenggiri giling, 150g tepung tapioka, 2 butir telur, 3 siung bawang putih halus, 1 sdm minyak wijen, garam, dan lada.\nLangkah: 1. Campur ikan giling, tapioka, telur, bawang putih, dan minyak wijen. 2. Aduk rata sampai kalis dan elastis. 3. Masukkan adonan ke kulit pangsit atau bentuk bulat kecil. 4. Kukus selama 20 menit hingga matang. 5. Haluskan kacang goreng, cabai, gula merah, dan asam jawa untuk saus. 6. Masak saus sampai kental dan berminyak. 7. Sajikan siomay dengan saus kacang hangat." },
    { nama: "Bakwan", img: "../assets/bakwan.jpg", negara: "Indonesia", tipe: "Pembuka", level: "Mudah", bahan: ["Tepung Terigu", "Tepung Beras", "Kol", "Wortel"], detail: "Porsi: 15 buah | Waktu: 45 menit | Alat: Wajan penggorengan, mangkuk besar\nBahan: 200g tepung terigu, 50g tepung beras, kol iris, wortel, tauge, daun bawang, bawang putih, ketumbar, garam, merica.\nLangkah: 1. Campur terigu, tepung beras, bawang putih, ketumbar, garam, dan merica. 2. Tuang air dingin sedikit demi sedikit sampai adonan licin. 3. Masukkan kol, wortel, tauge, dan daun bawang. 4. Aduk hingga seluruh sayur terbalut adonan. 5. Panaskan minyak dengan api sedang. 6. Ambil adonan dengan sendok lalu goreng sampai kuning keemasan. 7. Tiriskan dan sajikan hangat." },
    { nama: "Lumpia", img: "../assets/lumpia.jpg", negara: "Indonesia", tipe: "Pembuka", level: "Sedang", bahan: ["Kulit Lumpia", "Rebung", "Ayam", "Kecap Manis"], detail: "Porsi: 20 buah | Waktu: 60 menit | Alat: Wajan, kuas, piring\nBahan: Kulit lumpia, rebung, ayam cincang, bawang putih, kecap manis, lada, garam, daun bawang, telur.\nLangkah: 1. Tumis bawang putih hingga harum. 2. Masukkan ayam cincang dan masak sampai berubah warna. 3. Tambahkan rebung, kecap manis, lada, dan garam. 4. Masak sampai isian kering dan meresap. 5. Letakkan isian di kulit lumpia lalu gulung rapi. 6. Rekatkan ujungnya dengan telur. 7. Goreng sampai renyah dan berwarna keemasan." },
    { nama: "Martabak Telur", img: "../assets/martabak_telur.jpg", negara: "Indonesia", tipe: "Pembuka", level: "Sedang", bahan: ["Daging Sapi", "Telur", "Daun Bawang"], detail: "Porsi: 4 buah | Waktu: 50 menit | Alat: Wajan datar, mangkuk\nBahan: Kulit lumpia besar, daging sapi cincang, bubuk kari, telur, daun bawang, bawang putih, lada, garam.\nLangkah: 1. Tumis bawang putih dan daging cincang sampai matang. 2. Tambahkan bubuk kari, garam, dan lada. 3. Kocok telur lalu campur dengan daun bawang dan tumisan daging. 4. Letakkan isian di atas kulit lumpia. 5. Lipat seperti amplop agar isi tertutup rapat. 6. Panaskan wajan dengan sedikit minyak dan margarin. 7. Goreng martabak sampai kedua sisi kecokelatan." },
    { nama: "Nasi Goreng", img: "../assets/nasi_goreng.jpg", negara: "Indonesia", tipe: "Utama", level: "Mudah", bahan: ["Nasi", "Kecap Manis", "Bawang Merah", "Bawang Putih"], detail: "Porsi: 2 piring | Waktu: 20 menit | Alat: Wok\nBahan: Nasi dingin, bawang merah, bawang putih, cabai, terasi, kecap manis, saus tiram, telur, daun bawang.\nLangkah: 1. Haluskan bawang merah, bawang putih, cabai, dan terasi. 2. Tumis bumbu sampai harum dan matang. 3. Masukkan telur lalu orak-arik sebentar. 4. Tambahkan nasi dingin dan aduk cepat. 5. Tuang kecap manis dan saus tiram. 6. Aduk sampai rata dan nasi panas merata. 7. Sajikan dengan taburan daun bawang." },
    { nama: "Rendang", img: "../assets/rendang.jpg", negara: "Indonesia", tipe: "Utama", level: "Susah", bahan: ["Daging Sapi", "Santan", "Lengkuas", "Cabe"], detail: "Porsi: 6 porsi | Waktu: 5 jam | Alat: Wajan besar\nBahan: Daging sapi, santan kental, bawang merah, bawang putih, cabai, lengkuas, jahe, ketumbar, daun salam, daun jeruk, serai.\nLangkah: 1. Haluskan bawang, cabai, lengkuas, jahe, dan ketumbar. 2. Masukkan daging dan bumbu halus ke wajan besar. 3. Tuang santan dan tambahkan serai, daun salam, serta daun jeruk. 4. Masak sambil diaduk sampai mendidih. 5. Kecilkan api dan lanjutkan memasak perlahan. 6. Aduk sesekali sampai santan menyusut. 7. Masak sampai bumbu menghitam dan berminyak." },
    { nama: "Sate Ayam", img: "../assets/sate_ayam.jpg", negara: "Indonesia", tipe: "Utama", level: "Sedang", bahan: ["Ayam", "Kecap Manis", "Kacang Tanah", "Gula Merah"], detail: "Porsi: 20 tusuk | Waktu: 90 menit | Alat: Tusuk sate, panggangan\nBahan: Ayam fillet paha, kecap manis, kacang tanah goreng, bawang merah, bawang putih, cabai merah, gula merah, air asam jawa.\nLangkah: 1. Potong ayam lalu tusuk menjadi sate. 2. Marinasi sate dengan kecap manis. 3. Haluskan kacang, cabai, bawang merah, dan bawang putih. 4. Masak bumbu kacang dengan gula merah dan asam jawa sampai kental. 5. Bakar sate sambil dioles kecap manis. 6. Bolak-balik sampai matang dan beraroma asap. 7. Sajikan bersama saus kacang." },
    { nama: "Klepon", img: "../assets/klepon.jpg", negara: "Indonesia", tipe: "Penutup", level: "Sedang", bahan: ["Tepung Ketan", "Gula Merah", "Kelapa Parut"], detail: "Porsi: 25 buah | Waktu: 60 menit | Alat: Panci\nBahan: Tepung ketan, air daun pandan, garam, gula merah sisir, kelapa parut kukus.\nLangkah: 1. Campur tepung ketan, air pandan, dan garam. 2. Uleni sampai adonan kalis dan mudah dibentuk. 3. Ambil adonan, pipihkan, lalu isi gula merah. 4. Bentuk bulat rapat. 5. Rebus di air mendidih sampai mengapung. 6. Angkat dan tiriskan. 7. Gulingkan di kelapa parut kukus." },
    { nama: "Pisang Goreng", img: "../assets/pisang_goreng.jpg", negara: "Indonesia", tipe: "Penutup", level: "Mudah", bahan: ["Pisang", "Tepung Terigu", "Mentega"], detail: "Porsi: 8 buah | Waktu: 20 menit | Alat: Wajan\nBahan: Pisang kepok, tepung terigu, gula, garam, vanili, air, mentega, minyak goreng.\nLangkah: 1. Belah pisang memanjang. 2. Campur tepung, gula, garam, vanili, dan air. 3. Tambahkan mentega cair ke adonan. 4. Celupkan pisang ke adonan. 5. Panaskan minyak hingga cukup panas. 6. Goreng sampai kuning keemasan. 7. Tiriskan dan sajikan hangat." },

    { nama: "Caesar Salad", img: "../assets/caesar_salad.jpg", negara: "Amerika", tipe: "Pembuka", level: "Mudah", bahan: ["Selada", "Mayones", "Roti Tawar"], detail: "Porsi: 2 piring | Waktu: 15 menit | Alat: Mangkuk, whisk\nBahan: Selada romaine, parmesan, crouton, mayones, lemon, bawang putih, mustard, minyak zaitun.\nLangkah: 1. Campur mayones, air lemon, bawang putih, mustard, dan minyak zaitun. 2. Aduk hingga menjadi dressing halus. 3. Cuci dan keringkan selada. 4. Tata selada di piring. 5. Siram dressing secukupnya. 6. Tambahkan crouton dan parmesan. 7. Sajikan segera agar tetap segar." },
    { nama: "Chicken Wings", img: "../assets/chicken_wings.jpg", negara: "Amerika", tipe: "Pembuka", level: "Sedang", bahan: ["Ayam", "Mentega", "Madu"], detail: "Porsi: 10 buah | Waktu: 45 menit | Alat: Wajan, oven\nBahan: Sayap ayam, mentega, saus sambal, madu, cuka apel, bawang putih bubuk, lada, garam.\nLangkah: 1. Bumbui sayap ayam dengan garam dan lada. 2. Goreng hingga setengah kering lalu tiriskan. 3. Lelehkan mentega di wajan. 4. Masukkan saus sambal, madu, dan cuka apel. 5. Masak sampai saus mengental. 6. Masukkan sayap ayam dan aduk hingga terlapisi saus. 7. Panggang sebentar agar hasil lebih lengket dan berkilau." },
    { nama: "Nachos", img: "../assets/nachos.jpg", negara: "Amerika", tipe: "Pembuka", level: "Mudah", bahan: ["Daging Sapi", "Keju Mozarella", "Tomat"], detail: "Porsi: 2 piring | Waktu: 25 menit | Alat: Oven, wajan\nBahan: Tortilla chips, daging sapi cincang, bubuk cabai, keju cheddar, keju mozzarella, jalapeno, sour cream.\nLangkah: 1. Tumis daging sapi dengan bubuk cabai sampai matang. 2. Tata tortilla chips di loyang. 3. Tambahkan daging, keju, dan jalapeno di atasnya. 4. Panggang sampai keju meleleh. 5. Keluarkan dari oven dengan hati-hati. 6. Tambahkan sour cream di atasnya. 7. Sajikan selagi hangat." },
    { nama: "Burger", img: "../assets/burger.jpg", negara: "Amerika", tipe: "Utama", level: "Mudah", bahan: ["Daging Sapi", "Tomat", "Keju Mozarella", "Bawang Bombay"], detail: "Porsi: 2 burger | Waktu: 25 menit | Alat: Wajan datar\nBahan: Daging sapi giling, roti burger, keju, tomat, selada, mayones, mustard.\nLangkah: 1. Bentuk daging menjadi patty lalu bumbui. 2. Panggang di wajan hingga matang. 3. Letakkan keju saat patty masih panas agar meleleh. 4. Panggang roti burger sebentar. 5. Olesi saus pada roti. 6. Susun selada, patty, keju, tomat, dan bawang. 7. Tutup burger dan sajikan." },
    { nama: "Steak", img: "../assets/steak.jpg", negara: "Amerika", tipe: "Utama", level: "Sedang", bahan: ["Daging Sapi", "Mentega", "Bawang Putih", "Lada"], detail: "Porsi: 1 porsi | Waktu: 20 menit | Alat: Wajan besi\nBahan: Ribeye, mentega, bawang putih, rosemary, garam kasar, lada hitam.\nLangkah: 1. Keringkan permukaan steak. 2. Taburi garam dan lada di kedua sisi. 3. Panaskan wajan sampai sangat panas. 4. Panggang steak sesuai kematangan yang diinginkan. 5. Tambahkan mentega, bawang putih, dan rosemary. 6. Siramkan mentega panas ke permukaan steak. 7. Diamkan steak beberapa menit sebelum dipotong." },
    { nama: "Apple Pie", img: "../assets/Apple_pie.jpg", negara: "Amerika", tipe: "Penutup", level: "Susah", bahan: ["Apel", "Gula", "Kayu Manis", "Tepung Terigu"], detail: "Porsi: 1 pie | Waktu: 90 menit | Alat: Loyang pie, oven\nBahan: Apel granny smith, gula pasir, gula merah, kayu manis, mentega, air lemon, kulit pastry.\nLangkah: 1. Iris apel lalu campur dengan gula dan kayu manis. 2. Masak sebentar dengan mentega sampai agak lunak. 3. Letakkan kulit pastry di loyang pie. 4. Tuang isian apel ke tengah. 5. Tutup dengan pastry kedua dan rekatkan pinggirannya. 6. Oles permukaan dengan kuning telur. 7. Panggang sampai keemasan dan harum." },
    { nama: "Brownies", img: "../assets/brownies.jpg", negara: "Amerika", tipe: "Penutup", level: "Sedang", bahan: ["Cokelat", "Mentega", "Telur", "Gula"], detail: "Porsi: 1 loyang | Waktu: 40 menit | Alat: Oven, mixer\nBahan: Cokelat batang dark, mentega, telur, gula, tepung terigu, cokelat bubuk, garam.\nLangkah: 1. Lelehkan cokelat dan mentega. 2. Kocok telur dan gula hingga pucat. 3. Campur lelehan cokelat ke dalam adonan telur. 4. Masukkan tepung dan cokelat bubuk. 5. Aduk sampai rata tanpa overmix. 6. Tuang ke loyang. 7. Panggang sampai bagian tengah masih sedikit lembap." },

    { nama: "Miso Soup", img: "../assets/miso_soup.jpg", negara: "Jepang", tipe: "Pembuka", level: "Mudah", bahan: ["Miso", "Tahu", "Wakame", "Daun Bawang"], detail: "Porsi: 2 mangkuk | Waktu: 10 menit | Alat: Panci\nBahan: Air, dashi, pasta miso, tahu sutra, wakame, daun bawang.\nLangkah: 1. Rebus air bersama dashi sampai larut. 2. Matikan api agar miso tidak mendidih terlalu keras. 3. Larutkan miso dengan sedikit kuah lalu kembalikan ke panci. 4. Masukkan tahu potong. 5. Tambahkan wakame yang sudah direndam. 6. Hangatkan sebentar tanpa mendidih. 7. Sajikan dengan taburan daun bawang." },
    { nama: "Takoyaki", img: "../assets/takoyaki.jpg", negara: "Jepang", tipe: "Pembuka", level: "Sedang", bahan: ["Tepung Terigu", "Telur", "Daun Bawang"], detail: "Porsi: 20 buah | Waktu: 45 menit | Alat: Cetakan takoyaki\nBahan: Tepung, telur, kaldu dashi, gurita, tenkasu, daun bawang, saus takoyaki, mayones.\nLangkah: 1. Campur tepung, telur, dan dashi hingga encer. 2. Panaskan cetakan dan oles minyak. 3. Tuang adonan hingga penuh. 4. Tambahkan gurita, tenkasu, dan daun bawang. 5. Putar perlahan hingga membentuk bola. 6. Masak sampai seluruh sisi kecokelatan. 7. Sajikan dengan saus dan mayones." },
    { nama: "Gyoza", img: "../assets/gyoza.jpg", negara: "Jepang", tipe: "Pembuka", level: "Sedang", bahan: ["Daging Sapi", "Kubis", "Kulit Pangsit", "Minyak Wijen"], detail: "Porsi: 30 buah | Waktu: 60 menit | Alat: Wajan datar\nBahan: Daging cincang, kubis, bawang putih, jahe, kecap asin, minyak wijen, kulit gyoza.\nLangkah: 1. Campur seluruh bahan isian hingga rata. 2. Letakkan isian di tengah kulit gyoza. 3. Lipat dan bentuk kerutan di sisi atas. 4. Panaskan wajan dengan sedikit minyak. 5. Goreng sisi bawah gyoza sampai kecokelatan. 6. Tambahkan sedikit air lalu tutup wajan. 7. Masak sampai air habis dan bagian bawah tetap renyah." },
    { nama: "Ramen", img: "../assets/ramen.jpg", negara: "Jepang", tipe: "Utama", level: "Susah", bahan: ["Bawang Putih", "Jahe", "Telur", "Nori"], detail: "Porsi: 2 mangkuk | Waktu: 3 jam | Alat: Panci besar\nBahan: Mie ramen, kaldu ayam, shoyu, mirin, telur ramen, nori, daun bawang.\nLangkah: 1. Masak kaldu dengan jahe dan bawang putih hingga kaya rasa. 2. Saring kaldu agar jernih. 3. Bumbui dengan shoyu dan mirin. 4. Rebus mie ramen secara terpisah. 5. Letakkan mie di mangkuk saji. 6. Tuang kuah panas ke atasnya. 7. Tambahkan telur, nori, dan daun bawang." },
    { nama: "Tempura", img: "../assets/tempura.jpg", negara: "Jepang", tipe: "Utama", level: "Sedang", bahan: ["Udang", "Telur", "Tepung Terigu"], detail: "Porsi: 2 porsi | Waktu: 30 menit | Alat: Wajan\nBahan: Udang, sayur, tepung tempura, kuning telur, air es, minyak goreng.\nLangkah: 1. Siapkan udang dan sayur yang sudah dibersihkan. 2. Buat adonan ringan dari tepung, kuning telur, dan air es. 3. Jangan aduk terlalu halus agar tekstur tetap renyah. 4. Celup bahan ke adonan tipis. 5. Goreng di minyak panas sampai garing pucat. 6. Tiriskan di rak agar tidak lembek. 7. Sajikan dengan saus tentsuyu." },
    { nama: "Teriyaki Chicken", img: "../assets/teriyaki_chicken.jpg", negara: "Jepang", tipe: "Utama", level: "Mudah", bahan: ["Ayam", "Kecap Asin", "Mirin", "Madu"], detail: "Porsi: 2 porsi | Waktu: 25 menit | Alat: Wajan\nBahan: Paha ayam fillet, shoyu, mirin, madu, gula, jahe, wijen.\nLangkah: 1. Campur shoyu, mirin, madu, gula, dan jahe menjadi saus. 2. Panggang ayam dengan sisi kulit lebih dulu. 3. Balik ayam hingga kedua sisi matang. 4. Tuang saus teriyaki ke wajan. 5. Masak sampai saus mengental dan melapisi ayam. 6. Iris ayam setelah matang. 7. Sajikan dengan taburan wijen." },
    { nama: "Mochi", img: "../assets/mochi.jpg", negara: "Jepang", tipe: "Penutup", level: "Susah", bahan: ["Tepung Ketan", "Gula", "Kacang Tanah"], detail: "Porsi: 10 buah | Waktu: 60 menit | Alat: Kukusan\nBahan: Tepung ketan, air, gula, pasta kacang merah atau isian manis lain, maizena untuk taburan.\nLangkah: 1. Campur tepung ketan, air, dan gula. 2. Kukus adonan sampai menjadi kenyal. 3. Taburi meja kerja dengan maizena. 4. Keluarkan adonan panas dan bagi kecil-kecil. 5. Pipihkan tiap bagian. 6. Isi dengan kacang atau pasta manis. 7. Bulatkan dan sajikan." },

    { nama: "Bruschetta", img: "../assets/Bruschetta.jpg", negara: "Italia", tipe: "Pembuka", level: "Mudah", bahan: ["Tomat", "Basil", "Bawang Putih"], detail: "Porsi: 6 potong | Waktu: 15 menit | Alat: Oven\nBahan: Roti baguette, tomat, basil, bawang putih, olive oil, balsamic vinegar.\nLangkah: 1. Panggang roti sampai renyah. 2. Gosok roti dengan bawang putih. 3. Campur tomat, basil, olive oil, dan garam. 4. Diamkan sebentar agar rasa menyatu. 5. Letakkan topping tomat di atas roti. 6. Tambahkan sedikit balsamic. 7. Sajikan segera." },
    { nama: "Pizza", img: "../assets/pizza.jpg", negara: "Italia", tipe: "Utama", level: "Sedang", bahan: ["Tepung Terigu", "Tomat", "Keju Mozarella", "Basil"], detail: "Porsi: 1 pizza besar | Waktu: 2 jam | Alat: Oven\nBahan: Tepung terigu, ragi, air hangat, saus tomat, mozzarella, basil, olive oil.\nLangkah: 1. Uleni tepung, ragi, air, garam, dan minyak sampai kalis. 2. Diamkan adonan hingga mengembang. 3. Gilas tipis di atas loyang. 4. Olesi dengan saus tomat. 5. Taburi mozzarella secara merata. 6. Panggang sampai tepi garing dan keju meleleh. 7. Tambahkan basil segar sebelum disajikan." },
    { nama: "Lasagna", img: "../assets/lasagna.jpg", negara: "Italia", tipe: "Utama", level: "Susah", bahan: ["Daging Sapi", "Susu", "Tomat", "Keju Mozarella"], detail: "Porsi: 6 porsi | Waktu: 2 jam | Alat: Oven, loyang\nBahan: Pasta lasagna, daging sapi cincang, saus tomat, susu, mentega, tepung, mozzarella, parmesan.\nLangkah: 1. Buat saus daging dari daging cincang dan saus tomat. 2. Buat saus putih dari mentega, tepung, dan susu. 3. Rebus lembar lasagna sebentar bila perlu. 4. Susun lapisan saus, pasta, saus putih, dan keju. 5. Ulangi sampai bahan habis. 6. Taburi parmesan di bagian atas. 7. Panggang sampai permukaan kecokelatan." },
    { nama: "Risotto", img: "../assets/risotto.jpg", negara: "Italia", tipe: "Utama", level: "Susah", bahan: ["Beras", "Mentega", "Keju Mozarella"], detail: "Porsi: 2 porsi | Waktu: 35 menit | Alat: Wajan besar\nBahan: Beras arborio, kaldu ayam panas, bombay, white wine, mentega, parmesan.\nLangkah: 1. Tumis bombay dengan olive oil sampai lembut. 2. Masukkan beras arborio dan aduk hingga panas. 3. Tuang white wine dan biarkan meresap. 4. Tambahkan kaldu sedikit demi sedikit. 5. Aduk terus sampai tekstur creamy terbentuk. 6. Masukkan mentega dan keju di akhir. 7. Sajikan segera saat masih lembut." },
    { nama: "Fettuccine Alfredo", img: "../assets/Fettucine_Alfredo.jpg", negara: "Italia", tipe: "Utama", level: "Mudah", bahan: ["Mentega", "Keju Mozarella", "Susu"], detail: "Porsi: 2 porsi | Waktu: 20 menit | Alat: Wajan besar\nBahan: Fettuccine, mentega, parmesan, bawang putih, air pasta, lada hitam.\nLangkah: 1. Rebus fettuccine sampai al dente. 2. Lelehkan mentega bersama bawang putih. 3. Masukkan pasta ke wajan. 4. Tambahkan sedikit air rebusan pasta. 5. Masukkan keju dan aduk cepat. 6. Masak sampai saus creamy terbentuk. 7. Sajikan dengan lada hitam." },
    { nama: "Tiramisu", img: "../assets/Tiramisu.jpg", negara: "Italia", tipe: "Penutup", level: "Sedang", bahan: ["Susu", "Cokelat Bubuk", "Telur", "Gula"], detail: "Porsi: 4 gelas | Waktu: 30 menit + dingin | Alat: Mixer\nBahan: Ladyfingers, mascarpone, kuning telur, gula, espresso, cokelat bubuk.\nLangkah: 1. Kocok kuning telur dan gula hingga pucat. 2. Campur dengan mascarpone sampai lembut. 3. Celupkan biskuit ke espresso. 4. Susun biskuit dan krim secara bergantian. 5. Ratakan permukaannya. 6. Dinginkan minimal 4 jam. 7. Taburi cokelat bubuk sebelum disajikan." },
    { nama: "Panna Cotta", img: "../assets/panna_cotta.jpg", negara: "Italia", tipe: "Penutup", level: "Sedang", bahan: ["Susu", "Gula"], detail: "Porsi: 4 gelas | Waktu: 20 menit + dingin | Alat: Panci\nBahan: Heavy cream, susu, gula, vanila, gelatin.\nLangkah: 1. Rendam gelatin sesuai petunjuk. 2. Panaskan cream, susu, gula, dan vanila. 3. Masukkan gelatin dan aduk hingga larut. 4. Tuang ke cetakan. 5. Dinginkan sampai uap panas hilang. 6. Simpan di kulkas beberapa jam. 7. Sajikan dengan saus buah atau caramel." },

    { nama: "Kimchi", img: "../assets/kimchi.jpg", negara: "Korea", tipe: "Pembuka", level: "Susah", bahan: ["Sawi", "Bawang Putih", "Jahe", "Gochujang"], detail: "Porsi: 1 toples | Waktu: 24 jam | Alat: Toples kedap udara\nBahan: Sawi putih, garam kasar, gochugaru, kecap ikan, gula, lobak, bawang putih, jahe, daun bawang.\nLangkah: 1. Potong sawi dan baluri dengan garam. 2. Diamkan sampai layu lalu bilas bersih. 3. Campur bumbu pedas dengan lobak dan daun bawang. 4. Lumuri tiap lembar sawi dengan bumbu. 5. Masukkan ke toples dan tekan padat. 6. Simpan di suhu ruang untuk fermentasi awal. 7. Lanjutkan penyimpanan di kulkas." },
    { nama: "Tteokbokki", img: "../assets/tteokbokki.jpg", negara: "Korea", tipe: "Pembuka", level: "Sedang", bahan: ["Gochujang", "Gula", "Bawang Putih", "Telur"], detail: "Porsi: 2 porsi | Waktu: 30 menit | Alat: Panci\nBahan: Tteok, gochujang, gochugaru, kecap asin, gula, eomuk, bawang putih, daun bawang.\nLangkah: 1. Rendam tteok bila memakai yang beku. 2. Campur air dengan gochujang dan bumbu lain. 3. Didihkan saus hingga harum. 4. Masukkan tteok dan eomuk. 5. Masak sampai tteok empuk. 6. Aduk sampai saus mengental. 7. Sajikan dengan telur rebus bila suka." },
    { nama: "Mandu", img: "../assets/mandu.jpg", negara: "Korea", tipe: "Pembuka", level: "Susah", bahan: ["Ayam Cincang", "Tahu", "Kulit Pangsit", "Minyak Wijen"], detail: "Porsi: 30 buah | Waktu: 90 menit | Alat: Wajan, pengukus\nBahan: Ayam cincang, tahu, kucai, bawang putih, jahe, kecap asin, minyak wijen, kulit mandu.\nLangkah: 1. Campur seluruh bahan isian sampai rata. 2. Letakkan isian di tengah kulit. 3. Lipat dan rapatkan sisi kulit. 4. Bisa dikukus atau digoreng sesuai selera. 5. Untuk versi pan-fried, goreng bawahnya dulu. 6. Tambahkan sedikit air lalu tutup. 7. Sajikan dengan saus cocol kecap dan cuka." },
    { nama: "Japchae", img: "../assets/Japchae.jpg", negara: "Korea", tipe: "Utama", level: "Susah", bahan: ["Bayam", "Bawang Bombay", "Daging Sapi", "Minyak Wijen"], detail: "Porsi: 2 porsi | Waktu: 40 menit | Alat: Wajan besar\nBahan: Dangmyeon, bayam, wortel, bawang bombay, jamur, daging sapi, kecap asin, gula, minyak wijen.\nLangkah: 1. Rebus mie sampai transparan lalu tiriskan. 2. Bumbui mie dengan sedikit kecap dan minyak wijen. 3. Tumis daging sampai matang. 4. Tumis semua sayuran satu per satu. 5. Campur mie, daging, dan sayur di wajan besar. 6. Tambahkan kecap, gula, dan minyak wijen. 7. Aduk sampai seluruh bahan menyatu dan harum." },
    { nama: "Bibimbap", img: "../assets/bimbimbap.jpg", negara: "Korea", tipe: "Utama", level: "Sedang", bahan: ["Nasi", "Gochujang", "Daging Sapi", "Minyak Wijen"], detail: "Porsi: 2 mangkuk | Waktu: 40 menit | Alat: Mangkuk besar, wajan\nBahan: Nasi hangat, daging sapi marinasi, bayam, wortel, tauge, telur, gochujang, wijen.\nLangkah: 1. Tumis daging sampai matang. 2. Rebus atau tumis sayuran secara terpisah. 3. Siapkan nasi di mangkuk. 4. Tata topping sayur dan daging di atas nasi. 5. Tambahkan telur mata sapi di tengah. 6. Siram dengan gochujang dan minyak wijen. 7. Aduk rata sebelum disantap." },
    { nama: "Bulgogi", img: "../assets/bulgogi.jpg", negara: "Korea", tipe: "Utama", level: "Sedang", bahan: ["Daging Sapi", "Kecap Asin", "Madu", "Bawang Bombay"], detail: "Porsi: 2 porsi | Waktu: 1 jam | Alat: Wajan\nBahan: Daging sapi slice, kecap asin, madu, gula, minyak wijen, pir parut, bawang putih, jahe, bombay.\nLangkah: 1. Campur semua bahan marinasi. 2. Rendam daging dalam marinasi minimal 30 menit. 3. Panaskan wajan besar. 4. Tumis bombay sampai harum. 5. Masukkan daging beserta saus marinasi. 6. Masak cepat sampai daging matang dan saus mengilap. 7. Sajikan dengan nasi atau selada." },
    { nama: "Bingsu", img: "../assets/bingsu.jpg", negara: "Korea", tipe: "Penutup", level: "Mudah", bahan: ["Susu", "Gula", "Alpukat"], detail: "Porsi: 2 mangkuk | Waktu: 10 menit | Alat: Mesin es serut\nBahan: Es susu, pasta kacang merah, susu kental manis, buah, tteok kecil.\nLangkah: 1. Serut es susu hingga sangat halus. 2. Susun di mangkuk saji. 3. Tambahkan pasta kacang merah di atasnya. 4. Letakkan buah dan tteok sesuai selera. 5. Siram susu kental manis. 6. Tambahkan topping lain bila suka. 7. Sajikan segera." },
    { nama: "Hotteok", img: "../assets/hotteok.jpg", negara: "Korea", tipe: "Penutup", level: "Sedang", bahan: ["Tepung Terigu", "Ragi", "Gula Merah", "Kayu Manis"], detail: "Porsi: 6 buah | Waktu: 2 jam | Alat: Wajan datar\nBahan: Tepung terigu, tepung ketan, ragi, gula, air hangat, garam, minyak, gula merah, kayu manis, kacang.\nLangkah: 1. Buat adonan roti dan diamkan hingga mengembang. 2. Campur gula merah, kayu manis, dan kacang untuk isian. 3. Bagi adonan menjadi beberapa bagian. 4. Isi dengan campuran gula. 5. Bulatkan lalu pipihkan di wajan. 6. Goreng sampai kedua sisi kecokelatan. 7. Sajikan hangat saat bagian tengah masih meleleh." }
];

const recipeExpertState = {
    activeCountry: "",
    selectedType: "",
    selectedTaste: "",
    selectedDifficulty: "",
    selectedIngredients: new Set(),
    activeRecipe: null
};

const allMenuState = {
    activeCountry: "Semua",
    searchQuery: "",
    visibleCount: 8
};

const favoriteRecipeLookup = new Map();

const countryOptions = [
    { value: "Semua", label: "Semua", flag: "🌍" },
    { value: "Jepang", label: "Jepang", flag: "🇯🇵" },
    { value: "Korea", label: "Korea Selatan", flag: "🇰🇷" },
    { value: "Italia", label: "Italia", flag: "🇮🇹" },
    { value: "Amerika", label: "Amerika", flag: "🇺🇸" },
    { value: "Indonesia", label: "Indonesia", flag: "🇮🇩" }
];

const typeOptions = [
    { value: "Semua", label: "Semua", icon: "fa-solid fa-layer-group" },
    { value: "Pembuka", label: "Pembuka", icon: "fa-solid fa-french-fries" },
    { value: "Utama", label: "Utama", icon: "fa-solid fa-utensils" },
    { value: "Penutup", label: "Penutup", icon: "fa-solid fa-cake-candles" }
];

const tasteOptions = [
    { value: "Semua", label: "Semua" },
    { value: "Manis", label: "Manis" },
    { value: "Pahit", label: "Pahit" },
    { value: "Asam", label: "Asam" },
    { value: "Asin", label: "Asin" },
    { value: "Gurih", label: "Gurih" },
    { value: "Pedas", label: "Pedas" }
];

const difficultyOptions = [
    { value: "Semua", label: "Semua", tone: "neutral" },
    { value: "Mudah", label: "Mudah", tone: "success" },
    { value: "Sedang", label: "Sedang", tone: "warning" },
    { value: "Susah", label: "Susah", tone: "danger" }
];

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function getIconForBahan(bahan) {
    const iconMap = {
        Ayam: "fa-solid fa-drumstick-bite",
        "Ayam Cincang": "fa-solid fa-drumstick-bite",
        "Daging Sapi": "fa-solid fa-cow",
        "Ikan Tenggiri": "fa-solid fa-fish",
        "Ikan Salmon": "fa-solid fa-fish",
        "Ikan Tuna": "fa-solid fa-fish",
        Udang: "fa-solid fa-shrimp",
        Telur: "fa-solid fa-egg",
        "Keju Mozarella": "fa-solid fa-cheese",
        Mentega: "fa-solid fa-cheese",
        Susu: "fa-solid fa-glass-water",
        Santan: "fa-solid fa-glass-water",
        Nasi: "fa-solid fa-bowl-rice",
        Beras: "fa-solid fa-bowl-rice",
        Spaghetti: "fa-solid fa-bowl-food",
        Pasta: "fa-solid fa-bowl-food",
        Miso: "fa-solid fa-bowl-food",
        Udon: "fa-solid fa-bowl-food",
        Cabe: "fa-solid fa-pepper-hot",
        Gochujang: "fa-solid fa-pepper-hot",
        Wortel: "fa-solid fa-carrot",
        Jahe: "fa-solid fa-carrot",
        Lengkuas: "fa-solid fa-carrot",
        Apel: "fa-solid fa-apple-whole",
        Tomat: "fa-solid fa-apple-whole",
        Lemon: "fa-solid fa-lemon",
        "Jeruk Nipis": "fa-solid fa-lemon",
        Cokelat: "fa-solid fa-cookie",
        "Cokelat Bubuk": "fa-solid fa-mug-hot",
        "Bawang Bombay": "fa-solid fa-seedling",
        "Bawang Merah": "fa-solid fa-seedling",
        "Bawang Putih": "fa-solid fa-seedling",
        "Kacang Tanah": "fa-solid fa-seedling",
        Bayam: "fa-solid fa-leaf",
        Sawi: "fa-solid fa-leaf",
        Kubis: "fa-solid fa-leaf",
        Wakame: "fa-solid fa-leaf",
        Basil: "fa-solid fa-leaf",
        "Daun Bawang": "fa-solid fa-leaf",
        Garam: "fa-solid fa-spoon",
        Gula: "fa-solid fa-cube",
        "Gula Merah": "fa-solid fa-cube",
        Tahu: "fa-solid fa-cube",
        Madu: "fa-solid fa-jar",
        "Kecap Asin": "fa-solid fa-bottle-droplet",
        "Kecap Manis": "fa-solid fa-bottle-droplet",
        "Minyak Wijen": "fa-solid fa-bottle-droplet",
        Mirin: "fa-solid fa-bottle-droplet",
        "Tepung Terigu": "fa-solid fa-wheat-awn",
        "Tepung Tapioka": "fa-solid fa-wheat-awn",
        "Tepung Ketan": "fa-solid fa-wheat-awn",
        "Kulit Pangsit": "fa-solid fa-scroll",
        "Kulit Lumpia": "fa-solid fa-scroll",
        Nori: "fa-solid fa-scroll",
        Kimchi: "fa-solid fa-jar",
        Alpukat: "fa-solid fa-seedling",
        Lada: "fa-solid fa-pepper-hot"
    };

    return iconMap[bahan] || "fa-solid fa-utensils";
}

function getDifficultyClass(level) {
    const normalized = String(level || "").toLowerCase();
    if (normalized === "mudah") return "expert-level-mudah";
    if (normalized === "sedang") return "expert-level-sedang";
    return "expert-level-susah";
}

const assetAliasMap = {
    "../assets/apple_pie.jpg": "../assets/Apple_pie.jpg",
    "../assets/Apple_pie.jpg": "../assets/Apple_pie.jpg",
    "../assets/ayam_goreng.jpg": "../assets/ayam_ goreng.jpg",
    "../assets/es_cendol.jpg": "../assets/es_cendol_.jpg",
    "../assets/matcha_ice_cream.jpg": "../assets/matcha_ice_cream_.jpg",
    "../assets/fettuccine_alfredo.jpg": "../assets/Fettucine_Alfredo.jpg",
    "../assets/bruschetta.jpg": "../assets/Bruschetta.jpg",
    "../assets/japchae.jpg": "../assets/Japchae.jpg",
    "../assets/tiramisu.jpg": "../assets/Tiramisu.jpg",
    "../assets/spaghetti_aglio.jpg": "../assets/spaghetti.jpg"
};

function normalizeAssetPath(path) {
    if (!path) {
        return "../assets/Poster Jumbotron (1).png";
    }

    return assetAliasMap[path] || path;
}

function parseDetailText(detailText = "") {
    const detail = String(detailText || "").trim();
    if (!detail) {
        return {
            summary: "Resep ini belum memiliki deskripsi rinci.",
            steps: []
        };
    }

    const langkahMatch = detail.match(/Langkah:\s*(.*)$/is);
    const steps = langkahMatch
        ? langkahMatch[1]
            .split(/\s(?=\d+\.)/)
            .map((item) => item.replace(/^\d+\.\s*/, "").trim())
            .filter(Boolean)
        : [];

    const summary = detail
        .split("Langkah:")[0]
        .replace(/Porsi:.*?(?=\|)/i, "")
        .replace(/Bahan:.*$/is, "")
        .replace(/\|/g, " ")
        .trim();

    return {
        summary: summary || "Menu spesial dengan detail lengkap dan langkah yang jelas.",
        steps
    };
}

function inferRecipeTaste(recipe) {
    const text = [
        recipe.nama,
        recipe.summary,
        recipe.detail,
        ...(Array.isArray(recipe.bahan) ? recipe.bahan : [])
    ].join(" ").toLowerCase();

    if (recipe.tipe === "Penutup" || /gula|madu|cokelat|pie|cake|dessert|ice cream|es cendol|klepon|pisang|brownies|donat|mochi|bingsu|tiramisu/.test(text)) {
        return "Manis";
    }

    if (/pedas|cabe|cabai|gochujang|kimchi|sambal|rendang|tteokbokki/.test(text)) {
        return "Pedas";
    }

    if (/asam|lemon|jeruk|cuka|sunomono|asam jawa/.test(text)) {
        return "Asam";
    }

    if (/matcha|kopi|espresso|kakao|dark/.test(text)) {
        return "Pahit";
    }

    if (/gurih|mentega|keju|parmesan|mozzarella|kaldu|ramen|udon|spaghetti|pasta|lasagna|burger|fried chicken/.test(text)) {
        return "Gurih";
    }

    return "Asin";
}

function normalizeRecipe(recipe) {
    const parsed = recipe.detail ? parseDetailText(recipe.detail) : null;
    const summary = recipe.summary || (parsed ? parsed.summary : "Menu spesial dengan rasa menarik untuk dicoba.");

    return {
        ...recipe,
        img: normalizeAssetPath(recipe.img),
        summary,
        steps: recipe.steps || (parsed ? parsed.steps : []),
        rasa: recipe.rasa || inferRecipeTaste({ ...recipe, summary })
    };
}

function getRecipeScore(recipe) {
    const matched = recipe.bahan.filter((item) => recipeExpertState.selectedIngredients.has(item));
    const percent = recipe.bahan.length
        ? Math.round((matched.length / recipe.bahan.length) * 100)
        : 0;
    const missing = recipe.bahan.filter((item) => !recipeExpertState.selectedIngredients.has(item));

    return {
        matched,
        missing,
        percent,
        label: `Cocok ${percent}%`
    };
}

function normalizeRecipeSteps(steps) {
    if (Array.isArray(steps)) {
        return steps.filter(Boolean).map((step) => String(step).trim()).filter(Boolean);
    }

    if (typeof steps === "string") {
        return steps
            .split(/\n+/)
            .map((step) => step.replace(/^\d+\.\s*/, "").trim())
            .filter(Boolean);
    }

    return [];
}

function getCommunityRecipes() {
    if (typeof getPublicRecipes !== "function") {
        return [];
    }

    try {
        return getPublicRecipes().map((recipe) => {
            const normalized = {
                nama: recipe.title || "Resep Komunitas",
                img: normalizeAssetPath(recipe.image || "../assets/Poster Jumbotron (1).png"),
                negara: recipe.country || "Indonesia",
                tipe: recipe.category || "Utama",
                level: recipe.difficulty || "Mudah",
                bahan: Array.isArray(recipe.ingredients) ? recipe.ingredients : [],
                summary: recipe.description || "Resep buatan pengguna Masak Yuk yang sudah dipublish ke komunitas.",
                steps: normalizeRecipeSteps(recipe.steps),
                isCommunity: true
            };

            return {
                ...normalized,
                rasa: recipe.taste || inferRecipeTaste(normalized)
            };
        });
    } catch (error) {
        return [];
    }
}

function getAllRecipesForMenu() {
    return [...allRecipes.map(normalizeRecipe), ...getCommunityRecipes()];
}

function getBaseCatalogRecipes() {
    return [...getCommunityRecipes(), ...allRecipes.map(normalizeRecipe)];
}

function registerFavoriteRecipes(recipes) {
    recipes.forEach((recipe) => {
        if (typeof getRecipeFavoriteKey === "function") {
            favoriteRecipeLookup.set(getRecipeFavoriteKey(recipe), recipe);
        }
    });
}

function getFavoriteButtonMarkup(recipe, variant = "inline") {
    if (typeof getRecipeFavoriteKey !== "function") {
        return "";
    }

    const count = typeof getRecipeFavoriteCount === "function" ? getRecipeFavoriteCount(recipe) : 0;
    const isActive = typeof isRecipeFavorited === "function" ? isRecipeFavorited(recipe) : false;
    const label = variant === "small"
        ? `<i class="fa-${isActive ? "solid" : "regular"} fa-heart"></i><span class="favorite-count">${count}</span>`
        : `<i class="fa-${isActive ? "solid" : "regular"} fa-heart"></i><span>${isActive ? "Favorit" : "Tambah Favorit"}</span><span class="favorite-count">${count}</span>`;

    return `
        <button
            type="button"
            class="menu-favorite-button ${variant} ${isActive ? "active" : ""}"
            data-favorite-key="${escapeHtml(getRecipeFavoriteKey(recipe))}"
            aria-label="Favoritkan ${escapeHtml(recipe.nama)}"
        >
            ${label}
        </button>
    `;
}

function bindFavoriteButtons(scope = document) {
    scope.querySelectorAll("[data-favorite-key]").forEach((button) => {
        button.addEventListener("click", () => {
            const key = button.dataset.favoriteKey;
            const recipe = favoriteRecipeLookup.get(key);
            if (!recipe || typeof toggleRecipeFavorite !== "function") {
                return;
            }

            const result = toggleRecipeFavorite(recipe);
            if (!result.success) {
                window.alert(result.message);
                return;
            }

            renderFavoriteShowcase();
            renderRecipeGrid();
            renderAllMenuGrid();
            if (typeof renderProfileFavoriteRecipes === "function") {
                renderProfileFavoriteRecipes();
            }
        });
    });
}

function getTopFavoriteRecipes(limit = 4) {
    const recipes = getBaseCatalogRecipes()
        .map((recipe) => ({
            ...recipe,
            favoriteCount: typeof getRecipeFavoriteCount === "function" ? getRecipeFavoriteCount(recipe) : 0
        }))
        .sort((a, b) => {
            if (b.favoriteCount !== a.favoriteCount) return b.favoriteCount - a.favoriteCount;
            return a.nama.localeCompare(b.nama, "id");
        });

    const withFavorites = recipes.filter((recipe) => recipe.favoriteCount > 0);
    return (withFavorites.length ? withFavorites : recipes).slice(0, limit);
}

function renderFavoriteShowcase() {
    const grid = document.getElementById("favorite-menu-grid");
    if (!grid) return;

    const recipes = getTopFavoriteRecipes(4);
    registerFavoriteRecipes(recipes);

    if (!recipes.length) {
        grid.innerHTML = `
            <article class="favorite-empty-card">
                <strong>Belum ada resep favorit</strong>
                <p>Mulai beri favorit pada menu yang Anda suka. Resep dengan favorit terbanyak akan tampil di sini.</p>
            </article>
        `;
        return;
    }

    grid.innerHTML = recipes.map((recipe, index) => `
        <article class="classic-dish-card">
            ${getFavoriteButtonMarkup(recipe, "small")}
            <img src="${escapeHtml(recipe.img)}" alt="${escapeHtml(recipe.nama)}">
            <h3>${escapeHtml(recipe.nama)}</h3>
            <div class="classic-stars" aria-hidden="true">${createStars(recipe.level)}</div>
            <p>${escapeHtml(recipe.summary)}</p>
            <div class="classic-card-meta">
                <strong>${recipe.favoriteCount} favorit</strong>
                <button type="button" data-favorite-open-index="${index}">Lihat Resep</button>
            </div>
        </article>
    `).join("");

    grid.querySelectorAll("[data-favorite-open-index]").forEach((button) => {
        button.addEventListener("click", () => {
            const recipe = recipes[Number(button.dataset.favoriteOpenIndex)];
            if (recipe) {
                openRecipeModal(recipe);
            }
        });
    });

    bindFavoriteButtons(grid);
}

function isExpertSelectionComplete() {
    return Boolean(
        recipeExpertState.selectedIngredients.size &&
        recipeExpertState.activeCountry &&
        recipeExpertState.selectedType &&
        recipeExpertState.selectedTaste &&
        recipeExpertState.selectedDifficulty
    );
}

function getVisibleRecipes() {
    if (!isExpertSelectionComplete()) {
        return [];
    }

    const recipes = getAllRecipesForMenu()
        .filter((recipe) => recipeExpertState.activeCountry === "Semua" || recipe.negara === recipeExpertState.activeCountry)
        .filter((recipe) => recipeExpertState.selectedType === "Semua" || recipe.tipe === recipeExpertState.selectedType)
        .filter((recipe) => recipeExpertState.selectedDifficulty === "Semua" || recipe.level === recipeExpertState.selectedDifficulty)
        .filter((recipe) => recipeExpertState.selectedTaste === "Semua" || recipe.rasa === recipeExpertState.selectedTaste)
        .map((recipe) => ({ ...recipe, score: getRecipeScore(recipe) }))
        .filter((recipe) => recipe.score.matched.length > 0);

    recipes.sort((a, b) => {
        if (b.score.percent !== a.score.percent) return b.score.percent - a.score.percent;
        if (b.score.matched.length !== a.score.matched.length) return b.score.matched.length - a.score.matched.length;
        return a.nama.localeCompare(b.nama, "id");
    });

    return recipes;
}

function renderSelectedIngredients() {
    const container = document.getElementById("expert-selected-list");
    if (!container) return;

    const items = Array.from(recipeExpertState.selectedIngredients);
    if (!items.length) {
        container.innerHTML = '<span class="expert-selected-chip is-empty">Belum ada bahan dipilih</span>';
        return;
    }

    container.innerHTML = items.map((item) => `
        <span class="expert-selected-chip">
            <i class="${getIconForBahan(item)}"></i>
            <span>${escapeHtml(item)}</span>
        </span>
    `).join("");
}

function renderIngredientGroups() {
    const container = document.getElementById("expert-ingredient-groups");
    if (!container) return;

    const ingredients = Object.values(dataBahan).flat();
    container.innerHTML = ingredients.map((ingredient) => `
        <button
            type="button"
            class="expert-ingredient-chip ${recipeExpertState.selectedIngredients.has(ingredient) ? "active" : ""}"
            data-ingredient="${escapeHtml(ingredient)}"
        >
            <i class="${getIconForBahan(ingredient)}"></i>
            <span>${escapeHtml(ingredient)}</span>
        </button>
    `).join("");

    container.querySelectorAll("[data-ingredient]").forEach((button) => {
        button.addEventListener("click", () => {
            const ingredient = button.dataset.ingredient;
            if (!ingredient) return;

            if (recipeExpertState.selectedIngredients.has(ingredient)) {
                recipeExpertState.selectedIngredients.delete(ingredient);
            } else {
                recipeExpertState.selectedIngredients.add(ingredient);
            }

            renderSelectedIngredients();
            renderIngredientGroups();
            renderRecipeGrid();
        });
    });
}

function renderChoiceCards(containerId, items, activeValue, dataKey, template) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = items.map((item) => template(item, activeValue === item.value, dataKey)).join("");
}

function renderCountryTabs() {
    renderChoiceCards("expert-country-tabs", countryOptions, recipeExpertState.activeCountry, "country", (item, isActive, dataKey) => `
        <button type="button" class="expert-choice-card ${isActive ? "active" : ""}" data-${dataKey}="${escapeHtml(item.value)}">
            <span class="expert-flag" aria-hidden="true">${item.flag}</span>
            <span class="expert-choice-label">${escapeHtml(item.label)}</span>
        </button>
    `);

    document.querySelectorAll("[data-country]").forEach((button) => {
        button.addEventListener("click", () => {
            recipeExpertState.activeCountry = button.dataset.country || "";
            renderCountryTabs();
            renderRecipeGrid();
        });
    });
}

function renderTypeTabs() {
    renderChoiceCards("expert-type-tabs", typeOptions, recipeExpertState.selectedType, "type", (item, isActive, dataKey) => `
        <button type="button" class="expert-choice-card ${isActive ? "active" : ""}" data-${dataKey}="${escapeHtml(item.value)}">
            <i class="${item.icon}" aria-hidden="true"></i>
            <span class="expert-choice-label">${escapeHtml(item.label)}</span>
        </button>
    `);

    document.querySelectorAll("[data-type]").forEach((button) => {
        button.addEventListener("click", () => {
            recipeExpertState.selectedType = button.dataset.type || "";
            renderTypeTabs();
            renderRecipeGrid();
        });
    });
}

function renderTasteTabs() {
    renderChoiceCards("expert-taste-tabs", tasteOptions, recipeExpertState.selectedTaste, "taste", (item, isActive, dataKey) => `
        <button type="button" class="expert-choice-card ${isActive ? "active" : ""}" data-${dataKey}="${escapeHtml(item.value)}">
            <span class="expert-choice-label">${escapeHtml(item.label)}</span>
        </button>
    `);

    document.querySelectorAll("[data-taste]").forEach((button) => {
        button.addEventListener("click", () => {
            recipeExpertState.selectedTaste = button.dataset.taste || "";
            renderTasteTabs();
            renderRecipeGrid();
        });
    });
}

function renderDifficultyTabs() {
    renderChoiceCards("expert-difficulty-tabs", difficultyOptions, recipeExpertState.selectedDifficulty, "difficulty", (item, isActive, dataKey) => `
        <button
            type="button"
            class="expert-choice-card ${isActive ? "active" : ""}"
            data-tone="${escapeHtml(item.tone)}"
            data-${dataKey}="${escapeHtml(item.value)}"
        >
            <span class="expert-choice-label">${escapeHtml(item.label)}</span>
        </button>
    `);

    document.querySelectorAll("[data-difficulty]").forEach((button) => {
        button.addEventListener("click", () => {
            recipeExpertState.selectedDifficulty = button.dataset.difficulty || "";
            renderDifficultyTabs();
            renderRecipeGrid();
        });
    });
}

function updateProgressNote() {
    const note = document.getElementById("expert-progress-note");
    if (!note) return;

    const missing = [];
    if (!recipeExpertState.selectedIngredients.size) missing.push("bahan");
    if (!recipeExpertState.activeCountry) missing.push("negara");
    if (!recipeExpertState.selectedType) missing.push("jenis makanan");
    if (!recipeExpertState.selectedTaste) missing.push("preferensi rasa");
    if (!recipeExpertState.selectedDifficulty) missing.push("tingkat kesulitan");

    if (!missing.length) {
        note.textContent = "Pilihan sudah lengkap. Scroll sedikit ke bawah untuk melihat rekomendasi resep terbaik.";
        note.classList.add("is-ready");
        return;
    }

    note.textContent = `Lengkapi pilihan ${missing.join(", ")} agar hasil resep bisa tampil.`;
    note.classList.remove("is-ready");
}

function renderRecipeGrid() {
    const resultsSection = document.getElementById("expert-results-section");
    const grid = document.getElementById("expert-menu-grid");
    const emptyState = document.getElementById("expert-empty-state");
    const caption = document.getElementById("expert-results-caption");

    if (!resultsSection || !grid || !emptyState || !caption) return;

    updateProgressNote();

    if (!isExpertSelectionComplete()) {
        resultsSection.hidden = true;
        grid.innerHTML = "";
        emptyState.hidden = true;
        return;
    }

    const recipes = getVisibleRecipes();
    registerFavoriteRecipes(recipes);
    resultsSection.hidden = false;
    caption.textContent = `Negara ${recipeExpertState.activeCountry.toLowerCase()}, ${recipeExpertState.selectedType.toLowerCase()}, rasa ${recipeExpertState.selectedTaste.toLowerCase()}, level ${recipeExpertState.selectedDifficulty.toLowerCase()}.`;

    if (!recipes.length) {
        grid.innerHTML = "";
        emptyState.hidden = false;
        return;
    }

    emptyState.hidden = true;
    grid.innerHTML = recipes.map((recipe, index) => `
        <article class="expert-menu-card">
            <div class="expert-card-figure">
                <span class="expert-card-country">${escapeHtml(recipe.negara)}</span>
                <span class="expert-card-level ${getDifficultyClass(recipe.level)}">${escapeHtml(recipe.level)}</span>
                ${recipe.isCommunity ? '<span class="expert-card-badge">Resep Komunitas</span>' : ""}
                <img src="${escapeHtml(recipe.img)}" alt="${escapeHtml(recipe.nama)}">
            </div>
            <div class="expert-card-body">
                <p class="expert-card-type">${escapeHtml(recipe.tipe)}</p>
                <h3 class="expert-card-title">${escapeHtml(recipe.nama)}</h3>
                <p class="expert-card-desc">${escapeHtml(recipe.summary)}</p>
                <div class="expert-card-divider"></div>
                <div class="expert-card-score-box">
                    <span class="expert-card-score">
                        <i class="fa-solid fa-chart-pie"></i>
                        <span>${escapeHtml(recipe.score.label.toUpperCase())}</span>
                    </span>
                    <span class="expert-card-missing">${recipe.score.missing.length ? `Kurang ${recipe.score.missing.length} Bahan` : "Bahan Lengkap"}</span>
                </div>
                <p class="expert-card-needs"><strong>Butuh:</strong> ${escapeHtml(recipe.score.missing.slice(0, 3).join(", ") || recipe.bahan.slice(0, 3).join(", "))}${recipe.score.missing.length > 3 ? "..." : ""}</p>
                <div class="expert-card-meta">
                    <span class="expert-card-rasa">
                        <i class="fa-solid fa-sparkles"></i>
                        <span>${escapeHtml(recipe.rasa)}</span>
                    </span>
                    <div class="all-menu-card-actions">
                        ${getFavoriteButtonMarkup(recipe, "inline")}
                        <button type="button" class="expert-card-action" data-open-recipe-index="${index}">Lihat Resep</button>
                    </div>
                </div>
            </div>
        </article>
    `).join("");

    grid.querySelectorAll("[data-open-recipe-index]").forEach((button) => {
        button.addEventListener("click", () => {
            const index = Number(button.dataset.openRecipeIndex);
            const recipe = recipes[index];
            if (recipe) {
                openRecipeModal(recipe);
            }
        });
    });

    bindFavoriteButtons(grid);
}

function openRecipeModal(recipe) {
    const modal = document.getElementById("expert-recipe-modal");
    if (!modal) return;

    recipeExpertState.activeRecipe = recipe;

    const image = document.getElementById("expert-modal-image");
    const country = document.getElementById("expert-modal-country");
    const level = document.getElementById("expert-modal-level");
    const type = document.getElementById("expert-modal-type");
    const title = document.getElementById("expert-modal-title");
    const summary = document.getElementById("expert-modal-summary");
    const score = document.getElementById("expert-modal-score");
    const missing = document.getElementById("expert-modal-missing");
    const ingredients = document.getElementById("expert-modal-ingredients");
    const steps = document.getElementById("expert-modal-steps");

    if (!image || !country || !level || !type || !title || !summary || !score || !missing || !ingredients || !steps) {
        return;
    }

    const recipeScore = getRecipeScore(recipe);
    image.src = recipe.img;
    image.alt = recipe.nama;
    country.textContent = recipe.negara;
    level.textContent = recipe.level;
    level.className = `expert-modal-level ${getDifficultyClass(recipe.level)}`;
    type.textContent = `${recipe.tipe} · ${recipe.rasa}`;
    title.textContent = recipe.nama;
    summary.textContent = recipe.summary;
    score.textContent = `COCOK ${recipeScore.percent}%`;
    missing.textContent = recipeScore.missing.length ? `Kurang ${recipeScore.missing.length} Bahan` : "Bahan Lengkap";
    ingredients.innerHTML = recipe.bahan.map((item) => `
        <span class="expert-modal-ingredient-item">
            <i class="${getIconForBahan(item)}"></i>
            <span>${escapeHtml(item)}</span>
        </span>
    `).join("");
    const stepItems = recipe.steps && recipe.steps.length
        ? recipe.steps
        : ["Resep ini belum memiliki langkah detail. Silakan lihat deskripsi atau perbarui resep dari halaman Buat Resep."];
    steps.innerHTML = stepItems.map((step) => `<li>${escapeHtml(step)}</li>`).join("");

    modal.hidden = false;
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
}

function closeRecipeModal() {
    const modal = document.getElementById("expert-recipe-modal");
    if (!modal) return;

    modal.hidden = true;
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    recipeExpertState.activeRecipe = null;
}

function createStars(level) {
    const total = level === "Mudah" ? 3 : level === "Sedang" ? 4 : 5;
    return Array.from({ length: 5 }, (_, index) => {
        const klass = index < total ? "fa-solid fa-star" : "fa-regular fa-star";
        return `<i class="${klass}"></i>`;
    }).join("");
}

function getCatalogRecipes() {
    const query = allMenuState.searchQuery.trim().toLowerCase();

    return getBaseCatalogRecipes()
        .filter((recipe) => allMenuState.activeCountry === "Semua" || recipe.negara === allMenuState.activeCountry)
        .filter((recipe) => {
            if (!query) return true;
            const haystack = [recipe.nama, recipe.negara, recipe.tipe, recipe.level, recipe.rasa, recipe.summary, ...(recipe.bahan || [])]
                .join(" ")
                .toLowerCase();
            return haystack.includes(query);
        });
}

function renderAllMenuTabs() {
    const container = document.getElementById("all-menu-tabs");
    if (!container) return;

    const countries = ["Semua", ...countryOptions.map((item) => item.value).filter((value, index, array) => value !== "Semua" && array.indexOf(value) === index)];

    container.innerHTML = countries.map((country) => `
        <button type="button" class="all-menu-tab ${allMenuState.activeCountry === country ? "active" : ""}" data-menu-country="${escapeHtml(country)}">
            ${escapeHtml(country)}
        </button>
    `).join("");

    container.querySelectorAll("[data-menu-country]").forEach((button) => {
        button.addEventListener("click", () => {
            allMenuState.activeCountry = button.dataset.menuCountry || "Semua";
            allMenuState.visibleCount = 8;
            renderAllMenuTabs();
            renderAllMenuGrid();
        });
    });
}

function renderAllMenuGrid() {
    const grid = document.getElementById("all-menu-grid");
    const caption = document.getElementById("all-menu-caption");
    const prevButton = document.getElementById("all-menu-prev-button");
    const moreButton = document.getElementById("all-menu-more-button");
    if (!grid || !caption || !prevButton || !moreButton) return;

    const recipes = getCatalogRecipes();
    const visibleRecipes = recipes.slice(0, allMenuState.visibleCount);
    registerFavoriteRecipes(visibleRecipes);

    caption.textContent = recipes.length
        ? `Menampilkan ${visibleRecipes.length} dari ${recipes.length} menu${allMenuState.activeCountry !== "Semua" ? ` untuk negara ${allMenuState.activeCountry}` : ""}.`
        : "Belum ada menu yang cocok dengan pencarian atau filter yang dipilih.";

    if (!visibleRecipes.length) {
        grid.innerHTML = `
            <article class="expert-empty-state">
                <strong>Menu tidak ditemukan</strong>
                <p>Coba kata kunci lain atau ubah filter negara agar lebih banyak resep tampil.</p>
            </article>
        `;
        prevButton.disabled = true;
        prevButton.textContent = "Menu Sebelumnya";
        moreButton.disabled = true;
        moreButton.textContent = "Tidak Ada Menu Lagi";
        return;
    }

    grid.innerHTML = visibleRecipes.map((recipe, index) => `
        <article class="all-menu-card">
            <div class="all-menu-card-image-wrap">
                <span class="all-menu-card-country">${escapeHtml(recipe.negara)}</span>
                ${recipe.isCommunity ? '<span class="all-menu-card-badge">Resep Baru</span>' : ""}
                ${getFavoriteButtonMarkup(recipe, "small")}
                <img src="${escapeHtml(recipe.img)}" alt="${escapeHtml(recipe.nama)}">
            </div>
            <div class="all-menu-card-content">
                <h3>${escapeHtml(recipe.nama)}</h3>
                <div class="all-menu-card-stars" aria-hidden="true">${createStars(recipe.level)}</div>
                <p>${escapeHtml(recipe.summary)}</p>
                <div class="all-menu-card-meta">
                    <span class="all-menu-card-price">${escapeHtml(recipe.tipe)}</span>
                    <button type="button" class="all-menu-card-action" data-menu-open-index="${index}">Lihat Resep</button>
                </div>
            </div>
        </article>
    `).join("");

    grid.querySelectorAll("[data-menu-open-index]").forEach((button) => {
        button.addEventListener("click", () => {
            const recipe = visibleRecipes[Number(button.dataset.menuOpenIndex)];
            if (recipe) {
                openRecipeModal(recipe);
            }
        });
    });

    bindFavoriteButtons(grid);

    const canGoBack = allMenuState.visibleCount > 8;
    const hasMore = allMenuState.visibleCount < recipes.length;
    prevButton.disabled = !canGoBack;
    prevButton.textContent = "Menu Sebelumnya";
    moreButton.disabled = !hasMore;
    moreButton.textContent = hasMore ? "Menu Berikutnya" : "Semua Menu Sudah Tampil";
}

function initAllMenuCatalog() {
    const searchForm = document.getElementById("all-menu-search-form");
    const searchInput = document.getElementById("all-menu-search-input");
    const prevButton = document.getElementById("all-menu-prev-button");
    const moreButton = document.getElementById("all-menu-more-button");

    if (!searchForm || !searchInput || !prevButton || !moreButton) return;

    renderAllMenuTabs();
    renderAllMenuGrid();

    searchForm.addEventListener("submit", (event) => {
        event.preventDefault();
        allMenuState.searchQuery = searchInput.value.trim();
        allMenuState.visibleCount = 8;
        renderAllMenuGrid();
    });

    searchInput.addEventListener("search", () => {
        allMenuState.searchQuery = searchInput.value.trim();
        allMenuState.visibleCount = 8;
        renderAllMenuGrid();
    });

    moreButton.addEventListener("click", () => {
        allMenuState.visibleCount += 8;
        renderAllMenuGrid();
    });

    prevButton.addEventListener("click", () => {
        allMenuState.visibleCount = Math.max(8, allMenuState.visibleCount - 8);
        renderAllMenuGrid();
    });
}

function initRecipeExpert() {
    const resetButton = document.getElementById("expert-reset-button");
    const closeButton = document.getElementById("expert-modal-close");
    const backdrop = document.getElementById("expert-recipe-backdrop");
    const ingredientsContainer = document.getElementById("expert-ingredient-groups");

    if (!resetButton || !ingredientsContainer) return;

    renderSelectedIngredients();
    renderFavoriteShowcase();
    renderIngredientGroups();
    renderCountryTabs();
    renderTypeTabs();
    renderTasteTabs();
    renderDifficultyTabs();
    renderRecipeGrid();

    resetButton.addEventListener("click", () => {
        recipeExpertState.selectedIngredients.clear();
        recipeExpertState.activeCountry = "";
        recipeExpertState.selectedType = "";
        recipeExpertState.selectedTaste = "";
        recipeExpertState.selectedDifficulty = "";

        renderSelectedIngredients();
        renderIngredientGroups();
        renderCountryTabs();
        renderTypeTabs();
        renderTasteTabs();
        renderDifficultyTabs();
        renderRecipeGrid();
    });

    if (closeButton) {
        closeButton.addEventListener("click", closeRecipeModal);
    }

    if (backdrop) {
        backdrop.addEventListener("click", closeRecipeModal);
    }

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && recipeExpertState.activeRecipe) {
            closeRecipeModal();
        }
    });
}

window.initRecipeExpert = initRecipeExpert;
window.initAllMenuCatalog = initAllMenuCatalog;
window.getTopFavoriteRecipes = getTopFavoriteRecipes;
window.getBaseCatalogRecipes = getBaseCatalogRecipes;
