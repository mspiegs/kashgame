class Score < ActiveRecord::Base
  belongs_to :round
  belongs_to :hole
  belongs_to :user
end
