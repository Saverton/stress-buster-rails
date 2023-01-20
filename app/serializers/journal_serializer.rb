class JournalSerializer < ActiveModel::Serializer
  attributes :id, :body, :sleep, :exercise, :nature, :social, :mindful, :nutrition, :mental, :therapy, :date, :quote_content
  belongs_to :user

  def quote_content
    object.quote.quote_data
  end
end
