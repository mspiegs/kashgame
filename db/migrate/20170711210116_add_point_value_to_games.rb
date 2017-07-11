class AddPointValueToGames < ActiveRecord::Migration
  def change
    add_column :games, :point_value, :integer
  end
end
