class JournalsController < ApplicationController
  before_action :authorize

  # GET /journals
  def index
    render json: Journal.all, status: :ok
  end

  # GET /journals/:id
  def show
    journal = find_journal
    render json: journal, status: :ok
  end

  # POST /journals
  def create
    journal = current_user.journals.create!(journal_params)
    journal.quote = Quote.day(journal.date)
    render json: journal, status: :created
  end

  # PATCH/PUT /journals/:id
  def update
    journal = find_journal
    journal.update!(journal_params)
    render json: journal, status: :accepted
  end

  # DELETE /journals/:id
  def destroy
    journal = find_journal
    journal.destroy
    head :no_content
  end

  # GET journals/averages
  def average
    averages = current_user.journals.average(:sleep, :exercise, :nature, :social, :mindful, :mental, :nutrition)
    render json: averages, status: :ok
  end

  private

  def journal_params
    params.permit(:body, :date, :sleep, :exercise, :nature, :social, :mindful, :nutrition, :mental, :therapy)
  end

  def render_not_found
    render json: { erorrs: ['Journal Not Found'] }, status: :not_found
  end

  def find_journal
    Journal.find(params[:id])
  end
end
