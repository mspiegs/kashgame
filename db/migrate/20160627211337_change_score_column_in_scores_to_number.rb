class ChangeScoreColumnInScoresToNumber < ActiveRecord::Migration
  def change
    rename_column :scores, :score, :number
  end
end
