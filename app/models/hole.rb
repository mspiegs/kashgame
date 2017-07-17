class Hole < ActiveRecord::Base
  belongs_to :course
  has_many :scores
  has_many :games, through: :gameholes
  has_many :gameholes
end
