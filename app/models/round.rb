class Round < ActiveRecord::Base
  belongs_to :course
  has_many :scores
  has_many :roundusers
  has_many :users, through: :roundusers
  has_many :games
end
