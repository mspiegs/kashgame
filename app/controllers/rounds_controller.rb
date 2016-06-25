class RoundsController < ApplicationController

  def show
    @round = Round.find(params[:id])

    respond_to do |format|
      format.html
      format.json { render json: @round }
    end
  end
end
