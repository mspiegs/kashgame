class Round < ActiveRecord::Base
  belongs_to :course
  has_many :scores
  has_and_belongs_to_many :users
  has_many :games
end
