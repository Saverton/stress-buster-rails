class QuoteSerializer < ActiveModel::Serializer
  attributes :id, :date, :content

  def content
    object.quote_data
  end
end
