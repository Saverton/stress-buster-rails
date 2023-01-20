class ReplySerializer < ActiveModel::Serializer
  attributes :id, :body, :likes_count, :user

  # belongs_to :user

  def likes_count
    object.likes.count
  end

  def user
    object.user
  end
end
