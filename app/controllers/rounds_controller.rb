class RoundsController < ApplicationController

  def create
    round = Round.new(round_params)

    if round.save
      render json: round
    else
      render json: { errors: round.errors }, status: 422
    end
  end

  def show
    @round = Round.find(params[:id])

    respond_to do |format|
      format.html
      format.json { render json: @round }
    end
  end

  private

    def round_params
      params.require(:round).permit(:name, :course_id)
    end
end
