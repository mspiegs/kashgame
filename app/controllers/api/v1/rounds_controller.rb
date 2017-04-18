class Api::V1::RoundsController < Api::V1::BaseController
  def index
    respond_with current_user.rounds, include: {:users => {}, :course => {include: :holes}}
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

  def set_score
    @score = Score.where(round_id: params[:round_id], user_id: params[:user_id], hole_id: params[:hole_id])
    if @score.empty?
      score = Score.new(round_id: params[:round_id], user_id: params[:user_id], hole_id: params[:hole_id], number: params[:score_number])
      score.save
    else
      @score.first.update(number: params[:score_number])
    end
    respond_with @score.first
  end

  def get_holes
    @round = Round.find(params[:round_id])
    @holes = @round.course.holes
    respond_with @holes
  end

  def get_games
    @round = Round.find(params[:round_id])
    respond_with @round.games
  end

  def add_players
    @round = Round.find(params[:round_id])
    user_ids = params[:user_ids]
    user_ids = eval(user_ids)
    user_ids.each do |player|
      unless @round.user_ids.include?(player)
        u = User.find(player)
        @round.users << u
      end
    end

    respond_with :api, :v1, @round
  end

  private

  def round_params
    params.permit(:id, :name, :date, :course_id)
  end
end
