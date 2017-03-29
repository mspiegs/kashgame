class AddGameToRound < ActiveRecord::Migration
  def change
    add_column :rounds, :game, :string
  end
end
