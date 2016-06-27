class Api::V1::ScoresController < Api::V1::BaseController

  def create
    respond_with :api, :v1, Score.create(score_params)
  end

  private

  def score_params
    params.permit(:number, :hole_id, :round_id, :user_id)
  end
end