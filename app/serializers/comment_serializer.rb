class CommentSerializer < ActiveModel::Serializer
  attributes :id, :body, :likes_count

  belongs_to :user
  has_many :replies

  def likes_count
    object.likes.count
  end
end
