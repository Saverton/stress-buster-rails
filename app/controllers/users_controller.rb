class UsersController < ApplicationController
  # POST /signup
  def create
    user = User.create!(user_params)
    session[:user_id] = user.id
    render json: user, status: :created
  end

  private

  def user_params
    params.permit(:username, :email, :password, :password_confirmation)
  end
end
