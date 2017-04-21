# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170421032031) do

  create_table "courses", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
    t.integer  "blue_tees_slope"
    t.integer  "blue_tees_rating"
    t.integer  "black_tees_slope"
    t.integer  "black_tees_rating"
    t.integer  "white_tees_slope"
    t.integer  "white_tees_rating"
    t.integer  "red_tees_slope"
    t.integer  "red_tees_rating"
    t.integer  "gold_tees_slope"
    t.integer  "gold_tees_rating"
    t.integer  "yello_tees_slope"
    t.integer  "yello_tees_rating"
  end

  create_table "games", force: :cascade do |t|
    t.string   "game_type"
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "round_id"
  end

  create_table "games_players", force: :cascade do |t|
    t.integer  "games_id"
    t.integer  "players_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "games_users", force: :cascade do |t|
    t.integer  "game_id"
    t.integer  "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "golf_buddies", force: :cascade do |t|
    t.integer  "follower_id"
    t.integer  "followed_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "golf_buddies", ["followed_id"], name: "index_golf_buddies_on_followed_id"
  add_index "golf_buddies", ["follower_id", "followed_id"], name: "index_golf_buddies_on_follower_id_and_followed_id", unique: true
  add_index "golf_buddies", ["follower_id"], name: "index_golf_buddies_on_follower_id"

  create_table "holes", force: :cascade do |t|
    t.integer  "number"
    t.integer  "course_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "length"
    t.integer  "par"
  end

  create_table "rounds", force: :cascade do |t|
    t.string   "name"
    t.date     "date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "course_id"
    t.string   "game"
  end

  create_table "rounds_users", force: :cascade do |t|
    t.integer  "round_id"
    t.integer  "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "scores", force: :cascade do |t|
    t.integer  "number"
    t.integer  "round_id"
    t.integer  "hole_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.float    "handicap"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.string   "auth_token",             default: ""
  end

  add_index "users", ["auth_token"], name: "index_users_on_auth_token", unique: true
  add_index "users", ["email"], name: "index_users_on_email", unique: true
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true

end
