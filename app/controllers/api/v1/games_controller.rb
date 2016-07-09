class Api::V1::GamesController < Api::V1::BaseController


  def create
    @game = Game.create(game_params)
    respond_with :api, :v1, @game
  end

  private

  def game_params
    params.permit(:id, :game_type, :game_name, :back_9_bet, :front_9_bet, :overall_bet, :round_id, :press)
  end
end
