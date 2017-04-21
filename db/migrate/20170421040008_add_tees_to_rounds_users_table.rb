class AddTeesToRoundsUsersTable < ActiveRecord::Migration
  def change
    add_column :rounds_users, :tees, :string
  end
end
