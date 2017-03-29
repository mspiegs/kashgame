class AddLengthToHoles < ActiveRecord::Migration
  def change
    add_column :holes, :length, :integer
  end
end
