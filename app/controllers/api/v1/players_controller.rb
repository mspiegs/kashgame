class Api::V1::PlayersController < Api::V1::BaseController

  def my_golf_buddies
    respond_with current_user.following
  end
end