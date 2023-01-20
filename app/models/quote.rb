require 'net/http'
require 'json'

class Quote < ApplicationRecord
  validates :date, presence: true, uniqueness: { message: 'already has a quote.' }

  QUOTABLE_URL = 'https://api.quotable.io'.freeze

  def self.today
    day(Date.current)
  end

  def self.day(date)
    quote = Quote.find_by(date: date.to_s)
    if quote.nil?
      Quote.random(date)
    else
      quote
    end
  end

  def self.random(date)
    uri = URI("#{QUOTABLE_URL}/random")
    quote = fetch_data(uri)
    create!(api_id: quote['_id'], date: date.to_s)
  end
  
  def quote_data
    uri = URI("#{QUOTABLE_URL}/quotes/#{api_id}")
    fetch_data(uri)
  end

  private

  # returns hash created from JSON
  def fetch_data(uri)
    JSON.parse(Net::HTTP.get(uri))
  end
end
