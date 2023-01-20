class JournalSerializer < ActiveModel::Serializer
  attributes :id, :body, :sleep, :exercise, :nature, :social, :mindful, :nutrition, :mental, :therapy, :date
  has_one :user
  has_one :quote
end
