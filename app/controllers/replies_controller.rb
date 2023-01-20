class RepliesController < CommentsController
  before_action :authorize

  def create
    parent_comment = find_comment
    reply = find_user.comments.create(body: params[:body], parent_id: parent_comment.id)
    render json: reply.parent, serializer: CommentSerializer, status: :created
  end
end
