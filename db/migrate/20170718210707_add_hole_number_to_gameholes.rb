class AddHoleNumberToGameholes < ActiveRecord::Migration
  def change
    add_column :gameholes, :hole_number, :integer
  end
end
