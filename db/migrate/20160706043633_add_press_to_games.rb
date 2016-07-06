class AddPressToGames < ActiveRecord::Migration
  def change
    add_column :games, :press, :boolean
  end
end
