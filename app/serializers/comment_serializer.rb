class CommentSerializer < ActiveModel::Serializer
  attributes :id, :body, :replies, :likes_count, :liked_by_user

  belongs_to :user

  def likes_count
    object.likes.count
  end

  def liked_by_user
    object.likes.where(user_id: sessions[:user_id]).any?
  end
end
