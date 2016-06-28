class Api::V1::ScoresController < Api::V1::BaseController

  def create
    if Score.where(hole_id: params[:hole_id], round_id: params[:round_id], user_id: params[:user_id]).empty?
      respond_with :api, :v1, Score.create(score_params)
    else
      score = Score.where(hole_id: params[:hole_id], round_id: params[:round_id], user_id: params[:user_id]).first
      score.update_attributes(score_params)
      respond_with score, json: score
    end
  end

  def index
    respond_with Score.where(user_id: params[:user_id], hole_id: params[:hole_id], round_id: params[:round_id])
  end

  def show
    respond_with Score.where(user_id: params[:user_id], hole_id: params[:hole_id], round_id: params[:round_id])
  end

  private

  def score_params
    params.permit(:number, :hole_id, :round_id, :user_id)
  end
end
