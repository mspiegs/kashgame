class Api::V1::GamesController < Api::V1::BaseController
  def index
    respond_with current_user.rounds, include: {:users => {}, :course => {include: :holes}}
  end

  def show
    respond_with Round.find(params[:id]), include: {:users => {}, :course => {include: :holes}}
  end

  def create
    @users = User.find(params[:user_ids])
    @game = Round.create(round_params)
    @round.users << @users
    respond_with :api, :v1, @game
  end

  private

  def round_params
    params.permit(:id, :game_type, :game_name, :back_9_bet, :front_9_bet, :overall_bet, :round_id)
  end
end
