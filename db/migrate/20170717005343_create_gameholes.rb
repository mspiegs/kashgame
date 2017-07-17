class CreateGameholes < ActiveRecord::Migration
  def change
    create_table :gameholes do |t|

      t.timestamps null: false
    end
  end
end
