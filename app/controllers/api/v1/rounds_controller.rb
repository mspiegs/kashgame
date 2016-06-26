class Api::V1::RoundsController < Api::V1::BaseController
  def index
    respond_with Round.all
  end

  def show
    respond_with Round.find(params[:id])
  end

  def create
    respond_with :api, :v1, Item.create(item_params)
  end

  def destroy
    respond_with Item.destroy(params[:id])
  end

  def update
    item = Item.find(params["id"])
    item.update_attributes(item_params)
    respond_with item, json: item
  end

  private

  def item_params
    params.require(:round).permit(:id, :name, :date, :course_id)
  end
end
