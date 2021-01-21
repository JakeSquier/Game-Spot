class Game < ApplicationRecord

    has_many :comments
    
    has_many :scores
    
    has_many :likes
    
    has_many :dislikes

end
