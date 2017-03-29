class AddCourseIdToRound < ActiveRecord::Migration
  def change
    add_column :rounds, :course_id, :integer
  end
end
