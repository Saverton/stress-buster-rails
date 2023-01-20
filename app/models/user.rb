class User < ApplicationRecord
  has_secure_password

  has_many :comments, dependent: :destroy
  has_many :journals, dependent: :destroy
  has_many :likes, dependent: :destroy

  validates :username, :password_digest, :email, presence: true
  validates :username, :email, uniqueness: { message: 'already exists in another account.' }

  def averages
    my_journals = journals
    metric_averages = {}
    %i[sleep exercise nature social mindful nutrition mental].each do |metric|
      sum = my_journals.sum(&metric)
      metric_averages[metric] = sum.to_f / my_journals.length
    end
    metric_averages
  end
end
