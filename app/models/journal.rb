class Journal < ApplicationRecord
  belongs_to :user
  belongs_to :quote

  validates :body, :sleep, :exercise, :nature, :social, :mindful, :nutrition, :mental, :therapy, :date, presence: true
end
