class SessionsController < ApplicationController
  # GET /me
  def show
    user = User.find(session[:user_id])
    render json: user, status: :ok
  end

  # POST /login
  def create
    user = User.find_by(username: params[:username])
    if user&.authenticate(params[:password])
      session[:user_id] = user.id
      render json: user, status: :created
    else
      render json: { errors: ['Invalid username or password'] }, status: :unauthorized
    end
  end

  # DELETE /logout
  def destroy
    session.destroy :user_id
    head :no_content
  end
end