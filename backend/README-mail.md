# Konfigurasi Email Reset Password

Project ini sudah mendukung pengiriman email reset password dari backend Laravel.

Agar email benar-benar terkirim ke inbox user, isi SMTP asli pada `backend/.env`.

Contoh Gmail:

```env
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your_email@gmail.com
MAIL_PASSWORD=your_app_password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=your_email@gmail.com
MAIL_FROM_NAME="Sekolah Kita"
```

Setelah mengubah `.env`, jalankan:

```bash
php artisan config:clear
php artisan cache:clear
```

Catatan:

- Untuk Gmail, gunakan App Password, bukan password akun biasa.
- Jika tetap memakai `MAIL_HOST=mailpit`, email hanya akan masuk ke Mailpit lokal.
- Jika Mailpit tidak berjalan, pengiriman akan gagal.
