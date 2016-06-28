class Api::V1::RoundsController < Api::V1::BaseController
  def index
    respond_with Round.all
  end

  def show
    respond_with Round.find(params[:id]), include: {:users => {}, :course => {include: :holes}}
  end

  def create
    @users = User.find(params[:user_ids])
    @round = Round.create(round_params)
    @round.users << @users
    respond_with :api, :v1, @round
  end

  def destroy
    respond_with Item.destroy(params[:id])
  end

  def update
    item = Item.find(params["id"])
    item.update_attributes(item_params)
    respond_with item, json: item
  end

  def get_scores
    @round = Round.find(params[:round_id])
    scores_hash = {}
    @round.users.each do |player|
      scores = player.scores.where(round_id: @round.id)
      player_scores = {}
      scores.each {|score| player_scores[Hole.find(score.hole_id).number] = score.number  }
      scores_hash[player.first_name] = player_scores
    end
    respond_with scores_hash
  end

  private

  def round_params
    params.require(:round).permit(:id, :name, :date, :course_id)
  end
end
