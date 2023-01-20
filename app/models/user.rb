class User < ApplicationRecord
  has_secure_password
  
  has_many :comments, dependent: :destroy
  has_many :journals, dependent: :destroy
  has_many :likes, dependent: :destroy

  validates :username, :password_digest, :email, presence: true
  validates :username, :email, uniqueness: { message: 'already exists in another account.' }
end
