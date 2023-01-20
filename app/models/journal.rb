class Journal < ApplicationRecord
  belongs_to :user
  belongs_to :quote

  validates_presence_of :body, :sleep, :exercise, :nature, :social, :mindful, :nutrition, :mental, :date
  validates :therapy, inclusion: [true, false]
end
