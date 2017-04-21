class RenameRoundsUsersTable < ActiveRecord::Migration
  def change
  	rename_table :rounds_users, :roundusers
  end
end
