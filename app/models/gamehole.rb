class Gamehole < ActiveRecord::Base
	belongs_to :game
	belongs_to :hole
end
