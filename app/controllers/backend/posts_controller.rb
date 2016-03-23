class Backend::PostsController < ApplicationController
  def index
    @posts = Post.all
  end

  def show
    render json: Post.find(params[:id])
  end

  def update
    @post = Post.find(params[:id])
    @post.update(post_params)

    render json: @post
  end

  def create
    render json: Post.create!(post_params)
  end

  def destroy
    result = 'ko'

    begin
      @post = Post.find(params[:id])
      @post.destroy
      result = 'ok'
    rescue => e

    end

    render json: { success: result }
  end

  def post_params
    params.require(:post).permit(:title, :content)
  end
end
