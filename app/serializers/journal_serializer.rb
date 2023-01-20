class JournalSerializer < ActiveModel::Serializer
  attributes :id, :body, :sleep, :exercise, :nature, :social, :mindful, :nutrition, :mental, :therapy, :date
  belongs_to :user
  belongs_to :quote
end
