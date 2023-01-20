class CommentSerializer < ActiveModel::Serializer
  attributes :id, :body, :likes_count

  belongs_to :user
  has_many :replies, serializer: ReplySerializer

  def likes_count
    object.likes.count
  end
end
