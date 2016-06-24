class AddGamesPlayersTable < ActiveRecord::Migration
  def change
    create_table :games_players do |t|
      t.integer :games_id
      t.integer :players_id

      t.timestamps null: false
    end
  end
end
