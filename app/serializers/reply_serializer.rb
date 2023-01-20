class ReplySerializer < ActiveModel::Serializer
  attributes :id, :body, :likes_count

  belongs_to :user

  def likes_count
    object.likes.count
  end
end
