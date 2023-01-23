Rails.application.routes.draw do
  get '/journals/averages', to: 'journals#average'
  resources :journals

  get '/quotes/today', to: 'quotes#today'
  get '/quotes/:date', to: 'quotes#show'

  resources :comments, only: %i[create destroy] do 
    patch '/like', to: 'comments#like'
    post '/reply', to: 'replies#create'
  end
  get 'comments/:page', to: 'comments#index'

  post '/signup', to: 'users#create'

  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  get '/me', to: 'sessions#show'

  get '*path', to: 'fallback#index', constraints: ->(req) { !req.xhr? && req.format.html? }
end
