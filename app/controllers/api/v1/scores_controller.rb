class Api::V1::ScoresController < Api::V1::BaseController

  def create
    respond_with :api, :v1, Score.create(score_params)
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
