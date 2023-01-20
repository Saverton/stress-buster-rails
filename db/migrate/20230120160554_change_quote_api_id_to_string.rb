class ChangeQuoteApiIdToString < ActiveRecord::Migration[7.0]
  def change
    change_column :quotes, :api_id, :string
  end
end
