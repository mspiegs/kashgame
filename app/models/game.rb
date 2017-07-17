class Game < ActiveRecord::Base
  belongs_to :round
  has_and_belongs_to_many :users
  has_many :holes, through: :gameholes
  has_many :gameholes

  def get_winners

  end
end
