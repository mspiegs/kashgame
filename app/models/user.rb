class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  has_and_belongs_to_many :rounds
  has_and_belongs_to_many :games
  has_many :scores
  has_many :golf_buddies, class_name: "GolfBuddy",
                          foreign_key: "follower_id",
                          dependent: :destroy
  has_many :invited_me_golf_buddies, class_name: "GolfBuddy",
                                     foreign_key: "followed_id",
                                     dependent: :destroy
  has_many :following, through: :golf_buddies, source: :followed
  has_many :followers, through: :invited_me_golf_buddies

  before_create :generate_authentication_token!

  def golf_with(other_user)
    golf_buddies.create(followed_id: other_user.id)
  end

  def dont_golf_with(other_user)
    golf_buddies.find_by(followed_id: other_user.id).destroy
  end

  def golfs_with?(other_user)
    following.include?(other_user)
  end

  def generate_authentication_token!
    begin
      self.auth_token = Devise.friendly_token
    end while self.class.exists?(auth_token: auth_token)
  end
end
