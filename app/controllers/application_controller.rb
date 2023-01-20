class ApplicationController < ActionController::API
  rescue_from ActiveRecord::RecordNotFound
end
