class CommentsController < ApplicationController
  before_action :authorize
  skip_before_action :authorize, only: %i[index]

  # GET /comments/:page => max 25 w/ replies
  def index
    comments = Comment.where(parent_id: nil).order(:created_at, :desc).limit(25).offset(params[:page].to_i * 25)
    render json: each_liked(comments), status: :ok
  end

  # POST /comments
  def create
    user = find_user
    comment = user.comments.create!(comment_params)
    render json: with_liked(comment), status: :created
  end

  # PATCH /comments/:id/like
  def like
    comment = find_comment
    like = comment.likes.where(user_id: session[:user_id]).first
    if like
      like.destroy
    else
      comment.likes.create(user_id: session[:user_id])
    end
    render json: with_liked(comment), status: :accepted
  end

  # DELETE /comments/:id
  def destroy
    comment = find_comment
    comment.destroy
    head :no_content
  end

  private

  def each_liked(comments)
    comments.map { |c| with_liked(c) }
  end

  def with_liked(comment)
    comment_hash = ActiveModel::SerializableResource.new(comment).serializable_hash
    comment_hash.merge({
                         liked_by_user: comment.likes.exists?(user_id: session[:user_id]),
                         owned_by_user: comment[:user_id] == session[:user_id]
                       })
  end

  def find_comment
    Comment.find(params[:id] || params[:comment_id])
  end

  def comment_params
    params.permit(:body)
  end

  def render_not_found
    render json: { errors: ['Comment not found'] }, status: :not_found
  end
end
