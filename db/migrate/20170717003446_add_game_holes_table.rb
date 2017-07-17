class AddGameHolesTable < ActiveRecord::Migration
  def change
  	create_table :gameholes do |t|
      t.integer :game_id
      t.integer :hole_id
      t.float :hole_value

      t.timestamps null: false
    end
  end
end
