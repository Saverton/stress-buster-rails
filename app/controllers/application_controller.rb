class ApplicationController < ActionController::API
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity

  private

  def authorize
    return render json: { errors: ['Must be logged in to access'] }, status: :unauthorized unless session.include? :user_id
  end

  def render_not_found
    render json: { erorrs: ['Not Found'] }, status: :not_found
  end

  def render_unprocessable_entity(invalid)
    render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
  end

  def find_user
    User.find(session[:user_id])
  end
end
