class AddHandicapToHoles < ActiveRecord::Migration
  def change
    add_column :holes, :handicap, :integer
  end
end
