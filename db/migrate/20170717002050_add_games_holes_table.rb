class AddGamesHolesTable < ActiveRecord::Migration
  def change
  	create_table :games_holes do |t|
      t.integer :game_id
      t.integer :hole_id
      t.float :hole_value

      t.timestamps null: false
    end
  end
end
