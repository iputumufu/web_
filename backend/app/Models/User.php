<?php

namespace App\Models;

use App\Notifications\ResetPasswordNotification;
// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, HasApiTokens, Notifiable;

    public const ROLE_ADMIN = 'admin';
    public const ROLE_MODERATOR = 'moderator';
    public const ROLE_USER = 'user';

    public const SPECIAL_ACCOUNT_ROLES = [
        'mufuputu22@gmail.com' => self::ROLE_ADMIN,
        'dzakylovedo@gmail.com' => self::ROLE_MODERATOR,
        'abhiramaa960@gmail.com' => self::ROLE_USER,
        'forgant3@gmail.com' => self::ROLE_USER,
        'komangdewa718@gmail.com' => self::ROLE_USER,
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'google_id',
        'facebook_id',
        'avatar',
        'role',
        'is_verified',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'is_verified' => 'boolean',
        ];
    }

    public static function normalizeEmail(?string $email): string
    {
        return strtolower(trim((string) $email));
    }

    public static function resolveRoleForEmail(?string $email): string
    {
        return self::SPECIAL_ACCOUNT_ROLES[self::normalizeEmail($email)] ?? self::ROLE_USER;
    }

    public static function shouldReceiveVerifiedBadge(?string $email): bool
    {
        return array_key_exists(self::normalizeEmail($email), self::SPECIAL_ACCOUNT_ROLES);
    }

    public function syncAccountAttributesFromEmail(bool $save = true): void
    {
        $isVerified = self::shouldReceiveVerifiedBadge($this->email);

        $this->role = self::resolveRoleForEmail($this->email);
        $this->is_verified = $isVerified;

        if ($isVerified && $this->email_verified_at === null) {
            $this->email_verified_at = now();
        }

        if ($save) {
            $this->save();
        }
    }

    public function getRoleLabelAttribute(): string
    {
        return match ($this->role) {
            self::ROLE_ADMIN => 'Admin',
            self::ROLE_MODERATOR => 'Moderator',
            default => 'User Biasa',
        };
    }

    public function sendPasswordResetNotification($token): void
    {
        $this->notify(new ResetPasswordNotification($token));
    }
}
