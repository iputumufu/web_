<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class PrivilegedUsersSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $defaultPassword = 'MasakYuk123!';

        $accounts = [
            [
                'name' => 'Mufu Putu',
                'email' => 'mufuputu22@gmail.com',
                'role' => User::ROLE_ADMIN,
            ],
            [
                'name' => 'Dzaky Lovedo',
                'email' => 'dzakylovedo@gmail.com',
                'role' => User::ROLE_MODERATOR,
            ],
            [
                'name' => 'Abhiramaa',
                'email' => 'abhiramaa960@gmail.com',
                'role' => User::ROLE_USER,
            ],
            [
                'name' => 'Forgant',
                'email' => 'forgant3@gmail.com',
                'role' => User::ROLE_USER,
            ],
            [
                'name' => 'Komang Dewa',
                'email' => 'komangdewa718@gmail.com',
                'role' => User::ROLE_USER,
            ],
        ];

        foreach ($accounts as $account) {
            $user = User::updateOrCreate(
                ['email' => $account['email']],
                [
                    'name' => $account['name'],
                    'password' => Hash::make($defaultPassword),
                    'role' => $account['role'],
                    'is_verified' => true,
                    'email_verified_at' => now(),
                ]
            );

            $user->syncAccountAttributesFromEmail();
        }
    }
}
