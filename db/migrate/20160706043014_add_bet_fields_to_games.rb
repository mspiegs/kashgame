class AddBetFieldsToGames < ActiveRecord::Migration
  def change
    add_column :games, :back_9_bet, :integer
    add_column :games, :front_9_bet, :integer
    add_column :games, :overall_bet, :integer
    add_column :games, :game_name, :string
  end
end
