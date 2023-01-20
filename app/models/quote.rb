class Quote < ApplicationRecord
  validates :date, presence: true, uniqueness: { message: 'already has a quote.' }
end
