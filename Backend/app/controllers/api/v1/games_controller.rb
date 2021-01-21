class Api::V1::GamesController < ApplicationController

    def index 
        games = Game.all
        render json: games, include: [:scores, :comments, :likes, :dislikes]
    end 

    private 

    def game_params
        params.require(:game).permit(:name, :file_directory, :gif_url, :difficulty)
    end 
end
