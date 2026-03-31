<?php

use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('role')->default(User::ROLE_USER)->after('password');
            $table->boolean('is_verified')->default(false)->after('role');
        });

        $specialAccounts = User::SPECIAL_ACCOUNT_ROLES;

        foreach ($specialAccounts as $email => $role) {
            DB::table('users')
                ->where('email', $email)
                ->update([
                    'role' => $role,
                    'is_verified' => true,
                    'email_verified_at' => DB::raw('COALESCE(email_verified_at, CURRENT_TIMESTAMP)'),
                ]);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['role', 'is_verified']);
        });
    }
};
