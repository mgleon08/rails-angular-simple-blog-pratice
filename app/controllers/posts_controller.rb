class PostsController < ApplicationController
  def index
    render json: Post.all
  end

  def show
    @post = Post.find(params[:id])
    @post.content = Redcarpet::Markdown.new(Redcarpet::Render::HTML, fenced_code_blocks: true).render(@post.content)

    render json: @post
  end
end
