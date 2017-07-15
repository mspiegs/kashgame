Rails.application.routes.draw do
  devise_for :users
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'
  root 'players#home'
  resources :rounds
  resources :holes do
    resources :scores
  end

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :sessions, :only => [:create, :destroy]
      resources :users, :only => [:show, :create, :update, :destroy, :index]
      resources :rounds, only: [:index, :show, :create] do
        match 'get_scores', to: 'rounds#get_scores', constraints: { format: 'json'}, via: :get
        match 'get_full_scores', to: 'rounds#get_full_scores', constraints: { format: 'json'}, via: :get
        match 'get_holes', to: 'rounds#get_holes', constraints: { format: 'json'}, via: :get
        match 'add_players', to: 'rounds#add_players', via: :post
        match 'set_score', to: 'rounds#set_score', via: :post
        match 'set_teams', to: 'rounds#set_teams', via: :post
        match 'get_games', to: 'rounds#get_games', constraints: { format: 'json'}, via: :get
        match 'get_tees', to: 'rounds#get_tees', constraints: { format: 'json'}, via: :get
        match 'get_teams', to: 'rounds#get_teams', constraints: { format: 'json'}, via: :get
        match 'add_game', to: 'rounds#add_game', via: :post
        match 'get_details', to: 'rounds#get_details', constraints: { format: 'json'}, via: :get
      end
      resources :scores, only: [:show, :index, :create]
      resources :courses, only: [:index]
      match 'golf_buddies', to: 'players#my_golf_buddies', constraints: { format: 'json'}, via: :get
    end
  end
  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
