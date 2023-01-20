class User < ApplicationRecord
  validates :username, :password_digest, :email
  validates :username, :email, uniqueness: { message: 'already exists in another account.' }
end
