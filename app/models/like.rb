class Like < ApplicationRecord
  belongs_to :user
  belongs_to :comment

  validates :comment_id, uniqueness: { scope: :user_id, message: 'has already been liked by this user.' }
end
