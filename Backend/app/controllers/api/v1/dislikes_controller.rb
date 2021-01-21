class Api::V1::DislikesController < ApplicationController

    def index
        dislikes = Dislike.all 
        render json: dislikes
    end 
end
