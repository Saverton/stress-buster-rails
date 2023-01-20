class CommentSerializer < ActiveModel::Serializer
  attributes :id, :body, :parent_id
  has_one :user
end
