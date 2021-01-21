class Api::V1::CommentsController < ApplicationController

    def index
        comments = Comment.all
        render json: comments
    end 

    def create
        comment = Comment.new(comment_params)

        comment.save
        render json: comment, status: :created
    end 

    def destroy 
        comment = Comment.find(params[:id])
        if comment.destroy
            head(:ok)
        else 
            head(:unprocessable_entity)
        end
        render json: comment
    end

    private 

    def comment_params 
        params.require(:comment).permit(:user_id, :game_id, :content)
    end 
end
