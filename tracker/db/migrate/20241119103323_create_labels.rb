class CreateLabels < ActiveRecord::Migration[8.0]
  def change
    create_table :labels do |t|
      t.string :name
      t.string :color

      t.timestamps
    end
  end
end
