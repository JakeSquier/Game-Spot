class CreateScores < ActiveRecord::Migration[6.0]
  def change
    create_table :scores do |t|
      t.string :userName
      t.integer :game_id
      t.integer :score

      t.timestamps
    end
  end
end
