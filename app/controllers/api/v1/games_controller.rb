class Api::V1::GamesController < Api::V1::BaseController
	def set_hole_value
		@hole = Gamehole.where(hole_id: params[:hole_id], game_id: params[:game_id]).first
		@hole.update(hole_value: params[:hole_value])

		respond_with @hole, json: @hole
	end

	def get_hole_values
		@game = Game.find(params[:game_id])

		respond_with @game.gameholes, json: @game.gameholes
	end
end