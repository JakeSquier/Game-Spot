class CreateGames < ActiveRecord::Migration[6.0]
  def change
    create_table :games do |t|
      t.string :name
      t.string :file_directory
      t.string :gif_url
      t.string :difficulty

      t.timestamps
    end
  end
end
