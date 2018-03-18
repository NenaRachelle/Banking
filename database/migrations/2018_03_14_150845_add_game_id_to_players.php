<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddGameIdToPlayers extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('t4_players', function (Blueprint $table) {
          $table->integer('game_id')->unsigned()->after('id');
          $table->foreign('game_id')->references('id')->on('games');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
     public function down()
     {
         Schema::table('t4_players', function(Blueprint $table)
         {

             $table->dropForeign('t4_players_game_id_foreign');
             $table->dropColumn('game_id');

         });
     }
}
