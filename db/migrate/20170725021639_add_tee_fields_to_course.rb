class AddTeeFieldsToCourse < ActiveRecord::Migration
  def change
    add_column :courses, :green_tees_rating, :integer
    add_column :courses, :green_tees_slope, :integer
    add_column :courses, :green_white_combo_tees_rating, :integer
    add_column :courses, :green_white_combo_tees_slope, :integer
  end
end
