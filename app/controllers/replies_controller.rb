class RepliesController < CommentsController
  def create
    parent_comment = find_comment
    reply = current_user.comments.create(body: params[:body], parent_id: parent_comment.id)
    render json: reply, status: :created
  end
end
