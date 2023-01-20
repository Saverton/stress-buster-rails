class CommentsController < ApplicationController
  before_action :authorize
  skip_before_action :authorize, only: %i[index]

  # GET /comments/:page => max 25 w/ replies
  def index
    comments = Comment.order(:created_at, :desc).limit(25).offset(params[:page] * 25)
    render json: comments, status: :ok
  end

  # POST /comments
  def create
    user = current_user
    comment = user.comments.create!(comment_params)
    render json: comment, status: :created
  end

  # PATCH /comments/:id/like
  def like
    comment = find_comment
    like = Like.where(user_id: session[:user_id]).where(comment_id: comment.id).first
    if like
      like.destroy
    else
      likes.create(user_id: session[:user_id])
    end
    render json: comment, status: :accepted
  end

  private

  def find_comment
    Comment.find(params[:id])
  end

  def comment_params
    params.permit(:body)
  end

  def render_not_found
    render json: { errors: ['Comment not found'] }, status: :not_found
  end
end
