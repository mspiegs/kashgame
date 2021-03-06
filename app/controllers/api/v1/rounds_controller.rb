class Api::V1::RoundsController < Api::V1::BaseController
  def index
    respond_with current_user.rounds.sort_by { |x| x["created_at"]}.reverse, include: {:users => {include: :roundusers}, :course => {include: :holes}}
  end

  def show
    respond_with Round.find(params[:id]), include: {:users => {}, :course => {include: :holes}}
  end

  def create
    @users = User.find(params[:user_ids])
    @round = Round.create(round_params)
    @round.users << @users
    if params[:tees] != ''
      @round.roundusers.each do |rounduser|
        rounduser.tees = params[:tees]
        rounduser.save
      end
    end
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
      scores.each do |score|
        if score.number?
          player_scores[Hole.find(score.hole_id).number] = score.number
        end
      end
      scores_hash[player.first_name] = player_scores
    end
    respond_with scores_hash
  end

  def get_full_scores
    @round = Round.find(params[:round_id])
    scores_hash = {}
    player_scores = {}
    @round.course.holes.each do |hole|
      @round.users.each do |player|
        score = player.scores.where(round_id: @round.id, hole_id: hole.id).first
        if score != nil
          player_scores[player.first_name] = score.number
        end
      end
      scores_hash[hole.number.to_s] = player_scores
      player_scores = {}
    end
    respond_with scores_hash
  end

  def get_teams
    @round = Round.find(params[:round_id])
    teams_hash = {}
    @round.course.holes.each do |hole|
      scores = Score.where(round_id: @round.id, hole_id: hole.id)
      hole_team_hash = {}
      scores.each do |score|
        hole_team_hash[score.user_id] = score.team
      end
      teams_hash[hole.number] = hole_team_hash
    end

    respond_with teams_hash
  end

  def set_score
    @score = Score.where(round_id: params[:round_id], user_id: params[:user_id], hole_id: params[:hole_id])
    if @score.empty?
      score = Score.new(round_id: params[:round_id], user_id: params[:user_id], hole_id: params[:hole_id], number: params[:score_number], team: params[:team])
      score.save
    else
      @score.first.update(number: params[:score_number], team: params[:team])
    end
    respond_with @score.first, json: @score.first
  end

  def set_teams
    @score = Score.where(round_id: params[:round_id], user_id: params[:user_id], hole_id: params[:hole_id])
    if @score.empty?
      score = Score.new(round_id: params[:round_id], user_id: params[:user_id], hole_id: params[:hole_id], team: params[:team])
      score.save
    else
      @score.first.update( team: params[:team])
    end
    respond_with @score.first, json: @score.first
  end

  def get_holes
    @round = Round.find(params[:round_id])
    @holes = @round.course.holes
    respond_with @holes
  end

  def get_games
    @round = Round.find(params[:round_id])
    respond_with @round.games, include: {:users => {}}
  end

  def add_game
    @round = Round.find(params[:round_id])
    game = Game.create(name: params[:name], game_type: params[:game_type], round_id: @round.id, point_value: params[:point_value])
    users = params[:user_ids].split(',').map(&:to_i)
    users.each do |user_id|
      game.users << User.find(user_id)
    end
    @round.roundusers.each do |rounduser|
      rounduser.tees = params[:tees]
      rounduser.save
    end
    if params[:game_type] == 'Hammer'
      @round.course.holes.each do |hole|
        game.holes << hole
      end
    end
    respond_with game, json: game
  end

  def add_players
    @round = Round.find(params[:round_id])
    user_ids = params[:user_ids].split(',').map(&:to_i)
    user_ids.each do |player|
      unless @round.user_ids.include?(player)
        u = User.find(player)
        @round.users << u
      end
    end

    respond_with :api, :v1, @round, include: {:users => {}, :course => {include: :holes}}
  end

  def get_tees
    player_tees_hash = {}
    @round = Round.find(params[:round_id])
    @round.roundusers.each do |rounduser|
      user = User.find(rounduser.user_id)
      player_tees_hash[user.first_name] = rounduser.tees
    end

    respond_with player_tees_hash
  end

  def get_details
    @round = Round.find(params[:round_id])
    respond_to do |format|
      format.json { render json: round_details_as_json(@round)}
    end
  end

  private

  def round_details_as_json(round)
    scores_hash = {}
    round.users.each do |player|
      scores = player.scores.where(round_id: round.id)
      player_scores = {}
      scores.each  do |score|
        if score.number? 
          player_scores[Hole.find(score.hole_id).number] = score.number
        end
      end
      scores_hash[player.first_name] = player_scores
    end

    player_tees_hash = {}
    round.roundusers.each do |rounduser|
      user = User.find(rounduser.user_id)
      player_tees_hash[user.first_name] = rounduser.tees
    end
    list = {
      name: round.name,
      users: round.users,
      course: round.course,
      holes: round.course.holes,
      scores: scores_hash,
      tees: player_tees_hash,
      golf_buddies: current_user.following,
      games: round.games, include: { :users => {}}
    }
  end

  def round_params
    params.permit(:id, :name, :date, :course_id)
  end
end
