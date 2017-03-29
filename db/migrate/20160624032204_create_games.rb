class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.string :game_type
      t.string :name

      t.timestamps null: false
    end
  end
end
