class CreateJournals < ActiveRecord::Migration[7.0]
  def change
    create_table :journals do |t|
      t.text :body
      t.integer :sleep
      t.integer :exercise
      t.integer :nature
      t.integer :social
      t.integer :mindful
      t.integer :nutrition
      t.integer :mental
      t.boolean :therapy
      t.belongs_to :user, null: false, foreign_key: true
      t.string :date
      t.belongs_to :quote, null: false, foreign_key: true

      t.timestamps
    end
  end
end
