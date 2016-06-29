class CreateGolfBuddies < ActiveRecord::Migration
  def change
    create_table :golf_buddies do |t|
      t.integer :follower_id
      t.integer :followed_id

      t.timestamps null: false
    end
    add_index :golf_buddies, :follower_id
    add_index :golf_buddies, :followed_id
    add_index :golf_buddies, [:follower_id, :followed_id], unique: true
  end
end
