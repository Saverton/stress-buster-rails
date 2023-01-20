class CommentSerializer < ActiveModel::Serializer
  attributes :id, :body, :replies, :likes_count

  belongs_to :user

  def likes_count
    object.likes.count
  end
end
