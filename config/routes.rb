Rails.application.routes.draw do
  resources :journals
  get '/average', to: 'journals#average'

  get '/quotes/today', to: 'quotes#today'
  get '/quotes/:date', to: 'quotes#show'

  resources :comments, only: %i[index create] do
    patch '/like', to: 'comments#like'
    post '/reply', to: 'replies#create'
  end

  post '/signup', to: 'users#create'

  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  get '/me', to: 'sessions#show'
end
