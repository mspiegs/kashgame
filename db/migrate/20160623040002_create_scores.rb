class CreateScores < ActiveRecord::Migration
  def change
    create_table :scores do |t|
      t.integer :score
      t.integer :round_id
      t.integer :hole_id

      t.timestamps null: false
    end
  end
end
