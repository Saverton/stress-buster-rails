class QuotesController < ApplicationController
  # GET /quotes/today
  def today
    render json: Quote.today, status: :ok
  end

  # GET /quotes/:date
  def show
    quote = Quote.day(params[:date])
    render json: quote, status: :ok
  end
end
