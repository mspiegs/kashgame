class Api::V1::CoursesController < Api::V1::BaseController

  def index
    @courses = Course.all
    course_hash = {}
    @courses.each do |course|
      course_hash[course.name] = course.id
    end
    respond_with course_hash
  end
end
