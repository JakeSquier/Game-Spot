class CreateComments < ActiveRecord::Migration[6.0]
  def change
    create_table :comments do |t|
      t.string :userName
      t.integer :game_id
      t.text :content

      t.timestamps
    end
  end
end
