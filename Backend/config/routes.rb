Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  #routes
  namespace :api do
    namespace :v1 do 

      resources :users, only: [:index]
      resources :games, only: [:index]
      resources :likes, only: [:index]
      resources :dislikes, only: [:index]
      resources :comments, only: [:index, :destroy, :create]
      resources :scores, only: [:index]

    end
  end
end
