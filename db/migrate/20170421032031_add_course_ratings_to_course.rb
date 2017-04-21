class AddCourseRatingsToCourse < ActiveRecord::Migration
  def change
    add_column :courses, :blue_tees_slope, :integer
    add_column :courses, :blue_tees_rating, :integer
    add_column :courses, :black_tees_slope, :integer
    add_column :courses, :black_tees_rating, :integer
    add_column :courses, :white_tees_slope, :integer
    add_column :courses, :white_tees_rating, :integer
    add_column :courses, :red_tees_slope, :integer
    add_column :courses, :red_tees_rating, :integer
    add_column :courses, :gold_tees_slope, :integer
    add_column :courses, :gold_tees_rating, :integer
    add_column :courses, :yello_tees_slope, :integer
    add_column :courses, :yello_tees_rating, :integer
  end
end
