class AddTeamToScores < ActiveRecord::Migration
  def change
    add_column :scores, :team, :integer
  end
end
